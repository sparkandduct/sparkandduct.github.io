"""Build the site.

Every page lives in src/ as a content fragment with a front-matter comment:

    <!--
    title: Page title
    description: Meta description
    section: calculators | guides | fault-codes | reference | quizzes | site
    summary: One line shown in listings (omit to keep the page out of listings)
    group: optional sub-group within a section
    order: optional sort key, lower first
    scripts: optional space-separated script URLs
    -->

Run `python build.py` to wrap each fragment in the shared template, write it to
the repo root at the same relative path, and regenerate sitemap.xml.
`{{list:section}}` or `{{list:section:group}}` in a fragment becomes a card
list of the matching pages.
"""
import html
import re
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / "src"
SITE = "https://sparkandduct.github.io"
BRAND = "Spark & Duct"

NAV = [
    ("calculators", "Calculators", "/"),
    ("guides", "Guides", "/guides/"),
    ("fault-codes", "Fault codes", "/fault-codes/"),
    ("reference", "Reference", "/reference/"),
    ("quizzes", "Quizzes", "/quizzes/"),
]

FRONT = re.compile(r"\A<!--\n(.*?)\n-->\n", re.S)
LIST = re.compile(r"\{\{list:([a-z-]+)(?::([a-z-]+))?\}\}")

TEMPLATE = """<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{head_title}</title>
  <meta name="description" content="{description}">
  <link rel="canonical" href="{canonical}">
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <header class="site">
    <div class="inner">
      <a class="brand" href="/">Spark <span>&amp;</span> Duct</a>
      <nav>
{nav}
      </nav>
    </div>
  </header>

  <main>
{body}
  </main>

  <footer class="site">
    <p>For estimating and study only. Check everything against the current code, the manufacturer's data and the authority having jurisdiction before you build or repair.</p>
    <p><a href="/about.html">About</a> &middot; <a href="/contact.html">Contact</a> &middot; <a href="/privacy.html">Privacy</a></p>
  </footer>
{scripts}</body>
</html>
"""


def load(path):
    text = path.read_text(encoding="utf-8").replace("\r\n", "\n")
    match = FRONT.match(text)
    if not match:
        raise SystemExit(f"{path}: missing front matter")
    meta = dict(line.split(": ", 1) for line in match.group(1).splitlines() if line.strip())
    for key in ("title", "description", "section"):
        if key not in meta:
            raise SystemExit(f"{path}: front matter needs '{key}'")
    rel = path.relative_to(SRC).as_posix()
    url = "/" + (rel[: -len("index.html")] if rel.endswith("index.html") else rel)
    return {"meta": meta, "body": text[match.end():].rstrip("\n"), "rel": rel, "url": url}


def listing(pages, section, group):
    items = [
        p for p in pages
        if p["meta"]["section"] == section
        and "summary" in p["meta"]
        and (group is None or p["meta"].get("group") == group)
    ]
    items.sort(key=lambda p: (int(p["meta"].get("order", 100)), p["meta"]["title"]))
    rows = "".join(
        f'  <li><a href="{p["url"]}"><strong>{html.escape(p["meta"]["title"])}</strong>'
        f'<span>{html.escape(p["meta"]["summary"])}</span></a></li>\n'
        for p in items
    )
    return f'<ul class="tools">\n{rows}</ul>'


def render(page, pages):
    meta = page["meta"]
    nav = "\n".join(
        f'        <a href="{href}"{" aria-current=" + chr(34) + "page" + chr(34) if key == meta["section"] else ""}>{label}</a>'
        for key, label, href in NAV
    )
    scripts = "".join(f'  <script src="{s}"></script>\n' for s in meta.get("scripts", "").split())
    body = LIST.sub(lambda m: listing(pages, m.group(1), m.group(2)), page["body"])
    head_title = meta.get("head_title") or f'{meta["title"]} | {BRAND}'
    return TEMPLATE.format(
        head_title=html.escape(head_title),
        description=html.escape(meta["description"], quote=True),
        canonical=SITE + page["url"],
        nav=nav,
        body=body,
        scripts=scripts,
    )


def main():
    pages = [load(p) for p in sorted(SRC.rglob("*.html"))]
    for page in pages:
        out = ROOT / page["rel"]
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(render(page, pages), encoding="utf-8", newline="\n")
    urls = "".join(f"  <url><loc>{SITE}{p['url']}</loc></url>\n" for p in pages)
    (ROOT / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{urls}</urlset>\n",
        encoding="utf-8",
        newline="\n",
    )
    print(f"Built {len(pages)} pages")


if __name__ == "__main__":
    main()
