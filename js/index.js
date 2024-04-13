// Canvas setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576

// collision detection
// 19 = num width of map tiles
const collisionsMap = []
for (let i = 0; i < collisions.length; i+= 19) {
    collisionsMap.push(collisions.slice(i, 19 + i))
}

// create border
class Boundary {
    static width = 64; // 4x * 16px original 
    static height = 64; // 4x * 16px original 
    constructor({position}) {
        this.position = position
        this.width = 64 
        this.height = 64
    }

    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0.0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
const boundaries = []
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 13)
            boundaries.push(new Boundary({
                position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                }
            })
        )
    })
})

// get color for game screen, set params
c.fillStyle = 'd'
c.fillRect(0, 0, canvas.width, canvas.height)

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

// class sprite
class Sprite {
    constructor({ position, velocity, image, frames = {max:1}, sprites  }) {
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0 }
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.moving = false
        this.sprites = sprites
    }
    draw() {
        c.drawImage(
            this.image,
            this.frames.val * this.width, // iterate sprite
            0, // draw from bottom to top height
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )

        // return if not moving
        if (!this.moving) return
        // need to render animatinos
        if (this.frames.max > 1) {
            this.frames.elapsed++
        }

        // slow down animations, render
        if (this.frames.elapsed % 5 == 0) {
            if (this.frames.val < this.frames.max - 1)
                this.frames.val++
            else this.frames.val = 1
        }
    }
}

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 256 / 4 /2,
        y: canvas.height / 2 - 128 /2
    },
    image: playerDownImage,
    frames: {
        max: 7
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage,
    }
})

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: image
})


const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

// spread operator ... all boundary objects into movable
const moveables = [background, ...boundaries]
function collision({rectangle1, rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

// animation loop
function animate() {
    const offset = 3 // movement offset
    window.requestAnimationFrame(animate)
    background.draw();
    boundaries.forEach(boundary => {
        boundary.draw()
        
    })
    player.draw();

    
    // movement up
    let moving = true
    player.moving = false;
    if (keys.w.pressed && lastKey == 'w') {
        player.moving = true;
        player.image = player.sprites.up
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                collision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + offset
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }
        if (moving)
            moveables.forEach((moveable) => {
                moveable.position.y += offset
            })
    } // movement left
    else if (keys.a.pressed && lastKey == 'a') {
        player.moving = true;
        player.image = player.sprites.left
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                collision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x + offset,
                            y: boundary.position.y
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }
        if (moving)
            moveables.forEach((moveable) => {
                moveable.position.x += offset
            })
    } // movement down
    else if (keys.s.pressed && lastKey == 's') {
        player.moving = true;
        player.image = player.sprites.down
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                collision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - offset
                        }
                    }
                })
            ) {
                console.log("collide")
                moving = false
                break
            }
        }
        if (moving)
            moveables.forEach((moveable) => {
                moveable.position.y -= offset
            })
    } // movement right
    else if (keys.d.pressed && lastKey == 'd') {
        player.moving = true;
        player.image = player.sprites.right
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                collision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x - offset,
                            y: boundary.position.y
                        }
                    }
                })
            ) {
                console.log("collide")
                moving = false
                break
            }
        }
        if (moving)
            moveables.forEach((moveable) => {
                moveable.position.x -= offset
            })
    }
}
animate(); // continuous run

// movement listeners
let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break   
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch(e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break   
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})