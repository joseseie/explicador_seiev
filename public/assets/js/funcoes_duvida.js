
$(document).ready(function () {

    // $('#duvidas .item_duvida').remove();
    $('#duvidas > *:first-child').css('display', 'none');
    carregarDuvidas();
});



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


function carregarDuvidas() {
    $.get('dao/processar/ProcessarDuvidas.php', {'operacao':'buscarDuvidas'}, function (result) {
        var duvidas = JSON.parse(result);
        $.each(duvidas, function (chave, valor) {
            adicionarDuvida(valor);
        });
        afterLoad();
    }).fail(function (resu) {
       console.log(resu);
    });
}


function formatarData(data) {
    var result = data.replace(/\-/g,'/');
    return (result.split(' ')[0]);
}


function afterLoad() {

    $('.item_duvida button.item_btn_responder').click(function () {

        responder($(this));

    });

    //Click no botao de gostar
    $('.item_duvida button.item_btn_gostar').bind('click',function () {
        gostar($(this));
    });


}


function responder(butao) {
    $divDuvida = butao.closest('.item_duvida');
    var id = $divDuvida.val();

    $divDuvida.find('.comentarios').load('pages/comentarios.php', function () {
        butao.css('display','none');
        $itemResposta = $divDuvida.find('.item-resposta').clone();
        $divDuvida.find('.item-resposta').remove();
        $listaRespostas = $divDuvida.find('.lista-respostas');
        $divResponder = $divDuvida.find('.resposta-escrita');




        carregarRespostas(id).done(function (resultado) {
            var respostas = JSON.parse(resultado);
            $.each(respostas, function (chave, resposta) {
                adicionarResposta($itemResposta, $listaRespostas, resposta);
            });
        });



        $divDuvida.find('.resposta-enviar').click(function () {

            $resposta = $divResponder.find('.resposta-texto').val();
            $divDuvida.find('.resposta-texto').val('');
            var resposta = {
                conteudo : $resposta,
                idDuvida : $divDuvida.val(),
                operacao : 'comentarDuvida'
            }



            /**
             * Salvar a resposta na base dedos
             */
            $.post('dao/processar/ProcessarDuvidas.php', resposta , function (result) {
                if(result != 'erro') {
                    var objecto = JSON.parse(result);
                    $.each(objecto, function (chave, valor) {
                        adicionarResposta($itemResposta, $listaRespostas, valor);
                    });
                }else
                    alert("Erro ao Salvar Respostas \n"+result);
            });

        });

    });

}


/**
 * adiciona uma respota no DOM
 * @param $itemResposta
 * @param $listaRespostas
 * @param resposta
 */
function adicionarResposta($itemResposta, $listaRespostas, resposta) {
    $itemResposta.val(resposta.idResposta);
    $itemResposta.find('.resposta-username').text(resposta.nomePessoa);
    $itemResposta.find('.resposta-resposta').text(resposta.conteudoResposta);
    $itemResposta.find('.resposta-data').text(formatarData(resposta.dataResposta));
    $listaRespostas.append($itemResposta.clone());
}


/**
 * Carrega as respostas de um duvida
 * @param idDuvida
 */
function carregarRespostas(idDuvida) {


    var resultado = $.post('dao/processar/ProcessarDuvidas.php',{operacao : 'buscarResposta', idDuvida: idDuvida}, function (result) {

    });

    return (resultado);
}













function gostar(butao) {
    idDuvida = butao.closest('.item_duvida').val();
    gosto = {
        duvida : idDuvida,
        operacao : 'gostarDuvida'
    }

    $.post('dao/processar/ProcessarDuvidas.php', gosto, function (result) {

        // $(butao).find('.gostos').html(result);
    })
}


/**
 * Busca os dados do ulizador logado
 */
function getNomeLogado() {
    var retorno = 'username';

    $.ajax({
        type: 'GET',
        url: 'dao/processar/ProcessarDuvidas.php',
        data: {operacao: 'buscarUser'},
        success: function (result) {
            retorno = result[0].nome;
        },
        dataType: 'JSON',
        async:false
    });

    return retorno;
}




