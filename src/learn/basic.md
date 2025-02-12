# Leaf as a micro-framework

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
                    Use Leaf as a lightweight micro-framework with no structure to build simple applications and APIs.
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

Micro-frameworks are lightweight, minimalistic frameworks that provide only the essentials to build web applications. They are great for building small applications and APIs quickly without the overhead of a full-stack framework. Leaf is a micro-framework that is built to be simple, fast, and easy to use, but also provides a ton of functionality you don't get with other micro-frameworks.

Unlike building with Leaf MVC, building with Leaf as a micro-framework is more flexible and less structured. You can build your app however you like, with no strict separation of concerns which is perfect for small projects and APIs.

## Getting started

You can create a new Leaf app using the `create` command on the Leaf CLI.

```bash:no-line-numbers [Leaf CLI]
leaf create my-app --basic
```

::: details Installing without the CLI

If you don't have the Leaf CLI installed, you can install Leaf using Composer.

```bash:no-line-numbers
composer require leafs/leaf
```

You can then create a new Leaf app by creating a new `index.php` file and requiring the Leaf autoloader.

```php:no-line-numbers [index.php]
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function() {
    response()->json(['message' => 'Hello, World!']);
});

app()->run();
```

:::

Once you are in your application root, you can run the app using the `serve` command.

```bash:no-line-numbers
php leaf serve
```

Your app is now running! Open `http://localhost:5500` in your browser.

## Building your first app

This is where the fun begins! With Leaf as a micro-framework, you can build your app however you like. You can create routes, return JSON to build an API or use Blade to render views. Here's a simple example of a JSON API.

```php [index.php]
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function() {
    response()->json(['message' => 'Hello, World!']);
});

app()->run();
```

Yes, it doesn't do much, but it's a start. You can now build on this by adding more routes and functionality to your app. 

As a maker, the easiest way to get started with your app is by building a Coming Soon, Early Access, or Pre-Launch page. This gives you something real to share while you build, helping you gather interest and early users. Let’s create a simple pre-launch page using Leaf as a micro-framework.

### <span class="bg-[var(--vp-c-bg-alt)] h-6 inline-flex items-center justify-center rounded-full text-gray-700 dark:text-gray-300 text-lg w-6 mr-1 flex-none font-normal">1</span> Setting up our views

We have already seen the way routes work, as we returned JSON in the previous example. Instead of returning JSON, we will be rendering a view using Blade. Unlike with Leaf MVC, setting up Leaf as a micro-framework does not install Blade right out of the box. We will have to install it ourselves (don't worry, it's easy).

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install blade
```

```bash:no-line-numbers [Composer]
composer require leafs/blade
```

:::

Once this is done, we can create a new view in the `views` directory. Let's create a simple pre-launch page.

```blade [views/prelaunch.blade.php]
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Coming Soon</title>
    <style>
        body { text-align: center; padding: 50px; }
        h1 { font-size: 2.5rem; }
        p { font-size: 1.2rem; color: #555; }
        input { padding: 10px; width: 250px; }
        button { padding: 10px 15px; background: #333; color: #fff; border: none; cursor: pointer; }
    </style>
</head>
<body>
    <h1>Something amazing is coming soon!</h1>
    <p>Sign up to be the first to know when we launch.</p>
    <form action="/notify" method="post">
        <input type="email" name="email" placeholder="Enter your email">
        <button type="submit">Notify Me</button>
    </form>
</body>
</html>
```

We have created a simple pre-launch page with a form that takes an email address, now we just need to hook it up to a route that will display this view.

```php{9} [index.php]
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function() {
    response()->json(['message' => 'Hello, World!']);
});

app()->view('/prelaunch', 'prelaunch');

app()->run();
```

Okay, looks like some magic is happening here. Let's break it down:

- `app()` is a helper function that gives you access to the Leaf app instance, it is available from anywhere in your app.
- `view()` is a method that you can use to create a route that renders a Blade view. The first argument is what the user enters in the URL, and the second argument is the name of the view file to render.

Notice we did not have to configure Blade because Leaf does that for you. You can now navigate to `http://localhost:5500/prelaunch` to see your pre-launch page.

### <span class="bg-[var(--vp-c-bg-alt)] h-6 inline-flex items-center justify-center rounded-full text-gray-700 dark:text-gray-300 text-lg w-6 mr-1 flex-none font-normal">2</span> Handling the form submission

We have successfully created a pre-launch page, but we need to handle the form submission. We will create a new route that will handle the form submission and save the email to a database. Let's start by creating a new route.

```php{2} [index.php]
app()->view('/prelaunch', 'prelaunch');
app()->post('/notify', function () {
  // handle the email
});
```

We used the `post()` method this time because we want only POST requests to hit this route. The second argument is a function which we will use to handle the email. We just need to validate the email and save it to a database. Validation is pretty simple with Leaf, we can use the `validate()` method on our request and pass in the rules we want to validate against.

```php [index.php]
app()->post('/notify', function () {
    if (!$data = request()->validate(['email' => 'email'])) {
        // validation failed, redirect back with errors
        return response()
          ->withFlash('errors', response()->errors())
          ->redirect('/prelaunch');
    }

    // save the email
});
```

That's pretty much it for validation. But there's one thing we haven't done yet: we have not connected our database to our application yet.

### <span class="bg-[var(--vp-c-bg-alt)] h-6 inline-flex items-center justify-center rounded-full text-gray-700 dark:text-gray-300 text-lg w-6 mr-1 flex-none font-normal">3</span> Setting up our database

We can do this by installing the database module and then passing in our database credentials. Remember how we installed Blade earlier? We can do the same for the database module.

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install db
```

```bash:no-line-numbers [Composer]
composer require leafs/db
```

:::

Now we just need to fill out our database information:

```php{5-10} [index.php]
<?php

require __DIR__ . '/vendor/autoload.php';

db()->connect([
  'host' => '127.0.0.1',
  'username' => 'root',
  'password' => '',
  'dbname' => 'Leaf',
]);

app()->get('/', function() {
    response()->json(['message' => 'Hello, World!']);
});

app()->view('/prelaunch', 'prelaunch');

app()->post('/notify', function () {
    if (!$data = request()->validate(['email' => 'email'])) {
        // validation failed, redirect back with errors
        return response()
          ->withFlash('errors', response()->errors())
          ->redirect('/prelaunch');
    }

    // save the email
});

app()->run();
```

::: details Creating your database

Unlike with Leaf MVC, Leaf as a micro-framework does not come with a database migration system. You will have to create your database manually. You can do this using a tool like [phpMyAdmin](https://www.phpmyadmin.net/) or the command line.

```sql
CREATE DATABASE Leaf;
```

:::

Once you have filled out your database information, you can now save the email to the database.

### <span class="bg-[var(--vp-c-bg-alt)] h-6 inline-flex items-center justify-center rounded-full text-gray-700 dark:text-gray-300 text-lg w-6 mr-1 flex-none font-normal">4</span> Saving the email

We can now save the email to the database.

```php [index.php]
<?php

require __DIR__ . '/vendor/autoload.php';

db()->connect([
  'host' => '127.0.0.1',
  'username' => 'root',
  'password' => '',
  'dbname' => 'Leaf',
]);

app()->get('/', function() {
    response()->json(['message' => 'Hello, World!']);
});

app()->view('/prelaunch', 'prelaunch');

app()->post('/notify', function () {
    if (!$data = request()->validate(['email' => 'email'])) {
        // validation failed, redirect back with errors
        return response()
          ->withFlash('errors', response()->errors())
          ->redirect('/prelaunch');
    }

    db()->insert('emails')->params($data)->execute();

    return response()
      ->withFlash('success', 'You have been added to our list!')
      ->redirect('/prelaunch');
});

app()->run();
```

You can use the `withFlash()` method to send a message to the next request. This is useful for sending messages to the user after a redirect. We can now test our app by navigating to the `/prelaunch` page and submitting an email.

### <span class="bg-[var(--vp-c-bg-alt)] h-6 inline-flex items-center justify-center rounded-full text-gray-700 dark:text-gray-300 text-lg w-6 mr-1 flex-none font-normal">5</span> Deploying your app

We have built a simple pre-launch page using Leaf. You can now deploy your app to a server using a service like [Heroku](/learn/deployment/heroku/), [Fly.io](/learn/deployment/flyio/) a VPS like [DigitalOcean](/learn/deployment/digitalocean/), or even a shared hosting service like [Sevalla](/learn/deployment/sevalla/).

<div class="my-4 md:my-10">
    <div
        class="grid grid-cols-[auto_1fr_auto] gap-3 gap-y-6 rounded-xl p-6 ring-1 ring-gray-950/10 dark:ring-white/10"
    >
        <div>
            <svg
                width="22"
                height="28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    class="fill-gray-950/5 dark:fill-white/5"
                    cx="11"
                    cy="14"
                    r="11"
                ></circle>
                <circle
                    class="stroke-gray-950/25 dark:stroke-white/25"
                    cx="11"
                    cy="14"
                    r="10.5"
                ></circle>
                <path
                    class="stroke-gray-950 dark:stroke-white"
                    d="m12.5 19-1.011.337a1 1 0 0 1-1.253-1.3l1.528-4.074a1 1 0 0 0-1.253-1.3L9.5 13"
                    stroke-linecap="round"
                ></path>
                <path
                    class="stroke-gray-950 dark:stroke-white"
                    d="M12 9a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
                ></path>
            </svg>
        </div>
        <div class="col-span-2 xl:col-span-1">
            <span class="prose"
                ><strong class="font-semibold text-gray-950 dark:text-white"
                    >Are you stuck?</strong
                >
                  Leaf as a micro-framework is a great way to build simple applications and APIs quickly, but doesn't provide the structure you get with Leaf MVC.  If you are stuck at any point, feel free to ask for help in the
                  <a
                    href="https://discord.gg/Pkrm9NJPE3"
                    >Leaf Discord server</a>, or consider building an MVP using <a
                    href="/learn/mvc"
                    >Leaf MVC</a> if you prefer a more structured approach.
                </span>
        </div>
    </div>
</div>

<section class="relative">
    <h2
        class="text-slate-900 text-xl tracking-tight font-bold mb-3 dark:text-slate-200"
    >
        What to read next
    </h2>
    <div class="mb-10 max-w-2xl prose prose-slate xl:mb-0 dark:prose-dark">
        <p>
            Now that you have built a simple pre-launch page, the next step is to get you familiar with the basics of building a full-stack application with Leaf. So you can build and launch your next big idea <i>fast</i>.
        </p>
    </div>
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
                        href="/docs/routing/mvc"
                        >Routing<svg
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
                  Controllers are the 'C' in MVC, and separate your logic from your views.
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
</section>
