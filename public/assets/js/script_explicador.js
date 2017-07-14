/**
 * Created by José Seie on 5/19/2017.
 */

$(document).ready(function () {

    var urlSession = '../../dao/processar/processar_sessions.php';
    $.post(urlSession, {estado: "email"}, function (email) {

        if (typeof email !== 'undefined' && ("Sessao nao iniciada!" !== email) && email.length > 0) {

            var url = '../../dao/processar/processar_utilizador.php';

            informacoesBasicas(url, email, "Explicador"); //Metodo que preenche a tela do explicador  com as informacoes basicas.

            $('.explicador_opcoes.card').hide();

        } else {
            ocultar(false);
            alert("Nenhuma sessao foi iniciada");
        }
    });

    actulizarVisibilidade();

    //Quando o explicador estiver no seu perfil, aqui atribuimos evento de click na
    // classe que lhe redireciona ao index principal enquanto esta logado.

    vinculaEventos();

    $(".explicador-index").bind('click', function (e) {
        e.preventDefault();
        window.location.href = "../../index.php";
    });

});



