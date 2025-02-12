# Meet Leaf PHP

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoModal from '@theme/components/shared/VideoModal.vue';
import Card from '@theme/components/shared/Card.vue';
import Button from '@theme/components/shared/Button.vue';
</script>

Leaf is PHP made simple—elegant, intuitive, and easy to pick up, with lightweight tools that help makers build, ship, and scale effortlessly.

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  response()->json(['message' => 'Hello World!']);
});

app()->run();
```

Leaf handles the heavy lifting so you can focus on building. It provides a simple routing system, powerful middleware support, seamless database integration, and a whole lot more.

As we love to say, "Writing code should be simple and fun, and that's what Leaf is all about."

## Why Leaf?

Most PHP frameworks are complex, slow, and opinionated. Leaf is different—it's built for makers.

- 🚀 Beginner-friendly – Get started in minutes with just basic PHP knowledge.
- ⚡ Lightweight & fast – A minimal core with high performance and low memory usage.
- 🛠️ Built for makers – Simple APIs, class-free initializers, and global functions that let you focus on shipping.
- 🔗 Seamless integration – Works effortlessly with any library or framework—no complex setups required.
- 📈 Scales with you – Everything you need—routing, database tools, authentication, and more—but stays unopinionated, letting you pick and choose what fits your project.

## Creating a new app

Leaf is built to be incrementally adoptable: use it as a lightweight core for small to medium apps, or scale up with [Leaf MVC](/docs/mvc/) for more structure in complex applications. No matter your stack, Leaf stays simple, fast, and developer-friendly—so you can build and ship with ease.

::: details Technical Requirements

Before you start with Leaf, verify that your system has PHP v7.4+, Composer (for package management) and [Leaf CLI](/docs/cli/) (optional but recommended for easier app management)

::: details Don't have PHP & Composer installed?

- Beyond Code released an amazing tool called [Laravel Herd](https://herd.laravel.com/) that provides a quick and easy way to set up a local PHP development environment for Mac and Windows. It's a great way to get started with PHP if you don't have it installed yet.

- Another way to install PHP and Composer without any hassle is to use [php.new](https://php.new/) which was created by Beyond Code. It's a quick way to get started on Windows, Linux and Mac with just one command.

- A more traditional way on Windows, Linux and Mac, you can use [Xampp](https://www.apachefriends.org/), which is a free and open-source cross-platform web server solution stack package developed by Apache Friends, consisting mainly of the Apache HTTP Server, MariaDB database, and interpreters for scripts written in the PHP and Perl programming languages.

:::

Once you install PHP and Composer, you can proceed with the installation of Leaf CLI:

```bash:no-line-numbers
composer global require leafs/cli
```

### Building your first app

After setting up Leaf CLI, you can create a new Leaf app using the `create` command:

```bash:no-line-numbers
leaf create <project-name>
```

This will walk you through a quick setup process where you can select the kind of application you want to build. You can find more options in the [CLI documentation](/docs/cli/).

Once your project is generated, you can run it using the `serve` command:

```bash:no-line-numbers
leaf serve
```

That's it! You're now ready to start building with Leaf. 🍃

<VideoModal
  buttonText="Setup a project via CLI"
  subject="Watch the leaf installation walkthrough"
  videoUrl="https://www.youtube.com/embed/d3Y-aOPLf4c"
/>

## Building with Leaf

No project is the same, why should your tools be? Leaf is designed to be flexible and adaptable, so you can build your way. Choose your path and start building with Leaf:

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
                        Basic Leaf App
                    </h3>
                    <p class="font-medium text-violet-100 text-shadow mb-4">
                        Use Leaf as a micro-framework to build simple apps and APIs.
                    </p>
                    <Button
                        as="a"
                        class="mt-auto bg-violet-800 hover:!bg-violet-800 !text-white bg-opacity-50 hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-bold py-2 px-4 inline-flex"
                        href="/learn/basic"
                        >Start building</Button
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
                        Leaf MVC App
                    </h3>
                    <p class="font-medium text-rose-100 text-shadow mb-4">
                        Add an MVC structure on top of Leaf for more complex apps.
                    </p>
                    <Button
                        as="a"
                        href="/learn/mvc"
                        class="mt-auto bg-rose-900 hover:!bg-rose-900 !text-white bg-opacity-50 hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-bold py-2 px-4 inline-flex"
                        >Start building</Button
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
                        MVC for APIs
                    </h3>
                    <p class="font-medium text-amber-100 text-shadow mb-4">
                      Build APIs with a structured approach for better organization.
                    </p>
                    <Button
                        as="a"
                        class="mt-auto bg-amber-900 hover:!bg-amber-900 !text-white bg-opacity-50 hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-bold py-2 px-4 inline-flex"
                        href="/learn/api"
                        >Start building</Button
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

<!-- <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
  <Card class="p-6 docs-section-card hover:!border-[var(--vp-c-border-alt)]">
  <h3 class="!text-lg">Hello Leaf 🍃</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Let's get you up and running</p>

  <ul>
    <li><a href="/docs/cli">Leaf CLI</a></li>
    <li><a href="/docs/migrating">Migrating from other frameworks</a></li>
  </ul>
  </Card>

  <Card class="p-6 docs-section-card hover:!border-[var(--vp-c-border-alt)]">
  <h3 class="!text-lg">Learning to walk 🚶</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Learn the core concepts of Leaf</p>

  <ul>
    <li><a href="/docs/routing/">Routing</a></li>
    <li><a href="/docs/http/request">Request</a></li>
    <li><a href="/docs/http/response">Response</a></li>
  </ul>
  </Card>

  <Card class="p-6 docs-section-card hover:!border-[var(--vp-c-border-alt)]">
  <h3 class="!text-lg">Pro walking now 🏃‍♂️</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Beginner concepts that make you feel like pro</p>

  <ul>
    <li><a href="/docs/http/cors">CORS</a></li>
    <li><a href="/docs/routing/middleware">Middleware</a></li>
    <li><a href="/docs/http/headers">Headers</a></li>
  </ul>
  </Card>
</div>

## Config & Deployment

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
  <Card class="p-6 docs-section-card hover:!border-[var(--vp-c-border-alt)]">
  <h3 class="!text-lg">Configuring Leaf ⚙️</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Setting up Leaf</p>

  <ul>
    <li><a href="/docs/config/">Configuring Leaf</a></li>
    <li><a href="/docs/config/environment">Env Variables</a></li>
    <li><a href="/docs/routing/error-handling">Error Handling</a></li>
  </ul>
  </Card>

  <Card class="p-6 docs-section-card hover:!border-[var(--vp-c-border-alt)]">
  <h3 class="!text-lg">Deployment 🚀</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Deploying your Leaf app</p>

  <ul>
    <li><a href="/docs/config/deployment">Deployment</a></li>
    <li><a href="/docs/utils/logging">Logging</a></li>
    <li><a href="/docs/config/debugging">Debugging</a></li>
    <li><a href="/docs/routing/url-rewriting">Url rewriting</a></li>
  </ul>
  </Card>
</div>

## Data Handling

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
  <Card class="p-6 docs-section-card hover:!border-[var(--vp-c-border-alt)]">
  <h3 class="!text-lg">Databases 🔐</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Store and Retrieve data on the fly</p>

  <ul>
    <li><a href="/docs/database/">Database</a></li>
    <li><a href="/docs/database/redis">Redis</a></li>
    <li><a href="/docs/database/others">Other DB Engines</a></li>
  </ul>
  </Card>

  <Card class="p-6 docs-section-card hover:!border-[var(--vp-c-border-alt)]">
  <h3 class="!text-lg">Using Data 🗄️</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Play around with data in your app</p>

  <ul>
    <li><a href="/docs/http/session">Sessions</a></li>
    <li><a href="/docs/http/cookies">Cookies</a></li>
    <li><a href="/docs/auth/">Authentication</a></li>
  </ul>
  </Card>

  <Card class="p-6 docs-section-card hover:!border-[var(--vp-c-border-alt)]">
  <h3 class="!text-lg">Validation 🛡️</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Make sure your data isn't exploitable</p>

  <ul>
    <li><a href="/docs/data/validation">Validation</a></li>
    <li><a href="/docs/data/encryption">Encryption</a></li>
    <li><a href="/docs/security/anchor">Leaf Anchor</a></li>
  </ul>
  </Card>
</div>

## Digging Deeper

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
  <Card class="p-6 docs-section-card hover:!border-[var(--vp-c-border-alt)]">
  <h3 class="!text-lg">Frontend 🎨</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Frontend development with Leaf</p>

  <ul>
    <li><a href="/docs/frontend/">Frontend</a></li>
    <li><a href="/docs/frontend/bareui">Bare UI</a></li>
    <li><a href="/docs/frontend/vite">Vite</a></li>
    <li><a href="/docs/http/tailwind">Tailwind CSS</a></li>
  </ul>
  </Card>

  <Card class="p-6 docs-section-card hover:!border-[var(--vp-c-border-alt)]">
  <h3 class="!text-lg">Utilities 🧹</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Everyday necessities for your apps</p>

  <ul>
    <li><a href="/docs/utils/fs">File System Ops</a></li>
    <li><a href="/docs/utils/mail">Mailing</a></li>
    <li><a href="/docs/utils/fetch">Data Fetching</a></li>
    <li><a href="/docs/utils/date">Date & Time</a></li>
  </ul>
  </Card>
</div>

## MVC

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
  <Card class="p-6 docs-section-card hover:!border-[var(--vp-c-border-alt)]">
  <h3 class="!text-lg">Leaf MVC 🌿</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Building apps with Leaf MVC</p>

  <ul>
    <li><a href="/docs/mvc/">Leaf MVC</a></li>
    <li><a href="/docs/mvc/controllers">Controllers</a></li>
    <li><a href="/docs/database/models">Models</a></li>
    <li><a href="/docs/frontend/">Views</a></li>
  </ul>
  </Card>

  <Card class="p-6 docs-section-card hover:!border-[var(--vp-c-border-alt)]">
  <h3 class="!text-lg">Database 🗄️</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Database operations in Leaf MVC</p>

  <ul>
    <li><a href="/docs/database/migrations">Migrations</a></li>
    <li><a href="/docs/database/schema">Schema</a></li>
    <li><a href="/docs/database/seeders">Seeders</a></li>
    <li><a href="/docs/database/factories">Factories</a></li>
  </ul>
  </Card>

  <Card class="p-6 docs-section-card hover:!border-[var(--vp-c-border-alt)]">
  <h3 class="!text-lg">Other Helpers 🖥️</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Make building MVC apps even easier</p>

  <ul>
    <li><a href="/docs/mvc/globals">MVC Helpers</a></li>
    <li><a href="/docs/mvc/libraries">Custom Libraries</a></li>
    <li><a href="/docs/mvc/console">MVC Console Tool</a></li>
  </ul>
  </Card>
</div> -->
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
