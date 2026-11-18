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
})();