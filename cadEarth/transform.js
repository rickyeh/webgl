function setupObjectClickHandlers() {
    var timerID;

    $(document).mouseup(function() {
        clearInterval(timerID);
        return false;
    });

    // Location click handlers
    $('#xAddLoc').mousedown(function() {
        timerID = setInterval(function() {
            moveXAdd(currentObjectIndex);
        }, 50);
    });

    $('#xSubLoc').mousedown(function() {
        timerID = setInterval(function() {
            moveXSub(currentObjectIndex);
        }, 50);
    });
    $('#yAddLoc').mousedown(function() {
        timerID = setInterval(function() {
            moveYAdd(currentObjectIndex);
        }, 50);
    });
    $('#ySubLoc').mousedown(function() {
        timerID = setInterval(function() {
            moveYSub(currentObjectIndex);
        }, 50);
    });
    $('#zAddLoc').mousedown(function() {
        timerID = setInterval(function() {
            moveZAdd(currentObjectIndex);
        }, 50);
    });
    $('#zSubLoc').mousedown(function() {
        timerID = setInterval(function() {
            moveZSub(currentObjectIndex);
        }, 50);
    });

    // Rotation Click Handlers
    $('#xAddRot').mousedown(function() {
        timerID = setInterval(function() {
            rotateXAdd(currentObjectIndex);
        }, 50);
    });
    $('#xSubRot').mousedown(function() {
        timerID = setInterval(function() {
            rotateXSub(currentObjectIndex);
        }, 50);
    });
    $('#yAddRot').mousedown(function() {
        timerID = setInterval(function() {
            rotateYAdd(currentObjectIndex);
        }, 50);
    });
    $('#ySubRot').mousedown(function() {
        timerID = setInterval(function() {
            rotateYSub(currentObjectIndex);
        }, 50);
    });
    $('#zAddRot').mousedown(function() {
        timerID = setInterval(function() {
            rotateZAdd(currentObjectIndex);
        }, 50);
    });
    $('#zSubRot').mousedown(function() {
        timerID = setInterval(function() {
            rotateZSub(currentObjectIndex);
        }, 50);
    });

    // Scale Click Handlers
    $('#xAddScale').mousedown(function() {
        timerID = setInterval(function() {
            scaleXAdd(currentObjectIndex);
        }, 50);
    });
    $('#xSubScale').mousedown(function() {
        timerID = setInterval(function() {
            scaleXSub(currentObjectIndex);
        }, 50);
    });
    $('#yAddScale').mousedown(function() {
        timerID = setInterval(function() {
            scaleYAdd(currentObjectIndex);
        }, 50);
    });
    $('#ySubScale').mousedown(function() {
        timerID = setInterval(function() {
            scaleYSub(currentObjectIndex);
        }, 50);
    });
    $('#zAddScale').mousedown(function() {
        timerID = setInterval(function() {
            scaleZAdd(currentObjectIndex);
        }, 50);
    });
    $('#zSubScale').mousedown(function() {
        timerID = setInterval(function() {
            scaleZSub(currentObjectIndex);
        }, 50);
    });
}

// Position functions
function moveXSub(i, speed) {
    if(!speed){
        speed = 1;
    }

    objectsList[i].mesh.position.x -= 0.2 * speed;
    updateTextDivs();
}

function moveXAdd(i, speed) {
    if(!speed){
        speed = 1;
    }

    objectsList[i].mesh.position.x += 0.2 * speed;
    updateTextDivs();
}

function moveYSub(i, speed) {
    if(!speed){
        speed = 1;
    }
    objectsList[i].mesh.position.y -= 0.2 * speed;
    updateTextDivs();
}

function moveYAdd(i, speed) {
    if(!speed){
        speed = 1;
    }

    objectsList[i].mesh.position.y += 0.2 * speed;
    updateTextDivs();
}

function moveZSub(i) {
    objectsList[i].mesh.position.z -= 0.2;
    updateTextDivs();
}

function moveZAdd(i) {
    objectsList[i].mesh.position.z += 0.2;
    updateTextDivs();
}

// Rotation functions
function rotateXSub(i) {
    objectsList[i].mesh.rotation.x -= 0.1;
    updateTextDivs();
}

function rotateXAdd(i) {
    objectsList[i].mesh.rotation.x += 0.1;
    updateTextDivs();
}

function rotateYSub(i) {
    objectsList[i].mesh.rotation.y -= 0.1;
    updateTextDivs();
}

function rotateYAdd(i) {
    objectsList[i].mesh.rotation.y += 0.1;
    updateTextDivs();
}

function rotateZSub(i) {
    objectsList[i].mesh.rotation.z -= 0.1;
    updateTextDivs();
}

function rotateZAdd(i) {
    objectsList[i].mesh.rotation.z += 0.1;
    updateTextDivs();
}

// Scale functions
function scaleXSub(i) {
    objectsList[i].mesh.scale.x -= 0.1;
    updateTextDivs();
}

function scaleXAdd(i) {
    objectsList[i].mesh.scale.x += 0.1;
    updateTextDivs();
}

function scaleYSub(i) {
    objectsList[i].mesh.scale.y -= 0.1;
    updateTextDivs();
}

function scaleYAdd(i) {
    objectsList[i].mesh.scale.y += 0.1;
    updateTextDivs();
}

function scaleZSub(i) {
    objectsList[i].mesh.scale.z -= 0.1;
    updateTextDivs();
}

function scaleZAdd(i) {
    objectsList[i].mesh.scale.z += 0.1;
    updateTextDivs();
}

function updateTextDivs() {
    var mesh = objectsList[currentObjectIndex].mesh;

    $('#xLocation').html((mesh.position.x).toFixed(1));
    $('#yLocation').html((mesh.position.y).toFixed(1));
    $('#zLocation').html((mesh.position.z).toFixed(1));

    $('#xRotation').html((mesh.rotation.x).toFixed(1));
    $('#yRotation').html((mesh.rotation.y).toFixed(1));
    $('#zRotation').html((mesh.rotation.z).toFixed(1));

    $('#xScale').html((mesh.scale.x).toFixed(1));
    $('#yScale').html((mesh.scale.y).toFixed(1));
    $('#zScale').html((mesh.scale.z).toFixed(1));

    if (mesh.material) {
        $('#colorPicker').spectrum('set', '#' + mesh.material.color.getHexString());
    } else {
        $('#colorPicker').spectrum('set', '#' + mesh.color.getHexString());
    }
}