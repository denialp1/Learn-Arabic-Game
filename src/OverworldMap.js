export class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc; // tiles

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc; // objects over the player's head

        this.isCutscenePlaying = false;
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
        Object.keys(this.gameObjects).forEach(key => {

            let object = this.gameObjects[key];
            object.id = key;


            object.mount(this);
        })
    }

    async startCutscene(events) {
        this.isCutscenePlaying = true;

        // Start a loop of async events
        // await each one

        for (let i = 0; i < events.length; i++) {
            const eventHandler = new OverworldEvent({
                event: events[i],
                map: this,
            })
            await eventHandler.init();
        }

        this.isCutscenePlaying = false;
    }

    addWall(x, y) {
        this.walls[`${x},${y}`] = true;
    }

    removeWall(x, y) {
        delete this.walls[`${x},${y}`]
    }

    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY);
        const {x, y} = utils.nextPosition(wasX, wasY, direction);
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
            npc1: new Person({
                x: utils.withGrid(16),
                y: utils.withGrid(13),
                src: "../assets/characters/character3.png",
                behaviorLoop: [
                    { type: "walk",  direction: "left" },
                    { type: "stand",  direction: "up", time: 800 },
                    { type: "walk",  direction: "up" },
                    { type: "walk",  direction: "right" },
                    { type: "walk",  direction: "down" },
                ]
            }),
            player: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(12),
                y: utils.withGrid(10),
            }),
        },
        walls: {}
    },
    grocery: {
        lowerSrc: "../assets/map/grocery/lower.png",
        upperSrc: "../assets/map/grocery/upper.png",
        gameObjects: {
            npc1: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(14),
                range: 32,
                src: "../assets/characters/character3.png",
                behaviorLoop: [
                    { type: "stand",  direction: "right",},
                ]
            }),
            player: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(10),
                y: utils.withGrid(10),
            }),
        },
        walls: {}
    }
}

fetch('StarterRoomWalls.json')
    .then(response => response.json())
    .then(walls => {
        for (const coord in walls) {
            const [x, y] = coord.split(',').map(Number);
            window.OverworldMaps.DemoRoom.walls[`${x},${y}`] = true;
        }
        console.log(window.OverworldMaps.DemoRoom)
    })
    .catch(error => console.error('Error loading walls:', error));
