document.addEventListener('DOMContentLoaded', () => {
    // set slider controls for game volume
    const volumeSlider = document.getElementById('gameVolumeSlider');
    var volumeValue = document.getElementById("gameVolume");
    volumeValue.innerHTML = volumeSlider.value;

    const sfxSlider = document.getElementById('sfxVolumeSlider');
    var sfxValue = document.getElementById("sfxVolume");
    sfxValue.innerHTML = sfxSlider.value;

     // necessary as original mp3 is loud
    const factor = 0.005;
    
    // check for slider changes
    volumeSlider.addEventListener('input', (event) => {
        const volume = parseFloat(event.target.value);

        if (window.globalAudio) {
            // console.log("setting volume value", volume);
            window.globalAudio.volume = volume * factor;
            volumeValue.innerHTML = Math.round(volume);
        }
        // user interaction required for audio play
        if (window.globalAudio.muted == true) {
            window.globalAudio.muted = false;
            window.globalAudio.play().catch(error => {
                console.error("Failed to play audio:", error);
            });
        }
    });

    sfxSlider.addEventListener('input', (event) => {
        const sfxVolume = parseFloat(event.target.value);

        if (window.globalAudio) {
            // console.log("setting volume value", volume);
            window.globalAudio.volume = sfxVolume * factor;
            sfxValue.innerHTML = Math.round(sfxVolume);
        }
    });
});
