const FIELDS = ['volts', 'amps', 'ohms', 'watts'];
const OUTPUTS = { volts: ['outVolts', ' V'], amps: ['outAmps', ' A'], ohms: ['outOhms', ' Ω'], watts: ['outWatts', ' W'] };

function show(values) {
  FIELDS.forEach((id) => {
    const [out, unit] = OUTPUTS[id];
    $(out).textContent = values ? fmt(values[id], values[id] < 10 ? 3 : 2) + unit : fmt(NaN);
  });
}

function calculate() {
  const status = $('status');
  const given = FIELDS.filter((id) => $(id).value.trim() !== '');
  const v = Object.fromEntries(FIELDS.map((id) => [id, num(id)]));

  if (given.length < 2) {
    show(null);
    clearStatus(status);
    return;
  }
  if (given.length > 2) {
    show(null);
    setStatus(status, false, 'Fill in only two boxes. Clear the others.');
    return;
  }
  if (given.some((id) => !(v[id] > 0))) {
    show(null);
    setStatus(status, false, 'Both values must be greater than zero.');
    return;
  }

  const has = (id) => given.includes(id);
  let { volts: V, amps: I, ohms: R, watts: P } = v;
  if (has('volts') && has('amps')) { R = V / I; P = V * I; }
  else if (has('volts') && has('ohms')) { I = V / R; P = (V * V) / R; }
  else if (has('volts') && has('watts')) { I = P / V; R = (V * V) / P; }
  else if (has('amps') && has('ohms')) { V = I * R; P = I * I * R; }
  else if (has('amps') && has('watts')) { V = P / I; R = P / (I * I); }
  else { V = Math.sqrt(P * R); I = Math.sqrt(P / R); }

  show({ volts: V, amps: I, ohms: R, watts: P });
  clearStatus(status);
}

$('calc').addEventListener('input', calculate);
$('clear').addEventListener('click', () => {
  FIELDS.forEach((id) => ($(id).value = ''));
  calculate();
});
calculate();
