import { checkInteract } from "./interaction/Collision.js";

export class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = config.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

    startGameLoop() {
        const step = () => {

            // Clear the Canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
            // Establish Camera person
            const cameraPerson = this.map.gameObjects.player;

            // Update all objects
            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map,
                });
            })

            // Draw Lower Layer
            this.map.drawLowerImage(this.ctx, cameraPerson);
    
            // Draw Game Objects
            Object.values(this.map.gameObjects).sort((a,b) => {
                return a.y - b.y;
              }).forEach(object => {
                object.sprite.draw(this.ctx, cameraPerson);
              })
    
            // Draw Upper Layer
            this.map.drawUpperImage(this.ctx, cameraPerson);

            checkInteract(this.map.gameObjects,this.map.gameObjects.player)
        }
        window.setInterval(step, 10);
    }

    bindActionInput() {
        new KeyPressListener("Enter", () => {
            // Is there person here to start dialogue?
            this.map.checkForActionCutscene();
        })
    }

    init() {
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
        this.map.mountObjects();
        this.map.updatePlayerSprite();

        this.bindActionInput();

        this.directionInput = new DirectionInput();
        this.directionInput.init();
        this.startGameLoop();

        this.map.startCutscene([
            { who: "player", type: "walk", direction: "down" },
            { who: "player", type: "walk", direction: "down" },
            { who: "npc1", type: "walk", direction: "left" },
            { who: "npc1", type: "walk", direction: "left" },
            { who: "npc1", type: "walk", direction: "left" },
            { who: "npc1", type: "walk", direction: "left" },
            { who: "npc1", type: "stand", direction: "up", time: 300 },
            { type: "textMessage", text: "hello!"},
        ])
    }
}