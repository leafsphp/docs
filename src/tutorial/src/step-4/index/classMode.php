<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App();

$app->get('/', function () {
  // 1. json output
});

$app->get('/markup', function () {
  // 2. markup output
});

$app->get('/page', function () {
  // 3. page output
});

$app->get('/redirect', function () {
  // 4. redirect output
});

$app->get('/redirected', function () {
  echo 'redirected here';
});

$app->run();
