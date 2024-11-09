const levelNames = {
  1: "DemoRoom",
  2: "grocery",
  3: "grocery"
};

// set level in localstorage for init in map later
function setLevel(levelNumber) {
  const levelName = levelNames[levelNumber];

  if (levelName) {
    localStorage.setItem('level', levelName);
    console.log(`Level set to: ${levelName}`);
  }
}