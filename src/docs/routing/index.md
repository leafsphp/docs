# Routing

<!-- markdownlint-disable no-inline-html -->

Leaf comes with a powerful router that allows you to define routes for your application. The router is responsible for determining which route should be called and rendering the appropriate view or response. You can take it as one fancy traffic officer that directs traffic to the right place.

## Create a route

Every route has a URL (the web address the user visits) and an HTTP method (like GET, POST, etc.), which tells the server what action to take. For example, if you create a route for a GET request to `/home`, the user can access that page by visiting `http://example.com/home`. This way, different URLs and methods control how users interact with your app.

So to define a route, you need to specify the URL and the HTTP method. Leaf router allows you to do this using `get()`, `post()`, `put()`, `patch()`, `delete()`, ... methods. Let's take a look at them.

## Create a GET route

You can add a route that handles only `GET` HTTP requests with the Leaf router's `get()` method. It accepts two arguments:

- The route pattern
- The route handler

```php
app()->get('/home', function () {
  // your code
});
```

## Create a POST route

You can add a route that handles only `POST` HTTP requests with the Leaf router's `post()` method. It accepts two arguments:

- The route pattern
- The route handler

```php
app()->post('/users/add', function () use($request) {
  $user = $request->get('user');
  // create a new user
});
```

## Create a PUT route

The `put()` method allows you to add a route that handles only `PUT` HTTP requests. It accepts two arguments:

- The route pattern
- The route handler

```php
app()->put('/book/edit/{id}', function ($id) {
  // your code
});
```

## Create a DELETE route

You can add a route that handles only `DELETE` HTTP requests with the Leaf router's `delete()` method. It accepts two arguments:

- The route pattern
- The route handler

```php
app()->delete('/quotes/{id}', function ($id) {
  // delete quote
});
```

## Create a PATCH route

You can add a route that handles only `PATCH` HTTP requests with the Leaf router's `patch()` method. It accepts two arguments:

- The route pattern
- The route handler

```php
app()->patch('/quotes/{id}', function ($id) {
  // update quote
});
```

## Create a multiple method route

There are some cases where you want a route to handle multiple HTTP methods. You can do this using the `match()` method. This method accepts three arguments:

- A list of HTTP methods separated by | (pipe)
- The route pattern
- The route handler

```php
app()->match('GET|POST', '/users', function () {
  // your code
});
```

## Running your routes

After defining all the routes you application needs, you need to start the router to listen for incoming requests. You can do this by calling the `run()` method.

```php
app()->run();
```

## Named routes

In big applications, you might have to reference a route over and over again. When you change the route URL, you'll have to change it everywhere you referenced it. To avoid this, you can name your routes and reference them by their name. This will save you a lot of time and prevent errors.

Leaf router allows you name routes by using route options. Route options allow you to configure a route in a more advanced way. You can set route options by passing an array with configuration options as the second argument to the whatever route you ar e wofking on.

```php
app()->get('/home', ['name' => 'home', function () {
  // your code
}]);
```

## Getting the current route

There are times when you need to get the current route which the user is visiting from inside your route handler. You can do this by calling the `getRoute()` method on the router instance.

```php
app()->get('/home', ['name' => 'home', function () {
  $route = app()->getRoute();
  echo $route['name'];
}]);
```

This method returns an array containing the following information:

- `pattern`: The route pattern
- `path`: The route path
- `name`: The route name
- `method`: The route method
- `handler`: The route handler
- `params`: Dynamic route parameters

## Navigating to another route

There are times when you need to redirect users to another route. For example, after a user logs in, you might want to redirect them to their dashboard. You can do this by calling the `push()` method on the router instance or the `redirect()` method on the response instance.

::: code-group

```php:no-line-numbers [router]
app()->push('/login');
```

```php:no-line-numbers [response]
response()->redirect('/login');
```

:::

If your route has a name, you can navigate to it by passing the route name in an array to the `push()` method.

```php:no-line-numbers
app()->push(['home']);
```

## Routing in Leaf MVC

Leaf MVC comes with an `app/routes` folder that organizes all your route files. The `app/routes/index.php` file is the entry point for all your routes and contains the setup for 404s, maintenance mode and other global route settings.

To create a new route, add a file that starts with `_` to the `app/routes` folder. For example, you can create a file called `app/routes/_auth.php` and add all your authentication routes to it. This file will be automatically loaded by Leaf MVC, and all the routes in it will be available in your app.

If you don't want a file in the `app/routes` folder to be automatically loaded, create a file that doesn't start with `_`. For example, you can create a file called `app/routes/custom.php` and add all your routes to it. This file will **NOT** be automatically loaded by Leaf MVC, and you'll have to load it manually.

### Controllers

Beyond that, Leaf MVC uses controllers to handle routes instead of closures. This means you can create a controller for each route and handle the route logic in the controller. You can learn more about controllers in the [Controller section.](/docs/mvc/controllers)

### Updating Error Screens

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
