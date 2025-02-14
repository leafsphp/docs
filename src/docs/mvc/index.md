---
next: false
prev: false
---

# Leaf + MVC

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoModal from '@theme/components/shared/VideoModal.vue';
import Button from '@theme/components/shared/Button.vue';
</script>

Leaf is a lightweight PHP framework with a ton of loosely coupled libraries that can be used to build any kind of application. By default, Leaf doesn't give you a lot of structure, but it fully supports the MVC pattern without any extra configuration.

## What is MVC?

MVC stands for Model-View-Controller. It is a pattern that separates your application into three distinct parts:

- Models: These are the classes that represent your data. They are responsible for interacting with your database, and for validating your data.
- Views: These are the files that are responsible for displaying your data to your user. They are usually written in HTML, but can also be written in other templating languages like [BareUI](/docs/frontend/bareui) or [Blade](/docs/frontend/blade) or frameworks like [Vue](https://vuejs.org/) or [React](https://reactjs.org/)
- Controllers: These are the classes that are responsible for handling the user's request, and for returning the appropriate response.

::: details New to MVC?
If you're new to the MVC pattern, you can take a look at this video by Traversy Media that explains the MVC pattern, how it works and how it works in real-world applications.

<VideoModal
  description="If you're new to the MVC pattern, you can take a look at this video by Traversy Media that explains the MVC pattern, how it works and how it works in real-world applications."
  videoUrl="https://www.youtube.com/embed/pCvZtjoRq1I"
/>
:::

## MVC in Leaf

Leaf MVC is a minimal yet powerful setup for building applications with the MVC pattern. It extends Leaf with additional tools and structure, making development faster and more intuitive. With a clean, organized codebase, Leaf MVC is a great starting point for building scalable and maintainable applications.

<VideoModal
  buttonText="Building with Leaf MVC 4"
  description="This video talks about building with Leaf MVC v4"
  videoUrl="https://www.youtube.com/embed/_uB3NpV5o0A"
/>

<img src="https://github.com/user-attachments/assets/5fc4e221-8728-4d37-8683-28455f685d1f" alt="Leaf MVC 4" class="w-full rounded-lg outline outline-gray-100 dark:outline-gray-700 mt-6" />

## Directory Structure

Leaf MVC’s directory structure is inspired by [Rails](https://rubyonrails.org/) and [Laravel](https://laravel.com/) but remains lightweight and flexible. It’s a solid starting point, fully equipped with everything you need to build a modern web application.

A fresh Leaf MVC app follows this structure:

::: code-group

```bash:no-line-numbers [Default Starter]
├───app
│   ├── controllers
│   ├── database
│   ├── models
│   ├── routes
│   └── views
└───public
    └───assets
        ├── css
        └── img
```

```bash:no-line-numbers [API Starter]
├───app
│   ├── controllers
│   ├── database
│   ├── models
│   └── routes
└───public
```

:::

- app/ – This is where all your application logic lives, including controllers, models, views, and routes. Your database files also reside here.
- public/ – Contains publicly accessible files like bundled CSS, JavaScript, and images. This is the only directory exposed to the browser.

There are also some folders that may be generated automatically by modules like the `storage` directory, which is used to store logs, cache, and other temporary files.

## Configuring Leaf MVC

Leaf MVC works out of the box with minimal setup—most apps just need a few tweaks in the .env file, so it doesn’t include a config directory by default. When customization is needed, config files are organized by feature, making it easy to adjust settings without affecting others. To publish all default config files, run the following command:

```bash:no-line-numbers
php leaf config:publish
```

This command will create the `config` directory in your app and copy all default config files, just like in earlier versions. You can also publish a specific config file while keeping the rest untouched:

```bash:no-line-numbers
php leaf config:publish <config-file>
```

Here is a list of all available Leaf MVC config files:

| Config file       |  Use-case                                                     |
| ----------------- | :------------------------------------------------------------ |
| app               | Configuration for core features                               |
| auth              | Configuration for authentication (requires auth module)       |
| cors              | Configuration for cors (requires cors module)                 |
| csrf              | Configuration for csrf protection (requires csrf module)      |
| database          | Configuration for database stuff                              |
| mail              | Configuration for mailing (requires mail module)              |
| redis             | Configuration for redis management (requires redis module)    |
| view              | Configuration for view rendering                              |

## Application Environment

Leaf MVC includes a `.env.example` file, which is copied to `.env` during installation. This file stores environment variables like database credentials, making it easy to configure different environments (development, testing, production). All values in `.env` are automatically loaded into the application, and you can access them using the `_env()` helper function. This function takes a key and an optional default value if the variable isn't set. Here's an example:

```php
$database = _env('DB_DATABASE');
$databaseWithDefault = _env('DB_DATABASE', 'leaf');
```

Be careful not to commit your `.env` file to your version control system as it contains sensitive information. We have already added the `.env` file to your `.gitignore` file so you don't have to worry about this.

## Building with Leaf MVC

Although Leaf MVC is structured, it is still incredibly flexible, and offers you different ways to build your application. You can build a full-stack application using your favourite frontend tooling, or an extensive API using all the tools Leaf MVC provides. We have guides on how to build different types of applications with Leaf MVC, so you can choose the one that best fits your use-case.

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-4">
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
                        MVC for Full-stack
                    </h3>
                    <p class="font-medium text-rose-100 text-shadow mb-4">
                        Build full-stack applications with Leaf MVC.
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
