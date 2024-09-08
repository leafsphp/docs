# Requests

Whenever a user accesses your application, a request is made from the user's browser to your application. This request contains information about the user, the user's browser, and what the user is trying to access. This information is sent to your application in the form of an HTTP request. Leaf provides a request object that you can use to access and manipulate this information coming into your app.

There are different kinds of HTTP requests, such as `GET`, `POST`, `PUT`, `DELETE`, and more. Leaf tries to provide a unified interface to access information from all these different types of requests. This section covers the methods you'll most likely use in your everyday applications.

## Getting request data

As mentioned earlier, a request contains information about the user, whatever they're trying to access, and any additional data they're sending. The additional data is usually sent in the form of query parameters, form data, or JSON data and is normally used for things like search queries, form submissions, and API requests. Most of the time, you'll want to access this data to make decisions in your application.

Leaf provides a `get()` method on the request object that you can use to access this data. The `get()` method takes a key as an argument and returns the value associated with that key. If the key doesn't exist, the method returns `null`.

::: code-group

```php [Functional Mode]
$item = request()->get('item');
```

```php [Class Mode]
use Leaf\Http\Request;

...

$item = Request::get('item');
```

```php [on Leaf instance]
$app = new Leaf\App;

...

$item = $app->request()->get('item');
```

:::

The `get()` method works for all types of request data, including query parameters, form data, files, and JSON data so there's no need to worry about the type of data you're working with. You can also get multiple values at once by passing an array of keys to the `get()` method. This is especially useful when you're working with form data or JSON data where users can send any random data they want. In such cases, you can use the `get()` method to get only the data you're interested in.

```php
$data = request()->get(['name', 'email']);

// $data = ['name' => '...', 'email' => '...']
```

### Data Sanitization

Leaf automatically sanitizes all data coming into your application. This means that you don't have to worry about users sending malicious data to your application since Leaf will automatically clean it up for you. This lets you focus on building your application without worrying about security. There are some cases where you might want to disable this behavior, such as when you're working with raw data or when you're building an API that needs to accept any kind of data. In such cases, you can disable data sanitization by passing `false` as a second parameter to the `get()` method.

```php
$data = request()->get('data', false);
```

::: error Watch out!
Disabling data sanitization can expose your application to security vulnerabilities. Only disable data sanitization when you're sure that the data you're working with is safe.
:::

## Conditionally getting request data

Sometimes you might want to get a value from the request only if it exists. You can use the `try()` method to do this. The `try()` method takes an array of keys as an argument and returns only the values that exist in the request.

```php
$data = request()->try(['name', 'email']);

// $data = ['name' => '...']
```

In the example above, the `try()` method only returns the value of the `name` key since the `email` key doesn't exist in the request. Just as with the `get()` method, you can disable data sanitization by passing `false` as a second parameter to the `try()` method.

```php
$data = request()->try(['name', 'email'], false);
```

`try()` sees empty strings as existing values and will return them. If you want to get only non-empty values, you can pass `true` as a third parameter to the `try()` method.

```php
$data = request()->try(['name', 'email'], false, true);
```

## Getting request data with a default value

There are many situations where you might want to make sure that a value exists in the request before using it, but also want to keep it an optional value for users. You can use the `getOrDefault()` method to do this. The `getOrDefault()` method takes a key and a default value as arguments and returns the value associated with the key if it exists, or the default value if it doesn't.

```php
$data = request()->getOrDefault('name', 'John Doe');
```

## Getting all request data

You can use the `all()` method to get all the data in the request. It returns an array of all the data in the request.

```php
$data = request()->all();

// $data = ['name' => '...', 'email' => '...']
```

Every time you call the `all()` method, Leaf will sanitize the data in the request. If you want to disable data sanitization, you can pass `false` as a parameter to the `all()` method.

```php
$data = request()->all(false);
```

## Request type specific methods

We mentioned earlier that there are different types of HTTP requests, such as `GET`, `POST`, `PUT`, `DELETE`, and more. Leaf provides methods that you can use to access data specific to each type of request. We'll cover the most common ones here.

### GET requests

GET requests are the most common type of request and are used to access web pages, images, and other resources. Unlike other types of requests, GET requests send data in the URL as query parameters. You've probably seen URLs like `https://example.com/route?name=John&age=25`. In this case, the query parameters are `name` and `age`. We can get these query parameters using the `query()` method. It takes in 2 parameters:

- The key of the query parameter
- A default value to return if the query parameter doesn't exist (optional)

```php
$name = request()->query('name', 'John Doe');
```

### POST/PUT/PATCH requests

These requests are used to handle form submissions, API requests, and other types of requests where users send data to your application. This data is usually sent in the form of form data or JSON data. You can use the `postData()` method to get this data. The `postData()` method takes in 2 parameters:

- The key of the data
- A default value to return if the data doesn't exist (optional)

```php
$name = request()->postData('name', 'John Doe');
```

You can also use `rawData()` to get the raw data sent if the request is an `AJAX`/`XMLHttpRequest` request.

```php
$data = request()->rawData('name', 'John Doe');
```

In Case of files, you can use the `files()` method to get the file data.

```php
$file = request()->files('file');
```

## Validating Request Data

When building user-facing applications, there's no guarantee that users will always send the correct data to your application. In most cases, users will send incorrect data, either by mistake or on purpose. This can lead to errors in your application and can even expose your application to security vulnerabilities. To prevent this, you can use Leaf's built-in validation library to validate the data coming into your application. Let's see how it works:

```php{2-6}
app()->post('/example/register', function() {
  $success = request()->validate([
    'name' => 'text',
    'email' => 'email',
    'password' => 'min:8',
  ]);

  if (!$success) {
    $errors = request()->errors();
  }
});
```

In the example above, we're validating the data coming into our application. We're checking if the `name` field is a text, if the `email` field is a valid email, and if the `password` field is at least 8 characters long. If any of these validations fail, the `validate()` method will return `false` and you can get the errors using the `errors()` method. You can find the full list of validation rules [here](/docs/data/validation).

## Request Object Methods

The request object comes with other methods for doing things like interacting with the request headers, cookies, checking request types, and even user data. Here are some of the most common methods you'll use:

### `typeIs`

This method allows you to check what method type a request uses.

```php
$isGetRequest = request()->typeIs('GET');
$isPostRequest = request()->typeIs('post');
$isDeleteRequest = request()->typeIs('Delete');

if ($isGetRequest) response()->exit('GET method not allowed');
```

Here are some other functions you can use relating to the request method.

```php
/**
 * What is the request method?
 * @return string (e.g. GET, POST, PUT, DELETE)
 */
request()->getMethod();
```

### XHR

When using a Javascript framework like MooTools or jQuery to execute an XMLHttpRequest, the XMLHttpRequest will usually be sent with a **`X-Requested-With`** HTTP header. The Leaf application will detect the HTTP request’s **`X-Requested-With`** header and flag the request as such. If for some reason an XMLHttpRequest cannot be sent with the **`X-Requested-With`** HTTP header, you can force the Leaf application to assume an HTTP request is an XMLHttpRequest by setting a GET, POST, or PUT parameter in the HTTP request named “isajax” with a truthy value.

Use the request object’s `isAjax()` or `isXhr()` method to tell if the current request is an XHR/Ajax request:

```php
$isXHR = request()->isAjax();
$isXHR = request()->isXhr();
```

### `isFormData`

This method allows you to check if the request body contains parsed form data, or if the request is a form data request.

```php:no-line-numbers
$isXHR = request()->isFormData();
```

## Request Path, Host & Client

This section contains methods which allow you to retrieve information about the request path, host and client.

### Host

Fetch the request’s host (e.g. “leafphp.dev”):

```php:no-line-numbers
$app->request()->getHost();
```

### Host with Port

Fetch the request’s host with port (e.g. “leafphp.dev:80”):

```php:no-line-numbers
request()->getHostWithPort();
```

### Port

Fetch the request’s port (e.g. 80):

```php:no-line-numbers
request()->getPort();
```

### Scheme

Fetch the request’s scheme (e.g. “http” or “https”):

```php:no-line-numbers
request()->getScheme();
```

### Path

Fetch the request’s path (root URI + resource URI):

```php:no-line-numbers
request()->getPath();
```

### URL

Fetch the request’s URL (scheme + host [ + port if non-standard ]):

```php:no-line-numbers
request()->getUrl();
```

### IP Address

Fetch the request’s IP address:

```php:no-line-numbers
request()->getIp();
```

### Referer

Fetch the request’s referrer:

```php:no-line-numbers
request()->getReferrer();
```

### User Agent

Fetch the request’s user agent string:

```php:no-line-numbers
request()->getUserAgent();
```

### Paths

Every HTTP request received by a Leaf application will have a root URI and a resource URI.

#### Root URI

The root URI is the physical URL path of the directory in which the Leaf application is instantiated and run. If a Leaf application is instantiated in **index.php** within the top-most directory of the virtual host’s document root, the root URI will be an empty string. If a Leaf application is instantiated and run in **index.php** within a physical subdirectory of the virtual host’s document root, the root URI will be the path to that subdirectory with a leading slash and without a trailing slash.

#### Resource URI

The resource URI is the virtual URI path of an application resource. The resource URI will be matched to the Leaf application’s routes.

Assume the Leaf application is installed in a physical subdirectory **/foo** beneath your virtual host’s document root. Also assume the full HTTP request URL (what you’d see in the browser location bar) is **/foo/books/1**. The root URI is /foo (the path to the physical directory in which the Leaf application is instantiated) and the resource URI is **/books/1** (the path to the application resource).

You can get the HTTP request’s root URI and resource URI with the request object’s `getScriptName()` and `getPathInfo()` methods:

## Content Type Methods

The Leaf application’s request object provides several helper methods for inspecting the content type of the current HTTP request.

### Content Type

Fetch the request’s content type (e.g. “application/json;charset=utf-8”):

```php:no-line-numbers
request()->getContentType();
```

### Media Type

Fetch the request’s media type (e.g. “application/json”):

```php:no-line-numbers
request()->getMediaType();
```

### Media Type Params

Fetch the request’s media type parameters (e.g. [charset => “utf-8”]):

```php:no-line-numbers
request()->getMediaTypeParams();
```

### Content Charset

Fetch the request’s content character set (e.g. “utf-8”):

```php:no-line-numbers
request()->getContentCharset();
```

### Content Length

Fetch the request’s content length:

```php:no-line-numbers
request()->getContentLength();
```
