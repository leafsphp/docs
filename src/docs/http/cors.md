# Cors

<!-- markdownlint-disable no-inline-html -->

<section class="not-prose my-10 overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
  <div class="grid gap-0 2xl:grid-cols-[1fr_0.9fr]">
    <div class="border-b border-neutral-200 p-6 sm:p-8 2xl:border-b-0 2xl:border-r dark:border-neutral-800">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">HTTP access</p>
      <h1 class="m-0 text-3xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-4xl">Let the right frontends talk to your API.</h1>
      <p class="!m-0 !mt-4 text-base leading-7 text-neutral-600 dark:text-neutral-400">Leaf CORS gives you a small, explicit configuration layer for browser access, preflight requests, credentials, and allowed origins.</p>
    </div>
    <div class="bg-neutral-50 p-6 dark:bg-neutral-900/60 sm:p-8">
      <div class="rounded-lg border border-neutral-200 bg-white p-4 font-mono text-sm text-neutral-700 dark:border-neutral-800 dark:bg-black dark:text-neutral-300">
        <div>app()-&gt;cors([</div>
        <div class="pl-4 text-[var(--vp-c-brand-1)]">'origin' =&gt; ['https://app.example.com'],</div>
        <div class="pl-4 text-sky-600 dark:text-sky-400">'methods' =&gt; ['GET', 'POST'],</div>
        <div>]);</div>
      </div>
      <div class="mt-4 rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
        <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">Using Leaf MVC?</p>
        <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Use the MVC CORS guide when your configuration lives with the rest of your application environment.</p>
        <a class="mt-3 inline-flex text-sm font-semibold text-[var(--vp-c-brand-1)] no-underline" href="/docs/http/cors/mvc">Open MVC CORS -&gt;</a>
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

## Enabling CORS

After installing the cors module, Leaf automatically links it to your app, so it can be used directly on the Leaf instance as the `cors()` method.

::: code-group

```php [Functional Mode]
app()->cors();

// ... your app
```

```php [Class Mode]
$app = new Leaf\App();
$app->cors();

// ... your app
```

:::

This will allow all users from any website to access your app, even if they are on a website you didn't explicitly allow. If you want to restrict access to your app, you can pass in an array of options to the `cors()` method.

```php
app()->cors([
  'origin' => ['http://example.com', 'http://example.org'],
  'methods' => ['GET', 'POST'],
]);
```

This will only allow users from `http://example.com` and `http://example.org` to access your app using the `GET` and `POST` methods. You can find a list of all available options below.

Origins are matched exactly, so each configured origin must be a full origin including the scheme, like `https://example.com`. A bare domain like `example.com` or any other partial value will not match, since substring matching would also let through look-alike origins like `https://example.com.evil.com`.

If you want to allow a whole family of origins, such as every subdomain of a site, you can use a regular expression written as a string:

```php
app()->cors([
  'origin' => '/^https:\/\/(.*\.)?example\.com$/',
]);
```

This will allow `https://example.com` and any of its subdomains, like `https://app.example.com`. You can also mix exact origins and regex strings in an array. When a specific origin matches, Leaf reflects the request's origin in the `Access-Control-Allow-Origin` header; with `origin` set to `'*'`, the header is a literal `*`.

::: tip Credentials and origins
If you set `credentials` to `true`, pair it with explicit origins rather than `'*'`. Browsers reject credentialed responses that allow every origin.
:::

## Configuration Options

The `cors()` method takes in an array of options. Here are the available options:

- `origin`: Configures the **Access-Control-Allow-Origin** CORS header. Possible values:
  * `String` - set `origin` to a specific origin, including the scheme. For example if you set it to `"https://example.com"` only requests from "https://example.com" will be allowed. Origins are matched exactly; partial values like `"example.com"` will not match.
  * `Regex string` - set `origin` to a regular expression written as a string, which will be tested against the request origin. If it matches, the request origin will be reflected. For example `'/^https:\/\/(.*\.)?example\.com$/'` will allow "https://example.com" and any of its subdomains.
  * `Array` - set `origin` to an array of valid origins. Each origin can be an exact origin or a regex string. For example `['https://example1.com', '/^https:\/\/(.*\.)?example2\.com$/']` will accept requests from "https://example1.com" or from "example2.com" and its subdomains.

- `credentials`: Configures the **Access-Control-Allow-Credentials** CORS header. Set to `true` to pass the header, otherwise it is omitted. When enabling credentials, use explicit origins rather than `'*'`, since browsers reject credentialed responses that allow every origin.

- `methods`: Configures the **Access-Control-Allow-Methods** CORS header. Expects a comma-delimited string (ex: 'GET,PUT,POST') or an array (ex: `['GET', 'PUT', 'POST']`).

- `allowedHeaders`: Configures the **Access-Control-Allow-Headers** CORS header. Expects a comma-delimited string (ex: 'Content-Type,Authorization') or an array (ex: `['Content-Type', 'Authorization']`). If not specified, defaults to reflecting the headers specified in the request's **Access-Control-Request-Headers** header.

- `exposedHeaders`: Configures the **Access-Control-Expose-Headers** CORS header. Expects a comma-delimited string (ex: 'Content-Range,X-Content-Range') or an array (ex: `['Content-Range', 'X-Content-Range']`). If not specified, no custom headers are exposed.

- `maxAge`: Configures the **Access-Control-Max-Age** CORS header. Set to an integer to pass the header, otherwise it is omitted.

- `preflightContinue`: Pass the CORS preflight response to the next handler.

- `optionsSuccessStatus`: The status code returned for successful preflight `OPTIONS` requests, since some legacy browsers (IE11, various SmartTVs) choke on `204`. Set it to `200` if you need to support those clients.

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
