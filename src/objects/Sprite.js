class Sprite {
    constructor(config) {
        // Set up the Image
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        };

        // Shadow
        this.shadow = new Image();
        this.useShadow = true; // config.useShadow || false
        if (this.useShadow) {
            this.shadow.src = "../assets/characters/shadow.png";
        }
        this.shadow.onload = () => {
            this.isShadowLoaded = true;
        };

        // Configure Animations and Initial State
        this.animations = config.animations || {
            "idle-down": [[18, 1], [19, 1], [20, 1], [21, 1], [22, 1], [23, 1]],
            "idle-right": [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1]],
            "idle-up": [[6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1]],
            "idle-left": [[12, 1], [13, 1], [14, 1], [15, 1], [16, 1], [17, 1]],
            "walk-down": [[18, 2], [19, 2], [20, 2], [21, 2], [22, 2], [23, 2]],
            "walk-right": [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2]],
            "walk-up": [[6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2]],
            "walk-left": [[12, 2], [13, 2], [14, 2], [15, 2], [16, 2], [17, 2]],
            "outline-up": [[3, 19]],
            "outline-right": [[0, 19]],
            "outline-down": [[9, 19]],
            "outline-left": [[6, 19]],
        };
        this.currentAnimation = "idle-up"; // config.currentAnimation || "idle-down";
        this.currentAnimationFrame = 0;

        this.animationFrameLimit = config.animationFrameLimit || 5; // animation speed for main animation
        this.animationFrameProgress = this.animationFrameLimit;

        this.gameObject = config.gameObject;

        this.bubble = false; // false default
        this.bubbleId = null; // bubble animation id
        this.bubbleImg = new Image();
        this.bubbleImg.src = "../../assets/interact/bubble.png";
        this.bubbleAnimations = {
            "base": [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1]],
            "waiting": [[16, 16], [16, 16], [2, 0], [3, 0,], [2, 9], [3, 9]],
            "thinking": [[16, 16], [16, 16], [2, 0], [3, 0,], [2, 6], [3, 6]],
        };
        this.bubbleFrameLimit = config.bubbleFrameLimit || 10; // separate speed
        this.bubbleFrameProgress = this.bubbleFrameLimit;
        this.currentbubbleFrame = 0;
    }

    get frame() {
        if (!this.animations[this.currentAnimation]) {
            console.log("x");
        }
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }

    setAnimation(key) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }

    updateAnimationProgress() {
        // Downtick frame progress for sprite
        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return;
        }

        // Reset the counter for sprite animation
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;

        if (this.frame === undefined) {
            this.currentAnimationFrame = 0;
        }
    }

    updatebubbleAnimationProgress() {
        // Downtick frame progress for bubble animation
        if (this.bubbleFrameProgress > 0) {
            this.bubbleFrameProgress -= 1;
            return;
        }

        // Reset the counter for bubble animation
        this.bubbleFrameProgress = this.bubbleFrameLimit;
        this.currentbubbleFrame += 1;
    }

    draw(ctx, cameraPerson) {
        const x = this.gameObject.x + utils.withGrid(10.5) - cameraPerson.x;
        const y = this.gameObject.y - 16 + utils.withGrid(6) - cameraPerson.y;

        this.isShadowLoaded && ctx.drawImage(this.shadow, x - 8, y - 2);

        const [frameX, frameY] = this.frame;

        this.isLoaded && ctx.drawImage(
            this.image,
            frameX * 16, frameY * 32,
            16, 32,
            x, y - 4,
            16, 32
        );

        this.updateAnimationProgress();
    }

    drawBubble(ctx, cameraPerson) {
        if (this.bubble) {
            const x = this.gameObject.x + utils.withGrid(10.5) - cameraPerson.x;
            const y = this.gameObject.y - 16 + utils.withGrid(6) - cameraPerson.y;
            const offsetX = 7;

            // top adjustable
            var [frameX, frameY] = this.bubbleAnimations[this.bubbleId][this.currentbubbleFrame % this.bubbleAnimations[this.bubbleId].length];
            ctx.drawImage(
                this.bubbleImg,
                frameX * 16, frameY * 16,
                16, 16, // frame size
                x + offsetX, y - 16,
                16, 16 // draw size
            );

            // bottom base px
            var [frameX, frameY] = this.bubbleAnimations["base"][this.currentbubbleFrame % this.bubbleAnimations["base"].length];
            ctx.drawImage(
                this.bubbleImg,
                frameX * 16, frameY * 16,
                16, 16,
                x + offsetX, y,
                16, 16
            );
            this.updatebubbleAnimationProgress();
        }
    }
}
