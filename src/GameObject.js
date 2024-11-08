class GameObject {
    constructor(config) {
        this.id = null;
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "../assets/characters/character1.png",
        });

        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex = 0;
    }

    mount(map) {
        this.isMounted = true;
        map.addWall(this.x, this.y);

        // If we have a behavior, kick off after a short delay so that

        setTimeout(() => {
            this.doBehaviorEvent(map);
        }, 10)
    }

    update() {

    }

    async doBehaviorEvent(map) {
        // Do nothing if cutscene is playing or no behavior
        if (map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding) {
            return;
          }

        // Setting up event with relevant info
        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
        eventConfig.who = this.id;

        // Create event instance out of our next event config
        const eventHandler = new OverworldEvent({ map, event: eventConfig });
        await eventHandler.init(); 

        // Setting next event to fire
        this.behaviorLoopIndex += 1;
        if (this.behaviorLoopIndex === this.behaviorLoop.length) {
            this.behaviorLoopIndex = 0;
        }

        // Loop
        this.doBehaviorEvent(map);
    }
}