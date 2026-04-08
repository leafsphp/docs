---
next: false
prev: false
---

# Start simple. Ship fast

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
                    You don’t need setup. You don’t need config. You already have a working app.
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

Leaf can be as minimal or as structured as you need. Start with a lightweight core for small tools and experiments, and scale up whenever you’re ready.

```bash:no-line-numbers
leaf create my-app --lite
cd my-app
leaf serve
```

Open your browser → `http://localhost:5500`

You’re live.

## A real micro-framework (without the pain)

You start with:

- 🌐 Routing
- 🧰 HTTP helpers (requests, responses)

That’s it.

No heavy framework.
No unnecessary features.

## Built for AI-assisted development

Leaf is designed to be AI-native, talk to your AI assistant and keep building without context switching. Just tell your AI what you want to build, and it will install the necessary packages and scaffold the code for you.

Tell your AI:

“Add a Stripe webhook”

And it has everything it needs:

- your routes
- your structure
- your conventions

No broken code. No hallucinated patterns.

You can also generate a complete, minified map of your project — ready to paste into ChatGPT or any AI assistant.

```bash:no-line-numbers
leaf context
```

No explaining your codebase.
No guessing.
Just accurate context, instantly.

## Need more? Add it instantly

Want to go old-school and wire things together yourself? No problem. Just install the modules you need:

```bash:no-line-numbers
leaf install auth
leaf install db
leaf install mail
leaf install <module-name>
```

That’s authentication, database, and email — ready to use.

No package hunting.
No glue code.
No “does this library work with that one?”

## Build something real in seconds

Once installed, everything works immediately:

```php
auth()->login([
  'email' => 'm@example.com',
  'password' => 'password'
]);

...

$cachedData = cache('queries.complexQuery');

...

$session = billing()->charge([
    'currency' => 'USD',
    'description' => 'Purchase of items in cart',
    'metadata' => [
        'cart_id' => $cartId,
        'items' => $cart->items(),
    ]
]);

response()->redirect($session->url());
```

No manual setup.
No configuration maze.
Everything just works!

## Grow at your own pace

Start small:

- Simple routes
- Lightweight APIs
- Tiny tools

Then scale up:

- Build full products
- Add payments, caching, ...
- Integrate with third-party services

All without changing frameworks.

## Deploying your app

After building your app, you need to deploy it so your users can access it. Leaf runs wherever PHP runs, so you can deploy your app to a server using a service like [Heroku](/learn/deployment/heroku/), [Fly.io](/learn/deployment/flyio/), [DigitalOcean](/learn/deployment/digitalocean/), or even a shared hosting service like [Sevalla](/learn/deployment/sevalla/).

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
                    >Want more structure?</strong
                >
                  This setup is great for simple applications or experimenting, but if you’re building something larger, consider using <a
                    href="/learn/mvc"
                    >Leaf MVC</a>  for a more structured approach with built-in conventions for bigger applications.
                </span>
        </div>
    </div>
</div>

## What to read next

Now that you have built a simple pre-launch page, the next step is to get you familiar with the basics of building a full-stack application with Leaf. So you can build and launch your next big idea _fast_.

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
                    href="/docs/routing/"
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
                    href="/docs/http/request"
                    >Handling Requests<svg
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
              Learn how to process incoming requests, handle form submissions, and more.
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
                    href="/docs/database/"
                    >Using Databases<svg
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
              Learn how to build queries, build relationships, and interact with your database programmatically.
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
