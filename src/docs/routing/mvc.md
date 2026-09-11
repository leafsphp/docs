---
next: false
prev: false
---

# Routing in Leaf MVC

<!-- markdownlint-disable no-inline-html -->

<section class="not-prose my-10 overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
  <div class="grid gap-0 2xl:grid-cols-[1.05fr_0.95fr]">
    <div class="border-b border-neutral-200 p-6 sm:p-8 2xl:border-b-0 2xl:border-r dark:border-neutral-800">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">Leaf MVC routing</p>
      <h1 class="m-0 text-3xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-4xl">Keep every URL connected to the controller that owns it.</h1>
      <p class="!m-0 !mt-4 text-base leading-7 text-neutral-600 dark:text-neutral-400">Leaf MVC keeps routes readable as your app grows: split them into small partials, point them at controllers, and keep the map clear enough for your team and AI tools to follow.</p>
    </div>
    <div class="bg-neutral-50 p-6 dark:bg-neutral-900/60 sm:p-8">
      <div class="rounded-lg border border-neutral-200 bg-white p-4 font-mono text-sm text-neutral-700 dark:border-neutral-800 dark:bg-black dark:text-neutral-300">
        <div><span class="text-neutral-400">$</span> app/routes/_auth.php</div>
        <div class="mt-4 text-[var(--vp-c-brand-1)]">app()-&gt;post('/login', 'AuthController@login');</div>
        <div class="text-sky-600 dark:text-sky-400">app()-&gt;get('/dashboard', 'DashboardController@index');</div>
      </div>
      <div class="mt-4 grid gap-3 md:grid-cols-3 2xl:grid-cols-1">
        <div class="rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-950">
          <p class="!m-0 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">Partials</p>
          <p class="!m-0 !mt-1 text-sm text-neutral-600 dark:text-neutral-400">Group related routes.</p>
        </div>
        <div class="rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-950">
          <p class="!m-0 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">Controllers</p>
          <p class="!m-0 !mt-1 text-sm text-neutral-600 dark:text-neutral-400">Move logic out of files.</p>
        </div>
        <div class="rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-950">
          <p class="!m-0 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">AI map</p>
          <p class="!m-0 !mt-1 text-sm text-neutral-600 dark:text-neutral-400">Easy for agents to inspect.</p>
        </div>
      </div>
    </div>
  </div>
</section>

## Route partials

In Leaf MVC, all routes are defined in partials within the app/routes directory. Partials are simple PHP files prefixed with `_`, like `_auth.php` or `_api.php`. There’s no special syntax, just a simple way to keep your code organized as your app or API grows.

To add a new route, place it in the relevant partial, or create a new one if it doesn’t fit into an existing group.

::: tip Prefer one file?
You can still define everything in `app/routes/index.php`. Partials are there when your app needs a cleaner map, not because Leaf forces a folder ritual.
:::

## Breaking down routes

Every route has a URL (the web address the user visits) and an HTTP method (like GET, POST, etc.), which tells the server what action to take. For example, if you create a route for a GET request to `/home`, the user can access that page by visiting `http://example.com/home`. This way, different URLs and methods control how users interact with your app.

So to define a route, you need to specify the URL and the HTTP method. Leaf router allows you to do this using `get()`, `post()`, `put()`, `patch()`, `delete()`, ... methods. Let's take a look at them.

## Create a GET route

You can add a route that handles only `GET` HTTP requests with the Leaf router's `get()` method. It accepts two arguments:

- The route pattern
- The route handler (a controller method or a function)

```php:no-line-numbers
app()->get('/home', 'HomeController@index');
```

This is the general syntax for defining a route in Leaf. The first argument is the route pattern, and the second argument is the route handler. Since we are using MVC, the route handler for all your routes will be controller methods, but Leaf always allows you to quickly define a route with a closure.

```php
app()->get('/home', function() {
    // Your code here
});
```

## Create a POST route

You can add a route that handles only `POST` HTTP requests with the Leaf router's `post()` method. It accepts two arguments:

- The route pattern
- The route handler

```php:no-line-numbers
app()->post('/users/add', 'UsersController@store');
```

## Create a PUT route

The `put()` method allows you to add a route that handles only `PUT` HTTP requests. It accepts two arguments:

- The route pattern
- The route handler

```php:no-line-numbers
app()->put('/book/edit/{id}', 'BooksController@update');
```

## Create a DELETE route

You can add a route that handles only `DELETE` HTTP requests with the Leaf router's `delete()` method. It accepts two arguments:

- The route pattern
- The route handler

```php:no-line-numbers
app()->delete('/quotes/{id}', 'QuotesController@destroy');
```

## Create a PATCH route

You can add a route that handles only `PATCH` HTTP requests with the Leaf router's `patch()` method. It accepts two arguments:

- The route pattern
- The route handler

```php:no-line-numbers
app()->patch('/quotes/{id}', 'QuotesController@update');
```

## Create a multiple method route

There are some cases where you want a route to handle multiple HTTP methods. You can do this using the `match()` method. This method accepts three arguments:

- A list of HTTP methods separated by | (pipe)
- The route pattern
- The route handler

```php:no-line-numbers
app()->match('GET|POST', '/users', 'UsersController@index');
```

## Create a view route

If your route needs to return a template without any logic, you can use the `view()` method. This method accepts two arguments:

- The route pattern
- The view file to render

```php:no-line-numbers
app()->view('/home', 'home');
```

## Named routes

Leaf lets you name routes, so you can reference them by name instead of hardcoding URLs. When a URL changes, you only update it in one place. You can also define options like middleware using an array as the second argument when setting up a route.

```php:no-line-numbers
app()->get('/home', ['name' => 'home', 'HomeController@index']);
```

You can then redirect to this route using the route name by passing an array with the route name to the `redirect()` method.

```php:no-line-numbers
response()->redirect(['home']);
```

Resource routes name themselves automatically: `app()->resource('/users', 'UsersController')` registers `users.index`, `users.show`, `users.edit` and friends, and group names prefix them (`admin.users.index`). See [named groups](/docs/routing/route-groups#named-groups).

To build a URL from a route name (for links, redirects, or anywhere you'd otherwise hardcode a path), use the `route()` method. Parameters fill in the route's placeholders:

```php:no-line-numbers
$url = app()->route('home');                     // /home
$url = app()->route('users.show', ['id' => 5]);  // /users/5
```

(If you need the full details of the *current* route, like its pattern, name, method, and handler, that's `getRoute()`, shown below.)

## Getting the current route

There are times when you need to get the current route which the user is visiting from inside your route handler. You can do this by calling the `getRoute()` method on the router instance.

```php [HomeController.php]
...

public function index() {
    $route = app()->getRoute();
    return response()->json($route);
}
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

## Updating Error Screens

If you need to set up custom error responses, you can do so in the `app/routes/index.php` file. We have loaded examples for 404 and 500 error pages. You can customize these to your liking. For example, we can set up JSON responses for these errors:

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
app()->set404(fn () => response()->json('Resource not found', 404, true));

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
app()->setErrorHandler(fn () => response()->json('An error occurred, our team has been notified', 500, true));
```

## What to read next

Now that you understand how to define routes in Leaf, you can learn more about Leaf's routing system, including how to use middleware, dynamic routing, or explore other topics in the documentation.

<ul
    class="!mt-10 grid grid-cols-1 gap-x-16 gap-y-8 xl:grid-cols-2 xl:gap-y-10 !pl-0"
>
    <li class="relative flex items-start">
        <div
            class="w-16 h-16 p-[0.1875rem] rounded-full ring-1 ring-slate-900/10 shadow overflow-hidden flex-none dark:ring-white/50"
        >
            <div
                class="bg-[length:150%] rounded-full h-full !bg-left bg-no-repeat bg-pink-100 dark:bg-pink-200"
                style="
                    background-image: url(/images/illustrations/deploy-to-install.svg);
                "
            ></div>
      </div>
        <div class="peer group flex-auto ml-6">
            <h3
              class="mb-2 font-semibold !text-slate-900 dark:!text-slate-200 !m-0"
            >
                <a
                    class="before:absolute before:-inset-3 before:rounded-2xl !text-inherit sm:before:-inset-4 !no-underline"
                    href="/docs/routing/middleware/mvc"
                    >Middleware<svg
                        viewBox="0 0 3 6"
                        class="ml-3 w-auto h-1.5 overflow-visible inline -mt-px text-slate-400 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                    >
                        <path
                            d="M0 0L3 3L0 6"
                            fill="none"
                            stroke-width="2"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path></svg
                ></a>
            </h3>
            <p class="text-[var(--vp-c-text-2)] !m-0 text-sm">
              Add middleware to your routes to perform tasks before or after a request is handled.
            </p>
        </div>
        <div
            class="absolute -z-10 -inset-3 rounded-2xl bg-slate-50 dark:bg-[var(--vp-c-bg-alt)] opacity-0 peer-hover:opacity-100 sm:-inset-4"
        ></div>
    </li>
    <li class="relative flex items-start">
        <div
            class="w-16 h-16 p-[0.1875rem] rounded-full ring-1 ring-slate-900/10 shadow overflow-hidden flex-none dark:ring-white/50"
        >
            <div
                class="bg-[length:120%] rounded-full h-full bg-green-100 dark:bg-green-200 bg-center bg-no-repeat"
                style="
                    background-image: url(/images/illustrations/routing.svg);
                "
            ></div>
        </div>
        <div class="peer group flex-auto ml-6">
            <h3
              class="mb-2 font-semibold !text-slate-900 dark:!text-slate-200 !m-0"
            >
                <a
                    class="before:absolute before:-inset-3 before:rounded-2xl !text-inherit sm:before:-inset-4 !no-underline"
                    href="/docs/routing/dynamic"
                    >Dynamic routing<svg
                        viewBox="0 0 3 6"
                        class="ml-3 w-auto h-1.5 overflow-visible inline -mt-px text-slate-400 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                    >
                        <path
                            d="M0 0L3 3L0 6"
                            fill="none"
                            stroke-width="2"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path></svg
                ></a>
            </h3>
            <p class="text-[var(--vp-c-text-2)] !m-0 text-sm">
              Learn how to process incoming requests, handle form submissions, and more.
            </p>
        </div>
        <div
            class="absolute -z-10 -inset-3 rounded-2xl bg-slate-50 dark:bg-[var(--vp-c-bg-alt)] opacity-0 peer-hover:opacity-100 sm:-inset-4"
        ></div>
    </li>
    <li class="relative flex items-start">
        <div
            class="w-16 h-16 p-[0.1875rem] rounded-full ring-1 ring-slate-900/10 shadow overflow-hidden flex-none dark:ring-white/50"
        >
            <div
                class="bg-[length:120%] rounded-full h-full bg-purple-100 dark:bg-purple-200 bg-center bg-no-repeat"
                style="
                    background-image: url(/images/illustrations/db.svg);
                "
            ></div>
        </div>
        <div class="peer group flex-auto ml-6">
            <h3
              class="mb-2 font-semibold !text-slate-900 dark:!text-slate-200 !m-0"
            >
                <a
                    class="before:absolute before:-inset-3 before:rounded-2xl !text-inherit sm:before:-inset-4 !no-underline"
                    href="/docs/mvc/controllers"
                    >Using Controllers<svg
                        viewBox="0 0 3 6"
                        class="ml-3 w-auto h-1.5 overflow-visible inline -mt-px text-slate-400 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                    >
                        <path
                            d="M0 0L3 3L0 6"
                            fill="none"
                            stroke-width="2"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path></svg
                ></a>
            </h3>
            <p class="text-[var(--vp-c-text-2)] !m-0 text-sm">
              Learn how to handle incoming requests and responses using controllers.
            </p>
        </div>
        <div
            class="absolute -z-10 -inset-3 rounded-2xl bg-slate-50 dark:bg-[var(--vp-c-bg-alt)] opacity-0 peer-hover:opacity-100 sm:-inset-4"
        ></div>
    </li>
    <li class="relative flex items-start">
        <div
            class="w-16 h-16 p-[0.1875rem] rounded-full ring-1 ring-slate-900/10 shadow overflow-hidden flex-none dark:ring-white/50"
        >
            <div
                class="bg-[length:400%] rounded-full h-full bg-yellow-100 dark:bg-yellow-200 bg-center bg-no-repeat"
                style="
                    background-image: url(/images/illustrations/Stats-2.svg);
                "
            ></div>
        </div>
        <div class="peer group flex-auto ml-6">
            <h3
              class="mb-2 font-semibold !text-slate-900 dark:!text-slate-200 !m-0"
            >
                <a
                    class="before:absolute before:-inset-3 before:rounded-2xl !text-inherit sm:before:-inset-4 !no-underline"
                    href="/docs/frontend/"
                    >Frontend<svg
                        viewBox="0 0 3 6"
                        class="ml-3 w-auto h-1.5 overflow-visible inline -mt-px text-slate-400 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                    >
                        <path
                            d="M0 0L3 3L0 6"
                            fill="none"
                            stroke-width="2"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path></svg
                ></a>
            </h3>
            <p class="text-[var(--vp-c-text-2)] !m-0 text-sm">
              Learn about SSR, SPA, and how to use Leaf with your favorite frontend framework.
            </p>
        </div>
        <div
            class="absolute -z-10 -inset-3 rounded-2xl bg-slate-50 dark:bg-[var(--vp-c-bg-alt)] opacity-0 peer-hover:opacity-100 sm:-inset-4"
        ></div>
    </li>
</ul>
