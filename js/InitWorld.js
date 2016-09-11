var map = [[1,1,1,1,1,1,1,1,1,1],
	    [1,0,0,0,0,0,0,0,0,1],
	    [1,0,0,0,0,0,0,0,0,1],
	    [1,0,0,2,0,1,0,0,0,1],
	    [1,0,2,0,0,1,0,2,0,1],
	    [1,0,2,2,2,0,0,2,0,1],
	    [1,0,0,2,0,0,0,0,0,1],
	    [1,0,0,0,0,0,0,0,0,1],
	    [1,0,0,0,0,0,0,0,0,1],
	    [1,1,1,1,1,1,1,1,1,1]];
	   
var MAP_SIZE = map.length;
var SEGMENT_SIZE = 100;
var GHOST_1, GHOST_2;
var brickWall, stone, grass;
	    
function initWorld(scene) {
  for (var i=0; i<MAP_SIZE; i++) {
    for (var j=0; j<MAP_SIZE; j++) {
        if (map[i][j] == 1 || map[i][j] == 2) {
            var geometry = new THREE.BoxGeometry(SEGMENT_SIZE, SEGMENT_SIZE, SEGMENT_SIZE);
            var image;
            if (map[i][j] == 1) image = "brick-wall.jpg";
            else                image = "stone.jpg";
            
            var cube = createMesh(geometry, image, 1);
            cube.position.x = SEGMENT_SIZE*(i+0.5);
            cube.position.y = SEGMENT_SIZE/2;
            cube.position.z = SEGMENT_SIZE*(j+0.5);
            scene.add(cube);
        } else if (map[i][j] == 0) {
            var geometry = new THREE.PlaneGeometry(SEGMENT_SIZE, SEGMENT_SIZE);
            var plane = createMesh(geometry, "ground-grass.jpg", 1);
            plane.position.x = SEGMENT_SIZE*(i+0.5);
            plane.position.y = 0;
            plane.position.z = SEGMENT_SIZE*(j+0.5);
            plane.rotation.x = - Math.PI / 2;
            scene.add(plane);
        }
    }
  }  
    
  createPacman(scene);
  GHOST_1 = createGhost(0.05);
  GHOST_1.mesh.position.x = 250;
  GHOST_1.mesh.position.y = 0;
  GHOST_1.mesh.position.z = 135;
    
  GHOST_2 = createGhost(0.08);
  GHOST_2.mesh.position.x = 850;
  GHOST_2.mesh.position.y = 0;
  GHOST_2.mesh.position.z = 135;
}

function createGhost(speed) {
    var geom = new THREE.BoxGeometry(SEGMENT_SIZE/5, SEGMENT_SIZE, SEGMENT_SIZE/5);
    var mat = new THREE.MeshPhongMaterial();
    var mesh = new THREE.Mesh(geom, mat);
    
    scene.add(mesh);
    return new Ghost(speed, mesh);
}

function createMesh(geom, imageFile, scaleFactor) {
    geom.computeVertexNormals();   
    var texture;
    
    if (imageFile == "brick-wall.jpg") {
        if (!brickWall) brickWall = THREE.ImageUtils.loadTexture("textures/" + imageFile);
        texture = brickWall;
    } else if (imageFile == "stone.jpg") {
        if (!stone) stone = THREE.ImageUtils.loadTexture("textures/" + imageFile);
        texture = stone;
    } else if (imageFile == "ground-grass.jpg") {
        if (!grass) grass = THREE.ImageUtils.loadTexture("textures/" + imageFile);
        texture = grass;
    } else {
        texture = THREE.ImageUtils.loadTexture("textures/" + imageFile);
    }
    
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(scaleFactor, scaleFactor);    
    var mat = new THREE.MeshPhongMaterial();
    mat.map = texture;                
    return new THREE.Mesh(geom, mat);
}