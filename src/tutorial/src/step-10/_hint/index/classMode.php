<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App();
$db = new Leaf\Db;

$db->connect(
  'eu-cdbr-west-03.cleardb.net',
  'heroku_fb1311a639bb407',
  'b9607a8a6d5ebb',
  'cc589b17'
);

$app->get('/', function () {
  echo "hello world";
});

$app->put('/custom', function () {
  echo "custom route";
});

$app->run();
