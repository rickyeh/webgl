"use strict";

var canvas;
var gl;

var points = [];

var NumTimesToSubdivide = 4;

var degreesToRotate = 180;
var radiansToRotate = (degreesToRotate * Math.PI) / 180;




function init() {
    points = [];

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
    var d = Math.sqrt((vertex[0] * vertex[0]) + (vertex[1] * vertex[1]));

    var nx = 0;
    var ny = 0;

    nx = vertex[0] * Math.cos(d * radiansToRotate) - vertex[1] * Math.sin(d * radiansToRotate);
    ny = vertex[0] * Math.sin(d * radiansToRotate) + vertex[1] * Math.cos(d * radiansToRotate);

    return [nx, ny];
}

function redraw() {
    NumTimesToSubdivide = $('#input').html();
    degreesToRotate = $('#input2').html();
    radiansToRotate = (degreesToRotate * Math.PI) / 180;

    console.log('Divisions : ' + NumTimesToSubdivide);
    console.log('Degrees : ' + degreesToRotate);
    console.log('Radians : ' + radiansToRotate);

    init();
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

$(document).ready(function() {
    init();
});