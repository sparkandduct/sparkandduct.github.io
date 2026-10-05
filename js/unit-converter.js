// Each unit's size in the group's base unit (BTU/h, pascals, CFM).
const GROUPS = {
  capacity: { 'BTU/h': 1, Tons: 12000, kW: 3412.142, Watts: 3.412142 },
  pressure: { 'in. w.c.': 249.089, psi: 6894.757, kPa: 1000, Pa: 1 },
  airflow: { CFM: 1, 'L/s': 2.118880, 'm³/h': 0.588578 },
  temperature: { '°F': null, '°C': null },
};

// Enough digits to be useful at any size without a long tail.
const tidy = (n) => {
  const size = Math.abs(n);
  if (size > 0 && size < 1) return String(Number(n.toPrecision(3)));
  return fmt(n, size >= 1000 ? 0 : size >= 100 ? 1 : 2);
};

function convert(group, value, from, to) {
  if (group === 'temperature') {
    const celsius = from === '°C' ? value : ((value - 32) * 5) / 9;
    return to === '°C' ? celsius : (celsius * 9) / 5 + 32;
  }
  return (value * GROUPS[group][from]) / GROUPS[group][to];
}

function setGroup() {
  const group = $('group').value;
  fillSelect($('from'), Object.keys(GROUPS[group]), group === 'capacity' ? 'Tons' : undefined);
  calculate();
}

function calculate() {
  const group = $('group').value;
  const from = $('from').value;
  const value = num('value');
  $('results').innerHTML = Object.keys(GROUPS[group])
    .filter((unit) => unit !== from)
    .map((unit) => {
      const out = Number.isFinite(value) ? tidy(convert(group, value, from, unit)) : fmt(NaN);
      return `<div><dt>${unit}</dt><dd>${out}</dd></div>`;
    })
    .join('');
}

$('group').addEventListener('change', setGroup);
$('from').addEventListener('change', calculate);
$('value').addEventListener('input', calculate);
setGroup();
