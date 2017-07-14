<div class="container-fluid modal fade" tabindex="-1" role="dialog" id="dialog-login">
    <div class="row modal-dialog col-md-2" id="modal-dialog">

        <!-- Formulario de registo do Utilizador -->
        <div class="card-block" id="">
            <form action="dao/processar/processar_registo.php" method="POST" name="form_registo" id="form_registo">
                <!--Header-->
                <div class="text-left">
                    <h4><i class="fa fa-envelope"></i> Crie a sua conta</h4>
                    <hr class="mt-2 mb-2">
                    <!--Facebook-->
                    <a class="icons-sm fb-ic"><i class="fa fa-facebook"> </i></a>
                    <!--Google +-->
                    <a class="icons-sm gplus-ic"><i class="fa fa-google-plus"> </i></a>
                    <hr class="mt-2 mb-2">
                </div>

                <!--Body-->

                <!--Body-->
                <div class="md-form">
                    <i class="fa fa-user prefix"></i>
                    <input type="text" id="r_user_name" name="r_user_name" class="form-control">
                    <label for="r_user_name">Seu nome</label>
                    <i style="" class="form-control-feedback bv-icon-input-group glyphicon glyphicon-remove"
                       data-bv-icon-for="email"></i>

                </div>

                <div class="md-form">
                    <i class="fa fa-envelope prefix"></i>
                    <input type="text" id="r_email" name="r_email" class="form-control">
                    <label for="r_email">Seu email</label>
                </div>

                <div class="md-form">
                    <i class="fa fa-tag prefix"></i>
                    <input type="password" id="r_password" name="r_password" class="form-control">
                    <label for="r_password">Password</label>
                </div>

                <div class="md-form">
                    <i class="fa fa-tag prefix"></i>
                    <input type="password" id="r_password_confirmacao" name="r_password_confirmacao"
                           class="form-control">
                    <label for="r_password_confirmacao">Confirmar Password</label>
                </div>

                <div class="text-center">
                    <button type="submit" class="btn btn-default continuar">Continuar..</button>

                    <div class="">
                        <!-- <br> -->
                        <p>Ja tem uma conta?</p>
                        <br>
                        <a class="entrar">
                            Entrar
                            <span><i class="fa fa-chevron-right "> </i></span>
                        </a>
                    </div>
                </div>
            </form>
        </div>

        <!--                </div>-->
        <!--        Formulario de criacao de login-->


        <!-- Formulario de criacao de perfil-->
        <div class="card-block" id="form_perfil">
            <!-- <form name="form_registo2"> -->
            <div class="col-md-12 text-right voltar">
                <a><span class="text-right"><i class="fa fa-chevron-left"></i> voltar</span></a>
            </div>

            <!--Header-->
            <div class="text-left">
                <br/>
                <h4><i class="fa fa-envelope"></i> Tipo de perfil</h4>

            </div>

            <br>
            <div class="custom-controls-stacked">
                <label class="custom-control custom-radio">
                    <input id="radioStacked1" name="rbEstudante" type="radio" value="Estudante"
                           class="custom-control-input">
                    <span class="custom-control-indicator"></span>
                    <span class="custom-control-description">Perfil Estudante</span>
                </label>
                <label class="custom-control custom-radio">
                    <input id="radioStacked2" name="rbEstudante" type="radio" value="Explicador"
                           class="custom-control-input">
                    <span class="custom-control-indicator"></span>
                    <span class="custom-control-description">Perfil Explicador</span>
                    <input type="hidden" id="tipoLogin" name="tipoLogin" value="tipoLogin">
                </label>
            </div>

            <p style="font-size: 10px;">Perfil pelo qual seras identificado</p>
            <br>

            <div class="text-left">
                <button class="btn btn-default">Registar</button>

            </div>

            <div>
                <p>Crie a sua conta usando uma das redes sociais.</p>
                <br>
                <hr class="mt-2 mb-2">
                <!--Facebook-->
                <a class="icons-sm fb-ic"><i class="fa fa-facebook"> </i></a>
                <!--Google +-->
                <a class="icons-sm gplus-ic"><i class="fa fa-google-plus"> </i></a>
                <hr class="mt-2 mb-2">
            </div>
            <!-- </form> -->
        </div>
        <!--Formulario de criacao de perfil-->

        <!--Formulario de Login-->
        <div class="card-block" id="form_login" action="dao/processar/processar_login.php" method="POST"
             name="form_login">
            <form class="card-block" id="form_login" action="dao/processar/processar_login.php" method="POST"
                  name="form_login">
                <div class="md-form nome_invalido">
                    <i class="fa fa-user prefix nome_invalido"></i>
                    <input type="text" id="l_email" name="l_email" class="form-control">
                    <label for="l_email">email</label>
                </div>

                <div class="md-form">
                    <i class="fa fa-tag prefix"></i>
                    <input type="password" id="l_password" class="form-control senha">
                    <label for="l_password">Password</label>
                </div>

                <div class="text-center">
                    <button class="btn btn-default">Entrar</button>

                    <div class="">
                        <br>
                        <p>Ainda nao criou a sua conta?</p>
                        <br>
                        <a class="criar">
                            <span><i class="fa fa-chevron-left "> </i>Criar</span>
                        </a>
                    </div>
                </div>
            </form>
        </div>
        <!--Formulario de Login-->

    </div>
</div>

