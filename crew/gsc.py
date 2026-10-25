"""Read Spark & Duct's Google Search Console numbers for the crew.

Usage: python crew/gsc.py [--days 28]

Needs GSC_KEY_B64 in the environment: the base64 of a service account's JSON key
that has Restricted (view-only) access to the Search Console property. Installs
google-auth on first use. Prints totals, top queries and top pages as plain text.
Never prints or writes the key.
"""
import argparse
import base64
import datetime
import json
import os
import subprocess
import sys
import urllib.parse

SITE = "https://sparkandduct.github.io/"
API = "https://searchconsole.googleapis.com/webmasters/v3/sites/{}/searchAnalytics/query"
SCOPE = "https://www.googleapis.com/auth/webmasters.readonly"


def session():
    # Check the imports in a separate process first: the cloud image's system
    # `cryptography` can be broken (missing _cffi_backend) and panics on import,
    # which cannot be retried in-process once half-loaded.
    check = [sys.executable, "-c", "from google.oauth2 import service_account; import google.auth.transport.requests"]
    if subprocess.run(check, capture_output=True).returncode != 0:
        subprocess.run(
            # --ignore-installed: pip cannot remove the Debian-owned copy, so install beside it.
            [sys.executable, "-m", "pip", "install", "-q", "--ignore-installed", "google-auth", "requests", "cffi", "cryptography"],
            check=True,
        )
    from google.oauth2 import service_account
    from google.auth.transport.requests import AuthorizedSession
    raw = os.environ.get("GSC_KEY_B64")
    if not raw:
        raise SystemExit("GSC_KEY_B64 is not set; Search Console data is not available in this run.")
    info = json.loads(base64.b64decode(raw))
    creds = service_account.Credentials.from_service_account_info(info, scopes=[SCOPE])
    return AuthorizedSession(creds)


def query(http, start, end, dimensions, limit):
    url = API.format(urllib.parse.quote(SITE, safe=""))
    body = {"startDate": start, "endDate": end, "dimensions": dimensions, "rowLimit": limit}
    response = http.post(url, json=body, timeout=60)
    if response.status_code != 200:
        raise SystemExit(f"Search Console returned {response.status_code}: {response.text[:300]}")
    return response.json().get("rows", [])


def row(r):
    return f'{r["clicks"]:>6.0f} clicks {r["impressions"]:>7.0f} impr  CTR {r["ctr"] * 100:4.1f}%  pos {r["position"]:5.1f}'


def status(http):
    """Print what Google has done with the sitemap and whether key pages are indexed."""
    site = urllib.parse.quote(SITE, safe="")
    response = http.get(f"https://www.googleapis.com/webmasters/v3/sites/{site}/sitemaps", timeout=60)
    print(f"Sitemaps ({response.status_code}):")
    for sm in response.json().get("sitemap", []) if response.ok else []:
        counts = ", ".join(f'{c.get("type")}: {c.get("submitted")} submitted' for c in sm.get("contents", []))
        print(f'  {sm.get("path")}  last read {sm.get("lastDownloaded", "never")}  '
              f'errors {sm.get("errors", 0)}  warnings {sm.get("warnings", 0)}  {counts}')
    if not response.ok:
        print("  " + response.text[:300])
    for path in ("", "voltage-drop.html", "guides/how-to-size-a-fire-alarm-battery.html"):
        body = {"inspectionUrl": SITE + path, "siteUrl": SITE}
        r = http.post("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", json=body, timeout=60)
        if not r.ok:
            print(f"\nInspect /{path}: {r.status_code} {r.text[:200]}")
            continue
        idx = r.json().get("inspectionResult", {}).get("indexStatusResult", {})
        print(f"\nInspect /{path}: {idx.get('verdict')} | {idx.get('coverageState')} | "
              f"last crawl {idx.get('lastCrawlTime', 'never')} | robots {idx.get('robotsTxtState')} | "
              f"indexing {idx.get('indexingState')} | fetch {idx.get('pageFetchState')}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--days", type=int, default=28)
    parser.add_argument("--status", action="store_true", help="sitemap and indexing status instead of traffic")
    args = parser.parse_args()
    if args.status:
        status(session())
        return
    # Search Console data runs about three days behind.
    end = datetime.date.today() - datetime.timedelta(days=3)
    start = end - datetime.timedelta(days=args.days - 1)
    http = session()

    totals = query(http, str(start), str(end), [], 1)
    print(f"Search Console, {start} to {end} ({args.days} days)")
    print("Totals:", row(totals[0]) if totals else "no data yet")
    for title, dim in (("Top queries", "query"), ("Top pages", "page")):
        rows = query(http, str(start), str(end), [dim], 25)
        print(f"\n{title}:")
        if not rows:
            print("  none yet")
        for r in rows:
            print(f'  {row(r)}  {r["keys"][0]}')


if __name__ == "__main__":
    main()
