var PACMAN;
var pacmanRadius = SEGMENT_SIZE/5;

function createPacman() {
	var loader = new THREE.OBJMTLLoader();
    loader.addEventListener('load', function (event) {
        PACMAN = event.content;
        PACMAN.position.x = 250;
        PACMAN.position.y = 0;
        PACMAN.position.z = 350;
        PACMAN.scale.x = 50;
        PACMAN.scale.y = 50;
        PACMAN.scale.z = 50;
        PACMAN.rotation.y = Math.PI;
        PACMAN.add(camera);
        camera.position.z = -3;
        camera.position.y = 1.5;
        camera.lookAt(new THREE.Vector3());
        
        scene.add(PACMAN);
    });
    loader.load('PacmanModel/PacmanHigh.obj', 'PacmanModel/PacmanHigh.mtl', {side: THREE.DoubleSide});
}