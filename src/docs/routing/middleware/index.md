# Middleware

Middleware is a piece of code that runs before or after your application processes a request. It helps control the flow of requests and responses. For example, when a user visits a page on your app, you can use middleware can check if the user is logged in and if everything is okay, the request moves on to the next step; if not, the middleware can redirect the user.

Middleware can be used for a variety of tasks, such as authentication, authorization, logging, error handling, session management, and more.

## Middleware in Leaf

Leaf is a modular framework, so we don't throw everything into the core. However, some common middleware are built into respective modules like the Auth module which has middleware for authentication, the CORS module, and the CSRF module which come with their own implementation.

We recommend that you always check the module documentation to see if it offers the functionality you need before attempting to write your own middleware. You'll find just what you need in a module about 90% of the time.

Also, this page only covers how to use middleware in Leaf Core, if you are using Leaf MVC, you can check the [Leaf MVC Middleware](/docs/routing/middleware/mvc) page.

With that out of the way, let's see how to use middleware in Leaf.

## Creating Middleware

In Leaf, middleware are just functions that are loaded into Leaf. Here's an example of a simple middleware that logs the request method and URI:

```php
$logRequest = function () {
  $method = request()->method();
  $uri = request()->uri();

  echo "[$method] $uri\n";
}
```

To use this middleware, you can pass it to the `use()` method on the Leaf instance:

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

Passing middleware as a route option will run the middleware only for that route or group of routes. You can pass a single middleware or an array of middleware to the `middleware` option.

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

This will run the `$middleware` function before the route handler for the `/home` route and all routes in the `/admin` group. This way, you won't have to run middleware for routes you don't need it for.

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

It is necessary in some cases to pass data from middleware to the route handler. You can do this using the `response()->next()` method.

```php{8}
app()->registerMiddleware('logRequest', function ($next) {
  $method = request()->method();
  $uri = request()->uri();

  echo "[$method] $uri\n";

  // pass data to the next handler
  response()->next('You can pass any value here');
});
```

This uses Leaf's Response object to output data from the middleware that can only be accessed by your next handler (hence the name `next`). You can access that data in your route handler using the `request()->next()` method.

```php{2}
app()->get('/home', ['middleware' => 'logRequest', function () {
  $middlewareData = request()->next();

  echo $middlewareData; // "You can pass any value here"
}]);
```

Once the data is read using `request()->next()`, it is removed from the request object and cannot be accessed again during the request lifecycle.
