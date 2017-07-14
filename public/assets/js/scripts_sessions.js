/**
 * Created by José Seie on 5/27/2017.
 */

/**
 * Criacao de sessao generica, onde esta funcao pode receber ou nao os valores esperados como parametros
 * @param email : Email a ser enviado, principalmente na cricao (login) da/na sessao
 * @param nome : Objecto esperado como parametro para a criacao da sessao.
 * @param estado : Estado que se deve definir, os estados possiveis sao: iniciar, terminar e perfil
 * estes estados serao usados pelo ficheiro processar_sessions.php para saber qual e a operacao desejada neste momento.
 */
function iniciarASessao(email, nome, estado) {

    var url = 'dao/processar/processar_sessions.php';

    var obj = (typeof nome !== "undefined") ? {

            email: email,
            nome: nome,
            perfil: "Explicador",
            estado: estado
        } : {estado: estado};

    $.post(url, obj, function (r) {

        console.log(r);

    });

}

/**
 * Criacao de sessao generica, onde esta funcao pode receber ou nao os valores esperados como parametros
 *
 * @param estado : Estado que se deve definir, os estados possiveis sao: terminar e perfil
 * estes estados serao usados pelo ficheiro processar_sessions.php para saber qual e a operacao desejada neste momento.
 */
function controloSessao(estado,url) {

    if(/pages/i.test(window.location)){ //A verificar se estamos no pages.
        url = "../../"+url;
    }

    var obj = {estado: estado};

    $.post(url, obj, function (r) {

        console.log(r);

    });

}

/**
 * Este metodo recebe por parametro o estado, que e o que se deseja neste momento, de seguida verifica na sessao estes dados.
 * Por exemplo, pode-se enviar como parametro 'email', entao verifica na sessao se existe email definido ou nao.
 * @param estadoo Parametro esperado.
 * @returns {null} Retorno, null caso nao encontre o dado desejado na sessao.
 */

function consultarNaSessao(estadoo) {
    var urlSession = '../../dao/processar/processar_sessions.php';
    $.post(urlSession, {estado: estadoo}, function (dado) {
        $('#val-aux').val(dado);
        // dado;
    });

    // return d;
}

