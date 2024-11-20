import { exercises } from "./exercises.js";

// set sentence to exercise
const title = document.getElementById("quiz-title");
const sentence = document.getElementById("sentence");
const container = document.getElementById("container");
const input = document.getElementById("input");
const feedback = document.getElementById("feedback");
const img = document.getElementById("npc");
const checkBtn = document.getElementById("check-btn");
const counter = document.getElementById("exercise-num");
const max = parseInt(document.getElementById("exercise-limit").textContent);
var exercise = null;
var answer = null;
var picked = 0;

// set
setExercise(parseInt(counter.textContent));

// set fields
function setExercise(count) {
  // console.log("setting", count);
  if (count >= 1 && count <= exercises.length) {
    exercise = exercises[count-1];
    answer = exercise.arabic.trim().split(/\s+/); 
    picked = 0; // track num inputs
    setItems();
    setInputs();
  }
}


// set information in html
function setItems() {
  title.textContent = exercise.title;
  sentence.innerHTML = exercise.english;
  img.style.display = "block";
  checkBtn.addEventListener('click', checkAnswer);
}

// set blank inputs
function setInputs() {
  var inputElement = "";
  for (var i = answer.length - 1; i >= 0; i--) {
    inputElement += `<div onclick='inputClick(this.id);' style='display: inline' id=input${i} dir="rtl"> </div>`;
  }
  input.innerHTML = inputElement; // set the input fields
  var htmlElements = "";
  for (var i = 0; i < answer.length; i++) { // set answer input buttons
    htmlElements += "<button class='word' onclick='btnClick(this.id);' id = 'btn" + i + "'>" + answer[i] + '</button>';
  }
  container.innerHTML = htmlElements;
}

// clicking on line inputs
window.inputClick = function inputClick(clicked) {
  const input = document.getElementById(clicked);
  input.innerHTML = ""; // clear inner
  input.className="";
  const btn = document.getElementById(`btn${input.btnId}`);
  btn.style.display = "inline";
  picked--;
}

// clicking on button inputs
window.btnClick = function btnClick(clicked) {
  var btnId = clicked.replace('btn', '');
  document.getElementById(clicked).style.display = "none";
  const input = document.getElementById("input" + picked);
  input.className="word";
  input.innerHTML = document.getElementById(clicked).innerHTML + " ";
  input.btnId = btnId;
  picked++;
}

// check answer function
function checkAnswer() {
    var userAnswer = [];
    for (var i = 0; i < picked; i++) { // iterate on items input
      if (document.getElementById(`input${i}`) === null) {
        break; // break if not all input
      }
      const inputDiv = document.getElementById(`input${i}`);
      userAnswer.push(inputDiv.innerHTML.trim());
    }

    if (userAnswer.join(" ") === answer.join(" ")) {
      feedback.style.color = "green";
      feedback.textContent = "Good Job! 🎉";
      feedback.style.display = "block"; 
      nextExercise();

    } else {
      feedback.style.color = "red";
      feedback.textContent = "Try Again! 😅";
      feedback.style.display = "block"; 
      setTimeout(function(){ // hide for retry
        feedback.style.display = "none"; 
       }, 1000);
    }
}

// counter to next exercise
function nextExercise() {
  setTimeout(() => {
    if (parseInt(counter.textContent) === max) { // 1 before last
      checkBtn.setAttribute("data-active", "false"); // use to check when to exit
      checkBtn.click();
    }
    counter.textContent = (parseInt(counter.textContent) + 1).toString();
    setExercise(counter.textContent);
    feedback.style.display = "none"; 
  }, 1500); // short delay before switch
  
}
