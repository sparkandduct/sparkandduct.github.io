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
- `routines/*.md`: each worker's instructions and schedule, as given to its routine. Change a worker by editing its routine at claude.ai/code/routines, then copy the change here.
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
10. If a source site is blocked by the network, say so in `UNVERIFIED.md` and use another source; never work around the block. For refrigerant properties, the CoolProp library (`pip install CoolProp`, reference equations of state) counts as one source.

## The quality bar

Google ranks pages that help the person reading them and pushes down sites that mass-produce pages to catch searches ("scaled content abuse"), however the pages are made. Automation is allowed; thin pages are not. Every page and product must pass all of these before it is published:

- **Answer first.** The first screen gives the answer, the tool or the steps. No warm-up paragraph. Write for a tech standing at the unit with a phone.
- **Something you cannot get from the first search result:** a working calculator, a worked example with real numbers, a diagram, a decision table, or the field tip that the official document leaves out. A page that only restates other pages is not built.
- **Not a near-copy.** Pages that differ only by brand, state or model number are doorway pages. A fault-code page for a new brand needs that brand's own codes, reset method and quirks; a state licensing page needs that state's own rules. If the specific content is not there, do not make the page.
- **Sources on the page.** End every new page with a short "Sources" list linking the documents actually used (manufacturer manuals, code bodies, state boards, reference software), then a line "Last checked: Month YYYY". Readers and Google both look for this.
- **No invented people or experience.** No author names, bios, testimonials, "we tested", or "in our experience". The site speaks as Spark & Duct.
- **Plain voice.** Short sentences, US trade vocabulary, numbers with units. Never use: "delve", "dive into", "in today's", "it's important to note", "whether you're a", "comprehensive guide", "game-changer", "navigate the complexities", "look no further", "unlock", "elevate". No closing summary paragraph that repeats the page.
- **Descriptive titles.** Title and description say exactly what the page does ("Superheat and subcooling calculator for R-410A and R-22"), with no hype.
- **Editor pass.** Before committing, reread the finished page as a skeptical journeyman would: recheck every number against its source, click every link, cut every sentence that does not help, and confirm each rule above. Fix, then reread once more.

## The look

The site is laid out like a printed data sheet: ruled lines, square corners, one orange accent, readouts in the monospace face, fonts served from `/fonts/`. Use only the classes already in `style.css` and the existing page patterns; never add gradients, shadows, rounded tiles, emoji, icons or stock images, and never load fonts or styles from another site. In diagrams, keep every label inside the viewBox and clear of lines and other labels; check this in the headless browser with `getBBox()`.

## Growing it

- **Depth over volume.** One good page a day is the pace; never raise it. A refreshed page that ranks beats three new ones that do not.
- **Clusters.** Build pages around hubs (a calculator, its how-to guide, its troubleshooting page, its reference chart) and link each page to its hub and its siblings. Every new page links to at least two related pages and gets a link from at least one.
- **One money lever at a time.** When a worker changes anything about earning (a Pro Pack link, a price, an ad slot), it records the change with its date under "Money changes" in `STATE.md`, and nobody changes a second lever for four weeks, so the effect of each change can be seen.

## The Pro Pack (how the money works)

Paid products are printable pages in `src/pro/` (field reference cards, checklists, full-length practice exams), built to `/pro/` with `sitemap: no` and no summary, so they stay out of the sitemap and the site's listings. `src/pro/index.html` lists them all. Buyers pay once on Gumroad and Gumroad sends them to the index page, so every product the crew adds later is included in what they bought.

The repo is public, so the pages are hidden rather than locked. That is fine for printables at this price; do not put anything there that would matter if it leaked.

The site links to the Pro Pack only after `STATE.md` has a Gumroad link in it. Until then products are made and kept, and nothing on the site mentions them.

Pricing: printed EPA 608 study books sell for about $17 to $35, so the whole pack at $9 is an easy yes; raise it to $12 once it holds ten or more products (a money lever, so record it). Once the link exists, the Product maker also makes one free sample (a single pocket card) as a public page that shows the quality and links to the pack; the free sample is the main way people find the paid one.

### Luke's one-time setup (the only thing a person has to do)

1. Make a Gumroad account and add a payout method.
2. Create one product, "Spark & Duct Pro Pack", priced around $9, with the content set to "Redirect to a URL" pointing at https://sparkandduct.github.io/pro/.
3. Paste the product's Gumroad link into the `Gumroad link:` line in `STATE.md` (or ask Claude to). The Builder adds the shop link to the site on its next run.
