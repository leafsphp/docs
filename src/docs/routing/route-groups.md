# Route Groups

When defining routes, you may find that you are repeating the same route parameters for multiple routes. While this is fine, it can be a bit cumbersome. Route groups allow you to share route attributes, such as middleware or URL segments, across a large number of routes without needing to define those attributes on each individual route.

You can create route groups by calling the `group()` method on the leaf instance. The `group()` method accepts two parameters:

- the path to the group
- callback function which contains all the routes in the group.

```php
app()->group('/admin', function () {
  app()->get('/', function () {
    echo 'admin dashboard';
  });

  app()->get('/users', function () {
    echo 'admin users';
  });
});
```

## Adding options to a group

You can add route options to a group by passing an array of options as the second parameter to the `group()` method instead of a callback function. This array should contain the options you want to add to the group.

```php
app()->group('/admin', ['namespace' => 'MyNameSpace', function () {

  // this will be 'MyNameSpace\FormsController@index'
  app()->get('/form', 'FormsController@index');

}]);
```

This works for namespaces, middleware, and other route options.

## Group middleware

You can add middleware that should run on every route in a group by passing the middleware as a route option to the group. This middleware will run before any middleware defined on the individual routes.

```php
app()->registerMiddleware('auth', function () {
  if (!auth()->user()) {
    response()->redirect('/login');
  }
});

app()->group('/admin', ['middleware' => 'auth', function () {
  app()->get('/', function () {
    echo 'admin dashboard';
  });

  app()->get('/users', function () {
    echo 'admin users';
  });
});
```

Or you can directly pass the middleware in like this:

```php
$middleware = function () {
  // some middleware operation here
};

app()->group('/user', ['middleware' => $middleware, function () {
  app()->get('/', function () {
    response()->markup('no user id');
  });

  app()->get('/(\d+)', function ($id) {
    response()->markup("user $id");
  });
});
```

## Subfolder Support

Leaf will run in any subfolder you place it into without a need for any adjustments to your code. You can freely move your entry script `index.php` around, and the router will automatically adapt itself to work relatively from the current folder's path by mounting all routes onto that base path.

While this is okay for most cases, there are very rare cases when you might want to disable this feature. This is possible by manually overriding the base path using `setBasePath()`.

```php
// Override auto base path detection
app()->setBasePath('/whatever/path/you/want');

app()->get('/', function () { echo 'Index'; });
app()->get('/hello', function () { echo 'Hello!'; });

app()->run();
```
