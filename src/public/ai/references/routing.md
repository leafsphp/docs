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

// Constraint: placeholder must match the regex after the colon
app()->get('/movies/{id:[0-9]+}/photos/{photoId:[0-9]+}', function ($movieId, $photoId) {
    echo 'Movie #' . $movieId . ', photo #' . $photoId;
});
```

> Raw regex patterns like `/movies/(\d+)` are NOT supported in Leaf 5 — patterns without `{}` placeholders are treated as literal paths. Always use named placeholders.

## Optional Parameters

```php
// /posts and /posts/1 both match — give optional params a default value
app()->get('/posts/{id?}', function ($id = null) {
    echo $id ? 'Post #' . $id : 'All posts';
});

// Optional + constraint: ? goes after the name, before the constraint
app()->get('/posts/{id?:[0-9]+}', function ($id = null) {
    echo $id ? 'Post #' . $id : 'All posts';
});

// Chained optionals
// Matches /blog, /blog/2024, /blog/2024/01, /blog/2024/01/slug
app()->get('/blog/{year?:[0-9]{4}}/{month?:[0-9]{2}}/{slug?}', function (
    $year = null, $month = null, $slug = null
) {
    if (!$year)  { echo 'Blog overview'; return; }
    if (!$month) { echo 'Year overview'; return; }
    if (!$slug)  { echo 'Month overview'; return; }
    echo 'Post: ' . htmlentities($slug);
});
```

## Matching Order

Exact routes always beat dynamic routes regardless of registration order (`/users/new` wins over `/users/{id}`). Between overlapping dynamic routes, the one registered first wins — register more specific dynamic routes before broader ones.

