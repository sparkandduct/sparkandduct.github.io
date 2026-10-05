// EMT total internal area in square inches, NEC Chapter 9 Table 4.
const EMT = [
  ['1/2"', 0.304], ['3/4"', 0.533], ['1"', 0.864], ['1-1/4"', 1.496],
  ['1-1/2"', 2.036], ['2"', 3.356], ['2-1/2"', 5.858], ['3"', 8.846],
  ['3-1/2"', 11.545], ['4"', 14.753],
];

// THHN/THWN-2 conductor area in square inches, NEC Chapter 9 Table 5.
const THHN = [
  ['14 AWG', 0.0097], ['12 AWG', 0.0133], ['10 AWG', 0.0211], ['8 AWG', 0.0366],
  ['6 AWG', 0.0507], ['4 AWG', 0.0824], ['3 AWG', 0.0973], ['2 AWG', 0.1158],
  ['1 AWG', 0.1562], ['1/0', 0.1855], ['2/0', 0.2223], ['3/0', 0.2679],
  ['4/0', 0.3237],
];

const CUSTOM = 'Cable (enter OD)';
const body = $('wireRows');

// NEC Chapter 9 Table 1: allowed fill by number of conductors.
const allowedPct = (count) => (count === 1 ? 53 : count === 2 ? 31 : 40);

function addRow(type = '12 AWG', qty = 3, od = '') {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><select class="type" aria-label="Conductor"></select></td>
    <td><input type="number" class="od" min="0" step="any" value="${od}" placeholder="in" aria-label="Cable outside diameter in inches"></td>
    <td><input type="number" class="qty" min="0" step="1" value="${qty}" aria-label="Quantity"></td>
    <td><button type="button" class="plain" aria-label="Remove row">&times;</button></td>`;
  fillSelect(tr.querySelector('.type'), [...THHN.map((w) => 'THHN ' + w[0]), CUSTOM],
    type === CUSTOM ? CUSTOM : 'THHN ' + type);
  tr.querySelector('button').addEventListener('click', () => {
    tr.remove();
    calculate();
  });
  body.appendChild(tr);
}

function calculate() {
  let area = 0;
  let count = 0;
  body.querySelectorAll('tr').forEach((tr) => {
    const type = tr.querySelector('.type').value;
    const od = tr.querySelector('.od');
    const qty = Math.max(0, Math.floor(parseFloat(tr.querySelector('.qty').value) || 0));
    od.disabled = type !== CUSTOM;
    let each;
    if (type === CUSTOM) {
      const d = parseFloat(od.value) || 0;
      each = (Math.PI * d * d) / 4;
    } else {
      each = THHN.find((w) => 'THHN ' + w[0] === type)[1];
    }
    area += qty * each;
    if (each > 0) count += qty;
  });

  const status = $('status');
  const conduitArea = EMT.find((c) => c[0] === $('conduit').value)[1];

  if (count === 0) {
    ['outArea', 'outFill', 'outAllowed'].forEach((id) => ($(id).textContent = fmt(NaN)));
    clearStatus(status);
    return;
  }

  const limit = allowedPct(count);
  const fill = (area / conduitArea) * 100;
  $('outArea').textContent = fmt(area, 4) + ' in²';
  $('outFill').textContent = fmt(fill, 1) + ' %';
  $('outAllowed').textContent = limit + ' %';

  const smallest = EMT.find((c) => (area / c[1]) * 100 <= limit);
  if (fill <= limit) {
    setStatus(status, true, `Passes: ${fmt(fill, 1)} % fill against ${limit} % allowed.` +
      (smallest && smallest[0] !== $('conduit').value ? ` Smallest EMT that passes: ${smallest[0]}.` : ''));
  } else {
    setStatus(status, false, `Fails: ${fmt(fill, 1)} % fill exceeds ${limit} % allowed. ` +
      (smallest ? `Smallest EMT that passes: ${smallest[0]}.` : 'No single EMT up to 4" passes; split the run.'));
  }
}

fillSelect($('conduit'), EMT.map((c) => c[0]), '3/4"');
addRow();
$('addRow').addEventListener('click', () => {
  addRow('12 AWG', 1);
  calculate();
});
$('calc').addEventListener('input', calculate);
calculate();
