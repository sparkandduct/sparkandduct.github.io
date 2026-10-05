# Spark & Duct

Static site of calculators, guides, fault codes and reference pages for low voltage, electrical and HVAC work. Live at https://sparkandduct.github.io.

## Editing

Pages are written as fragments in `src/` and wrapped in the shared header, navigation and footer by a build script. Do not edit the generated `.html` files in the repo root or in `guides/`, `fault-codes/`, `reference/` and `quizzes/`; they are overwritten.

1. Add or edit a file under `src/`. The front-matter comment at the top sets the title, description, section and listing summary (see the docstring in `build.py`).
2. Run `python build.py`. It regenerates every page and `sitemap.xml`.
3. Preview with `python -m http.server 8123` and open http://localhost:8123.

Links and assets use root-absolute paths (`/style.css`, `/js/common.js`).

`UNVERIFIED.md` lists values and facts that still need checking against a primary source.
