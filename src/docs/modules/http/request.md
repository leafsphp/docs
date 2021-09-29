<!-- markdownlint-disable no-inline-html -->
# 🧿 Leaf Request

The request object is an abstraction of the current HTTP request and allows you to easily interact with any data passed into your application. In v2.0, the request object has been directly bound to the main Leaf object, so there's no need to instanciate it anymore, although you can do so if you want to use it independently.

## Using Request

### Static Request

v2.4.3+ allows you to call request methods statically, which means you no longer need to initialize the whole package.

```php
Leaf\Http\Request::get("name");

// or

use Leaf\Http\Request;

Request::get("name");
```

### 🎄 Request on the Leaf Instance

Since Request is already bound to the Leaf instance, you can do this:

```php
$app = new Leaf\App;

$app->post("/user/change-username", function() use($app) {
  echo $app->request()->get("username");
});
```

Although we've added this, we don't want to force you to do stuff in only one way, so you can still use the `v1.x` method.

### 🎪 Initialising the Request object

With this method, you manually initialise the Request object, and then pass it into your route. Note that in version 2, `\Leaf\Core\Http\Request` has been shortened to `\Leaf\Http\Request`.

```php
$app = new Leaf\App;
$request = new Leaf\Http\Request;

$app->post("/items/add", function() use($request) {
  echo $request->get("username");
});
```

## 📖 Basic Usage

### get()

`get()` is a general purpose method which retrieves a particular item from the request body. In simpler terms, it works like `$_POST['key']` but works for all request types. It takes in one parameter: the key of the parameter you wish to get.

```php
$app->post('/name/add', function() use($app) {
  $name = $app->request()->get('name');
});

// get: linkToApp?id=1
$id = $app->request()->get('id');
```

In v2.4, `get` can also be used on files passed into the request.

```php
$picture = $request->get("image");
```

#### Multiple select

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

#### Security Fixes

`get()` has also received a bunch of security fixes which prevent maliscious scripts from being passed into your application. In v2.4, you can choose not to sanitize data coming into your application by passing in `false` as the second parameter.

```php
// data is sanitized
$username = $request->get("username");
// data is sanitized
$title = $request->get("title", true);
// data is not sanitized
$blog = $request->get("blogBody", false);
```

<hr>

### try() <sup class="new-tag-1">New</sup>

`try()` works just like `get` above, except that it conditionally returns items in the request. Let's look at an example:

```php
// get request: linkToApp?name=mychi
$data = $app->request()->try(["name", "email"]);

// $data -> ["name" => "mychi"];
```

Unlike `get` and `body`, if the parameter to find in the request is not found, it will automatically be removed from the data returned. You can also remove empty strings from the request by passing `true` as a third parameter.

The available parameters are:

- array - The parameters to return
- bool - Sanitize output? Default `true`
- bool - Remove empty strings from return data? Default `false`

#### Multiple select

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

<hr>

### body()

`body()` is another general purpose method which retrieves the key => value pairs of the entire request body. In simpler terms, it works like `$_POST` but works for all request types. In v2.4, `body` can also retrieve files passed into the request.

```php
$app->post('/name/add', function() use($app) {
  $body = $app->request()->body();
});
```

#### 🧐 Security Fixes

`body()` has also received a bunch of security fixes which prevent maliscious scripts from being passed into your application. Just like with `get`, v2.4 you the option to not sanitize data coming into your application by passing in `false`.

```php
// data is sanitized
$body = $app->request()->body();
// data is sanitized
$body = $app->request()->body(true);
// data is not sanitized
$body = $app->request()->body(false);
```

<hr>

### files

Files returns an array holding key values pairs of files passed into your app.

```php
$image = $request->files("profile_pic");
```

You can also get multiple files

```php
list($profile, $avatar) = array_values($request->files(["profile", "avatar"]));
```

<hr>

### Cookies

Leaf also provides a simple `cookies` method on the request object which allows you to get cookie data.

```php
// get specific cookie
$request->cookies("name");
// get all cookies
$request->cookies();
```

<hr>

### headers

A Leaf application will automatically parse all HTTP request headers. You can access the request headers using the request object’s `headers` method.

```php
<?php
$app = new \Leaf\App;

// Get request headers as associative array
$headers = $app->request()->headers();

// Get the ACCEPT_CHARSET header
$charset = $app->request()->headers('ACCEPT_CHARSET');
```

The HTTP specification states that HTTP header names may be uppercase, lowercase, or mixed-case. Leaf is smart enough to parse and return header values whether you request a header value using upper, lower, or mixed case header name, with either underscores or dashes. So use the naming convention with which you are most comfortable.

<hr>

### Request Method

Every HTTP request has a method (e.g. GET or POST). You can obtain the current HTTP request method via the Leaf application’s request object:

#### typeIs

In v2.4, individual request methodtype checks have been replaced with `typeIs`. So you'll no longer be seeing any of these:

```php
$app->request()->isGet();
$app->request()->isPost();
$app->request()->isPut();
$app->request()->isDelete();
$app->request()->isHead();
$app->request()->isOptions();
$app->request()->isPatch();
```

instead, you'll be working with:

```php
$isGetRequest = $app->request()->typeIs("GET");
$isPostRequest = $app->request()->typeIs("post");
$isDeleteRequest = $app->request()->typeIs("Delete");

if ($isGetRequest) $response->throwErr("GET method not allowed");
```

Here are some other functions you can use relating to the request method.

```php
/**
 * What is the request method?
 * @return string (e.g. GET, POST, PUT, DELETE)
 */
$app->request()->getMethod();

/**
 * Is this a XHR/AJAX request?
 * @return bool
 */
$app->request()->isAjax();
```

<hr>

### XHR

When using a Javascript framework like MooTools or jQuery to execute an XMLHttpRequest, the XMLHttpRequest will usually be sent with a **X-Requested-With** HTTP header. The Leaf application will detect the HTTP request’s **X-Requested-With** header and flag the request as such. If for some reason an XMLHttpRequest cannot be sent with the **X-Requested-With** HTTP header, you can force the Leaf application to assume an HTTP request is an XMLHttpRequest by setting a GET, POST, or PUT parameter in the HTTP request named “isajax” with a truthy value.

Use the request object’s `isAjax()` or `isXhr()` method to tell if the current request is an XHR/Ajax request:

```php
$isXHR = $app->request()->isAjax();
$isXHR = $app->request()->isXhr();
```

<hr>

## Helpers

The Leaf application’s request object provides several helper methods to fetch common HTTP request information:

### Content Type

Fetch the request’s content type (e.g. “application/json;charset=utf-8”):

```php
<?php
$app->request()->getContentType();
```

### Media Type

Fetch the request’s media type (e.g. “application/json”):

```php
<?php
$app->request()->getMediaType();
```

### Media Type Params

Fetch the request’s media type parameters (e.g. [charset => “utf-8”]):

```php
<?php
$app->request()->getMediaTypeParams();
```

### Content Charset

Fetch the request’s content character set (e.g. “utf-8”):

```php
<?php
$app->request()->getContentCharset();
```

### Content Length

Fetch the request’s content length:

```php
<?php
$app->request()->getContentLength();
```

### Host

Fetch the request’s host (e.g. “leafphp.netlify.com”):

```php
<?php
$app->request()->getHost();
```

### Host with Port

Fetch the request’s host with port (e.g. “leafphp.netlify.com:80”):

```php
<?php
$app->request()->getHostWithPort();
```

### Port

Fetch the request’s port (e.g. 80):

```php
<?php
$app->request()->getPort();
```

### Scheme

Fetch the request’s scheme (e.g. “http” or “https”):

```php
<?php
$app->request()->getScheme();
```

### Path

Fetch the request’s path (root URI + resource URI):

```php
<?php
$app->request()->getPath();
```

### URL

Fetch the request’s URL (scheme + host [ + port if non-standard ]):

```php
<?php
$app->request()->getUrl();
```

### IP Address

Fetch the request’s IP address:

```php
<?php
$app->request()->getIp();
```

### Referer

Fetch the request’s referrer:

```php
<?php
$app->request()->getReferrer();
```

### User Agent

Fetch the request’s user agent string:

```php
<?php
$app->request()->getUserAgent();
```

<hr>

## Paths

Every HTTP request received by a Leaf application will have a root URI and a resource URI.

### Root URI

The root URI is the physical URL path of the directory in which the Leaf application is instantiated and run. If a Leaf application is instantiated in **index.php** within the top-most directory of the virtual host’s document root, the root URI will be an empty string. If a Leaf application is instantiated and run in **index.php** within a physical subdirectory of the virtual host’s document root, the root URI will be the path to that subdirectory with a leading slash and without a trailing slash.

### Resource URI

The resource URI is the virtual URI path of an application resource. The resource URI will be matched to the Leaf application’s routes.

Assume the Leaf application is installed in a physical subdirectory **/foo** beneath your virtual host’s document root. Also assume the full HTTP request URL (what you’d see in the browser location bar) is **/foo/books/1**. The root URI is /foo (the path to the physical directory in which the Leaf application is instantiated) and the resource URI is **/books/1** (the path to the application resource).

You can get the HTTP request’s root URI and resource URI with the request object’s `getRootUri()` and `getResourceUri()` methods:

```php
$app = new \Leaf\App;

//Get root URI
$rootUri = $app->request()->getRootUri();

//Get resource URI
$resourceUri = $app->request()->getResourceUri();
```
