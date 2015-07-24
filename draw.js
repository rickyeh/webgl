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
            console.log('Drawing!!');
            draw();
        }

    });

    $canvas.mouseup(function() {
        console.log('Mouse is released');
        isMouseDown = false;
    });

    render();
}

function draw() {
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);

    var t = vec2(-1 + 2 * event.clientX / canvas.width, -1 + 2 * (canvas.height - event.clientY) / canvas.height);

    console.log(t);
    console.log("(" + event.clientX + ", " + event.clientY + ")");

    gl.bufferSubData(gl.ARRAY_BUFFER, 8 * index, flatten(t));
    index++;
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.LINE_STRIP, 0, index);

    window.requestAnimFrame(render);
}

$(document).ready(function() {
    init();
});