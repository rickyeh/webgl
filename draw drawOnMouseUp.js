"use strict";

var canvas;
var gl;

var maxNumTriangles = 500;
var maxNumVertices = 3 * maxNumTriangles;
var index = 0;
var isMouseDown = false;

var program;
var vBuffer;
var vPosition;

var numPolygons = 0;
var numIndices = [];
numIndices[0] = 0;
var start = [0];

var colors = [
    vec4(0.0, 0.0, 0.0, 1.0), // black
    vec4(1.0, 0.0, 0.0, 1.0), // red
    vec4(1.0, 1.0, 0.0, 1.0), // yellow
    vec4(0.0, 1.0, 0.0, 1.0), // green
    vec4(0.0, 0.0, 1.0, 1.0), // blue
    vec4(1.0, 0.0, 1.0, 1.0), // magenta
    vec4(0.0, 1.0, 1.0, 1.0) // cyan
];


function init() {
    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    //
    //  Configure WebGL
    //
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.8, 0.8, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //
    // Load shaders and initialize attribute buffers
    //

    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 8 * maxNumVertices, gl.STATIC_DRAW);

    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    var $canvas = $('#gl-canvas');

    $canvas.mousedown(function() {
        console.log('Mouse is pressed down');

        isMouseDown = true;
        draw();
    });

    $canvas.mousemove(function() {
        if (isMouseDown) {
            draw();
        }

    });

    $canvas.mouseup(function() {
        console.log('Mouse is released');
        isMouseDown = false;

        console.log(index);

        numPolygons++;
        numIndices[numPolygons] = 0;
        start[numPolygons] = index;
    });

    render();
}

function draw() {
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);

    var t = vec2(-1 + 2 * event.clientX / canvas.width, -1 + 2 * (canvas.height - event.clientY) / canvas.height);

    console.log(t);

    gl.bufferSubData(gl.ARRAY_BUFFER, 8 * index, flatten(t));
    index++;

    numIndices[numPolygons] ++;

}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    for (var i = 0; i < numPolygons; i++) {
        gl.drawArrays(gl.LINE_STRIP, start[i], numIndices[i]);
    }

    window.requestAnimFrame(render);
}

$(document).ready(function() {
    init();
});