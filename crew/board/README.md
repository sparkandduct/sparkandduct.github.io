# Weekly report page

Luke's weekly view of the site: https://claude.ai/artifact/KxPtT3V5qMBd3Q3b3MYFW3 (a private Dashboard artifact). `index.html` here is a copy of its page; the live page is stored in the artifact, not served from this repo. Never change the page or any of the artifact's own files from a routine.

The page draws three data files, kept here and uploaded to the artifact each Sunday by the Manager:

- `weekly.json`: one row per week ending Sunday, oldest first: `{"week": "YYYY-MM-DD", "pages_total", "pages_added", "products_total", "impressions", "clicks"}` (numbers). `pages_total` = count of `src/**/*.html`; `pages_added` = pages added in `src/` that week (git log); `products_total` = files in `src/pro/` other than `index.html`; `impressions` and `clicks` = the 7-day totals from `python crew/gsc.py --days 7` (0 if it fails, and say so in the report).
- `pages.json`: the 12 newest pages, newest first: `{"added": "YYYY-MM-DD", "title", "kind" ("Calculator", "Guide", "Fault codes", "Reference", "Quiz", "Product"), "url"}` (live URL).
- `queue.json`: the build queue from `STATE.md`, top 6: `{"rank": 1, "item": "<short name>"}`.

## Updating it (Manager, every Sunday)

1. Rewrite the three files above (append this week's row to `weekly.json`; never edit past rows).
2. Upload each with the `Artifact` tool: `action` publish, `url` the link above, `asset: true`, `file_path` the file. Each upload returns a new `/_blob/<id>` url.
3. Load `ArtifactData` (ToolSearch `select:ArtifactData`). For each dataset (`weekly`, `pages`, `queue`): `get` collection `datasets`, doc_id the name, then `update` with `if_version` set to the version you read and data `{"source": {"kind": "file", "url": "<new /_blob url>", "name": "<file name>"}, "updated": {"at": "<ISO time now>", "by": "Manager"}}`.
4. Commit the three files with the rest of the week's changes.

If any step is refused, stop updating the page, keep the files committed, and mention it in the weekly report.
