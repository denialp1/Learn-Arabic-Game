// character png array to loop through with prev/next
const characters = [
  { src: "../assets/characters/character1.png", id: 1},
  { src: "../assets/characters/character2.png", id: 2},
  { src: "../assets/characters/character3.png", id: 3}
  // { src: "../assets/characters/character4.png", id: 4},
  // { src: "../assets/characters/character5.png", id: 5},
  // { src: "../assets/characters/character6.png", id: 6}
];

let currentCharacter = 0;
localStorage.setItem('selectedCharacter', 1); // reset on load

function updateCharacterDisplay() {
  const characterImage = document.getElementById('character-image');
  // const continueButton = document.getElementById('continue-button');
  // continueButton.innerHTML = characters[currentCharacter].name;

  cur = characters[currentCharacter];
  characterImage.src = cur.src; // set character png
  localStorage.setItem('selectedCharacter', cur.id); // save character selected
}

function nextCharacter() {
  currentCharacter = (currentCharacter + 1) % characters.length;
  updateCharacterDisplay();
}

function previousCharacter() {
  currentCharacter = (currentCharacter - 1 + characters.length) % characters.length;
  updateCharacterDisplay();
}
