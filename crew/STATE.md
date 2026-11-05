# Crew board

Gumroad link: (none yet)

Owner decision, 2026-10-24: the Gumroad shop gets set up together with buying the domain, around December 2026, and only if traffic justifies it. Until then, do not list Gumroad as something the owner has to do; keep building products.

## Money changes

One lever at a time, four weeks apart (see the rules). Newest last.

- (none yet)

## Build queue

The Analyst owns this list; the Builder takes the top item and deletes it. Keep about ten items, most valuable first. Alternate calculators with content pages where the value is close.

Search Console (2026-11-02) still has no query data, so ranking is from cluster gaps and web demand.

4. PoE voltage drop and cable length calculator (low voltage; IEEE 802.3af/at/bt power levels, TIA 100 m limit).
5. Duct sizing by friction rate calculator (ASHRAE friction equation, round duct).
6. How to test a run capacitor and when to replace it (extends the AC not cooling guide).
7. Thermostat with no C wire: options and wiring (extends thermostat wire colors reference).
8. EPA 608 Type II practice quiz (copy the structure of src/quizzes/epa-608-core-practice.html).
9. Motor full-load current reference (NEC Table 430.250 values, checked; needs a second source).
10. Lennox furnace fault codes (only with a Lennox manual as primary source).

## Products

The Product maker owns this list.

Ideas, in order:
3. Pocket reference card set: thermostat wire colors, electrical wire colors, Ohm's law and common formulas.
4. Fire alarm battery calculation worksheet: fill-in-by-hand version of the calculator.
5. Conduit bending field card: multipliers, shrink and offset steps.
6. Motor starting troubleshooting worksheet: fill-in meg and amp readings log (no limits, fill from nameplate).
7. EPA 608 evacuation and recovery pocket card: Table 1 levels, small appliance percentages and leak rates, laminate-ready (facts already verified in the exam pack).

Made:
- HVAC service call checklists: src/pro/service-call-checklists.html (2026-10-28). Cooling and heating sheets, one Letter page each, blank Target columns so no unverified numbers.
- EPA 608 practice exams: src/pro/epa-608-practice-exams.html (2026-11-04). Core, Type I, II and III, 25 original questions each with answer key; prints to 11 Letter pages (8 exam, 3 key). Facts from 40 CFR 82 subpart F and EPA pages; CFC/R-22 phaseout dates, penalty amounts, pass marks and HFC leak rules (40 CFR 84) left out as unverified.

## Log

Newest last. One line each: date, worker, what was done.

- 2026-10-24, setup: crew created; the earlier laptop schedule "sparkandduct-daily-page" retired in favor of the cloud Builder.
- 2026-10-24, builder: added the superheat and subcooling calculator (src/superheat-subcooling.html, js/superheat.js), linked from the AC-not-cooling guide. Gumroad link still absent, so no shop link. Verified with node, Playwright at 375 px and link crawl; pressure table is computed (CoolProp), see UNVERIFIED.md.
- 2026-10-25, manager: weekly report written; added missing Sources list to the superheat calculator; Search Console shows 0 clicks/0 impressions; first three-page Builder run is Thursday.
- 2026-10-26, analyst: Search Console has no data yet (0 impressions), so the queue was ranked from web research and cluster gaps (ignition troubleshooting moved up). Goodman one-hour reset could not be confirmed from a primary source; noted in UNVERIFIED.md. Refreshed furnace-temperature-rise guide (answer first, field tip, links, Sources, better description).
- 2026-10-28, product maker: created src/pro/index.html and src/pro/service-call-checklists.html (prints to 2 Letter pages, not in sitemap, no inbound links). Chose idea 2 over the EPA 608 exam pack because epa.gov, ecfr.gov and law.cornell.edu are blocked here, so 608 facts could not be verified from a primary source; revisit when allowed.
- 2026-10-29, builder: skipped Trane codes (no primary source). Added furnace-will-not-ignite guide.
- 2026-10-29, builder: added box fill calculator.
- 2026-10-29, builder: added heat pump blowing cold air guide.
- 2026-11-01, manager: weekly report written; 3 pages and 1 product verified for Sources and links; Search Console 2 clicks/3 impressions; rebuilt stale box-fill.html.
- 2026-11-02, analyst: Search Console still has no query data (2 clicks, 3 impressions, home page only); queue rewritten from cluster gaps. Confirmed voltage drop K values (12.9, 21.2) as derived from NEC Table 8 resistances; 24-16 AWG still open. Refreshed voltage-drop.html (title, description, worked example, related links, Sources).
- 2026-11-04, product maker: made the EPA 608 practice exams (src/pro/epa-608-practice-exams.html, added to the Pro Pack index); epa.gov, ecfr.gov and law.cornell.edu are reachable again, so the 608 facts were checked there. Not in sitemap, no inbound links, link crawl clean.
- 2026-11-05, builder: added R-410A/R-32/R-454B pressure temperature chart (reference); linked from superheat calculator. Gumroad link still absent.
- 2026-11-05, builder: skipped flame sensor how-to (already in furnace-will-not-ignite; near-copy); added three-phase power calculator, linked from Ohm's law.
