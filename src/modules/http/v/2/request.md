# Leaf Request
<!-- markdownlint-disable no-inline-html -->

The request object is an abstraction of the current HTTP request and allows you to easily interact with any data passed into your application.

## Usage

<div class="functional-mode">

- ### Functional Mode
<!-- <Badge text="new" /> -->

Request now hooks into leaf 3's functional mode and comes with global functions you can use anywhere in your app. Read the [functional mode docs](/docs/tooling/functions) for all the information on functional mode.

```php{2}
app()->post("/items/add", function () {
  echo request()->get("username");
});
```

As you noticed above, we simply call the `request` method without doing anything. Everything is taken care of for us. Also, now, you can use this feature even when you are not using Leaf in your app.

::: danger Watch Out
In Leaf Http v2, you can NO LONGER pass an array or string to the `request` method to directly retrieve information from the request body.

```php
$name = request("name");
```

**THIS WILL NO LONGER WORK**
:::

</div>
<div class="class-mode">

- ### Request class

The request class allows you to quickly access all the features of leaf request.

```php
Leaf\Http\Request::get("name");

// or

use Leaf\Http\Request;

Request::get("name");
```

</div>

- ### Request on the Leaf Instance

If you are using request in a leaf app, leaf automatically binds the request class to the leaf instance, so you can always access the leaf request object without having to include any classes or namespaces.

<div class="functional-mode">

```php{4}
app()->post("/user/change-username", function () {
  echo app()->request()->get("username");
});
```

Although you can do this, there's no need to go with this method since you have access to the `request` global.

</div>
<div class="class-mode">

```php{4}
$app = new Leaf\App;

$app->post("/user/change-username", function () use($app) {
  echo $app->request()->get("username");
});
```

</div>

## `get`

`get()` is a general purpose method which retrieves a particular item from the request body. In simpler terms, it works like `$_POST['key']` but works for all request types. It takes in one parameter: the key of the parameter you wish to get.

<div class="class-mode">

```php
$app->post('/name/add', function () use($app) {
  $name = $app->request()->get('name');
});

// get: linkToApp?id=1
$id = $app->request()->get('id');
```

</div>
<div class="functional-mode">

```php
app()->post('/name/add', function () {
  $name = request()->get('name');
});

// get: linkToApp?id=1
$id = request()->get('id');
```

</div>

In v2.4, `get` can also be used on files passed into the request.

<div class="class-mode">

```php
$picture = $app->request()->get("image");
```

</div>
<div class="functional-mode">

```php
$picture = request()->get("image");
```

</div>

### Multiple select

In v2.4, you can retrieve a couple of fields you want, and not just one. You can also use this as a filter to return only the data you want in your app instead of using `body` which dumps all request data.

<div class="class-mode">

```php
$loginData = $app->request()->get(["username", "password"]);
// ... do something with username
echo $loginData["username"];
```

</div>
<div class="functional-mode">

```php
$loginData = request()->get(["username", "password"]);
// ... do something with username
echo $loginData["username"];
```

</div>

This allows you to set data you need dynamically.

<div class="class-mode">

```php
list($username, $password) = array_values($app->request()->get(["username", "password"]));
// ... do something with username
echo $username;
```

</div>
<div class="functional-mode">

```php
list($username, $password) = array_values(request()->get(["username", "password"]));
// ... do something with username
echo $username;
```

</div>

### Security Fixes

`get()` has also received a bunch of security fixes which prevent maliscious scripts from being passed into your application. In v2.4, you can choose not to sanitize data coming into your application by passing in `false` as the second parameter.

<div class="class-mode">

```php
// data is sanitized
$username = $app->request()->get("username");
// data is sanitized
$title = $app->request()->get("title", true);
// data is not sanitized
$blog = $app->request()->get("blogBody", false);
```

</div>
<div class="functional-mode">

```php
// data is sanitized
$username = request()->get("username");
// data is sanitized
$title = request()->get("title", true);
// data is not sanitized
$blog = request()->get("blogBody", false);
```

</div>

## `try`

`try()` works just like `get` above, except that it conditionally returns items in the request. Let's look at an example:

<div class="class-mode">

```php
// get request: linkToApp?name=mychi
$data = $app->request()->try(["name", "email"]);

// $data -> ["name" => "mychi"];
```

</div>
<div class="functional-mode">

```php
// get request: linkToApp?name=mychi
$data = request()->try(["name", "email"]);

// $data -> ["name" => "mychi"];
```

</div>

Unlike `get` and `body`, if the parameter to find in the request is not found, it will automatically be removed from the data returned. You can also remove empty strings from the request by passing `true` as a third parameter.

The available parameters are:

- array - The parameters to return
- bool - Sanitize output? Default `true`
- bool - Remove empty strings from return data? Default `false`

## `params`

Params is another method which works just like the `get` method above, however, unlike `get` and `try` above, it allows you to specify defaults for items in case they are not found. It also does NOT support multiple select.

<div class="class-mode">

```php
$app->request()->params('description', 'No Description');
```

</div>
<div class="functional-mode">

```php
request()->params('description', 'No Description');
```

</div>

In case `description` was not passed into the request above, Leaf will return `No Description` instead of an null field.

## `body`

`body()` is another general purpose method which retrieves the key => value pairs of the entire request body. In simpler terms, it works like `$_POST` but works for all request types. In v2.4, `body` can also retrieve files passed into the request.

<div class="class-mode">

```php
$app->post('/name/add', function () use($app) {
  $body = $app->request()->body();
});
```

</div>
<div class="functional-mode">

```php
app()->post('/name/add', function () {
  $body = request()->body();
});
```

</div>

### Security Fixes

`body` has also received a bunch of security fixes which prevent maliscious scripts from being passed into your application. It accepts a boolean option which determines if the data coming into your application is sanitized or not. This means that you can turn off the sanitization in case you trust the source of data. By default, this option is enabled.

<div class="class-mode">

```php
// data is sanitized
$body = $app->request()->body();

// data is sanitized
$body = $app->request()->body(true);

// data is not sanitized
$body = $app->request()->body(false);
```

</div>
<div class="functional-mode">

```php
// data is sanitized
$body = request()->body();

// data is sanitized
$body = request()->body(true);

// data is not sanitized
$body = request()->body(false);
```

</div>

## files

Files returns an array holding key values pairs of files passed into your app.

<div class="class-mode">

```php
$image = $app->request()->files("profile_pic");
```

</div>
<div class="functional-mode">

```php
$image = request()->files("profile_pic");
```

</div>

You can also get multiple files

<div class="class-mode">

```php
list($profile, $avatar) = array_values($app->request()->files(["profile", "avatar"]));
```

</div>
<div class="functional-mode">

```php
list($profile, $avatar) = array_values(request()->files(["profile", "avatar"]));
```

</div>

## Cookies

Leaf also provides a simple `cookies` method on the request object which allows you to get cookie data.

<div class="class-mode">

```php
// get specific cookie
$app->request()->cookies("name");

// get all cookies
$app->request()->cookies();
```

</div>
<div class="functional-mode">

```php
// get specific cookie
request()->cookies("name");

// get all cookies
request()->cookies();
```

</div>

## headers

A Leaf application will automatically parse all HTTP request headers. You can access the request headers using the request object's `headers` method.

<div class="class-mode">

```php
// Get request headers as associative array
$headers = $app->request()->headers();

// Get the ACCEPT_CHARSET header
$charset = $app->request()->headers('ACCEPT_CHARSET');
```

</div>
<div class="functional-mode">

```php
// Get request headers as associative array
$headers = request()->headers();

// Get the ACCEPT_CHARSET header
$charset = request()->headers('ACCEPT_CHARSET');
```

</div>

The HTTP specification states that HTTP header names may be uppercase, lowercase, or mixed-case. Leaf is smart enough to parse and return header values whether you request a header value using upper, lower, or mixed case header name, with either underscores or dashes. So use the naming convention with which you are most comfortable.

## Request Methods

Every HTTP request has a method (e.g. GET or POST). You can obtain the current HTTP request method via the Leaf application's request object:

### typeIs

This method allows you to check what method type a request uses.

<div class="class-mode">

```php
$isGetRequest = $app->request()->typeIs("GET");
$isPostRequest = $app->request()->typeIs("post");
$isDeleteRequest = $app->request()->typeIs("Delete");

if ($isGetRequest) $app->response()->exit("GET method not allowed");
```

</div>
<div class="functional-mode">

```php
$isGetRequest = request()->typeIs("GET");
$isPostRequest = request()->typeIs("post");
$isDeleteRequest = request()->typeIs("Delete");

if ($isGetRequest) response()->exit("GET method not allowed");
```

</div>

Here are some other functions you can use relating to the request method.

<div class="class-mode">

```php
/**
 * What is the request method?
 * @return string (e.g. GET, POST, PUT, DELETE)
 */
$app->request()->getMethod();
```

</div>
<div class="functional-mode">

```php
/**
 * What is the request method?
 * @return string (e.g. GET, POST, PUT, DELETE)
 */
request()->getMethod();
```

</div>

## Fixes in v2

### Bug fixes for `x-www-form-urlencoded data`

Requests with the content type `application/x-www-form-urlencoded data` had some inconsistencies being read in v1 of leaf, but all those issues have been taken care of in version 2 of leaf.

## XHR

When using a Javascript framework like MooTools or jQuery to execute an XMLHttpRequest, the XMLHttpRequest will usually be sent with a **X-Requested-With** HTTP header. The Leaf application will detect the HTTP request’s **X-Requested-With** header and flag the request as such. If for some reason an XMLHttpRequest cannot be sent with the **X-Requested-With** HTTP header, you can force the Leaf application to assume an HTTP request is an XMLHttpRequest by setting a GET, POST, or PUT parameter in the HTTP request named “isajax” with a truthy value.

Use the request object’s `isAjax()` or `isXhr()` method to tell if the current request is an XHR/Ajax request:

<div class="class-mode">

```php
$isXHR = $app->request()->isAjax();
$isXHR = $app->request()->isXhr();
```

</div>
<div class="functional-mode">

```php
$isXHR = request()->isAjax();
$isXHR = request()->isXhr();
```

</div>

## Helpers

The Leaf application’s request object provides several helper methods to fetch common HTTP request information:

## Content Type

Fetch the request’s content type (e.g. “application/json;charset=utf-8”):

<div class="class-mode">

```php
$app->request()->getContentType();
```

</div>
<div class="functional-mode">

```php
request()->getContentType();
```

</div>

## Media Type

Fetch the request’s media type (e.g. “application/json”):

<div class="class-mode">

```php
$app->request()->getMediaType();
```

</div>
<div class="functional-mode">

```php
request()->getMediaType();
```

</div>

## Media Type Params

Fetch the request’s media type parameters (e.g. [charset => “utf-8”]):

<div class="class-mode">

```php
$app->request()->getMediaTypeParams();
```

</div>
<div class="functional-mode">

```php
request()->getMediaTypeParams();
```

</div>

## Content Charset

Fetch the request’s content character set (e.g. “utf-8”):

<div class="class-mode">

```php
$app->request()->getContentCharset();
```

</div>
<div class="functional-mode">

```php
request()->getContentCharset();
```

</div>

## Content Length

Fetch the request’s content length:

<div class="class-mode">

```php
$app->request()->getContentLength();
```

</div>
<div class="functional-mode">

```php
request()->getContentLength();
```

</div>

## Host

Fetch the request’s host (e.g. “leafphp.dev”):

<div class="class-mode">

```php
request()->getHost();
```

</div>
<div class="functional-mode">

```php
$app->request()->getHost();
```

</div>

## Host with Port

Fetch the request’s host with port (e.g. “leafphp.dev:80”):

<div class="class-mode">

```php
$app->request()->getHostWithPort();
```

</div>
<div class="functional-mode">

```php
request()->getHostWithPort();
```

</div>

## Port

Fetch the request’s port (e.g. 80):

<div class="class-mode">

```php
$app->request()->getPort();
```

</div>
<div class="functional-mode">

```php
request()->getPort();
```

</div>

## Scheme

Fetch the request’s scheme (e.g. “http” or “https”):

<div class="class-mode">

```php
$app->request()->getScheme();
```

</div>
<div class="functional-mode">

```php
request()->getScheme();
```

</div>

## Path

Fetch the request’s path (root URI + resource URI):

<div class="class-mode">

```php
$app->request()->getPath();
```

</div>
<div class="functional-mode">

```php
request()->getPath();
```

</div>

## URL

Fetch the request’s URL (scheme + host [ + port if non-standard ]):

<div class="class-mode">

```php
$app->request()->getUrl();
```

</div>
<div class="functional-mode">

```php
request()->getUrl();
```

</div>

## IP Address

Fetch the request’s IP address:

<div class="class-mode">

```php
$app->request()->getIp();
```

</div>
<div class="functional-mode">

```php
request()->getIp();
```

</div>

## Referer

Fetch the request’s referrer:

<div class="class-mode">

```php
$app->request()->getReferrer();
```

</div>
<div class="functional-mode">

```php
request()->getReferrer();
```

</div>

## User Agent

Fetch the request’s user agent string:

<div class="class-mode">

```php
$app->request()->getUserAgent();
```

</div>
<div class="functional-mode">

```php
request()->getUserAgent();
```

</div>

## Paths

Every HTTP request received by a Leaf application will have a root URI and a resource URI.

## Root URI

The root URI is the physical URL path of the directory in which the Leaf application is instantiated and run. If a Leaf application is instantiated in **index.php** within the top-most directory of the virtual host’s document root, the root URI will be an empty string. If a Leaf application is instantiated and run in **index.php** within a physical subdirectory of the virtual host’s document root, the root URI will be the path to that subdirectory with a leading slash and without a trailing slash.

## Resource URI

The resource URI is the virtual URI path of an application resource. The resource URI will be matched to the Leaf application’s routes.

Assume the Leaf application is installed in a physical subdirectory **/foo** beneath your virtual host’s document root. Also assume the full HTTP request URL (what you’d see in the browser location bar) is **/foo/books/1**. The root URI is /foo (the path to the physical directory in which the Leaf application is instantiated) and the resource URI is **/books/1** (the path to the application resource).

You can get the HTTP request’s root URI and resource URI with the request object’s `getRootUri()` and `getResourceUri()` methods:

<div class="class-mode">

```php
$app = new \Leaf\App;

//Get root URI
$rootUri = $app->request()->getRootUri();

//Get resource URI
$resourceUri = $app->request()->getResourceUri();
```

</div>
<div class="functional-mode">

```php
//Get root URI
$rootUri = request()->getRootUri();

//Get resource URI
$resourceUri = request()->getResourceUri();
```

</div>
