/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(function () {
    $("input[value='Salvar']").bind('click',function () {
        alert("Clicoun..");
    })
})

if(document.getElementById("wizard-picture") != null) {
    document.getElementById("wizard-picture").onchange = function (e) {
        if (e.target.files != null && e.target.files.length != 0) {

            var ficheiro = e.target.files[0];
            var fd = new FormData();

            fd.append("fotografia", ficheiro);
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
                    alert(xmlhttp.responseText);
            };
            xmlhttp.open("POST", "processar_img_perfil.php", true);
            xmlhttp.send(fd);
        }


    };
}