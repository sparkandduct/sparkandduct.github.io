// Circular mil areas, NEC Chapter 9 Table 8 (24-20 AWG from standard AWG tables).
const WIRES = [
  ['24 AWG', 404], ['22 AWG', 642], ['20 AWG', 1020], ['18 AWG', 1620],
  ['16 AWG', 2580], ['14 AWG', 4110], ['12 AWG', 6530], ['10 AWG', 10380],
  ['8 AWG', 16510], ['6 AWG', 26240], ['4 AWG', 41740], ['3 AWG', 52620],
  ['2 AWG', 66360], ['1 AWG', 83690], ['1/0', 105600], ['2/0', 133100],
  ['3/0', 167800], ['4/0', 211600],
];

// Approximate resistivity in ohm-cmil/ft at 75 C.
const K = { cu: 12.9, al: 21.2 };

const PRESETS = {
  general: { volts: 120, limitType: 'pct', limit: 3, size: '12 AWG', phase: '2' },
  nac: { volts: 20.4, limitType: 'min', limit: 16, size: '14 AWG', phase: '2' },
  dc12: { volts: 12, limitType: 'pct', limit: 10, size: '18 AWG', phase: '2' },
};

function applyPreset() {
  const p = PRESETS[$('preset').value];
  $('volts').value = p.volts;
  $('limitType').value = p.limitType;
  $('limit').value = p.limit;
  $('size').value = p.size;
  $('phase').value = p.phase;
  calculate();
}

function calculate() {
  const cm = WIRES.find((w) => w[0] === $('size').value)[1];
  const k = K[$('material').value];
  const m = parseFloat($('phase').value);
  const amps = num('amps');
  const feet = num('feet');
  const volts = num('volts');
  const limit = num('limit');
  const status = $('status');

  $('limitLabel').textContent =
    $('limitType').value === 'pct' ? 'Maximum drop (%)' : 'Minimum voltage at load (V)';

  if (![amps, feet, volts].every((v) => v > 0)) {
    ['outDrop', 'outPct', 'outLoad', 'outMaxLen'].forEach((id) => ($(id).textContent = fmt(NaN)));
    clearStatus(status);
    return;
  }

  const dropAt = (area) => (m * k * amps * feet) / area;
  const drop = dropAt(cm);
  $('outDrop').textContent = fmt(drop) + ' V';
  $('outPct').textContent = fmt((drop / volts) * 100, 1) + ' %';
  $('outLoad').textContent = fmt(volts - drop) + ' V';

  const allowed = $('limitType').value === 'pct' ? (volts * limit) / 100 : volts - limit;
  if (!(allowed > 0)) {
    $('outMaxLen').textContent = fmt(NaN);
    clearStatus(status);
    return;
  }

  $('outMaxLen').textContent = fmt((allowed * cm) / (m * k * amps), 0) + ' ft';

  if (drop <= allowed) {
    setStatus(status, true, `Passes: ${fmt(drop)} V drop is within the ${fmt(allowed)} V allowed.`);
  } else {
    const fix = WIRES.find((w) => dropAt(w[1]) <= allowed);
    setStatus(
      status,
      false,
      `Fails: ${fmt(drop)} V drop exceeds the ${fmt(allowed)} V allowed. ` +
        (fix ? `Smallest size that passes: ${fix[0]}.` : 'No size up to 4/0 passes; shorten the run or split the load.')
    );
  }
}

fillSelect($('size'), WIRES.map((w) => w[0]), '12 AWG');
$('preset').addEventListener('change', applyPreset);
document.querySelectorAll('#calc input, #calc select:not(#preset)').forEach((el) =>
  el.addEventListener('input', calculate)
);
applyPreset();
