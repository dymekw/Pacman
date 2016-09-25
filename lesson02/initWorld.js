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
	 var geometry = new THREE.BoxGeometry(SEGMENT_SIZE, SEGMENT_SIZE, SEGMENT_SIZE);
	 var mesh = createMesh(geometry, "stone.jpg", 1);
	 mesh.position.z = -200;

	 scene.add(mesh);
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