class DragDropQuiz {
    constructor( {text, onComplete, imgpath} ) {
        this.text = text;
        this.onComplete = onComplete;
        this.element = null;
        this.script = null;
        this.imgpath = imgpath;
        const overlay = document.getElementById('overlay');
    }

    createElement() {
        overlay.style.display = 'block'; // dim overlay

        // Create the element
        this.element = document.createElement("div");
        this.element.classList.add("DragDropQuiz");

        this.element.innerHTML = (`
            <h2 class="quiz-title">Translate Into Arabic<h2>
            <div class="image_text__container">
                <div class="crop">
                    <img id="npc" alt="npc">
                 </div>
                <div class="prompt" id="sentence"></div>
            </div>
            <br>
            <div class="line" id="input"></div>
            <br>
            <div id="container"></div>    
            <footer>
                <div class="skip_button" >SKIP</div>
                <button class="check_button" id="check-btn">CHECK</button>
            </footer>
            <div id="feedback"></div>
        `);
    
        this.addScriptStyle();
        this.setImg();
    
        this.element.querySelector("button").addEventListener("click", () => {
            if (this.element.querySelector("#feedback").style.color === "green") {
                this.done();
            }
        })
    
        this.actionListener = new KeyPressListener("Escape", () => {
            this.actionListener.unbind();
            this.done();
        })
    }


    async addScriptStyle() {
        var script = document.createElement('script');
        script.type="module";
        script.src = './popup/quiz/script.js';

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './popup/quiz/styles.css';

        this.element.appendChild(link)
        this.element.appendChild(script);
    }

    setImg() { // set image in quiz
        const img = this.element.querySelector("#npc");
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