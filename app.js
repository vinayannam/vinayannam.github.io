// let resizeReset = function() {
//     w = canvasBody.width = window.innerWidth;
//     h = canvasBody.height = window.innerHeight;
//     setup();
// };

// const opts = {
//     particleColor: ['#2C3E50', '#E74C3C', '#ECF0F1', '#3498DB', '#2980B9'],
//     lineColor: "rgb(200,200,200)",
//     particleAmount: 50,
//     defaultSpeed: 1,
//     variantSpeed: 1,
//     defaultRadius: 2,
//     variantRadius: 2,
//     linkRadius: 200
// };

// window.addEventListener("resize", function() {
//     deBouncer();
// });

// let deBouncer = function() {
//     clearTimeout(tid);
//     tid = setTimeout(function() {
//         resizeReset();
//     }, delay);
// };

// let checkDistance = function(x1, y1, x2, y2) {
//     return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
// };

// let linkPoints = function(point1, hubs) {
//     for (let i = 0; i < hubs.length; i++) {
//         let distance = checkDistance(point1.x, point1.y, hubs[i].x, hubs[i].y);
//         let opacity = 1 - distance / opts.linkRadius;
//         if (opacity > 0) {
//             drawArea.lineWidth = 0.5;
//             drawArea.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${
//           rgb[2]
//         }, ${opacity})`;
//             drawArea.beginPath();
//             drawArea.moveTo(point1.x, point1.y);
//             drawArea.lineTo(hubs[i].x, hubs[i].y);
//             drawArea.closePath();
//             drawArea.stroke();
//         }
//     }
// };

// Particle = function(xPos, yPos) {
//     this.x = Math.random() * w;
//     this.y = Math.random() * h;
//     this.speed = opts.defaultSpeed + Math.random() * opts.variantSpeed;
//     this.directionAngle = Math.floor(Math.random() * 360);
//     this.color = opts.particleColor[Math.floor(Math.random() * opts.particleColor.length)];
//     this.radius = opts.defaultRadius + Math.random() * opts.variantRadius;
//     this.vector = {
//         x: Math.cos(this.directionAngle) * this.speed,
//         y: Math.sin(this.directionAngle) * this.speed
//     };
//     this.update = function() {
//         this.border();
//         this.x += this.vector.x;
//         this.y += this.vector.y;
//     };
//     this.border = function() {
//         if (this.x >= w || this.x <= 0) {
//             this.vector.x *= -1;
//         }
//         if (this.y >= h || this.y <= 0) {
//             this.vector.y *= -1;
//         }
//         if (this.x > w) this.x = w;
//         if (this.y > h) this.y = h;
//         if (this.x < 0) this.x = 0;
//         if (this.y < 0) this.y = 0;
//     };
//     this.draw = function() {
//         drawArea.beginPath();
//         drawArea.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
//         drawArea.closePath();
//         drawArea.fillStyle = this.color;
//         drawArea.fill();
//     };
// };

// var particles = [];

// function setup() {
//     particles = [];
//     for (let i = 0; i < opts.particleAmount; i++) {
//         particles.push(new Particle());
//     }
//     window.requestAnimationFrame(loop);
// }

// function loop() {
//     window.requestAnimationFrame(loop);
//     drawArea.clearRect(0, 0, w, h);
//     for (let i = 0; i < particles.length; i++) {
//         particles[i].update();
//         particles[i].draw();
//     }
//     for (let i = 0; i < particles.length; i++) {
//         linkPoints(particles[i], particles);
//     }
// }

// const canvasBody = document.getElementById("canvas"),
//     drawArea = canvasBody.getContext("2d");
// let delay = 200,
//     tid,
//     rgb = opts.lineColor.match(/\d+/g);
// resizeReset();
// setup();




const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const maxRadius = 35

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

const prop = {
    colors: ['#2C3E50', '#E74C3C', '#ECF0F1', '#3498DB', '#2980B9']
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

    this.update = function() {
        this.x += this.dx
        this.y += this.dy

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

    this.draw = function() {
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
    for (let i = 0; i < 400; i++) {
        const randomX = Math.random() * canvas.width
        const randomY = Math.random() * canvas.height
        const randomR = Math.random() * 5
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
    window.requestAnimationFrame(updateAll)
}

init()

updateAll()