// Declarations :/
const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

let cw = window.innerWidth;
let ch = window.innerHeight;
let boxArray = [];
const boxes = 10;

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener("resize", resize); // OUUUUU EVENT LISTENERRRR
window.addEventListener("mousemove", function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener("click", function() {
    let size = 50;
    let x = mouse.x - size/2;
    let y = mouse.y - size/2;
    let dx = (Math.random() - 0.5) * 10;
    let dy = (Math.random() - 0.5) * 10;
    let color = "black";

    boxArray.push(new Box(size, x, y, dx, dy, color));
});
function resize() { // Resize the canvas when the window is resized
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cw = canvas.width;
    ch = canvas.height;

    int()
}

function Box(size, x, y, dx, dy, color) {
    this.size = size;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;

    this.draw = function() {
        c.beginPath();
        c.rect(this.x, this.y, this.size, this.size);
        c.strokeStyle = this.color;
        c.stroke();
    }

    this.update = function() {
        if (this.x + this.size >= cw || this.x  <= 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.size >= ch || this.y <= 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw()
    }
}

function int() { // Initialize the script
    c.clearRect(0, 0, cw, ch);
    boxArray = [];

    for (var i = 0; i < boxes; i++) {
        let size = 50;
        let x = Math.random() * (cw - size * 2) + size;
        let y = Math.random() * (ch - size * 2) + size;
        let dx = (Math.random() - 0.5) * 10;
        let dy = (Math.random() - 0.5) * 10;
        let color = "black";


        boxArray.push(new Box(size, x, y, dx, dy, color));
    }
}

function draw() {
    c.clearRect(0, 0, cw, ch);
    requestAnimationFrame(draw)
    for (var i = 0; i < boxArray.length; i++) {
        boxArray[i].update();
    }
}

resize()
draw()