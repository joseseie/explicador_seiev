/**
 * Created by José Seie on 5/17/2017.
 */

/*Devido aos bugs dos frameworks de validacao, irei adaptar uma validacao basica.*/
var dados_Validos = true;

/**
 *  Este metodo quando chamado, vincula eventos a alguns elementos das dialogs,  sem ser chamado a dialog nao vai ter o comportamento esperado.
 * Este foi chamado no evento clique da classe .entrar no ficheiro script _dialog_login.js.
 */
function vincularEvtsDeValidacaoDeLogin() {
    
$('#form_login button').bind('click', function () {
    dados_Validos = true;
// alert("Busca segura: Email: "+$('#l_email').val()+" Senha "+$('#l_password').val());
    var regex = /^([\w-]+(\.[\w-]+)*)@(([\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(\.[a-z]{2})?)$/i;
    if (!((regex.test($('#l_email').val())) && ($('#l_email').val().length > 2))) {
        alert("email invalido");
        dados_Validos = false;
    } else if (!(($('#l_password').val().length > 0))) {
        alert("Digite uma senha valida");
        dados_Validos = false;
    }

    return false;
});

    $("#form_perfil, #form_register, #form_login").bind('submit', function () {
        return false;
    });


$("#form_login button").bind('click', function (e) {

    var email = $('input#l_email').val();
    var senha = $('input#l_password').val();

    var $form = $("form#form_login"); //Buscar o formulario

    if (dados_Validos && (email.toString().length > 0) && (senha.toString().length > 0)) {

        var urlProcessarUt = 'dao/processar/processar_utilizador.php'; //Esta URL e do ficheiro que vai processar/verificar a autenticidade do utilizador.

        //Neste metodo fazemos uma consulta na base de dados para saber o perfil do utilizador
        $.post($("#form_login").attr("action"), {"l_email": email, "l_password": senha}, function (perfilRetornado) {

            if (perfilRetornado.toString().length < 15) { //Verificamos o numero de caracters do perfil retornado. Logicamente se for algum erro o numero de caracteres estara acima de 15.

                utilizadorAutenticado(urlProcessarUt, email, perfilRetornado.toString()); //Vamos de seguida armazenar os dados da sessao do utilizador que ja se encontra autenticado.

            } else if (perfilRetornado.toString() === "User Name ou senha invalidos") { //Quando a user name ou senha forem invalidos. O usuario nao existe.

                alert(perfilRetornado);

            } else { //Entra aqui se tiver havido algum erro nao previsto.

                alert("Nao foi possivel fazer login, tente mais tarde.\n\n" + perfilRetornado.toString());
            }


        });
    } else {
        alert("Preencha os dois campos!");
    }
});

}

function utilizadorAutenticado(url_processar, email, perfil) {

    var url_go = (perfil === "Explicador") ? "pages/explicador/index.php" :
        (perfil === "Administrador") ? "pages/admin/admin.php" : "";

    // if(perfil === "Administrador") window.location.href = url_go;

    $.post(url_processar, {email: email, perfil: perfil, buscar: 'identificacao'}, function (o) { //Com o email do explicador  vai buscar os dados basicos . buscar: e o comando para saber o que queremos, perfil: usado para pesquisar exactamente naquela tabela.

        console.log(o);

        $.post("dao/processar/processar_sessions.php", {
            email: email, nome: o.nome, perfil: perfil,
            id:o.id,estado: "iniciar"
        }, function (r) { //A enviar os dados basicos do utilizador para serem armazanados na sessao.

            if ("Sessao iniciada com sucesso" === r.toString() && (perfil === "Explicador" || perfil === "Administrador")) {

                informacoesBasicas('dao/processar/processar_utilizador.php', email, perfil);

                window.location.href = url_go; //Melhorar esta implementacao.

            } else if ("Sessao iniciada com sucesso" === r.toString() && perfil === "Estudante") {

                // alert('Sessao iniciada com sucesso');
                location.reload(true);

            } else {
                alert('A sessao , nao  foi iniciada com sucesso!!\n\n' + r);
            }

            return false;
        });
    },'json').fail(function (responseData, textStatus, errorThrown) {
        alert("Ocorreu um erro.  responseData= "+responseData+" errorThrown= "+errorThrown);
    });

}




