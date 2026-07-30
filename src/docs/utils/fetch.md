# Leaf Fetch

When building your applications, you will probably end up needing to call APIs or fetch data from external sources. Leaf gives you a simple way to do this with Fetch, a clean interface for making network requests in PHP, inspired by JavaScript's Fetch API and Axios.

Fetch is completely framework-agnostic, so while it feels right at home in a Leaf app, you can use it in Laravel, Symfony, WordPress, or plain PHP. The only requirement is the curl extension.

## Setting Up

To get started with Fetch, you need to install the Fetch package. You can do this using the Leaf CLI:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install fetch
```

```bash:no-line-numbers [Composer]
composer require leafs/fetch
```

:::

Once installed, you can start using Fetch in your application.

## Making Requests

The quickest way to make a request is to pass a URL straight to the `fetch()` function. A URL on its own is a GET request:

```php:no-line-numbers
$res = fetch('https://jsonplaceholder.typicode.com/todos/');

// data returned is saved in the $data property just like axios
response()->json($res->data);
```

For anything beyond a simple GET, you can describe your whole request with a single config array:

```php
$response = fetch([
  // HTTP method to send
  'method' => 'PUT',

  // URL to send request to
  'url' => 'https://jsonplaceholder.typicode.com/todos/1',

  // Request data to send along if any
  'data' => [
    'firstName' => 'Fred',
    'lastName' => 'Flintstone'
  ]
]);
```

Once this request is made, Fetch gives you a response object which contains the response data, status code, headers, and the request that produced it.

```json
"data": [],
"status": 200,
"headers": {},
"request": {}
```

You will usually want to access the response data. You can do this using the `data` property of the response object.

```php:no-line-numbers
response()->json($response->data);
```

## Request Shortcuts

Fetch works just like the Leaf router, in the sense that every request type has a shortcut method. You can call `get()`, `post()`, `put()`, `patch()`, `delete()`, `head()` and `options()` to make any kind of request you want.

```php
$res = fetch()->post('https://jsonplaceholder.typicode.com/posts', [
  'title' => 'foo',
  'body' => 'bar',
  'userId' => 1
]);

fetch()->put(...);
fetch()->patch(...);
fetch()->delete(...);
fetch()->options(...);

response()->json($res->data);
```

## Query Parameters

On GET requests, anything you pass as `data` is automatically appended to the URL as query parameters, nested arrays included:

```php
// requests /posts?page=2&tags[0]=php
fetch([
  'url' => '/posts',
  'data' => ['page' => 2, 'tags' => ['php']]
]);
```

If you need query parameters on a non-GET request (where `data` becomes the request body instead), use the `params` option. It appends to the URL for any method:

```php
// posts to /orders?notify=yes with a JSON body
fetch([
  'method' => 'POST',
  'url' => '/orders',
  'params' => ['notify' => 'yes'],
  'data' => ['sku' => 'leaf-tee'],
]);
```

## Request Bodies

Arrays you pass as `data` on POST, PUT, PATCH and DELETE requests are sent as JSON by default — no `json_encode()` needed:

```php:no-line-numbers
// sends {"sku":"leaf-tee","qty":2} with your request
fetch()->post('/orders', ['sku' => 'leaf-tee', 'qty' => 2]);
```

If you're talking to an endpoint that expects classic form encoding, just set the Content-Type header and Fetch switches the encoding of the same array for you:

```php
// sends sku=leaf-tee as a form body
fetch([
  'method' => 'POST',
  'url' => '/legacy/checkout',
  'data' => ['sku' => 'leaf-tee'],
  'headers' => ['Content-Type' => 'application/x-www-form-urlencoded'],
]);
```

## Setting Base URLs

Base URLs are useful when you're making requests to the same server or API. One popular use case for base URLs is when you're working with a REST API as it allows you to ignore typing lengthy URLs for every request.

You can set a base URL for all your requests using the `baseUrl()` method on the `fetch` function.

```php:no-line-numbers
fetch()->baseUrl('https://jsonplaceholder.typicode.com');
```

Now you can make requests without specifying the full URL.

```php
// https://jsonplaceholder.typicode.com/todos
$response = fetch('/todos');

// https://jsonplaceholder.typicode.com/posts
$response = fetch()->post('/posts', [
  'title' => 'foo',
  'body' => 'bar',
  'userId' => 1,
]);
```

The base URL only applies to relative URLs: if you pass a full `http://` or `https://` URL, it is used as-is, so you can still call other services without unsetting your base URL.

## Authentication

For HTTP Basic auth, pass your credentials with the `auth` option and Fetch sets up the Authorization header for you:

```php
fetch([
  'url' => '/admin/stats',
  'auth' => ['username' => 'mika', 'password' => 'secret'],
]);
```

For Bearer tokens and anything else, set the Authorization header directly:

```php
fetch([
  'url' => '/admin/stats',
  'headers' => ['Authorization' => 'Bearer my-token'],
]);
```

## Working with Responses

Every request returns a response object with four properties:

- `$response->data`: the response body. JSON responses are decoded for you; anything that isn't valid JSON is returned as the raw string.
- `$response->status`: the HTTP status code, e.g. `200` or `404`.
- `$response->headers`: the response headers as an array. Header names are always lower cased, so you can reliably read `$response->headers['content-type']`.
- `$response->request`: the full config of the request that produced this response, useful for debugging.

If you want the untouched response body even for JSON responses, set `rawResponse` to `true` and `data` will always be the raw string:

```php:no-line-numbers
$res = fetch(['url' => '/report.csv', 'rawResponse' => true]);
```

Note that Fetch does not throw exceptions for non-2xx status codes: a `404` or `500` still gives you a normal response object, so check `$response->status` when you need to. Fetch only throws an `\Exception` when the request itself fails: an unreachable host, DNS failure or a timeout.

```php
try {
  $res = fetch(['url' => 'https://api.example.com/todos', 'timeout' => 5]);

  if ($res->status !== 200) {
    // handle API errors
  }
} catch (\Exception $e) {
  // handle network errors
}
```

## App-wide defaults

If you find yourself passing the same options to every request, you can update the defaults for all subsequent requests using `Fetch::config()`:

```php
use Leaf\Fetch;

Fetch::config([
  'timeout' => 10,
  'headers' => ['X-App-Version' => 'v1.2.0'],
]);
```

## Parameters for Requests

This is the full list of options you can pass to Fetch when making requests, and every one of them is honoured:

```php
[
  // `url` is the server URL that will be used for the request
  'url' => null,

  // `method` is the request method to be used when making the request
  'method' => 'GET', // default

  // `baseUrl` is prepended to `url` unless `url` is absolute
  'baseUrl' => '',

  // `headers` are custom headers to be sent
  'headers' => [],

  // `params` are URL query parameters appended to the URL for ANY method
  'params' => [],

  // `data` is the data to be sent as the request body. Arrays are JSON
  // encoded by default; set a Content-Type header of
  // application/x-www-form-urlencoded to send classic form encoding instead.
  // On GET requests, `data` is appended to the URL as query parameters.
  'data' => [],

  // `timeout` specifies the number of seconds before the request times out.
  // If the request takes longer than `timeout`, an exception is thrown.
  'timeout' => 0, // default is `0` (no timeout)

  // `auth` indicates that HTTP Basic auth should be used, and supplies credentials:
  // ['username' => ..., 'password' => ...]
  // For Bearer tokens and such, use an `Authorization` header instead.
  'auth' => [],

  // `maxRedirects` defines the maximum number of redirects to follow.
  // If set to 0, no redirects will be followed.
  'maxRedirects' => 5, // default

  // If true, fetch will NOT try to parse json responses
  'rawResponse' => false,

  // CURLOPT_SSL_VERIFYHOST accepts only 0 (false) or 2 (true).
  'verifyHost' => true, // default

  // CURLOPT_SSL_VERIFYPEER
  'verifyPeer' => true, // default

  // Set additional options for curl. These are applied last,
  // so they can override anything Fetch sets up.
  'curl' => [],
];
```
