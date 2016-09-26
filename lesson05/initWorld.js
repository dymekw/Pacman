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
var brickWall, stone, grass;

function initWorld(scene) {
	var light = new THREE.AmbientLight(0xffffff);
	scene.add(light);

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

  	createPacman();
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
    var mat = new THREE.MeshBasicMaterial();
    mat.map = texture;                
    return new THREE.Mesh(geom, mat);
}