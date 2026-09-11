---
next: false
prev: false
---

# Power your frontend

<!-- markdownlint-disable no-inline-html -->

<script setup>
import TutorialNumber from '@theme/components/shared/TutorialNumber.vue';
import Quickstart from '@theme/components/Docs/Quickstart.vue';
</script>

Build APIs that power your mobile apps, frontends, and third-party integrations, with JSON responses and auth ready when you need them.

<Quickstart api />

## Start from a working API

Out of the box, you can build:

- User authentication (login, signup, JWT)
- Mobile app backends
- Third-party integrations
- Payment webhooks
- Frontend APIs (for React, Vue, Svelte)

There's no wiring to do, and no guessing about structure.

## Your API is ready for AI

Leaf MVC gives agents shared project memory out of the box. Open an agent in the project and it reads `.leaf/CONTEXT.md` alongside your routes, controllers, models, and database files, then syncs useful structural changes back into the context.

Tell it:

> "Add a stripe webhook endpoint"
>
> "Create a user authentication API"
>
> "Build a todo list API"

No AI setup or context command is required.

If you use an external assistant without access to the project folder, run `leaf context` and paste the compact output into your conversation.

## Project Structure

Leaf organizes your API into a simple, convention-based structure:

- **Routes**: Define your endpoints
- **Controllers**: Handle requests and return JSON
- **Models**: Interact with your database
- **Database**: Your schema and migrations

```bash:no-line-numbers
├───app
│   ├── controllers
│   ├── database
│   ├── models
│   └── routes
└───public
```

## Ready for production

Once your API is built, tested, and ready, deploy it to [Heroku](/learn/deployment/heroku/), [Fly.io](/learn/deployment/flyio/), [DigitalOcean](/learn/deployment/digitalocean/), or any shared hosting service.

For your frontend, upload to Google PlayStore or the Apple App Store, use [Netlify](https://netlify.com), [Vercel](https://vercel.com), or [GitHub Pages](https://pages.github.com/) for web apps.

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

Now that you have an API live, here's what you need to know next:

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
              Learn more about routing in Leaf, including dynamic routes and middleware.
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
