<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="{{asset('css/sws.css')}}" />
          <link rel="stylesheet" href="{{asset('css/animate.css')}}" />
          <title>WORDS SPA</title>

    </head>
    <body>
        <div id="app">

          <home-page></home-page>
                  <vue-progress-bar></vue-progress-bar>
        </div>
        <script  src="{{asset('js/app.js')}}">
        </script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/css/bootstrap.min.css" />

    </body>
</html>
