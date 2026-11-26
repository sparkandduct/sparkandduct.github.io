# Crew board

Gumroad link: (none yet)

Owner decision, 2026-10-24: the Gumroad shop gets set up together with buying the domain, around December 2026, and only if traffic justifies it. Until then, do not list Gumroad as something the owner has to do; keep building products.

## Money changes

One lever at a time, four weeks apart (see the rules). Newest last.

- (none yet)

## Build queue

The Analyst owns this list; the Builder takes the top item and deletes it. Keep about ten items, most valuable first. Alternate calculators with content pages where the value is close.

Search Console (2026-11-23, 28 days) still has no query data (2 clicks, 4 impressions, home page only), so ranking is from cluster gaps and web demand: phone lookups on a job site, with primary sources available.

3. Duct sizing by friction rate calculator (ASHRAE friction equation, round duct; pairs with static pressure and airflow pages).
4. AC condensate drain clog and float switch trips: how to clear and test (cooling cluster; very common call, manuals as sources).
5. Fire alarm end-of-line resistor and open circuit troubleshooting (extends the ground fault and NAC guides; use panel manuals as sources).
6. Furnace limit switch and rollout switch: why it trips and how to test (ignition cluster; manuals as sources).
7. Motor full-load current reference (NEC Table 430.250 values, checked; needs a second source; link from three-phase calculator).
8. EPA 608 Type II practice quiz (copy the structure of src/quizzes/epa-608-core-practice.html).
9. 90-degree conduit bend take-up and stub-up calculator (completes the offset calculator cluster; use bender maker take-up values as source).
10. How to test a blower motor: PSC vs ECM (airflow cluster; links to capacitor and static pressure pages; maker manuals as sources).

Dropped: Lennox furnace fault codes (no Lennox manual reachable in four runs; re-add only with a primary source).

## Products

The Product maker owns this list.

Ideas, in order:
3. Pocket reference card set: thermostat wire colors, electrical wire colors, Ohm's law and common formulas.
5. Conduit bending field card: multipliers, shrink and offset steps.
8. Wire and cable pocket card: NEC 310.16 ampacity rows for 14 to 1/0 AWG copper at 60/75/90 C (needs a primary NEC source before it is made).

9. Panel schedule and circuit directory fill-in sheets (blank, with a worked example; needs only NEC 408.4 wording, check it first).
10. Refrigerant recovery and charge log (fill-in: unit, refrigerant, nameplate charge, pounds recovered, cylinder tare and gross weights; no limits, only 40 CFR 82 recordkeeping wording if confirmed).

Made:
- Motor starting and insulation test log: src/pro/motor-test-log.html (2026-11-25). Two blank logs and one filled example with checklist, 3 Letter pages. Chosen because it needs no unverified limits (ideas 3, 5 and 8 still lack a primary source). Facts: NEMA percent voltage unbalance and the 1 percent recommendation (DOE Motor Systems Tip Sheet #7, plus one second source), polarization index as 10 min over 1 min (two sources). Left out: PI and megohm acceptance limits, temperature correction, single-phase compressor winding resistance rules (only trade sources found).
- Fire alarm battery calculation worksheet: src/pro/fire-alarm-battery-worksheet.html (2026-11-18). Two blank worksheets and one filled example with checklist, 3 Letter pages. Chosen over idea 3 (wire and thermostat colors have no primary source) and idea 5 (conduit shrink, saddle multipliers and the NEC 358.26 text could not be confirmed from a primary source). Used only 24 h standby plus 5 min alarm (Fire-Lite manual, a second article citing NFPA 72). Left out: derating factor (sources disagree, 1.2 vs 1.25; blank line to fill), voice, remote station and generator times.
- EPA 608 pocket cards: src/pro/epa-608-pocket-cards.html (2026-11-11). Four cut-out cards on one Letter page (evacuation levels, small appliances, pressure classes and certification, major repair/oil/leak repair), checked against 40 CFR 82.152/156/157/161 and EPA pages. Chosen over idea 3 because wire and thermostat colors are conventions with no primary source, which the product bar does not allow. Left out: HFC leak rules (part 84), penalties, dates.
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
- 2026-11-08, manager: weekly report written; 2 pages and 1 product checked for Sources and links; Search Console 0 clicks/0 impressions this week; build clean.
- 2026-11-09, analyst: Search Console still has no query data; queue rewritten (capacitor test, no-C-wire and PoE on top; added T568 pinout, pressure switch, contactor test, EOL resistor; dropped Lennox). Confirmed 24 to 16 AWG circular mils against the AWG definition (Table 8 starts at 14 AWG). Refreshed nac-voltage-drop.html (description, short answer, field tip, related links, Sources).
- 2026-11-11, product maker: made the EPA 608 pocket cards (src/pro/epa-608-pocket-cards.html, prints to one Letter page, added to the Pro Pack index); not in sitemap, no inbound links, links 200. Noted EPA's certification page omits medium-pressure from Type II while 40 CFR 82.161 includes it; card follows the regulation.
- 2026-11-12, builder: added run capacitor test guide (src/guides/how-to-test-a-run-capacitor.html), linked from the AC-not-cooling guide.
- 2026-11-12, builder: added no-C-wire thermostat guide (src/guides/thermostat-no-c-wire.html), linked from thermostat wire colors.
- 2026-11-12, builder: added PoE voltage drop and cable length calculator (src/poe-voltage-drop.html, js/poe.js), linked from voltage drop calculator.
- 2026-11-15, manager: weekly report written; 3 pages and 1 product checked for Sources and links; Search Console 0 clicks/0 impressions; build clean.
- 2026-11-16, analyst: Search Console still has no query data (2 clicks, 3 impressions, home page); queue rewritten (T568, static pressure, pressure switch on top; added ladder diagram and limit switch). THHN 3 AWG to 4/0 areas could not be confirmed (primary hosts blocked); noted in UNVERIFIED.md. Refreshed conduit-fill-explained.html (short answer, field tip, related links, Sources).
- 2026-11-18, product maker: made the fire alarm battery calculation worksheet (src/pro/fire-alarm-battery-worksheet.html, 3 Letter pages, added to the Pro Pack index); not in sitemap, no inbound links, links 200. Left the derating factor blank because sources disagree.
- 2026-11-19, builder: added Ethernet T568A/T568B pinout reference (src/reference/ethernet-t568a-t568b-pinout.html), linked from PoE calculator and electrical wire colors. No Gumroad link yet.
- 2026-11-19, builder: added static pressure (TESP) how-to guide, linked from temperature rise guide. No Gumroad link yet.
- 2026-11-19, builder: added furnace pressure switch test guide, linked from furnace-will-not-ignite. No Gumroad link yet.
- 2026-11-22, manager: weekly report written; 3 pages and 1 product checked for Sources and links; Search Console 0 clicks/1 impression; build clean.
- 2026-11-23, analyst: Search Console still has no query data (2 clicks, 4 impressions, home page); queue rewritten (contactor test, ladder diagram, duct sizing on top; added condensate drain, 90-degree take-up, blower motor test). NC heating group definitions could not be confirmed from a primary source (ncleg.gov unreachable); noted in UNVERIFIED.md. Refreshed fire-alarm-ground-fault.html (new description, short answer, worked example, field tip, related links, Sources).
- 2026-11-25, product maker: made the motor starting and insulation test log (src/pro/motor-test-log.html, 3 Letter pages, added to the Pro Pack index); not in sitemap, no inbound links, links 200. Left out all megohm and PI limits (no primary source).
- 2026-11-26, builder: added contactor and relay test guide (src/guides/how-to-test-a-contactor-and-relay.html), linked from AC-not-cooling guide. No Gumroad link yet.
- 2026-11-26, builder: added ladder wiring diagram guide (src/guides/how-to-read-a-ladder-wiring-diagram.html), linked from the contactor test guide. No Gumroad link yet.
