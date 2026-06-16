---
next: false
prev: false
---

# Leaf + MVC

<!-- markdownlint-disable no-inline-html -->

<script setup>
import MvcIntroPage from '@theme/components/Docs/MvcIntroPage.vue';
import Button from '@theme/components/shared/Button.vue';
</script>

<MvcIntroPage section="hero" />

## What is MVC?

MVC stands for Model-View-Controller. It separates your application into the parts that hold data, display interfaces, and respond to requests.

<MvcIntroPage section="parts" />

::: details New to MVC?
MVC is a simple way to keep application code organized. Models talk to data, views present the interface, and controllers coordinate requests. Traversy Media has a useful overview if you want a broader introduction before building with Leaf.

[Watch the MVC overview](https://www.youtube.com/watch?v=pCvZtjoRq1I)
:::

## MVC in Leaf

Leaf MVC is a minimal setup for building structured applications. It adds the folders and commands most projects need, but avoids forcing your app into a heavy framework model.

<MvcIntroPage section="flow" />

## Directory Structure

Leaf MVC's directory structure is inspired by Rails and Laravel, but it stays lightweight and flexible. A fresh app starts with the places most product code naturally belongs.

<MvcIntroPage section="tree" />

Modules may also generate folders like `storage` for logs, cache, and temporary files.

## Configuring Leaf MVC

Leaf MVC works out of the box. Most projects only need a few environment variables, so there is no config directory until you publish one.

<MvcIntroPage section="config" />

## Application Environment

Leaf MVC ships with a `.env.example` file that is copied to `.env` during installation. Values are automatically loaded and available through the `_env()` helper.

```php
$database = _env('DB_DATABASE');
$databaseWithDefault = _env('DB_DATABASE', 'leaf');
```

Do not commit your `.env` file. Leaf MVC already adds it to `.gitignore` because it can contain database credentials, API keys, and other secrets.

## Building with Leaf MVC

Leaf MVC gives you structure without taking away your choices. Build a full-stack app, serve a frontend with Inertia or Blade, or expose a clean JSON API for any client.

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
