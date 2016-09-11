function isInObstacle(PACMAN, radius) {
    var position = getMapPosition(PACMAN.position);
    
    for (var i=-1; i<=1; i++) {
        for (var j=-1; j<=1; j++) {
            if (position.x+i >=0 && position.x+i < MAP_SIZE && position.z+i >= 0 && position.z+i < MAP_SIZE) {
                if (map[position.x+i][position.z+j] > 0) {

                    if (PACMAN.position.x >= (position.x+i)*SEGMENT_SIZE - radius &&
                        PACMAN.position.x <= (position.x+i+1)*SEGMENT_SIZE + radius &&
                        PACMAN.position.z >= (position.z+j)*SEGMENT_SIZE - radius &&
                        PACMAN.position.z <= (position.z+j+1)*SEGMENT_SIZE + radius)
                        return true;
                }
            }
        }
    }
    
    return false;
}

function getMapPosition(coords) {    
    return {x: Math.floor(coords.x/SEGMENT_SIZE), z: Math.floor(coords.z/SEGMENT_SIZE)};
}