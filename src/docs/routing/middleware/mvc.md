# Middleware in Leaf MVC

Middleware is a piece of code that runs before or after your application processes a request. It helps control the flow of requests and responses. For example, when a user visits a page on your app, you can use middleware can check if the user is logged in and if everything is okay, the request moves on to the next step; if not, the middleware can redirect the user.

Before you use middleware, Leaf has modules that offer a lot of functionality that you might not need to write your own middleware for. Be sure to check out the [Leaf Modules](/docs/modules) page first to see if there's a module that already does what you need.

## Creating Middleware

In Leaf MVC, middleware are just classes that extend the `Leaf\Middleware` class. Here's an example of a middleware that logs the request method and URI:

```php
<?php

namespace App\Middleware;

use Leaf\Middleware;

class LogRequestMiddleware extends Middleware
{
    public function call()
    {
        $method = request()->method();
        $uri = request()->uri();

        echo "[$method] $uri\n";
    }
}
```

Of course, you don't have to do this manually. You can use the Aloe Console to generate a middleware for you:

```bash:no-line-numbers
php leaf g:middleware LogRequest
```

This will generate a `LogRequestMiddleware.php` file in the `app/middleware` folder.

## Loading Middleware for all routes

All middleware generated using the Console will be automatically registered in the `app/middleware/Middleware.php` file. This file is automatically loaded by Leaf MVC, so any middleware you add to it will be loaded for every route in your application. If you don't want a middleware to be automatically loaded, you can remove it from the `app/middleware/Middleware.php` file.

```php
<?php

namespace App\Middleware;

class Middleware
{
    public function register()
    {
        return [
            LogRequestMiddleware::class
        ];
    }
}
```

## Loading Middleware for specific routes

If you don't want a middleware to be loaded for all routes in your application, you need to remove it from the `app/middleware/Middleware.php` file and load it manually in the route you want to use it in.

```php
<?php

use App\Middleware\LogRequestMiddleware;

app()->get('/my-route', ['middleware' => LogRequestMiddleware::class, 'MyController@index']);
```

This will run the `LogRequestMiddleware` middleware only for the `/my-route` route.

## Passing data from middleware

You can pass data from middleware to your route handler in order to use it in your controller. All Leaf middleware  accept a `$next` parameter which is a closure that runs the next middleware in the stack. You can pass data to the next middleware by passing it as an argument to the `$next` closure.

```php
<?php

namespace App\Middleware;

use Leaf\Middleware;

class LogRequestMiddleware extends Middleware
{
    public function call($next)
    {
        $method = request()->method();
        $uri = request()->uri();

        echo "[$method] $uri\n";

        // pass data to the next handler
        $next('You can pass any value here');
    }
}
```

You can then access this data in your controller like this:

```php
<?php

namespace App\Controllers;

class MyController extends Controller
{
    public function index()
    {
        $middlewareData = request()->next();

        echo $middlewareData; // will output "You can pass any value here"
    }
}
```