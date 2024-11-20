import { typeExercises } from "./exercises.js";  // Keep this import since you're using it to load the exercises.

// set sentence to exercise
const title = document.getElementById("quiz-title");
const audioButton = document.getElementById("audio");
const container = document.getElementById("container");
const feedback = document.getElementById("feedback");
const img = document.getElementById("npc");
const checkBtn = document.getElementById("check-btn");
const counter = document.getElementById("exercise-num");
const prompt = document.getElementById("prompt");

var exercises = typeExercises;
var exercise = null;
var answer = null;
var placeholder = null;
var audio = null;

// set exercise
setExercise(parseInt(counter.textContent));

// set fields
function setExercise(count) {
  if (count >= 1 && count <= exercises.length) {
    exercise = exercises[count - 1];
    answer = exercise.english;
    audioButton.src = exercise.audio; // set audio path
    audioButton.volume = 0.08;
    placeholder = exercise.placeholder;
    setItems();
    setInputArea();
  }
}

// set information in html
function setItems() {
  title.textContent = exercise.title;
  prompt.innerHTML = exercise.prompt;
  img.style.display = "block";
  checkBtn.addEventListener('click', checkAnswer);
}

function setInputArea() {
  var htmlElements = `<textarea type='textarea' class='typefield' id='user-input' placeholder='${placeholder}'></textarea>`;
  container.innerHTML = htmlElements;

  const textarea = document.getElementById('user-input'); // textarea to auto-format nums
  textarea.addEventListener('input', (e) => {
    const rawInput = e.target.value.replace(/\D/g, ''); // remove non-numeric chars
    const oldValue = e.target.value;
    let formatted = '';

    // apply formatting rules based on the input length
    if (rawInput.length > 0) formatted = '+';
    if (rawInput.length > 0) formatted += `(${rawInput.slice(0, 3)}`;
    if (rawInput.length > 3) formatted += `) ${rawInput.slice(3, 4)}`;
    if (rawInput.length > 4) formatted += `-${rawInput.slice(4, 10)}`;

    // get cursor position and calculate adjustment
    const cursorPosition = e.target.selectionStart;
    const oldFormattedLength = oldValue.length;
    const newFormattedLength = formatted.length;
    const adjustment = newFormattedLength - oldFormattedLength;

    // update the value and cursor position
    e.target.value = formatted;
    const newCursorPosition = cursorPosition + (adjustment > 0 ? adjustment : 0);
    e.target.selectionStart = e.target.selectionEnd = newCursorPosition;
  });

  // pasting
  textarea.addEventListener('paste', (e) => {
    e.preventDefault();
    const pasteData = (e.clipboardData || window.clipboardData).getData('text');
    const cleanedData = pasteData.replace(/\D/g, '').slice(0, 10); // limit to 10 digits
    textarea.value = `+(${cleanedData.slice(0, 3)}) ${cleanedData.slice(3, 4)}-${cleanedData.slice(4, 10)}`;
  });
}

// check answer function
function checkAnswer() {
  if (document.getElementById("user-input") == null) {
    return;
  }
  const userInput = document.getElementById("user-input").value.trim();
  if (userInput) {
    console.log(userInput);
    console.log(answer);
    if (userInput === answer) {
      feedback.textContent = "Good Job! 🎉";
      feedback.style.color = "green";
      nextExercise();
    } else {
      feedback.textContent = "Try Again! 😅";
      feedback.style.color = "red";
      feedback.style.display = "block";
      setTimeout(function() { // hide for retry
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
