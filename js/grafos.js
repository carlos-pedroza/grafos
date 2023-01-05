

function dibujarGrafos(matrixVertices, vertices) {
  var nodes = [];
  var edges = [];

  for(var i=0; i<vertices; i++) {
    var vertice = `V${i}`;
    var node = { data: { id: vertice } };
    nodes.push(node);
  }

  var id=1;
  for(var x=0; x<vertices; x++) {
    var verticeX = `V${x}`;
    for(var y=0; y<vertices; y++) {
      var verticeY = `V${y}`;
      if(matrixVertices[x][y]==1) {
        var edge = { data: { id: `e${id++}`, source: verticeX, target: verticeY } };
        edges.push(edge);
      }
    }
  }

  if(nodes.length>0&&edges.length>0) {
    crearGrafos(nodes, edges);
  }

}

function crearGrafos(nodes, edges) {
  var cy = cytoscape({
    container: document.getElementById('cy'),
    style: [
      {
        selector: 'node',
        css: {
          width: 20,
          height: 20,
          'background-color':'#61bffc',
          content: 'data(id)'
        }
        
      }
    ],
    elements: {
      nodes,
      edges
    },
    layout: {
        name: 'breadthfirst',
        directed: true,
        padding: 10,
        /* color: "#ffff00",*/
        fit: true
    }
  });
}

