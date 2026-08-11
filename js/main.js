(function(){
  var btn=document.querySelector(".menu-btn"),links=document.querySelector(".nav-links");
  if(btn&&links){
    btn.addEventListener("click",function(){
      var open=links.classList.toggle("open");
      btn.setAttribute("aria-expanded",open?"true":"false");
    });
    links.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click",function(){
        links.classList.remove("open");
        btn.setAttribute("aria-expanded","false");
      });
    });
  }
  function reveal(){
    if("IntersectionObserver" in window){
      var io=new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },{threshold:.12,rootMargin:"0px 0px -40px 0px"});
      document.querySelectorAll(".reveal").forEach(function(el){io.observe(el);});
    }else{
      document.querySelectorAll(".reveal").forEach(function(el){el.classList.add("in");});
    }
  }
  function hydrateVideos(){
    document.querySelectorAll("video[data-lazy]").forEach(function(v){
      var start=function(){
        if(v.dataset.src&&!v.getAttribute("src")){
          v.setAttribute("src",v.dataset.src);
          v.load();
        }
        var p=v.play();
        if(p&&p.catch)p.catch(function(){});
      };
      if("IntersectionObserver" in window){
        var vio=new IntersectionObserver(function(entries){
          entries.forEach(function(e){
            if(e.isIntersecting){
              start();
              vio.disconnect();
            }
          });
        },{rootMargin:"120px"});
        vio.observe(v);
      }else start();
    });
  }
  reveal();
  if(document.readyState==="complete"){
    setTimeout(hydrateVideos,1200);
  }else{
    window.addEventListener("load",function(){setTimeout(hydrateVideos,1200);});
  }

  function prefersReducedMotion(){
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  function smoothTo(el){
    if(!el) return;
    var top=el.getBoundingClientRect().top + window.pageYOffset - 84;
    if(prefersReducedMotion()){
      window.scrollTo(0, top);
    }else{
      window.scrollTo({top:top, behavior:"smooth"});
    }
  }
  document.addEventListener("click", function(e){
    var a=e.target.closest('a[href^="#"]');
    if(!a) return;
    var id=a.getAttribute("href");
    if(!id || id==="#") return;
    var target=document.querySelector(id);
    if(!target) return;
    e.preventDefault();
    smoothTo(target);
    if(history.pushState) history.pushState(null, "", id);
  });
  if(location.hash){
    var initial=document.querySelector(location.hash);
    if(initial){
      setTimeout(function(){smoothTo(initial);}, 50);
    }
  }
})();
