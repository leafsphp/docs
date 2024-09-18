# Intro to creating routes

Leaf's core has a simple, built-in router that lets you define routes easily without extra setup.

Defining a route in Leaf is easy: just tell Leaf which HTTP methods (like GET or POST) should be allowed to access the route you're creating.

This can be done using the **`match()`** function. It accepts the [HTTP methods](https://restfulapi.net/http-methods/) which should be able to access that route, the [route path](https://www.toolsqa.com/rest-assured/rest-routes/) and the handler for that route.

The handler is a function which you define yourself:

```php{5-7}
<?php

require __DIR__ . '/vendor/autoload.php';

app()->match('GET', '/', function () {
  echo "Something nice";
});
```

After defining your routes, you need to call the **`run()`** method which dispatches all the routes and makes them available to run:

```php{9}
<?php

require __DIR__ . '/vendor/autoload.php';

app()->match('GET', '/', function () {
  echo "Something nice";
});

app()->run();
```

On the right, you have a structure which has an empty slot for your routes.

- Create a route which has the path `/`
- **Replace `// 1. match route here` with your route**

## Route paths

Route paths are usually descriptive, like /login or /auth/login, to show what they do. After running your first route, try changing the path to something of your choice.

Don't forget to update the `path` option in the `request.json` file in the editor to the path you want to run.

## Routes with multiple HTTP methods

Some routes can use both GET and POST requests. Leaf lets you create routes for multiple methods by separating them with `|`. For example, `GET|POST` allows both methods for the same route.

```php
app()->match('GET|POST', '/', function () {
  echo "works with both get and post";
});
```

Your task this time is to create a route which supports both POST and PUT requests.

- Create a route which supports both POST and PUT requests
- Update the `path` option in the `request.json` file to the path you want to run
- Update the `method` option in the `request.json` file to `POST` or `PUT` to test your route
