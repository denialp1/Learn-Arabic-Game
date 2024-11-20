class TypeQuiz {
    constructor( {text, onComplete, imgpath, audio} ) {
        this.text = text;
        this.type = "typeQuiz";
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
        this.element.classList.add("quiz");

        this.element.innerHTML = (`
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
            <div class="quizbox" id="${this.type}">
                <h2 class="quiz-title" id="quiz-title"><h2>
                <div class="image_text__container">
                    <div class="crop">
                        <img id="npc" alt="npc">
                    </div>
                    <div class="audio_btn" id="prompt"></div>   
                    <i id="volume-icon" class="fas fa-volume-up"></i>  
                    <audio class="audio" id="audio" controls></audio>
                    <div id="exercise-num"></div>
                </div>
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

        this.actionListener = new KeyPressListener("Escape", () => {
            this.actionListener.unbind();
            this.done();
        })
    }

    // load scripts and links to css, need timestamps to prevent caching and load fresh
    async addScriptStyle() {
        const script = document.createElement('script');
        script.type = "module";
        script.src = `./popup/quiz/TypeQuizScript.js?timestamp=${new Date().getTime()}`;
        this.element.appendChild(script);
    
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `./popup/quiz/styles.css?timestamp=${new Date().getTime()}`;
        this.element.appendChild(link);
    }   

    // set skip, check buttons
    setButtons() {
        // audio
        const promptButton = this.element.querySelector("#prompt");
        promptButton.addEventListener("click", () => {
            var audio = document.getElementById("audio");
            if (document.getElementById("audio")) {
                audio.currentTime = 0; // reset time
                audio.play(); // play the audio when the prompt is clicked
            }
        });

        // counter
        const counter = this.element.querySelector("#exercise-num");
        counter.textContent = 1;
        counter.style.display = "none";

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
            var audio = document.getElementById("audio");
            if (audio) { // if audio exist
                audio.pause();   // pause the audio
                audio.currentTime = 0;  // reset to the start of the audio
            }
            this.done();
        });
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