
// canvas setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// set bounds
canvas.width = 2924
canvas.height = 1576

function resizeCanvas() {
    const canvasContainer = document.querySelector('.canvas-container');
    const width = canvasContainer.clientWidth;
    const height = canvasContainer.clientHeight;

    // Calculate the aspect ratio of the canvas
    const canvasRatio = canvas.width / canvas.height;
    const containerRatio = width / height;

    // Set the canvas size based on the container size while maintaining aspect ratio
    if (containerRatio > canvasRatio) {
        // Fit canvas width to container width
        canvas.width = width;
        canvas.height = width / canvasRatio;
    } else {
        // Fit canvas height to container height
        canvas.height = height;
        canvas.width = height * canvasRatio;
    }
}

// Call resizeCanvas initially and whenever the window is resized
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// fill background default color
c.fillStyle = '#3a3a50'
c.fillRect(0, 0, canvas.width, canvas.height)

export {canvas, c};