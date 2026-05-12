(() => {
  const triggers = Array.from(document.querySelectorAll('.lb-trigger'));
  if (!triggers.length) return;
  const lb = document.getElementById('lightbox');
  const img = lb.querySelector('.lb-img');
  const cap = lb.querySelector('.lb-caption');
  const closeBtn = lb.querySelector('.lb-close');
  const prevBtn = lb.querySelector('.lb-prev');
  const nextBtn = lb.querySelector('.lb-next');
  let idx = 0;

  function show(i) {
    if (i < 0) i = triggers.length - 1;
    if (i >= triggers.length) i = 0;
    idx = i;
    const t = triggers[idx];
    img.src = t.href;
    cap.textContent = t.dataset.date || '';
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    lb.setAttribute('aria-hidden', 'true');
    img.src = '';
    document.body.style.overflow = '';
  }
  triggers.forEach((t, i) => {
    t.addEventListener('click', (e) => { e.preventDefault(); show(i); });
  });
  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => show(idx - 1));
  nextBtn.addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => {
    if (lb.getAttribute('aria-hidden') === 'true') return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(idx - 1);
    else if (e.key === 'ArrowRight') show(idx + 1);
  });
})();
