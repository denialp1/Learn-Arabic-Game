import { exercises } from "./exercises.js";

// set sentence to exercise
const sentence = document.getElementById("sentence");
const container = document.getElementById("container");
const input = document.getElementById("input");
const feedback = document.getElementById("feedback");
var exercise = exercises[0];
sentence.innerHTML = exercise.english;

// get answers in arr
var answer = exercise.arabic.trim().split(/\s+/); 

// set blank inputs
var inputElement = "";
for (var i = answer.length - 1; i >= 0; i--) {
  inputElement += `<div onclick='inputClick(this.id);' style='display: inline' id=input${i} dir="rtl"> </div>`;
}
input.innerHTML = inputElement; // set the input fields

// set answer input buttons
var htmlElements = "";
for (var i = 0; i < answer.length; i++) {
  htmlElements += "<button class='word' onclick='btnClick(this.id);' id = 'btn" + i + "'>" + answer[i] + '</button>';
}
container.innerHTML = htmlElements;
var picked = 0;

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

// handle check
const checkBtn = document.getElementById("check-btn");
checkBtn.addEventListener('click', checkAnswer);

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
    } else {
      feedback.style.color = "red";
      feedback.textContent = "Try Again! 😅";
      feedback.style.display = "block"; 
      setTimeout(function(){ // hide for retry
        feedback.style.display = "none"; 
       }, 1000);
    }
}
