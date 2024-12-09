document.addEventListener('DOMContentLoaded', () => {
    const volumeSlider = document.getElementById('gameVolumeSlider');
    const volumeValue = document.getElementById("gameVolume");
    const sfxSlider = document.getElementById('sfxVolumeSlider');
    const sfxValue = document.getElementById("sfxVolume");

    const MAX_VOLUME = 0.5;

    const scaleToAudioVolume = (sliderValue) => Math.pow(sliderValue / 100, 2) * MAX_VOLUME;
    const scaleToSliderValue = (audioVolume) => Math.sqrt(audioVolume / MAX_VOLUME) * 100;

    // stored scaled values or use defaults
    const storedVolume = parseFloat(localStorage.getItem('gameVolumeScaled')) || 0.25; // 25% volume
    const storedSfxVolume = parseFloat(localStorage.getItem('sfxVolumeScaled')) || 0.25; // 25% SFX volume
    const initialSliderVolume = scaleToSliderValue(storedVolume);
    const initialSliderSfxVolume = scaleToSliderValue(storedSfxVolume);

    // set initial slider positions, display values
    volumeSlider.value = initialSliderVolume;
    volumeValue.innerHTML = Math.round(initialSliderVolume);
    sfxSlider.value = initialSliderSfxVolume;
    sfxValue.innerHTML = Math.round(initialSliderSfxVolume);

    // set initial audio volume
    if (window.globalAudio) {
        window.globalAudio.volume = storedVolume;
    }

    volumeSlider.addEventListener('input', (event) => {
        const sliderValue = parseFloat(event.target.value);
        const scaledVolume = scaleToAudioVolume(sliderValue);

        if (window.globalAudio) {
            window.globalAudio.volume = scaledVolume;
            volumeValue.innerHTML = Math.round(sliderValue);
        }

        // save to local storage
        localStorage.setItem('gameVolumeScaled', scaledVolume);

        if (window.globalAudio.muted) {
            window.globalAudio.muted = false;
            window.globalAudio.play().catch(error => {
                console.error("Failed to play audio:", error);
            });
        }
    });

    sfxSlider.addEventListener('input', (event) => {
        const sliderValue = parseFloat(event.target.value);
        const scaledSfxVolume = scaleToAudioVolume(sliderValue);

        if (window.globalAudio) {
            window.globalAudio.volume = scaledSfxVolume;
            sfxValue.innerHTML = Math.round(sliderValue);
        }

        // save local storage
        localStorage.setItem('sfxVolumeScaled', scaledSfxVolume);
    });
});
