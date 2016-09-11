function Ghost(speed, mesh) {
    this.mesh = mesh;
    this.speed = speed;
    this.velocity = new THREE.Vector3(this.speed,0,0);
    
    this.getX = function() {return this.mesh.x;}
    this.getZ = function() {return this.mesh.z;}
    this.updatePosition = function(dt) {
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
    }
    this.positionOnMap = function() {
        return getMapPosition(mesh.position);
    }
    
    this.currenPositionOnMap = this.positionOnMap();
}