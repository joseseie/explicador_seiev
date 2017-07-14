

{{--Incluindo as dialogs a serem usadas no escopo do programa--}}
@extends('dialogs.dialog_registo')
@extends('dialogs.dialog_login')

<nav class="navbar fixed-top navbar-toggleable-md scrolling-navbar navbar-dark" id="nav-menu">
    <div class="d-flex container justify-content-between">
        <div>
            <a class="navbar-brand explicador-index" href="index.php">
                <strong>eXplicador</strong>
            </a>
        </div>
        <a class="explicadores-voltar m_opt_explicador" href="pages/explicador/listar_explicadores.php"
           style="color: white;"><i class="float-left fa fa-arrow-left fa-2x"></i><h6></h6></a>
        <div class="align-self-center w-75 d-flex justify-content-center">
            <form class="form-inline waves-effect w-75">
                <input placeholder="Pesquisar Explicador" id="pesquisar" class="form-control w-100" type="text"/>
            </form>
        </div>

        <div>
            <style>
                .opcoes-adicionais i {
                    color: white;
                }
                .dropdown-solicitacoes.dropdown-menu,.dropdown-alerts.dropdown-menu {
                    left: -5rem;
                    padding: .2rem 1rem;
                    margin: .3rem 0;
                    font-size: 1rem;
                    color: black!important;
                }
                span {
                 font-size:9pt!important;
                }
                .mensagem-solicitaca {
                    color: black;
                }
                #dropdown-solicitacoes li:hover {
                    background-color: aliceblue;
                }
                #dropdown-solicitacoes a.cancelar:hover{
                    background: #00A0B0;
                    color: white!important;
                }
                #dropdown-solicitacoes a.confirmar{
                    color: green!important;
                }
                #dropdown-solicitacoes a.confirmar:hover {
                    font-weight: bold!important;
                }
                #dropdown-solicitacoes a.cancelar {
                    float: right;
                    height: 1.8rem;
                    font-size: 10pt!important;
                    line-height: inherit;
                    color: brown!important;
                    position: relative;
                    margin-top: -10px;
                }



            </style>


            <ul class="navbar-nav d-flex flex-nowrap flex-row opcoes-adicionais">

                <!-- Codigo ressem adicionado -->

                <ul class="nav navbar-top-links navbar-right ">

                    <!-- /.dropdown -->

                    <li class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">
<!--                            <i class="fa fa-envelope fa-fw"></i> <i class="fa fa-caret-down"></i> Este vai ser para mensagens-->
                            <i class="fa fa-users fa-fw"></i> <i class="fa fa-caret-down"></i>

                        </a>
                        <ul id="dropdown-solicitacoes" class="dropdown-menu dropdown-solicitacoes" style="width:15rem;left: -5rem;padding: .5rem;font-size: .1rem;">


                        </ul>
                        <!-- /.dropdown-messages -->
                    </li>
                    <!-- /.dropdown -->

                    <li class="dropdown"  id="alertas-notificacoes">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">
                            <i class="fa fa-bell fa-fw"></i><i class="fa fa-caret-down"></i>
                        </a>
<!--                        <ul class="dropdown-menu dropdown-alertas" style="width:15rem;left: -5rem;padding: .5rem;font-size: .1rem;">-->
<!--                            <li>-->
<!--                                <a href="#">-->
<!--                                    <div>-->
<!--                                        <i class="fa fa-comment fa-fw"></i><span>9</span> Novas mensagens-->
<!--                                        <span class="pull-right text-muted small">4 minutos atras</span>-->
<!--                                    </div>-->
<!--                                </a>-->
<!--                            </li>-->
<!--                            <li class="divider"></li>-->
<!--                        </ul>-->
                    </li>

                    <li class="dropdown dropdown-menu-loged-off">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                            <i class="fa fa-user fa-fw fa-2x"></i> <i class="fa fa-caret-down"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-user">
                            <li><a data-toggle="modal"
                                   data-target="#dialog-login" class="entrar">
                                    <i class="fa fa-sign-in" aria-hidden="true"></i>
                                    Entrar</a>

                            </li>
                            <li><a href="#" data-toggle="modal"
                                   data-target="#dialog-registo" class="criar dropd-registo">
                                    <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                                    Criar Conta</a>
                            </li>
                            <li class="divider"></li>
<!--                            <li><a href="#"><i class="fa fa-gear fa-fw"></i> Configuracoes</a>-->
<!--                            </li>-->
                        </ul>
                        <!-- /.dropdown-user -->
                    </li>

                    <li class="nav-item div-img-cima dropdown dropdown-menu-loged-in">
                        <a class="waves-effect waves-light exp_perfil_imagem_cima" data-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false">
                            <img id="profile" class="img rounded-circle z-depth-0"
                                 src=""/>
                        </a>
                        <ul class="dropdown-menu ">
                            <li><a href="#" class="index_explicador"><i class="fa fa-user fa-fw"></i> Perfil</a>

                            </li>
                            <li><a data-toggle="modal"
                                   data-target="#dialog-login" class="entrar">
                                    <i class="fa fa-sign-in" aria-hidden="true"></i>
                                    Entrar</a>

                            </li>
                            <li><a href="#" data-toggle="modal"
                                   data-target="#dialog-registo" class="criar dropd-registo">
                                    <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                                    Criar Conta</a>
                            </li>
                            <li class="text-admin"><a href="#" class="dropd-trocar">
                                    <i class="fa fa-compress" aria-hidden="true"></i>
                                    Trocar Perfil</a></li>
                            <li><a href="#">
                                    <i class="fa fa-cog fa-spin fa-1x fa-fw"></i>
                                    Configuracoes</a>
                            </li>
                            <li class="dropdown-divider"></li>
                            <li><a href='' class='dropd-sair'>
                                <i class='fa fa-sign-out' aria-hidden='true'></i>
                                                        Sair</a>
                                                </li> ";
                        </ul>
                    </li>
<!--                    <li class="nav-item">-->
<!--                        <a class="nav-link font-weight-bold ml-1">Login</a>-->
<!--                    </li>-->


                    <!--                     /.dropdown -->
                </ul>

            </ul>
        </div>

    </div>
</nav>

<!--/.Navbar-->
