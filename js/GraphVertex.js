function GraphVertex(x, z, mapSize) {
    this.x = x;
    this.z = z;
    this.mapSize = mapSize;
    this.next = new Map();
    this.dist = new Map();
    
    function key(vertex) {
        return vertex.x * vertex.mapSize + vertex.z;
    }
    
        
    this.setDistance = function(vertex, distance) {this.dist[key(vertex)] = distance;} 
    this.setNext = function(vertex, next) {this.next[key(vertex)] = next;}
    this.getDistance = function (vertex) {return this.dist[key(vertex)];}
    this.getNext = function (vertex) {return this.next[key(vertex)];}
}