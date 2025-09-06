---
next: false
prev: false
---

<!-- markdownlint-disable no-inline-html -->

# Middleware in Leaf MVC

Middleware is a piece of code that runs before or after your application processes a request. It helps control the flow of requests and responses. For example, when a user visits a page on your app, you can use middleware can check if the user is logged in and if everything is okay, the request moves on to the next step; if not, the middleware can redirect the user.

<section class="flex mt-4">
    <div
        class="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg"
    >
        <div
            class="w-full flex md:flex-col bg-gradient-to-br from-purple-500 to-indigo-500"
        >
            <div
                class="sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6 xl:p-8"
            >
                <p class="font-medium text-violet-100 text-shadow mb-4">
                    Before writing custom middleware, check out <a href="/docs/modules" class="!text-white">Leaf Modules</a>—they offer built-in functionality that might already cover your needs, saving you time and effort.
                </p>
            </div>
            <!-- <div
                class="relative md:pl-6 xl:pl-8 hidden sm:block"
            >
                Hello
            </div> -->
        </div>
        <div
            class="absolute bottom-0 left-0 right-0 h-20 hidden sm:block"
            style="
                background: linear-gradient(
                    to top,
                    rgb(135, 94, 245),
                    rgba(135, 94, 245, 0)
                );
            "
        ></div>
    </div>
</section>

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

Of course, you don't have to do this manually. You can use the MVC Console to generate a middleware for you:

```bash:no-line-numbers
php leaf g:middleware LogRequest
```

This will generate a `LogRequestMiddleware.php` file in the `app/middleware` folder.

## Loading Middleware for all routes

Once you generate your middleware, you can choose to load it for all routes in your application. This means that the middleware will run for every request made to your application, regardless of the route. It could be useful for logging requests, checking if a user is authenticated, etc.

To do this, you need to add the middleware to the `app/routes/index.php` file. We have added an example middleware to the file for you:

```php
use App\Middleware\LogRequestMiddleware;  // [!code ++]

...

/*
|--------------------------------------------------------
| Set middleware for all routes
|--------------------------------------------------------
|
| You can use app()->use() to load middleware for all
| routes in your application.
|
*/
app()->use(LogRequestMiddleware::class);  // [!code ++]
app()->use(AnotherMiddleware::class);  // [!code ++]
```

## Loading Middleware for specific routes

The most common use case for middleware is to load it for specific routes, instead of all routes. You can do this by adding the middleware to the particular route you want to use it in using route parameters.

```php{8}
<?php

use App\Middleware\LogRequestMiddleware;

...

app()->get('/my-route', [
  'middleware' => LogRequestMiddleware::class,
  'MyController@index'
]);
```

This will run the `LogRequestMiddleware` middleware only for the `/my-route` route.

## Passing data from middleware

You can pass data from middleware to your route handler using `response()->next()`, making it available in your controller or another middleware.

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

        response()->next('You can pass any value');  // [!code ++]
    }
}
```

This uses Leaf's Response object to output data from the middleware that can only be accessed by your next handler (hence the name `next`). You can access that data in your route handler using the `request()->next()` method.

```php{9}
<?php

namespace App\Controllers;

class MyController extends Controller
{
    public function index()
    {
        $middlewareData = request()->next();  // [!code ++]

        echo $middlewareData; // will output "You can pass any value"
    }
}
```

Once the data is read using `request()->next()`, it is removed from the request object and cannot be accessed again during the request lifecycle.

## Controller Middleware <Badge>New</Badge>

The middleware we have seen so far is applied to routes, which is great for most use-cases. However, there are times when you may want to apply middleware to one or more controller methods, instead of individual routes. This is especially useful when you have an application which has both web and API routes, and you want to apply different middleware to each. To use this, find the controller you want to add middleware to, and add a `__middleware` method to it:

```php
<?php

namespace App\Controllers\Mobile;

/**
 * This is a base controller for the mobile namespace
 */
class Controller extends \App\Controllers\Controller
{
    public function __middleware()
    {
        auth()->config('session', false);

        if (!auth()->user()) {
            response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 401);

            return false;
        }

        return true;
    }
}
```

In this example, we have a base controller for the `Mobile` namespace, which contains all controllers for our mobile API. The `__middleware` method disables session auth, meaning all authentication will be done using API tokens (JWTs), and then returns a JSON response if the user is not authenticated. Since this is a base controller, all controllers in the `Mobile` namespace will inherit this middleware which means all routes in this namespace will require authentication.

Unlike the route middleware, the controller middleware returns a boolean value. If it returns `true`, the request will continue to the next step (either another middleware or the controller method). If it returns `false`, the request will stop and no further processing will be done.

## What to read next

Middleware is a powerful tool that can help you control the flow of requests in your application, but Leaf already has a lot of functionality built-in that you might not need to write your own middleware for. Check out some of the other features of Leaf & Leaf MVC:

<ul
    class="!mt-10 grid grid-cols-1 gap-x-16 gap-y-8 xl:grid-cols-2 xl:gap-y-10 !pl-0"
>
    <li class="relative flex items-start">
        <div
            class="w-16 h-16 p-[0.1875rem] rounded-full ring-1 ring-slate-900/10 shadow overflow-hidden flex-none dark:ring-white/50"
        >
            <div
                class="bg-[length:150%] rounded-full h-full bg-center bg-no-repeat bg-pink-100 dark:bg-pink-200"
                style="
                    background-image: url(/images/illustrations/Feature-Flags-5.svg);
                "
            ></div>
        </div>
        <div class="peer group flex-auto ml-6">
            <h3
              class="mb-2 font-semibold !text-slate-900 dark:!text-slate-200 !m-0"
            >
                <a
                    class="before:absolute before:-inset-3 before:rounded-2xl !text-inherit sm:before:-inset-4 !no-underline"
                    href="/docs/auth/mvc"
                    >Authentication<svg
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
              Learn more about routing in Leaf MVC, dynamic routes, middleware and more.
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
                class="bg-[length:350%] rounded-full h-full bg-green-100 dark:bg-green-200 bg-center bg-no-repeat"
                style="
                    background-image: url(/images/illustrations/Heading-2.svg);
                "
            ></div>
        </div>
        <div class="peer group flex-auto ml-6">
            <h3
              class="mb-2 font-semibold !text-slate-900 dark:!text-slate-200 !m-0"
            >
                <a
                    class="before:absolute before:-inset-3 before:rounded-2xl !text-inherit sm:before:-inset-4 !no-underline"
                    href="/docs/auth/permissions"
                    >Roles & Permissions<svg
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
                    href="/docs/http/session"
                    >Session Data<svg
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
              Save user data, flash messages, and more using Leaf's session module.
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
