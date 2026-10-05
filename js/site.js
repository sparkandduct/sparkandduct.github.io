// Site-wide behaviour: card and table filters, and the ad-slot preview switch.
(() => {
  // ?ads=1 shows where ad slots sit; ?ads=0 hides them again. Kept for the browser session.
  const ads = new URLSearchParams(location.search).get('ads');
  let preview = ads !== null && ads !== '0';
  try {
    if (ads !== null) sessionStorage.setItem('adPreview', preview ? '1' : '');
    preview = sessionStorage.getItem('adPreview') === '1';
  } catch {
    // Storage can be blocked; the query string still works for the current page.
  }
  document.documentElement.classList.toggle('ad-preview', preview);

  const matches = (el, query) => el.textContent.toLowerCase().includes(query);

  const cardFilter = document.querySelector('[data-filter-cards]');
  if (cardFilter) {
    const empty = document.getElementById('noResults');
    cardFilter.addEventListener('input', () => {
      const query = cardFilter.value.trim().toLowerCase();
      let shown = 0;
      document.querySelectorAll('ul.tools').forEach((list) => {
        let any = false;
        list.querySelectorAll('li').forEach((li) => {
          li.hidden = !matches(li, query);
          if (!li.hidden) any = true;
        });
        list.hidden = !any;
        const heading = list.previousElementSibling;
        if (heading && heading.matches('h2.section')) heading.hidden = !any;
        if (any) shown += 1;
      });
      if (empty) empty.hidden = shown > 0;
    });
  }

  document.querySelectorAll('[data-filter-table]').forEach((input) => {
    const rows = document.querySelectorAll(input.dataset.filterTable + ' tbody tr');
    input.addEventListener('input', () => {
      const query = input.value.trim().toLowerCase();
      rows.forEach((row) => (row.hidden = !matches(row, query)));
    });
  });
})();
