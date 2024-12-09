import { multipleChoiceExercises } from "./exercises.js";

// set sentence to exercise
const title = document.getElementById("quiz-title");
const type = document.getElementsByClassName("type");
const sentence = document.getElementById("sentence");
const container = document.getElementById("container");
const input = document.getElementById("input");
const feedback = document.getElementById("feedback");
const img = document.getElementById("npc");
const checkBtn = document.getElementById("check-btn");
const counter = document.getElementById("exercise-num");
const icon = document.getElementById("volume-icon");

const audioButton = document.getElementById("audio");
const prompt = document.getElementById("prompt");
var audio = null;

var exercises = multipleChoiceExercises;
var exercise = null;
var answer = null;
var options = [];

// set
setExercise(parseInt(counter.textContent));

// set fields
function setExercise(count) {
  // type[0].id = type of quiz, passed in line 20 DragDropQuiz/MultipleChoiceQuiz.js
  
  // console.log("setting", count);
  if (count >= 1 && count <= exercises.length) {
    exercise = exercises[count-1];
    if (exercise.audio) { // audio exercise?
      audioButton.src = exercise.audio; // set audio path
      audioButton.volume = 0.6;
      prompt.innerHTML = exercise.prompt; // moved from setItems()
      toggleMode("audio");
    } else {
      sentence.innerHTML = exercise.english; // moved from setItems()
      toggleMode();
    }
    answer = exercise.arabic.trim().split(/\s+/); 
    options = exercise.list;
    setItems();
    setChoices();
  }
}

// hides audio button or sentence prompt
function toggleMode(mode) {
  if (mode == "audio") {
    prompt.style.display = 'inline';
    sentence.style.display = 'none';
    icon.style.display = 'inline';
  } else {
    prompt.style.display = 'none';
    sentence.style.display = 'inline';
    icon.style.display = 'none';
  }
}

// set information in html
function setItems() {
    title.textContent = exercise.title;
    img.style.display = "block";
    checkBtn.addEventListener('click', checkAnswer);
  }

function setChoices() {
    var htmlElements = "";
    // Shuffle the options array randomly
    options = [...new Set(options)].sort(() => Math.random() - 0.5);
    for (let i = 0; i < options.length; i++) {
      htmlElements += "<button class='word multiple_choice' onclick='btnClick(this.id);' id = 'btn" + i + "'>" + options[i] + '</button>';
    }
    container.innerHTML = htmlElements;
  }

// clicking on button inputs
window.btnClick = function btnClick(clicked) {
// Reset all other buttons to not have active class
var buttons = document.getElementsByClassName("multiple_choice");
for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
}
document.getElementById(clicked).classList.add("active");
}

// check answer function
function checkAnswer() {
    const activeButton = document.querySelector(".multiple_choice.active");
    if (activeButton) {
        const selectedAnswer = activeButton.textContent.trim();
        // console.log(selectedAnswer);
        if (selectedAnswer === answer.join(" ")) {
          feedback.style.color = "green";
            feedback.textContent = "Good Job! 🎉";
            feedback.style.display = "block"; 
            nextExercise();
        } else {
            feedback.textContent = "Try Again! 😅";
            feedback.style.color = "red";
            feedback.style.display = "block";
            setTimeout(function(){ // hide for retry
              feedback.style.display = "none"; 
             }, 1000);
        }
    }
}

// counter to next exercise
function nextExercise() {
  setTimeout(() => {
    if (parseInt(counter.textContent) == exercises.length) { // 1 before last
      checkBtn.setAttribute("data-active", "false"); // use to check when to exit
      checkBtn.click();
    }
    counter.textContent = (parseInt(counter.textContent) + 1).toString();
    setExercise(counter.textContent);
    feedback.style.display = "none"; 
  }, 1500); // short delay before switch
  
}
