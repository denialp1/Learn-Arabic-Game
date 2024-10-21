const spriteWidth = 190;  // frame width/height
const spriteHeight = 160;
const totalFrames = 7;
const imgWidth = spriteWidth * totalFrames;
const imgHeight = spriteHeight;
let currentFrame = 0;

const spriteDiv = document.getElementById("spriteDiv");
const leftArr = document.getElementById("leftArr");
const rightArr = document.getElementById("rightArr");
const bookText = document.getElementById("bookText");
const overlay = document.getElementById('overlay');

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
  bookText.style.visibility = "hidden";
  playAnimation(animations.flipLeft, function () {
    bookText.style.visibility = "visible";
  });
}

function flipRight() {
  bookText.style.visibility = "hidden";
  playAnimation(animations.flipRight, function () {
    bookText.style.visibility = "visible";
  });

}

function toggleVisibility() {
  if (bookText.style.visibility === "visible") {
      bookText.style.visibility = "hidden";
      leftArr.style.visibility = "hidden";
      rightArr.style.visibility = "hidden";
      overlay.style.display = 'none';
  } else {
      bookText.style.visibility = "visible";
      leftArr.style.visibility = "visible";
      rightArr.style.visibility = "visible";
      overlay.style.display = 'block';
  }
}

function setBookText(input) {
  bookText.textContent = input;
}

spriteDiv.addEventListener("click", function() { 
    if (isOpen) {
      toggleVisibility();
      playAnimation(animations.close, function () {
        spriteDiv.className = 'book'; // change to small mode after close
        isOpen = false; // set state close
      });
    } else {
      spriteDiv.className = 'book-enlarge'; // change to large mode
      playAnimation(animations.open, function () {
        toggleVisibility();
        setBookText("Placeholder!");
      });
      isOpen = true; // set state open
    }
});

