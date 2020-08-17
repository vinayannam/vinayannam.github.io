var data = [];

var numberOfRows;
var numberOfColumns;

var xStep;
var yStep;

var m1 = 0;
var b = 0;


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
        var x = data[i].x;
        var y = data[i].y;
        var guess = (m1 * x) + b;
        var error = y - guess;
        m1 = m1 + (error * (x) * learning_rate);
        b = b + error * learning_rate;
    }

}

function drawLine() {
    for (var i = 0; i < 1; i = i + 0.003) {
        var x = i;
        var y = (m1 * x) + b;
        x = map(x, 0, 1, 0, width);
        y = map(y, 0, 1, height, 0);
        point(x, y);
    }
}



function mousePressed() {
    var x = map(mouseX, 0, width, 0, 1);
    var y = map(mouseY, 0, height, 1, 0);
    var point = createVector(x, y);
    data.push(point);
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
        fill(255);
        stroke(255);
        var x = map(data[i].x, 0, 1, 0, width);
        var y = map(data[i].y, 0, 1, height, 0);
        ellipse(x, y, 8, 8);
    }

    if (data.length > 1) {
        gradientDescent();
        drawLine();
    }

}