import groceryWalls, {data, width, size} from '../../assets/map/grocery/walls.js';
// might need to change above import for future new maps
const height = Math.floor(data.length / width);  // calc height


function heuristic(a, b) { // manhattan distance
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

export function astar(start, goal) {
    const openList = [];  // priority queue
    const closedList = {}; // set to track visited nodes

    // add start node to open list
    openList.push({ x: start.x, y: start.y, g: 0, h: heuristic(start, goal), parent: null });

    // store the best path for each node
    const cameFrom = {};

    // loop until find the goal or run out of nodes
    while (openList.length > 0) {
        openList.sort((a, b) => (a.g + a.h) - (b.g + b.h)); // sort open list by f = g + h
        const current = openList.shift(); // node with the lowest f value

        // reached the goal, reconstruct the path
        if (current.x === goal.x && current.y === goal.y) {
            let path = [];
            let node = current;
        while (node) {
            path.push(node);
            node = node.parent;
        }
        return path.reverse();
    }

    closedList[`${current.x},${current.y}`] = true; // add curr node to closed list

    const neighbors = [ // check neighbors
        { x: current.x, y: current.y - size }, // up
        { x: current.x, y: current.y + size }, // down
        { x: current.x - size, y: current.y }, // left
        { x: current.x + size, y: current.y }, // right
    ];

    for (let neighbor of neighbors) {
        if ( // skip out of bounds or walls
            neighbor.x < 0 || neighbor.y < 0 ||
            neighbor.x >= width * size || neighbor.y >= height * size ||
            groceryWalls[`${neighbor.x},${neighbor.y}`] // wall check
        ) continue;
        if (closedList[`${neighbor.x},${neighbor.y}`]) continue; // skip if visited

        // calc g, h, and f for the neighbor
        const g = current.g + size; // assumed cost per step
        const h = heuristic(neighbor, goal);
        const f = g + h;

        // check if the neighbor is already in open list with a better f value
        let inOpenList = false;
        for (let openNode of openList) {
            if (openNode.x === neighbor.x && openNode.y === neighbor.y && (openNode.g + openNode.h) <= f) {
                inOpenList = true;
                break;
            }
        }

        if (!inOpenList) { // add to open list if not already present with a better path
            openList.push({ ...neighbor, g, h, parent: current });
        }
      }
    }

    return null; // no path found
}

export const convert = (path) => { // convert path to movement dirs
    const directions = [];
    
    for (let i = 1; i < path.length; i++) {
      const prev = path[i - 1];
      const current = path[i];
      let direction = '';
  
      // direction based on the difference in coordinates
      if (current.x < prev.x) {
        direction = 'left';
      } else if (current.x > prev.x) {
        direction = 'right';
      } else if (current.y < prev.y) {
        direction = 'up';
      } else if (current.y > prev.y) {
        direction = 'down';
      }
  
      directions.push({ who: "kareem", type: "walk", direction });
    }
  
    // add "stand" at the last position
    directions.push({ who: "kareem", type: "stand", direction: directions[directions.length - 1].direction });
  
    return directions;
};
  