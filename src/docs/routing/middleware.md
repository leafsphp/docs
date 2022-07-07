# Middleware
<!-- markdownlint-disable no-inline-html -->

<!-- ::: info Video Docs
Leaf how to use middleware in your leaf apps.

<VideoLesson href="#" title="Middleware in leaf PHP">Watch the middleware guide on youtube</VideoLesson>
::: -->

Middleware are just methods that run before your code runs, be it a particular route or your whole application. Unlike many other frameworks and systems, Leaf gives you the opportunity to set global middleware that run before any and every route.

::: warning Using middleware outside Leaf
All the examples below assume you are using leaf router in a leaf app, and so use leaf's instance of the router with `$app` or `app()`. If you're however using Leaf router outside leaf, you can replace `$app`/`app()` with `Leaf\Router`.
:::

## Before Route Middlewares

This type of middleware runs before a particular route is invoked. To get started, simply pass in the route you want to run the middleware before.

Like route handling functions, you hook a handling function to a combination of one or more HTTP request methods and a specific route pattern.

<div class="class-mode">

```php
$app->before('GET|POST', '/admin/.*', function () {
  if (!isset($_SESSION['user'])) {
    header('location: /auth/login');
    exit();
  }
});
```

</div>
<div class="functional-mode">

```php
app()->before('GET|POST', '/admin/.*', function () {
  if (!isset($_SESSION['user'])) {
    header('location: /auth/login');
    exit();
  }
});
```

</div>

::: tip Note
Unlike route handling functions, more than one before route middleware is executed when more than one route match is found.

<div class="class-mode">

```php
$app->before('GET|POST', '/admin/.*', function () {
  if (!isset($_SESSION['user'])) {
    header('location: /auth/login');
    exit();
  }
});

$app->before('GET|POST', '/admin/.*', function () {
  if (!isset($_SESSION['user_secret'])) {
    header('location: /auth/login');
    exit();
  }
});
```

</div>
<div class="functional-mode">

```php
app()->before('GET|POST', '/admin/.*', function () {
  if (!isset($_SESSION['user'])) {
    header('location: /auth/login');
    exit();
  }
});

app()->before('GET|POST', '/admin/.*', function () {
  if (!isset($_SESSION['user_secret'])) {
    header('location: /auth/login');
    exit();
  }
});
```

</div>

:::

Using this same concept, you can run your middleware on every route. We call this before router middleware.

## Before Router Middlewares

Before route middlewares are route specific. Using a general route pattern (viz. all URLs), they can become Before Router Middlewares (in other projects sometimes referred to as before app middlewares) which are always executed, no matter what the requested URL is.

<div class="class-mode">

```php
$app->before('GET', '/.*', function () {
  // ... this will always be executed
});
```

</div>
<div class="functional-mode">

```php
app()->before('GET', '/.*', function () {
  // ... this will always be executed
});
```

</div>

As you can see, the only difference between before route and before router middleware is the route pattern.

## Middleware route option

This is a new way to quickly setup middleware for a particular route. Leaf has the before method which allows you to set a route specific middleware, but that means defining the same route twice, not to mention, you may mistake the middleware for the main route as they have the same syntax. This problem is solved by the middleware option. **If your prefer using `before`, you can always do so.**

Let's take this function which we're using as our middleware:

```php
$midfn = function () {
  echo 'Home middleware';
};
```

We can use this middleware directly on our route like this:

<div class="class-mode">

```php
$app->get('/home', ['middleware' => $midfn, function () {
  echo 'User Home';
}]);
```

</div>
<div class="functional-mode">

```php
app()->get('/home', ['middleware' => $midfn, function () {
  echo 'User Home';
}]);
```

</div>

## App middleware

This type of middleware uses the `Leaf\Middleware` class under the hood. It provides a more structured way to define and use middleware in your apps. It allows you to define middleware classes as done in other frameworks like Laravel. This fits right in if you intend to build MVC applications.

::: warning Usage outside Leaf
Since `Leaf\Middleware` is part of Leaf's core, this type of middleware can't be used without Leaf. We suggest you use router hooks or before router middleware above if you're building without Leaf core.
:::

Using this method, you define your middleware class which should extend the `Leaf\Middleware` class. After that, your middleware code should be defined in the `call` method as done below:

```php
class TestMiddleware extends Leaf\Middleware
{
    public function call()
    {
        echo "my test middleware";

        $this->next();
    }
}
```

One thing to note is your `call` method should always call `$this->next()`. This forwards the incoming request to the next middleware or your application if there's no other middleware.

After defining the middleware, the next step is to tell Leaf to actually run your middleware. To do this, you can simply call the `use` method on the Leaf instance.

<div class="class-mode">

```php
$app = new Leaf\App();

$app->use(new TestMiddleware);
```

</div>
<div class="functional-mode">

```php
app()->use(new TestMiddleware);
```

</div>

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
