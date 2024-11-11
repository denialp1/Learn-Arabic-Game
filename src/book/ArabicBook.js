const spriteWidth = 190;  // frame width/height
const spriteHeight = 160;
const totalFrames = 7;
const imgWidth = spriteWidth * totalFrames;
const imgHeight = spriteHeight;
let currentFrame = 0;

const spriteDiv = document.getElementById("spriteDiv");
const leftArr = document.getElementById("leftArr");
const rightArr = document.getElementById("rightArr");
const bookTextL = document.getElementById("bookTextL");
const bookTextR = document.getElementById("bookTextR");
const overlay = document.getElementById('overlay');

var page = 0;
const pageTexts = [
  "The Levant refers to the region of the Eastern Mediterranean littoral, and includes modern day Palestine, Syria, Jordan, Lebanon and parts of Turkey and Egypt (the Sinai).",
  "In Arabic, this region is referred to as الشام (Aş-Sām), which is where the demonym شاميّ (Şāmī) comes from, referring to the people and the dialects that come from this region.",
  "This region is home to the historical Biblical lands and contains many holy sites for the three biggest Abrahamic religions – Judaism, Christianity and Islam.",
  "These include Jerusalem (القدس), Bethlehem (بيت لحم), the Jordan River (النھر الأردن), The Temple Mount (where the al-Aqsa Mosque (مسجد الأقصی)) is located.",
  "This region also contains many other important historical cities and sites like Palmyra (تدمر), Damascus (دمشق), Deir ez-Zor (دير الزور), Tyre (صور) and Mount Lebanon (جبل لبنان). "
];
const pages = 5;
var index = Math.abs(page % pages);

// Set initial styles for the sprite animation div
spriteDiv.style.backgroundImage = 'url("../assets/book/book.png")';
spriteDiv.style.width = spriteWidth + "px";
spriteDiv.style.height = spriteHeight + "px";
spriteDiv.style.backgroundSize = `${imgWidth}px ${imgHeight}px`;
spriteDiv.style.backgroundPosition = "0px 0px";
let animationInterval;  // interval for animation timing
let isOpen = false; // variable to track open or closed

const animations = {
    open: { frames: [0, 1, 2, 3], speed: 100 },   // open page
    flipRight: { frames: [4, 5, 6, 3], speed: 100 },   // flip page
    flipLeft: { frames: [6, 5, 4, 3], speed: 100 },   // flip page
    close: { frames: [2, 1, 0], speed: 100 },   // close page
  };

function playAnimation(animation, callback) {
    if (animationInterval) {
      clearInterval(animationInterval); // clear prev animation
    }

    let currentFrameIndex = 0; //index in the frame sequence
    const frameOrder = animation.frames; // frame order

    animationInterval = setInterval(function () {
      const currentFrame = frameOrder[currentFrameIndex];
      const xPos = -currentFrame * spriteWidth; // calculate the background pos for current frame
      spriteDiv.style.backgroundPosition = `${xPos}px 0px`; // update pos
      currentFrameIndex++;

      if (currentFrameIndex >= frameOrder.length) { 
        clearInterval(animationInterval); // stop after last frame
        if (callback) {
            callback(); // ensure functions execute after animation
        }
      }
    }, animation.speed); // adjust for animation speed ms/frame
}

function flipLeft() {
  if (page - 2 < 0) {
    return;
  }
  page -= 2;
  bookTextL.style.visibility = "hidden";
  bookTextR.style.visibility = "hidden";
  playAnimation(animations.flipLeft, function () {
    setBookText(bookTextL, pageTexts[page % pages]);
    console.log(page % pages)
    setBookText(bookTextR, pageTexts[(page + 1) % pages]);
    console.log((page + 1) % pages)
    bookTextL.style.visibility = "visible";
    bookTextR.style.visibility = "visible";
  });
}

function flipRight() {
  if (page + 2 > pages) {
    return;
  }
  page += 2;
  bookTextL.style.visibility = "hidden";
  bookTextR.style.visibility = "hidden";
  playAnimation(animations.flipRight, function () {
    setBookText(bookTextL, pageTexts[page % pages]);
    if (page + 2 > pages) {
      setBookText(bookTextR, "");
    } else {
      setBookText(bookTextR, pageTexts[page + 1 % pages]);
    }
    bookTextL.style.visibility = "visible";
    bookTextR.style.visibility = "visible";
    console.log(page % pages);
  });

}

function toggleVisibility() {
  if (bookTextL.style.visibility === "visible") {
      bookTextL.style.visibility = "hidden";
      bookTextR.style.visibility = "hidden";
      leftArr.style.visibility = "hidden";
      rightArr.style.visibility = "hidden";
      overlay.style.display = 'none';
  } else {
      bookTextL.style.visibility = "visible";
      bookTextR.style.visibility = "visible";
      leftArr.style.visibility = "visible";
      rightArr.style.visibility = "visible";
      overlay.style.display = 'block';
  }
}

function setBookText(page, input) {
  page.textContent = input;
}

spriteDiv.addEventListener("click", function() { 
    if (isOpen) {
      playAnimation(animations.close, function () {
        spriteDiv.className = 'book'; // change to small mode after close
        isOpen = false; // set state close
      });
      toggleVisibility();
    } else {
      spriteDiv.className = 'book-enlarge'; // change to large mode
      playAnimation(animations.open, function () {
        setBookText(bookTextL, pageTexts[page % pages]);
        if ((page + 1) % pages === 0) {
          setBookText(bookTextR, "")
        } else {
          setBookText(bookTextR, pageTexts[(page + 1) % pages]);
        }
        toggleVisibility();
        console.log(page % pages);
      });
      isOpen = true; // set state open
    }
});

