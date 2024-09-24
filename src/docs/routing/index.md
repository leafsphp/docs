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
