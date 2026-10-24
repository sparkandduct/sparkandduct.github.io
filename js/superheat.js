const PT_START = -20;
const PT_STEP = 2;
// Saturation gauge pressure (psig, sea level) every 2 F from -20 F up to 140 F.
const PT = {
  'R-410A': [26.2, 28.1, 30.0, 32.0, 34.1, 36.3, 38.5, 40.8, 43.2, 45.7, 48.2, 50.8, 53.5, 56.3, 59.2, 62.2, 65.2, 68.4, 71.6, 74.9, 78.4, 81.9, 85.5, 89.2, 93.1, 97.0, 101.1, 105.2, 109.5, 113.9, 118.4, 123.0, 127.7, 132.6, 137.5, 142.6, 147.9, 153.2, 158.7, 164.4, 170.1, 176.0, 182.1, 188.3, 194.6, 201.1, 207.7, 214.5, 221.4, 228.5, 235.7, 243.2, 250.7, 258.5, 266.4, 274.5, 282.7, 291.2, 299.8, 308.6, 317.6, 326.7, 336.1, 345.7, 355.4, 365.4, 375.5, 385.9, 396.5, 407.3, 418.3, 429.6, 441.0, 452.7, 464.7, 476.8, 489.3, 501.9, 514.9, 528.0, 541.5],
  'R-22': [10.2, 11.4, 12.6, 13.9, 15.2, 16.5, 17.9, 19.4, 20.9, 22.4, 24.0, 25.7, 27.4, 29.2, 31.0, 32.8, 34.8, 36.8, 38.8, 40.9, 43.1, 45.3, 47.6, 50.0, 52.4, 55.0, 57.5, 60.2, 62.9, 65.7, 68.6, 71.5, 74.5, 77.6, 80.8, 84.1, 87.4, 90.8, 94.4, 98.0, 101.6, 105.4, 109.3, 113.2, 117.3, 121.4, 125.7, 130.0, 134.5, 139.0, 143.6, 148.4, 153.2, 158.2, 163.2, 168.4, 173.7, 179.1, 184.6, 190.2, 195.9, 201.8, 207.7, 213.8, 220.0, 226.4, 232.8, 239.4, 246.1, 253.0, 260.0, 267.1, 274.3, 281.7, 289.2, 296.9, 304.7, 312.6, 320.7, 329.0, 337.4],
};

// Saturation temperature (F) for a gauge pressure, by straight-line steps between table rows.
function satTemp(fluid, psig) {
  const t = PT[fluid];
  if (psig < t[0] || psig > t[t.length - 1]) return NaN;
  let i = 0;
  while (i < t.length - 2 && psig > t[i + 1]) i++;
  return PT_START + PT_STEP * (i + (psig - t[i]) / (t[i + 1] - t[i]));
}

function calculate() {
  const fluid = $('fluid').value;
  const status = $('status');
  const cells = ['outSatLow', 'outSuper', 'outSatHigh', 'outSub'];
  const pLow = num('suctionP'), tLow = num('suctionT');
  const pHigh = num('liquidP'), tHigh = num('liquidT');
  const targetSh = num('targetSh'), targetSc = num('targetSc');
  cells.forEach((id) => ($(id).textContent = fmt(NaN)));
  clearStatus(status);
  const msgs = [];
  let bad = false;

  if (Number.isFinite(pLow) && Number.isFinite(tLow)) {
    const sat = satTemp(fluid, pLow);
    if (Number.isNaN(sat)) { bad = true; msgs.push('Suction pressure is outside the table range for ' + fluid + '.'); }
    else {
      $('outSatLow').textContent = fmt(sat, 1) + '\u00b0F';
      $('outSuper').textContent = fmt(tLow - sat, 1) + '\u00b0F';
      if (Number.isFinite(targetSh)) {
        const d = tLow - sat - targetSh;
        msgs.push('Superheat is ' + fmt(Math.abs(d), 1) + '\u00b0F ' + (d > 0 ? 'above' : d < 0 ? 'below' : 'at') + (d === 0 ? '' : ' your target') + '.');
      }
    }
  }
  if (Number.isFinite(pHigh) && Number.isFinite(tHigh)) {
    const sat = satTemp(fluid, pHigh);
    if (Number.isNaN(sat)) { bad = true; msgs.push('Liquid line pressure is outside the table range for ' + fluid + '.'); }
    else {
      $('outSatHigh').textContent = fmt(sat, 1) + '\u00b0F';
      $('outSub').textContent = fmt(sat - tHigh, 1) + '\u00b0F';
      if (Number.isFinite(targetSc)) {
        const d = sat - tHigh - targetSc;
        msgs.push('Subcooling is ' + fmt(Math.abs(d), 1) + '\u00b0F ' + (d > 0 ? 'above' : d < 0 ? 'below' : 'at') + (d === 0 ? '' : ' your target') + '.');
      }
    }
  }
  if (msgs.length) setStatus(status, !bad, msgs.join(' '));
}

['fluid', 'suctionP', 'suctionT', 'liquidP', 'liquidT', 'targetSh', 'targetSc'].forEach((id) => {
  $(id).addEventListener('input', calculate);
});
calculate();
