/* KP Times — editorial motion. Print-sober, no theatrics. */
(function () {
  'use strict';

  // Scroll reveal
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // Active nav link (fallback if class missing)
  var path = location.pathname.replace(/\/+$/, '') || '/';
  document.querySelectorAll('.header-nav a').forEach(function (a) {
    var href = a.getAttribute('href').replace(/\/+$/, '') || '/';
    if (href === path) { a.classList.add('active'); }
  });
})();
