# Creating routes with shortcuts

In the last tutorial, we created routes using GET or POST, but typing that for every route can get repetitive. To make things easier, Leaf offers shortcut methods for a quicker, simpler way to define routes.

You can directly call an [HTTP method](https://restfulapi.net/http-methods/) on the leaf instance. Let's look at an example:

```php{6,11}
<?php

require __DIR__ . '/vendor/autoload.php';

// for a get request
app()->get('/', function () {
  echo "Something nice";
});

// for a post request
app()->post('/', function () {
  echo "Something nice";
});

// don't forget to call run
app()->run();
```

This works for all the HTTP methods you can think of. You can call `get()`, `post()`, `put()`, `patch()`, `delete()`, `options()`, ...

Your task this time is to create a PUT request using the shortcut method.

- Create a route which uses the PUT HTTP method
- The route should have the path `/`
- **Replace `// 1. put route here` with your route**
- Update the `method` option in the `request.json` file to `PUT` to test your route

## Custom route paths

Just as we did in the last exercise, you can create routes with custom paths. This can be anything you want, like `/login`, `/auth/login`, or `/user/login`. After running your first route, try changing the path to something of your choice.

- Create a route with a custom path
- **Replace `// 2. custom path route here` with your route**
- Update the `path` option in the `request.json` file to the path you want to run
- Update the `method` option in the `request.json` file to the method you want to test your route with
