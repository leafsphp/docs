# Leaf 5 — Middleware Reference

## Global Middleware (all routes)

```php
// Closure — Basic/Lite style
app()->use(function () {
    echo request()->method() . ' ' . request()->uri();
});

// Class — MVC style
use App\Middleware\LogRequestMiddleware;
app()->use(LogRequestMiddleware::class);
app()->use(AnotherMiddleware::class);  // stack multiple
```

## Route-Level Middleware

```php
// Named (registered globally)
app()->registerMiddleware('auth', function () {
    if (!auth()->user()) response()->redirect('/login');
});

app()->get('/home', ['middleware' => 'auth', function () { /* ... */ }]);

// Class
app()->get('/my-route', ['middleware' => LogRequestMiddleware::class, 'MyController@index']);

// Inline closure
$mw = function () { echo request()->method(); };
app()->get('/home', ['middleware' => $mw, function () { echo 'Home'; }]);
app()->group('/admin', ['middleware' => $mw, function () {
    app()->get('/', function () { echo 'dashboard'; });
}]);
```

> Use closures in Basic/Lite. Use classes in MVC.

## MVC Middleware Class

Generate with: `leaf g:middleware LogRequest`

```php
namespace App\Middleware;
use Leaf\Middleware;

class LogRequestMiddleware extends Middleware {
    public function call() {
        $method = request()->method();
        $uri    = request()->uri();
        echo "[$method] $uri\n";
    }
}
```

## Passing Data from Middleware → Handler

Use `response()->next()` to pass data, `request()->next()` to read it.
Data is consumed on first read and removed from the request lifecycle.

### Closure version

```php
app()->registerMiddleware('logRequest', function ($next) {
    echo request()->method();
    response()->next('You can pass any value here');
});

app()->get('/home', ['middleware' => 'logRequest', function () {
    $data = request()->next();  // "You can pass any value here"
    echo $data;
}]);
```

### MVC class version

```php
class LogRequestMiddleware extends Middleware {
    public function call($next) {
        echo request()->method();
        response()->next('You can pass any value');
    }
}

class MyController extends Controller {
    public function index() {
        $data = request()->next();  // "You can pass any value"
        echo $data;
    }
}
```
