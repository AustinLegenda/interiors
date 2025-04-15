
/**
 *Nav Menu Magic
 window resize event functions
https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/matches
**/
//Constructors

/*var control = Array.from(document.getElementsByClassName("nav-control-btns"));
var color = Array.from(document.getElementsByClassName("mobile-nav"));
var footer = document.querySelector("footer");
var navItems = document.getElementById("menu-main-menu");
var nav = document.getElementsByTagName("nav")[0];

function MobileNav() {
  //set nav control buttons
  control[0].classList.remove("hide");
  control[1].classList.add("hide");
  //check for white and remove
  if (color[0].classList.contains("white")) {
    color.forEach((i) => {
      i.classList.remove("white");
    });
  } else {}
  //check for footer and remove
  if (footer.classList.contains("out-of-step")) {
    footer.classList.remove("out-of-step");
  } else {}
  //hide open close elements
  navItems.classList.add("hide");
  nav.classList.remove("open", "nav-overlay");
}

function killMobileNav() {
  //reset nav items
  nav.classList.remove("nav-overlay", "open");
  navItems.classList.remove("hide");
  //hide all control buttons
  control.forEach((i) => {
    i.classList.add("hide");
  });
  //remove white classes
  color.forEach((i) => {
    i.classList.remove("white");
  });
  //remove footer class
  footer.classList.remove("out-of-step");
}

function openMobileNav() {
  navItems.classList.remove("hide");
  nav.classList.add("nav-overlay", "open");
  //add white classes
  color.forEach((i) => {
    i.classList.add("white");
  });
  //toggle control buttons
  control.forEach((i) => {
    i.classList.toggle("hide");
  });
  //add footer class
  footer.classList.add("out-of-step");

}

//click event
control.forEach((i) => {
  i.addEventListener("click", () => {
    if (control[0].classList.contains("hide")) {
      MobileNav();
    } else {
      openMobileNav();
    }
  });
});

//setup listener and callback
function addMQListener(mq, callback) {
  if (mq.addEventListener) {
    mq.addEventListener("change", callback);
  } else {
    mq.addListener(callback);
  }
}

//window-size-change event
addMQListener(window.matchMedia("(max-width:750px)"), (event) => {
  if (event.matches) {
    MobileNav();
  } else {
    killMobileNav();
  }
});*/
/**
 * killing landscape function for mobile nav. Is source of glitch on med-lg screens. 
 */
//window-orientation-change event
// addMQListener(window.matchMedia("(orientation:landscape)"),
//   event => {
//     if (event.matches) {
//       killMobileNav();
//     } else {
//       MobileNav();
//     }
//   }
// );

//window-size event for devices and page load at or below 750px
/*if (window.innerWidth <= 750) {
  MobileNav();
} else {

}*/


/**
 *Folio scroll behavior
 **/
//constructors 
var btns = Array.from(document.getElementsByClassName("btns"));
var container = Array.from(document.getElementsByClassName("work-cat-container"));

//utility functions 
btns.forEach((i) => {
  if (/Mobi|Android/i.test(navigator.userAgent)) {
    i.style.display = "none";
  }
  var x = i.parentNode;
  var y = Array.from(x.querySelectorAll(".work-feed-container"));
  y.forEach((n) => {
    n.addEventListener("mouseenter", () => {
      i.classList.toggle("transparent");
    });
    container.forEach((d) => {
      d.addEventListener("mouseleave", () => {
        if (i.classList.contains("transparent")) {
          //don't do shit
        } else {
          i.classList.toggle("transparent");
        }
      });
    });
    btns.forEach((e) => {
      e.addEventListener("mouseleave", () => {
        i.classList.add("transparent");
      });
    });
    i.addEventListener("click", () => {
      if (i.classList.contains("slide-left")) {
        n.scrollLeft -= 200;
      } else {
        n.scrollLeft += 200;
      }
    });
  });
});

/**
 *front-page folio section 
 **/
var b = Array.from(document.getElementsByClassName("folio-container"));
var c = Array.from(document.getElementsByClassName("item-folio"));
let y = document.querySelector(".folio-wrapper");



b.forEach((i) => {
  if (i.children.length == 1) {
    i.classList.add("one-col");
  } else if (i.children.length == 2) {
    i.classList.add("two-col");
  } else if (i.children.length == 3) {
    i.classList.add("three-col");
  } else if (i.children.length == 4) {
    i.classList.add("two-col");
  } else if (i.children.length == 5) {
    i.classList.add("full");
    let z = Array.from(y.children);
    z[0].classList.add("one-third-col");
    if (y.children.length > 1){
     z[1].classList.add("one-third-col-rev");
    }
    for (var i = 5; i < c.length; i += 6) {
      if (c.length > 9) {
        c[i].classList.add("--big");
        c[i].classList.add("reverse");
        //if length of item-folio is greater than add "reverse" and "big" classes to "every 6th element"
      }
    }
  
  } else {}
  var x = Array.from(document.getElementsByClassName("full"));
  x.forEach((d) => {
    var foo = d.querySelector(".item-folio");
    foo.classList.add("--big");
    //add big class to first child of every container that has 5 elements
  });

});

//idk what this is

Array.from(document.querySelectorAll('a[href^="#work"]')).forEach(anchor => {
  anchor.addEventListener('click', function () {
    document.getElementById("work").scrollIntoView({
      behavior: 'smooth'
    });
  });
});

/**
 *gallery image - should probably make this a plug in
 **/
// Array.from(document.getElementsByClassName('has-nested-images')).forEach(i => {
//   if (i.children.length == 1) {
//     i.classList.add("one-col");
//   } else if (i.children.length == 2) {
//     i.classList.add("two-col");
//   } else if (i.children.length == 3) {
//     i.classList.add("three-col");
//   } else if (i.children.length == 4) {
//     i.classList.add("two-col");
//   } else if (i.children.length == 5){
//     i.classList.add("three-col");
//   } 
// else if (i.children.length == 6){
//   i.classList.add("three-col");
// } 
// });

//new fig elements to adjust for WP block markup

// function newFigEle() {
//   const block = Array.from(document.getElementsByClassName("wp-block-image"));

//   block.forEach(i => {
//     var x = i.parentNode; 
//       const org_html = i.innerHTML;
//       const new_html = "<div class='fig-container'>" + "<div class='fig-wrapper'>" + org_html + "</div>" + "</div>";
//       i.innerHTML = new_html;
//   });
// }
// newFigEle();

