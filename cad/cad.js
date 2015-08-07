// CONSTANTS
var SPHERE = 'sphere';
var CONE = 'cone';
var CYLINDER = 'cylinder';
var CUBE = 'cube';

// Main array to store the created objects
var objectsList = [];
var currentObjectIndex = 0;

var scene;
var camera;
var renderer;


// Declare objects
function Shape(x, y, z, type, pointer) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.type = type;
    this.pointer = pointer;
}

Shape.prototype.moveTo = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
};

Shape.prototype.toString = function() {
    return 'Shape(' + this.x + ' ' + this.y + ' ' + this.z + ')';
};

function Sphere(x, y, z, radius) {
    Shape.call(this, x, y, z, SPHERE);
    this.radius = radius;
}

function Cone(x, y, z, radius, height) {
    Shape.call(this, x, y, z, CONE);
    this.radius = radius;
    this.height = height;
}

function Cylinder(x, y, z, radius, height) {
    Shape.call(this, x, y, z, CYLINDER);
    this.radius = radius;
    this.height = height;
}

function Cube(x, y, z, side, pointer) {
    Shape.call(this, x, y, z, CUBE, pointer);
    this.side = side;
}

// Set up prototype chains
Sphere.prototype = new Shape();
Cone.prototype = new Shape();
Cylinder.prototype = new Shape();
Cube.prototype = new Shape();

// Create object functions.  Will be called when button is clicked.
function createSphere(x, y, z, r) {
    objectsList.push(new Sphere(x, y, z, r));
    console.log('Sphere created at (' + x + ',' + y + ',' + z + ') with r: ' + r);
    updateObjectsList();
}

function createCone(x, y, z, r, h) {
    objectsList.push(new Cone(x, y, z, r, h));
    console.log('Cone created at (' + x + ',' + y + ',' + z + ') with r: ' + r + ' h: ' + h);
    updateObjectsList();
}

function createCylinder(x, y, z, r, h) {
    objectsList.push(new Cylinder(x, y, z, r, h));
    console.log('Cylinder created at (' + x + ',' + y + ',' + z + ') with r: ' + r + ' h: ' + h);
    updateObjectsList();
}

function createCube(x, y, z, s) {
    if (s === 0) {
        s = 4;
    }

    var cubeGeometry = new THREE.BoxGeometry(s, s, s);
    var cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0x0000ee,
        transparent: true,
        opacity: 0.3
    });

    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    var cubeEdges = new THREE.EdgesHelper(cube, 0x00ff00);

    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;

    scene.add(cube);
    scene.add(cubeEdges);

    objectsList.push(new Cube(x, y, z, s, cube));
    console.log('Cube created at (' + x + ',' + y + ',' + z + ') with s: ' + s);
    updateObjectsList();
}

// Called when new object is created or removed
function updateObjectsList() {
    console.log(objectsList);

    // Clear list on every update
    $('#selectable').html('');

    // Anonymous function to fix closure issue
    function captureIndex(i){
        var tempFunc = function(){
            selectItem(i);
        };

        return tempFunc;
    }

    // Loop through array elements and add items on list and click handlers
    for (var i = 0; i < objectsList.length; i++) {
        $('#selectable').append('<li id=listItem'+i+' class=\'ui-widget-content\'>'+
        i + '. ' + objectsList[i].type+'</li>');

        $('#listItem'+i).click(captureIndex(i));
    }
}

// Called when new item is selected.  Will update all values
function selectItem(i) {
    console.log('Select item is : ' + i);
    currentObjectIndex = i;

    $('#xLocation').html(objectsList[i].x);
    $('#yLocation').html(objectsList[i].y);
    $('#zLocation').html(objectsList[i].z);
}

// Returs random number between -8 an 8
function getRNG() {
    var num = Math.round(Math.random()*8);

    if(Math.round(Math.random()*2) === 1) {
        return num;
    } else {
        return -num;
    }
}

// Re draws the entire scene
function redraw() {    
    for (var i = 0; i < objectsList.length; i++ ) {
        // console.log(i);
        switch (objectsList[i].type) {
            case 'cube':
                // console.log('creating cube');
                drawCube(objectsList[i].x, objectsList[i].y, objectsList[i].z, objectsList[i].side);
                break;
            default:
                break;
        }
    }
}

// Clears the scene of all objects.
function clearScene() {
    while (scene.children.length > 0){
        scene.remove(scene.children[0]);
    }
    objectsList = [];
}

// Assign click handlers
$(document).ready(function() {
    $('#insertSphere').click(function() {
        createSphere(0, 0, 0, 5);
    });
    $('#insertCone').click(function() {
        createCone(0, 0, 0, 5, 5);
    });
    $('#insertCylinder').click(function() {
        createCylinder(0, 0, 0, 5, 5);
    });
    $('#insertCube').click(function() {
        createCube(getRNG(), getRNG(), getRNG(), getRNG());
    });
});

$(function() {
    $('#selectable').selectable();

    // THREE JS RENDERING
    var canvas = $('#canvas');

    // Set up Scene, Camera, and Renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, canvas.width() / canvas.height(), 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(canvas.width(), canvas.height());

    // Attach renderer to canvas
    canvas.append(renderer.domElement);

    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);

    }
    render();

    camera.position.z = 20;
});

// Debugging

// var a = new Sphere(0, 0, 0, 10);
// var b = new Cone(0, 0, 0, 5, 3);
// var c = new Cylinder(0, 0, 0, 6, 8);
// var d = new Cube(0, 0, 0, 20);

// console.log(a);
// console.log(b);
// console.log(c);
// console.log(d);