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
})();
