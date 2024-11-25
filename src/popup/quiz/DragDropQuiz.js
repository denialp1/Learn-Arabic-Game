class DragDropQuiz {
    constructor( {text, onComplete, imgpath, range} ) {
        this.text = text;
        this.type = "dragDropQuiz";
        this.onComplete = onComplete;
        this.element = null;
        this.script = null;
        this.imgpath = imgpath;
        this.range = range;
        const overlay = document.getElementById('overlay');
    }

    createElement() {
        overlay.style.display = 'block'; // dim overlay

        // Create the element
        this.element = document.createElement("div");
        this.element.classList.add("quiz");

        this.element.innerHTML = (`
            <div class="type" id="${this.type}">
                <h2 class="quiz-title" id="quiz-title"><h2>
                <div class="image_text__container">
                    <div class="crop">
                        <img id="npc" alt="npc">
                    </div>
                    <div class="prompt" id="sentence"></div>    
                    <div id="exercise-num"></div>
                    <div id="exercise-limit"></div>
                </div>
                <br>
                <div class="line" id="input"></div>
                <br>
                <div id="container"></div>    
                <footer>
                    <div class="skip_button" >Exit</div>
                    <button class="check_button" id="check-btn">CHECK</button>
                </footer>
                <div id="feedback"></div>
            </div>
        `);
    
        this.addScriptStyle();
        this.setImg();
        this.setButtons();
        this.setQuestion(this.range); // default start at 1

        this.actionListener = new KeyPressListener("Escape", () => {
            this.actionListener.unbind();
            this.done();
        })
    }

    // load scripts and links to css, need timestamps to prevent caching and load fresh
    async addScriptStyle() {
        const script = document.createElement('script');
        script.type = "module";
        script.src = `./popup/quiz/DragDropScript.js?timestamp=${new Date().getTime()}`;
        this.element.appendChild(script);
    
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `./popup/quiz/styles.css?timestamp=${new Date().getTime()}`;
        this.element.appendChild(link);
    }   

    // set skip, check buttons
    setButtons() {
        // check button
        const checkButton = this.element.querySelector("#check-btn");
        checkButton.setAttribute("data-active", "true"); // use to check when to exit
        checkButton.addEventListener("click", () => {
             if (checkButton.getAttribute("data-active") === "false") {
                // console.log("done");
                this.done();
            }
        },); // short delay to let DOM update
    
        // renamed skip to exit, just exit
        this.element.querySelector(".skip_button").addEventListener("click", () => {
            this.done();
        });
    }

    setQuestion(range) {
        // parse string
        const [lower, upper] = range.split(",").map(Number);
        // counter
        const start = this.element.querySelector("#exercise-num");
        // start.style.display = "none";
        start.textContent = lower;
        const limit = this.element.querySelector("#exercise-limit");
        limit.style.display = "none";
        limit.textContent = upper;
    }

    setImg() { // set image in quiz
        const img = this.element.querySelector("#npc");
        img.style.display = "none";
        img.src = this.imgpath;
    }

    done() {
        this.element.remove();
        overlay.style.display = 'none';
        this.onComplete();
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);
    }
}