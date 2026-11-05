// Power relations for balanced AC loads. Voltage is line-to-line for three-phase.
const SQRT3 = Math.sqrt(3);

// phases: 3 or 1. known: 'amps', 'kw' or 'kva'. Returns { amps, kw, kva, kvar }.
function solvePower(phases, volts, pf, known, value) {
  const k = phases === 3 ? SQRT3 : 1;
  let kva;
  if (known === 'amps') kva = (k * volts * value) / 1000;
  else if (known === 'kva') kva = value;
  else kva = value / pf;
  const kw = kva * pf;
  const amps = (kva * 1000) / (k * volts);
  const kvar = Math.sqrt(Math.max(kva * kva - kw * kw, 0));
  return { amps, kw, kva, kvar };
}

if (typeof document !== 'undefined') {
  const LABELS = { amps: 'Current (A)', kw: 'Real power (kW)', kva: 'Apparent power (kVA)' };

  function calculate() {
    const status = $('status');
    const known = $('known').value;
    $('valueLabel').firstChild.textContent = LABELS[known] + ' ';
    const phases = parseInt($('phase').value, 10);
    const volts = num('volts');
    const pf = num('pf');
    const value = num('value');
    const out = ['outAmps', 'outKw', 'outKva', 'outKvar'];
    if (!(volts > 0) || !(value > 0) || !(pf > 0)) {
      out.forEach((id) => ($(id).textContent = fmt(NaN)));
      setStatus(status, false, 'Voltage, power factor and the known value must all be greater than zero.');
      return;
    }
    if (pf > 1) {
      out.forEach((id) => ($(id).textContent = fmt(NaN)));
      setStatus(status, false, 'Power factor cannot be above 1.');
      return;
    }
    const r = solvePower(phases, volts, pf, known, value);
    $('outAmps').textContent = fmt(r.amps, 1) + ' A';
    $('outKw').textContent = fmt(r.kw, 2) + ' kW';
    $('outKva').textContent = fmt(r.kva, 2) + ' kVA';
    $('outKvar').textContent = fmt(r.kvar, 2) + ' kVAR';
    clearStatus(status);
  }

  $('calc').addEventListener('input', calculate);
  calculate();
}
