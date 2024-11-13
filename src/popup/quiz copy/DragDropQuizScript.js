// Get all draggable words, the single drop zone, submit button, and feedback area
var draggableWords = document.querySelectorAll('.draggable');
var dropZone = document.getElementById('drop-zone'); // Single drop zone
var submitBtn = document.getElementById('submit-btn');
var feedback = document.getElementById('feedback');

// Correct answer for checking (new sentence)
var correctAnswer = ["أوليڤيا", "ي", "إسم", "أنا", "مرحبا"]; 

// Set up drag-and-drop functionality
draggableWords.forEach(word => {
    word.addEventListener('dragstart', dragStart);
    word.addEventListener('dragend', dragEnd);
});

dropZone.addEventListener('dragover', dragOver);
dropZone.addEventListener('drop', drop);
dropZone.addEventListener('click', removeWord);  // Allow removal on click

// Allow the word to be dragged
function dragStart(e) {
    e.dataTransfer.setData('text', e.target.id); // Store the id of the dragged element
    e.target.style.opacity = 0.5; // Make the word slightly transparent while dragging
    e.target.classList.add('dragging'); // Add a class for visual changes during dragging

    // Offset the draggable image to the right by modifying the position
    e.target.style.position = 'absolute'; // Change to absolute positioning
    e.target.style.left = (e.clientX + 10) + 'px'; // Offset by 10px to the right
    e.target.style.top = (e.clientY - e.target.offsetHeight / 2) + 'px'; // Center vertically based on mouse position
}

function dragEnd(e) {
    e.target.style.opacity = 1; // Reset opacity after dragging
    e.target.classList.remove('dragging'); // Remove the dragging class to reset styles
    e.target.style.position = ''; // Reset position to default
    e.target.style.left = ''; // Reset the left offset
    e.target.style.top = ''; // Reset the top offset
}

// Allow the drop
function dragOver(e) {
    e.preventDefault(); // Allow dropping by preventing the default behavior
}

function drop(e) {
    e.preventDefault();
    var draggedId = e.dataTransfer.getData('text');
    var draggedWord = document.getElementById(draggedId);

    // Only allow drop if the word is draggable and hasn't been dropped already
    if (draggedWord && draggedWord.getAttribute('data-in-drop-zone') === 'false') {
        dropZone.appendChild(draggedWord);  // Add to the single drop zone
        draggedWord.setAttribute('data-in-drop-zone', 'true'); // Mark it as dropped
    }
}

// Allow the user to click and remove words from the drop zone
function removeWord(e) {
    if (e.target && e.target.classList.contains('draggable')) {
        const word = e.target;
        word.setAttribute('data-in-drop-zone', 'false'); // Mark the word as not in the drop zone
        document.querySelector('.draggable-container').appendChild(word); // Move the word back to the draggable container
        word.style.visibility = 'visible'; // Ensure it is visible
    }
}

// Handle submission logic
submitBtn.addEventListener('click', checkAnswer);

function checkAnswer() {
    // Get the sequence of words in the drop zone
    const userAnswer = Array.from(dropZone.children).map(word => word.textContent.trim());

    // Reset draggable attributes to allow rearrangement
    draggableWords.forEach(word => {
        word.setAttribute('draggable', 'true');
        word.style.cursor = 'move';
    });

    // Check if the user’s answer matches the correct answer
    if (JSON.stringify(userAnswer) === JSON.stringify(correctAnswer)) {
        feedback.textContent = "Good Job! 🎉";
        feedback.style.color = "green";
    } else {
        feedback.textContent = "Try Again! 😅";
        feedback.style.color = "red";
    }
}
