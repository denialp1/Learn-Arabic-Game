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
        const urlParams = new URLSearchParams(window.location.search);
        const selectedCharacter = urlParams.get('character');

        if (selectedCharacter && this.gameObjects.player) {
            console.log("!");
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
                x: utils.withGrid(5),
                y: utils.withGrid(6),
            }),
            npc1: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: "../assets/characters/npc1.png"
            })
        },
        walls: {
            [utils.asGridCoord(7,6)] : true,
            [utils.asGridCoord(8,6)] : true,
            [utils.asGridCoord(7,7)] : true,
            [utils.asGridCoord(8,7)] : true,
        },
    },
}

