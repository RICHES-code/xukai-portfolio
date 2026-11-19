(function(){
  var nav=document.getElementById('nav');
  var links=[].slice.call(document.querySelectorAll('.links a'));
  var secs=links.map(function(a){return document.querySelector(a.getAttribute('href'))});
  function onScroll(){
    var y=window.scrollY||window.pageYOffset;
    nav.classList.toggle('scrolled',y>40);
    var idx=0;
    secs.forEach(function(s,i){ if(s&&s.offsetTop-140<=y) idx=i; });
    if(y+window.innerHeight>=document.body.scrollHeight-60) idx=secs.length-1;
    links.forEach(function(a,i){a.classList.toggle('active',i===idx)});
  }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

  var mb=document.querySelector('.menu-btn'), lk=document.querySelector('.links');
  if(mb&&lk){
    mb.addEventListener('click',function(){
      var open=lk.classList.toggle('open');
      mb.setAttribute('aria-expanded',open?'true':'false');
    });
    lk.addEventListener('click',function(e){
      if(e.target.tagName==='A'){lk.classList.remove('open');mb.setAttribute('aria-expanded','false');}
    });
  }
  var filters=document.querySelectorAll('.filter'), cards=document.querySelectorAll('#grid .card');
  [].forEach.call(filters,function(b){
    b.addEventListener('click',function(){
      [].forEach.call(filters,function(x){x.classList.remove('active')});
      b.classList.add('active');
      var f=b.getAttribute('data-filter');
      [].forEach.call(cards,function(c){
        var show=(f==='all'||c.getAttribute('data-cat')===f);
        c.style.display=show?'':'none';
      });
    });
  });

  /* 页内播放器 */
  var modal = document.getElementById('player-modal');
  if (modal) {
    var frame = document.getElementById('modal-frame');
    var titleEl = document.getElementById('modal-title');
    var outEl = document.getElementById('modal-out');
    var open = function (card) {
      var bv = card.getAttribute('data-bv');
      var t = card.querySelector('h3');
      titleEl.textContent = t ? t.textContent : '播放';
      outEl.href = 'https://www.bilibili.com/video/' + bv + '/';
      frame.style.aspectRatio = '';
      frame.style.width = '';
      frame.style.maxHeight = '';
      var isPortrait = card.classList.contains('thumb-v');
      if (isPortrait) {
        frame.style.aspectRatio = '9 / 16';
        frame.style.width = 'auto';
        frame.style.maxHeight = '72dvh';
      }
      var img = card.querySelector('.thumb img');
      var poster = card.getAttribute('data-poster') || (img ? img.src : '');
      frame.style.backgroundImage = poster ? 'url(' + poster + ')' : '';
      frame.className = 'modal-frame';
      frame.innerHTML = '<video id="modal-video" controls playsinline webkit-playsinline x5-playsinline ' +
        'x5-video-player-type="h5" x5-video-player-fullscreen="false" preload="none" poster="' + poster +
        '" src="assets/videos/' + bv + '.mp4"></video>' +
        '<button class="play-btn" aria-label="播放">▶</button>';
      var v = document.getElementById('modal-video');
      if (v) {
        v.addEventListener('error', function () {
          frame.innerHTML = '<div class="vid-fail"><img src="' + poster + '" alt=""><a href="https://www.bilibili.com/video/' +
            bv + '/" target="_blank" rel="noopener">在 B 站观看这条片 ↗</a></div>';
        });
        v.addEventListener('loadedmetadata', function () {
          if (v.videoHeight > v.videoWidth) {
            frame.style.aspectRatio = v.videoWidth + '/' + v.videoHeight;
            frame.style.maxHeight = '72dvh';
            frame.style.width = 'auto';
          }
        });
        var pb = frame.querySelector('.play-btn');
        var start = function () {
          frame.classList.add('playing');
          var pr = v.play();
          if (pr && pr.catch) pr.catch(function () { frame.classList.remove('playing'); });
        };
        if (pb) pb.addEventListener('click', start);
        start();
      }
      modal.classList.add('open');
      modal.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
    };
    var close = function () {
      var mv = document.getElementById('modal-video');
      if (mv) { try { mv.pause(); } catch (e) {} }
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden','true');
      frame.innerHTML = '';
      frame.style.backgroundImage = '';
      document.body.style.overflow = '';
    };
    document.addEventListener('click', function (e) {
      var card = e.target.closest('a.card.play');
      if (card) { e.preventDefault(); open(card); return; }
      if (e.target.closest('[data-close]')) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }
})();