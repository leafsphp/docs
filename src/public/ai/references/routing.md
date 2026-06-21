# Leaf 5 — Routing Reference

## Basic Methods

```php
app()->get('/home', function () { /* ... */ });
app()->post('/home', function () { /* ... */ });
app()->put('/home', function () { /* ... */ });
app()->patch('/home', function () { /* ... */ });
app()->delete('/home', function () { /* ... */ });
app()->options('/home', function () { /* ... */ });

app()->match('GET|POST', '/users', function () { /* ... */ });

app()->run();  // dispatch — always call at the end
```

## Controllers (MVC)

```php
app()->get('/home', 'HomeController@index');
app()->get('/home', ['name' => 'home', 'HomeController@index']);
```

## Views & Inertia

```php
app()->view('/home', 'home');       // configured template engine
app()->inertia('/home', 'Home');    // Inertia (React/Vue/Svelte)
```

## 404 Handler

```php
app()->set404(function () {
    response()->json(['error' => 'Page not found']);
});
```

## Route Options

Pass an array before the handler to set metadata (name, middleware, sitemap options, etc.):

```php
app()->get('/home', ['name' => 'home', function () {
    $route = app()->getRoute();
    // $route: pattern, path, name, method, handler, + any custom options
    echo $route['name'];
}]);
```

## Named Routes & Redirects

```php
app()->get('/home', ['name' => 'home', function () { /* ... */ }]);

response()->redirect(['home']);         // by route name
response()->redirect('/login');         // by path
response()->redirect('https://x.com'); // external

$route = app()->route('home');          // get route info by name
```

## Route Groups

```php
// Basic prefix group
app()->group('/admin', function () {
    app()->get('/', function () { echo 'dashboard'; });
    app()->get('/users', function () { echo 'users'; });
});

// Group with options (namespace, middleware, etc.)
app()->group('/admin', ['namespace' => 'MyNameSpace', function () {
    app()->get('/form', 'FormsController@index');  // → MyNameSpace\FormsController@index
}]);

// Group with middleware
app()->group('/admin', ['middleware' => 'auth', function () {
    app()->get('/', function () { echo 'dashboard'; });
}]);
```

## Dynamic Routes

```php
// Named parameter
app()->get('/movies/{movieId}', function ($id) {
    echo 'Movie #' . $id;
});

// Multiple parameters
app()->get('/movies/{foo}/photos/{bar}', function ($movieId, $photoId) {
    echo 'Movie #' . $movieId . ', photo #' . $photoId;
});

// Regex
app()->get('/movies/(\d+)/photos/(\d+)', function ($movieId, $photoId) {
    echo 'Movie #' . $movieId . ', photo #' . $photoId;
});
```

## Optional Sub-patterns

```php
// /post/1 and /post/1/edit both match
app()->get('/post/{id}(/edit)?', function ($post, $edit = null) {
    echo 'Post';
    if ($edit) echo ' — editing';
});
```

> The leading `/` of the optional part must be **inside** the sub-pattern.

### Regex optional sub-patterns

```php
// Matches /blog, /blog/2024, /blog/2024/01, /blog/2024/01/15, /blog/2024/01/15/slug
app()->get('/blog(/\d+)?(/\d+)?(/\d+)?(/[a-z0-9_-]+)?', function (
    $year = null, $month = null, $day = null, $slug = null
) {
    if (!$year)  { echo 'Blog overview'; return; }
    if (!$month) { echo 'Year overview'; return; }
    if (!$day)   { echo 'Month overview'; return; }
    if (!$slug)  { echo 'Day overview'; return; }
    echo 'Post: ' . htmlentities($slug);
});
```

### Nested (successive) optional sub-patterns

The flat version above allows `/blog/somecrazystring` to match. Fix by nesting:

```php
// Only structurally valid URLs match — /blog/somecrazystring will NOT
app()->get('/blog(/\d+(/\d+(/\d+(/[a-z0-9_-]+)?)?)?)?', function (
    $year = null, $month = null, $day = null, $slug = null
) {
    // ...
});
```
