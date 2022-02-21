$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);


function inserePlacar() {
    let corpoTabela = $(".placar").find("tbody");
    let nomeUsuario = $("#usuarios").val();
    let numPalavras = $("#contador-paravras").text();

    let linha = novaLinha(nomeUsuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.prepend(linha);
    $(".placar").slideDown(600);
    scrollPlacar();
}


function scrollPlacar(){
    let posicaoPlacar = $(".placar").offset().top;
    $("html, body").animate(
    {
        scrollTop: posicaoPlacar+"px"
    },1000);
}


function novaLinha(nomeUsuario, numPalavras) {
    let linha = $("<tr>");
    let colunaUsuario = $("<td>").text(nomeUsuario);
    let colunaPalavras = $("<td>").text(numPalavras);
    let colunaRemover = $("<td>");

    let link = $("<a>").addClass("botao-remover").attr("href", "#");
    let icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;

}

function removeLinha(event) {
    event.preventDefault();
    let linha = $(this).parent().parent();
    linha.fadeOut();
    setTimeout(function(){
        linha.remove();
    },600);
    
}


function mostraPlacar(){
    $(".placar").stop().slideToggle(600);
}

function sincronizaPlacar(){
    let placar = [];
    let linhas = $("tbody>tr");
    linhas.each(function(){
        let usuario = $(this).find("td:nth-child(1)").text();
        let palavras = $(this).find("td:nth-child(2)").text();
        
        let score = {
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score);
    });

    let dados = {
        placar: placar
    };

    $.post("http://localhost:3000/placar", dados, function(){
        console.log("salvou o placar");
        $(".tooltip").tooltipster("open").tooltipster("content", "sucesso ao sincronizar!");
    }).fail(function(){
        $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar!");
    }).always(function(){
        setTimeout(function(){
            $(".tooltip").tooltipster("close");
        },1200);
    });

}

function atualizaPlacar(){

    $.get("http://localhost:3000/placar", function(data){
        $(data).each(function (){
            let linha = novaLinha(this.usuario, this.pontos);
            linha.find(".botao-remover").click(removeLinha);
            $("tbody").append(linha);
        });
    });
}