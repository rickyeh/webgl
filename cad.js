var SPHERE = 'sphere';
var CONE = 'cone';
var CYLINDER = 'cylinder';
var CUBE = 'cube';

var createShapes = {

};

// Sphere.prototype = new Shape('sphere', center);

//Shape.prototype.toString = function() { return 'Shape( ' + this.x + ' ' + this.y +')' } 

function Shape(x, y, z, type) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.type = type;
}

function Sphere(x, y, z, radius){
    Shape.call(this, x, y, z, SPHERE);
    this.radius = radius;
}

function Cone(x, y, z, radius, height) {
    Shape.call(this. x, y, z, CONE);
    this.radius = radius;
    this.height = height;
}

function Cylinder(x, y, z, radius, height) {
    Shape.call(this. x, y, z, CYLINDER);
    this.radius = radius;
    this.height = height;
}

function Cube(x, y, z, side) {
    Shape.call(this. x, y, z, CUBE);
    this.side = side;
}

Sphere.prototype = new Shape();
Cone.prototype = new Shape();
Cylinder.prototype = new Shape();
Cube.prototype = new Shape();




