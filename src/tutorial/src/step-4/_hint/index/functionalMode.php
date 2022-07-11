<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  response()->json([
    'greeting' => 'Hello World'
  ]);
});

app()->get('/markup', function () {
  response()->markup('<h2>Hello World</h2>');
});

app()->get('/page', function () {
  response()->page('./page.html');
});

app()->get('/exit', function () {
  response()->exit('something');
  response()->page('./page.html');
});

app()->run();
