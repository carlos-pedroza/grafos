var vertices = 0;
var matriz = [];

$(function(){


    $("#createMatriz").on("click", (event) => {

        vertices = parseInt($("#vertices").val());
        let aristas = parseInt($("#aristas").val());
        $("#tableMatriz").html("");
        matriz = [];

        for(let x=0; x<vertices; x++){
            let xv = [];
            for(let y=0; y<vertices; y++){
                xv.push(0);
            }
            matriz.push(xv);
        }
    
        matriz = llenarAristas(matriz, vertices, aristas);
        
        let trX = $("<tr>");
        for(let y = 0; y<vertices; y++) { //titulo vertice x
            if(y == 0) { // titulo vertice y
                let tdT =  $("<td>");
                $(tdT).html('&nbsp;');
                $(trX).append(tdT);
            }
            let td = $("<td>");
            $(td).html(`V${y+1}`);
            $(td).addClass("p-1").addClass("text-center");
            $(trX).append(td);
        }
        $("#tableMatriz").append(trX);
        for(let x=0; x<vertices; x++) {
            let tr = $("<tr>");
            for(let y=0; y<vertices; y++) {
                if(y == 0) { // titulo vertice y
                    let tdT =  $("<td>");
                    $(tdT).html(`V${x+1}`);
                    $(tr).append(tdT);
                }

                let td = $("<td>");
                
                var link = $('<a>');
                $(link).attr('id', `cell${x}_${y}`);
                $(link).attr('href', `javascript:cambiaArista(${x},${y});`);
                $(link).html(matriz[x][y]);

                $(td).append(link);

                if(y==0){
                    $(td).addClass("border-start");
                }

                if(y==(vertices-1)){
                    $(td).addClass("border-end");
                }

                $(td).addClass("p-1").addClass("text-center");
                $(tr).append(td);
            }
            $("#tableMatriz").append(tr);
        }

    });    

    $("#crearGrafos").on("click", (event) => {
        dibujarGrafos(matriz, vertices);
    });

    $("#generarArbol").on("click", (event) => {
        let nodes=[];
        vertices = parseInt($("#vertices").val());
        for(var i=0; i<vertices; i++) {
            var vertice = `V${i}`;
            var node = { data: { id: vertice } };
            nodes.push(node);
        }
        edges = [];
        edgesIndex = 1;
        crearArbol(0, vertices);
        crearGrafos(nodes, edges);
    
    });
    
    var edges = [];
    var edgesIndex = 1;
    function crearArbol(node,totalVertices){
        let peso = node*2;
        let l= peso + 1;
        let r= l + 1;
        if (l<totalVertices){
            let e1 = { data: { id: `e${edgesIndex++}`, source:  `V${node}`, target: `V${l}` } };
            edges.push(e1);
            crearArbol( l, totalVertices);
        }

        if(r<totalVertices){
            let e2 = { data: { id: `e${edgesIndex++}`, source:  `V${node}`, target: `V${r}` } };
            edges.push(e2);
            crearArbol( r, totalVertices);
        }
        

    }

    function llenarAristas(matrizVertices, vertices, aristas){
        if(aristas>(vertices*vertices)){
            aristas = vertices*vertices;
        }
        let c=1;
        while(c<=aristas){
            let x = aleatorio(vertices);
            let y = aleatorio(vertices);
            if(matrizVertices[x-1][y-1]==0){
                matrizVertices[x-1][y-1] = 1;
                c += 1;
            }
        }
        return matrizVertices;

    }

    function aleatorio(vertices){
        var x = Math.floor(Math.random()*vertices)+1;
        return x;
    }

});

function cambiaArista(x, y) {
    matriz[x][y] = matriz[x][y] == 0 ? 1 : 0;
    console.log(matriz[x][y]);
    $(`#cell${x}_${y}`).html(matriz[x][y]);
}

//algo