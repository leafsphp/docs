---
title: "Basic routing"
---

# Routing
<!-- markdownlint-disable no-inline-html -->

::: info
Leaf router is now separated from Leaf and is now available as an installable module via composer or the leaf cli.
:::

Leaf router uses a single root file, to which all the server requests are redirected, it then takes these requests and matches them to rules you have defined. The results are then displayed to the user. It's actually a very simple concept.

To make things simpler, we tied leaf router directly to the leaf instance, so once you initialize leaf, you can use routing.

<!-- ::: info Video Docs
Watch how to use the leaf router in your leaf applications.

<VideoLesson href="#" title="Routing in leaf PHP">Watch the routing guide on youtube</VideoLesson>
::: -->

Note that you can now use Leaf router outside of a leaf app. To do this, simply install the leaf router module:

```sh
composer require leafs/router
```

or

```sh
leaf install router
```

After this, you can use all of leaf router's functionality with the router class below.

## Router class

The router class is the interface you interact with to perform any routing actions in your app. Leaf core directly integrates with the router class, which means that there is no need to use this class directly, if however, you are using leaf router outside of leaf, you will need to use the router class itself.

```php
use Leaf\Router;

Router::get("/", "PagesController@index");

Router::run();
```

## Using a different router in Leaf

Although Leaf integrates leaf router directly, you are free to import and use any router you want.

1. Install whatever you want

```bash
composer require imaginary/router
```

2. Import and use it in your project

```php
// initialise imaginary router
$imr = new Imaginary\Router();

$imr->get("/", function() {
  // you can still use leaf modules
  response()->json(["title" => "hello"]);
});
```

## Creating Routes

::: warning IMPORTANT
From this point onwards, we will assume that you are using Leaf router inside a leaf app, as such, we will use the app syntax:

```php
app()->get('/', function() {...});
```

If however, you are using leaf router outside leaf, simply change `app()`/`$app` to the router class:

```php
Router::get('/', function() {...});
```

:::

You can define application routes using proxy methods on the Leaf\App instance. Leaf supports different types of requests, let's look at them.

### GET

You can add a route that handles only GET HTTP requests with the Leaf router's get() method. It accepts two arguments:

- The route pattern (with optional named placeholders or PCRE based patterns)
- The route callback

```php
app()->get('/home', function() {
  // your code
});
```

### POST

You can add a route that handles only POST HTTP requests with the Leaf router's post() method. It accepts two arguments:

- The route pattern (with optional named placeholders or PCRE based patterns)
- The route callback

```php
app()->post('/users/add', function() use($request) {
  $user = $request->get('user');
  // create a new user
});
```

Using Post Params
View [Request](leaf/v/2.5.0/http/request) for more info on handling params

### PUT requests

You can add a route that handles only PUT HTTP requests with the Leaf router’s put() method. It accepts two arguments:

- The route pattern (with optional named placeholders or PCRE based patterns)
- The route callback

```php
app()->put('/book/edit/{id}', function($id) {
  // your code
});
```

### DELETE requests

You can add a route that handles only DELETE HTTP requests with the Leaf router's delete() method. It accepts two arguments:

- The route pattern (with optional named placeholders or PCRE based patterns)
- The route callback

```php
app()->delete('/quotes/{id}', function($id) {
  // delete quote
});
```

### OPTIONS requests

You can add a route that handles only OPTIONS HTTP requests with the Leaf router's options() method. It accepts two arguments:

- The route pattern (with optional named placeholders or PCRE based patterns)
- The route callback

```php
app()->options('/quotes/{id}', function($id) {
  // return headers
});
```

### PATCH requests

You can add a route that handles only PATCH HTTP requests with the Leaf router's patch() method. It accepts two arguments:

- The route pattern (with optional named placeholders or PCRE based patterns)
- The route callback

```php
app()->patch('/post/{id}', function($id) {
  // your code
});
```

### ALL requests

You can add a route that handles all HTTP requests with the Leaf router's all() method. It accepts two arguments:

- The route pattern (with optional named placeholders or PCRE based patterns)
- The route callback

```php
app()->all('/post/{id}', function($id) {
  // your code
});
```

### View

**`view` is no longer supported, as Leaf Blade is no longer default in Leaf. You'll have to manually show your views using `get`**

### Resource Routes

This section assumes you've read [working with controllers](leaf/v/2.5.0/routing/controller). In an MVC application, controllers play a major role as they're the bridge between your view and your model.

A resource route simply creates all the routes needed to successfully handle a particular feature. This sounds a bit bleak, let's look at an example.

```php
app()->resource("/posts", "PostsController");

app()->run();
```

The code above is equivalent to this:

```php
app()->match("GET|HEAD", "/posts", "$controller@index");
app()->post("/posts", "$controller@store");
app()->match("GET|HEAD", "/posts/create", "$controller@create");
app()->match("POST|DELETE", "/posts/{id}/delete", "$controller@destroy");
app()->match("POST|PUT|PATCH", "/posts/{id}/edit", "$controller@update");
app()->match("GET|HEAD", "/posts/{id}/edit", "$controller@edit");
app()->match("GET|HEAD", "/posts/{id}", "$controller@show");

app()->run();
```

Resource routes are handled by a [resource controller](leaf/v/2.5.0/routing/controller?id=resource-controller).

### Route "Hooking"

You can add a route that handles a couple of HTTP methods with the Leaf router's match() method. It accepts three arguments:

- The HTTP method(s) seperated by |
- The route pattern (with optional named placeholders or PCRE based patterns)
- The route callback

```php
app()->match('GET|POST', '/people', function() {
  // your code
});
```

### Running your routes

After setting all the routes, you'll need to dispatch the routes. This is achieved through Leaf's run() method.

```php
app()->run();
```

### Route options

This is the biggest change Leaf router has seen over the period of a year. Route options simply allow you to configure the way groups and individual routes by passing in additional parameters. In actual sense, all new features were generated as a result of this single feature. Let's see how it works.

Leaf route handlers are usually callable functions like this:

```php
app()->get("/home", function() {
  echo "User Home";
});
```

Or sometimes controllers, like this:

```php
app()->get("/home", "HomeController@index");
```

This means there was no space to chain additional items to the route, this is solved by route options.

```php
app()->get("/home", ["name" => "home", function() {
    echo "User Home";
}]);
```

When an array is passed into a leaf route as the handler, leaf will take all `key => value` as options for that route, the first non key-value `function` or `controller` in the array is taken as the handler.

```php
app()->get("/form", ["name" => "userForm", "FormsController@index"]);
```

As mentioned before, this feature is also available on groups:

```php
app()->group("/user", ["namespace" => "\\", function () {
    // ...
}]);
```

**This doesn't mean that you should always pass in an array, if you don't need the other options, you can pass in your function or controller directly as you've always done.**

### Naming your routes

From v2.5.0 of Leaf, you can give route names which you can call them with instead of using the path (Inspired by vue-router).

```php
app()->get("/home", ["name" => "home", function() {
  echo "User Home";
}]);
```

### Pushing to a route

This is simply redirecting to a route and can be done using `push`. `push` also allows you to reference the route by it's name instead of it's path.

```php
app()->push("/home");
```

When an array is passed into push, Leaf will search for a route name matching the string in the array and redirect to that route:

```php
// home was defined above
app()->push(["home"]);
```
