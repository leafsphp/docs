# Leaf as a micro-framework

<!-- markdownlint-disable no-inline-html -->

<script setup>
import TutorialNumber from '@theme/components/shared/TutorialNumber.vue';
</script>

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

Micro-frameworks are lightweight, minimal, and focused—giving you just what you need to build fast without the overhead of a full-stack framework. Leaf is built for simplicity, speed, and ease of use, while offering more functionality than most micro-frameworks.

Unlike Leaf MVC, using Leaf as a micro-framework gives you complete flexibility. There's no enforced structure, so you can build your app however you like—perfect for small projects and APIs that don’t need strict separation of concerns.

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

Now the fun begins! 🚀 With Leaf as a micro-framework, you have the freedom to build your app your way. Define routes, return JSON for an API, or use Blade to render views—it’s all up to you.

Here’s a quick example of a simple JSON API:

```php [index.php]
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function() {
    response()->json(['message' => 'Hello, World!']);
});

app()->run();
```

It’s a start, but there’s so much more to build! You can now expand your app by adding more routes and features.

As a maker, the fastest way to get started is by building a Coming Soon, Early Access, or Pre-Launch page. This gives you something real to share while you build—helping you attract early users and generate interest.

Let’s create a simple pre-launch page using Leaf as a micro-framework.

### <TutorialNumber number="1" /> Setting up our views

We've already seen how routes work by returning JSON in the previous example. Now, let’s render a view using Blade instead. Unlike Leaf MVC, Blade isn’t installed by default when using Leaf as a micro-framework—but don’t worry, setting it up is quick and easy!

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install blade
```

```bash:no-line-numbers [Composer]
composer require leafs/blade
```

:::

Once Blade is set up, we can create a new view inside the views directory at the root of your app. By default, Leaf looks for views in this directory unless you configure a different path.

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
    <form action="/store" method="post">
        <input type="email" name="email" placeholder="Enter your email">
        <button type="submit">Notify Me</button>
    </form>
</body>
</html>
```

Now that we have a simple pre-launch page with a form to collect email addresses, we just need to create a route that will render this view.

```php [index.php]
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function() {
    response()->json(['message' => 'Hello, World!']);
});

app()->view('/prelaunch', 'prelaunch');  // [!code ++]

app()->run();
```

Here's what's happening behind the scenes:

- `app()` is a helper function that gives you access to the Leaf app instance. You can use it anywhere in your app.
- `view()` is a method for defining a route that renders a Blade view. The first argument is the URL path, and the second is the name of the view file to load.

Notice we did not have to configure Blade because Leaf does that for you. You can now navigate to `http://localhost:5500/prelaunch` to see your pre-launch page.

### <TutorialNumber number="2" /> Handling the form submission

Now that we have a pre-launch page, we need to handle form submissions. Let’s create a new route to process the form and save the email to a database.

```php [index.php]
app()->view('/prelaunch', 'prelaunch');
app()->post('/store', function () { // [!code ++]
  // handle the email // [!code ++]
}); // [!code ++]
```

We used the `post()` method to ensure only POST requests reach this route. The second argument is a function where we'll handle the email. Leaf makes validation simple—we can call `validate()` on the request and define our validation rules. Let’s validate and store the email.

```php [index.php]
app()->post('/store', function () {
    if (!$data = request()->validate(['email' => 'email'])) { // [!code ++]
        // validation failed, redirect back with errors // [!code ++]
        return response() // [!code ++]
          ->withFlash('errors', request()->errors()) // [!code ++]
          ->redirect('/prelaunch'); // [!code ++]
    } // [!code ++]

    // save the email
});
```

That’s it for validation! But before we can save the email, we need to connect our database to the application. Let’s set that up next.

### <TutorialNumber number="3" /> Setting up our database

We can set up our database by installing the database module and configuring our credentials. Just like we installed Blade earlier, we’ll install the database module the same way.

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install db
```

```bash:no-line-numbers [Composer]
composer require leafs/db
```

:::

Now we just need to fill out our database information:

```php [index.php]
<?php

require __DIR__ . '/vendor/autoload.php';

db()->connect([ // [!code ++]
  'host' => '127.0.0.1', // [!code ++]
  'username' => 'root', // [!code ++]
  'password' => '', // [!code ++]
  'dbname' => 'Leaf', // [!code ++]
]); // [!code ++]

app()->get('/', function() {
    response()->json(['message' => 'Hello, World!']);
});

app()->view('/prelaunch', 'prelaunch');

app()->post('/store', function () {
    if (!$data = request()->validate(['email' => 'email'])) {
        // validation failed, redirect back with errors
        return response()
          ->withFlash('errors', request()->errors())
          ->redirect('/prelaunch');
    }

    // save the email
});

app()->run();
```

::: details Creating your database

Unlike with Leaf MVC, Leaf as a micro-framework does not come with a database migration system. You will have to create your database manually. You can do this using a tool like [phpMyAdmin](https://www.phpmyadmin.net/), TablePlus or the command line.

```sql:no-line-numbers
CREATE DATABASE Leaf;
```

:::

Once you have filled out your database information, you can now save the email to the database.

### <TutorialNumber number="4" /> Saving the email

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

app()->post('/store', function () {
    if (!$data = request()->validate(['email' => 'email'])) {
        // validation failed, redirect back with errors
        return response()
          ->withFlash('errors', request()->errors())
          ->redirect('/prelaunch');
    }

    db()->insert('emails')->params($data)->execute(); // [!code ++]

    return response() // [!code ++]
      ->withFlash('success', 'You have been added to our list!') // [!code ++]
      ->redirect('/prelaunch'); // [!code ++]
});

app()->run();
```

You can use the `withFlash()` method to send a message to the next request. This is useful for sending messages to the user after a redirect. We can now test our app by navigating to the `/prelaunch` page and submitting an email.

### <TutorialNumber number="5" /> Deploying your app

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
