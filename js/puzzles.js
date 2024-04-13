import {canvas, c} from './canvas.js'
import { collisionsMap, Boundary, boundaries, collision } from './boundary.js'
import { image, playerUpImage, playerLeftImage, playerRightImage, playerDownImage, dialogue } from './assets.js'
import { Sprite, player, background } from './sprites.js'
import { keys, lastKey } from './movement.js'
// import { animate } from './index2.js'


const puzzleMap = []
const width = 19 // width of the map
const scale = 2
let inPuzzle = false
// iterate through each row of the map to build collision array
for (let i = 0; i < interactionData.length; i+= width) {
    puzzleMap.push(interactionData.slice(i, width + i))
}

const puzzles = []
puzzleMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 13)
            puzzles.push(new Boundary({
                position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                }}))})
})


class Puzzle {

    constructor({ position, image, frames = {max:1}, options}) {
        this.position = position
        this.image = image
        this.options = options
        this.frames = {...frames, val: 0, elapsed: 0 }
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
    }

    draw() {
        c.drawImage(
            this.image,
            0,
            0,
            this.image.width,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / scale,
            this.image.height / scale
        )
    }
}

let puzzleAnimationId
const puzzleUI = new Puzzle({
    position: { // can be changed per map
        x: 10,
        y: 0
    },
    image: dialogue
})

function enterPuzzle() {
    puzzleAnimationId = window.requestAnimationFrame(enterPuzzle)

    // get gray overlay * whole screen!
    const element = document.getElementById('overlappingDiv')
    if (element) {
        // element.style.opacity = 0.8
    }

    // gray overlay on top of screen
    c.fillStyle = 'rgba(0, 0, 0, 0.7)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    // load options
    const button1 = document.getElementById('button1')
    const button2 = document.getElementById('button2')
    const button3 = document.getElementById('button3')
    button1.style.opacity = 1;
    button2.style.opacity = 1;
    button3.style.opacity = 1;

    // then draw puzzle ui
    puzzleUI.draw()
    
}

function setButtons() {
    const button1 = document.getElementById('button1')
    const button2 = document.getElementById('button2')
    const button3 = document.getElementById('button3')
    button1.addEventListener('click', handleButton1Click);
    button2.addEventListener('click', handleButton1Click);
    button3.addEventListener('click', handleButton1Click);
}

function handleButton1Click() {
    c.clearRect(0, 0, canvas.width, canvas.height)
    if (puzzleAnimationId) {
        window.cancelAnimationFrame(puzzleAnimationId)
        puzzleAnimationId = null;
    }
    
    button1.style.opacity = 0
    button2.style.opacity = 0
    button3.style.opacity = 0
    inPuzzle = false
    // animate();
}

function handleButton2Click() {
    
}

function handleButton3Click() {
}

function setInPuzzle(value) {
    inPuzzle = value
}

function getInPuzzle() {
    return inPuzzle
}


export {puzzles, enterPuzzle, setButtons, inPuzzle, setInPuzzle, getInPuzzle}