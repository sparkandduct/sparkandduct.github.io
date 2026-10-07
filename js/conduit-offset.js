// Rounded trade values: [multiplier, shrink in inches per inch of offset depth].
const BENDS = {
  '10': [6.0, 1 / 16],
  '22.5': [2.6, 3 / 16],
  '30': [2.0, 1 / 4],
  '45': [1.4, 3 / 8],
  '60': [1.2, 1 / 2],
};

// Inches as a whole number and a fraction to the nearest 1/16, e.g. 5 5/8 in.
function inches(n) {
  if (!Number.isFinite(n)) return fmt(NaN);
  let whole = Math.floor(n);
  let top = Math.round((n - whole) * 16);
  let bottom = 16;
  if (top === 16) { whole += 1; top = 0; }
  while (top > 0 && top % 2 === 0) { top /= 2; bottom /= 2; }
  const parts = [];
  if (whole > 0 || top === 0) parts.push(whole.toLocaleString('en-US'));
  if (top > 0) parts.push(top + '/' + bottom);
  return parts.join(' ') + ' in.';
}

function calculate() {
  const status = $('status');
  const depth = num('depth');
  const distance = num('distance');
  const [multiplier, shrinkPerInch] = BENDS[$('angle').value];
  const radians = (parseFloat($('angle').value) * Math.PI) / 180;

  if (!(depth > 0)) {
    ['outBetween', 'outShrink', 'outFirst', 'outSecond'].forEach((id) => ($(id).textContent = fmt(NaN)));
    $('exact').textContent = '';
    clearStatus(status);
    return;
  }

  const between = depth * multiplier;
  const shrink = depth * shrinkPerInch;
  $('outBetween').textContent = inches(between);
  $('outShrink').textContent = inches(shrink);
  $('exact').textContent =
    'By trigonometry, unrounded: ' + fmt(depth / Math.sin(radians)) + ' in. between bends and ' +
    fmt(depth * Math.tan(radians / 2)) + ' in. of shrink.';

  if (!(distance > 0)) {
    $('outFirst').textContent = fmt(NaN);
    $('outSecond').textContent = fmt(NaN);
    clearStatus(status);
    return;
  }

  const first = distance + shrink;
  const second = first - between;
  $('outFirst').textContent = inches(first);
  if (second < 0) {
    $('outSecond').textContent = fmt(NaN);
    setStatus(status, false, 'The second mark falls off the end of the conduit. Use a steeper angle or start farther back.');
    return;
  }
  $('outSecond').textContent = inches(second);
  clearStatus(status);
}

$('calc').addEventListener('input', calculate);
calculate();
