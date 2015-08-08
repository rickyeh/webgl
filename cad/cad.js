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

function Sphere(x, y, z, radius, pointer) {
    Shape.call(this, x, y, z, SPHERE, pointer);
    this.radius = radius;
}

function Cone(x, y, z, radius, height, pointer) {
    Shape.call(this, x, y, z, CONE, pointer);
    this.radius = radius;
    this.height = height;
}

function Cylinder(x, y, z, radius, height, pointer) {
    Shape.call(this, x, y, z, CYLINDER, pointer);
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
    if (r === 0) {
        r = 4;
    }

    var sphereGeometry = new THREE.SphereGeometry(r, 16, 16);
    var sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0xdd0000,
        transparent: true,
        opacity: 0.3
    });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    var sphereEdges = new THREE.EdgesHelper(sphere, 0x00ff00);
    
    sphere.position.x = x;
    sphere.position.y = y;
    sphere.position.z = z;

    scene.add(sphere);
    scene.add(sphereEdges);

    objectsList.push(new Sphere(x, y, z, r, sphere));
    console.log('Sphere created at (' + x + ',' + y + ',' + z + ') with r: ' + r);
    updateObjectsList();
    selectItem(objectsList.length - 1);
}

function createCone(x, y, z, r, h) {
    if (r === 0) {
        r = 4;
    }
    if (h === 0) {
        h = 4;
    }

    var coneGeometry = new THREE.CylinderGeometry(0, r, h, 16, 16);
    var coneMaterial = new THREE.MeshBasicMaterial({
        color: 0xdd00dd,
        transparent: true,
        opacity: 0.3
    });
    var cone = new THREE.Mesh(coneGeometry, coneMaterial);
    var coneEdges = new THREE.EdgesHelper(cone, 0x00ff00);
    
    cone.position.x = x;
    cone.position.y = y;
    cone.position.z = z;

    scene.add(cone);
    scene.add(coneEdges);

    objectsList.push(new Cone(x, y, z, r, h, cone));
    console.log('Cone created at (' + x + ',' + y + ',' + z + ') with r: ' + r + ' h: ' + h);
    updateObjectsList();
    selectItem(objectsList.length - 1);
}

function createCylinder(x, y, z, r, h) {
    if (r === 0) {
        r = 4;
    }
    if (h === 0) {
        h = 4;
    }

    var cylinderGeometry = new THREE.CylinderGeometry(r, r, h, 16, 16);
    var cylinderMaterial = new THREE.MeshBasicMaterial({
        color: 0x00eeee,
        transparent: true,
        opacity: 0.3
    });
    var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    var cylinderEdges = new THREE.EdgesHelper(cylinder, 0x00ff00);
    
    cylinder.position.x = x;
    cylinder.position.y = y;
    cylinder.position.z = z;

    scene.add(cylinder);
    scene.add(cylinderEdges);

    objectsList.push(new Cylinder(x, y, z, r, h, cylinder));
    console.log('Cylinder created at (' + x + ',' + y + ',' + z + ') with r: ' + r + ' h: ' + h);
    updateObjectsList();
    selectItem(objectsList.length - 1);
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
    selectItem(objectsList.length - 1);
}

// Called when new object is created or removed
function updateObjectsList() {
    console.log(objectsList);

    if(objectsList.length === 1 ) {
        initClickHandlers();
    }

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

    updateTextDivs();
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

// Clears the scene of all objects.
function clearScene() {
    while (scene.children.length > 0){
        scene.remove(scene.children[0]);
    }
    objectsList = [];
    updateObjectsList();
}

// Assign click handlers
$(document).ready(function() {
    $('#insertSphere').click(function() {
        createSphere(getRNG(), getRNG(), getRNG(), getRNG());
    });
    $('#insertCone').click(function() {
        createCone(getRNG(), getRNG(), getRNG(), getRNG(), getRNG());
    });
    $('#insertCylinder').click(function() {
        createCylinder(getRNG(), getRNG(), getRNG(), getRNG(), getRNG());
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