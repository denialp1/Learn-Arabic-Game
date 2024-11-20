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
    
        for (let event of events) {
            const eventHandler = new OverworldEvent({
                event,
                map: this,
            });
            await eventHandler.init(); // Waits for this event to finish before continuing
        }
    
        this.isCutscenePlaying = false;
    
        // Reset NPCs to do idle behavior
        Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this));
        // console.log("resolve cutscene");
    }
    

    async checkForActionCutscene() {
        const player = this.gameObjects["player"];
        const match = Object.values(this.gameObjects).find(object => {
            return utils.isTouching(player, object)
        });
        // console.log(match.quiz)
        if (!this.isCutscenePlaying && match && match.talking.length) {
            await this.startCutscene(match.talking[0].events);
        }
        if (!this.isCutscenePlaying && match && match.quiz.length) {
            await this.startCutscene(match.quiz[0].events);
        }
        // console.log("resolve check");
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
                    { type: "stand",  direction: "left", time: 500 },
                    { type: "stand",  direction: "up", time: 800 },
                    { type: "stand",  direction: "right", time: 1000 },
                    { type: "stand",  direction: "up", time: 500 },
                    { type: "stand",  direction: "left", time: 1000 },
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "I'm busy...", facePlayer: "npc1"},
                            {type: "textMessage", text: "Go away."},
                            {who: "player", type: "walk", direction: "left"}
                        ]
                    }
                ],
                quiz: [ {} ]
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
            clerk: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(14),
                range: 32,
                src: "../assets/characters/clerk.png",
                behaviorLoop: [
                    { type: "stand",  direction: "right",},
                ],
                talking: [],
                quiz: [
                    {
                        events: [
                            {type: "dragDropQuiz",
                             text: "title",
                             imgpath: "../assets/characters/clerk.png",},
                        ]
                    }
                ]
            }),
            kareem: new Person({
                x: utils.withGrid(11),
                y: utils.withGrid(4),
                range: 16,
                src: "../assets/characters/kareem.png",
                // behaviorLoop: [
                //     { type: "walk",  direction: "left" },
                //     { type: "walk",  direction: "left" },
                //     { type: "stand",  direction: "up", time: 1000 },
                //     { type: "walk",  direction: "right" },
                //     { type: "walk",  direction: "right" },
                //     { type: "stand",  direction: "up", time: 1000 },
                // ],
                talking: [],
                quiz: [
                    {
                        events: [
                            {type: "dragDropQuiz",
                             text: "title",
                             imgpath: "../assets/characters/kareem.png",
                             range: "1,1",},
                        ]
                    }
                ]
            }),
            player: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(9),
                y: utils.withGrid(3),
            }),
        },
        walls: {}
    }
}

fetch('./data/walls/StarterRoomWalls.json')
    .then(response => response.json())
    .then(walls => {
        for (const coord in walls) {
            const [x, y] = coord.split(',').map(Number);
            window.OverworldMaps.DemoRoom.walls[`${x},${y}`] = true;
        }
        // console.log(window.OverworldMaps.DemoRoom)
    })
    .catch(error => console.error('Error loading walls:', error));
