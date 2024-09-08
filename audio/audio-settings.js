document.addEventListener('DOMContentLoaded', () => {
    // set slider controls for game volume
    const volumeSlider = document.getElementById('gameVolumeSlider');
    var volumeValue = document.getElementById("gameVolume");
    volumeValue.innerHTML = volumeSlider.value;

     // necessary as original mp3 is loud
    const factor = 0.005;
    
    // check for slider changes
     volumeSlider.addEventListener('input', (event) => {
        const volume = parseFloat(event.target.value);

        if (window.globalAudio) {
            // console.log("setting volume value", volume);
            window.globalAudio.volume = volume * factor;
            volumeValue.innerHTML = Math.round(volume * 100);
        }
        // user interaction required for audio play
        if (window.globalAudio.muted == true) {
            window.globalAudio.muted = false;
            window.globalAudio.play().catch(error => {
                console.error("Failed to play audio:", error);
            });
        }
    });
});
