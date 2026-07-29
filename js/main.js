/* Arkoz Müteahhitlik — main.js
   Mobil menü · scroll header · reveal · ARSİM lightbox */
(() => {
  'use strict';

  /* Mobil menü */
  const btn = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  if (btn && nav) {
    const kapat = () => {
      nav.classList.remove('nav--acik');
      btn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('kilitli');
    };
    btn.addEventListener('click', () => {
      const acik = nav.classList.toggle('nav--acik');
      btn.setAttribute('aria-expanded', String(acik));
      document.body.classList.toggle('kilitli', acik);
    });
    nav.addEventListener('click', (e) => {
      if (e.target.closest('a')) kapat();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('nav--acik')) {
        kapat();
        btn.focus();
      }
    });
  }

  /* Scroll header */
  const header = document.querySelector('.header');
  if (header) {
    const guncelle = () => header.classList.toggle('header--dolu', window.scrollY > 8);
    guncelle();
    window.addEventListener('scroll', guncelle, { passive: true });
  }

  /* Reveal */
  const revealler = document.querySelectorAll('.reveal');
  const hareketAz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (revealler.length && 'IntersectionObserver' in window && !hareketAz) {
    const io = new IntersectionObserver((girisler) => {
      girisler.forEach((g) => {
        if (g.isIntersecting) {
          g.target.classList.add('reveal--goster');
          io.unobserve(g.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    revealler.forEach((el) => io.observe(el));
  } else {
    revealler.forEach((el) => el.classList.add('reveal--goster'));
  }

  /* Lightbox (projeler.html — ARSİM galerisi) */
  const galeri = document.querySelector('.galeri');
  const lb = document.querySelector('.lightbox');
  if (galeri && lb && typeof lb.showModal === 'function') {
    const resim = lb.querySelector('.lightbox__resim');
    galeri.addEventListener('click', (e) => {
      const a = e.target.closest('a[data-buyuk]');
      if (!a) return;
      e.preventDefault();
      const kucuk = a.querySelector('img');
      resim.src = a.dataset.buyuk;
      resim.alt = kucuk ? kucuk.alt : '';
      lb.showModal();
    });
    lb.addEventListener('click', (e) => {
      if (e.target === lb || e.target.closest('.lightbox__kapat')) lb.close();
    });
    lb.addEventListener('close', () => { resim.src = ''; });
  }
})();
