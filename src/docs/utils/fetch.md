# Leaf Fetch

When building your applications, you will probably end up needing to call APIs or fetch data from external sources. Leaf provides a simple and easy way to do this using Fetch. Fetch provides a clean and modern interface for making network requests in PHP. It is inspired by JavaScript's Fetch API, Axios and uses elements from [Unirest PHP](https://github.com/Kong/unirest-php).

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

Once installed, you can start using Fetch in your Leaf application.

## Making Requests

Fetch provides a simple and easy-to-use interface for making network requests in PHP. You can make GET, POST, PUT, DELETE, and other types of requests using Fetch.

Fetch also provides a clean and modern interface for working with response data.

You can write API requests like this:

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

Once this request is made, Fetch gives you a `FetchResponse` object which contains the response data, status code, headers, and more.

```json
"data": [],
"status": 200,
"headers": {},
"request": {}
```

You will usually want to access the response data. You can do this using the `data` property of the `FetchResponse` object.

```php:no-line-numbers
response()->json($response->data);
```

Put it all together and you have a simple and easy way to make network requests in PHP using Fetch.

```php
$response = fetch([
  'method' => 'GET',
  'url' => 'https://jsonplaceholder.typicode.com/todos/1'
]);

response()->json($response->data);
```

It gets even simpler when you're making a GET or POST request. Fetch provides some handy shortcuts to make these requests even easier.

## Making GET Requests

GET requests are the most common type of request you'll make when fetching data from an API. Fetch makes it easy to make GET requests using the global `fetch()` function. Here's an example of how you can make a GET request using Fetch:

```php:no-line-numbers
$res = fetch()->get('https://jsonplaceholder.typicode.com/todos/');

// data returned is saved in the $data property just like axios
response()->json($res->data);
```

Or you pass the url directly to the `fetch()` function.

```php:no-line-numbers
$res = fetch('https://jsonplaceholder.typicode.com/todos/');

// data returned is saved in the $data property just like axios
response()->json($res->data);
```

## Making Other Requests

Fetch works just like the Leaf router, in a sense that every request type has a shortcut method. You can call `get()`, `post()`, `put()`, `patch()`, `delete()` and `options()` to make any kind of request you want.

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

## Parameters for Requests

This is a list of all options you can pass to Fetch when making requests:

```php
[
  // `url` is the server URL that will be used for the request
  'url' => null,

  // `method` is the request method to be used when making the request
  'method' => 'GET', // default

  // `headers` are custom headers to be sent
  'headers' => [],

  // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  'params' => [],

  // `data` is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', 'DELETE , and 'PATCH'
  // When no `transformRequest` is set, must be of one of the following types:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser 'only' => FormData, File, Blob
  // - Node 'only' => Stream, Buffer
  'data' => [],

  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  'timeout' => 0, // default is `0` (no timeout)

  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  'withCredentials' => false, // default

  // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
  // This will set an `Authorization` header, overwriting any existing
  // `Authorization` custom headers you have set using `headers`.
  // Please note that only HTTP Basic auth is configurable through this parameter.
  // For Bearer tokens and such, use `Authorization` custom headers instead.
  'auth' => [],

  // `responseType` indicates the type of data that the server will respond with
  // options 'are' => 'arraybuffer', 'document', 'json', 'text', 'stream'
  //   browser 'only' => 'blob'
  'responseType' => 'json', // default

  // `responseEncoding` indicates encoding to use for decoding responses (Node.js only)
  // 'Note' => Ignored for `responseType` of 'stream' or client-side requests
  'responseEncoding' => 'utf8', // default

  // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  'xsrfCookieName' => 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  'xsrfHeaderName' => 'X-XSRF-TOKEN', // default

  // `maxContentLength` defines the max size of the http response content in bytes allowed in node.js
  'maxContentLength' => 2000,

  // `maxBodyLength` (Node only option) defines the max size of the http request content in bytes allowed
  'maxBodyLength' => 2000,

  // `maxRedirects` defines the maximum number of redirects to follow in node.js.
  // If set to 0, no redirects will be followed.
  'maxRedirects' => 5, // default

  // `socketPath` defines a UNIX Socket to be used in node.js.
  // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
  // Only either `socketPath` or `proxy` can be specified.
  // If both are specified, `socketPath` is used.
  'socketPath' => null, // default

  // `proxy` defines the hostname, port, and protocol of the proxy server.
  // You can also define your proxy using the conventional `http_proxy` and
  // `https_proxy` environment variables. If you are using environment variables
  // for your proxy configuration, you can also define a `no_proxy` environment
  // variable as a comma-separated list of domains that should not be proxied.
  // Use `false` to disable proxies, ignoring environment variables.
  // `auth` indicates that HTTP Basic auth should be used to connect to the proxy, and
  // supplies credentials.
  // This will set an `Proxy-Authorization` header, overwriting any existing
  // `Proxy-Authorization` custom headers you have set using `headers`.
  // If the proxy server uses HTTPS, then you must set the protocol to `https`. 
  'proxy' => [],

  // `decompress` indicates whether or not the response body should be decompressed 
  // automatically. If set to `true` will also remove the 'content-encoding' header 
  // from the responses objects of all decompressed responses
  // - Node only (XHR cannot turn off decompression)
  'decompress' => true, // default

  // If false, fetch will try to parse json responses
  'rawResponse' => false,

  // CURLOPT_SSL_VERIFYHOST accepts only 0 (false) or 2 (true).
  // Future versions of libcurl will treat values 1 and 2 as equals
  'verifyHost' => true, // default

  'verifyPeer' => true, // default

  // Set additional options for curl.
  'curl' => [],
];
```
