const BTU_PER_KW = 3412;
// Sensible heat factor for standard air at sea level: BTU/h = 1.08 x CFM x dT.
const SENSIBLE = 1.08;

function heatCfm() {
  const amount = num('heatAmount');
  const rise = num('heatRise');
  const btu = $('heatUnit').value === 'kw' ? amount * BTU_PER_KW : amount;
  $('outHeatBtu').textContent = amount > 0 ? fmt(btu, 0) + ' BTU/h' : fmt(NaN);
  $('outHeatCfm').textContent = amount > 0 && rise > 0 ? fmt(btu / (SENSIBLE * rise), 0) + ' CFM' : fmt(NaN);
}

function coolCfm() {
  const tons = num('tons');
  const perTon = num('perTon');
  $('outCoolCfm').textContent = tons > 0 && perTon > 0 ? fmt(tons * perTon, 0) + ' CFM' : fmt(NaN);
  $('outCoolBtu').textContent = tons > 0 ? fmt(tons * 12000, 0) + ' BTU/h' : fmt(NaN);
}

function ductVelocity() {
  const round = $('ductShape').value === 'round';
  $('ductHeightWrap').hidden = round;
  $('ductWidthLabel').textContent = round ? 'Diameter (in)' : 'Width (in)';

  const cfm = num('ductCfm');
  const w = num('ductWidth');
  const h = num('ductHeight');
  const sqIn = round ? (Math.PI * w * w) / 4 : w * h;
  const ok = cfm > 0 && sqIn > 0;
  $('outDuctArea').textContent = sqIn > 0 ? fmt(sqIn / 144, 2) + ' ft²' : fmt(NaN);
  $('outDuctFpm').textContent = ok ? fmt(cfm / (sqIn / 144), 0) + ' FPM' : fmt(NaN);
}

function calculate() {
  heatCfm();
  coolCfm();
  ductVelocity();
}

document.querySelector('main').addEventListener('input', calculate);
calculate();
