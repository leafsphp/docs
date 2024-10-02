<!-- markdownlint-disable no-inline-html -->
# Middleware

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

<!-- <VideoDocs
  subject="Watch the middleware guide on youtube"
  description="Leaf how to use middleware in your leaf apps."
  link="https://www.youtube.com/embed/BTcUgeOZLyM"
/> -->

## What is middleware?

Middleware is a piece of code that runs before or after your application processes a request. It helps control the flow of requests and responses. For example, when a user visits a page on your app, you can use middleware can check if the user is logged in and if everything is okay, the request moves on to the next step; if not, the middleware can redirect the user.

Note that Leaf has modules that offer most of these functionalities out of the box, so you might not need to write your own middleware for them.

## How does middleware work?

Middleware is a concept that is used in many frameworks, and they have different ways of implementing it. Leaf's implementation is based on the concept of middleware stacks. A middleware stack is a list of middleware that are executed in a specific order. The order is important because each middleware can perform a task and pass the request to the next middleware in the stack. This is how middleware works in Leaf.

When a request is made to your application, Leaf will run through the middleware stack and execute each middleware. After the middleware stack is done, Leaf will then execute the route handling function. This is a rough overview of how middleware works in Leaf, however, for a more in-depth explanation, you can check out the video by [Codecourse](https://www.codecourse.com).

<VideoDocs
  title="How Middlware Works"
  subject="How Middlware Works"
  description="A low level overview of how middleware runs in your favourite framework. Starting with a simple app example, we'll build a middleware manager, add middleware to a stack, and run it."
  link="https://www.youtube.com/embed/Hqk9yUJfRKg"
/>

## Creating Middleware

In Leaf, middleware are just functions that are loaded into Leaf. Here's an example of a simple middleware that logs the request method and URI:

```php
$logRequest = function () {
  $method = request()->method();
  $uri = request()->uri();

  echo "[$method] $uri\n";
}
```

To use this middleware, you can pass it to the use() method on the Leaf instance:

```php
app()->use($logRequest);
```

Or you can write this together:

```php
app()->use(function () {
  $method = request()->method();
  $uri = request()->uri();

  echo "[$method] $uri\n";
});
```

Using middleware this way will run the middleware for every request. If you only want to run the middleware for specific routes, you can pass the middleware as a route option.

## Middleware as a route option

Passing middleware as a route option will run the middleware only for that route or group of routes. You can pass a single middleware or an array of middleware to the middleware option.

```php
$middleware = function () {
  $method = request()->method();
  $uri = request()->uri();

  echo "[$method] $uri\n";
};

app()->get('/home', ['middleware' => $middleware, function () {
  echo 'Home page';
}]);

app()->group('/admin', ['middleware' => $middleware, function () {
  app()->get('/', function () {
    echo 'admin dashboard';
  });

  app()->get('/users', function () {
    echo 'admin users';
  });
});
```

This will run the $middleware function before the route handler for the /home route and all routes in the /admin group. This way, you won't have to run middleware for routes you don't need it for.

## Registering Middleware

It's a bit bulky to write your middleware inline every time you need it. Leaf allows you to register middleware globally so you can use it anywhere in your app.

```php
app()->registerMiddleware('logRequest', function () {
  $method = request()->method();
  $uri = request()->uri();

  echo "[$method] $uri\n";
});
```

We can now use this middleware in our routes:

```php
// using middleware for all routes
app()->use('logRequest');

// using middleware for a specific route
app()->get('/home', ['middleware' => 'logRequest', function () {
  echo 'Home page';
}]);

// using middleware for a group of routes
app()->group('/admin', ['middleware' => 'logRequest', function () {
  app()->get('/', function () {
    echo 'admin dashboard';
  });

  app()->get('/users', function () {
    echo 'admin users';
  });
});
```

Notice how we passed the middleware name as a string instead of the actual function. This is because we registered the middleware with a name. This makes it easier to manage middleware in your app.

## Passing data from middleware

It is necessary in some cases to pass data from middleware to the route handler. Leaf allows you to pass data from middleware to the route handler using the `response()->next()` method.

```php
app()->registerMiddleware('logRequest', function ($next) {
  $method = request()->method();
  $uri = request()->uri();

  echo "[$method] $uri\n";

  // pass data to the next handler
  response()->next('You can pass any value here');
});
```

The data passed to the $next function will be available in the route handler:

```php
app()->get('/home', ['middleware' => 'logRequest', function () {
  $middlewareData = request()->next();

  echo $middlewareData; // "You can pass any value here"
}]);
```

## Router Hooks

Hooks basically allow you to hook into Leaf router and execute a callback at a given time. For instance, you can execute a function just before Leaf fires off routes. You can also execute a callback before the main middleware executes or even after Leaf has completely executed a route.

There are 6 hooks that you can now use with Leaf router listed below in execution order:

**It doesn't matter the order in which you define hooks. Leaf router will run them in the correct order.**

### `router.before`

This hook runs before Leaf router begins any operations, even before app middleware are triggered.

<div class="class-mode">

```php
$app->hook('router.before', function () {
  // do something
});
```

</div>
<div class="functional-mode">

```php
app()->hook('router.before', function () {
  // do something
});
```

</div>

### `router.before.route`

This hook runs just after the app middleware have run, just before the route specific middleware.

<div class="class-mode">

```php
$app->hook('router.before.route', function () {
  // do something
});
```

</div>
<div class="functional-mode">

```php
app()->hook('router.before.route', function () {
  // do something
});
```

</div>

### `router.before.dispatch`

This hook runs just before routes are dispatched.

<div class="class-mode">

```php
$app->hook('router.before.dispatch', function () {
  // do something
});
```

</div>
<div class="functional-mode">

```php
app()->hook('router.before.dispatch', function () {
  // do something
});
```

</div>

### `router.after.dispatch`

This hook runs just after routes are dispatched.

<div class="class-mode">

```php
$app->hook('router.after.dispatch', function () {
  // do something
});
```

</div>
<div class="functional-mode">

```php
app()->hook('router.after.dispatch', function () {
  // do something
});
```

</div>

### `router.after.route`

This hook runs after Leaf router has finished up with routing and cleaning up, just before the execution of internal code.

<div class="class-mode">

```php
$app->hook('router.after.route', function () {
  // do something
});
```

</div>
<div class="functional-mode">

```php
app()->hook('router.after.route', function () {
  // do something
});
```

</div>

### `router.after`

This hook runs when leaf completely finishes route execution and cleans up on the internal code as well. This is the last thing Leaf router does before exiting.

<div class="class-mode">

```php
$app->hook('router.after', function () {
  // do something
});
```

</div>
<div class="functional-mode">

```php
app()->hook('router.after', function () {
  // do something
});
```

</div>

::: tip Note
Unlike the above hooks, `router.after` can be directly assigned by passing a function into Leaf router's `run` method.

<div class="class-mode">

```php
$app = new Leaf\App;

// define routes

$app->run(function () {
  echo "Final thing to run";
});
```

</div>
<div class="functional-mode">

```php
// define routes

app()->run(function () {
  echo "Final thing to run";
});
```

</div>

Also note that the final function may return a value for further use if need be.

<div class="class-mode">

```php
$time = $app->run(function () {
  return Leaf\Date::now();
});

saveToLogs("app finished executing", $time);
```

</div>
<div class="functional-mode">

```php
$time = app()->run(function () {
  return Leaf\Date::now();
});

saveToLogs("app finished executing", $time);
```

</div>

:::
