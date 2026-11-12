// PoE cable drop. Solid copper conductors; resistance from the AWG diameter formula.
const RHO_20C = 1.724e-8; // ohm-meters, copper at 20 C
const ALPHA = 0.00393; // per degree C
const LOOP_LIMIT = 12.5; // ohms, maximum pairset DC loop resistance (IEEE 802.3)

// Resistance of one conductor, ohms, for a length in meters.
function conductorOhms(awg, meters, tempC) {
  const dMm = 0.127 * Math.pow(92, (36 - awg) / 39);
  const areaM2 = (Math.PI / 4) * dMm * dMm * 1e-6;
  return ((RHO_20C * meters) / areaM2) * (1 + ALPHA * (tempC - 20));
}

// pairs: 2 or 4. Returns the loop resistance of the powered path.
function loopOhms(awg, meters, tempC, pairs) {
  const r = conductorOhms(awg, meters, tempC); // two pairs in series, each pair two conductors in parallel
  return pairs === 4 ? r / 2 : r;
}

// Solve for current when the PD must receive pdWatts: P = V*I - I^2*R.
function solvePoe(awg, meters, tempC, pairs, volts, pdWatts) {
  const r = loopOhms(awg, meters, tempC, pairs);
  const disc = volts * volts - 4 * r * pdWatts;
  if (disc < 0) return { r, feasible: false };
  const amps = (volts - Math.sqrt(disc)) / (2 * r);
  const drop = amps * r;
  return { r, feasible: true, amps, drop, pdVolts: volts - drop, loss: amps * amps * r, pseWatts: volts * amps };
}

// Length (m) at which one conductor reaches the 12.5 ohm limit (the 4-pair limit is the same per pairset).
function limitMeters(awg, tempC) {
  return LOOP_LIMIT / conductorOhms(awg, 1, tempC);
}

if (typeof module !== 'undefined') module.exports = { conductorOhms, loopOhms, solvePoe, limitMeters };

if (typeof document !== 'undefined') {
  const FT = 0.3048;
  const outs = ['outLoop', 'outAmps', 'outDrop', 'outPd', 'outLoss', 'outPse', 'outLimit'];

  function calculate() {
    const status = $('status');
    const awg = parseInt($('awg').value, 10);
    const pairs = parseInt($('pairs').value, 10);
    const feet = $('unit').value === 'ft';
    const len = num('len');
    const meters = feet ? len * FT : len;
    const temp = num('temp');
    const volts = num('volts');
    const power = num('power');
    const pdMin = num('pdMin');
    if (!(meters > 0) || !(volts > 0) || !(power > 0) || !Number.isFinite(temp)) {
      outs.forEach((id) => ($(id).textContent = fmt(NaN)));
      setStatus(status, false, 'Length, voltage and device power must be greater than zero, and temperature must be a number.');
      return;
    }
    const lim = limitMeters(awg, temp);
    $('outLimit').textContent = feet ? fmt(lim / FT, 0) + ' ft' : fmt(lim, 0) + ' m';
    const s = solvePoe(awg, meters, temp, pairs, volts, power);
    $('outLoop').textContent = fmt(s.r, 2) + ' Ω';
    if (!s.feasible) {
      ['outAmps', 'outDrop', 'outPd', 'outLoss', 'outPse'].forEach((id) => ($(id).textContent = fmt(NaN)));
      setStatus(status, false, 'This cable cannot deliver that power at this voltage: the loss in the cable would use all of it.');
      return;
    }
    $('outAmps').textContent = fmt(s.amps, 3) + ' A';
    $('outDrop').textContent = fmt(s.drop, 2) + ' V';
    $('outPd').textContent = fmt(s.pdVolts, 2) + ' V';
    $('outLoss').textContent = fmt(s.loss, 2) + ' W';
    $('outPse').textContent = fmt(s.pseWatts, 2) + ' W';
    const notes = [];
    let ok = true;
    const limit = pairs === 4 ? LOOP_LIMIT / 2 : LOOP_LIMIT;
    if (s.r > limit) { ok = false; notes.push('Loop resistance is above the ' + limit + ' Ω limit for ' + pairs + '-pair powering in IEEE 802.3.'); }
    if (pairs === 2 && power > 25.5) { ok = false; notes.push('Two-pair powering is defined only up to 25.5 W at the device; use four pairs.'); }
    if (Number.isFinite(pdMin) && s.pdVolts < pdMin) { ok = false; notes.push('Voltage at the device is below the minimum you entered.'); }
    if (ok) setStatus(status, true, 'Within the limits checked here. Length does not include patch cords unless you added them.');
    else setStatus(status, false, notes.join(' '));
  }

  $('cls').addEventListener('change', () => {
    if ($('cls').value) { $('power').value = $('cls').value; calculate(); }
  });
  $('power').addEventListener('input', () => { $('cls').value = ''; });
  $('calc').addEventListener('input', calculate);
  $('calc').addEventListener('change', calculate);
  calculate();
}
