function Ghost(speed, mesh) {
    this.mesh = mesh;
    this.speed = speed;
    this.velocity = new THREE.Vector3(this.speed,0,0);
    this.model;
    
    this.getX = function() {return this.mesh.x;}
    this.getZ = function() {return this.mesh.z;}
    this.setMesh = function (mesh) {
        mesh.position.x = this.mesh.position.x;
        mesh.position.y = this.mesh.position.y;
        mesh.position.z = this.mesh.position.z;
        this.mesh = mesh.clone();
        scene.add(this.mesh);
    }
    this.updatePosition = function(dt) {
        dt*=0.99;
        this.mesh.position.x += dt*this.velocity.x;
        this.mesh.position.y += dt*this.velocity.y;
        this.mesh.position.z += dt*this.velocity.z;
        
        this.currenPositionOnMap = this.positionOnMap();
        
        var centerOfSegment = {x:(this.currenPositionOnMap.x+0.5)*SEGMENT_SIZE, z:(this.currenPositionOnMap.z+0.5)*SEGMENT_SIZE};
        var mapPosOfPacman = getMapPosition(PACMAN.position);
        
        if (this.currenPositionOnMap.x == mapPosOfPacman.x && this.currenPositionOnMap.z == mapPosOfPacman.z) {
            var newVelocity = new THREE.Vector3(PACMAN.position.x-this.mesh.position.x, 0, PACMAN.position.z-this.mesh.position.z);
            newVelocity.multiplyScalar(this.speed/newVelocity.length());
            this.velocity = newVelocity;
            this.hasToChangeDirection = false;
        } 
        else {
            
            var vertex = getNextVertex(this.currenPositionOnMap, mapPosOfPacman);
            var centerOfSegmentNext = {x:(vertex.x+0.5)*SEGMENT_SIZE, z:(vertex.z+0.5)*SEGMENT_SIZE}

            var newVelocity = new THREE.Vector3(centerOfSegmentNext.x-this.mesh.position.x, 0, centerOfSegmentNext.z-this.mesh.position.z);
            newVelocity.multiplyScalar(this.speed/newVelocity.length());
            this.velocity = newVelocity;
            this.hasToChangeDirection = false;
        }

        var angle = Math.acos((new THREE.Vector3(0,0,1).dot(this.velocity))/(this.velocity.length()));
        this.mesh.rotation.y = angle;
    }
    this.positionOnMap = function() {
        return getMapPosition(this.mesh.position);
    }
    
    this.currenPositionOnMap = this.positionOnMap();

    this.loadModel = function () {
	    var loader = new THREE.OBJMTLLoader();
	    loader.addEventListener('load', function (event) {
		    mesh = event.content;
		    mesh.scale.x = 0.4;
		    mesh.scale.y = 0.4;
		    mesh.scale.z = 0.4;

            GHOST_1.setMesh(mesh);
            GHOST_2.setMesh(mesh);
	    });
	    loader.load('GhostModel/Ghostobj.obj', 'GhostModel/Ghostobj.mtl', {side: THREE.DoubleSide});
    }
}
