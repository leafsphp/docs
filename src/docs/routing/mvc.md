# Routing in Leaf MVC

Leaf MVC uses the Leaf router to handle routing, but adds a few extra features to make routing easier and more powerful. If you are not familiar with the Leaf router, you can check out the [Leaf router documentation](/docs/routing/). It will take about a minute to familiarize yourself with the router.

## Adding Routes

Leaf MVC comes with an `app/routes` folder that organizes all your route files. The `app/routes/index.php` file is the entry point for all your routes and contains the setup for 404s, maintenance mode and other global route settings.

To create a new route, add a file that starts with `_` to the `app/routes` folder. For example, you can create a file called `app/routes/_auth.php` and add all your authentication routes to it. This file will be automatically loaded by Leaf MVC, and all the routes in it will be available in your app.

If you don't want a file in the `app/routes` folder to be automatically loaded, create a file that doesn't start with `_`. For example, you can create a file called `app/routes/custom.php` and add all your routes to it. This file will **NOT** be automatically loaded by Leaf MVC, and you'll have to load it manually.

## Using Controllers

In Leaf MVC, controllers provide a way to organize your application's logic. They are a great way to keep your routes file clean and easy to read. Controllers are just classes that implement the `App\Controllers\Controller` class. You can find more information about controllers in the [Controllers](/docs/mvc/controllers) document. This document will focus on how to link controllers to routes.

Let's take this example: you have a controller called `app/controllers\HomeController.php`:

```php
<?php

namespace App\Controllers;

class HomeController extends Controller
{
    public function index()
    {
        response()->json([
            'message' => 'HomeController@index output'
        ]);
    }
}
```

You can link this controller to a route by passing a string containing your controller name and method to your route. The string should be in the format `controllerName@methodName`.

```php
app()->get('/', 'HomeController@index');
```

You don't have to worry about the namespace of your controller (the `App\Controllers` part). Leaf MVC will automatically add the namespace for you.

## Updating Error Screens

If you need to set up custom error responses, you can do so in the `app/routes/index.php` file. We have loaded examples for 404 and 500 error pages. You can customize these to your liking.

```php
/*
|--------------------------------------------------------------------------
| Set up 404 handler
|--------------------------------------------------------------------------
|
| Leaf provides a default 404 page, but you can also create your
| own 404 handler by calling app()->set404(). Whatever function
| you set will be called when a 404 error is encountered
|
*/
app()->set404(function () {
  response()->json('Resource not found', 404, true);
});

/*
|--------------------------------------------------------------------------
| Set up 500 handler
|--------------------------------------------------------------------------
|
| Leaf provides a default 500 page, but you can create your own error
| 500 handler by calling the setErrorHandler() method. The function
| you set will be called when a 500 error is encountered
|
*/
app()->setErrorHandler(function () {
  response()->json('An error occured, our team has been notified', 500, true);
});
```
