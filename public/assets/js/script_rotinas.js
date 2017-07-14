/**
 * Created by José Seie on 6/14/2017.
 */

function verSolicitacoesEnvidas(operacao) {

    ver_mais = '<li><a class="text-center ver-mais" href="#"><strong>Ver todas solicitacoes</strong><i class="fa fa-angle-right"></i>'+
                '</a></li>';

    $('.dropdown-menu.dropdown-solicitacoes').parent().hide();

    var urlProcSolicitacoes = (/pages/i.test(window.location)) ? '../../dao/processar/processar_solicitacoes.php' : 'dao/processar/processar_solicitacoes.php';
    $.post(urlProcSolicitacoes, {op: operacao}, function (result) { //Verifica se o perfil e do Administrador para que alterar alguns opcoes para ele.

        console.log(result);

        if(result.length > 0) { //Verificando se o utilizador logado possui alguma solicitacao.

            $('.dropdown-menu.dropdown-solicitacoes').parent().show();

            $.each(result, function (k, v) { //Compondo  as solicitacoes para que sejam visualizadas.
                elemento = "";

               if($('.dropdown-menu.dropdown-solicitacoes li').length <= 4) {

                   elemento = '<li><a href="#" class="confirmar-explicacao">' +
                       '<div><strong class="nome" val="'+v.idExplicador+'">' + v.nome_do_explicador + '</strong>' +
                       '<span class="pull-right text-muted data-solicitacao" >' +
                       '<em>' + v.data_solicitacao + '</em>' +
                       '</span></div>' +
                       '<div class="mensagem-solicitaca"> ' + v.mensagem + '' +
                       '</div></a>' +
                       '<a class="cancelar">Cancelar</a>' +
                       '</li>';

                   $('.dropdown-solicitacoes').append(elemento);
                   $('.dropdown-solicitacoes').append('<li class="divider"></li>');
               } else {
                   elemento = '<li class="ocultar"><a href="#" class="confirmar-explicacao">' +
                       '<div><strong class="nome" val="'+v.idExplicador+'">' + v.nome_do_explicador + '</strong>' +
                       '<span class="pull-right text-muted data-solicitacao" >' +
                       '<em>' + v.data_solicitacao + '</em>' +
                       '</span></div>' +
                       '<div class="mensagem-solicitaca"> ' + v.mensagem + '' +
                       '</div></a>' +
                       '<a class="cancelar">Cancelar</a>' +
                       '</li>';

                   $('.dropdown-solicitacoes').append(elemento);
                   $('.dropdown-solicitacoes').append('<li class="divider ocultar"></li>');

               }
            });

            (result.length > 3) ? $('.dropdown-solicitacoes').append(ver_mais) : "";

        } else {
            $('.dropdown-solicitacoes').parent().hide();
        }

    },"JSON").done(function () {

        $('.ver-mais').bind('click',function (e) {

            $('li.ocultar').show();
            $(this).hide();

            $('#dialog_notificacoes .mensagem-info').empty();
            $('.ver-mais').remove();
            $('#dialog_notificacoes .modal-body').html($('.dropdown-solicitacoes').clone());
            // $('#dialog_notificacoes').modal('show');
            // $('#dialog_notificacoes').modal('modal.');

            // $('#dialog_notificacoes').on('hidden.bs.modal', function (e) {
            //     $('#dialog_notificacoes').modal(false);
            // })
            return false;

        });
        $('.dropdown-solicitacoes a').bind('click',function () {
            alert($(".nome").val()+" : e o valor id da div clicada.")
        })

        $('li.ocultar').hide()


    }).fail(function (e) {
        console.log("Nao foi possivel buscar as solicitacoes do utilizador autenticado.\n"+e.responseText);
        $('.dropdown-solicitacoes').parent().hide();
    });

}

function verSolicitacoesRecebidas(operacao) {

    ver_mais = '<li><a class="text-center ver-mais" href="#"><strong>Ver todas solicitacoes</strong><i class="fa fa-chevron-right"></i>'+
        '</a></li>';

    $('.dropdown-menu.dropdown-solicitacoes').parent().hide();

    var urlProcSolicitacoes = (/pages/i.test(window.location)) ? '../../dao/processar/processar_solicitacoes.php' : 'dao/processar/processar_solicitacoes.php';
    $.post(urlProcSolicitacoes, {op: operacao}, function (result) { //Verifica se o perfil e do Administrador para que alterar alguns opcoes para ele.

        if(result.length > 0) { //Verificando se o utilizador logado possui alguma solicitacao.

            $('.dropdown-menu.dropdown-solicitacoes').parent().show();

            $.each(result, function (k, v) { //Compondo  as solicitacoes para que sejam visualizadas.
                elemento = "";

                if($('.dropdown-menu.dropdown-solicitacoes li').length <= 4) {

                    elemento = '<li><a href="#" class="confirmar-explicacao">' +
                        '<div><strong class="nome" val="'+v.id+'">' + v.nome_do_estudante + '</strong>' +
                        '<span class="pull-right text-muted data-solicitacao" >' +
                        '<em>' + v.data_solicitacao + '</em>' +
                        '</span></div>' +
                        '<div class="mensagem-solicitaca"> ' + v.mensagem + '' +
                        '</div></a>' +
                        '<a class="confirmar" val="'+v.id+'" style="font-weight: bold;color: green;">Confirmar</a>' +
                        '<a class="cancelar">Cancelar</a>' +
                        '</li>';

                    $('.dropdown-solicitacoes').append(elemento);
                    $('.dropdown-solicitacoes').append('<li class="divider"></li>');
                } else {
                    elemento = '<li class="ocultar"><a href="#" class="confirmar-explicacao">' +
                        '<div><strong class="nome" val="'+v.id+'">' + v.nome_do_estudante + '</strong>' +
                        '<span class="pull-right text-muted data-solicitacao" >' +
                        '<em>' + v.data_solicitacao + '</em>' +
                        '</span></div>' +
                        '<div class="mensagem-solicitaca"> ' + v.mensagem + '' +
                        '</div></a>' +
                        '<a class="confirmar" val="'+v.id+'" style="font-weight: bold;color: green;">Confirmar</a>' +
                        '<a class="cancelar">Cancelar</a>' +
                        '</li>';

                    $('.dropdown-solicitacoes').append(elemento);
                    $('.dropdown-solicitacoes').append('<li class="divider ocultar"></li>');

                }
            });

            // $('.dropdown-solicitacoes').remove('.ver_mais');

            (result.length > 3) ? $('.dropdown-solicitacoes').append(ver_mais) : "";

            addQtdSolicitacoes(result.length,"sss","recebidas");

        } else {
            $('.dropdown-solicitacoes').parent().hide();
        }

    },"JSON").done(function () {

        $('.ver-mais').bind('click',function (e) {

            $('li.ocultar').show();
            $(this).hide();

            $('#dialog_notificacoes .mensagem-info').empty();
            $('#dialog_notificacoes .modal-body').html($('.dropdown-solicitacoes').clone());
            // $('#dialog_notificacoes').modal('show');
            // $('#dialog_notificacoes').modal('modal.')
            //
            // $('#dialog_notificacoes').on('hidden.bs.modal', function (e) {
            //     $('#dialog_notificacoes').modal(false);
            // })
            return false;

        });
        $('.dropdown-solicitacoes a.confirmar').bind('click',function () {
           var idDaAulaSolicitada = $(this).attr('val');

            var urlProcSolicitacoes = (/pages/i.test(window.location)) ? '../../dao/processar/processar_solicitacoes.php' : 'dao/processar/processar_solicitacoes.php';
            $.post(urlProcSolicitacoes, {op: "registarConfirmacao",idDaAulaSolicitada:idDaAulaSolicitada}, function (msg) {
                alert(msg);

                verSolicitacoesRecebidas("buscarTodasRecebidas"); //Para refrescar as  solicitacoes

            }).fail(function (e) {
                console.log("Ocorreu um erro: \n"+e);
            });
        })

        $('li.ocultar').hide()


    }).fail(function (e) {
        console.log("Nao foi possivel buscar as solicitacoes do utilizador autenticado.\n"+e.responseText);
        // alert("Nao foi possivel buscar as solicitacoes do utilizador autenticado.\n"+e.responseText);
        $('.dropdown-solicitacoes').parent().hide();
    });

}

function verificarMensagens() {

    var urlProcessarMsg = (/pages/i.test(window.location)) ? '../../dao/processar/processar_mensagens.php' : 'dao/processar/processar_mensagens.php';
    $.post(urlProcessarMsg, {op: "buscarMensagensRecebidas"}, function (r) {

        console.log(r);

        if(r.length > 0){
            var horas = '';
            $('#alertas-notificacoes').show();

            $.each(r,function (k,v) {

                horas = v.data_mensagem;

            })

            $('#alertas-notificacoes').show();
            addQtdMessagens(r.length,horas,"recebidas");

        } else if($('#alertas-notificacoes ul').length === 0){

            $('#alertas-notificacoes').hide();
        }

    },'JSON').fail(function (e) {
        console.log("Ocorre um erro no no mmetodo\nverificarMensagensRecebidas\n"+e.responseText);
    });


}


function ocultarOpcoesDoMenu() {

    $('#profile').attr('src','img/img_default.png'); //para mudar a foto do perfil.

    var urlSession = (/pages/i.test(window.location)) ? '../../dao/processar/processar_sessions.php' : 'dao/processar/processar_sessions.php';
    $.post(urlSession, {estado: "perfil"}, function (perfl) { //Verifica se o perfil e do Administrador para que alterar alguns opcoes para ele.

        if((perfl === "Explicador" ||  perfl === "Estudante" ||  perfl === "Administrador")){
            $('.dropdown-menu-loged-in').show();
            $('.dropdown-menu-loged-off').hide();
        } else {
            $('.dropdown-menu-loged-in').hide();
            $('.dropdown-menu-loged-off').show();
        }

    });

}

function addQtdSolicitacoes(qtd,horas,tipo) {

    var elemento =  '<ul class="dropdown-menu dropdown-alertas total-s" style="width:15rem;left: -5rem;padding: .5rem;font-size: .1rem;"><li>'+
                    '<a href="#"><div>  <i class="fa fa-comment fa-fw"></i><span>'+qtd+'</span> solicitacoes '+tipo+''+
                    '<span class="pull-right text-muted small">'+horas+'</span>'+
                    '</div></a></li><li class="divider"></li></ul>';

    $('li#alertas-notificacoes').append(elemento);
    $('total-s').css('display','block');


}

function addQtdMessagens(qtd,horas,tipo) {

    // $('#alertas-notificacoes').empty();
    var elemento = '<ul class="dropdown-menu dropdown-alertas" style="width:15rem;left: -5rem;padding: .5rem;font-size: .1rem;"><li>'+
        '<a href="#"><div>  <i class="fa fa-comment fa-fw"></i><span>'+qtd+'</span> mensagens '+tipo+''+
        '<span class="pull-right text-muted small">'+horas+'</span>'+
        '</div></a></li><li class="divider"></li></ul>';

    $('li#alertas-notificacoes').append(elemento);

}



