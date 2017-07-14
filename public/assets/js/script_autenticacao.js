/**
 * Created by José Seie on 7/14/2017.
 */

$(function () {
    vincularEvtDialogLogin();
})

/**
 * Este metodo vincula eventos, sobre as classes que controlam a dialog login e dialog criar conta.
 * oculta tambem alguns formulario que se encontram dentro da dialog mostrando apenas o formulario actual (Login ou criar).
 * estas dialog estao definidas no ficheiros cabecalho.blade.php
 */
function vincularEvtDialogLogin() {
    // alert("Metodo que vincula eventos na dialog chamado.");
    //Implentacao para dialog Login.
    $("#form_login").hide();
    $("#form_perfil").hide();
    $("#form_registo").hide();

    //Eventos dos dropdowns do menu sobre a dialog

    $(".voltar").bind('click', function () { //Tratamento do click do botao do dialog login no  modal de login

        $("#form_perfil").hide('slow', function () {

            $("#form_registo").show('slow');

        });
    });


    $(".criar").on('click', function () {
        // alert("Teste , funcionando. "+$(this).text());
        $("#form_login").hide('slow', function () {

            $("#form_registo").show('slow');

        });
    });


    $(".entrar").bind('click', function () {
        vincularEvtsDeValidacaoDeLogin();
        $("#form_registo").hide('slow', function () {
            $("#form_perfil").hide('slow',function () {
                $("#form_login").show('slow');
            });
        });
    });


    //Controladores sobre as opçoes de cadastro.
    $('.dropd-registo').bind('click', function (e) {

        $('#reg_form_login').hide();
        $('#reg_form_perfil').hide();

        $("#reg_form_perfil, #reg_form_registo").bind('submit', function () {
            return false;
        });

        $('#dialog-registo').modal(true);
        $('#dialog-registo').on('shown.bs.modal', function () {

            $('#reg_form_registo button').bind('click', function (e) {
                e.preventDefault();

                var res = validarDadosDoRegisto();

                if (res) {
                    $('#reg_form_registo').hide(1000);
                    $('#reg_form_perfil').show(1000);
                    $('.voltar').click(function () {
                        $('#reg_form_registo').show('slow');
                        $('#reg_form_perfil').hide('slow');
                    });
                    $('#reg_form_perfil button').click(perfilESubmissao);
                }
            })
        });


        return false;
    });

}


