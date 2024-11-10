let interactable = null;

// check for each game object, if touch player
export function checkInteract(gameObjects, player) {
  interactable = null;
  Object.values(gameObjects).forEach(object => { // loop through game objects
    if (object != player && utils.isTouching(player, object)) {
      highlight(object); // highlight if touching
    } else {
      clear(object);
    }
  });
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
