// Renders the questions in #quizData ([{q, options, answer, why}]) into #quiz and marks them.
const questions = JSON.parse($('quizData').textContent);
const quiz = $('quiz');

quiz.innerHTML = questions
  .map(
    (item, i) => `
    <section class="card question" data-answer="${item.answer}">
      <fieldset>
        <legend>${i + 1}. ${item.q}</legend>
        ${item.options
          .map((o, j) => `<label><input type="radio" name="q${i}" value="${j}"> <span>${o}</span></label>`)
          .join('')}
      </fieldset>
      <p class="explain" hidden>${item.why}</p>
    </section>`
  )
  .join('');

function mark() {
  let score = 0;
  let answered = 0;
  quiz.querySelectorAll('.question').forEach((el) => {
    const answer = Number(el.dataset.answer);
    const picked = el.querySelector('input:checked');
    el.querySelectorAll('label').forEach((label, j) => {
      label.classList.toggle('right', j === answer);
      label.classList.toggle('wrong', picked !== null && Number(picked.value) === j && j !== answer);
    });
    el.querySelector('.explain').hidden = false;
    if (picked) answered += 1;
    if (picked && Number(picked.value) === answer) score += 1;
  });
  const pct = Math.round((score / questions.length) * 100);
  const skipped = questions.length - answered;
  setStatus(
    $('status'),
    pct >= 70,
    `Score: ${score} of ${questions.length} (${pct}%).` + (skipped ? ` ${skipped} not answered.` : '')
  );
  $('status').scrollIntoView({ block: 'nearest' });
}

function reset() {
  quiz.querySelectorAll('input').forEach((input) => (input.checked = false));
  quiz.querySelectorAll('label').forEach((label) => label.classList.remove('right', 'wrong'));
  quiz.querySelectorAll('.explain').forEach((p) => (p.hidden = true));
  clearStatus($('status'));
  window.scrollTo(0, 0);
}

$('check').addEventListener('click', mark);
$('reset').addEventListener('click', reset);
