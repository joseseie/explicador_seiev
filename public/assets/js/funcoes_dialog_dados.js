$(document).ready(function () {

    pegarDados();
    accoes();
    buscarDisciplinas();
    carregarDadosAcesso();

    $('form#dados ul#list-disciplinas> *:first-child').css('display', 'none');
    $('form#dados input#next').click(function (e) {
        e.preventDefault();
        $estagio = $('.moving-tab').html();
        if($estagio == 'Formacao')
            actualizarFormacao();
        if($estagio == 'Identificacao')
            alcualizarDados();
        if($estagio == 'Acesso')
            alctualizarAcesso();
    });


    autoComplete('../../dao/processar/processar_dados.php','nome','busarcarCurso',6,'form#dados #curso', seleccionarCurso, null);
    autoComplete('../../dao/processar/processar_dados.php','nome','busarcarDiciplina',6,'form#dados #disciplina', colecionarDisciplinas, null);

    $('form#dados div#botoes .criado').click(function (e) {
        e.preventDefault();
        return false;
    });

});

function seleccionarCurso() {
    var selectedItemValue = $("form#dados #curso").getSelectedItemData().id;
    $("form#dados #idCurso").val(selectedItemValue).trigger("change");
}

function colecionarDisciplinas() {
    var selectedItemValue = $("form#dados #disciplina").getSelectedItemData().id;

    //colleciona as dicioplinas nos botoes caso ela nao tenha sido selecionda ainda
    if(vefificarDiciplina(selectedItemValue)) {

        var disciplina = $('form#dados #disciplina').val();
        addDisciplinas(disciplina, selectedItemValue);
    }
}

/**
 * adiciona disciplinas nos botoes
 * @param disciplina
 */
function addDisciplinas(disciplina, idDisciplina) {
    var botao = $('<button class="btn-primary criado">' +
        '<span style="display:none;">' + idDisciplina + '</span>' +
        '<a>Disciplina</a>' +
        '</button>');
    botao.val(idDisciplina).trigger('change');
    botao.find('a').text(disciplina);
    botao.find('span').val(disciplina).click(function (e) {
        e.preventDefault();
    });
    $('form#dados div#botoes').append(botao);
}



/**
 * vefifica se uma disciplina selecionada ja pode ser selecionda ou nao
 * @param disciplina
 * @returns {boolean}
 */
function vefificarDiciplina(disciplina) {
    var botoes = $('form#dados div#botoes >button');
    var verificar = true;
    for(var a=0; a<botoes.length; a++){
        if(disciplina == botoes.find('span').get(a).innerHTML)
            verificar = false;
    }
    return verificar;
}


function accoes() {
    $('form#dados [name=masculino]').on('click', function () {
        $('form#dados [name=feminino]').prop('checked', false)
    });
    $('form#dados [name=feminino]').on('click', function () {
        $('form#dados [name=masculino]').prop('checked', false)
    });
}

function pegarDados() {
    var form = $('form#dados');
    $.get(form.attr('action'),{operacao : 'buscarPessoa'}, function (result) {
        if(result.toString.length > 0) {
            var objecto = JSON.parse(result);
            $('form#dados [name=nome]').val(objecto.nome);
            $('form#dados [name=descricao]').val(objecto.descricao);
            $('form#dados [name=telefone]').val("847005571");

            $('form#dados [name=nome]').focus();

            if (objecto.sexo == 'M') {
                $('form#dados [name=masculino]').prop('checked', true);
                $('form#dados [name=feminino]').prop('checked', false);
            }
            if (objecto.sexo == 'F') {
                $('form#dados [name=feminino]').prop('checked', true);
                $('form#dados [name=masculino]').prop('checked', false);
            }
        }
    });
}

function alcualizarDados() {
    var form = $('form#dados');
    pessoa = {
        nome : $('form#dados [name=nome]').val(),
        descricao : $('form#dados [name=descricao]').val(),
        telefone : $('form#dados [name=telefone]').val(),
        sexo : ($('form#dados [name=masculino]').is(':checked') ? "M" :
            ($('form#dados [name=feminino]').is(':checked') ? "F" : 'genero nao definido')),
        operacao : 'actualizarPessoa'
    }
    $.post(form.attr('action'),pessoa, function (result) {

        alert("result de ajax na function alcualizarDados()\n"+result);

    });
}

function actualizarFormacao() {

    var curso = $('form#dados #idCurso').val();
    var botoes = $('form#dados div#botoes >button');

    var disciplinas = [];
    for(var a=0; a<botoes.length; a++){
        disciplinas[a] = botoes.find('span').get(a).innerHTML;
        alert("Collecionando"+ botoes.find('span').get(a).innerHTML);
    }

    disciplinaExplicador = {
        curso : curso,
        disciplinas : disciplinas,
        operacao : 'SalvarFormacao'
    }


    $.post($('form#dados').attr('action'), disciplinaExplicador, function (resultado) {
        alert(resultado);
    });





}


/**
 *Busca todas as disciplinas dos explicadores logados
 */
function buscarDisciplinas() {
    var form = $('form#dados');
    $.get(form.attr('action'),{operacao : 'busarcarDiciplinaPessoa'}, function (result) {
        var objecto = JSON.parse(result);
        $.each(objecto, function (chave, disciplina) {
            addDisciplinas(disciplina.nome, disciplina.id);
        });
        // alert("result de ajax na function buscarDisciplinas()\n"+result);
    });
}



/**
 * Metodo que faz o autocomplet pra um determindo input
 * @param PhpUrl - o caminho do ficheiro php para buscar os dados do autocomplete
 * @param atributo - atributo do objecto json que sera usado na pesquisa
 * @param operacao - accao a ser executada no servidor
 * @param maxElements - maximo numero de elementos que devem aparecer nas sugestoes
 * @param inputSelector - a input em si (o caminho jquey ate chegar a input)
 * @param acca - Accao que sera executada quando for selecionada um item
 * @param pegarDados -
 */
function autoComplete(PhpUrl, atributo, operacao, maxElements, inputSelector, accao, pegarDados) {
    var pesquisa = {
        //Pesquisa e o texto digitado
        url : function (pesquisa) {
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
            theme : "Round",
            hideAnimation: {
                type: "slide",
                time: 400,
                callback: function() {}
            }
        }
    }

    $(inputSelector).easyAutocomplete(pesquisa);
}



function carregarDadosAcesso() {
    var form = $('form#dados');
    $.get(form.attr('action'),{operacao : 'buscarPessoa'}, function (result) {
        // var objecto = JSON.parse(result);
        // $('form#dados [name=email]').val(objecto.email);
        // $('form#dados [name=h-senha]').val(objecto.senha);

        // alert("result de ajax na function carregarDadosAcesso()\n"+result);
        // $('form#dados [name=senha]').val('jhdjsdsjdjshdjh');

    });
}


function alctualizarAcesso() {

    var email = $('form#dados [name=email]').val();
    var senhaAntiga = $('form#dados [name=senha]').val();
    var senhaNova = $('form#dados [name=confirmar-senha]').val();
    var senhaUser = $('form#dados [name=h-senha]').val(); // senha no campo oculto (hidem)


    // alert("Senha Digitada: " + senhaAntiga + "\n Senha do user: " + senhaUser);
    if (vefificarSenha(senhaAntiga, senhaUser)) {
        acesso = {
            email: email,
            senha: senhaNova,
            // imagem: imagem,
            operacao: 'salvarAcesso'
        }


        // document.getElementById("wizard-picture").onchange = function (e) {
        //     var e = document.getElementById("wizard-picture");
        //     alert(e.target);
        //     $.post($("#dados").attr('action'),$("#dados").serialize(),function (e) {
        //         alert(e);
        //     });

            // if (e.target.files != null && e.target.files.length != 0) {
            //
            //     var ficheiro = e.target.files[0];
            //     var fd = new FormData();
            //
            //     fd.append("fotografia", ficheiro);
            //     var xmlhttp = new XMLHttpRequest();
            //     xmlhttp.onreadystatechange = function () {
            //         if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
            //             alert(xmlhttp.responseText);
            //     };
            //     xmlhttp.open("POST", "processar_img_perfil.php", true);
            //     xmlhttp.send(fd);
            // } else {
            //     alert("nenhum ficheiro foi definido.");
            // }


        // };



        // $.ajax({
        //       url: $('form#dados').attr('action'),
        //       type: 'POST',
        //       data: new FormData($('form#dados')) ,
        //       success: function (data) {
        //           alert(data);
        //           console.log(data);
        //       },
        //       cache: false,
        //       contentType: false,
        //       processData: false,
        //       xhr: function () {  // Custom XMLHttpRequest
        //           var myXhr = $.ajaxSettings.xhr();
        //           if (myXhr.upload) { // Avalia se tem suporte a propriedade upload
        //               myXhr.upload.addEventListener('progress', function () {
        //                   /* faz alguma coisa durante o progresso do upload */
        //               }, false);
        //           }
        //           return myXhr;
        //       }
        //   });

        // $.post($('form#dados').attr('action'), acesso, function (result) {
        //     // alert("result de ajax na function alctualizarAcesso()\n"+result);
        //     $('form#dados [name=h-senha]').val(senhaNova);
        // });
    }else
        alert("A senha antiga esta incorrecta");
}



function vefificarSenha(senhaAntiga, senhaUser) {
    return senhaAntiga == senhaUser;
}