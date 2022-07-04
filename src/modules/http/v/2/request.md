# Leaf Request
<!-- markdownlint-disable no-inline-html -->

The request object is an abstraction of the current HTTP request and allows you to easily interact with any data passed into your application.

## Request class

The request class allows you to quickly access all the features of leaf request.

```php
Leaf\Http\Request::get("name");

// or

use Leaf\Http\Request;

Request::get("name");
```

## Request on the Leaf Instance

If you are using request in a leaf app, leaf automatically binds the request class to the leaf instance, so you can always access the leaf request object without having to include any classes or namespaces.

```php{4}
$app = new Leaf\App;

$app->post("/user/change-username", function() use($app) {
  echo $app->request()->get("username");
});
```

## Functional Mode <Badge text="new" />

Request now hooks into leaf 3's functional mode and comes with global functions you can use anywhere in your app. Read the [functional mode docs](/docs/tooling/functions) for all the information on functional mode.

```php{2}
app()->post("/items/add", function() {
  echo request()->get("username");
});
```

As you noticed above, we simply call the `request` method without doing anything. Everything is taken care of for us. Also, now, you can use this feature even when you are not using Leaf in your app.

::: danger Watch Out
In v2, you can NO LONGER pass an array or string to the `request` method to directly retrieve information from the request body.

```php
$name = request("name");
```

**THIS WILL NO LONGER WORK**
:::

## `get`

`get()` is a general purpose method which retrieves a particular item from the request body. In simpler terms, it works like `$_POST['key']` but works for all request types. It takes in one parameter: the key of the parameter you wish to get.

```php
$app->post('/name/add', function() use($app) {
  $name = request()->get('name');
});

// get: linkToApp?id=1
$id = request()->get('id');
```

In v2.4, `get` can also be used on files passed into the request.

```php
$picture = $request->get("image");
```

### Multiple select

In v2.4, you can retrieve a couple of fields you want, and not just one. You can also use this as a filter to return only the data you want in your app instead of using `body` which dumps all request data.

```php
$loginData = $request->get(["username", "password"]);
// ... do something with username
echo $loginData["username"];
```

This allows you to set data you need dynamically.

```php
list($username, $password) = array_values($request->get(["username", "password"]));
// ... do something with username
echo $username;
```

### Security Fixes

`get()` has also received a bunch of security fixes which prevent maliscious scripts from being passed into your application. In v2.4, you can choose not to sanitize data coming into your application by passing in `false` as the second parameter.

```php
// data is sanitized
$username = $request->get("username");
// data is sanitized
$title = $request->get("title", true);
// data is not sanitized
$blog = $request->get("blogBody", false);
```

## `try`

`try()` works just like `get` above, except that it conditionally returns items in the request. Let's look at an example:

```php
// get request: linkToApp?name=mychi
$data = request()->try(["name", "email"]);

// $data -> ["name" => "mychi"];
```

Unlike `get` and `body`, if the parameter to find in the request is not found, it will automatically be removed from the data returned. You can also remove empty strings from the request by passing `true` as a third parameter.

The available parameters are:

- array - The parameters to return
- bool - Sanitize output? Default `true`
- bool - Remove empty strings from return data? Default `false`

## `params`

Params is another method which works just like the `get` method above, however, unlike `get` and `try` above, it allows you to specify defaults for items in case they are not found. It also does NOT support multiple select.

```php
request()->params('description', 'No Description');
```

In case `description` was not passed into the request above, Leaf will return `No Description` instead of an null field.

## `body`

`body()` is another general purpose method which retrieves the key => value pairs of the entire request body. In simpler terms, it works like `$_POST` but works for all request types. In v2.4, `body` can also retrieve files passed into the request.

```php
$app->post('/name/add', function() use($app) {
  $body = request()->body();
});
```

### Security Fixes

`body()` has also received a bunch of security fixes which prevent maliscious scripts from being passed into your application. It accepts a boolean option which determines if the data coming into your application is sanitized or not. This means that you can turn off the sanitization in case you trust the source of data. By default, this option is enabled.

```php
// data is sanitized
$body = request()->body();

// data is sanitized
$body = request()->body(true);

// data is not sanitized
$body = request()->body(false);
```

## files

Files returns an array holding key values pairs of files passed into your app.

```php
$image = request()->files("profile_pic");
```

You can also get multiple files

```php
list($profile, $avatar) = array_values(request()->files(["profile", "avatar"]));
```

## Cookies

Leaf also provides a simple `cookies` method on the request object which allows you to get cookie data.

```php
// get specific cookie
request()->cookies("name");

// get all cookies
request()->cookies();
```

## headers

A Leaf application will automatically parse all HTTP request headers. You can access the request headers using the request object's `headers` method.

```php
<?php
// Get request headers as associative array
$headers = request()->headers();

// Get the ACCEPT_CHARSET header
$charset = request()->headers('ACCEPT_CHARSET');
```

The HTTP specification states that HTTP header names may be uppercase, lowercase, or mixed-case. Leaf is smart enough to parse and return header values whether you request a header value using upper, lower, or mixed case header name, with either underscores or dashes. So use the naming convention with which you are most comfortable.

## Request Method

Every HTTP request has a method (e.g. GET or POST). You can obtain the current HTTP request method via the Leaf application's request object:

### typeIs

This method allows you to check what method type a request uses.

```php
$isGetRequest = request()->typeIs("GET");
$isPostRequest = request()->typeIs("post");
$isDeleteRequest = request()->typeIs("Delete");

if ($isGetRequest) response()->throwErr("GET method not allowed");
```

Here are some other functions you can use relating to the request method.

```php
/**
 * What is the request method?
 * @return string (e.g. GET, POST, PUT, DELETE)
 */
request()->getMethod();
```

## Fixes in v2

### Bug fixes for `x-www-form-urlencoded data`

Requests with the content type `application/x-www-form-urlencoded data` had some inconsistencies being read in v1 of leaf, but all those issues have been taken care of in version 2 of leaf.

## XHR

When using a Javascript framework like MooTools or jQuery to execute an XMLHttpRequest, the XMLHttpRequest will usually be sent with a **X-Requested-With** HTTP header. The Leaf application will detect the HTTP request’s **X-Requested-With** header and flag the request as such. If for some reason an XMLHttpRequest cannot be sent with the **X-Requested-With** HTTP header, you can force the Leaf application to assume an HTTP request is an XMLHttpRequest by setting a GET, POST, or PUT parameter in the HTTP request named “isajax” with a truthy value.

Use the request object’s `isAjax()` or `isXhr()` method to tell if the current request is an XHR/Ajax request:

```php
$isXHR = request()->isAjax();
$isXHR = request()->isXhr();
```

## Helpers

The Leaf application’s request object provides several helper methods to fetch common HTTP request information:

## Content Type

Fetch the request’s content type (e.g. “application/json;charset=utf-8”):

```php
<?php
request()->getContentType();
```

## Media Type

Fetch the request’s media type (e.g. “application/json”):

```php
<?php
request()->getMediaType();
```

## Media Type Params

Fetch the request’s media type parameters (e.g. [charset => “utf-8”]):

```php
<?php
request()->getMediaTypeParams();
```

## Content Charset

Fetch the request’s content character set (e.g. “utf-8”):

```php
<?php
request()->getContentCharset();
```

## Content Length

Fetch the request’s content length:

```php
<?php
request()->getContentLength();
```

## Host

Fetch the request’s host (e.g. “leafphp.netlify.com”):

```php
<?php
request()->getHost();
```

## Host with Port

Fetch the request’s host with port (e.g. “leafphp.netlify.com:80”):

```php
<?php
request()->getHostWithPort();
```

## Port

Fetch the request’s port (e.g. 80):

```php
<?php
request()->getPort();
```

## Scheme

Fetch the request’s scheme (e.g. “http” or “https”):

```php
<?php
request()->getScheme();
```

## Path

Fetch the request’s path (root URI + resource URI):

```php
<?php
request()->getPath();
```

## URL

Fetch the request’s URL (scheme + host [ + port if non-standard ]):

```php
<?php
request()->getUrl();
```

## IP Address

Fetch the request’s IP address:

```php
<?php
request()->getIp();
```

## Referer

Fetch the request’s referrer:

```php
<?php
request()->getReferrer();
```

## User Agent

Fetch the request’s user agent string:

```php
<?php
request()->getUserAgent();
```

<hr>

## Paths

Every HTTP request received by a Leaf application will have a root URI and a resource URI.

## Root URI

The root URI is the physical URL path of the directory in which the Leaf application is instantiated and run. If a Leaf application is instantiated in **index.php** within the top-most directory of the virtual host’s document root, the root URI will be an empty string. If a Leaf application is instantiated and run in **index.php** within a physical subdirectory of the virtual host’s document root, the root URI will be the path to that subdirectory with a leading slash and without a trailing slash.

## Resource URI

The resource URI is the virtual URI path of an application resource. The resource URI will be matched to the Leaf application’s routes.

Assume the Leaf application is installed in a physical subdirectory **/foo** beneath your virtual host’s document root. Also assume the full HTTP request URL (what you’d see in the browser location bar) is **/foo/books/1**. The root URI is /foo (the path to the physical directory in which the Leaf application is instantiated) and the resource URI is **/books/1** (the path to the application resource).

You can get the HTTP request’s root URI and resource URI with the request object’s `getRootUri()` and `getResourceUri()` methods:

```php
$app = new \Leaf\App;

//Get root URI
$rootUri = request()->getRootUri();

//Get resource URI
$resourceUri = request()->getResourceUri();
```
