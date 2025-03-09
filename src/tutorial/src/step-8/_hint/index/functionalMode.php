<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  $validatedData = request()->validate([
    'name' => 'string',
    'country' => ['string', 'min:2'],
    'city' => 'string',
    'email' => 'email',
  ]);

  response()->json(
    $validatedData ?: request()->errors()
  );
});

app()->run();
