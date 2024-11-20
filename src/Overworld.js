import { checkInteract } from "./interaction/Collision.js";
import { OverworldMap } from "./OverworldMap.js";
import groceryWalls from '../assets/map/grocery/walls.js';

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
        new KeyPressListener("KeyE", () => {
            // Is there person here to start dialogue?
            this.map.checkForActionCutscene();
        })
    }

    init() {
        const level = localStorage.getItem('level');
        this.map = new OverworldMap(window.OverworldMaps[level]);
        this.map.mountObjects();
        this.map.updatePlayerSprite();

        this.bindActionInput();

        this.directionInput = new DirectionInput();
        this.directionInput.init();
        this.startGameLoop();

        if (level == "DemoRoom") {
            cutscene1(this.map);
        }
        if (level == "grocery") {
            cutscene2(this.map);
            this.map.walls = groceryWalls;;
        }
    }
}

async function cutscene2(map) { // NOTE* script halts  if any movements are invalid (e.g. move up against solid wall)
    await map.startCutscene([
        { who: "player", type: "walk", direction: "down" },
        { who: "kareem", type: "walk", direction: "left" },
    ]);
    await map.checkForActionCutscene();
    await map.startCutscene([
        { who: "player", type: "walk", direction: "left" },
        { who: "player", type: "walk", direction: "left" },
        { who: "player", type: "walk", direction: "left" },
        { who: "player", type: "walk", direction: "left" },
        { who: "player", type: "walk", direction: "left" },
        { who: "player", type: "walk", direction: "up" },
        { who: "kareem", type: "walk", direction: "left" },
        { who: "kareem", type: "walk", direction: "up" },
        { who: "kareem", type: "walk", direction: "left" },
        { who: "kareem", type: "walk", direction: "left" },
        { who: "kareem", type: "walk", direction: "left" },
        { who: "kareem", type: "walk", direction: "left" },
        { who: "kareem", type: "stand", direction: "left" },
    ]);
    setQuiz(map, "kareem", "2,2"); // go to next question
    await map.checkForActionCutscene();
    await map.startCutscene([
        { who: "player", type: "walk", direction: "left" },
        { who: "player", type: "walk", direction: "left" },
        { who: "player", type: "walk", direction: "down" },
        { who: "player", type: "walk", direction: "down" },
        { who: "player", type: "walk", direction: "down" },
        { who: "player", type: "walk", direction: "down" },
        { who: "player", type: "walk", direction: "right" },
        { who: "player", type: "walk", direction: "right" },
        { who: "player", type: "walk", direction: "right" },
        { who: "player", type: "walk", direction: "right" },
        { who: "player", type: "walk", direction: "right" },
        { who: "player", type: "walk", direction: "right" },
        { who: "player", type: "walk", direction: "right" },
        { who: "player", type: "walk", direction: "right" },
        { who: "player", type: "walk", direction: "right" },
        { who: "player", type: "walk", direction: "right" },
        { who: "player", type: "walk", direction: "right" },
        { who: "player", type: "walk", direction: "up" },
        { who: "kareem", type: "walk", direction: "right" },
        { who: "kareem", type: "walk", direction: "down" },
        { who: "kareem", type: "walk", direction: "down" },
        { who: "kareem", type: "walk", direction: "down" },
        { who: "kareem", type: "walk", direction: "down" },
        { who: "kareem", type: "walk", direction: "right" },
        { who: "kareem", type: "walk", direction: "right" },
        { who: "kareem", type: "walk", direction: "right" },
        { who: "kareem", type: "walk", direction: "right" },
        { who: "kareem", type: "walk", direction: "right" },
        { who: "kareem", type: "walk", direction: "right" },
        { who: "kareem", type: "walk", direction: "right" },
        { who: "kareem", type: "walk", direction: "right" },
        { who: "kareem", type: "walk", direction: "up" },
    ]);
    setQuiz(map, "kareem", "3,3"); // go to next question
    await map.checkForActionCutscene();
}

function cutscene1(map) {
    map.startCutscene([
        { who: "player", type: "walk", direction: "down" },
        { who: "player", type: "walk", direction: "down" },
        { who: "npc1", type: "walk", direction: "left" },
        { who: "npc1", type: "walk", direction: "left" },
        { who: "npc1", type: "walk", direction: "left" },
        { who: "npc1", type: "walk", direction: "left" },
        { who: "npc1", type: "stand", direction: "up", time: 800 },
    ])
}

function setQuiz(map, npc, range) {
    console.log(map.gameObjects[npc].quiz);
    map.gameObjects[npc].quiz[0].events[0].range = range;
}