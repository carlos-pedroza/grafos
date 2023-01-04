$(function(){

    var vertices = 0;

    var matriz = [];

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

        for(let x=0; x<vertices; x++) {
            let tr = $("<tr>");
            for(let y=0; y<vertices; y++) {
                let td = $("<td>");
                $(td).html(matriz[x][y]);

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