# The crew

Four scheduled Claude routines run Spark & Duct between them. They run in Anthropic's cloud, not on Luke's laptop, and they talk to each other only through the files in this folder. Luke does not review or approve their work; the rules below are the review.

| Worker | When (US Eastern) | Job |
| --- | --- | --- |
| Builder | Daily, about noon | Adds one page to the site, taking the top item from the queue in `STATE.md`. |
| Analyst | Mondays, about 9 AM | Decides what gets built next: researches what trade workers search for, rewrites the queue, and spends part of each run checking one item in `UNVERIFIED.md` against a primary source. |
| Product maker | Wednesdays, about 2 PM | Adds one printable paid product to the Pro Pack (`src/pro/`). |
| Manager | Sundays, about 10 AM | Writes the weekly report in `reports/`, checks the others did their jobs and fixes the rules here if something keeps going wrong. |

Times are set in UTC, so they shift by an hour when daylight saving time changes.

## Files

- `STATE.md`: the shared board. The build queue, the product list, and a log each worker appends to.
- `reports/YYYY-MM-DD.md`: one weekly report from the Manager.
- `../OVERNIGHT-LOG.md`: the Builder's page log (older than the crew; kept going).
- `../UNVERIFIED.md`: facts not yet checked against a primary source.

## Rules for every worker

1. Read this file, `STATE.md`, the top of `../build.py` and `../README.md` before doing anything.
2. Work on `main` and publish by pushing to `main`; GitHub Pages serves the site from it. Run `git pull --rebase` right before pushing, since another worker may have pushed. If the push is refused, stop and write why at the end of your run.
3. Pages are fragments in `src/` built by `python build.py`. Never hand-edit the generated `.html` files.
4. Facts (code tables, fault codes, licensing rules, refrigerant data) must be confirmed in at least two sources, preferring the manufacturer's manual, the code body or the state board. Anything only half-confirmed is worded on the page as something to verify and listed in `UNVERIFIED.md`. If a page cannot be sourced properly, pick a different one; never guess.
5. Write every sentence yourself. Copy no text, tables or images from other sites or from code books.
6. No product recommendations, affiliate links, claims of hands-on testing, analytics, trackers, forms, external scripts, accounts or purchases. Do not change the site's design or rewrite existing pages except to link to new ones or to correct a fact.
7. Never put Luke's name, personal details or other accounts anywhere in the repo. The site is Spark & Duct only.
8. Append one line to the log in `STATE.md` saying what you did. Commit with a clear message ending with `Co-Authored-By: Claude <noreply@anthropic.com>`.
9. Never ask questions; nobody is there to answer. Make the sensible choice and write it down.

## The Pro Pack (how the money works)

Paid products are printable pages in `src/pro/` (field reference cards, checklists, full-length practice exams), built to `/pro/` with `sitemap: no` and no summary, so they stay out of the sitemap and the site's listings. `src/pro/index.html` lists them all. Buyers pay once on Gumroad and Gumroad sends them to the index page, so every product the crew adds later is included in what they bought.

The repo is public, so the pages are hidden rather than locked. That is fine for printables at this price; do not put anything there that would matter if it leaked.

The site links to the Pro Pack only after `STATE.md` has a Gumroad link in it. Until then products are made and kept, and nothing on the site mentions them.

### Luke's one-time setup (the only thing a person has to do)

1. Make a Gumroad account and add a payout method.
2. Create one product, "Spark & Duct Pro Pack", priced around $9, with the content set to "Redirect to a URL" pointing at https://sparkandduct.github.io/pro/.
3. Paste the product's Gumroad link into the `Gumroad link:` line in `STATE.md` (or ask Claude to). The Builder adds the shop link to the site on its next run.
