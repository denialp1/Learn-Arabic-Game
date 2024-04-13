// create html image, load game map
// can offset to different position
const image = new Image()
image.src = './assets/map/room.png'

// create player, load in
const playerUpImage = new Image();
playerUpImage.src = './assets/characters/amelia/up.png'
const playerLeftImage = new Image();
playerLeftImage.src = './assets/characters/amelia/left.png'
const playerRightImage = new Image();
playerRightImage.src = './assets/characters/amelia/right.png'
const playerDownImage = new Image();
playerDownImage.src = './assets/characters/amelia/down.png'

export {
    image,
    playerUpImage,
    playerLeftImage,
    playerRightImage,
    playerDownImage
};