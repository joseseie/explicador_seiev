/**
 * Created by José Seie on 5/17/2017.
 */

/**
 * Este metodo e chamado nos eventos da dialog tratados no ficheiro: funcoes.js
 * Estes  sao usados para validar os dados que serao gravados na BD.
 * @returns {boolean}
 */
function validarDadosDoRegisto() {

    var user_name = $('form #reg_user_name').val();
    var password = $('form #reg_password').val();
    var email = $('form #reg_email').val();

    var res = !false;

    if (!((/^[a-zA-Z0-9_ ]+$/.test(user_name)) && (user_name.toString().length > 2))) {
        alert("O nome digitado e invalido");
        res = false;
    }
    var regex = /^([\w-]+(\.[\w-]+)*)@(([\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(\.[a-z]{2})?)$/i;
    if (!(regex.test(email) && (email.toString().length > 2))) {
        alert("Email invalido  ");
        res = false;
    }
    if (!(password.toString().length > 0)) {
        alert("Digite uma senha valida");
        res = false;
    } else if (!(password === $('#reg_password_confirmacao').val())) {
        alert("As senhas nao correspondem ");
        res = false;
    }
    return res;

}


function perfilESubmissao() {

    // Recuperar o formulario
    var $form = $("#reg_form_registo");

    console.log($form.serialize());

    //Buscando o tipo de perfil selecionado.
    $("#reg_form_perfil #tipoLogin").val($("input[type=radio][name=rbEstudante]:checked").val());
    var perfilDoUtilizador = $("#reg_form_perfil #tipoLogin").val() + "";

    if (perfilDoUtilizador.toString().length > 0) {

        $.post($("#reg_form_registo").attr("action"), $form.serialize(), function (result) { //Envio dos dados pelo ajax para a criacao da conta.

            if ((/Entrar: Conta criada/i.test(result.toString()))) { //Caso a conta tiver  sido criada com sucesso.

                var urlProcessarUt = 'dao/processar/processar_utilizador.php'; //Esta URL e do ficheiro que vai processar/verificar a autenticidade do utilizador.

                utilizadorAutenticado(urlProcessarUt, $('#reg_email').val(), perfilDoUtilizador);

            } else if ((/Duplicate entry/i.test(result.toString()))) { //Caso o nome de utilizador ou o email ja existam.

                if (/@/i.test(result.toString())) {
                    alert("Ja existe um utilizador com este email.");
                    // bv.updateStatus("email", "INVALID", "stringLength"); //status
                } else {
                    alert("Ja existe um utilizador registado com este nome.\n\n" + result);
                }

                //Testando se houve. 1. Excepcao                    2. Algum erro nao esperado.
            } else { //Entra aqui se tiver havido algum erro nao previsto.
                alert('     Lamentamos imenso.\n' +
                    'Nao foi possivel criar conta de login neste momento, tente mais tarde!\n\n' +
                    'Informamos que o problema esta sendo monitorado. sera brevemente resolvido.\n\n' + result);
            }


        });
    } else {
        alert("Selecione o perfil desejado!");
    }

}

