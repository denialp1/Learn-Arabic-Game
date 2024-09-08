// initialize global audio object
window.globalAudio = new Audio('../audio/game/sample.mp3');
window.globalAudio.loop = true;
window.globalAudio.volume = 0;

// start muted, as permissions denied initially
window.globalAudio.muted = true; 
