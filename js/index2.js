import { canvas, c } from './canvas.js'
import { collisionsMap, Boundary, boundaries, collision } from './boundary.js'
import { Sprite, player, background } from './sprites.js'
import { keys, lastKey } from './movement.js'
import { puzzles, enterPuzzle } from './puzzles.js'
import { setButtons, inPuzzle, getInPuzzle, setInPuzzle } from './puzzles.js'

// spread operator ... all boundary objects into movable
const moveables = [background, ...boundaries, ...puzzles]

// animation loop
function animate() {
    window.requestAnimationFrame(animate)
    background.draw();
    boundaries.forEach(boundary => {
        boundary.draw()
    })
    puzzles.forEach(boundary => {
        boundary.draw()
    })
    player.draw()

    handlePlayerInput()
}
animate(); // continuous run

function handlePlayerInput() {
    const offset = 3 // movement offset
    player.moving = false
    if (getInPuzzle()) return
    handlePlayerMovement('w', 0, offset) // Move up
    handlePlayerMovement('a', offset, 0) // Move left
    handlePlayerMovement('s', 0, -offset) // Move down
    handlePlayerMovement('d', -offset, 0) // Move right

    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        checkPuzzle()
    }
}

function handlePlayerMovement(direction, dx, dy) {
    if (keys[direction].pressed && lastKey === direction) {
        player.moving = true;
        player.image = player.sprites[dmap[direction]]

        // check collision with boundaries
        let moving = true;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            const adjustedBoundary = {
                ...boundary,
                position: {
                    x: boundary.position.x + dx,
                    y: boundary.position.y + dy
                }
            };

            if (collision({ rectangle1: player, rectangle2: adjustedBoundary })) {
                moving = false;
                break
            }
        }

        // no collision, move map
        if (moving) {
            moveables.forEach((moveable) => {
                moveable.position.x += dx
                moveable.position.y += dy
            });
        }
    }
}

// map inputs to animations
const dmap = {
    'w': 'up',
    'a': 'left',
    's': 'down',
    'd': 'right'
};

// check if interacting in spot
function checkPuzzle() {
    // check collision with interactable
    for (let i = 0; i < puzzles.length; i++) {
        const puzzle = puzzles[i]
        if (collision({ rectangle1: player, rectangle2: puzzle })) {
            // dont break, interact
            setInPuzzle(true)    
            setButtons();
            enterPuzzle(puzzle.position);
            break;
        }
    }
}

export {animate }