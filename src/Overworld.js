class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = config.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

    startGameLoop() {
        const fps = 120; // Set the desired frame rate (e.g., 30 FPS)
        const interval = 1000 / fps; // Calculate the interval in milliseconds
    
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
            
            setTimeout(() => {
                requestAnimationFrame(() => {
                    step();
                });
            }, interval);
        }
        step();
    }

    init() {
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
        this.map.mountObjects();
        this.map.updatePlayerSprite();

        this.directionInput = new DirectionInput();
        this.directionInput.init();
        this.startGameLoop();
    }
}