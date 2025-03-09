# Routing

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoModal from '@theme/components/shared/VideoModal.vue';
import Button from '@theme/components/shared/Button.vue';
</script>

Routing is the foundation of every web application. It's the process of defining the URL structure of your application and how it responds to requests. Leaf comes with a powerful router that simplifies the way you define routes in your application. You can take routing as one fancy traffic officer that directs traffic to the right place.

<VideoModal
  buttonText="Basic routing with Leaf"
  description="In this video, we look at how to create routes for your Leaf application"
  videoUrl="https://www.youtube.com/embed/BWWVR9bSiQ0"
/>

## Create a route

<div
    class="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg sm:max-w-[50%]"
>
    <div
        class="w-full flex md:flex-col bg-gradient-to-br from-pink-500 to-rose-500"
    >
        <div
            class="sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6"
        >
            <h3 class="text-xl font-semibold mb-2 text-shadow !mt-0">
                Using Leaf MVC?
            </h3>
            <p class="font-medium text-rose-100 text-shadow mb-4">
                We've crafted a specialized guide for routing in Leaf MVC. While it's similar to the basic routing in Leaf, it's more detailed and tailored for Leaf MVC.
            </p>
            <Button
                as="a"
                href="/docs/routing/mvc"
                class="mt-auto bg-rose-900 hover:!bg-rose-900 !text-white bg-opacity-50 hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-bold py-2 px-4 inline-flex"
                >Start building</Button
            >
        </div>
        <!-- <div
            class="relative md:pl-6 xl:pl-8 hidden sm:block"
        >
            Hello
        </div> -->
    </div>
    <div
        class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-rose-500 hidden sm:block"
    ></div>
</div>

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
app()->post('/users/add', function () {
  $user = request()->get('user');
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

## Create a view route

If your route needs to return a template without any logic, you can use the `view()` method. This method accepts two arguments:

- The route pattern
- The view file to render

```php
app()->view('/home', 'home');
```

The `view()` method will look for the view file using whatever view engine you have set up in your app. For instance, if you have blade setup, it will look for a file called `home.blade.php`. The template location also depends on your view engine setup.

## Running your routes

After defining all the routes you application needs, you need to start the router to listen for incoming requests. You can do this by calling the `run()` method.

```php
app()->run();
```

## Named routes

In big applications, you might have to reference a route over and over again. When you change the route URL, you'll have to change it everywhere you referenced it. To avoid this, you can name your routes and reference them by their name. This will save you a lot of time and prevent errors.

Leaf router allows you name routes by using route params. They allow you add extra options to your routes like a route name, middleware, etc. You can set route options by passing an array with configuration options as the second argument to the whatever route you are working on.

<VideoModal
  buttonText="Named routes in Leaf"
  description="Route parameters help you define extra options for your application routes, let's take a look"
  videoUrl="https://www.youtube.com/embed/_0B9Zoxgv64"
/>

```php
app()->get('/home', ['name' => 'home', function () {
  // your code
}]);
```

You can then redirect to this route using the route name by passing an array with the route name to the `redirect()` method.

```php:no-line-numbers
response()->redirect(['home']);
```

If you want to get details about a route using its name, you can use the `route()` method.

```php:no-line-numbers
$route = app()->route($routeName);
```

This will return an array containing the following information:

- `pattern`: The route pattern
- `path`: The route path
- `name`: The route name
- `method`: The route method
- `handler`: The route handler
- Any other route options

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

There are times when you need to redirect users to another route. For example, after a user logs in, you might want to redirect them to their dashboard. You can do this by calling the `redirect()` method on the response instance.

```php:no-line-numbers
response()->redirect('/login');
```

If your route has a name, you can navigate to it by passing the route name in an array to the `redirect()` method.

```php:no-line-numbers
response()->redirect(['home']);
```
