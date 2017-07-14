$(function () {

    autoComplete('dao/processar/ProcessarDuvidas.php','nome','buscarDisciplina',3,'input#duvida_disciplina',seleccionarDisciplina, seleccionarDisciplina);
    // autoComplete('dao/processar/ProcessarDuvidas.php', 'nome', 'buscarToticos', 4, 'input#duvida_topico', selecionarTopico(), selecionarTopico());

    $("#publicar_a_duvida").on('click', function (e) {

        e.preventDefault();
        var urlSession = 'dao/processar/processar_sessions.php';


        $.post(urlSession, {estado: "perfil"}, function (perfil) {
            // alert("Perfil buscado.\n"+perfil);
            if (perfil == 'Estudante') {

                    publicarDuvida();

            } else {
                alert("Por favor entre como estudante.");
            }
        });
    });

});



function seleccionarDisciplina() {
    var selectedItemValue = $("input#duvida_disciplina").getSelectedItemData().id;
    $("input#idDisciplina").val(selectedItemValue).trigger("change");
}

function selecionarTopico() {
    var selectedItemValue = $("input#duvida_topico").getSelectedItemData().id;
    $("input#idTopico").val(selectedItemValue).trigger("change");
}




function publicarDuvida() {
    // alert("Dados dos campos: Pergunta= "+$("input#duvida_pergunta").val()+", Topico = "+$("input#idTopico").val()+" disciplina "+$("input#idDisciplina").val());

    // if ($("input#duvida_pergunta").val() !== "" && $("input#duvida_topico").val() !== "" && $("input#duvida_disciplina").val() !== "") {

    //A chamar Ajax usando o metodo post.
    var duvida = {
        titulo : $("input#duvida_pergunta").val(),
        topico : $("input#idTopico").val(),
        disciplina_id : $("input#idDisciplina").val(),
        descricao : $("textarea#duvida_descricao").val(),
        operacao : 'salvarDuvida'
    }

    $.post($("form#form_duvida").attr("action"), duvida, function (result) {

        var objecto = JSON.parse(result);
        $.each(objecto, function (chave, duvida) {
            adicionarDuvida(duvida);
        });
        alert("Duvida publicada com sucesso!");
    });

}

function adicionarDuvida(duvida){
    // card_duvida.find('.item')
    var card_duvida = $('#duvidas > *:first-child .item_duvida').clone();
    card_duvida.find('.item_disciplina').html(duvida.disciplina);
    card_duvida.find('.item_nome').html(duvida.estudante);
    card_duvida.find('.item_data').html(formatarData(duvida.data_publicada));
    card_duvida.find('.item_descricao').html(duvida.conteudo);
    card_duvida.find('.item_pergunta').html(duvida.titulo);
    card_duvida.val(duvida.duvida_id);
    // card_duvida.find('.item_descricao').html(duvida.conteudo);
    // card_duvida.find('.item_descricao').html(duvida.conteudo);
    $('#duvidas').append(card_duvida);
}


/**
 * Metodo que faz o autocomplet pra um determindo input
 * @param PhpUrl - o caminho do ficheiro php para buscar os dados do autocomplete
 * @param atributo - atributo do objecto json que sera usado na pesquisa
 * @param operacao - accao a ser executada no servidor
 * @param maxElements - maximo numero de elementos que devem aparecer nas sugestoes
 * @param inputSelector - a input em si (o caminho jquey ate chegar a input)
 * @param acca - Accao que sera executada quando for selecionada um item
 * @param pegarDados - quando for selecionda uma opcao pelo teclado
 */
function autoComplete(PhpUrl, atributo, operacao, maxElements, inputSelector, accao, pegarDados) {
    var pesquisa = {
        //Pesquisa e o texto digitado
        url : function (pesquisar) {
            return PhpUrl;
        },

        getValue:atributo,

        ajaxSettings: {
            dataType: "json",
            method: "POST",
            data: {
                operacao : operacao
            }
        },

        list :{
            //sera executada a funcao accao quando for selecionada um item
            onClickEvent : accao,

            onSelectItemEvent: pegarDados,

            onChooseEvent : function () {
                return(($(inputSelector).val()));
            },
            maxNumberOfElements : maxElements,
            match : {
                enabled : true
            },
            showAnimation: {
                type: "fade",
                time: 400,
                callback: function() {}
            },
            hideAnimation: {
                type: "slide",
                time: 400,
                callback: function() {}
            }
        }
    }

    $(inputSelector).easyAutocomplete(pesquisa);
}