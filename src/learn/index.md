---
prev: false
next: false
---

<!-- markdownlint-disable no-inline-html -->

<h1>
  <small class="text-xl font-medium leading-10">Learn to write</small><br>
  <span class="mt-4 text-4xl sm:text-5xl font-bold">Elegant PHP</span><br>
  <strong class="text-4xl sm:text-5xl font-bold text-[#42d392]">Built for Makers</strong>
</h1>

<script setup>
import Button from '@theme/components/shared/Button.vue';
</script>

Welcome to the Makers' Guide to Leaf—your fast track to building with Leaf. This guide walks you through everything you need to start shipping quickly and efficiently, from hello world to deploying your app.

## Choose your path

<figure class="lg:w-2/4 flex-col justify-center items-center bg-[var(--vp-c-bg-alt)] p-4 md:p-10 rounded-3xl"><blockquote class="!border-none !mt-0 !mb-6 !px-0 !text-[var(--vp-c-text-1)]"><p class="text-center !text-lg !font-semibold sm:!text-xl leading-relaxed"><span class="text-gray-400">“</span>No application is the same, why should your framework be?<span class="text-gray-400">”</span></p></blockquote><figcaption class="sm:text-xl font-medium flex flex-col items-center"><div class="p-1 border-2 border-[var(--vp-c-brand)] rounded-full mb-3"><img src="https://avatars.githubusercontent.com/u/26604242?v=4" alt="" class="w-10 h-10 rounded-full bg-[var(--vp-c-brand)]" loading="lazy"></div><div class="text-base">Michael Darko</div><small class="text-[var(--vp-c-brand)] text-sm">Creator of Leaf PHP</small></figcaption></figure>

This is something we live and die by at Leaf. We believe that every application is unique and should be treated as such. That's why we've built Leaf to be as flexible as possible, allowing you to build your applications the way you want to. At the end of the day, we're here to help you build your applications, not to dictate how you should build them.

With that in mind, we've created a few paths to help you get started with Leaf. Whether you're building a simple app/API, a full-fledged web application, or a massive API, we've got you covered. Choose your path below to get started.

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

## Deploy your app

After building your app, you'll want to deploy it to the web so that others can access it. We've got you covered with our [deployment guides](/learn/deployment) that walk you through deploying your app to various platforms.

## Contributing

If you've written a tutorial that you think would be a great addition to our Learn section, feel free to submit a PR to our [GitHub repository](https://github.com/leafsphp/docs) with your tutorial. For our readers' benefit, be sure to follow the [contribution guide](/learn/contributing) when submitting your tutorial. Thank you for your contribution!
