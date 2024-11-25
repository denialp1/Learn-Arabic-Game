import { checkInteract } from "./interaction/Collision.js";
import { OverworldMap } from "./OverworldMap.js";
import groceryWalls from '../assets/map/grocery/walls.js';
import { cutscene1, cutscene2 } from './cutscenes/cutscenes.js';

export class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = config.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;

        this.backgroundAudio = new Audio('../audio/game/sample.mp3');
        this.backgroundAudio.loop = true;
        this.backgroundAudio.volume = 0.008;
        this.backgroundAudio.muted = false;
    }

    playBackgroundMusic() {
        this.backgroundAudio.play().catch(error => {
            console.error("Error playing background music:", error);
        });
    }
    
    checkAudio() {
        const shouldMute = this.map.isQuiz;
        if (shouldMute !== this.audioMuted) {
            this.audioMuted = shouldMute;
            this.backgroundAudio.muted = shouldMute;
        }
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
            this.checkAudio();
        }
        const startAudioOnKeyPress = () => {
            this.playBackgroundMusic();
            document.removeEventListener("keydown", startAudioOnKeyPress); // remove listener after first key press
        };
        document.addEventListener("keydown", startAudioOnKeyPress);
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
            this.map.walls = groceryWalls;
            cutscene2(this.map);
        }
    }
}