// Table 314.16(B) allowances in cubic inches, per conductor.
const ALLOWANCE = { '14': 2.0, '12': 2.25, '10': 2.5, '8': 3.0, '6': 5.0 };
const SIZES = Object.keys(ALLOWANCE);

function boxFill(input) {
  const rows = [];
  let largest = 0;
  SIZES.forEach((s) => {
    const n = input.counts[s] || 0;
    if (n > 0) {
      rows.push([n + ' &times; ' + s + ' AWG conductor' + (n > 1 ? 's' : ''), n * ALLOWANCE[s]]);
      largest = Math.max(largest, ALLOWANCE[s]);
    }
  });
  if (input.grounds > 0) {
    const g = ALLOWANCE[input.groundSize];
    largest = Math.max(largest, g);
    let units = 1;
    if (input.edition === '2023' && input.grounds > 4) units += (input.grounds - 4) / 4;
    rows.push([input.grounds + ' equipment grounding conductor' + (input.grounds > 1 ? 's' : '') + ', ' + units + ' &times; ' + input.groundSize + ' AWG', units * g]);
  }
  if (input.clamps) rows.push(['Internal cable clamps (all together)', largest]);
  if (input.fittings > 0) rows.push([input.fittings + ' support fitting' + (input.fittings > 1 ? 's' : ''), input.fittings * largest]);
  if (input.yokes > 0) rows.push([input.yokes + ' device yoke' + (input.yokes > 1 ? 's' : '') + ' &times; 2', input.yokes * 2 * largest]);
  const total = rows.reduce((t, r) => t + r[1], 0);
  return { rows, total };
}

if (typeof document !== 'undefined') {
  const int = (id) => Math.max(0, parseInt($(id).value, 10) || 0);

  function calculate() {
    const counts = {};
    SIZES.forEach((s) => (counts[s] = int('n' + s)));
    const r = boxFill({
      counts,
      grounds: int('grounds'),
      groundSize: $('groundSize').value,
      edition: $('edition').value,
      clamps: $('clamps').checked,
      fittings: int('fittings'),
      yokes: int('yokes'),
    });
    const vol = num('volume');
    $('outRows').innerHTML = r.rows.map((x) => `<tr><td>${x[0]}</td><td>${fmt(x[1])}</td></tr>`).join('');
    $('outTotal').textContent = r.total > 0 ? fmt(r.total) + ' in³' : fmt(NaN);
    const status = $('status');
    if (!(vol > 0) || r.total === 0) {
      $('outVolume').textContent = fmt(NaN);
      clearStatus(status);
      return;
    }
    $('outVolume').textContent = fmt(vol - r.total) + ' in³';
    if (r.total <= vol) setStatus(status, true, 'Fits: ' + fmt(vol - r.total) + ' in³ to spare in a ' + fmt(vol, 1) + ' in³ box.');
    else setStatus(status, false, 'Too full by ' + fmt(r.total - vol) + ' in³. Use a deeper or larger box.');
  }

  $('calc').addEventListener('input', calculate);
  $('calc').addEventListener('change', calculate);
  calculate();
}
if (typeof module !== 'undefined') module.exports = { boxFill };
