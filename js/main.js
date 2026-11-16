// 徐凯 · 导演作品集 — 交互
(function () {
  'use strict';

  // 1. 滚动淡入
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i % 6, 5) * 60) + 'ms';
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // 2. 导航：滚动加底色 + 当前区块高亮
  var nav = document.getElementById('nav');
  var links = Array.prototype.slice.call(document.querySelectorAll('.links a'));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    nav.classList.toggle('scrolled', y > 40);

    var idx = 0;
    sections.forEach(function (s, i) {
      if (s && s.offsetTop - 120 <= y) idx = i;
    });
    if (y + window.innerHeight >= document.body.scrollHeight - 60) idx = sections.length - 1;
    links.forEach(function (a, i) { a.classList.toggle('active', i === idx); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 3. 作品筛选
  var filters = document.querySelectorAll('.filter');
  var cards = document.querySelectorAll('#grid .card');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filters.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-filter');
      cards.forEach(function (card) {
        var show = f === 'all' || card.getAttribute('data-cat') === f;
        card.classList.toggle('hide', !show);
        if (show) card.classList.add('in');
      });
    });
  });

  // 4. 首屏内容立即出现（避免等待观察器）
  var heroInner = document.querySelector('.hero-inner');
  if (heroInner) requestAnimationFrame(function () { heroInner.classList.add('in'); });
})();
