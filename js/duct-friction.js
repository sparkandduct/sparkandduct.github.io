// Round duct sizing by friction rate. Imperial form of the round-duct friction equation
// for galvanized steel at standard air: loss (in. w.c. per 100 ft) = 0.109136 * cfm^1.9 / d^5.02.
const K = 0.109136;

function frictionAt(cfm, d) {
  return (K * Math.pow(cfm, 1.9)) / Math.pow(d, 5.02);
}

function diameterFor(cfm, fr) {
  return Math.pow((K * Math.pow(cfm, 1.9)) / fr, 1 / 5.02);
}

// Air speed in feet per minute for a round duct of d inches.
function velocityFpm(cfm, d) {
  const areaSqFt = (Math.PI / 4) * (d / 12) * (d / 12);
  return cfm / areaSqFt;
}

// Friction rate in in. w.c. per 100 ft from available static pressure and total effective length.
function frictionRate(asp, tel) {
  return (asp * 100) / tel;
}

if (typeof module !== 'undefined') module.exports = { frictionAt, diameterFor, velocityFpm, frictionRate };

if (typeof document !== 'undefined') {
  const outs = ['outDia', 'outUp', 'outUpFr', 'outUpV', 'outDown', 'outDownFr', 'outDownV'];

  function showFr() {
    const asp = num('asp');
    const tel = num('tel');
    if (asp > 0 && tel > 0) {
      $('outFr').textContent = fmt(frictionRate(asp, tel), 3) + ' in. w.c. per 100 ft';
      $('useFr').disabled = false;
    } else {
      $('outFr').textContent = fmt(NaN);
      $('useFr').disabled = true;
    }
  }

  function calculate() {
    showFr();
    const status = $('status');
    const cfm = num('cfm');
    const fr = num('fr');
    if (!(cfm > 0) || !(fr > 0)) {
      outs.forEach((id) => ($(id).textContent = fmt(NaN)));
      setStatus(status, false, 'Airflow and friction rate must be greater than zero.');
      return;
    }
    const d = diameterFor(cfm, fr);
    const up = Math.ceil(d - 1e-9);
    const down = Math.max(up - 1, 1);
    $('outDia').textContent = fmt(d, 2) + ' in.';
    $('outUp').textContent = up + ' in.';
    $('outUpFr').textContent = fmt(frictionAt(cfm, up), 3) + ' in. w.c. per 100 ft';
    $('outUpV').textContent = fmt(velocityFpm(cfm, up), 0) + ' ft/min';
    $('outDown').textContent = down + ' in.';
    $('outDownFr').textContent = fmt(frictionAt(cfm, down), 3) + ' in. w.c. per 100 ft';
    $('outDownV').textContent = fmt(velocityFpm(cfm, down), 0) + ' ft/min';
    setStatus(status, true, 'Round galvanized duct at standard air. Fittings, flex duct and rectangular duct are not included.');
  }

  $('useFr').addEventListener('click', () => {
    const asp = num('asp');
    const tel = num('tel');
    if (asp > 0 && tel > 0) { $('fr').value = Math.round(frictionRate(asp, tel) * 1000) / 1000; calculate(); }
  });
  $('calc').addEventListener('input', calculate);
  $('calc').addEventListener('change', calculate);
  calculate();
}
