var V;

function FW() {
    V = getVertices(map, MAP_SIZE);
    
    for (var i=0; i<V.length; i++) {
        for (var j=0; j<V.length; j++) {
            V[i].setDistance(V[j], Infinity);
        }
        V[i].setDistance(V[i], 0);
    }
    
    for (var i=0; i<V.length; i++) {
        for (var j=0; j<V.length; j++) {
            if (i==j)   continue;
            
            if (Math.abs(V[i].x-V[j].x) + Math.abs(V[i].z-V[j].z) == 1) {
                V[i].setDistance(V[j], 1);
                V[i].setNext(V[j], V[j]);
            }
        }
    }
    
    for (var u=0; u<V.length; u++) {
        for (var i=0; i<V.length; i++) {
            for (var j=0; j<V.length; j++) {
                if (V[i].getDistance(V[j]) > V[i].getDistance(V[u]) + V[u].getDistance(V[j])) {
                    V[i].setDistance(V[j], V[i].getDistance(V[u]) + V[u].getDistance(V[j]));
                    V[i].setNext(V[j], V[i].getNext(V[u]));
                }
            }
        }
    }
}

function getVertices(map, mapSize) {
    var result = new Array();
    
    for (var i=0; i<mapSize; i++) {
        for (var j=0; j<mapSize; j++) {
            if (map[i][j] == 0) {
                result.push(new GraphVertex(i, j, MAP_SIZE));
            }
        }
    }
    
    return result;
}

function getNextVertex(from, to) {
    var fromV, toV;
    
    for (var i=0; i<V.length; i++) {
        if (V[i].x == from.x && V[i].z == from.z) {
            fromV = V[i];
            break;
        }
    }
    
    for (var i=0; i<V.length; i++) {
        if (V[i].x == to.x && V[i].z == to.z) {
            toV = V[i];
            break;
        }
    }
    
    return fromV.getNext(toV);
}