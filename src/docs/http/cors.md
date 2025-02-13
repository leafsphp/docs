# Cors

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoModal from '@theme/components/shared/VideoModal.vue';
import Button from '@theme/components/shared/Button.vue';
</script>

From Wikipedia, Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources on a web page to be accessed from another domain outside the domain from which the first resource was served.

::: details What is CORS?

Cross-Origin Resource Sharing or CORS is a mechanism that allows browsers to request data from 3rd party URLs (or origins) and is a common pain point for web developers. Learn the basics of CORS in 100 seconds from Fireship.io.

<VideoModal
  subject="Watch this video on CORS by Fireship.io"
  videoUrl="https://www.youtube.com/embed/4KHiSt0oLJ0"
/>

:::

Since CORS is a common pain point for web developers, Leaf provides a first-party integration that takes care of all the heavy lifting for you.

<div
    class="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg sm:max-w-[50%]"
>
    <div
        class="w-full flex md:flex-col bg-gradient-to-br from-pink-500 to-rose-500"
    >
        <div
            class="sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6"
        >
            <h3 class="text-xl font-semibold mb-2 text-shadow !mt-0">
                Using Leaf MVC?
            </h3>
            <p class="font-medium text-rose-100 text-shadow mb-4">
                We've crafted a specialized guide for CORS in Leaf MVC. While it's similar to the base usage in Leaf, it's more detailed and tailored for Leaf MVC.
            </p>
            <Button
                as="a"
                href="/docs/http/cors/mvc"
                class="mt-auto bg-rose-900 hover:!bg-rose-900 !text-white bg-opacity-50 hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-bold py-2 px-4 inline-flex"
                >Start building</Button
            >
        </div>
    </div>
    <div
        class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-rose-500 hidden sm:block"
    ></div>
</div>

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

If you want to allow access to all subdomains of a domain, you can use just the website domain as the origin without the `http://` or `https://`.

```php
app()->cors([
  'origin' => 'example.com',
]);
```

This will allow `http://example.com`, `https://example.com`, `http://www.example.com`, and `https://some-subdomain.example.com` to access your app. Of course, you can also use a regular expression to match multiple domains. You can find a full list of options below.

## CORS + Leaf MVC

If you are using Leaf MVC, you can configure CORS using your environment variables in place of the configuration above:

```txt:no-line-numbers [.env]
CORS_ALLOWED_ORIGINS='/\.example\.com$/'
CORS_ALLOWED_METHODS='GET,HEAD,PUT,PATCH,POST,DELETE'
CORS_ALLOWED_HEADERS='*'
```

While this is easier and allows you to easily configure different environments, it can sometimes be limiting for example when you want to return a function for dynamically set your allowed origins. For this reason, you can publish your CORS configuration using the command below:

```bash:no-line-numbers
php leaf config:publish cors
```

This will create or update your CORS config in `config/cors.php`. You can then use the options below to configure the CORS module to suit your exact needs.

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
