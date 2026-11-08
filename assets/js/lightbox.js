(() => {
  const triggers = [...document.querySelectorAll('.lb-trigger')];
  const lb = document.getElementById('lightbox');
  if (!triggers.length || !lb) return;
  const img = lb.querySelector('.lb-img'), cap = lb.querySelector('.lb-caption');
  const closeBtn = lb.querySelector('.lb-close'), prev = lb.querySelector('.lb-prev'), next = lb.querySelector('.lb-next');
  let idx = 0, opener;
  const background = [...document.body.children].filter(el => el !== lb && !el.contains(lb) && el.tagName !== 'SCRIPT');
  function show(i) {
    idx = (i + triggers.length) % triggers.length;
    const t = triggers[idx];
    img.src = t.href;
    img.alt = t.querySelector('img')?.alt || '作品写真';
    cap.textContent = `${idx + 1} / ${triggers.length} — ${img.alt}`;
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    background.forEach(el => el.inert = true);
  }
  function close(restore = true) {
    lb.setAttribute('aria-hidden', 'true');
    img.removeAttribute('src');
    document.body.style.overflow = '';
    background.forEach(el => el.inert = false);
    if (restore) opener?.focus();
  }
  triggers.forEach((t, i) => t.addEventListener('click', e => { e.preventDefault(); opener = t; show(i); closeBtn.focus(); }));
  closeBtn.addEventListener('click', () => close());
  prev.addEventListener('click', () => show(idx - 1));
  next.addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (lb.getAttribute('aria-hidden') === 'true') return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(idx - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); show(idx + 1); }
    if (e.key === 'Tab') {
      const controls = [closeBtn, prev, next];
      const i = controls.indexOf(document.activeElement);
      e.preventDefault(); controls[(i + (e.shiftKey ? -1 : 1) + 3) % 3].focus();
    }
  });
  window.addEventListener('pageshow', () => close(false));
})();
