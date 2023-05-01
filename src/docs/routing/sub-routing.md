# Sub-routing
<!-- markdownlint-disable no-inline-html -->

Use `app()->mount($baseroute, $fn)` or `app()->group` to mount a collection of routes onto a subroute pattern. The subroute pattern is prefixed onto all following routes defined in the scope. e.g. Mounting a callback $fn onto `/movies` will prefix `/movies` onto all following routes.

<div class="functional-mode">

```php
app()->mount('/movies', function () {
  // will result in '/movies/'
  app()->get('/', function () {
    echo 'movies overview';
  });

  // will result in '/movies/id'
  app()->get('/(\d+)', function ($id) {
    echo 'movie id ' . htmlentities($id);
  });
});
```

</div>
<div class="class-mode">

```php
$app->mount('/movies', function () use($app) {
  // will result in '/movies/'
  $app->get('/', function () {
    echo 'movies overview';
  });

  // will result in '/movies/id'
  $app->get('/(\d+)', function ($id) {
    echo 'movie id ' . htmlentities($id);
  });
});
```

</div>

Nesting of subroutes is possible, just define a second `mount` or `group` in the callback function that's already contained within a preceding `mount` or `group`.

<div class="functional-mode">

```php{1,10}
app()->group('/user', function () {
  app()->get('/', function () {
    response()->markup('no user id');
  });

  app()->get('/(\d+)', function ($id) {
    response()->markup("user $id");
  });

  app()->mount('/settings', function () {
    app()->get('/privacy', function () {
      response()->markup('Privacy Settings');
    });

    app()->get('/notification', function () {
      response()->markup("Notification Settings");
    });
  });
});
```

</div>
<div class="class-mode">

```php
$app->group('/user', function () use($app) {
  $app->get('/', function () use($app) {
    $app->response()->markup('no user id');
  });

  $app->get('/(\d+)', function ($id) use($app) {
    $app->response()->markup("user $id");
  });

  $app->mount('/settings', function () use($app) {
    $app->get('/privacy', function () use($app) {
      $app->response()->markup('Privacy Settings');
    });

    $app->get('/notification', function () use($app) {
      $app->response()->markup("Notification Settings");
    });
  });
});
```

</div>

## Group Namespaces

You can now select namespaces for individual groups of routes. Usually, a namespace is given to all your routes, however, a group may need a different namespace for it's controllers and that is what Leaf gives you.

<div class="functional-mode">

```php
app()->setNamespace("App\Controllers");

app()->group("/user", ["namespace" => "Lib\Controllers", function () {
    // controller here will be Lib\Controllers\FormsController
    app()->get("/form", "FormsController@index");
}]);

// controller here will be App\Controllers\FormsController
app()->get("/form", "FormsController@index");
```

</div>
<div class="class-mode">

```php
$app->setNamespace("App\Controllers");

$app->group("/user", ["namespace" => "Lib", function () use($app) {
  // controller here will be Lib\FormsController
  $app->get("/form", "FormsController@index");
}]);

// controller here will be App\Controllers\FormsController
$app->get("/form", "FormsController@index");
```

</div>
