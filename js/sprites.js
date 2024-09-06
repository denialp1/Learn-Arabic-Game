import { canvas, c } from './canvas.js';
import { image, playerUpImage, playerLeftImage, playerRightImage, playerDownImage, dialogue } from './assets.js'

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

// player sprite
const player = new Sprite({
    position: { // can be changed per map
        x: canvas.width / 2 - 256 / 4 /2,
        y: canvas.height / 2 - 128 /2
    },
    image: playerDownImage, // default down image
    frames: {
        max: 7 // 7 movement states
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


export { Sprite, player, background };