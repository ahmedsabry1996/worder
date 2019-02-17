<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
           <link rel="stylesheet" href="{{asset('css/sws.css')}}" />
          <link rel="stylesheet" href="{{asset('css/animate.css')}}" />
          <link rel="stylesheet" href="{{asset('css/app.css')}}" />    
      <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">

          <title>Worder</title>
    </head>
    <body>

        <div id="app">

          <home-page></home-page>
                  <vue-progress-bar></vue-progress-bar>
              </div>
              <script  src="{{asset('js/app.js')}}">
      </script>

    </body>
</html>
