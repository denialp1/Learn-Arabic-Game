class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc; // tiles

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc; // objects over the player's head
    }

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(this.lowerImage, 
        utils.withGrid(10.5) - cameraPerson.x, 
        utils.withGrid(6) - cameraPerson.y)
    }

    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(this.upperImage, 
            utils.withGrid(10.5) - cameraPerson.x, 
            utils.withGrid(6) - cameraPerson.y)
    }

    isSpaceTaken(currentX, currentY, direction) {
        const {x,y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

    mountObjects() {
        Object.values(this.gameObjects).forEach(o => {

            //TODO: determine if this object should actually mount

            o.mount(this);
        })
    }

    addWall(x, y) {
        this.walls[`${x},${y}`] = true;
    }

    removeWall(x, y) {
        delete this.walls[`${x},${y}`]
    }

    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY);
        const {x,y} = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x, y);
    }

    // update sprite from url after player is init
    updatePlayerSprite() {
        const selectedCharacter = localStorage.getItem('selectedCharacter');
        if (selectedCharacter && this.gameObjects.player) {
            this.gameObjects.player.sprite.image.src = `../assets/characters/character${selectedCharacter}.png`;
        }
    }
}



window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "../assets/map/Starter.png",
        upperSrc: "../assets/map/StarterUpper.png",
        gameObjects: {
            player: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(12),
                y: utils.withGrid(10),
            }),
            npc1: new Person({
                x: utils.withGrid(16),
                y: utils.withGrid(3),
                src: "../assets/characters/npc1.png"
            })
        },
        walls: {
            [utils.asGridCoord(0,9)] : true,
            [utils.asGridCoord(0,10)] : true,
            [utils.asGridCoord(0,11)] : true,
            [utils.asGridCoord(0,12)] : true,
            [utils.asGridCoord(0,13)] : true,
            [utils.asGridCoord(1,8)] : true,
            [utils.asGridCoord(1,11)] : true,
            [utils.asGridCoord(1,12)] : true,
            [utils.asGridCoord(1,14)] : true,
            [utils.asGridCoord(2,8)] : true,
            [utils.asGridCoord(2,11)] : true,
            [utils.asGridCoord(2,12)] : true,
            [utils.asGridCoord(2,14)] : true,
            [utils.asGridCoord(3,8)] : true,
            [utils.asGridCoord(3,11)] : true,
            [utils.asGridCoord(3,12)] : true,
            [utils.asGridCoord(3,14)] : true,
            [utils.asGridCoord(4,8)] : true,
            [utils.asGridCoord(4,11)] : true,
            [utils.asGridCoord(4,12)] : true,
            [utils.asGridCoord(4,14)] : true,
            [utils.asGridCoord(5,3)] : true,
            [utils.asGridCoord(5,4)] : true,
            [utils.asGridCoord(5,5)] : true,
            [utils.asGridCoord(5,8)] : true,
            [utils.asGridCoord(5,14)] : true,
            [utils.asGridCoord(6,2)] : true,
            [utils.asGridCoord(6,6)] : true,
            [utils.asGridCoord(6,8)] : true,
            [utils.asGridCoord(6,14)] : true,
            [utils.asGridCoord(7,3)] : true,
            [utils.asGridCoord(7,6)] : true,
            [utils.asGridCoord(7,8)] : true,
            [utils.asGridCoord(7,9)] : true,
            [utils.asGridCoord(7,12)] : true,
            [utils.asGridCoord(7,13)] : true,
            [utils.asGridCoord(7,14)] : true,
            [utils.asGridCoord(8,3)] : true,
            [utils.asGridCoord(8,6)] : true,
            [utils.asGridCoord(8,8)] : true,
            [utils.asGridCoord(8,14)] : true,
            [utils.asGridCoord(9,3)] : true,
            [utils.asGridCoord(9,6)] : true,
            [utils.asGridCoord(9,8)] : true,
            [utils.asGridCoord(9,14)] : true,
            [utils.asGridCoord(10,3)] : true,
            [utils.asGridCoord(10,6)] : true,
            [utils.asGridCoord(10,7)] : true,
            [utils.asGridCoord(10,14)] : true,
            [utils.asGridCoord(11,2)] : true,
            [utils.asGridCoord(11,14)] : true,
            [utils.asGridCoord(12,2)] : true,
            [utils.asGridCoord(12,14)] : true,
            [utils.asGridCoord(13,3)] : true,
            [utils.asGridCoord(13,4)] : true,
            [utils.asGridCoord(13,5)] : true,
            [utils.asGridCoord(13,6)] : true,
            [utils.asGridCoord(13,7)] : true,
            [utils.asGridCoord(13,12)] : true,
            [utils.asGridCoord(13,14)] : true,
            [utils.asGridCoord(14,2)] : true,
            [utils.asGridCoord(14,10)] : true,
            [utils.asGridCoord(14,12)] : true,
            [utils.asGridCoord(14,14)] : true,
            [utils.asGridCoord(15,2)] : true,
            [utils.asGridCoord(15,10)] : true,
            [utils.asGridCoord(15,14)] : true,
            [utils.asGridCoord(16,2)] : true,
            [utils.asGridCoord(16,6)] : true,
            [utils.asGridCoord(16,7)] : true,
            [utils.asGridCoord(16,10)] : true,
            [utils.asGridCoord(16,14)] : true,
            [utils.asGridCoord(17,2)] : true,
            [utils.asGridCoord(17,10)] : true,
            [utils.asGridCoord(17,11)] : true,
            [utils.asGridCoord(17,12)] : true,
            [utils.asGridCoord(17,14)] : true,
            [utils.asGridCoord(18,2)] : true,
            [utils.asGridCoord(18,14)] : true,
            [utils.asGridCoord(19,2)] : true,
            [utils.asGridCoord(19,6)] : true,
            [utils.asGridCoord(19,7)] : true,
            [utils.asGridCoord(19,8)] : true,
            [utils.asGridCoord(19,9)] : true,
            [utils.asGridCoord(19,12)] : true,
            [utils.asGridCoord(19,14)] : true,
            [utils.asGridCoord(20,3)] : true,
            [utils.asGridCoord(20,4)] : true,
            [utils.asGridCoord(20,5)] : true,
            [utils.asGridCoord(20,6)] : true,
            [utils.asGridCoord(20,7)] : true,
            [utils.asGridCoord(20,8)] : true,
            [utils.asGridCoord(20,9)] : true,
            [utils.asGridCoord(20,10)] : true,
            [utils.asGridCoord(20,11)] : true,
            [utils.asGridCoord(20,12)] : true,
            [utils.asGridCoord(20,13)] : true,
        },
    },
}

