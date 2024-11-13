class DragDropQuiz {
    constructor( {text, onComplete} ) {
        this.text = text; // use this to pass in parameters instead of "Hello, my, name, is, Olivia, ."
        this.onComplete = onComplete;
        this.element = null;
        this.script = null;
        const overlay = document.getElementById('overlay');
    }

    createElement() {
        overlay.style.display = 'block'; // dim overlay

        // Create the element
        this.element = document.createElement("div");
        this.element.classList.add("DragDropQuiz");
    
        this.element.innerHTML = (`
            <h2 class="quiz-title">Translate<h2>
            <p class="quiz-instructions">Drag and drop answers in the right order. Click on an answer to reset.</p>
            <p class="quiz-prompt"> "Hello. My name is Olivia."</p>
    
            
            <div class="sentence-builder">
                <div class="drop-zone" id="drop-zone"></div>
            </div>

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
    
    
            <!-- Submit Button -->
            <button class="submit-button" id="submit-btn">Submit</button>
    
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
        overlay.style.display = 'none';
        this.onComplete();
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);
    }
}