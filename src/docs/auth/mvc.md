---
next: false
prev: false
---

# Auth in Leaf MVC

Leaf Auth comes with everything you need to authenticate users, including login, registration, account verification and more. You can add it to your Leaf MVC project using the Leaf CLI or composer:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install auth
```

```bash:no-line-numbers [Composer]
composer require leafs/auth
```

:::

Leaf Auth will automatically pick up your default database connection and will work with it, so you can immediately start working with it without any config. Checkout the following pages to authenticate users:

- [Login](/docs/auth/login)
- [Register](/docs/auth/signup)
- [User Data](/docs/auth/user)
- [Protected routes](/docs/auth/protected-routes)
- [Roles & Permissions](/docs/auth/permissions)

## Configuring Auth

Although Leaf Auth works out of the box for most applications, you may have some specific requirements that you need to configure. You can configure Leaf Auth using your `.env` file:

```txt [.env]
AUTH_DB_TABLE=users
AUTH_DB_ID=id
AUTH_TIMESTAMPS=true
AUTH_TIMESTAMPS_FORMAT='YYYY-MM-DD HH:mm:ss'
AUTH_SESSIONS=true
```

These are options for the database table to store users, the primary key of the table, whether to use timestamps and the format of the timestamps, and whether to use sessions. If you need to configure something else, you will need to publish the entire auth config using the MVC CLI:

```bash:no-line-numbers
php leaf config:publish auth
```

This will generate a `config/auth.php` file with the default auth config. You can then edit this file to suit your needs.

```php
<?php

use Leaf\Helpers\Password;

return [
    /*
    |--------------------------------------------------------------------------
    | Database table
    |--------------------------------------------------------------------------
    |
    | This is the table that leaf auth will perform authentication
    | checks on and edit/retrieve users from.
    |
    */
    'db.table' => _env('AUTH_DB_TABLE', 'users'),

    /*
    |--------------------------------------------------------------------------
    | ID Key
    |--------------------------------------------------------------------------
    |
    |  Set your primary key name. For instance, you might have used id_user instead of id.
    |  This setting allows you to quickly switch your key name
    |
    */
    'id.key' => _env('AUTH_DB_ID', 'id'),

    /*
    |--------------------------------------------------------------------------
    | Generate timestamps
    |--------------------------------------------------------------------------
    |
    | Automatically generate created_at/updated_at timestamps for register
    | and update methods
    |
    */
    'timestamps' => true,

    /*
    |--------------------------------------------------------------------------
    | Set timestamps format
    |--------------------------------------------------------------------------
    |
    | Use this property to specify the format that you want your timestamps to be saved in.
    | Be aware that auth uses the leafs/date module, so the accepted formats are listed in the leafs/date documentation
    |
    */
    'timestamps.format' => 'YYYY-MM-DD HH:mm:ss',

    /*
    |--------------------------------------------------------------------------
    | Encode password
    |--------------------------------------------------------------------------
    |
    | Password encode is run when leaf wants to encode passwords on register
    | This exact method is used by default in Leaf, so you can set it to null
    | if you want to.
    |
    | You can set your own implementation instead of Password::hash
    |
    */
    'password.encode' => function ($password) {
        return Password::hash($password);
    },

    /*
    |--------------------------------------------------------------------------
    | Verify Password
    |--------------------------------------------------------------------------
    |
    | This function is run to verify the password. This implementation is done
    | by default, so you can set it to null, and it will still work fine.
    |
    | You can add your own implementation instead of Password::verify
    |
    */
    'password.verify' => function ($password, $hashedPassword) {
        return Password::verify($password, $hashedPassword);
    },

    /*
    |--------------------------------------------------------------------------
    | Password Key
    |--------------------------------------------------------------------------
    |
    | The default password key. Leaf will expect this key to hold passwords
    | in your database.
    |
    */
    'password.key' => 'password',

    /*
    |--------------------------------------------------------------------------
    | Unique fields
    |--------------------------------------------------------------------------
    |
    | This is a list of items that should be unique to each user eg: email
    |
    */
    'unique' => ['email'],

    /*
    |--------------------------------------------------------------------------
    | Hidden fields
    |--------------------------------------------------------------------------
    |
    | This is a list of items that should be hidden when
    | a user object is returned. You should use the field name
    | exactly as it is in the database.
    |
    */
    'hidden' => ['field.id', 'field.password'],

    /*
    |--------------------------------------------------------------------------
    | Use session
    |--------------------------------------------------------------------------
    |
    | Use session based authentication instead of the default JWT based auth.
    |
    */
    'session' => _env('AUTH_SESSION', true),

    /*
    |--------------------------------------------------------------------------
    | Session lifetime
    |--------------------------------------------------------------------------
    |
    | Set the lifetime of the session. After this time, the session will expire and the user will have to login again.
    | You can either use '1 day' format or as an integer: 86400
    | You can also set session.lifetime to 0 to disable session expiration.
    |
    */
    'session.lifetime' => 60 * 60 * 24,

    /*
    |--------------------------------------------------------------------------
    | SESSION COOKIE PARAMS
    |--------------------------------------------------------------------------
    |
    | Set the session cookie params
    | Read more: https://www.php.net/manual/en/function.session-set-cookie-params.php
    |
    | secure: cookie should only be sent over secure connections (https)
    | httponly: cookie should only be accessible through HTTP requests
    | samesite: cookie should be sent with "SameSite" directives :-
    |       Possible values for samesite: 'strict', 'lax', 'none' or null
    |
    |
    */
    'session.cookie' => ['secure' => false, 'httponly' => true, 'samesite' => 'lax'],

    /*
    |--------------------------------------------------------------------------
    | JWT Lifetime
    |--------------------------------------------------------------------------
    |
    | How long should JWT be valid for?
    |
    */
    'token.lifetime' => 60 * 60 * 24 * 365,

    /*
    |--------------------------------------------------------------------------
    | JWT Token Secret
    |--------------------------------------------------------------------------
    |
    | Secret string to encode JWT
    |
    */
    'token.secret' => _env('AUTH_TOKEN_SECRET', '@leaf$MVC*JWT#AUTH.Secret'),

    /*
    |--------------------------------------------------------------------------
    | Login params error
    |--------------------------------------------------------------------------
    |
    | Error to show when the login params aren't found in db
    |
    */
    'messages.loginParamsError' => 'Incorrect credentials!',

    /*
    |--------------------------------------------------------------------------
    | Password error
    |--------------------------------------------------------------------------
    |
    | Error to show when the login password is wrong
    |
    */
    'messages.loginPasswordError' => 'Password is incorrect!',
];
```

While this is quite lengthy, it offers fine-grained control over how Leaf Auth works in your application.

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
