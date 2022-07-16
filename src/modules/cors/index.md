---
title: "CORS"
---

<!-- markdownlint-disable no-inline-html -->
# ✨ CORS

::: tip Note
In Leaf v3, CORS now has its own module. You no longer have to patch in headers or use `evadeCors` which was pretty much a temporary patch.
:::

This is a module used to enable and configure [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) with various options. This module can be used both in and out of Leaf and so can be considered a general module. It is also inspired by the [ExpressJS](https://github.com/expressjs/express) [CORS package](https://github.com/expressjs/cors).

## Installation

You can install CORS through Composer or the Leaf CLI.

```sh
composer reqiure leafs/cors
```

or

```sh
leaf install cors
```

## Usage

After installing the CORS module, the CORS module is automatically linked to the Leaf app and can be used directly without referencing it anywhere.

::: tip Outside Leaf
Leaf CORS can also be used without Leaf's core. You simply need to reference methods on `Leaf\Http\Cors` which is the class for CORS.

```php
Leaf\Http\Cors::config([
  'origin' => 'http://example.com',
  'optionsSuccessStatus' => 200,
]);
```

:::

### Simple Usage (Enable *All* CORS Requests)

```php
require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->cors();

$app->get('/products/{id}', function () use ($app) {
  $app->response()->json(['message' => 'This is CORS-enabled for all origins!']);
});

$app->run();
```

You can alternatively call `Leaf\Http\Cors::config()` instead of `$app->cors()` in the example above.

### Configuring CORS

```php
require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->cors([
  'origin' => 'http://example.com',
  'optionsSuccessStatus' => 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
]);

$app->get('/products/{id}', function () use ($app) {
  $app->response()->json(['message' => 'This is CORS-enabled for all origins!']);
});

$app->run();
```

## Configuration Options

* `origin`: Configures the **Access-Control-Allow-Origin** CORS header. Possible values:
  * `String` - set `origin` to a specific origin. For example if you set it to `"http://example.com"` only requests from "http://example.com" will be allowed.
  * `RegExp` - set `origin` to a regular expression pattern which will be used to test the request origin. If it's a match, the request origin will be reflected. For example the pattern `/example\.com$/` will reflect any request that is coming from an origin ending with "example.com".
  * `Array` - set `origin` to an array of valid origins. Each origin can be a `String` or a `RegExp`. For example `["http://example1.com", /\.example2\.com$/]` will accept any request from "http://example1.com" or from a subdomain of "example2.com".
  * `Function` - set `origin` to a function implementing some custom logic. The function takes the request origin as the first parameter and a callback (called as `callback(err, origin)`, where `origin` is a non-function value of the `origin` option) as the second.
* `methods`: Configures the **Access-Control-Allow-Methods** CORS header. Expects a comma-delimited string (ex: 'GET,PUT,POST') or an array (ex: `['GET', 'PUT', 'POST']`).
* `allowedHeaders`: Configures the **Access-Control-Allow-Headers** CORS header. Expects a comma-delimited string (ex: 'Content-Type,Authorization') or an array (ex: `['Content-Type', 'Authorization']`). If not specified, defaults to reflecting the headers specified in the request's **Access-Control-Request-Headers** header.
* `exposedHeaders`: Configures the **Access-Control-Expose-Headers** CORS header. Expects a comma-delimited string (ex: 'Content-Range,X-Content-Range') or an array (ex: `['Content-Range', 'X-Content-Range']`). If not specified, no custom headers are exposed.
* `credentials`: Configures the **Access-Control-Allow-Credentials** CORS header. Set to `true` to pass the header, otherwise it is omitted.
* `maxAge`: Configures the **Access-Control-Max-Age** CORS header. Set to an integer to pass the header, otherwise it is omitted.
* `preflightContinue`: Pass the CORS preflight response to the next handler.
* `optionsSuccessStatus`: Provides a status code to use for successful `OPTIONS` requests, since some legacy browsers (IE11, various SmartTVs) choke on `204`.

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
