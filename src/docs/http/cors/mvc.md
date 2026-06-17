---
next: false
prev: false
---

# CORS in Leaf MVC

<!-- markdownlint-disable no-inline-html -->

<section class="not-prose my-10 overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
  <div class="grid gap-0 2xl:grid-cols-[1fr_0.9fr]">
    <div class="border-b border-neutral-200 p-6 sm:p-8 2xl:border-b-0 2xl:border-r dark:border-neutral-800">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">MVC HTTP access</p>
      <h1 class="m-0 text-3xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-4xl">Configure browser access from your app environment.</h1>
      <p class="!m-0 !mt-4 text-base leading-7 text-neutral-600 dark:text-neutral-400">Leaf MVC wires CORS into the app for you, then lets production apps tighten allowed origins, methods, and headers through environment config or a published config file.</p>
    </div>
    <div class="bg-neutral-50 p-6 dark:bg-neutral-900/60 sm:p-8">
      <div class="rounded-lg border border-neutral-200 bg-white p-4 font-mono text-sm text-neutral-700 dark:border-neutral-800 dark:bg-black dark:text-neutral-300">
        <div>CORS_ALLOWED_ORIGINS='https://app.example.com'</div>
        <div class="text-[var(--vp-c-brand-1)]">CORS_ALLOWED_METHODS='GET,POST'</div>
        <div class="mt-4 text-sky-600 dark:text-sky-400">leaf config:publish cors</div>
      </div>
    </div>
  </div>
</section>

CORS is the browser security layer that decides which origins can read responses from your app. Since CORS is a common pain point for web developers, Leaf provides a first-party integration that takes care of the repetitive setup for you.

## Setting Up

You can install the CORS module through the Leaf CLI or with composer.

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install cors
```

```bash:no-line-numbers [Composer]
composer require leafs/cors
```

:::

After installing the CORS module, Leaf MVC will automatically set up CORS to handle all incoming requests without any limits. While this is great for development, it's not recommended for production. You can customize the CORS settings using the CORS config.

## Configuring CORS

Most of the configuration options can be configured using environment variables. Here are the available options:

```txt [.env]
CORS_ALLOWED_ORIGINS='/\.example\.com$/'
CORS_ALLOWED_METHODS='GET,HEAD,PUT,PATCH,POST,DELETE'
CORS_ALLOWED_HEADERS='*'
```

While this is easier and allows you to easily configure different environments, it can sometimes be limiting for example when you want to return a function for dynamically set your allowed origins. For this reason, you can publish your CORS configuration using the command below:

```bash:no-line-numbers
leaf config:publish cors
```

This will publish the CORS config file to `config/cors.php`, where you can customize the settings to your liking.

```php
<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Configure allowed origins
    |--------------------------------------------------------------------------
    |
    | Configures the Access-Control-Allow-Origin CORS header. Possible values:
    |
    | * String - set origin to a specific origin. For example if
    |   you set it to "http://example.com" only requests from
    |   "http://example.com" will be allowed.
    |
    | * RegExp - set origin to a regular expression pattern which will be
    |   used to test the request origin. If it's a match, the request origin
    |   will be reflected. For example the pattern /example\.com$/ will reflect
    |   any request that is coming from an origin ending with "example.com".
    |
    | * Array - set origin to an array of valid origins. Each origin can be a String
    |   or a RegExp. For example ["http://example1.com", /\.example2\.com$/] will
    |   accept any request from "http://example1.com" or from
    |   a subdomain of "example2.com".
    |
    | * Function - set origin to a function implementing some custom
    |   logic. The function takes the request origin as the first parameter
    |   and a callback (called as callback(err, origin), where origin is a
    |   non-function value of the origin option) as the second.
    |
    */
    'origin' => _env('CORS_ALLOWED_ORIGINS', '*'),

    /*
    |--------------------------------------------------------------------------
    | Configure allowed HTTP methods
    |--------------------------------------------------------------------------
    |
    | Configures the Access-Control-Allow-Methods CORS header.
    | Expects a comma-delimited string (ex: 'GET,PUT,POST') or
    | an array (ex: ['GET', 'PUT', 'POST'])
    |
    */
    'methods' => _env('CORS_ALLOWED_METHODS', 'GET,HEAD,PUT,PATCH,POST,DELETE'),

    /*
    |--------------------------------------------------------------------------
    | Configure allowed HTTP headers
    |--------------------------------------------------------------------------
    |
    | Configures the Access-Control-Allow-Headers CORS header. Expects a
    | comma-delimited string (ex: 'Content-Type,Authorization') or
    | an array (ex: ['Content-Type', 'Authorization']). If not specified,
    | defaults to reflecting the headers specified in the request's
    | Access-Control-Request-Headers header.
    |
    */
    'allowedHeaders' => _env('CORS_ALLOWED_HEADERS', '*'),

    /*
    |--------------------------------------------------------------------------
    | Configure expose headers
    |--------------------------------------------------------------------------
    |
    | Configures the Access-Control-Expose-Headers CORS header. Expects
    | a comma-delimited string (ex: 'Content-Range,X-Content-Range')
    | or an array (ex: ['Content-Range', 'X-Content-Range']).
    | If not specified, no custom headers are exposed.
    |
    */
    'exposedHeaders' => _env('CORS_EXPOSED_HEADERS', ''),

    /*
    |--------------------------------------------------------------------------
    | Configure credentials
    |--------------------------------------------------------------------------
    |
    | Configures the Access-Control-Allow-Credentials CORS header.
    | Set to true to pass the header, otherwise it is omitted.
    |
    */
    'credentials' => false,

    /*
    |--------------------------------------------------------------------------
    | Configure max age
    |--------------------------------------------------------------------------
    |
    | Configures the Access-Control-Max-Age CORS header. Set to
    | an integer to pass the header, otherwise it is omitted.
    |
    */
    'maxAge' => null,

    /*
    |--------------------------------------------------------------------------
    | Configure preflight continue
    |--------------------------------------------------------------------------
    |
    | Pass the CORS preflight response to the next handler.
    |
    */
    'preflightContinue' => false,

    /*
    |--------------------------------------------------------------------------
    | Log open
    |--------------------------------------------------------------------------
    |
    | Provides a status code to use for successful OPTIONS requests,
    | since some legacy browsers (IE11, various SmartTVs) choke on 204.
    |
    */
    'optionsSuccessStatus' => 204,
];
```

## Configuration Options

The `cors()` method takes in an array of options. Here are the available options:

- `origin`: Configures the **Access-Control-Allow-Origin** CORS header. Possible values:
  * `String` - set `origin` to a specific origin. For example if you set it to `"http://example.com"` only requests from "http://example.com" will be allowed.
  * `RegExp` - set `origin` to a regular expression pattern which will be used to test the request origin. If it's a match, the request origin will be reflected. For example the pattern `/example\.com$/` will reflect any request that is coming from an origin ending with "example.com".
  * `Array` - set `origin` to an array of valid origins. Each origin can be a `String` or a `RegExp`. For example `["http://example1.com", /\.example2\.com$/]` will accept any request from "http://example1.com" or from a subdomain of "example2.com".
  * `Function` - set `origin` to a function implementing some custom logic. The function takes the request origin as the first parameter and a callback (called as `callback(err, origin)`, where `origin` is a non-function value of the `origin` option) as the second.

- `methods`: Configures the **Access-Control-Allow-Methods** CORS header. Expects a comma-delimited string (ex: 'GET,PUT,POST') or an array (ex: `['GET', 'PUT', 'POST']`).

- `allowedHeaders`: Configures the **Access-Control-Allow-Headers** CORS header. Expects a comma-delimited string (ex: 'Content-Type,Authorization') or an array (ex: `['Content-Type', 'Authorization']`). If not specified, defaults to reflecting the headers specified in the request's **Access-Control-Request-Headers** header.

- `exposedHeaders`: Configures the **Access-Control-Expose-Headers** CORS header. Expects a comma-delimited string (ex: 'Content-Range,X-Content-Range') or an array (ex: `['Content-Range', 'X-Content-Range']`). If not specified, no custom headers are exposed.

- `credentials`: Configures the **Access-Control-Allow-Credentials** CORS header. Set to `true` to pass the header, otherwise it is omitted.

- `maxAge`: Configures the **Access-Control-Max-Age** CORS header. Set to an integer to pass the header, otherwise it is omitted.

- `preflightContinue`: Pass the CORS preflight response to the next handler.

- `optionsSuccessStatus`: Provides a status code to use for successful `OPTIONS` requests, since some legacy browsers (IE11, various SmartTVs) choke on `204`.

The default configuration is the equivalent of:

```json
{
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "allowedHeaders": "*",
  "exposedHeaders": "",
  "credentials": false,
  "maxAge": null,
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
}
```


## What to read next

CORS is a very important part of web development, especially when you're working with APIs. Just as this module improves your experience with Leaf, there are other modules that can help you build better apps with Leaf:

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
                    href="/docs/auth/permissions"
                    >Roles & Permissions<svg
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
                    href="/docs/http/session"
                    >Session Data<svg
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
              Save user data, flash messages, and more using Leaf's session module.
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
