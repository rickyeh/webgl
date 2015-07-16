"use strict";

var canvas;
var gl;

var points = [];
var flag = true;

var NumTimesToSubdivide = 1;
var angleToRotate = 0

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
        vec2(-0.5, -0.5),
        vec2(0, 0.5),
        vec2(0.5, -0.5)
    ];

    // var vertices = [
    //     vec2(-1, -1),
    //     vec2(0, 1),
    //     vec2(1, -1)
    // ];

    divideTriangle(vertices[0], vertices[1], vertices[2],
        NumTimesToSubdivide);

    console.dir(points);

    // rotate(angleToRotate);  // Do any rotation if provided

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
    points.push(rotate(a));
    points.push(rotate(b));
    points.push(rotate(c));
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
        // divideTriangle(ab, bc, ac, count);
    }
}

function rotate(vertex) {
    // if (flag) {
    //     var d = 1;
    // } else {
        var d = Math.sqrt((vertex[0] * vertex[0]) + (vertex[1] * vertex[1]));
        console.log(d);
    // }

    var nx = 0;
    var ny = 0;

    console.log('Vertex[0] - ' + vertex[0]);
    console.log('Vertex[1] - ' + vertex[1]);

    nx = vertex[0] * Math.cos(d * angleToRotate) - vertex[1] * Math.sin(d * angleToRotate);
    ny = vertex[0] * Math.sin(d * angleToRotate) + vertex[1] * Math.cos(d * angleToRotate);

    console.log('New X - ' + nx);
    console.log('New Y - ' + ny);

    return [nx, ny];
}

// function rotate(rads) {
//     console.log('rotation function called with : ' + rads);

//     for (var i = 0; i < points.length; i++) {

//         // console.log('Before Coord: ' + i + ' - X: ' + x + ' Y: ' + y);

//         var nx = (points[i][0] * Math.cos(rads)) - (points[i][1] * Math.sin(rads));
//         var ny = (points[i][0] * Math.sin(rads)) + (points[i][1] * Math.cos(rads));


//         points[i][0] = + nx.toFixed(2);
//         points[i][1] = + ny.toFixed(2);

//         console.log('I: ' + i + '   Points[1][0]: ' + points[1][0]);

//         console.log('After Coord: ' + i + ' - (' + points[i][0] + ' , ' + points[i][1] + ')');
//     }
//     console.dir(points[1][0]);
// }

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, points.length);
}