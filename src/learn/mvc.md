# Building full-stack with Leaf MVC

<!-- markdownlint-disable no-inline-html -->

<script setup>
import TutorialNumber from '@theme/components/shared/TutorialNumber.vue';
</script>

<section class="flex mt-4">
    <div
        class="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg"
    >
        <div
            class="w-full flex md:flex-col bg-gradient-to-br from-pink-500 to-rose-500"
        >
            <div
                class="sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6 xl:p-8"
            >
                <!-- <h3 class="text-xl font-semibold mb-2 text-shadow !mt-0">
                  Leaf MVC
                </h3> -->
                <p class="font-medium text-rose-100 text-shadow mb-4">
                  Leaf MVC is a minimalistic PHP framework built for developers who need a simple and elegant toolkit to create full-featured web applications.
                </p>
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
</section>

Full-stack applications typically combine both the front-end and back-end in a single, cohesive system. With Leaf MVC, you get all the power of Leaf for handling requests while seamlessly rendering views using [Blade](/docs/frontend/blade) or integrating with modern front-end frameworks like [React, Vue or Svelte](/docs/frontend/inertia).

## Getting started

You can create a new MVC app using the `create` command on the Leaf CLI.

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf create my-app --mvc
```

```bash:no-line-numbers [Composer]
composer create-project leafs/mvc my-app
```

:::

This will create a new Leaf MVC app in the `my-app` directory. You can then navigate to the `my-app` directory and run the app using the `serve` command.

```bash:no-line-numbers
cd my-app
php leaf serve
```

Your app is now running! Open `http://localhost:5500` in your browser.

## Project Structure

Leaf MVC, like the rest of Leaf, is built for makers—focused, lightweight, and flexible. It keeps only the essentials, giving you everything you need without the extra baggage. Here’s the basic structure of a Leaf MVC app:

```bash:no-line-numbers
├───app
│   ├── controllers
│   ├── database
│   ├── models
│   ├── routes
│   └── views
│       └── errors
└───public
    └───assets
        ├── css
        └── img
```

Leaf MVC keeps things simple, ensuring you focus on building rather than configuration. Here’s a quick breakdown of the key directories:

- app/ – This is where all your application logic lives, including controllers, models, views, and routes. Your database files also reside here.
- public/ – Contains publicly accessible files like bundled CSS, JavaScript, and images. This is the only directory exposed to the browser.

Most of your work will happen in the app directory, with a typical request starting with a route, which calls a controller, which interacts with a model, and finally renders a view—this is the MVC cycle in action.

Don’t worry if you’re new to MVC! Just remember: every request starts with a route and ends with a response.

## Building your first app

As a maker, the easiest way to get started with your app is by building a Coming Soon, Early Access, or Pre-Launch page. This gives you something real to share while you build, helping you gather interest and early users. Let’s create a simple pre-launch page in Leaf MVC!

### <TutorialNumber number="1" /> The routing bit

In Leaf MVC, routes are defined in the `app/routes` directory. You’ll see an index.php file along with some files that start with `_`. These are partials, and Leaf automatically loads them to help you organize routes in a way that fits your project.

For our pre-launch page, let’s create a new route inside `app/routes/_prelaunch.php`. Open the file and add this:

```php
<?php

app()->view('/prelaunch', 'prelaunch');
```

Okay, looks like some magic is happening here. Let's break it down:

- `app()` is a helper function that gives you access to the Leaf app instance, it is available from anywhere in your app.
- `view()` is a method that you can use to create a route that renders a Blade view. The first argument is what the user enters in the URL, and the second argument is the name of the view file to render.

### <TutorialNumber number="2" /> The view bit

We’ve set up the route, but if we navigate to `/prelaunch` now, we’ll hit an error—because we haven’t created the prelaunch view yet!

To fix this, let’s create a new Blade file inside the `app/views` directory. Name it `prelaunch.blade.php`, and this is where we’ll define our pre-launch page.

```blade [app/views/prelaunch.blade.php]
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

The most important part of this page is the form. We’re keeping it simple—it just collects an email address and submits it to a route that will handle the email. We’ll create that route in a moment. Remember how we set up a route earlier? We’ll follow the same approach!

### <TutorialNumber number="3" /> Handling the form submission

This is the final piece of our pre-launch page, but also the most involved. We need to create a route that calls a controller, validates the email, and saves it to a database using a model. This will take us through the full MVC cycle, plus a bit of setup.

Let’s start by defining the route!

```php [app/routes/_prelaunch.php]
<?php

app()->view('/prelaunch', 'prelaunch');
app()->post('/store', 'SubscribersController@store'); // [!code ++]
```

We used the `post()` method because we only want POST requests to hit this route. The second argument specifies the controller and method that will handle the request.

To generate the controller, we can use the Leaf CLI:

```bash:no-line-numbers
php leaf g:controller subscribers
```

This will create a new controller in the `app/controllers` directory. Open the `SubscribersController.php` file and add the `store` method.

```php [app/controllers/SubscribersController.php]
<?php

namespace App\Controllers;

class SubscribersController extends Controller
{
    public function store() // [!code ++]
    { // [!code ++]
        // handle the email // [!code ++]
    } // [!code ++]
}
```

We're almost there! We need to validate the email and save it to a database. Validation is pretty simple with Leaf, we can use the `validate()` method on our request and pass in the rules we want to validate against.

```php{9-12} [app/controllers/SubscribersController.php]
<?php

namespace App\Controllers;

class SubscribersController extends Controller
{
    public function store()
    {
        if (!$data = request()->validate(['email' => 'email'])) { // [!code ++]
            // validation failed, redirect back with errors // [!code ++]
            return response()->with('errors', request()->errors())->redirect('/prelaunch'); // [!code ++]
        } // [!code ++]

        // save the email
    }
}
```

Great job so far! Now, let's save the email to a database using a model. First, we'll generate a Subscriber model:

```bash:no-line-numbers
php leaf g:model subscriber
```

We don’t need to modify the model—Leaf keeps things simple. But before we can store anything, we need to connect our database. Open your .env file and add your database credentials:

```env
DB_CONNECTION=mysql
DB_HOST=xxx
DB_PORT=xxx
DB_DATABASE=xxx
DB_USERNAME=xxx
DB_PASSWORD=xxx
```

After updating your credentials, restart your server with: `php leaf serve`.

Now, we need to create our database table. Leaf MVC makes this seamless with schema files, a simpler way to define and manage your database structure. Let’s set up our schema next!

```bash:no-line-numbers
php leaf g:schema subscribers
```

The name of the schema file should be the same as your table name. This will create a new schema file in the `app/database` directory. Open the file and add the columns you want in your table.

```php [app/database/subscribers.yml]
columns:
  email: string
```

Here, we are telling Leaf to add a column where we can store the email. We can now run the migration to create the table.

```bash:no-line-numbers
php leaf db:migrate
```

### <TutorialNumber number="4" /> Saving the email

We can now save the email to the database using our `Subscriber` model.

```php [app/controllers/SubscribersController.php]
<?php

namespace App\Controllers;

use App\Models\Subscriber; // [!code ++]

class SubscribersController extends Controller
{
    public function store()
    {
        if (!$data = request()->validate(['email' => 'email'])) {
            // validation failed, redirect back with errors
            return response()->withFlash('errors', request()->errors())->redirect('/prelaunch');
        }

        $subscriber = new Subscriber; // [!code ++]
        $subscriber->email = $data['email']; // [!code ++]
        $subscriber->save(); // [!code ++]

        return response() // [!code ++]
          ->withFlash('success', 'Nice, we will send a mail when we launch!') // [!code ++]
          ->redirect('/prelaunch'); // [!code ++]
    }
}
```

You can use the `withFlash()` method to send a message to the next request. This is useful for sending messages to the user after a redirect. We can now test our app by navigating to the `/prelaunch` page and submitting an email.

### <TutorialNumber number="5" /> Deploying your app

We have built a simple pre-launch page using Leaf MVC. You can now deploy your app to a server using a service like [Heroku](/learn/deployment/heroku/), [Fly.io](/learn/deployment/flyio/) a VPS like [DigitalOcean](/learn/deployment/digitalocean/), or even a shared hosting service like [Sevalla](/learn/deployment/sevalla/).

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
                  Working with MVC can be a bit challenging if you are just starting out because of the overly strict separation of concerns. If you are stuck at any point, feel free to ask for help in the
                  <a
                    href="https://discord.gg/Pkrm9NJPE3"
                    >Leaf Discord server</a>, or consider building an MVP using the <a
                    href="/learn/basic"
                    >Basic Leaf setup</a>. While it is not as structured as MVC, it is a great way to get started with Leaf.
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
