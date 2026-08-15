# Routing

<!-- markdownlint-disable no-inline-html -->

<div class="not-prose mt-6 overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.02]">
  <div>
    <div class="border-b border-black/10 p-6 dark:border-white/10 md:p-8">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--vp-c-brand-1)]">HTTP routing</p>
      <div class="text-2xl font-semibold tracking-[-0.03em] text-neutral-950 dark:text-neutral-50 md:text-3xl">Turn URLs into application behavior with a tiny, readable router.</div>
      <p class="!m-0 !mt-4 max-w-2xl text-base leading-7 text-neutral-600 dark:text-neutral-400">Leaf routes define the URL, HTTP method, and handler for each request. The API stays small enough to read quickly, while still supporting named routes, redirects, 404 handling, dynamic routes, middleware, groups, and MVC controllers.</p>
      <div class="mt-6 overflow-hidden rounded-lg border border-black/10 bg-neutral-950 dark:border-white/10">
        <div class="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div class="flex items-center gap-2">
            <span class="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]"></span>
            <span class="h-2.5 w-2.5 rounded-full bg-[#ffd166]"></span>
            <span class="h-2.5 w-2.5 rounded-full bg-[#2dd4bf]"></span>
          </div>
          <span class="font-mono text-xs text-neutral-500">routes/index.php</span>
        </div>
        <div class="overflow-x-auto p-5 font-mono text-sm leading-7 text-neutral-100">
          <div>app()-&gt;get('/home', function () {</div>
          <div class="pl-4 text-neutral-400">return response()-&gt;json(['ok' =&gt; true]);</div>
          <div>});</div>
        </div>
      </div>
    </div>
    <div class="bg-neutral-50 p-6 dark:bg-white/[0.03] md:p-8">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">Routing covers</p>
      <div class="grid gap-3 md:grid-cols-3">
        <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">Methods</p>
          <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">GET, POST, PUT, PATCH, DELETE, and multi-method routes.</p>
        </div>
        <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">Flow</p>
          <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Names, redirects, current route data, custom 404s, and middleware.</p>
        </div>
        <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">AI context</p>
          <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Routes are one of the first maps assistants use to understand an app.</p>
        </div>
      </div>
    </div>
  </div>
</div>

## Create a route

<div class="not-prose relative my-6 overflow-hidden rounded-xl border border-black/10 bg-neutral-50 dark:border-white/10 dark:bg-white/[0.03]">
  <div class="absolute inset-y-0 left-0 w-0.5 bg-[var(--vp-c-brand-1)]" aria-hidden="true"></div>
  <div class="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
    <div class="flex min-w-0 items-start gap-4">
      <div class="hidden shrink-0 items-center gap-1 pt-1 sm:flex" aria-hidden="true">
        <span class="h-2 w-2 rounded-full bg-[var(--vp-c-brand-1)]"></span>
        <span class="h-px w-3 bg-black/15 dark:bg-white/15"></span>
        <span class="h-2 w-2 rounded-full border border-black/20 bg-white dark:border-white/20 dark:bg-neutral-950"></span>
        <span class="h-px w-3 bg-black/15 dark:bg-white/15"></span>
        <span class="h-2 w-2 rounded-full border border-black/20 bg-white dark:border-white/20 dark:bg-neutral-950"></span>
      </div>
      <div class="min-w-0">
        <p class="!m-0 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--vp-c-brand-1)]">Route → Controller → Response</p>
        <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-700 dark:text-neutral-300">Building with Leaf MVC? Keep routes thin and move application logic into controllers.</p>
      </div>
    </div>
    <a href="/docs/routing/mvc" class="!inline-flex !h-9 !shrink-0 !items-center !justify-center !whitespace-nowrap !rounded-lg !border !border-black/10 !bg-white !px-3 !text-sm !font-semibold !text-neutral-950 !no-underline !shadow-sm !transition-colors hover:!border-[var(--vp-c-brand-1)] hover:!text-[var(--vp-c-brand-1)] dark:!border-white/10 dark:!bg-white/[0.04] dark:!text-neutral-50">MVC routing <span class="!ml-1.5 text-[var(--vp-c-brand-1)]" aria-hidden="true">→</span></a>
  </div>
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

```php:no-line-numbers
app()->run();
```

## Handling 404

Leaf displays a default 404 screen when it can't find a page that a user wants to access in your app, however this page may not match your app's design or you may want to return JSON instead of HTML.

<img alt="404 page" src="https://github.com/user-attachments/assets/97073d77-1298-4549-aca0-7b652dd2aa0f" width="100%" class="border border-gray-500 rounded-lg">

You can customize the 404 page using Leaf's `set404()` method.

```php
app()->set404(fn () => response()->json([
  "error" => "Page not found"
]));
```

Once this is set, Leaf will automatically use your custom 404 page when a user tries to access a page that doesn't exist in your app.

## Named routes

In big applications, you might have to reference a route over and over again. When you change the route URL, you'll have to change it everywhere you referenced it.

To avoid this, you can name your routes and reference them by their name. This will save you a lot of time and prevent errors.

Leaf router allows you name routes by using route params. They allow you add extra options to your routes like a route name, middleware, etc. You can set route options by passing an array with configuration options as the second argument to the whatever route you are working on.

```php
app()->get('/home', ['name' => 'home', function () {
  // your code
}]);
```

You can then redirect to this route using the route name by passing an array with the route name to the `redirect()` method.

```php:no-line-numbers
response()->redirect(['home']);
```

Route groups can carry a `name` too, which prefixes every named route inside (`admin` + `dashboard` → `admin.dashboard`), and resource routes name themselves automatically. See [named groups](/docs/routing/route-groups#named-groups).

To build a URL from a route name (for links, redirects, or anywhere you'd otherwise hardcode a path), use the `route()` method. Parameters fill in the route's placeholders:

```php:no-line-numbers
$url = app()->route('home');                     // /home
$url = app()->route('users.show', ['id' => 5]);  // /users/5
```

(If you need the full details of the *current* route, like its pattern, name, method, and handler, that's `getRoute()`, shown below.)

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
