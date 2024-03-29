const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 60;
canvas.height = 400;
const img = new Image();

let context = canvas.getContext("2d");
context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

let draw_color = "black";
let draw_width = 2;
let is_drawing = false;

img.onload = function() {
    context.drawImage(img, 1, 1);
};

img.src = 'xyz.png';

function change_color(element) {
    draw_color = element.style.background;
}

function start(event) {
    is_drawing = true;
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft,
                   event.clientY - canvas.offsetTop);
    event.preventDefault();               
}

function draw(event) {
    if( is_drawing) {
        context.lineTo(event.clientX - canvas.offsetLeft,
                       event.clientY - canvas.offsetTop);
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();               
    }
    event.preventDefault();               
}

function stop(event) {
    if( is_drawing) {
        context.stroke();
        context.closePath();
        is_drawing = false;
    }
    event.preventDefault();
}

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw,false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);

canvas.addEventListener("touchend",stop,false);
canvas.addEventListener("mouseup",stop,false);
canvas.addEventListener("mouseout", stop,false);
