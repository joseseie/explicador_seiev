
function  adicionarDisciplina(objecto) {
    var disciplina = $('#disciplinas > *:first-child').clone();
    disciplina.css('display', 'block');
    disciplina.find(".disciplina").html(objecto.nome);
    disciplina.appendTo($('#disciplinas'));
}



function inicializarDisciplina() {
    // alert($('$processar').text());
    $.get('pages/disciplinas/ProcessarDisciplina.php', function (result) {
        var objectos = JSON.parse(result);
        $.each(objectos, function (chave, valor) {
            adicionarDisciplina(valor);
        });
    });
}