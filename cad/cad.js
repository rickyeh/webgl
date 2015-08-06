// CONSTANTS
var SPHERE = 'sphere';
var CONE = 'cone';
var CYLINDER = 'cylinder';
var CUBE = 'cube';

// Main array to store the created objects
var objectsList = [];
var currentObjectIndex = 0;


// Declare objects
function Shape(x, y, z, type) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.type = type;
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

function Cube(x, y, z, side) {
    Shape.call(this, x, y, z, CUBE);
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
    objectsList.push(new Cube(x, y, z, s));
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
        createCube(0, 0, 0, 5);
    });
});

$(function() {
    $('#selectable').selectable();

    // THREE JS RENDERING
    var canvas = $('#canvas');

    // Set up Scene, Camera, and Renderer
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, canvas.width() / canvas.height(), 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(canvas.width(), canvas.height());

    // Attach renderer to canvas
    canvas.append(renderer.domElement);

    // Test Object 1
    var geometry = new THREE.BoxGeometry(5, 5, 5);
    var material = new THREE.MeshBasicMaterial({
        color: 0xff0000
    });
    material.transparent = true;
    material.opacity = 0.3;

    var object = new THREE.Mesh(geometry, material);
    var edges = new THREE.EdgesHelper(object, 0x00ff00);

    scene.add(object);
    scene.add(edges);

    // Test Object 2
    var geometry2 = new THREE.BoxGeometry(6, 6, 6);
    var material2 = new THREE.MeshBasicMaterial({
        color: 0x0000ee
    });
    material2.transparent = true;
    material2.opacity = 0.3;

    var object2 = new THREE.Mesh(geometry2, material2);
    var edges2 = new THREE.EdgesHelper(object2, 0x00ff00);

    object2.position.x = 5;
    object2.position.y = 5;
    object2.position.z = 5;

    scene.add(object2);
    scene.add(edges2);

    function render() {
        requestAnimationFrame(render);

        object.rotation.x += 0.1;
        object.rotation.y += 0.01;

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