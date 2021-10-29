---
aside: none
---

<!-- markdownlint-disable no-inline-html -->
# 🏠 Application Headers

::: warning Watch out
Leaf request is a class available on the leaf http module. Check out the [http module docs](/modules/http/) for installation instructions.
:::

In previous versions of Leaf, Headers have been added to the request and response objects and could not be fully accesed directly, however, v2.4 provides a Headers object which allows you perform all header operations smoothly. Another amazing thing is that all Leaf Header methods are static, and so can be called directly without initializing the Headers object.

<div class="alert -info">
You can still use most header methods from within the response and request objects, you can refer to those if you want to, however, this package comes with ore features and better useability.  
</div>

To get started with the Headers object, you simply need to call whatever method you need on the `Leaf\Http\Headers` object. Since it's static, there's no need to initialize it.

## Headers Methods

Below are the methods you can use on the Headers object:

### status

This method sets or returns the base HTTP status of a response. Response methods allow you to directly set http status codes, however, if you want to use PHP's native output methods, you can set the status code here.

```php
// ...
Leaf\Http\Headers::status(404);
echo "Page not found";
```

You can also return the currently set status code.

```php
$code = Leaf\Http\Headers::status();
```

<hr>

### resetStatus

If for some reason, you're not able to set the status using `status`, you can always fallback to `resetStatus`. This method uses PHP's inbuilt `http_response_code`.

```php
// ...
Leaf\Http\Headers::resetStatus(200);
echo "Something here";
```

<hr>

### all

This method returns all headers passed into your Leaf app. It takes in a single optional parameter, whether to sanitize header data or not, it is set to false by default.

```php
// will not sanitize headers
Leaf\Http\Headers::all();

// will not sanitize headers
Leaf\Http\Headers::all(false);

// will sanitize headers
Leaf\Http\Headers::all(true);
```

<hr>

### get

This method as the name implies returns a particular header.

```php
$content = Leaf\Http\Headers::get("Content-Type");
```

You can also get multiple headers at the same time.

```php
$headerGroup = Leaf\Http\Headers::get(["Content-Type", "Authorization"]);
```

Just like `all`, you can also sanitize the information from `get`.

```php
$data = Leaf\Http\Headers::get("header", true);
```

<hr>

### set

`set` allows you to set a new response header. It takes in 4 parameters:

- The header to to set
- Value for header
- Replace similar header?
- An http status code

```php
Leaf\Http\Headers::set("location", "/home", true, 302);
```

You can also set multiple values at once.

```php
Leaf\Http\Headers::set(["location" => "/home", "something" => "here"]);
```

If you want multiple headers with the same name, you can set replace to `false`. This will force multiple headers of the same type.

```php
Leaf\Http\Headers::set([
  "WWW-Authenticate" => "Negotiate",
  "WWW-Authenticate" => "NTLM"
], null, false);
```

<hr>

### remove

This method removes previously set headers.

```php
// single value
Leaf\Http\Headers::remove("WWW-Authenticate");

// multiple value
Leaf\Http\Headers::remove(["Content-Type", "WWW-Authenticate"]);
```

## Utility Header methods

Some shortcut methods have been prepared for the most used headers, so you won't need to stress yourself writing a bunch of stuff for simple tasks.

### contentPlain

This method set's the content type of the response to `text/plain`, it also takes in an HTTP status code.

```php
Leaf\Http\Headers::contentPlain(200);
echo "plain text here";
```

### contentHtml

This method set's the content type of the response to `text/html`, it also takes in an HTTP status code.

```php
Leaf\Http\Headers::contentHtml(200);
echo "html here";
```

### contentJSON

This method set's the content type of the response to `application/json`, it also takes in an HTTP status code.

```php
Leaf\Http\Headers::contentJSON(200);
echo "json here";
```

### accessControl

This method allows you to quickly set `Access-Control` headers in your app. It takes in 3 parameters:

- The header to set
- The value to set
- A status code (optional)

```php
Leaf\Http\Headers::accessControl("Allow-Origin", "https://example.com", 200);
```

You can set mutiple access control headers at once:

```php
Leaf\Http\Headers::accessControl(["Allow-Origin" => "*", "Allow-Headers" => "*"]);
```

## HTTP Caching

Leaf now comes with built-in support for HTTP caching with its `etag`, `lastModified`, and `expires` methods. It is best to use one of `etag` or `lastModified` - in conjunction with `expires` - per route; never use both `etag` and `lastModified` together in the same route callback.

The `etag` and `lastModified` methods should be invoked in a route callback before other code; this allows Leaf to check conditional GET requests before processing the route callback’s remaining code.

Both `etag` and `lastModified` instruct the HTTP client to store the resource response in a client-side cache. The `expires` method indicates to the HTTP client when the client-side cache should be considered stale.

### etag

An ETag is a unique identifier for a resource URI. After setting the Etag headers, the HTTP client will send an `If-None-Match` header with each subsequent HTTP request of the same resource URI. If the ETag value for the resource URI matches the `If-None-Match` HTTP request header, GET and HEAD requests will return a `304 Not Modified` HTTP response while all others return a `421 Precondition Failed` that will prompt the HTTP client to continue using its cache; this also prevents Leaf from serving the entire markup for the resource URI, saving bandwidth and response time.

Setting an ETag with Leaf is very simple. Invoke Leaf’s etag method in your route callback, passing it a unique ID as the first and only argument.

```php
use \Leaf\Http\Headers;

$app->get("/", function () use ($app) {
  Headers::etag("unique-tag");

  echo "This will be cached after the initial request!";
});
```

That’s it. Make sure the ETag ID is unique for the given resource. Also make sure the ETag ID changes as your resource changes; otherwise, the HTTP client will continue serving its outdated cache.

### expires

Used in conjunction with the Leaf application’s etag or lastModified methods, the expires method sets an Expires header on the HTTP response informing the HTTP client when its client-side cache for the current resource should be considered stale. The HTTP client will continue serving from its client-side cache until the expiration date is reached, at which time the HTTP client will send a conditional GET request to the Leaf application.

The expires method accepts one argument: an integer UNIX timestamp, or a string to be parsed with strtotime.

```php
use \Leaf\Http\Headers;

$app->get("/", function () use ($app) {
  Headers::etag("unique-tag");
  Headers::expires("+1 week");

  echo "This will be cached client-side for one week";
});
```

### lastModified

A Leaf provides built-in support for HTTP caching using the resource’s last modified date. When you specify a last modified date, Leaf tells the HTTP client the date and time the current resource was last modified. The HTTP client will then send a If-Modified-Since header with each subsequent HTTP request for the given resource URI. If the last modification date you specify matches the If-Modified-Since HTTP request header, the Leaf will return a 304 Not Modified HTTP response that will prompt the HTTP client to use its cache; this also prevents the Leaf from serving the entire markup for the resource URI saving bandwidth and response time.

Setting a last modified date with Leaf is very simple. You only need to invoke the Leaf’s lastModified() method in your route callback passing in a UNIX timestamp of the last modification date for the given resource. Be sure the lastModified() method’s timestamp updates along with the resource’s last modification date; otherwise, the browser client will continue serving its outdated cache.

```php
use \Leaf\Http\Headers;

$app->get("/", function () use ($app) {
  Headers::lastModified(1617383991);

  echo "This will be cached after the initial request!";
});
```
