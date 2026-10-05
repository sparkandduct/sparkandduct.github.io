function calculate() {
  const va = num('rating') * ($('ratingUnit').value === 'kva' ? 1000 : 1);
  const factor = $('phase').value === '3' ? Math.sqrt(3) : 1;
  const primary = num('primary');
  const secondary = num('secondary');

  const amps = (volts) => (va > 0 && volts > 0 ? fmt(va / (factor * volts)) + ' A' : fmt(NaN));
  $('outPrimary').textContent = amps(primary);
  $('outSecondary').textContent = amps(secondary);
  $('outRatio').textContent = primary > 0 && secondary > 0 ? fmt(primary / secondary, 2) + ' : 1' : fmt(NaN);
}

$('calc').addEventListener('input', calculate);
calculate();
