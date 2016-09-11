var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var cameraRotationY = 0;

var velocity = new THREE.Vector3();

var onMouseMove = function ( event ) {
    cameraRotationY = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
};

var onKeyDown = function ( event ) {

		switch ( event.keyCode ) {

			case 38: // up
			case 87: // w
				moveForward = true;
				break;

			case 37: // left
			case 65: // a
				moveLeft = true;
                break;

			case 40: // down
			case 83: // s
				moveBackward = true;
				break;

			case 39: // right
			case 68: // d
				moveRight = true;
				break;
}
}

var onKeyUp = function ( event ) {

		switch( event.keyCode ) {

			case 38: // up
			case 87: // w
				moveForward = false;
				break;
			case 37: // left
			case 65: // a
				moveLeft = false;
				break;

			case 40: // down
			case 83: // s
				moveBackward = false;
				break;

			case 39: // right
			case 68: // d
				moveRight = false;
				break;

		}

	};

function updateControls( delta ){
		delta *= 0.5;
        
        //gently stop
		velocity.x *= 0.7;
		velocity.z *= 0.7;

		if (moveForward)    velocity.z += 0.1 * delta;
		if (moveBackward)   velocity.z -= 0.1 * delta;
		if (moveLeft)       velocity.x += 0.1 * delta;
		if (moveRight)      velocity.x -= 0.1 * delta;

		this.moveCamera();
	};
    
function moveCamera() {
        PACMAN.translateX(velocity.x);
        PACMAN.translateZ(velocity.z);
    
        if (isInObstacle(PACMAN, pacmanRadius)) {
            PACMAN.translateX(-velocity.x);
            PACMAN.translateZ(-velocity.z);
            velocity.x = 0;
            velocity.z = 0;
        }
        
        PACMAN.rotateY(-cameraRotationY/200);
        cameraRotationY = 0;
}