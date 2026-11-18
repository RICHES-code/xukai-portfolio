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
      var img = card.querySelector('.thumb img');
      frame.style.backgroundImage = img ? 'url(' + img.src + ')' : '';
      frame.innerHTML = '<iframe src="https://player.bilibili.com/player.html?isOutside=true&bvid=' + bv +
        '&autoplay=1&danmaku=1&high_quality=1&as_wide=1" allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowfullscreen scrolling="no" frameborder="0"></iframe>';
      modal.classList.add('open');
      modal.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
    };
    var close = function () {
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