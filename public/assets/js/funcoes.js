$(function () {

    $('.explicadores-voltar').hide();
    $('[data-toggle="tooltip"]').tooltip(); //Inicializacao do Tootip

    var urlSession = (/pages/i.test(window.location)) ? '../../dao/processar/processar_sessions.php' : 'dao/processar/processar_sessions.php';
    $.post(urlSession, {estado: "perfil"}, function (perfl) { //Verifica se o perfil e do Administrador para que alterar alguns opcoes para ele.

        if (perfl === "Administrador")
            $('.dropd-trocar').append("<i class='fa fa-compress' aria-hidden='false'></i>").text("Index Admin").attr('href', 'pages/admin/admin.php');

    }).done(function (p) {
        ocultarOpcoesDoMenu();

        if(p === "Estudante") verSolicitacoesEnvidas("buscarTodasEnviadas");
        if(p=== "Explicador") verSolicitacoesRecebidas("buscarTodasRecebidas");
        if(p=== "Explicador" || p=== "Estudante") verificarMensagens();
        if(!(p=== "Explicador" || p=== "Estudante")){
            $('#dropdown-solicitacoes').parent().hide();
            $('#alertas-notificacoes').hide();
        }

});

    mostarPaginaPrincipal_comAjax();
    actulizarVisibilidade();



});


/**
 * Este metodo é o primeiro de todos a ser chamado.
 * Tem a função basica de carregar as informaçoes que devem ficar em cada parte da pagina principal.
 */
function mostarPaginaPrincipal_comAjax() {

    var div_processamento = $("<div/>", {
        src: "ajax-loader.gif", alt: "A Processar. . .", id: "processamento",
        class: "d-flex justify-content-md-center col-md-12", click: function () {
            alert("A Processar. . . (Aguarde)");
        }
    });

    var div2 = $("<div/>");
    div2.append($("<i/>", {class: "fa fa-circle-o-notch fa-spin fa-3x fa-fw"}));
    div2.append($("span/>", {class: "sr-only"}).append("Loading..."));

    vinculaEventos(); //Metodo localizado neste ficheiro vincula eventos basicos em algumas opcoes de dropdown

    processarOs3centros();
}

/**
 * Este mmetodo processa as tres partes do corppo do site.: menu esquerdo, parte central e a parte da direita.
 */
function processarOs3centros() {
    $('#as_main_left').load("pages/menu_lateral.php", function () {
        vincularEvtDasOpcoesDoMenu();
        $('#as_main_left #processamento').hide();
    });

    //Carregamento do centro principal da pagina.
    $('#s_main_center').load("pages/parte_principal.php", function () {
        $('#s_main_center #processamento').hide();

    });
    //Carregamento do centro principal da pagina.
    $('#as_main_right').load("pages/parte_direita.php", function () {
        $('#as_main_right #processamento').hide();
    });
}

function vincularEvtDasOpcoesDoMenu() {

    //Chamada da parte dos explicadores
    $('#m_opt_explicador').on("click", function (e) {
        e.preventDefault();
        $('#s_main_center').load($(this).attr('href'));
    });
    //Chamada da parte dos explicadores
    $('.m_opt_explicador').on('click', function (e) {
        e.preventDefault();
        // alert("Clicado.");
        // processarOs3centros();
        //Carregamento do centro principal da pagina.
        $('#s_main_center').load($(this).attr('href'), function () {
            $('#s_main_center #processamento').hide();
        });
    });

    //Chamada da parte das disciplinas
    $('#m_opt_disciplinas').click(function (e) {
        e.preventDefault();
        $('#s_main_center').load($(this).attr('href'));
    });

    $('#m_opt_duvidas').click(function (e) {
        e.preventDefault();
        $('#s_main_center').load($(this).attr('href'));

    });

    $('#m_opt_artigos').click(function () {
        $('#s_main_center').load($(this).attr('href'));

        return false;
    });

}

/**
 * Este metodo actualiza a visibilidade de algumas opcoes, para mostrar apenas o que diz respeito ao utilizador actual.
 */
function actulizarVisibilidade() {

    //Metodo ajax que verifica se alguem esta logado ou nao.
    var urlSession = (/pages/i.test(window.location.href)) ?
        '../../dao/processar/processar_sessions.php' : 'dao/processar/processar_sessions.php';
    $.post(urlSession, {estado: "email"}, function (p) {

        if ("Sessao nao iniciada!" !== p) {

            ocultar(true);

        } else {

            ocultar(!true);

        }
    });
}

$(document).ready(function () {

    $('#s_main_center').load('pages/parte_principal.php');

    $('.nome_explicador').bind('click', function () {
        // alert('Clicou');
        arganizarTelaBasica("Teste do click");

        return false;
    });

});


/**
 * Este metodo controla os eventos de navegabilidade entre as paginas dos utilizadores logados na pagina.
 */
function vinculaEventos() {


    $(".index_explicador").bind('click', function () {
        var urlSession = (/pages/i.test(window.location)) ? '../../dao/processar/processar_sessions.php' : 'dao/processar/processar_sessions.php';
        var urlGo = (/pages/i.test(window.location)) ? '../../pages/explicador/index.php' : 'pages/explicador/index.php';

        $.post(urlSession, {estado: "email"}, function (email) { //Primeiro verifica se a sessao foi iniciada. depois verifica se o perfil e do Administrador para que alterar alguns opcoes para ele.

            $('#m_opt_artigos').click(function () {
                $('#s_main_center').load('pages/centro_artigos.php');
            });

            // trocarCorpoDOM("pages/explicador/corpo_explicador.php");
            // var url = 'dao/processar/processar_utilizador.php';
            // informacoesBasicas(url, email, "Explicador");

            window.location.href = urlGo; //Para onde se redirecionara a pagina.
        });
    });

    //Algumas opcoes de dropdown prinicipal
    $(".dropd-sair").bind('click', function (e) {
        e.preventDefault();
        controloSessao("terminar", $(this).attr('href'));
        location.reload(true);

    });

    $("#publicar_duvida").bind('click', function (e) {
        e.preventDefault();

        var urlSession = 'dao/processar/processar_sessions.php';

        $.post(urlSession, {estado: "perfil"}, function (perfil) {

            // 
            if (perfil !== 'Estudante') {

                $('#publicar_duvida').attr('data-target', '#dialog-duvida');
                $('.error_publicar_duvida').css({display: 'none'});

            } else {
                $('input').css('color', 'red');
                $('.error_publicar_duvida').css({color: 'red', display: 'block'});
                // alert("Por favor inicie a sessao como estudante.")
            }

        });
        $('.publicar_duvida').bind('blur', function () {
            $('input').css('color', 'black');
            $('.error_publicar_duvida').css({display: 'none'});
        });


    });

}

function ocultar(b) {

    if (b) {
        $('.entrar,.criar').css('display', 'none');
        $('.dropd-trocar,.dropdown-dividesr,.dropd-sair,.perfil').css('display', 'block');
    } else {
        $('.entrar,.criar').css('display', 'block');
        $('.dropd-trocar,.dropdown-divisder,.dropd-sair,.perfil').css('display', 'none');

    }
}

function eventosDoMenuPrincExplicadores() {

    //Eventos do menu explicador principal
    $('h4').bind('click', function () {
        // alert($(this).text());
    });

    // $('#solicitar_aula').modal('toggle');

    $("i[title='Seguir']").bind('click', function (e) {
        // e.preventDefault();
        // $(this).attr('data-target','#solicitar_aula');
        // $('#solicitar_aula').modal('show');
    });
    $('.cancelar-solicitacao').bind('click', function () {

        location.reload(true); //Forma provisoria de fechar a dialog.

    });
    $('.confirmar-solicitacao').bind('click', function () {
        console.log("solicitacao teste em funcionamento....\n\nEm breve as mesmas serao enviadas com sucesso!");
        location.reload(true);
    });
}

/**
 * Preenche o perfil do explicador, com as informacoes basicas de identificacao, onde usando
 * O metodo ajax busca os dados da base de dados.
 */
function informacoesBasicas(urlProcessar, email, perfil) {

    //Com esta requisicao ajax, buscamos os dados na base de dados. e populamos no perfil do explicador.
    //Onde deve-se enviar o email e o peril, para se buscar os dados desejados.
    // alert("O id recebido e.: "+email);
    if (email.length > 0) {
        $.post(urlProcessar, {email: email, perfil: perfil, buscar: 'identificacao'}, function (o) {

            ocultar(true);
            // console.log(o);
            $('.nome_explicador').text(o.nome);
            $('.nome_explicador').val(o.id);
            $('#informacao_esq_sup .descricao').text(o.descricao);
            $('#informacao_esq_sup b').text(o.sexo);
            $('.total_seguidores').text("20"); //Total de seguidores
            $('.total_artigos').text("90"); //Total de artigos
            $('.sexo').text(o.sexo);
            $('.email').text(o.email);
            $('.morada').text("Nao definido.");

            var url_img = (/pages/i.test(window.location.href)) ?
                '../../img/img_default.png' : 'img/img_default.png';
            //Aqui vamos colocar a imagem que o utilizador definiu, como imagem do seu perfil.
            $(".exp_perfil_imagem img").attr("src", url_img);
            $(".exp_perfil_imagem_cima img").attr("src", url_img);

            var urlSession = (/pages/i.test(window.location.href)) ?
                '../../dao/processar/processar_sessions.php' : 'dao/processar/processar_sessions.php';

            $.post(urlSession, {estado: "email"}, function (r) {

                if (email !== r) { //Aqui verificamos se o perfil (email) que esta a ser mostrado é diferente do utilizador que iniciou a sessao.

                    $('.explicador_artigo').hide();
                    $('.explicador_opcoes').show();
                    $('.explicadores-voltar').show();

                } else if (email !== "Sessao nao iniciada!") {

                    $('.explicador_artigo').show();
                    $('.explicador_opcoes').hide();
                    $('.explicadores-voltar').hide();


                    // mostrarNotificacao(4000, o.nome);
                    // alert("Mostramos alguns componentes: deste usuario pois esta autenticado.\nAs opcoes de gostar... estao ocultados.");
                }


            });


            /*NOTA: depois validar a url, para mostrar ou dados do explicador ou dados do estudante.
             * Ou seja: ter dois ficheiros: processa_explicador.php e processa_estudante.php */

        }, "json").done(function () {
            // alert("terminou de processar. nome definido: "+$('.nome_explicador').text());
        });
    } else {
        ocultar(!true);
    }

    actulizarVisibilidade();
}

function mostrarNotificacao(tempo, nome) {
    setTimeout(function () {
        $('data-target', '#dialog_notificacoes');
        $('#dialog_notificacoes').modal('show');

        $('.nome').text("Querido " + nome + ",");
        $('.mensagem').text("Novos componentes serao add com sucesso para Manipular o seu perfil,"
            + "nVeja o metodo: informacoesBasicas(urlProcessar, email, perfil)\n"
            + "na linha > 278\nNo ficheiro js/script.js");

    }, tempo);
}
function mostrarNotificacaoHss(titulo, mensagem) {
    $('#dialog_notificacoes .mensagem').empty();
    // $('data-target', '#dialog_notificacoes');
    $('#dialog_notificacoes').modal('show');

    $('#dialog_notificacoes .nome').text(titulo);
    $('#dialog_notificacoes .mensagem').append('<p>'+mensagem+'</p>');

}

/**
 * Este metodo vincula eventos as opcoes do perfil explicador nao autenticado.
 * Este trata os eventos: Solicitar aula, ver estudantes, gostar, seguir, nao gostar e ver disponvibilidade.
 */
function eventosDoPerfilExplNaoAutenticado() {

    $('.exp-opt-adicionais').bind('click', function () {

        var elemento = $(this).find("h6").val("true");
        var opcaoClicada = $(this).find("h6").text().toString();

        var idDoexplicadorSelecionado = $('.nome_explicador').val();
        mudarStatusDeSeguirENaoSeguir(idDoexplicadorSelecionado);

        if (/Estu/i.test(opcaoClicada) && /dantes/i.test(opcaoClicada)) { //Verificando se clicou em Estudantes.


            $('#dialog_estudante_do_exp .nome').text($('.nome_explicador').text());

            mostrarEstudantes(idDoexplicadorSelecionado);

            $('.modal').on('hidden.bs.modal', function (e) {
                console.log("a modal " + $(this).attr('id') + " esta no estado hidden " + (new Date()));
            })

            //Vamos lhe mostrar todos estudantes deste explicador, pois  ele clicou em ver estudantes.
            //E para ver estudantes deste explicador, o utilizador nao precisa estar autenticado.
        } else {
            var urlSession = (/pages/i.test(window.location)) ? '../../dao/processar/processar_sessions.php' : 'dao/processar/processar_sessions.php';
            $.post(urlSession, {estado: "idEPerfil"}, function (o) { //Verifica se o utilizador iniciou a sessao, e qual o seu perfil.

            }, 'JSON').done( function (o) {

                if (o.perfil === "Estudante" && /citar/i.test(opcaoClicada)) { //Verificando se clicou em solicitar.
                    //Aqui colocamos tada  logica de soicitar aula. O utilizador  autenticado é  estudante, ele  pode solicitar  aula.
                    // alert("Pode solicitar aula sim, voce e estudante.");

                    envioDeSolicitacaoDeAula(o.id, o.perfil, idDoexplicadorSelecionado);

                } else if (/citar/i.test(opcaoClicada)) {
                    //O utilizador clicou em solicitar aula, mas não  esta autenticado. como estudante.

                    alert("Entre como estudante, para poder solicitar aula.");

                } else if (o.perfil === "Estudante" || o.perfil === "Explicador") {

                    if (/Seguir/i.test(opcaoClicada)) { //Verificando se clicou em Favoritar.
                        // $('.processar-seguidores').show();
                        // $('i').show();
                        // mudarStatusDeSeguirENaoSeguir(idDoexplicadorSelecionado);
                        var msg = "Voce ja eh seguidor do "+$('.nome_explicador').text()+", O sistema nao permite seguir duas vezes.";

                        ($('.processar-seguidores').val() === "true") ? mostrarNotificacaoHss("Nao e possivel seguir de novo",msg) :
                            novosGostos(idDoexplicadorSelecionado,"seguir",'processar-seguir'); //A enviar os 2 parametros esperados no metodo.
                        $('.processar-seguidores').hide();
                    } else if (/Gostar/i.test(opcaoClicada)) { //Verificando se clicou em Gostar.
                        // mudarStatusDeSeguirENaoSeguir(idDoexplicadorSelecionado);
                        // $('i').show();
                        var msg = "Voce ja Gostou do "+$('.nome_explicador').text()+", O sistema nao permite gostar duas vezes.";

                        ($('.processar-gostar').val() === "true") ? mostrarNotificacaoHss("Nao e possivel gostar de novo",msg) :
                            novosGostos(idDoexplicadorSelecionado,"gostar",'processar-gostar');

                        // $('i');
                    } else if (/Nao /i.test(opcaoClicada)) { //Verificando se clicou em nao Gostar.
                        // $('i').show();
                        var msg = "Voce ja clicou em 'nao Gostar' do "+$('.nome_explicador').text()+", O sistema nao permite registar duas vezes  esta avaliacao.";

                        ($('.processar-nao_gostar').val() === "true") ? mostrarNotificacaoHss("Duplicacao de avaliacao",msg) :
                            novosGostos(idDoexplicadorSelecionado,"nao_gostar",'processar-nao_gostar');

                    } else if (/Enviar/i.test(opcaoClicada)) { //Verificando se clicou em Enviar mensagem.

                        // alert("Pode enviar mensagem sem problemas meu texto ");
                        $('#dialog_enviar_mensagem').modal('show');


                        $('.btn-enviar-mensagem').bind('click',function () {

                            if($('#dialog_enviar_mensagem #ta-mensagem').val().length > 0){

                                enviarMensagem("Explicador",idDoexplicadorSelecionado); //Enviando mensagem da dialog.

                            } else {
                                alert("Digite a mensagem que deseja enviar");
                            }
                        });

                    } else {
                        alert("opcao nao definida.");
                    }

                } else if (o.perfil === "Administrador") {
                    alert("O Administrador nao pode fazer nenhuma dessas opçoes.");
                } else {
                    alert("Autentique-se para .: '" + opcaoClicada + "'")
                }

            }).fail(function (r) {
                alert("ocorreu um erro: na funcao eventosDoPerfilExplNaoAutenticado\n\\n" + r.responseText);
            });
        }
    });
}


function envioDeSolicitacaoDeAula(idDoUtilizador, perfil, idDoexplicadorSelecionado) {

    $('.processar-solicitacao').show();

    if (idDoexplicadorSelecionado > 0) {

        $.post('dao/processar/processar_explicador.php', {
            op: "buscarDisciplinas",
            idDoExplicador: idDoexplicadorSelecionado
        }, function (result) {

            // console.log(result);

            if (result.totalResults > 0) { //A verificar Se o explicador escolhido tem disciplinas.

                $('.d-disciplinas,.ta-mensagem').show();
                $('#dialog_disciplinas .disciplinas').empty(); //Entao limpamos e adicionamos as disciplinas dele.
                $('#dialog_disciplinas .disciplinas').append("<option value='-1'>Selecione a disciplina.</option>");

                $.each(result.dados, function (chave, v) {

                    $('#dialog_disciplinas .disciplinas').append("<option class='" + v.tabela + "' value='" + v.id + "'>" + v.nome + "</option>"); //Guardando na select o id a disciplina.

                });

                $('.btn-enviar-solicitacao').text("Enviar");
            } else { //Se o explicador clicado nao tiver disciplinas por explicar cadastradas.
                // alert("O nome do explicador clicado e.: " + $('.nome_explicador').val());
                $('.mensagem-info').text("O " + $('.nome_explicador').text() + ", Ainda não cadastrou as disciplinas que explica." +
                    "  procure outro explicador ou lhe envie uma mensagem a perguntar se ele pode te explicar a disciplina que desejas.");
                $('.btn-enviar-solicitacao').text("Entendi.");
                $('.d-disciplinas,.ta-mensagem').hide();


            }

            $('#dialog_disciplinas').modal('show'); //Chamando a modal, para ser visualizada.

            //Tratamento do evento click, de envio de solicitação de aula

            $('.btn-enviar-solicitacao').on('click', function () {

                var nomeDaDisciplinaSelecionada = $('.d-disciplinas option:selected').text();
                var idDaDisciplinaSelecionada = $('.d-disciplinas option:selected').val();
                var tabela = $('.d-disciplinas option:selected').attr('class');

                objectAula = {
                    "idDisciplinaSemCurso": (tabela === "mydb.disciplinasdoexplicadorsemcurso") ? idDaDisciplinaSelecionada : null,
                    "idDisciplinaDoCurso": (tabela === "mydb.disciplinasdoexplicador") ? idDaDisciplinaSelecionada : null,
                    "assunto": null,
                    "mensagem": $('textarea#ta-mensagem').val(),
                    "idDoEstudante": idDoUtilizador,
                    "op": "insert"
                }

                var url = 'dao/processar/processar_solicitacoes.php';

                if (idDaDisciplinaSelecionada > 0 && tabela.length > 3) {
                    $.post(url, objectAula, function (r) {
                        // console.log(r);
                        alert(r);

                    }).fail(function (e) {
                        console.log("Ocorreu um erro na verf. idDaDisciplinaSelecionada: \n\n" + e.responseText);
                    });
                }
                else if ($('.btn-enviar-solicitacao').text() !== "Entendi.") {
                    console.log("Solicitacao não registada, \nPorque nenhuma disciplina foi selecionada para a solicitação.");
                }

            });


        }, 'JSON').done(function () {
            $('.processar-solicitacao').hide();
            vincularEvst();
            eventosDoMenuPrincExplicadores();
        }).fail(function (r) {
            console.log("ocorreu um erro  na funcao: envioDeSolicitacaoDeAula\n\n" + r.responseText);
        });

    }
}

function enviarMensagem(perfilDoelecionado, idDoSelecionado) {
    var obj = { op: "enviar_mensagem",
                idDoExplicador: idDoSelecionado, //Este id e do receptor da mensagem.
                tipoReceptor: "Explicador",
                assunto: $('#msg-assunto').val(),
                conteudo: $('#dialog_enviar_mensagem #ta-mensagem').val()
    }


    if (idDoSelecionado > 0 && perfilDoelecionado !== "undefined" && obj.op === "enviar_mensagem") {

        $.post('dao/processar/processar_explicador.php', obj, function (result) {

            $('#dialog_enviar_mensagem').modal("hide");
            mostrarNotificacaoHss("Envio de Mensagem",result);

        }).done(function () {

        }).fail(function (r) {
            console.log("ocorreu um erro  na funcao: enviarMensagem()\n\n" + r.responseText);
        });

    } else {

        console.log(obj);
    }
}


function mostrarEstudantes(idDoExplicadorSelecionado) {
    $('.processar-estudantes').show();

    var url = 'dao/processar/processar_explicador.php';
    $('#dialog_estudante_do_exp').find('.modal-body').empty();

    if (idDoExplicadorSelecionado > 0) {
        $.post(url, {op: "buscarEstudantes", idDoExplicador: idDoExplicadorSelecionado}, function (r) {
            // console.log(r);

            r = JSON.parse(r);

            $.each(r.dados, function (chave, v) {

                $('#dialog_estudante_do_exp').find('.modal-body').append('<div>' + v.nome_estudante + '</div>');

            });

        }, 'JSON').done(function (r) {
            // alert("Terminou de processar, \n\ndivs: "+$('#dialog_estudante_do_exp').find('.modal-body div').length);

            $('.processar-estudantes').hide(); //Vamos esconder tambem o processamento que vai sendo mostrado ao utilizador.
            if ($('#dialog_estudante_do_exp').find('.modal-body div').length > 0)
                $('#dialog_estudante_do_exp').modal('show'); //Esta dialog, sera mostrada quando ajax terminar.            
            else {
                mostrarNotificacaoHss("Explicador Sem estudantes", "O explicador " + $('.nome_explicador').text() + " ainda não tem estudantes!");
            }
        }).fail(function (e) {
            console.log("Ocorreu um erro: \n\n" + e.responseText);
        });
    }

}

//Logo que o utilizador clicar no explicador, se ele estiver autenticado vamos chamar este metodo para
//Para verificar se ele ja seguiu o expicador ou não (isso é valido para: seguir, gostar e não gostar )
// E este deve implementado de forma generica para ser reutilizado nas outras situaçoes. (onde algo pode-se gostar).
function mudarStatusDeSeguirENaoSeguir(idDoExplicador) {

//4. Enviar mensagem...

    var objectoPorEnviar = {
        op: "verificarSeJaFezAs3Operacoes",
        idDoExplicador: idDoExplicador
    }

    if (objectoPorEnviar.op != "undefined" && !(isNaN(idDoExplicador))) {
        var url = 'dao/processar/processar_explicador.php';
        //Sugestão: O ficheiro  php pode retornar um objecto, com: gostou: true/false, nao_gostou:true/false, seguiu:true/false
        $.post(url, objectoPorEnviar, function (r) { //No procheiro processa.php vamos pegar o perfil e o id do utilizador autenticado para serem usados nesta verificação.

            if(r.gostou === "true"){
                $('.processar-gostar').val("true"); 
                $('.gostar i:first-child').addClass('fa-thumbs-up');
                $('.gostar i:first-child').removeClass('fa-thumbs-o-up');
            } else {
                $('.gostar i:first-child').removeClass('fa-thumbs-up');
                $('.gostar i:first-child').addClass('fa-thumbs-o-up');
            }

            if(r.nao_gostou === "true"){
                $('.processar-nao_gostar').val("true");
                $('.nao-gostar i:first-child').addClass('fa-thumbs-down');
                $('.nao-gostar i:first-child').removeClass('fa-thumbs-o-down');
            } else {
                $('.nao-gostar i:first-child').removeClass('fa-thumbs-down');
                $('.nao-gostar i:first-child').addClass('fa-thumbs-o-down');
            }

            if(r.seguiu === "true"){
                $('.processar-seguidores').val("true");
                $('.seguir i:first-child').addClass('fa-heart');
                $('.seguir i:first-child').removeClass('fa-heart-o');
            } else {
                $('.seguir i:first-child').addClass('fa-heart-o');
                $('.seguir i:first-child').removeClass('fa-heart');
            }

        },"JSON").done(function (r) {

            //Algum outro evento caso precisarmos...

        }).fail(function (e) {
            console.log("Ocorreu um erro mudarStatusDeSeguirENaoSeguir(): \n" + e.responseText);
        });
    } else {
        alert("A  operacao nao foi definida. nenhuma verificao vai ser feita no background.\n" +
            "Provavelmente o id do explicador clicado nao e valido.: veja pelo objecto id= "+objectoPorEnviar.idDoExplicador);
    }

}

/**
 * Este metodo vai gravar a nova acao do utilizador sobre o sistema.
 * @param idDoExplicador : Id do explicador selecionado que se pretende gostar.
 * @param operacao : pode ser: gostar, nao_gostar, seguir.
 */
function novosGostos(idDoExplicador,operacao,classe) {
    $(".exp-opt-adicionais i[class$='"+operacao+"']").show();

    $(".exp-opt-adicionais i[class='processar-gostar']").show();
    // elemento.show();
    if(operacao === "gostar") $(".exp-opt-adicionais.gostar i:last-child").show();
    else if(operacao === "nao_gostar") $(".exp-opt-adicionais.nao-gostar i:last-child").show();
    else if(operacao === "seguir") $(".exp-opt-adicionais.seguir i:last-child").show();
    else if(operacao === "enviar_mensagem") $(".exp-opt-adicionais.enviar-mensagem i:last-child").show();
    else alert("Nenhuma opcao, das previstas.");

    var objectoPorEnviar = {
        op: operacao,
        idDoExplicador: idDoExplicador
    }

    if (objectoPorEnviar.op != "undefined" && !(isNaN(idDoExplicador))) {
        var url = 'dao/processar/processar_explicador.php';

        $.post(url, objectoPorEnviar, function (r) { //No procheiro processa.php vamos pegar o perfil e o id do utilizador autenticado para serem usados nesta verificação.

            if(r === "sucesso" && operacao === "nao_gostar"){ //Todas estas sao mensagens de sucesso.
                mostrarNotificacaoHss("Nao gostado","Nao gostado com sucesso.");
            } else if(r === "sucesso" && operacao === "gostar"){
                mostrarNotificacaoHss("gostado","Gostado com sucesso.");
            } else if(/sucesso/i.test(r)){
                mostrarNotificacaoHss(operacao,r);
            } else { //Esta aqui e uma mensagem se erro/insucesso.
                mostrarNotificacaoHss("Erro","Nao foi possivel "+operacao+" explicador selecionado.");
            }
            $('input').val('');

        }).done(function () {
            mudarStatusDeSeguirENaoSeguir(idDoExplicador);
            $("i[class|='processar']").hide();
            // $(".exp-opt-adicionais i[class|='processar']").hide(); //Ocultando todos elementos de processamento.
        }).fail(function (e) {
            alert("Ocorreu um erro ao se inserir a acao da parte do utilizador autenticado.: \n\n" + e.responseText);
        });
    } else {
        mostrarNotificacaoHss("A  operacao nao foi definida.",
            "Nenhuma verificao vai ser feita no background Provavelmente o id do explicador clicado nao e valido.: " +
            "veja pelo objecto id= "+objectoPorEnviar.idDoExplicador);

    }

}

