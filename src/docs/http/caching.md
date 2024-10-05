# Http Cache

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoModal from '@theme/components/shared/VideoModal.vue'
</script>

HTTP caching is a way to store copies of web resources (like images, CSS files, or API responses) so they can be quickly accessed later without re-downloading them from the server every time. This speeds up loading times of your application and reduces the load on servers.

Leaf provides a clean interface for caching resources and instructing the client on how to cache them.

::: details New to HTTP Caching?

This video by @roadmapsh will help you understand everything you need to know about HTTP Caching and Cache-Control headers.

<VideoModal
  title="Lesson by @roadmapsh"
  subject="Everything you need to know about HTTP Caching"
  description="Web Cache or HTTP Cache allows you to store a copy of a resource and serve it back when requested. Serving the item from the cache, instead of re-downloading it from the origin server eases the load on the server, improves performance, and reduces the bandwidth usage on the server..."
  videoUrl="https://www.youtube.com/embed/HiBDZgTNpXY"
/>

:::

This documentation is a bit more technical and assumes you have a basic understanding of HTTP caching. If you're new to caching, you can watch the video above or [read this article](https://www.keycdn.com/blog/http-cache-headers) to get a better understanding.

## etag

An ETag is a unique identifier for a resource URI. After setting the Etag headers, the HTTP client will send an `If-None-Match` header with each subsequent HTTP request of the same resource URI. If the ETag value for the resource URI matches the `If-None-Match` HTTP request header, GET and HEAD requests will return a `304 Not Modified` HTTP response while all others return a `421 Precondition Failed` that will prompt the HTTP client to continue using its cache; this also prevents Leaf from serving the entire markup for the resource URI, saving bandwidth and response time.

Setting an ETag with Leaf is very simple. Invoke Leaf’s etag method in your route callback, passing it a unique ID as the first and only argument.

```php
use \Leaf\Http\Headers;

app()->get('/', function () {
  Headers::etag('unique-tag');

  echo 'This will be cached after the initial request!';
});
```

That’s it. Make sure the ETag ID is unique for the given resource. Also make sure the ETag ID changes as your resource changes; otherwise, the HTTP client will continue serving its outdated cache.

## expires

Used in conjunction with the Leaf application’s etag or lastModified methods, the expires method sets an Expires header on the HTTP response informing the HTTP client when its client-side cache for the current resource should be considered stale. The HTTP client will continue serving from its client-side cache until the expiration date is reached, at which time the HTTP client will send a conditional GET request to the Leaf application.

The expires method accepts one argument: an integer UNIX timestamp, or a string to be parsed with `strtotime()`.

```php
use \Leaf\Http\Headers;

app()->get('/', function () {
  Headers::etag('unique-tag');
  Headers::expires('+1 week');

  echo 'This will be cached client-side for one week';
});
```

## lastModified

A Leaf provides built-in support for HTTP caching using the resource’s last modified date. When you specify a last modified date, Leaf tells the HTTP client the date and time the current resource was last modified. The HTTP client will then send a If-Modified-Since header with each subsequent HTTP request for the given resource URI. If the last modification date you specify matches the If-Modified-Since HTTP request header, the Leaf will return a 304 Not Modified HTTP response that will prompt the HTTP client to use its cache; this also prevents the Leaf from serving the entire markup for the resource URI saving bandwidth and response time.

Setting a last modified date with Leaf is very simple. You only need to invoke the Leaf’s lastModified() method in your route callback passing in a UNIX timestamp of the last modification date for the given resource. Be sure the lastModified() method’s timestamp updates along with the resource’s last modification date; otherwise, the browser client will continue serving its outdated cache.

```php
use \Leaf\Http\Headers;

app()->get('/', function () {
  Headers::lastModified(1617383991);

  echo 'This will be cached after the initial request!';
});
```

## Other Headers

There are other cache-related headers that Leaf doesn't provide direct methods for. You can set these headers directly using Leaf's Headers::set() method.

```php
use \Leaf\Http\Headers;

app()->get('/', function () {
  Headers::set('Cache-Control', 'public, max-age=3600');

  echo 'This will be cached for 1 hour';
});
```

## Watch out

There are a few things to keep in mind when using these methods:

- It is best to use one of `etag()` or `lastModified()` - in conjunction with `expires()` - per route; never use both `etag()` and `lastModified()` together in the same route callback.

- The `etag()` and `lastModified()` methods should be invoked in a route callback before other code; this allows Leaf to check conditional GET requests before processing the route callback’s remaining code.

- Both `etag()` and `lastModified()` instruct the HTTP client to store the resource response in a client-side cache. The `expires()` method indicates to the HTTP client when the client-side cache should be considered stale.
