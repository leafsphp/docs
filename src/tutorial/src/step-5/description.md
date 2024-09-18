# Leaf request

In the last exercise, we explored Leaf response. Now, let’s look at the Leaf request object, which helps you get information coming into your app.

Leaf makes this easy with straightforward methods. To use the request object, just call the `request()` function anywhere in your app.

```php
<?php

require __DIR__ . '/vendor/autoload.php';

// for a get request
app()->get('/', function () {
  $data = request()->get('name');
  response()->json($data);
});

app()->run();
```

For this exercise, we've populated some data which will be passed into your app in the `request.json` file. You can edit it to get different data in your app.

## Returning all data passed in your app

Whenever a user interacts with your app, they pass in data. This data can be in the form of a get request, post request, url encoded data, files, etc.

Leaf allows you to get every bit of data passed into your app all at once using the `body()` method.

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  $data = request()->body();
  response()->json($data);
});

app()->run();
```

You can try this out in the editor.

## Getting a particular item from the request

Although we have an entire pool of data being passed in, sometimes you need to grab one item from the request. Leaf allows you to do this using the `get()` method.

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  $data = request()->get('name');
  response()->json($data);
});

app()->run();
```

In the editor, try getting the `country` field from the request.

- Create a route which gets the `country` field from the request
- **Replace `// 1. your app here` with your code**
- Get the `country` field from the request
- Output the `country` field using the `json` method

## Getting multiple items from the request

You can retrieve items from the request one by one, but sometimes you might need a couple of items from the request for a specific task.

Leaf allows you to retrieve all these items using the same `get()` method. But instead of passing in a string, you pass an array of items you want to get.

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  $data = request()->get(['name', 'country']);
  response()->json($data);
});

app()->run();
```

In the editor, try retrieving the `country` and `city` fields.

- Create a route which gets the `country` and `city` fields from the request
- **Replace `// 1. your app here` with your code**
- Get the `country` and `city` fields from the request
- Output the `country` and `city` fields using the `json` method
