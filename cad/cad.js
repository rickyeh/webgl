// CONSTANTS
var SPHERE = 'sphere';
var CONE = 'cone';
var CYLINDER = 'cylinder';
var CUBE = 'cube';
var POINT = 'point';
var AMBIENT = 'ambient';
var WIREFRAME_COLOR = '#99ff99'; 

// Main array to store the created objects
var objectsList = [];
var currentObjectIndex = 0;

var scene;
var camera;
var renderer;

// Declare objects
function Shape(x, y, z, type, mesh, edges) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.type = type;
    this.mesh = mesh;
    this.edges = edges;
}

Shape.prototype.moveTo = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
};

Shape.prototype.toString = function() {
    return 'Shape(' + this.x + ' ' + this.y + ' ' + this.z + ')';
};

function Light(x, y, z, type, mesh) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.type = type;
    this.mesh = mesh;
}

Light.prototype.moveTo = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

function Sphere(x, y, z, radius, mesh, edges) {
    Shape.call(this, x, y, z, SPHERE, mesh, edges);
    this.radius = radius;
}

function Cone(x, y, z, radius, height, mesh, edges) {
    Shape.call(this, x, y, z, CONE, mesh, edges);
    this.radius = radius;
    this.height = height;
}

function Cylinder(x, y, z, radius, height, mesh, edges) {
    Shape.call(this, x, y, z, CYLINDER, mesh, edges);
    this.radius = radius;
    this.height = height;
}

function Cube(x, y, z, side, mesh, edges) {
    Shape.call(this, x, y, z, CUBE, mesh, edges);
    this.side = side;
}

// Set up prototype chains
Sphere.prototype = new Shape();
Cone.prototype = new Shape();
Cylinder.prototype = new Shape();
Cube.prototype = new Shape();

// Create object functions.  Will be called when button is clicked.
function createSphere(x, y, z, r) {
    if (r < 2) {
        r = 5;
    }

    var sphereGeometry = new THREE.SphereGeometry(r, 16, 16);
    var sphereMaterial = new THREE.MeshPhongMaterial({
        ambient: 0x555555,
        color: getRandomColor(),
        specular: 0xffffff,
        shininess: random(1, 1000),
        shading: THREE.SmoothShading
    });

    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    
    sphere.position.x = x;
    sphere.position.y = y;
    sphere.position.z = z;

    scene.add(sphere);

    objectsList.push(new Sphere(x, y, z, r, sphere));
    console.log('Sphere created at (' + x + ',' + y + ',' + z + ') with r: ' + r);
    updateObjectsList();
    selectItem(objectsList.length - 1);
}

function createCone(x, y, z, r, h) {
    if (r < 3 ) {
        r = 5;
    }
    if (h < 3) {
        h = 5;
    }

    var coneGeometry = new THREE.CylinderGeometry(0, r, h, 16, 16);
    var coneMaterial = new THREE.MeshPhongMaterial({
        ambient: 0x555555,
        color: getRandomColor(),
        specular: 0xffffff,
        shininess: random(1, 1000),
        shading: THREE.SmoothShading
    });
    var cone = new THREE.Mesh(coneGeometry, coneMaterial);
    
    cone.position.x = x;
    cone.position.y = y;
    cone.position.z = z;

    scene.add(cone);

    objectsList.push(new Cone(x, y, z, r, h, cone));
    console.log('Cone created at (' + x + ',' + y + ',' + z + ') with r: ' + r + ' h: ' + h);
    updateObjectsList();
    selectItem(objectsList.length - 1);
}

function createCylinder(x, y, z, r, h) {
    if (r < 3) {
        r = 5;
    }
    if (h < 3) {
        h = 5;
    }

    var cylinderGeometry = new THREE.CylinderGeometry(r, r, h, 16, 16);
    var cylinderMaterial = new THREE.MeshPhongMaterial({
        ambient: 0x555555,
        color: getRandomColor(),
        specular: 0xffffff,
        shininess: random(1, 1000),
        shading: THREE.SmoothShading
    });
    var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    
    cylinder.position.x = x;
    cylinder.position.y = y;
    cylinder.position.z = z;

    scene.add(cylinder);

    objectsList.push(new Cylinder(x, y, z, r, h, cylinder));
    console.log('Cylinder created at (' + x + ',' + y + ',' + z + ') with r: ' + r + ' h: ' + h);
    updateObjectsList();
    selectItem(objectsList.length - 1);
}

function createCube(x, y, z, s) {
    if (s < 3) {
        s = 5;
    }

    var cubeGeometry = new THREE.BoxGeometry(s, s, s);
    var cubeMaterial = new THREE.MeshPhongMaterial({
        ambient: 0x555555,
        color: getRandomColor(),
        specular: 0xffffff,
        shininess: random(1, 1000),
        shading: THREE.SmoothShading
    });

    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;

    scene.add(cube);

    objectsList.push(new Cube(x, y, z, s, cube));
    console.log('Cube created at (' + x + ',' + y + ',' + z + ') with s: ' + s);
    updateObjectsList();
    selectItem(objectsList.length - 1);
}

function createAmbient() {
    console.log('ambient light created');
    var light = new THREE.AmbientLight( 0x222222 );
    scene.add( light );

}

function createStaticLight(x, y, z) {

    if (!x) {
        x = random(-20, 20);
    }
    if (!y) {
        y = random(-20, 20);
    }

    z = 30;

    var staticLight = new THREE.PointLight(0x333333, 1, 0);
    staticLight.position.set(x,y,z);
    scene.add(staticLight);

    objectsList.push(new Light(x, y, z, POINT, staticLight));
    updateObjectsList();
    updateMeshMaterials();
    selectItem(objectsList.length - 1);
    console.log('Light created at (' + x + ',' + y + ',' + z + ')');
}

function createMovingLight() {
    createStaticLight(15, 15);

    var movingRight = false;
    var movingUp = false;
    var lightIndex = currentObjectIndex;
    var lightPosition = objectsList[currentObjectIndex].mesh.position;

    function render() {
        // Set bounds to change direction
        if (lightPosition.x > 30 && movingRight) {
            movingRight = false;
        }
        if (lightPosition.x < -30 && !movingRight) {
            movingRight = true;
        }

        if (lightPosition.y > 30 && movingUp) {
            movingUp = false;
        }
        if (lightPosition.y < -30 && !movingUp) {
            movingUp = true;
        }



        // Move the lights
        if (movingRight) {
            moveXAdd(lightIndex, 2);
        } else {
            moveXSub(lightIndex, 2);
        }

        if (movingUp) {
            moveYAdd(lightIndex);
        } else {
            moveYSub(lightIndex);
        }


        requestAnimationFrame(render);
    }
    render();

}

// Functino to update all mesh materials for light adding purposes
function updateMeshMaterials() {
    for (var i = 0; i < objectsList.length ; i++) {
        if (objectsList[i].mesh.material) {
            objectsList[i].mesh.material.needsUpdate = true;
        }
    }
}

// Called when new object is created or removed
function updateObjectsList() {
    console.log(objectsList);

    if (objectsList.length === 1 ) {
        setupObjectClickHandlers();
    }

    // Clear list on every update
    $('#selectable').html('');

    // Anonymous function to fix closure issue
    function captureIndex(i) {
        var tempFunc = function() {
            selectItem(i);
        };

        return tempFunc;
    }

    function captureDeleteIndex(i) {
        var tempFunc = function() {
            deleteItem(i);
        };
        return tempFunc;
    }

    // Loop through array elements and add items on list and click handlers
    for (var i = 0; i < objectsList.length; i++) {
        $('#selectable').append('<li id=listItem'+ i +' class=\'ui-widget-content\'>'+
        i + '. ' + objectsList[i].type+'</li>');

        $('#listItem'+i).click(captureIndex(i));

        $('#listItem'+i).append('<div id="deleteItem'+ i +'" class="deleteButton">&#x00D7</div>');
        $('#deleteItem'+i).click(captureDeleteIndex(i));
    }

    // Highlights the most recently created item
    $('#listItem'+(i-1)).addClass('ui-selected');

    $('#objectsList').scrollTop($('#selectable')[0].scrollHeight);
}

// Called when new item is selected.  Will update all values
function selectItem(i) {
    console.log('Select item is : ' + i);
    currentObjectIndex = i;

    updateTextDivs();
}

// Called to delete a specific object on the objectsList
function deleteItem(i) {
    console.log('Deleting Item : ' + i);
    scene.remove(objectsList[i].mesh);

    objectsList.splice(i, 1);
    updateObjectsList();
}

// Returs random number between -10 an 10
function getRNG() {
    var num = Math.round(Math.random()*10);

    if(Math.round(Math.random()*2) === 1) {
        return num;
    } else {
        return -num;
    }
}

// Returns random number between parameters specified, inclusive
function random(min, max) {
    return min + Math.round(Math.random() * (max - min));
}

// Clears the scene of all objects.
function clearScene() {
    while (scene.children.length > 0){
        scene.remove(scene.children[0]);
    }
    objectsList = [];
    updateObjectsList();
}

function getRandomColor() {
    var r = 28 + Math.floor(Math.random() * 228); // 128-255
    var g = 28 + Math.floor(Math.random() * 228);
    var b = 28 + Math.floor(Math.random() * 228);

    r = r << 16;
    g = g << 8;

    var color = r|g|b;
    return color;
}

function setupShapeClickHandlers() {

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
    $('#insertAmbient').click(function() {
        createAmbient();
    });
    $('#insertStatic').click(function() {
        createStaticLight();
    });
    $('#insertMoving').click(function() {
        createMovingLight();
    });
    $('#clearAll').click(function(){
        var result = confirm('Delete all objects?');
        if (result) {
            clearScene();
        }
    });
}


$(function() {
    setupShapeClickHandlers();

    // $('#selectable').selectable();

    $('#colorPicker').spectrum({
        color: '#f00',
        cancelText: '',
        chooseText: 'Close',
        move: function(color) { // Function that is called when color spectrum is moved
            var newColor = color.toHexString().replace('#', '0x');

            if (objectsList[currentObjectIndex].mesh.material) { // Check if it is a shape or light, then set color
                objectsList[currentObjectIndex].mesh.material.color.setHex(newColor);
            } else {
                objectsList[currentObjectIndex].mesh.color.setHex(newColor);

            }
        }
    });


    // THREE JS RENDERING
    var canvas = $('#canvas');

    // Set up Scene, Camera, and Renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, canvas.width() / canvas.height(), 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(canvas.width(), canvas.height());

    // createCube(0, 0, 0, 15);

    createStaticLight(15, 15);
    createAmbient();
    createAmbient();


    // Attach renderer to canvas
    canvas.append(renderer.domElement);

    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);

    }
    render();

    camera.position.z = 25;
});