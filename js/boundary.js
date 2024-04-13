import {canvas, c} from './canvas.js'

// Creates initial collision map
const collisionsMap = []
const width = 19 // width of the map
// iterate through each row of the map to build collision array
for (let i = 0; i < collisions.length; i+= width) {
    collisionsMap.push(collisions.slice(i, width + i))
}

// Class for boundary objects
class Boundary {
    static width = 64; // 4x * 16px original 
    static height = 64; // 4x * 16px original 
    constructor({position}) {
        this.position = position
        this.width = 64 
        this.height = 64
    }

    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0.0)' // clear boundary
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

// Fills in boundaries based on collision map
const boundaries = []
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 13)
            boundaries.push(new Boundary({
                position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                }}))})
})

// Function to detect collisions
function collision({rectangle1, rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

export {
    canvas,
    c,
    collisionsMap,
    Boundary,
    boundaries,
    collision };