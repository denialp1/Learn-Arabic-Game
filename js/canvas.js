// canvas setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// set bounds
canvas.width = 1024
canvas.height = 576

// fill background default color
c.fillStyle = 'gray'
c.fillRect(0, 0, canvas.width, canvas.height)

export {canvas, c};