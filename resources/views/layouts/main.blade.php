<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Explicadores</title>
    <!-- Inclusão das referencias aos ficheiros css externos -->

    @extends('layouts.includes.links_css')

</head>
<body>
<section id="s_main"> <!-- Main Section starts (hss)-->

    <header id="h_main"> <!-- Header main starts (hss)-->
        @extends('layouts.includes.cabecalho')
    </header> <!-- Header main ends (hss)-->

    <section id="s_main_content" class="container mt-5 pl-10"> <!-- Section main starts (hss)-->

        <div class="row p-0">
            <aside id="as_main_left" class="col-md-2"> <!-- aside main left starts (hss)-->

                @yield('conteudo_esquerdo')

                <div id="processamento" class="d-flex justify-content-md-center col-md-12">
                    <div class="">
                        <i class="fa fa-spinner fa-pulse fa-1x fa-fw"></i>
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>

            </aside> <!-- aside main left ends (hss)-->

            <section id="s_main_center" class="col-md-7 ml-0"> <!-- Section main center starts (hss)-->

                @yield('conteudo_centro')

                <div id="processamento" class="d-flex justify-content-md-center col-md-12">
                    <div class="">
                        <i class="fa fa-spinner fa-pulse fa-1x fa-fw"></i>
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>

            </section> <!-- Section main center ends (hss)-->

            <aside id="as_main_right" class="col-md-3"> <!-- aside main right starts (hss)-->

                @yield('conteudo_direito')

                <div id="processamento" class="d-flex justify-content-md-center col-md-12">
                    <div class="">
                        <i class="fa fa-spinner fa-pulse fa-1x fa-fw"></i>
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>

            </aside> <!-- aside main right ends (hss)-->
        </div>

    </section> <!-- Section ends starts (hss)-->

    <footer id="f_main"> <!-- Footer main starts (hss)-->

    </footer> <!-- Footer main ends (hss)-->

</section> <!-- Main Section ends (hss) -->
<hr>

</body>

@extends('layouts.includes.links_js')

</html>


