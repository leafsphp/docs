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
}]);
```

Or you can directly pass the middleware in like this:

```php
$middleware = function () {
  // some middleware operation here
};

app()->group('/user', ['middleware' => $middleware, function () {
  app()->get('/', fn () => response()->markup('no user id'));

  app()->get('/(\d+)', fn ($id) => response()->markup("user $id"));
}]);
```

## Named groups <Badge type="tip" text="NEW" />

Groups can carry a `name` that prefixes every named route inside them — so related routes share a clean, hierarchical naming scheme:

```php
app()->group('/admin', ['name' => 'admin', function () {
  app()->get('/dashboard', ['name' => 'dashboard', 'AdminController@dashboard']);

  app()->group('/reports', ['name' => 'reports', function () {
    app()->get('/{id}', ['name' => 'show', 'ReportsController@show']);
  }]);
}]);

app()->route('admin.dashboard');            // /admin/dashboard
app()->route('admin.reports.show', ['id' => 9]); // /admin/reports/9
```

Resource routes name themselves automatically (`users.index`, `users.show`, `users.edit`, ...), and those names compose with group names too:

```php
app()->group('/admin', ['name' => 'admin', function () {
  app()->resource('/users', 'UsersController');
}]);

app()->route('admin.users.index');           // /admin/users
app()->route('admin.users.edit', ['id' => 3]); // /admin/users/3/edit
```

## Subfolder Support

Leaf runs in any subfolder without adjustments to your code: when your app is deployed under `/subdir/` and requests actually arrive as `/subdir/...`, the router detects that base path and mounts your routes onto it automatically. Detection is honest about context — if the request URLs don't live under your script's folder (like with `php -S` or the CLI), nothing is stripped, so local development never eats URI segments.

If you want full control, override detection manually with `setBasePath()` — including `setBasePath('')` for "no base path at all":

```php
// Override auto base path detection
app()->setBasePath('/whatever/path/you/want');

app()->get('/', function () { echo 'Index'; });
app()->get('/hello', function () { echo 'Hello!'; });

app()->run();
```
