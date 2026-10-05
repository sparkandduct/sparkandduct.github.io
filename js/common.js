const $ = (id) => document.getElementById(id);

// Numeric value of an input, NaN when empty or not a number.
const num = (id) => parseFloat($(id).value);

const fmt = (n, digits = 2) =>
  Number.isFinite(n)
    ? n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })
    : '—';

function setStatus(el, ok, text) {
  el.className = 'status ' + (ok ? 'ok' : 'bad');
  el.textContent = text;
}

function clearStatus(el) {
  el.className = 'status';
  el.textContent = '';
}

function fillSelect(select, labels, selected) {
  select.innerHTML = labels
    .map((l) => `<option${l === selected ? ' selected' : ''}>${l}</option>`)
    .join('');
}
