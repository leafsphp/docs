# Leaf MVC for APIs

<!-- markdownlint-disable no-inline-html -->

<script setup>
import TutorialNumber from '@theme/components/shared/TutorialNumber.vue';
</script>

<section class="flex mt-4">
    <div
        class="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg"
    >
        <div
            class="w-full flex md:flex-col bg-gradient-to-br from-yellow-400 to-orange-500"
        >
            <div
                class="sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6 xl:p-8"
            >
                <p class="font-medium text-amber-100 text-shadow mb-4">
                  Leaf MVC is a minimalistic PHP framework built for developers who need a simple and elegant toolkit to create full-featured web applications.
                </p>
            </div>
        </div>
        <div
            class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-orange-500 hidden sm:block"
        ></div>
    </div>
</section>

You might choose to separate your API logic from your frontend, with a mobile app or a framework like React, Vue, or Svelte consuming your API. This approach keeps things modular, letting you build once and serve multiple clients.

While you can build APIs with the basic Leaf setup, Leaf MVC provides a structured way to do it. It follows the Model-View-Controller (MVC) pattern, but instead of traditional views, you return JSON or XML responses—keeping things clean, simple, and fast. And, of course, you still get all the power and flexibility Leaf brings.

## Getting started

You can create a new MVC API app using the `create` command on the Leaf CLI.

```bash:no-line-numbers [Leaf CLI]
leaf create my-app --api
```

This command sets up a new Leaf MVC app in the my-app directory, optimized for building APIs. It removes default views, configures JSON responses by default, and includes a few console tweaks to streamline API development. Once it's ready, navigate to your app directory and start the server.

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

Don’t worry if you’re new to MVC! Just remember: every request starts with a route and ends with a JSON or XML response.

## Building your first app

As a maker, the easiest way to get started with your app is by building a Coming Soon, Early Access, or Pre-Launch page. This gives you something real to share while you build, helping you gather interest and early users. Let’s create a simple API that collects emails for a pre-launch page.

### <TutorialNumber number="1" /> The routing bit

In Leaf MVC, routes are defined in the `app/routes` directory. You’ll find an index.php file along with some files that start with `_`. These are partials, and Leaf automatically loads them to help you organize routes in a way that fits your project.

For our pre-launch page, let’s create a new route inside `app/routes/_prelaunch.php`. Open the file and add this:

```php
<?php

app()->post('/prelaunch', 'SubscribersController@store');
```

Okay, let's break it down:

- `app()` is a helper function that gives you access to the Leaf app instance, it is available from anywhere in your app.
- `post()` is a method that limits the route to POST requests only. The first argument is the route, and the second is the controller and method that will handle the request.

### <TutorialNumber number="2" /> Handling the form submission

This is the most important piece of our pre-launch API. We need to create a route that calls a controller, validates the email, and saves it to a database using a model. This will take us through the full MVC cycle, plus a bit of setup.

Let’s start by generating the controller we defined in our route, we'll use the console for this:

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

```php [app/controllers/SubscribersController.php]
<?php

namespace App\Controllers;

class SubscribersController extends Controller
{
    public function store()
    {
        if (!$data = request()->validate(['email' => 'email'])) { // [!code ++]
            return response()->json(['status' => 'error', 'data' => request()->errors()], 400); // [!code ++]
        } // [!code ++]

        // save the email
    }
}
```

This validates the entered email and returns an error if it's not a valid email. Great job so far! Now, let's save the email to a database using a model.

### <TutorialNumber number="3" /> Working with the database

First, we'll generate a Subscriber model using the console:

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

use App\Models\Subscriber;  // [!code ++]

class SubscribersController extends Controller
{
    public function store()
    {
        if (!$data = request()->validate(['email' => 'email'])) {
            return response()->json(['status' => 'error', 'data' => request()->errors()], 400);
        }

        $subscriber = new Subscriber;  // [!code ++]
        $subscriber->email = $data['email'];  // [!code ++]
        $subscriber->save();  // [!code ++]

        return response()->json([ // [!code ++]
          'status' => 'success', // [!code ++]
          'data' => $data // [!code ++]
        ]);  // [!code ++]
    }
}
```

We can now test this by sending a POST request to `http://localhost:5500/prelaunch` with an email parameter. If everything is set up correctly, you should see a success message with the email you sent.

### <TutorialNumber number="5" /> Deploying your app

We have built a simple pre-launch page using Leaf MVC. You can now deploy your app to a server using a service like [Heroku](/learn/deployment/heroku/), [Fly.io](/learn/deployment/flyio/) a VPS like [DigitalOcean](/learn/deployment/digitalocean/), or even a shared hosting service like [Sevalla](/learn/deployment/sevalla/).

For your frontend app, you can consider managed services like [Netlify](https://netlify.com), [Vercel](https://vercel.com), or [GitHub Pages](https://pages.github.com/) which offer one-click deployments.

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
                class="bg-[length:100%] rounded-full h-full bg-center bg-no-repeat bg-pink-100 dark:bg-pink-200"
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
                class="bg-[length:200%] rounded-full h-full bg-yellow-100 dark:bg-yellow-200 bg-center bg-no-repeat"
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
              Learn about signing users in and out, user management, roles + permissions, and more.
            </p>
        </div>
        <div
            class="absolute -z-10 -inset-3 rounded-2xl bg-slate-50 dark:bg-[var(--vp-c-bg-alt)] opacity-0 peer-hover:opacity-100 sm:-inset-4"
        ></div>
    </li>
</ul>
