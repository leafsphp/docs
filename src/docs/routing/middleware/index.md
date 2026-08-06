# Middleware

<!-- markdownlint-disable no-inline-html -->

<section class="not-prose my-10 overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
  <div class="grid gap-0 2xl:grid-cols-[1fr_0.9fr]">
    <div class="border-b border-neutral-200 p-6 sm:p-8 2xl:border-b-0 2xl:border-r dark:border-neutral-800">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">Request pipeline</p>
      <h1 class="m-0 text-3xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-4xl">Run checks before your route does the real work.</h1>
      <p class="!m-0 !mt-4 text-base leading-7 text-neutral-600 dark:text-neutral-400">Middleware lets you protect routes, shape requests, attach context, and short-circuit bad traffic without burying that logic inside every handler.</p>
    </div>
    <div class="bg-neutral-50 p-6 dark:bg-neutral-900/60 sm:p-8">
      <div class="rounded-lg border border-neutral-200 bg-white p-4 font-mono text-sm text-neutral-700 dark:border-neutral-800 dark:bg-black dark:text-neutral-300">
        <div>app()-&gt;use('auth');</div>
        <div class="mt-3 text-neutral-500">request -&gt; middleware -&gt; route -&gt; response</div>
      </div>
      <div class="mt-4 rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
        <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">Using Leaf MVC?</p>
        <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">MVC has a dedicated middleware guide with route files and controller-friendly examples.</p>
        <a class="mt-3 inline-flex text-sm font-semibold text-[var(--vp-c-brand-1)] no-underline" href="/docs/routing/middleware/mvc">Open MVC middleware -&gt;</a>
      </div>
    </div>
  </div>
</section>

## Middleware in Leaf

Leaf is a modular framework, so we don't throw everything into the core. However, some common middleware are built into respective modules like the Auth module which has middleware for authentication, the CORS module, and the CSRF module which come with their own implementation.

We recommend that you always check the module documentation to see if it offers the functionality you need before attempting to write your own middleware. You'll find just what you need in a module about 90% of the time.

Also, this page only covers how to use middleware in Leaf Core, if you are using Leaf MVC, you can check the [Leaf MVC Middleware](/docs/routing/middleware/mvc) page.

With that out of the way, let's see how to use middleware in Leaf.

## Creating Middleware

In Leaf, middleware are just functions that are loaded into Leaf. Here's an example of a simple middleware that logs the request method and URI:

```php
$logRequest = function () {
  $method = request()->getMethod();
  $uri = request()->getPath();

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
  $method = request()->getMethod();
  $uri = request()->getPath();

  echo "[$method] $uri\n";
});
```

Using middleware this way will run the middleware for every request. If you only want to run the middleware for specific routes, you can pass the middleware as a route option.

## Middleware as a route option

Passing middleware as a route option will run the middleware only for that route or group of routes. You can pass a single middleware or an array of middleware to the `middleware` option.

```php
$middleware = function () {
  $method = request()->getMethod();
  $uri = request()->getPath();

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
  $method = request()->getMethod();
  $uri = request()->getPath();

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
  $method = request()->getMethod();
  $uri = request()->getPath();

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

## Middleware with MVC

There's a separate guide for middleware in Leaf MVC. It covers the same ideas, with more detail and MVC-specific examples.

<div class="not-prose my-6 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/60">
  <a class="text-sm font-semibold text-[var(--vp-c-brand-1)] no-underline" href="/docs/routing/middleware/mvc">Go to MVC middleware -&gt;</a>
</div>
