# Let's get started

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoModal from '@theme/components/shared/VideoModal.vue';
import Card from '@theme/components/shared/Card.vue';
import Button from '@theme/components/shared/Button.vue';
</script>

You can set up your first Leaf app in just a minute:

```bash
composer global require leafs/cli -W
leaf create my-app
cd my-app
leaf serve
```

Open your browser → `http://localhost:5500`

You now have a running app.

No setup maze. No config files. No ceremony.

## Everything you need, nothing you don't

Most PHP frameworks are complex, slow, and opinionated. Leaf is different. It gives you everything you need to start building immediately, without the setup overhead.

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  response()->json(['message' => 'Hello World!']);
});

app()->run();
```

Out of the box, you already have:

- 🔐 Authentication (login, signup, sessions, JWT)
- 🗄️ Database (query builder + ORM ready)
- 🌐 Routing & middleware
- 🛡️ Security (CSRF, headers, encryption)
- 📡 HTTP helpers (validation, cookies, responses)

With a ton of add-ons and integrations available with a simple command:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install <package-name>
```

```bash:no-line-numbers [Composer]
composer require leafs/<package-name>
```

:::

No wiring tools together. No setup overhead. Just build.

Tell your AI "build out authentication" and watch it scaffold a complete auth system using Leaf's built-in auth command in seconds.

::: details Technical Requirements

Before you start with Leaf, verify that your system has the following installed:

- PHP v7.4 or higher
- Composer (for package management)
- [Leaf CLI](/docs/cli/) (optional but recommended for easier app management)

If you don't have PHP and Composer installed, here are some easy options to get you set up:

- Beyond Code released an amazing tool called [Laravel Herd](https://herd.laravel.com/) that provides a quick and easy way to set up a local PHP development environment for Mac and Windows. It's a great way to get started with PHP if you don't have it installed yet.

- Another way to install PHP and Composer without any hassle is to use [php.new](https://php.new/) which was created by Beyond Code. It's a quick way to get started on Windows, Linux and Mac with just one command.

- A more traditional way on Windows, Linux and Mac, you can use [Xampp](https://www.apachefriends.org/), which is a free and open-source cross-platform web server solution stack package developed by Apache Friends, consisting mainly of the Apache HTTP Server, MariaDB database, and interpreters for scripts written in the PHP and Perl programming languages.

<VideoModal
  buttonText="Setup a project via CLI"
  subject="Watch the leaf installation walkthrough"
  videoUrl="https://www.youtube.com/embed/d3Y-aOPLf4c"
/>

:::

## What do you want to build?

Pick what you want to build:

<div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-4">
    <section class="flex">
        <div
            class="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg"
        >
            <div
                class="w-full flex md:flex-col bg-gradient-to-br from-purple-500 to-indigo-500"
            >
                <div
                    class="sm:max-w-sm sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6 xl:p-8"
                >
                    <h3 class="text-xl font-semibold mb-2 text-shadow !mt-0">
                        Micro-tool
                    </h3>
                    <p class="text-sm text-violet-200 text-shadow !my-0 font-medium">
                        Start simple. Ship fast
                    </p>
                    <p class="font-medium text-violet-100 text-shadow !mt-2 mb-4">
                        Perfect for ideas, small tools, experiments
                    </p>
                    <Button
                        as="a"
                        class="mt-auto bg-violet-800 hover:!bg-violet-800 !text-white bg-opacity-50 hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-bold py-2 px-4 inline-flex"
                        href="/learn/basic"
                        >Start simple</Button
                    >
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
    <section class="flex">
        <div
            class="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg"
        >
            <div
                class="w-full flex md:flex-col bg-gradient-to-br from-pink-500 to-rose-500"
            >
                <div
                    class="sm:max-w-sm sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6 xl:p-8"
                >
                    <h3 class="text-xl font-semibold mb-2 text-shadow !mt-0">
                        Web Apps
                    </h3>
                    <p class="text-sm text-rose-200 text-shadow !my-0 font-medium">
                        Build something real
                    </p>
                    <p class="font-medium text-rose-100 text-shadow !mt-2 mb-4">
                        Perfect for startups, internal tools, real user products
                    </p>
                    <Button
                        as="a"
                        href="/learn/mvc"
                        class="mt-auto bg-rose-900 hover:!bg-rose-900 !text-white bg-opacity-50 hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-bold py-2 px-4 inline-flex"
                        >Build your app</Button
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
    </section>
    <section class="flex">
        <div
            class="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg"
        >
            <div
                class="w-full flex md:flex-col bg-gradient-to-br from-yellow-400 to-orange-500"
            >
                <div
                    class="sm:max-w-sm sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6 xl:p-8"
                >
                    <h3 class="text-xl font-semibold mb-2 text-shadow !mt-0">
                        APIs
                    </h3>
                    <p class="text-sm text-amber-200 text-shadow !my-0 font-medium">
                        Power your frontend
                    </p>
                    <p class="font-medium text-amber-100 text-shadow !mt-2 mb-4">
                      Perfect for backends, integrations, mobile apps
                    </p>
                    <Button
                        as="a"
                        class="mt-auto bg-amber-900 hover:!bg-amber-900 !text-white bg-opacity-50 hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-bold py-2 px-4 inline-flex"
                        href="/learn/api"
                        >Create API</Button
                    >
                </div>
                <!-- <div class="relative hidden sm:block">
                    <div class="absolute left-2 bottom-3 xl:bottom-5">
                        Hello
                    </div>
                </div> -->
            </div>
            <div
                class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-orange-500 hidden sm:block"
            ></div>
        </div>
    </section>
</div>
<!-- - Swoole
- Queues
- Testing -->
<!-- - Rate Limiting -->
<!-- - Websockets -->
<!-- - Events -->
<!-- - Caching -->
<!-- - Testing -->
<!-- - Localization -->
<!-- - File Storage -->
<!-- - Cron Jobs -->
<!-- - Webhooks -->
<!-- - API Versioning -->
<!-- - Pagination -->
<!-- - Search -->
