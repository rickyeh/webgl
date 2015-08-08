console.log(currentObjectIndex);

function initClickHandlers() {
    // Location click handlers
    $('#xAddLoc').click(function() {
        moveXAdd(currentObjectIndex)
    });
    $('#xSubLoc').click(function() {
        moveXSub(currentObjectIndex)
    });
    $('#yAddLoc').click(function() {
        moveYAdd(currentObjectIndex)
    });
    $('#ySubLoc').click(function() {
        moveYSub(currentObjectIndex)
    });
    $('#zAddLoc').click(function() {
        moveZAdd(currentObjectIndex)
    });
    $('#zSubLoc').click(function() {
        moveZSub(currentObjectIndex)
    });

    // Rotation Click Handlers
    $('#xAddRot').click(function() {
        rotateXAdd(currentObjectIndex)
    });
    $('#xSubRot').click(function() {
        rotateXSub(currentObjectIndex)
    });
    $('#yAddRot').click(function() {
        rotateYAdd(currentObjectIndex)
    });
    $('#ySubRot').click(function() {
        rotateYSub(currentObjectIndex)
    });
    $('#zAddRot').click(function() {
        rotateZAdd(currentObjectIndex)
    });
    $('#zSubRot').click(function() {
        rotateZSub(currentObjectIndex)
    });

    // Scale Click Handlers
    $('#xAddScale').click(function() {
        scaleXAdd(currentObjectIndex)
    });
    $('#xSubScale').click(function() {
        scaleXSub(currentObjectIndex)
    });
    $('#yAddScale').click(function() {
        scaleYAdd(currentObjectIndex)
    });
    $('#ySubScale').click(function() {
        scaleYSub(currentObjectIndex)
    });
    $('#zAddScale').click(function() {
        scaleZAdd(currentObjectIndex)
    });
    $('#zSubScale').click(function() {
        scaleZSub(currentObjectIndex)
    });
}

// Position functions
function moveXSub(i) {
    objectsList[i].pointer.position.x -= 0.1;
    updateTextDivs();
}

function moveXAdd(i) {
    objectsList[i].pointer.position.x += 0.1;
    updateTextDivs();
}

function moveYSub(i) {
    objectsList[i].pointer.position.y -= 0.1;
    updateTextDivs();
}

function moveYAdd(i) {
    objectsList[i].pointer.position.y += 0.1;
    updateTextDivs();
}

function moveZSub(i) {
    objectsList[i].pointer.position.z -= 0.1;
    updateTextDivs();
}

function moveZAdd(i) {
    objectsList[i].pointer.position.z += 0.1;
    updateTextDivs();
}

// Rotation functions
function rotateXSub(i) {
    objectsList[i].pointer.rotation.x -= 0.1;
    updateTextDivs();
}

function rotateXAdd(i) {
    objectsList[i].pointer.rotation.x += 0.1;
    updateTextDivs();
}

function rotateYSub(i) {
    objectsList[i].pointer.rotation.y -= 0.1;
    updateTextDivs();
}

function rotateYAdd(i) {
    objectsList[i].pointer.rotation.y += 0.1;
    updateTextDivs();
}

function rotateZSub(i) {
    objectsList[i].pointer.rotation.z -= 0.1;
    updateTextDivs();
}

function rotateZAdd(i) {
    objectsList[i].pointer.rotation.z += 0.1;
    updateTextDivs();
}

// Scale functions
function scaleXSub(i) {
    objectsList[i].pointer.scale.x -= 0.1;
    updateTextDivs();
}

function scaleXAdd(i) {
    objectsList[i].pointer.scale.x += 0.1;
    updateTextDivs();
}

function scaleYSub(i) {
    objectsList[i].pointer.scale.y -= 0.1;
    updateTextDivs();
}

function scaleYAdd(i) {
    objectsList[i].pointer.scale.y += 0.1;
    updateTextDivs();
}

function scaleZSub(i) {
    objectsList[i].pointer.scale.z -= 0.1;
    updateTextDivs();
}

function scaleZAdd(i) {
    objectsList[i].pointer.scale.z += 0.1;
    updateTextDivs();
}

function updateTextDivs() {
    var i = currentObjectIndex;

    $('#xLocation').html((objectsList[i].pointer.position.x).toFixed(1));
    $('#yLocation').html((objectsList[i].pointer.position.y).toFixed(1));
    $('#zLocation').html((objectsList[i].pointer.position.z).toFixed(1));

    $('#xRotation').html((objectsList[i].pointer.rotation.x).toFixed(1));
    $('#yRotation').html((objectsList[i].pointer.rotation.y).toFixed(1));
    $('#zRotation').html((objectsList[i].pointer.rotation.z).toFixed(1));

    $('#xScale').html((objectsList[i].pointer.scale.x).toFixed(1));
    $('#yScale').html((objectsList[i].pointer.scale.y).toFixed(1));
    $('#zScale').html((objectsList[i].pointer.scale.z).toFixed(1));
}