
const interactKey = "e";
let interactable = null;

// check for each game object, if touch player
export function checkInteract(gameObjects, player) {
  interactable = null;
  Object.values(gameObjects).forEach(object => { // loop through game objects
    if (object != player && isTouching(player, object)) {
      interactable = object; // set object to listen for key press
      highlight(object); // highlight if touching
    } else {
      clear(object);
    }
  });
}

// is object1 within range of object2
function isTouching(object1, object2) {
  const range = object2.range;
  const x = Math.abs(object1.x - object2.x) <= range
  const y = Math.abs(object1.y - object2.y) <= range
  return x && y
}

// set animation frame to highlight
function highlight(object) {
  object.interact = true; // need to set to avoid default idle
  object.sprite.setAnimation("outline-"+object.direction);
}

// clear animation frame highlight
function clear(object) {
  object.interact = false;
}

// key e for interact
document.addEventListener("keydown", (event) => {
  if (event.key === interactKey && interactable) { // only works for near 1 object\
    interactWithObject(interactable); // interact with currently near object
  }
});

// interact action (not set)
function interactWithObject(object) {
  console.log(`Interacted with ${object}`);
}
