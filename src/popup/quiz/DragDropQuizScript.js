// Get all draggable words, drop zones, submit button, and feedback area
var draggableWords = document.querySelectorAll('.draggable');
var dropZones = document.querySelectorAll('.drop-zone');
var submitBtn = document.getElementById('submit-btn');
var feedback = document.getElementById('feedback');

// Correct answer for checking (new sentence)
var correctAnswer = ["Hello", "My", "name", "is", "Olivia", "."];

// Set up drag-and-drop functionality
draggableWords.forEach(word => {
    word.addEventListener('dragstart', dragStart);
    word.addEventListener('dragend', dragEnd);
});

dropZones.forEach(zone => {
    zone.addEventListener('dragover', dragOver);
    zone.addEventListener('drop', drop);
    zone.addEventListener('click', removeWord);  // Allow removal on click
});

// Allow the word to be dragged
function dragStart(e) {
    e.dataTransfer.setData('text', e.target.id); // Store the id of the dragged element
    e.target.style.opacity = 0.5; // Make the word slightly transparent while dragging
}

function dragEnd(e) {
    e.target.style.opacity = 1; // Reset opacity after dragging
}

// Allow the drop
function dragOver(e) {
    e.preventDefault(); // Allow dropping by preventing the default behavior
}

function drop(e) {
    e.preventDefault();
    var draggedId = e.dataTransfer.getData('text');
    var draggedWord = document.getElementById(draggedId);

    // Only allow drop if the zone is empty and the word is draggable
    if (!e.target.innerHTML && draggedWord && draggedWord.getAttribute('data-in-drop-zone') === 'false') {
        e.target.appendChild(draggedWord);
        draggedWord.setAttribute('data-in-drop-zone', 'true'); // Mark it as dropped in a zone
    }
}

// Allow the user to click and remove words from the drop zone
function removeWord(e) {
    if (e.target && e.target.classList.contains('draggable')) {
        const word = e.target;
        const wordId = word.id;
        word.setAttribute('data-in-drop-zone', 'false'); // Mark the word as not in a drop zone
        document.querySelector('.draggable-container').appendChild(word); // Move the word back to the draggable container
        word.style.visibility = 'visible'; // Ensure it is visible
    }
}

// Handle submission logic
submitBtn.addEventListener('click', checkAnswer);

function checkAnswer() {
    const userAnswer = Array.from(dropZones).map(zone => zone.textContent.trim());

    // Ensure the words remain draggable and can still be rearranged after submission
    draggableWords.forEach(word => {
        word.setAttribute('draggable', 'true');
        word.style.cursor = 'move';
    });

    // Allow drag and drop again even after submit
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', dragOver);
        zone.addEventListener('drop', drop);
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

// Re-enable words in drop zones to be dragged back into the draggable container
dropZones.forEach(zone => {
    zone.addEventListener('dragstart', (e) => {
        const word = e.target;
        if (word.classList.contains('draggable')) {
            word.setAttribute('data-in-drop-zone', 'false');
            document.querySelector('.draggable-container').appendChild(word); // Put back in the answer bank
        }
    });
});
