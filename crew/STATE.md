# Crew board

Gumroad link: (none yet)

Owner decision, 2026-10-24: the Gumroad shop gets set up together with buying the domain, around December 2026, and only if traffic justifies it. Until then, do not list Gumroad as something the owner has to do; keep building products.

## Money changes

One lever at a time, four weeks apart (see the rules). Newest last.

- (none yet)

## Build queue

The Analyst owns this list; the Builder takes the top item and deletes it. Keep about ten items, most valuable first. Alternate calculators with content pages where the value is close.

1. Trane furnace fault codes (needs Trane's own flash codes; skip if only secondary sources).
2. Furnace will not ignite: troubleshooting walkthrough (flame sensor first; most common call, hub for the fault code pages).
3. Box fill calculator (NEC 314.16 method, original wording only).
4. Heat pump blowing cold air: troubleshooting walkthrough.
5. Duct sizing by friction rate calculator.
6. EPA 608 Type II practice quiz (copy the structure of src/quizzes/epa-608-core-practice.html).
7. Motor full-load current reference (NEC Table 430.250 values, checked; needs a second source).
8. Lennox furnace fault codes.
9. Wire ampacity reference (only if it avoids copying NEC Table 310.16 wholesale).
10. Furnace flame sensor cleaning and microamp test how-to (completes the ignition cluster).

## Products

The Product maker owns this list.

Ideas, in order:
1. EPA 608 full practice exam pack: 25 questions each for Core, Type I, Type II and Type III, with answer explanations.
2. HVAC service call checklist: printable one-page sheets for a cooling call and a heating call.
3. Pocket reference card set: thermostat wire colors, electrical wire colors, Ohm's law and common formulas.
4. Fire alarm battery calculation worksheet: fill-in-by-hand version of the calculator.
5. Conduit bending field card: multipliers, shrink and offset steps.

Made:
(none yet)

## Log

Newest last. One line each: date, worker, what was done.

- 2026-10-24, setup: crew created; the earlier laptop schedule "sparkandduct-daily-page" retired in favor of the cloud Builder.
- 2026-10-24, builder: added the superheat and subcooling calculator (src/superheat-subcooling.html, js/superheat.js), linked from the AC-not-cooling guide. Gumroad link still absent, so no shop link. Verified with node, Playwright at 375 px and link crawl; pressure table is computed (CoolProp), see UNVERIFIED.md.
- 2026-10-25, manager: weekly report written; added missing Sources list to the superheat calculator; Search Console shows 0 clicks/0 impressions; first three-page Builder run is Thursday.
- 2026-10-26, analyst: Search Console has no data yet (0 impressions), so the queue was ranked from web research and cluster gaps (ignition troubleshooting moved up). Goodman one-hour reset could not be confirmed from a primary source; noted in UNVERIFIED.md. Refreshed furnace-temperature-rise guide (answer first, field tip, links, Sources, better description).
