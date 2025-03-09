---
next: false
prev: false
---

# Controllers

When building a web app with Leaf, you need to define routes—these are the paths that users visit in your app. For example, `/login` or `/signup`. Normally, you can just tell Leaf what to do when someone visits a route by passing it a function (a piece of code that runs when someone visits the route). This works fine if your app is small. Here's an example:

```php
app()->get('/login', function () {
  echo 'This is the login page';
});
```

This is okay for simple apps, but as your app grows, it can get messy. You don’t want all your route logic (what happens when users visit routes) and your route definitions (what the routes are) in one place. This is where controllers come in.

## What are controllers?

Controllers are classes that contain methods (functions) that handle requests to your app. When a request comes into your app, Leaf calls the method in the controller that matches the route. This keeps your route definitions clean, and let's you neatly organize your logic so you don't mix your application logic with any other code. Leaf MVC includes a really handy command that you can use to create controllers:

```bash
php leaf g:controller <controller-name>

# example 👇

php leaf g:controller users
```

Leaf will automatically format the controller name to match the Leaf naming convention, so in the example above, Leaf will create a controller named `UsersController` in the `app/controllers` directory. The generated controller will look like this:

```php
<?php

namespace App\Controllers;

class UsersController extends Controller
{
    public function index()
    {
        response()->json([
            'message' => 'UsersController@index output'
        ]);
    }
}
```

We can break down the controller above into the following parts:

- `namespace App\Controllers;` - This is the namespace of the controller. Namespaces tell Leaf MVC where to locate things like classes and functions. In this case, the controller is in the `App\Controllers` namespace which corresponds to the `app/controllers` directory.

- `class UsersController extends Controller` - This is the class definition. The class name is `UsersController` and it extends the `Controller` class. The `Controller` class is a base class that all your controllers should extend. It provides some useful methods that you can use in your controllers and also allows you define code that should run in all your controllers.

- `public function index()` - This is a method in the controller. This method responds with some JSON, nothing fancy going on here.

You can have as many methods as you want in your controller. Each method should correspond to a route in your app and should have functionality that is related to that route. For example, if you have a route `/login`, you can have a method in your controller that handles the login logic.

## Using controllers in routes

After defining a controller with the methods that you will use to handle your routes, you need to tell Leaf when to load a controller and which method to call. You can do this by defining a route in your `app/routes/` directory, and then calling the method in the controller that should handle the route. Here's an example:

```php:no-line-numbers
app()->get('/users', 'UsersController@index');
```

Notice that we didn't pass a function to the route definition. Instead, we passed a string that tells Leaf to load the `UsersController` and call the `index` method. This is how Leaf knows which controller to load and which method to call. The syntax is always `ControllerName@methodName`.

## Why Use Controllers?

- Organization: Keeps your route definitions and logic separate, making your code easier to understand.
- Scalability: As your app grows, you won’t have one big file with all your logic—it will be split up into small, manageable pieces.
- Reusability: You can reuse controller methods for multiple routes if needed.

## Outputting Views

In fullstack applications, you'll need to render views (HTML pages) to the user. You can do this by returning a view from your controller method. Leaf has `view()` and `render()` methods that you can use to render views. Here's an example:

```php
public function index()
{
    response()->render('users');
}
```

You can find the views documentation [here](/docs/frontend/)

## Route Parameters

When you're building web apps, sometimes you need extra functionality when someone visits a route. For example, maybe only logged-in users should be able to see certain pages. To manage this, Leaf lets you add route parameters like middleware to your routes. This feature also works for controllers and uses the same syntax as function route handlers. Here's an example:

```php:no-line-numbers
app()->get('/users', ['middleware' => 'auth', 'UsersController@index']);
```

In the example above, we passed in a middleware called `auth` to the route as a route parameter. Leaf will run the middleware before calling the `index` method in the `UsersController`.

## Resource Controllers

Leaf makes it super easy to set up routes for common actions like creating, reading, updating, and deleting data (also known as CRUD operations). Instead of manually setting up each route, you can use resource controllers to do it all in one line of code!

To get started, you can generate a resource controller using the Aloe CLI:

```bash:no-line-numbers
php leaf g:controller photos --resource
```

This command will generate a controller at `app/controllers/PhotosController.php` which has a bunch of methods pre-defined for you like this:
  
```php
<?php

namespace App\Controllers;

class PhotosController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {...}

    /**
     * Show the form for creating a new resource.
     */
    public function create() {...}

    /**
     * Store a newly created resource in storage.
     */
    public function store() {...}

    /**
     * Display the specified resource.
     */
    public function show($id) {...}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id) {...}

    /**
     * Update the specified resource in storage.
     */
    public function update($id) {...}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) {...}
}
```

You can then define your routes like this:

```php:no-line-numbers
app()->resource('/photos', 'PhotosController');
```

This will automatically set up all the routes you need for CRUD operations on the `/photos` route. Here's a list of the routes that will be set up:

| Method | URI | Action |
| --- | --- | --- |
| GET | /photos | index |
| GET | /photos/create | create |
| POST | /photos | store |
| GET | /photos/{id} | show |
| GET | /photos/{id}/edit | edit |
| PUT/PATCH | /photos/{id} | update |
| DELETE | /photos/{id} | destroy |

## API Resource Controllers

API resource controllers are similar to resource controllers, but they return JSON responses instead of HTML which means that the `create` and `edit` methods are not included. You can generate an API resource controller using the Aloe CLI:

```bash:no-line-numbers
php leaf g:controller photos --api
```

You can load the controller in your routes like this:

```php:no-line-numbers
app()->apiResource('/photos', 'PhotosController');
```

## MVC Console Helper

Leaf MVC comes with a bunch of handy commands for generating controllers and associated files. Here are a few examples:

```bash:no-line-numbers
php leaf g:controller <ControllerName> -m
```

This command will generate your controller together with a model that corresponds to the controller name. The model will be generated in the `app/models` directory.

```bash:no-line-numbers
php leaf g:controller <ControllerName> -t
```

The `-t` flag will generate a controller with a frontend template that corresponds to the controller name. The template will be generated in the `app/views` directory.

```bash:no-line-numbers
php leaf g:controller <ControllerName> -a
```

This command will generate your controller together with a model and a schema file that corresponds to the controller name. The model and schema file will be generated in the `app/models` and `app/database` directories respectively.

## What to read next

Now that you have built a simple pre-launch page, the next step is to get you familiar with the basics of building a full-stack application with Leaf. So you can build and launch your next big idea *fast*.

<ul
    class="!mt-10 grid grid-cols-1 gap-x-16 gap-y-8 xl:grid-cols-2 xl:gap-y-10 !pl-0"
>
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
                    href="/docs/database/models"
                    >Using Models<svg
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
              Models are the 'M' in MVC, and let you interact with your database programmatically.
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
                    href="/docs/database/files"
                    >Schema Files<svg
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
              Learn about setting up schema files to manage your database structure.
            </p>
        </div>
        <div
            class="absolute -z-10 -inset-3 rounded-2xl bg-slate-50 dark:bg-[var(--vp-c-bg-alt)] opacity-0 peer-hover:opacity-100 sm:-inset-4"
        ></div>
    </li>
</ul>
