---
next: false
prev: false
---

# CSRF Protection in Leaf MVC

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoModal from '@theme/components/shared/VideoModal.vue';
import Button from '@theme/components/shared/Button.vue';
</script>

A CSRF (Cross-Site Request Forgery) attack tricks a user into performing unwanted actions on your website without their knowledge. This can be done by sending a request to your website from another website the user is logged into. To prevent this, Leaf provides a powerful CSRF protection module that handles all the funny business for you.

::: details How does CSRF work?

If you're not familiar with CSRF attacks, this amazing explanation from the Laravel documentation will help you understand how they work.

> Imagine your application has a /user/email route that accepts a POST request to change the authenticated user's email address. Most likely, this route expects an email input field to contain the email address the user would like to begin using.
>
> Without CSRF protection, a malicious website could create an HTML form that points to your application's /user/email route and submits the malicious user's own email address:

```html
<form action="https://your-application.com/user/email" method="POST">
    <input type="email" value="malicious-email@example.com">
</form>
 
<script>
    document.forms[0].submit();
</script>
```

> If the malicious website automatically submits the form when the page is loaded, the malicious user only needs to lure an unsuspecting user of your application to visit their website and their email address will be changed in your application.
>
> To prevent this vulnerability, we need to inspect every incoming `POST`, `PUT`, `PATCH`, or `DELETE` request for a secret session value that the malicious application is unable to access.

:::

## Setting up

To get started, install the CSRF module:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install csrf
```

```bash:no-line-numbers [Composer]
composer require leafs/csrf
```

:::

Once installed, Leaf MVC will automatically setup a CSRF middleware that will protect your application from CSRF attacks. This middleware will verify that all data coming from forms has a valid CSRF token.

## Protecting your forms

To protect your forms, you need to add the CSRF token to your form data. You can do this by adding the `@csrf` directive to your form:

```blade
<form action="/user/email" method="POST">
    @csrf // [!code ++]
    <input type="email" name="email" value="email">
    <button type="submit">Submit</button>
</form>
```

The `@csrf` directive will generate a hidden input field containing the CSRF token. This token will be validated by the CSRF middleware when the form is submitted.

::: tip @csrf directive
We recommend using the `@csrf` directive on all your forms, even if you do not have the CSRF middleware enabled. Leaf will only process the directive if the CSRF middleware is enabled, but you will have the added security of CSRF protection if you decide to enable it in the future simply by adding the middleware to your application.
:::

## X-CSRF-Token Header

Leaf MVC also checks for the `X-CSRF-Token` header in requests, allowing single-page applications and mobile apps to handle CSRF protection without relying on PHP forms. If the header is present, Leaf MVC will use its token to verify the request.

::: code-group

```javascript [JavaScript]
fetch('https://your-application.com/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': 'YOUR_CSRF_TOKEN',
  },
  body: JSON.stringify({ name: 'John Doe' }),
});
```

```dart [Flutter]
final response = await http.post(
  Uri.parse('https://your-application.com/submit'),
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': 'YOUR_CSRF_TOKEN',
  },
  body: jsonEncode({'name': 'John Doe'}),
);
```

```swift [Swift]
let url = URL(string: "https://your-application.com/submit")!

var request = URLRequest(url: url)

request.httpMethod = "POST"
request.setValue("application/json", forHTTPHeaderField: "Content-Type")
request.setValue("YOUR_CSRF_TOKEN", forHTTPHeaderField: "X-CSRF-Token")
request.httpBody = try? JSONSerialization.data(withJSONObject: ["name": "John Doe"])

let task = URLSession.shared.dataTask(with: request) { data, response, error in
  // handle response
}
```

```python [Python]
import requests

url = 'https://your-application.com/submit'

headers = {
    'Content-Type': 'application/json',
    'X-CSRF-Token': 'YOUR_CSRF_TOKEN',
}

data = {'name': 'John Doe'}

response = requests.post(url, headers=headers, json=data)
```

:::

This will send a POST request to `/submit` with the CSRF token in the `X-CSRF-Token` header. The CSRF module will automatically verify the token and allow the request to go through if the token is valid.

## Displaying the generated token

The CSRF module also provides a `token()` method that returns the CSRF token. You can use this method to display the token in your views or to send the token to your frontend. Be careful not to expose the token to the public, as it can be used to bypass CSRF protection.

```php:no-line-numbers
$csrfToken = csrf()->token();
```

## Configuring the CSRF module

By default, the CSRF module will be enabled for all your `POST`, `PUT`, `PATCH`, and `DELETE` requests. If you want to exclude certain methods or make some other relevant changes, you will need to publish the configuration file:

```bash:no-line-numbers
php leaf config:publish csrf
```

This will create a `config/csrf.php` file in your application, which looks like this:

```php
<?php

return [
    /*
    |----------------------------------------------------------------
    | Enable/Disable CSRF Protection
    |----------------------------------------------------------------
    |
    | Leaf will automatically generate a CSRF token for each active
    | session. We still allow you to manually enable or disable
    | CSRF protection for your app by uncommenting the line below.
    |
    */
    // 'enabled' => true,

    /*
    |----------------------------------------------------------------
    | Secret
    |----------------------------------------------------------------
    |
    | This is the secret key used to generate the CSRF token. It is
    | combined with a random string to generate the token.
    |
    */
    'secret' => _env('APP_KEY', '@kor_leaf$0Secret!!_'),

    /*
    |----------------------------------------------------------------
    | Secret Key
    |----------------------------------------------------------------
    |
    | This is the key under which the token will be stored in the
    | session. It can also be used to retrieve the token from the
    | request headers.
    |
    */
    'secretKey' => 'X-Leaf-CSRF-Token',

    /*
    |----------------------------------------------------------------
    | Route Exceptions
    |----------------------------------------------------------------
    |
    | This is a list of routes that will be excluded from CSRF
    | verification. This is useful for APIs that need to bypass
    | the CSRF verification. You can use routes exactly as you
    | defined them, eg: `/profile`, `/blog/(\d+)`, `/post/{id}`
    |
    */
    'except' => [],

    /*
    |----------------------------------------------------------------
    | Configure allowed HTTP methods
    |----------------------------------------------------------------
    |
    | This is a list of HTTP methods that are the CSRF module will
    | be active on. All other methods will be ignored.
    |
    */
    'methods' => ['POST', 'PUT', 'PATCH', 'DELETE'],

    /*
    |----------------------------------------------------------------
    | Configure missing token message
    |----------------------------------------------------------------
    |
    | This is the message that will be returned when the CSRF token
    | is not found in the request.
    |
    */
    'messages.tokenNotFound' => 'Token not found.',

    /*
    |----------------------------------------------------------------
    | Configure invalid token message
    |----------------------------------------------------------------
    |
    | This is the message that will be returned when the CSRF token
    | is invalid.
    |
    */
    'messages.tokenInvalid' => 'Invalid token.',

    /*
    |----------------------------------------------------------------
    | Configure error handler
    |----------------------------------------------------------------
    |
    | By default, the CSRF module will return a built-in error page,
    | however, you can configure a custom error handler to handle
    | your own error pages.
    |
    | onError: function() {
    |     // Your custom error handler
    | }
    |
    */
    'onError' => null,
];
```

In this file, you can enable or disable CSRF protection, change the secret key, exclude routes from CSRF protection, and configure the allowed HTTP methods. You can also customize the messages shown when the CSRF token is not found or invalid.

## Handling Failed CSRF Verification

By default, Leaf will output a built-in error page when a CSRF token is invalid. You can customize the messages shown on this page by updating your config.

```php
'messages.tokenNotFound' => 'Token not found',
'messages.tokenInvalid' => 'Invalid token.',
```

This will still display the default error page, just with your custom messages. If you want to handle the error yourself, you can use the `onError` key to pass an error handler to the CSRF module.

```php
'onError' => function($error) {
  if ($error === "tokenNotFound") {
    // handle token not found error
  } else {
    // handle invalid token error
  }
}
```

## What to read next

CSRF protection is just one of the many security features Leaf provides. Check out some of the other features of Leaf & Leaf MVC:

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
