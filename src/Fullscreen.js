document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const fullscreenButton = document.getElementById('fullscreenButton');

    fullscreenButton.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            canvas.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    });

    // Adjust canvas size and zoom on fullscreen
    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            ctx.scale(window.innerWidth / 352, window.innerHeight / 198);
        } else {
            // Reset canvas size
            canvas.width = 352;
            canvas.height = 198;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
    });
});
