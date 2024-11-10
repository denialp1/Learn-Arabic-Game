const utils = {
    withGrid(n) {
        return n * 16;
    },
    asGridCoord(x,y) {
        return `${x*16},${y*16}`
    },
    nextPosition(initialX, initialY, direction) {
        let x = initialX;
        let y = initialY;
        const size = 16;
        if (direction === "left") {
            x -= size;
        } else if (direction === "right") {
            x += size;
        } else if (direction === "up") {
            y -= size;
        } else if (direction === "down") {
            y += size;
        }
        return {x,y};
    },
    oppositeDirection(direction) {
        if (direction === "left") { return "right" }
        if (direction === "right") { return "left" }
        if (direction === "up") { return "down" }
        return "up"
    },
    towardsPlayer(player, obj) {
        if (player.y < obj.y) { return "up" }
        else if (player.y > obj.y) { return "down" }
        else if (player.x < obj.x) { return "left" }
        else if (player.x > obj.x) { return "right" }
    },
    emitEvent(name, detail) {
        const event = new CustomEvent(name, {
            detail
        });
        document.dispatchEvent(event);
    },
    isTouching(object1, object2) {
        const range = object2.range;
        const x = Math.abs(object1.x - object2.x) <= range
        const y = Math.abs(object1.y - object2.y) <= range
        return x && y
    }
}