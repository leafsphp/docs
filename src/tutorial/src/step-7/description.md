# Handling CORS

::: details What is CORS

Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served.

For Ajax and HTTP request methods that can modify data (usually HTTP methods other than GET, or for POST usage with certain MIME types), the specification mandates that browsers "preflight" the request, soliciting supported methods from the server with an HTTP OPTIONS request method, and then, upon "approval" from the server, sending the actual request with the actual HTTP request method. Servers can also notify clients whether "credentials" (including Cookies and HTTP Authentication data) should be sent with requests.

:::

If you've ever built a web app that interacts with another server, you've probably run into CORS issues. They are pretty common and can be a real pain to deal with.

Leaf provides a CORS package which helps you configure and handle CORS in your app.

This package allows you to configure which origins (websites), headers, ... should be allowed in your app.

::: details Adding leaf CORS to a project

This has already been done for you in the editor, so you can just go ahead and use it, however, if you want to add it to your project, you can do so with the leaf CLI or composer:

```bash
leaf install cors
```

Or with composer:

```bash
composer require leafs/cors
```

:::

Once the CORS package is added, it is automatically attached to the leaf instance, so you can configure it by calling the `cors` method.

```php{5}
<?php

require __DIR__ . '/vendor/autoload.php';

app()->cors();

app()->get('/', function () {
  $data = request()->get('name');
  response()->json($data);
});

app()->run();
```

Using `app()->cors()` automatically configures your app to accept any origin and header, but there's no need to do any of this in the editor as it's already been done for you.

## Adding Allowed Origins and Headers

The examples above allow all origins and headers to access your app, however in most cases you'll want to limit the origin to a particular app or service.

You can configure this by passing an array into the `cors()` function.

```php{5-7}
<?php

require __DIR__ . '/vendor/autoload.php';

app()->cors([
  'origin' => 'http://somewhere.com'
]);

app()->get('/', function () {
  $data = request()->get('name');
  response()->json($data);
});

app()->run();
```

All configuration you need to do is passed in through the associative array. Trying this example will throw a CORS error because the origin for this website is `leafphp.dev` but the origin in the example is `somewhere.com`. You can open up the console to see the full cors.

## Configuration Options

* `origin`: Configures the **Access-Control-Allow-Origin** CORS header. Possible values:
  * `String` - set `origin` to a specific origin. For example if you set it to `"http://example.com"` only requests from "http://example.com" will be allowed.
  * `RegExp` - set `origin` to a regular expression pattern which will be used to test the request origin. If it's a match, the request origin will be reflected. For example the pattern `/example\.com$/` will reflect any request that is coming from an origin ending with "example.com".
  * `Array` - set `origin` to an array of valid origins. Each origin can be a `String` or a `RegExp`. For example `["http://example1.com", "/\.example2\.com$/"]` will accept any request from "http://example1.com" or from a subdomain of "example2.com".
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

We can move on to the next step.
