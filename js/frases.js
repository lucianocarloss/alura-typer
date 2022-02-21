
$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria() {
    $("#spinner").toggle();
    $.get("http://localhost:3000/frases", trocaFraseAleatoria)
    .fail(function () {
        $("#erro").toggle();
        setTimeout(function () {
            $("#erro").toggle();
        }, 2000);

        })
        .always(function () {
            $("#spinner").toggle();
        });

}

function trocaFraseAleatoria(data) {
    let frases = $(".frase");
    let numeroAleatorio = Math.floor(Math.random() * data.length);

    frases.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrases();
    atualiazaTempoInicial(data[numeroAleatorio].tempo);
    inicializaMarcadores();
}


function buscaFrase(){
    $("#spinner").toggle();
    let fraseId = $("#frase-id").val();
    console.log(fraseId);
    let dados = {
                    id: fraseId
                };
    $.get("http://localhost:3000/frases",dados,trocaFrase)
    .fail(function(){
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle();
        }, 2000);
    })
    .always(function(){
        $("#spinner").toggle();
    });
    
}

function trocaFrase(data){
    let frases = $(".frase");
    frases.text(data.texto);
    atualizaTamanhoFrases();
    atualiazaTempoInicial(data.tempo);
}