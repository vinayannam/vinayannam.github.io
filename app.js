const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const maxRadius = 35

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

const prop = {
    colors: ['#2C3E50', '#E74C3C', '#ECF0F1', '#3498DB', '#2980B9'],
    linkRadius: 50,
    count: 150
}

let checkDistance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

var mouseX = 0;
var mouseY = 0;

let mousePos = function (canvas, event) {
    var rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
}

canvas.addEventListener('mousemove', function (event) {
    mousePos(canvas, event)
})

let linkPoints = function (circle, circles) {
    for (let i = 0; i < circles.length; i++) {
        let distance = checkDistance(circle.x, circle.y, circles[i].x, circles[i].y);
        let opacity = 1 - distance / prop.linkRadius;
        if (opacity > 0) {
            c.lineWidth = 0.5;
            var rgb = hexToRgb(circle.color);
            c.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
            c.beginPath();
            c.moveTo(circle.x, circle.y);
            c.lineTo(circles[i].x, circles[i].y);
            c.closePath();
            c.stroke();
        }
    }
};

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function Circle(x, y, r) {
    const randomNumber = Math.floor(Math.random() * 4)
    const randomTrueOrFalse = Math.floor(Math.random() * 2)

    this.x = x
    this.y = y
    this.r = r
    this.color = prop.colors[randomNumber]

    if (randomTrueOrFalse == 1) {
        this.dx = -Math.random() * 1
    } else {
        this.dx = Math.random() * 1
    }

    if (randomTrueOrFalse == 1) {
        this.dy = -Math.random() * 1
    } else {
        this.dy = Math.random() * 1
    }

    this.update = function () {
        this.x += this.dx
        this.y += this.dy
        // this.x = mouseX
        // this.y = mouseY

        if (
            this.x + this.r > canvas.width ||
            this.x - this.r <= 0
        ) {
            this.dx = -this.dx
        }
        if (
            this.y + this.r > canvas.height ||
            this.y - this.r <= 0
        ) {
            this.dy = -this.dy
        }

        this.draw()
    }

    this.draw = function () {
        c.beginPath()
        c.arc(
            this.x,
            this.y,
            Math.abs(this.r),
            0,
            Math.PI * 2
        )
        c.fillStyle = this.color
        c.fill()
    }
}

let circleArray = []

function init() {
    for (let i = 0; i < prop.count; i++) {
        const randomX = Math.random() * canvas.width
        const randomY = Math.random() * canvas.height
        const randomR = Math.random() * 8
        circleArray.push(
            new Circle(randomX, randomY, randomR)
        )
    }
}

function updateAll() {
    c.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update()
    }
    for (let i = 0; i < circleArray.length; i++) {
        linkPoints(circleArray[i], circleArray);
    }
    window.requestAnimationFrame(updateAll)
}

init()
updateAll()