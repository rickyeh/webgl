//Shape.prototype.toString = function() { return 'Shape( ' + this.x + ' ' + this.y +')' } 


// CONSTANTS
var SPHERE = 'sphere';
var CONE = 'cone';
var CYLINDER = 'cylinder';
var CUBE = 'cube';

// Main array to store the created objects
var objectsList = [];


// Declare objects
function Shape(x, y, z, type) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.type = type;
}

Shape.prototype.move = function(x, y, z) {
    this.x += x;
    this.y += y;
    this.z += z;
};

Shape.prototype.toString = function() {
    return 'Shape(' + this.x + ' ' + this.y + ' ' + this.z + ')';
};

function Sphere(x, y, z, radius){
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

var a = new Sphere(0 , 0, 0, 10);
var b = new Cone(0,0,0,5,3);
var c = new Cylinder(0,0,0, 6, 8);
var d = new Cube (0,0,0, 20);

console.log(a);
console.log(b);
console.log(c);
console.log(d);


