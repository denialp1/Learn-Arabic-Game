import {canvas, c} from './canvas.js'
import { collisionsMap, Boundary, boundaries, collision } from './boundary.js'
import { image, playerUpImage, playerLeftImage, playerRightImage, playerDownImage } from './assets.js'
import { Sprite, player, background } from './sprites.js'
import { keys, lastKey } from './movement.js'


const puzzleMap = []
const width = 19 // width of the map
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

console.log(puzzles)
export {
    puzzles};