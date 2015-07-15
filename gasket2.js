"use strict";

var canvas;
var gl;

var points = [];

var NumTimesToSubdivide = 1;

var angleToRotate = (Math.PI);

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    //
    //  Initialize our data for the Sierpinski Gasket
    //

    // First, initialize the corners of our gasket with three points.

    var vertices = [
        vec2(-1, -1),
        vec2(0, 1),
        vec2(1, -1)
    ];

    divideTriangle(vertices[0], vertices[1], vertices[2],
        NumTimesToSubdivide);

    rotate(angleToRotate);  // Do any rotation if provided

    console.dir(points);
    //
    //  Configure WebGL
    //
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);


    render();
};

function triangle(a, b, c) {
    points.push(a, b, c);
}

function divideTriangle(a, b, c, count) {

    // check for end of recursion

    if (count === 0) {
        triangle(a, b, c);
    } else {

        //bisect the sides

        var ab = mix(a, b, 0.5);
        var ac = mix(a, c, 0.5);
        var bc = mix(b, c, 0.5);

        --count;

        // three new triangles

        divideTriangle(a, ab, ac, count);
        divideTriangle(c, ac, bc, count);
        divideTriangle(b, bc, ab, count);
    }
}

function rotate(rads) {
    console.log('rotation function called with : ' + rads);
    console.log(points.length);
    for (var i = 0; i < points.length; i++) {

        var x = points[i][0];
        var y = points[i][1];

        console.log('Before Coord: ' + i + ' - X: ' + x + ' Y: ' + y);

        var nx = (x * Math.cos(rads)) - (y * Math.sin(rads));
        var ny = (x * Math.sin(rads)) + (y * Math.cos(rads));


        points[i][0] = + nx.toFixed(3);
        points[i][1] = + ny.toFixed(3);

        console.log('After Coord: ' + i + ' - X: ' + points[i][0] + ' Y: ' + points[i][1]);
    }
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, points.length);
}