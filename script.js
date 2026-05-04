/*=============================================
 LA GASSA SALON – LUXURY BARBER WEBSITE
 IntersectionObserver, Language Toggle, Form
=============================================*/
document.addEventListener('DOMContentLoaded', () => {
  // Loader
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => { setTimeout(() => { loader.classList.add('hidden'); document.body.style.overflow = ''; }, 600); });
    document.body.style.overflow = 'hidden';
  }

  // Navbar effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const hero = document.querySelector('.hero');
    const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) navbar.classList.remove('scrolled'); else navbar.classList.add('scrolled'); }); }, { threshold: 0 });
    if (hero) observer.observe(hero); else navbar.classList.add('scrolled');
  }

  // Mobile menu
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('active')));
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } }); }, { threshold: 0.15 });
    revealEls.forEach(el => revealObserver.observe(el));
  }

  // Reservation form
  const form = document.getElementById('reservationForm');
  const confirmMsg = document.getElementById('confirmationMsg');
  if (form && confirmMsg) {
    form.addEventListener('submit', (e) => { e.preventDefault(); form.style.display = 'none'; confirmMsg.style.display = 'block'; confirmMsg.scrollIntoView({ behavior: 'smooth', block: 'center' }); });
  }

  // Language Toggle
  const langBtn = document.getElementById('langToggle');
  const html = document.documentElement;
  const langElements = document.querySelectorAll('[data-en], [data-ar]');

  function setLanguage(lang) {
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('lagassa-lang', lang);
    // Update button text
    if (langBtn) langBtn.innerHTML = lang === 'en' ? 'English <span>|</span> العربية' : 'العربية <span>|</span> English';
    // Update all text elements
    langElements.forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) el.textContent = text;
    });
  }

  // Init from localStorage or default 'en'
  const savedLang = localStorage.getItem('lagassa-lang') || 'en';
  setLanguage(savedLang);

  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const current = html.getAttribute('lang') === 'ar' ? 'en' : 'ar';
      setLanguage(current);
    });
  }
});
