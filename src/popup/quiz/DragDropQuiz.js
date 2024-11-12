class DragDropQuiz {
    constructor( {text, onComplete} ) {
        this.text = text; // use this to pass in parameters instead of "Hello, my, name, is, Olivia, ."
        this.onComplete = onComplete;
        this.element = null;
        this.script = null;
    }

    createElement() {
        // Create the element
        this.element = document.createElement("div");
        this.element.classList.add("DragDropQuiz");
    
        this.element.innerHTML = (`
            <h2>Translate "Hello. My name is Olivia."</h2>
            <p>Drag and drop answers into the right boxes. Click on an answer to reset.</p>
    
            <div class="draggable-container">
                <div class="draggable" id="word1" draggable="true" data-in-drop-zone="false">
                    مرحبا
                </div>
                <div class="draggable" id="word2" draggable="true" data-in-drop-zone="false">
                    أنا
                </div>
                <div class="draggable" id="word3" draggable="true" data-in-drop-zone="false">
                    إسم
                </div>
                <div class="draggable" id="word4" draggable="true" data-in-drop-zone="false">
                    ي
                </div>
                <div class="draggable" id="word5" draggable="true" data-in-drop-zone="false">
                    أوليڤيا
                </div>
            </div>
    
            <div class="sentence-builder">
                <div class="drop-zone" id="drop1"></div>
                <div class="drop-zone" id="drop2"></div>
                <div class="drop-zone" id="drop3"></div>
                <div class="drop-zone" id="drop4"></div>
                <div class="drop-zone" id="drop5"></div>
            </div>
    
            <!-- Submit Button -->
            <button id="submit-btn">Submit</button>
    
            <div id="feedback"></div>
        `);
    
        this.addScript();
    
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

    addScript() {
        var script = document.createElement('script');
        script.src = './popup/quiz/DragDropQuizScript.js';
        this.element.appendChild(script);
    }
    done() {
        this.element.remove();
        this.onComplete();
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);
    }
}