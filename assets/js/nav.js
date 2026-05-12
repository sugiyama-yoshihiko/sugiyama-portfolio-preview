// Disable browser's automatic scroll restoration so navigation lands at top
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Disable bfcache so that back/forward never restores a stale, modal-stuck DOM.
// Any non-empty unload listener prevents the browser from cacheing the page.
window.addEventListener('unload', function () {});
window.addEventListener('beforeunload', function () {});

// If the page was nonetheless restored from bfcache, force a fresh navigation.
window.addEventListener('pageshow', function (e) {
  if (e.persisted) {
    window.location.reload();
  }
});

// Reset any leftover modal / overlay / scroll-lock state on every page show
// (covers normal navigation, bfcache restores, and stuck states)
function resetUIState() {
  document.body.style.overflow = '';
  document.body.classList.remove('menu-active');
  const nw = document.getElementById('header-nav-wrap');
  if (nw) nw.classList.remove('is-open');
  const btn = document.getElementById('navbutton');
  if (btn) btn.setAttribute('aria-expanded', 'false');
  const lb = document.getElementById('lightbox');
  if (lb) {
    lb.setAttribute('aria-hidden', 'true');
    const img = lb.querySelector('.lb-img');
    if (img) img.src = '';
  }
  window.scrollTo(0, 0);
}
window.addEventListener('pageshow', resetUIState);
document.addEventListener('DOMContentLoaded', resetUIState);

const button = document.getElementById('navbutton');
const navWrap = document.getElementById('header-nav-wrap');

button?.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = document.body.classList.toggle('menu-active');
  navWrap.classList.toggle('is-open', isOpen);
  button.setAttribute('aria-expanded', String(isOpen));
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!navWrap?.classList.contains('is-open')) return;
  if (navWrap.contains(e.target) || button?.contains(e.target)) return;
  document.body.classList.remove('menu-active');
  navWrap.classList.remove('is-open');
  button?.setAttribute('aria-expanded', 'false');
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navWrap?.classList.contains('is-open')) {
    document.body.classList.remove('menu-active');
    navWrap.classList.remove('is-open');
    button?.setAttribute('aria-expanded', 'false');
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 820) {
    document.body.classList.remove('menu-active');
    navWrap.classList.remove('is-open');
    button?.setAttribute('aria-expanded', 'false');
  }
});

const revealItems = document.querySelectorAll(
  '.statement-text, .statement-image, .bio-intro, .bio-section, .bio-row'
);

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

  revealItems.forEach((item) => {
    item.classList.add('reveal-item');
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => {
    item.classList.add('is-visible');
  });
}
