
var campo = $(".campo-digitacao");
let tempoInicial = $("#tempo-restante").text();

$(function () {
    atualizaTamanhoFrases();
    inicializaContadores();
    inicializarCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
    atualizaPlacar();

    $("#usuarios").selectize({
        create: true,
        sortField: "text",
      });

    $('.tooltip').tooltipster({
        trigger: "custom"
    });
});


function atualiazaTempoInicial(tempo){
    tempoInicial = tempo;
    $("#tempo-restante").text(tempo);
}


function atualizaTamanhoFrases() {
    let frase = $(".frase").text();
    let numPalavras = frase.split(" ").length;
    let tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}


function inicializaContadores() {
    campo.on('input', function () {
        let conteudo = campo.val();
        let qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#botao-reiniciar").attr("disabled", true);
        $("#contador-paravras").text(qtdPalavras);
        $("#contador-caracteres").text(conteudo.length);
    });
}

function inicializaMarcadores() {
    campo.on("input", function () {
        let frase = $(".frase").text();
        let digitado = campo.val();
        let comparavel = frase.substr(0, digitado.length);
        if (digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
            campo.removeClass("borda-preta");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
            campo.removeClass("borda-preta");
        }
    });
}

function inicializarCronometro() {
    campo.one("focus", function () {
        let tempoRestante = $("#tempo-restante").text();
        let cronometroID = setInterval(function () {
            tempoRestante--;
            // console.log(tempoRestante);
            $("#tempo-restante").text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroID);
                campo.attr("disabled", true);
                finalizaJogo();
            }
        }, 1000);
    });
}


function finalizaJogo() {
    $("#botao-reiniciar").attr("disabled", false);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}


function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-caracteres").text("0");
    $("#contador-paravras").text("0")
    $("#tempo-restante").text(tempoInicial);
    inicializarCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}
