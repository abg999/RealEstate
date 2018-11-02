// var li1=document.getElementById("li1");
// var li2=document.getElementById("li2");
// var li3=document.getElementById("li3");
// var li4=document.getElementById("li4");

// var zoomedimg=document.getElementById("zoomed-img");
// var demo=document.getElementById("demo");
// var demo2=document.getElementById("demo2");
// var demo3=document.getElementById("demo3");
// var demo4=document.getElementById("demo4");

// li1.addEventListener("click",function(){
// 	zoomedimg.style.backgroundImage=demo.style.backgroundImage;
// 	demo.style.border="2px solid blue";
// 	demo2.style.border="2px solid black";
// 	demo3.style.border="2px solid black";
// 	demo4.style.border="2px solid black";

// });
// li2.addEventListener("click",function(){
// 	zoomedimg.style.backgroundImage=demo2.style.backgroundImage;
// 	demo2.style.border="2px solid blue";
// 	demo.style.border="2px solid black";
// 	demo3.style.border="2px solid black";
// 	demo4.style.border="2px solid black";
// });
// li3.addEventListener("click",function(){
// 	zoomedimg.style.backgroundImage=demo3.style.backgroundImage;
// 	demo3.style.border="2px solid blue";
// 	demo.style.border="2px solid black";
// 	demo2.style.border="2px solid black";
// 	demo4.style.border="2px solid black";

// });
// li3.addEventListener("click",function(){
// 	zoomedimg.style.backgroundImage=demo4.style.backgroundImage;
// 	demo4.style.border="2px solid blue";
// 	demo.style.border="2px solid black";
// 	demo2.style.border="2px solid black";
// 	demo3.style.border="2px solid black";

// });


let sliderImages = document.querySelectorAll(".slide"),
  arrowLeft = document.querySelector("#arrow-left"),
  arrowRight = document.querySelector("#arrow-right"),
  current = 0;

// Clear all images
function reset() {
  for (let i = 0; i < sliderImages.length; i++) {
    sliderImages[i].style.display = "none";
  }
}

// Init slider
function startSlide() {
  reset();
  sliderImages[0].style.display = "block";
}

// Show prev
function slideLeft() {
  reset();
  sliderImages[current - 1].style.display = "block";
  current--;
}

// Show next
function slideRight() {
  reset();
  sliderImages[current + 1].style.display = "block";
  current++;
}

// Left arrow click
arrowLeft.addEventListener("click", function() {
  if (current === 0) {
    current = sliderImages.length;
  }
  slideLeft();
});

// Right arrow click
arrowRight.addEventListener("click", function() {
  if (current === sliderImages.length - 1) {
    current = -1;
  }
  slideRight();
});

startSlide();

function showDiv() {
   document.getElementById('welcomeDiv').style.display = "block";
}
