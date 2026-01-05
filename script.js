gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// --- RED PANEL ---
gsap.from(".line-1", {
  scrollTrigger: {
    trigger: ".line-1",
    scroller: "#main",
    scrub: true,
    start: "top bottom",
    end: "top top",
    onUpdate: self => console.log(self.direction)
  },
  scaleX: 0,
  transformOrigin: "left center", 
  ease: "none"
});


// --- ORANGE PANEL ---
gsap.from(".line-2", {
  scrollTrigger: {
    trigger: ".orange",
    scroller: "#main",
    scrub: true,
    pin: true,
    start: "top top",
    end: "+=100%"
  },
  scaleX: 0, 
  transformOrigin: "left center", 
  ease: "none"
});


// --- PURPLE/GREEN PANEL ---
var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".plain",
      scroller: "#main",
      scrub: true,
      pin: true,
      start: "top top",
      end: "+=100%"
    }
  });

tl.from(".plain p", {scale: 0.3, rotation:45, autoAlpha: 0, ease: "power2"})
  .from(".line-3", {scaleX: 0, transformOrigin: "left center", ease: "none"}, 0)
  .to(".plain", {backgroundColor: "#201F1F"}, 0)



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

function loadingAnimation() {
    
var tl = gsap.timeline();
tl.from(".line h1",{
    y:150,
    stagger:0.3,
    duration:0.6,
    delay:0.5,
});
tl.from("#line-part1",{
    opacity:0,
    onStart:function(){
        
        var h5timer = document.querySelector("#line-part1 h5")
        var grow = 0
        setInterval(function(){
            if (grow<100){
                h5timer.innerHTML = grow++
            }else{
                h5timer.innerHTML = grow
            }
        },30)

    }
});
tl.to(".line h2",{
    animationName:"anime",
    opacity:1,
})
tl.to("#loader",{
    opacity:0,
    duration:0.2,
    delay:3.6,

})
tl.from("#page1",{
    delay:0.2,
    y:1200,
    opacity:0,
    ease:Power4,
})
tl.to("#loader",{
    display:"none",
})
tl.from(".hero h1,.hero h2",{
    y:190,
    stagger:0.2,
     
})
}
loadingAnimation();

function cursorAnimation(){
    document.addEventListener("mousemove", function (e) {
    gsap.to("#csr", {
        left: e.clientX,
        top: e.clientY,
        
        
    });
    });

    Shery.makeMagnet("#nav-part2 h4" /* Element to target.*/, {
  //Parameters are optional.
    });

    var videoContainer = document.querySelector('#video-cont')
    var video = document.querySelector('#video-cont video')
    var image = document.querySelector('#video-cont img')
    videoContainer.addEventListener("mouseenter",function(){
      videoContainer.addEventListener("mousemove",function(dets){
        gsap.to("#csr",{
          display:"none"
        });
        gsap.to("#video-cursur", {
        left: dets.clientX -550,
        top: dets.clientY -400,
        });
      });
    });
    videoContainer.addEventListener("mouseleave",function(){
      gsap.to("#csr",{
          display:"initial"
      });
      gsap.to("#video-cursur",{
        top:"-13%",
        left:"70%",
      })
    })
    var flag = 0
    videoContainer.addEventListener("click",function(){
      if (flag == 0){
        video.play()
        video.style.opacity = 1
        image.style.opacity = 0
        document.querySelector("#video-cursur").innerHTML = `<i class="ri-pause-fill"></i>`
        gsap.to("#video-cursur",{
          scale:0.5
        })
        flag = 1 
      } else {
        video.pause()
        video.style.opacity = 0
        image.style.opacity = 1
        document.querySelector("#video-cursur").innerHTML = `<i class="ri-play-fill"></i>`
        gsap.to("#video-cursur",{
          scale: 1
        })
        flag = 0
      }
    })



}

cursorAnimation();

function SheryAnimation(){
  Shery.imageEffect(".image-div",{
    style:5,
    config:{"a":{"value":2,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.6969666789417319},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":false},"maskVal":{"value":1.31,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.61,"range":[0,10]},"metaball":{"value":0.41,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.31,"range":[0,2]},"noise_scale":{"value":12.21,"range":[0,100]}},
    gooey:true,
  })
}

SheryAnimation()

document.addEventListener("mousemove",function(f){
  gsap.to("#flag1",{
    left: f.clientX,
    top: f.clientY,
  })
})

document.querySelector("#hero5").addEventListener("mouseenter",function(){
  gsap.to("#flag1",{
    opacity: 1,
  })
})
document.querySelector("#hero5").addEventListener("mouseleave",function(){
  gsap.to("#flag1",{
    opacity: 0,
  })
})
const footerH1 = document.querySelector("#footer h1");

// initialize textillate ONCE
$('#footer h1').textillate({
  
  autoStart: false,
  in: { effect: 'fadeIn' },
  out: { effect: 'fadeOut' }
});

footerH1.addEventListener("mouseenter", function () {
  $('#footer h1').textillate('out');
  $('#footer h1').textillate('in');
  footerH1.style.fontFamily = 'silk';
  
});

footerH1.addEventListener("mouseleave", function () {
  
  $('#footer h1').textillate('out');
  
  $('#footer h1').textillate('in');
  footerH1.style.fontFamily = 'plain light' ;
});




