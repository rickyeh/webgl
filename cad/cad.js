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
});
// Debugging

var a = new Sphere(0, 0, 0, 10);
var b = new Cone(0, 0, 0, 5, 3);
var c = new Cylinder(0, 0, 0, 6, 8);
var d = new Cube(0, 0, 0, 20);

console.log(a);
console.log(b);
console.log(c);
console.log(d);