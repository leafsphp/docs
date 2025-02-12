# Building full-stack with Leaf MVC

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

Full stack applications are usually monolithic applications that have both a front-end and a back-end. Leaf MVC gives you all the goodness of Leaf which you can use to handle requests and render views using a templating engine like [Blade](/docs/frontend/blade) or using a front-end framework like [React, Vue or Svelte](/docs/frontend/inertia).

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

Your app is now running! Open [http://localhost:5500](http://localhost:5500) in your browser.

## Project Structure

Leaf MVC, just like the rest of Leaf is built for makers, and as such, it keeps only the essentials. Here's a basic structure of a Leaf MVC app:

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

- app: Contains all the application code including controllers, models, views, and routes, as well as your database files.
- public: Contains all the publicly accessible files including assets like bundled CSS, JS and images.

Just about all the work you'll be doing will be in the `app` directory. You can create routes which will call controllers which will interact with models and render views (the MVC cycle). Don't worry if you're not familiar with MVC, just remember that every request starts with a route and ends with a response of some sort.

## Building your first app

As a maker, the easiest way to get started with your app is by building a Coming Soon, Early Access, or Pre-Launch page. This gives you something real to share while you build, helping you gather interest and early users. Let’s create a simple pre-launch page in Leaf MVC!

### <span class="bg-[var(--vp-c-bg-alt)] h-6 inline-flex items-center justify-center rounded-full text-gray-700 dark:text-gray-300 text-lg w-6 mr-1 flex-none font-normal">1</span> The routing bit

In Leaf MVC, routes live in the `app/routes` directory. You'll find an index.php file along with some files that start with \_. These are partials—automatically loaded by Leaf to help you organize your routes however you like.

For our pre-launch page, we'll create a new route in the `app/routes/_prelaunch.php` file. Open the file and add a new route like this:

```php
<?php

app()->view('/prelaunch', 'prelaunch');
```

Okay, looks like some magic is happening here. Let's break it down:

- `app()` is a helper function that gives you access to the Leaf app instance, it is available from anywhere in your app.
- `view()` is a method that you can use to create a route that renders a Blade view. The first argument is what the user enters in the URL, and the second argument is the name of the view file to render.

### <span class="bg-[var(--vp-c-bg-alt)] h-6 inline-flex items-center justify-center rounded-full text-gray-700 dark:text-gray-300 text-lg w-6 mr-1 flex-none font-normal">2</span> The view bit

We created the route, but we'll get a very nasty error if we navigate to the `/prelaunch` page. That's because we don't have our prelaunch view, so let's create that. In our `app/views` folder, we can create a `prelaunch.blade.php` file.

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
    <form action="/notify" method="post">
        <input type="email" name="email" placeholder="Enter your email">
        <button type="submit">Notify Me</button>
    </form>
</body>
</html>
```

The most important bit here is the form. We're creating a simple form that takes an email address and sends it to a route that will handle the email. We'll create that route in a bit. Remember how to create a route?

### <span class="bg-[var(--vp-c-bg-alt)] h-6 inline-flex items-center justify-center rounded-full text-gray-700 dark:text-gray-300 text-lg w-6 mr-1 flex-none font-normal">3</span> Handling the form submission

This is the final bit of our pre-launch page, but also the most complicated part. We need to create a route that will call a controller, validate the email and save it to a database using a model. So basically, we will go through the entire MVC cycle plus a bit of configuration. Let's start with the route.

```php{4} [app/routes/_prelaunch.php]
<?php

app()->view('/prelaunch', 'prelaunch');
app()->post('/notify', 'NotifyController@notify');
```

We used the `post()` method this time because we want only POST requests to hit this route. The second argument is the controller and method that will handle the request. We can create the controller using the CLI.

```bash:no-line-numbers
php leaf g:controller notify
```

This will create a new controller in the `app/controllers` directory. Open the `NotifyController.php` file and add the `notify` method.

```php{7-10} [app/controllers/NotifyController.php]
<?php

namespace App\Controllers;

class NotifyController extends Controller
{
    public function notify()
    {
        // handle the email
    }
}
```

We're almost there! We need to validate the email and save it to a database. Validation is pretty simple with Leaf, we can use the `validate()` method on our request and pass in the rules we want to validate against.

```php{9-12} [app/controllers/NotifyController.php]
<?php

namespace App\Controllers;

class NotifyController extends Controller
{
    public function notify()
    {
        if (!$data = request()->validate(['email' => 'email'])) {
            // validation failed, redirect back with errors
            return response()->with('errors', response()->errors())->redirect('/prelaunch');
        }

        // save the email
    }
}
```

That's pretty much it for validation. We can now save the email to a database using the model. Let's create a model for our subscribers.

```bash:no-line-numbers
php leaf g:model Subscriber
```

We don't need to do anything to the model, however, we still have a bit more work to do. We have not connected our database to our application yet. We can do this by heading over to our `.env` file and adding our database credentials.

```env
DB_CONNECTION=mysql
DB_HOST=xxx
DB_PORT=xxx
DB_DATABASE=xxx
DB_USERNAME=xxx
DB_PASSWORD=xxx
```

Once you fill out this information, you may need to restart your server with `php leaf serve`. We have one more thing to do before we can save our email. We need to create our database tables. Leaf MVC gives us a simple way to do this using "schema files". We can create a schema file using the CLI.

```bash:no-line-numbers
php leaf g:schema subscribers
```

The name of the schema file should be the plural form of the table name. This will create a new schema file in the `app/database` directory. Open the file and add the columns you want in your table.

```php [app/database/subscribers.yml]
columns:
  email: string
```

Here, we are telling Leaf to add a column where we can store the email. We can now run the migration to create the table.

```bash:no-line-numbers
php leaf db:migrate
```

### <span class="bg-[var(--vp-c-bg-alt)] h-6 inline-flex items-center justify-center rounded-full text-gray-700 dark:text-gray-300 text-lg w-6 mr-1 flex-none font-normal">4</span> Saving the email

We can now save the email to the database using our `Subscriber` model.

```php{5,16-18} [app/controllers/NotifyController.php]
<?php

namespace App\Controllers;

use App\Models\Subscriber;

class NotifyController extends Controller
{
    public function notify()
    {
        if (!$data = request()->validate(['email' => 'email'])) {
            // validation failed, redirect back with errors
            return response()->withFlash('errors', response()->errors())->redirect('/prelaunch');
        }

        $subscriber = new Subscriber;
        $subscriber->email = $data['email'];
        $subscriber->save();

        return response()
          ->withFlash('success', 'Nice, we will send a mail when we launch!')
          ->redirect('/prelaunch');
    }
}
```

You can use the `withFlash()` method to send a message to the next request. This is useful for sending messages to the user after a redirect. We can now test our app by navigating to the `/prelaunch` page and submitting an email.

### <span class="bg-[var(--vp-c-bg-alt)] h-6 inline-flex items-center justify-center rounded-full text-gray-700 dark:text-gray-300 text-lg w-6 mr-1 flex-none font-normal">5</span> Deploying your app

We have built a simple pre-launch page using Leaf MVC. You can now deploy your app to a server using a service like [Heroku](/learn/deployment/heroku), [Fly.io](/learn/deployment/flyio) a VPS like [DigitalOcean](/learn/deployment/digitalocean), or even a shared hosting service like [Sevalla](/learn/deployment/sevalla).

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
