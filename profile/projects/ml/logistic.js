var data = [];

var numberOfRows;
var numberOfColumns;

var xStep;
var yStep;

var m1 = 0;
var m2 = 0;
var b = 0;

document.addEventListener('contextmenu', event => event.preventDefault());

function setup() {
    createCanvas(1270, 790);
    numberOfColumns = 16;
    numberOfRows = 9;

    xStep = width / numberOfColumns;
    yStep = height / numberOfRows;
}

function gradientDescent() {
    var learning_rate = 0.05;
    for (var i = 0; i < data.length; i++) {
        var x1 = data[i].point.x;
        var x2 = data[i].point.y;
        var y = data[i].y;
        var h = (m1 * x1) + (m2 * x2) + b;
        var guess = 1 / (1 + ((Math.E) ** (-1 * h)));
        var error = y - guess;
        m1 = m1 + (error * (x1) * learning_rate);
        m2 = m2 + (error * (x2) * learning_rate);
        b = b + error * learning_rate;
    }

}

function drawLine() {
    fill(255);
    stroke(255);
    for (var i = 0; i < 1; i = i + 0.003) {
        var x1 = i;
        var x2 = (-1 / m2) * ((m1 * x1) + b);
        x1 = map(x1, 0, 1, 0, width);
        x2 = map(x2, 0, 1, height, 0);
        point(x1, x2);
    }
}

function mousePressed() {
    var x1 = map(mouseX, 0, width, 0, 1);
    var x2 = map(mouseY, 0, height, 1, 0);
    var y = 0;
    if (mouseButton == LEFT) {
        y = 1;
    } else {
        y = 0;
    }
    var point = createVector(x1, x2);
    data.push({ 'point': point, 'y': y });
}

function draw() {
    background(51);
    fill(0);
    stroke(0);

    for (var x = 0; x < width; x += xStep) {
        line(x, 0, x, height, -1, -1);
    }

    for (var y = 0; y < height; y += yStep) {
        line(0, y, width, y, -1, -1);
    }

    for (var i = 0; i < data.length; i++) {
        if (data[i].y == 1) {
            fill(255);
            stroke(255);
            var x1 = map(data[i].point.x, 0, 1, 0, width);
            var x2 = map(data[i].point.y, 0, 1, height, 0);
            ellipse(x1, x2, 8, 8);
        } else {
            fill('red');
            stroke('red');
            var x1 = map(data[i].point.x, 0, 1, 0, width);
            var x2 = map(data[i].point.y, 0, 1, height, 0);
            ellipse(x1, x2, 8, 8);
        }
    }

    if (data.length > 1) {
        gradientDescent();
        drawLine();
    }

}