// Common sealed lead-acid sizes in amp-hours.
const BATTERY_SIZES = [1.3, 4.5, 7, 12, 18, 26, 35, 55, 75, 100];

// Starting rows are examples only; real currents come from the data sheets.
const EXAMPLE_ROWS = [
  ['Control panel', 1, 120, 250],
  ['Smoke detector', 20, 0.3, 2],
  ['Horn strobe', 10, 0, 95],
];

const body = $('deviceRows');

function addRow([name, qty, standby, alarm] = ['', 1, 0, 0]) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input type="text" value="${name}" aria-label="Device"></td>
    <td><input type="number" class="qty" min="0" step="1" value="${qty}" aria-label="Quantity"></td>
    <td><input type="number" class="standby" min="0" step="any" value="${standby}" aria-label="Standby mA each"></td>
    <td><input type="number" class="alarm" min="0" step="any" value="${alarm}" aria-label="Alarm mA each"></td>
    <td><button type="button" class="plain" aria-label="Remove row">&times;</button></td>`;
  tr.querySelector('button').addEventListener('click', () => {
    tr.remove();
    calculate();
  });
  body.appendChild(tr);
}

function calculate() {
  let standbyMa = 0;
  let alarmMa = 0;
  body.querySelectorAll('tr').forEach((tr) => {
    const qty = parseFloat(tr.querySelector('.qty').value) || 0;
    standbyMa += qty * (parseFloat(tr.querySelector('.standby').value) || 0);
    alarmMa += qty * (parseFloat(tr.querySelector('.alarm').value) || 0);
  });

  const hours = num('hours');
  const minutes = num('minutes');
  const factor = num('factor');
  const status = $('status');

  $('outStandby').textContent = fmt(standbyMa / 1000, 3) + ' A';
  $('outAlarm').textContent = fmt(alarmMa / 1000, 3) + ' A';

  if (!(hours >= 0 && minutes >= 0 && factor > 0)) {
    $('outRaw').textContent = $('outRequired').textContent = fmt(NaN);
    clearStatus(status);
    return;
  }

  const raw = (standbyMa / 1000) * hours + (alarmMa / 1000) * (minutes / 60);
  const required = raw * factor;
  $('outRaw').textContent = fmt(raw) + ' Ah';
  $('outRequired').textContent = fmt(required) + ' Ah';

  const size = BATTERY_SIZES.find((s) => s >= required);
  if (required === 0) {
    clearStatus(status);
  } else if (size) {
    setStatus(status, true, `Next standard battery size: ${size} Ah.`);
  } else {
    setStatus(status, false, 'Over 100 Ah: use a larger battery set or reduce the load.');
  }
}

EXAMPLE_ROWS.forEach(addRow);
$('addRow').addEventListener('click', () => {
  addRow();
  calculate();
});
$('calc').addEventListener('input', calculate);
calculate();
