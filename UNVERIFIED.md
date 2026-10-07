# Values not yet checked against a code book

These were entered from memory of the tables named. Check each against the current edition before relying on them.

- `js/voltage-drop.js`: circular mil areas for 14 AWG to 4/0 were compared with a published copy of NEC Chapter 9 Table 8 on 2026-10-05 and match. Still unchecked: 24 to 16 AWG, and the K values 12.9 copper and 21.2 aluminum.
- `js/conduit-fill.js`: all ten EMT areas were compared with a published copy of NEC Chapter 9 Table 4 on 2026-10-05 and match. THHN areas for 14 to 4 AWG were confirmed the same day. Still unchecked: THHN areas for 3 AWG to 4/0.
- `js/unit-converter.js`: conversion factors are standard values entered from memory (inches of water column taken at 4 C).
- `battery.html`: NFPA 72 standby and alarm durations and the 20 % margin.
- `src/fault-codes/carrier-furnace-codes.html` and `goodman-furnace-codes.html`: code meanings were cross-checked against secondary web sources, not a manufacturer's service manual. Reset times ("about three hours", "about an hour") are from memory.
- `src/guides/north-carolina-electrical-hvac-license.html`: experience years, the 70 pass mark and the $90 fee were read from the electrical board's rules page, and the 4,000 / 2,000 hour figures from the heating board's applicant page (October 2026). The Heating Group 1, 2 and 3 definitions and the 15 ton threshold are from memory.
- `src/quizzes/epa-608-core-practice.html`: questions and answers are original and written from memory of the Section 608 Core material.
- `src/guides/ac-running-but-not-cooling.html`: the "about 6 % below rating" capacitor replacement point is a common field rule of thumb, not a standard.
- `src/reference/*.html`: wire colors are conventions as described on the pages.
- `src/guides/how-to-size-a-control-transformer.html`: the VA figures for individual loads are made-up examples and are labeled as such. The 20% margin is a rule of thumb. The inrush method (sealed VA plus the largest inrush) was read from two secondary web sources, not a transformer maker's selection guide. The Class 2 note is from memory and worded as something to check against the label and the code.
- `src/conduit-offset.html` and `js/conduit-offset.js`: the multipliers (6.0, 2.6, 2.0, 1.4, 1.2) and shrink per inch (1/16, 3/16, 1/4, 3/8, 1/2) match three secondary web sources and agree with the trigonometry (cosecant and half-angle tangent) to within rounding, but were not read from a bender maker's manual; the Gardner Bender guide PDF could not be opened in the unattended run. The mark layout (first mark at distance plus shrink, second mark back toward the measured end) is from one secondary source and from memory. The page tells the reader to check their own bender's marks.
