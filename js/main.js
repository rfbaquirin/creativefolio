/* ============================================
   RITCHIE BAQUIRIN — Brand & Creative Direction Portfolio JS
   Same behavior system as the Amazon/e-commerce site:
   fade-up reveals, active-nav scrollspy, lightbox for images and embedded video.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- LIGHTBOX (images + embedded YouTube video) ---- */
  const lightbox   = document.getElementById('lightbox');
  const lbImg      = document.getElementById('lb-img');
  const lbVideoWrap = document.getElementById('lb-video-wrap');
  const lbVideo    = document.getElementById('lb-video');
  const lbPdfWrap  = document.getElementById('lb-pdf-wrap');
  const lbPdf      = document.getElementById('lb-pdf');
  const lbClose    = document.getElementById('lb-close');

  function resetLightboxPanels() {
    lbVideoWrap.classList.remove('active');
    lbVideo.src = '';
    lbPdfWrap.classList.remove('active');
    lbPdf.src = '';
    lbImg.style.display = 'block';
    lbImg.src = '';
  }

  function openImageLightbox(src) {
    resetLightboxPanels();
    lbImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function openVideoLightbox(videoId) {
    resetLightboxPanels();
    lbImg.style.display = 'none';
    lbVideoWrap.classList.add('active');
    lbVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function openPdfLightbox(src) {
    resetLightboxPanels();
    lbImg.style.display = 'none';
    lbPdfWrap.classList.add('active');
    lbPdf.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(resetLightboxPanels, 300);
  }

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => openImageLightbox(el.dataset.lightbox));
  });

  document.querySelectorAll('[data-video]').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => openVideoLightbox(el.dataset.video));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openVideoLightbox(el.dataset.video);
      }
    });
  });

  document.querySelectorAll('[data-pdf]').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => openPdfLightbox(el.dataset.pdf));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openPdfLightbox(el.dataset.pdf);
      }
    });
  });

  document.querySelectorAll('[data-video]').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => openVideoLightbox(el.dataset.video));
  });

  /* ---- SCROLL ANIMATIONS ---- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach((el) => {
    const group = el.closest('.stagger-group');
    if (group) {
      const siblings = Array.from(group.querySelectorAll('.fade-up'));
      el.style.transitionDelay = `${siblings.indexOf(el) * 80}ms`;
    }
    observer.observe(el);
  });

  /* ---- ACTIVE NAV ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => navObserver.observe(s));

  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.style.borderBottomColor = window.scrollY > 40 ? 'var(--border)' : 'var(--border-subtle)';
  });

});
