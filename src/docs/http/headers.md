# Headers

Headers are a very important part of HTTP requests and responses. They contain information about the request/response, like the content type, the server, the date, and more.

## Getting request headers

You can get all headers from a request using the `all()` method on the headers object or the `headers()` method on the request object.

::: code-group

```php:no-line-numbers [Request Class]
$allHeaders = request()->headers();
```

```php:no-line-numbers [Headers Class]
$headers = Leaf\Http\Headers::all();
```

:::

Note that all headers are automatically sanitized by default. If you want to get the raw headers, you can pass `false` as the first argument to the `all()` method.

::: code-group

```php:no-line-numbers [Request Class]
$allHeaders = request()->headers(safeHeaders: false);
```

```php:no-line-numbers [Headers Class]
$headers = Leaf\Http\Headers::all(false);
```

:::

## Getting a single header

You can also grab a single item from the headers using the `get()` method.

::: code-group

```php:no-line-numbers [Request Class]
$contentType = request()->headers('Content-Type');
```

```php:no-line-numbers [Headers Class]
$contentType = Leaf\Http\Headers::get('Content-Type');
```

:::

These headers are automatically sanitized by default. If you want to get the raw headers, you can pass `false` as the second argument to the `get()` method.

::: code-group

```php:no-line-numbers [Request Class]
$contentType = request()->headers('Content-Type', false);
```

```php:no-line-numbers [Headers Class]
$contentType = Leaf\Http\Headers::get('Content-Type', false);
```

:::

## Setting response headers

The most straightforward way to set headers is to use the Leaf's response object. It has a `withHeader()` method that allows you to set headers.

```php
response()
  ->withHeader('X-Custom-Header', 'value')
  ->json([
    'message' => 'Hello, world!'
  ]);
```

You can find the full documentation [here](/docs/http/response#headers).

## Setting headers using the Headers class

You can also set headers using the `Leaf\Http\Headers::set()` class. This method gives you finer control over the headers you set. It takes in 4 parameters:

- The header to to set
- Value for header (optional if you pass an array to the first parameter)
- Replace similar header? (optional)
- An http status code (optional)

```php
Leaf\Http\Headers::set('location', '/home', true, 302);

// multiple headers
Leaf\Http\Headers::set([
  'location' => '/home',
  'something' => 'here'
]);
```

If you want multiple headers with the same name, you can set replace to `false`. This will force multiple headers of the same type.

```php
Leaf\Http\Headers::set(
  [
    'location' => '/home',
    'location' => '/here'
  ],
  replace: false
);
```

## Removing headers

You can remove headers using the `Leaf\Http\Headers::remove()` method. This method takes in a single parameter, the header to remove.

```php
Leaf\Http\Headers::remove('WWW-Authenticate');

// remove multiple headers
Leaf\Http\Headers::remove(['WWW-Authenticate', 'Authorization']);
```

## Checking if a header exists

You can check if a header exists using the `Leaf\Http\Headers::has()` method. This method takes in a single parameter, the header to check and returns a boolean.

```php
$exists = Leaf\Http\Headers::has('Content-Type');
```

## Utility Header methods

Some shortcut methods have been prepared for the most used headers, so you won't need to stress yourself writing a bunch of stuff for simple tasks.

### contentPlain

This method set's the content type of the response to `text/plain`, it also takes in an HTTP status code.

```php
Leaf\Http\Headers::contentPlain(200);

echo 'plain text here';
```

### contentHtml

This method set's the content type of the response to `text/html`, it also takes in an HTTP status code.

```php
Leaf\Http\Headers::contentHtml(200);

echo 'html here';
```

### contentXml

This method set's the content type of the response to `application/xml`, it also takes in an HTTP status code.

```php
Leaf\Http\Headers::contentXml(200);

echo 'Xml here';
```

### contentJSON

This method set's the content type of the response to `application/json`, it also takes in an HTTP status code.

```php
Leaf\Http\Headers::contentJSON(200);

echo 'json here';
```

### accessControl

This method allows you to quickly set `Access-Control` headers in your app. It takes in 3 parameters:

- The header to set
- The value to set
- A status code (optional)

```php:no-line-numbers
Leaf\Http\Headers::accessControl('Allow-Origin', 'https://example.com', 200);
```

You can set mutiple access control headers at once:

```php:no-line-numbers
Leaf\Http\Headers::accessControl(['Allow-Origin' => '*', 'Allow-Headers' => '*']);
```
