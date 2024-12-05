# Response

For each request a user makes to your leaf application, you will need to return some sort of output to the user. The output from your application is bundled together with a little bit more data and is sent all together to the user as a response.

A response looks something like this:

```http
HTTP/1.1 200 OK
Server: nginx/1.14.0 (Ubuntu)
Content-Type: application/json; charset=UTF-8
Content-Length: 27
Connection: keep-alive

{"message":"Hello, world!"}
```

In the above example, the response is a JSON object with a message key and a value of "Hello, world!". We can break down the response into the following parts:

- Status Line: `HTTP/1.1 200 OK`
- Headers: `Server: nginx/1.14.0 (Ubuntu)`, `Content-Type: application/json; charset=UTF-8`, `Content-Length: 27`, `Connection: keep-alive`
- Body: `{"message":"Hello, world!"}`

This is true for all responses. They all have a status line, headers, and a body. The status line tells the client if the request was successful or not. The headers provide additional information about the response. The body contains the actual data that the client requested.

## Creating Responses

Leaf provides a clean and straightforward API for creating responses. It allows you to create responses in a variety of formats, including JSON, XML, and plain text and also allows you to set the status code and headers.

You can use the `response()` helper function to create responses in functional mode or use the `response()` method on the Leaf instance to access the response object in Leaf instance mode.

::: code-group

```php [Functional Mode]
response()->json([
  'message' => 'Hello, world!'
]);
```

```php [Leaf Instance]
$app = new Leaf\App;

...

$app->response()->json([
  'message' => 'Hello, world!'
]);
```

:::

If you're wondering why we don't just use PHP's built-in `echo` function to output responses, it's mainly because Leaf takes care of all the little things you would have to deal with if you were to use `echo` directly. For example, Leaf sets the correct headers for you, so you don't have to worry about mistakenly setting the wrong headers.

Also, Leaf's response object provides a clean and consistent API for creating responses, which makes it easier for you and other developers to understand and maintain your code.

## Plain text responses

Plain text responses can be created using the `plain()` method. This method accepts 2 parameters:

- a string as text to output
- an optional status code (defaults to 200/OK)

::: code-group

```php:no-line-numbers [Functional Mode]
response()->plain('Hello, world!');
```

```php:no-line-numbers [Leaf Instance]
$app->response()->plain('Hello, world!');
```

:::

## JSON responses

JSON responses can be created using the `json()` method. This method accepts 3 parameters:

- an array or object to be converted to JSON
- an optional status code (defaults to 200/OK)
- Option to show status code in response body (defaults to false)

::: code-group

```php [Functional Mode]
response()->json([
  'message' => 'Hello, world!'
]);
```

```php [Leaf Instance]
$app->response()->json([
  'message' => 'Hello, world!'
]);
```

:::

If you choose to show the status code in the response body, the response will look like this:

```json
{
  "data": {
    "message": "Hello, world!"
  }, // Your output goes under the data key
  "status": {
    "code": 200,
    "message": "OK"
  }
}
```

## HTML responses

HTML responses can be created using the `markup()` method. This method accepts 2 parameters:

- a string as HTML to output
- an optional status code (defaults to 200/OK)

::: code-group

```php [Functional Mode]
response()->markup('<h1>Hello, world!</h1>');
```

```php [Leaf Instance]
$app->response()->markup('<h1>Hello, world!</h1>');
```

:::

If you have a full HTML/PHP file you want to output, you can use the `page()` method. This method accepts 2 parameters:

- a string as the path to the file
- an optional status code (defaults to 200/OK)

::: code-group

```php [Functional Mode]
response()->page('path/to/file.html');
```

```php [Leaf Instance]
$app->response()->page('path/to/file.html');
```

:::

**Note that this only works for static files. If you want to output a dynamic file, you should consider using a templating engine instead.**

## Error responses

During production development, you most likely would not want to throw exceptions to the user. Instead, you would want to return a nice error message. Leaf provides a simple way to do this using the `exit()` method. This method outputs an error message and exits your application immediately so that nothing else is executed. It takes in 2 parameters:

- the error message to output
- an optional status code (defaults to 500/Internal Server Error)

::: code-group

```php [Functional Mode]
response()->exit('An error occurred', 500);

// code below won't run
```

```php [Leaf Instance]
$app->response()->exit('An error occurred', 500);

// code below won't run
```

:::

If you pass a string as the first parameter, Leaf will automatically convert it to a markup response. If you pass an array, Leaf will automatically convert it to a JSON response.

## Other response types

These are the most common response types you will use in your application. However, Leaf provides a few more response types that you can use if you need them.

### Redirect responses

These responses are used to redirect the user to another URL. You can create a redirect response using the `redirect()` method. This method accepts 2 parameters:

- the URL to redirect to
- an optional status code (defaults to 301/Moved Permanently)

::: code-group

```php:no-line-numbers [Functional Mode]
response()->redirect('/example'); // path within the app
response()->redirect(['example']); // redirect with route name
response()->redirect('https://example.com'); // redirect to external URL
```

```php:no-line-numbers [Leaf Instance]
$app->response()->redirect('/example'); // path within the app
$app->response()->redirect(['example']); // redirect with route name
$app->response()->redirect('https://example.com'); // redirect to external URL
```

:::

### File download responses

It's not so unusual to want to send a file to the user for download. You can create a file download response using the `download()` method. This method accepts 3 parameters:

- the path to the file to download
- an optional filename for the file
- an optional status code (defaults to 200/OK)

::: code-group

```php:no-line-numbers [Functional Mode]
response()->download('path/to/file.pdf');

response()->download('path/to/file.pdf', 'new-filename.pdf', 200);
```

```php:no-line-numbers [Leaf Instance]
$app->response()->download('path/to/file.pdf');

$app->response()->download('path/to/file.pdf', 'new-filename.pdf', 200);
```

:::

### No content responses

These responses are used when you don't want to return any content to the user. You can create a no content response using the `noContent()` method. It also automatically sets the status code to 204/No Content.

::: code-group

```php:no-line-numbers [Functional Mode]
response()->noContent();
```

```php:no-line-numbers [Leaf Instance]
$app->response()->noContent();
```

:::

### XML responses

XML responses can be created using the `xml()` method. This method accepts 2 parameters:

- a string as XML to output
- an optional status code (defaults to 200/OK)

::: code-group

```php:no-line-numbers [Functional Mode]
response()->xml('<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema" version="1.0.0" />');
```

```php:no-line-numbers [Leaf Instance]
$app->response()->xml('<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema" version="1.0.0" />');
```

:::

### Custom responses

If you need to create a custom response, which is not covered by the methods above, you can use the `custom()` method. This method accepts 2 parameters:

- the content to output
- an optional status code (defaults to 200/OK)

::: code-group

```php:no-line-numbers [Functional Mode]
response()
  ->withHeader([
    'Content-Type' => 'application/pdf',
    'Content-Length' => $dataLength,
    'Content-Disposition' => "inline; filename=\"$filename\""
  ])
  ->custom($rawData);
```

```php:no-line-numbers [Leaf Instance]
$app
  ->response()
  ->withHeader([
    'Content-Type' => 'application/pdf',
    'Content-Length' => $dataLength,
    'Content-Disposition' => "inline; filename=\"$filename\""
  ])
  ->custom($rawData);
```

:::

## Headers

Headers are a way for your server to send additional information along with your request. This information can be anything from the type of content you're sending back, to the status code of your response, to the type of server you're using.

Leaf allows you to set headers for your response directly from the response object using the `withHeader()` method. It takes in 4 parameters:

- The header name or an array of headers (key-value pairs)
- The header value if header key is a string (optional if header key is an array)
- A boolean on whether to replace the header if it's already set (optional)
- An Http status code to associate to header. (optional)

::: code-group

```php:no-line-numbers [Functional Mode]
response()->withHeader('Content-Type', 'application/json');
response()->withHeader([
  'Content-Type' => 'application/json',
  'X-Custom-Header' => 'Custom Value'
]);
```

```php:no-line-numbers [Leaf Instance]
$app->response()->withHeader('Content-Type', 'application/json');
$app->response()->withHeader([
  'Content-Type' => 'application/json',
  'X-Custom-Header' => 'Custom Value'
]);
```

:::

You won't need to set basic content headers yourself as Leaf does this for you. However, you can set custom headers if you need to. Since headers are set before the response is sent, you can chain `withHeader()` together with your main response methods like this:

```php
response()
  ->withHeader('X-Custom-Header', 'value')
  ->json([
    'message' => 'Hello, world!'
  ]);
```

If you need more control over your headers, you can check out the [headers documentation](/docs/http/headers).

## Cookies

Cookies are small pieces of data that are stored on the client's computer by the web browser while browsing a website. Cookies were designed to be a reliable mechanism for websites to remember stateful information or to record the user's browsing activity.

Leaf allows you to set cookies for your response using the `withCookie()` method. It takes in 3 parameters:

- The name of the cookie
- The value of cookie
- When the cookie expires. Default: 7 days

```php
response()
  ->withCookie('name', 'Michael', '1 day')
  ->json('...');
```

### `withoutCookie()`

This method allows you to remove existing cookies from your response. So you're basically returning a response without selected cookies.

```php
response()->withoutCookie('name')->json('...');

// cookie array
response()->withoutCookie(['name', 'something'])->json('...');
```

If you need more control over your cookies, you can check out the [cookies documentation](/docs/http/cookies).

## Flash messages

Flash messages are a way to keep a message around for a single request. They're helpful for displaying status messages like "Item deleted successfully" or "Your changes have been saved."

Leaf allows you to set flash messages for your response using the `withFlash()` method. It takes in 2 parameters:

- The name of the flash message
- The value of the flash message

```php:no-line-numbers
response()->withFlash('message', 'something');
```

Just like the `withCookie()` method, you can chain the `withFlash()` method with your main response methods.

```php
response()
  ->withFlash('message', 'something')
  ->json('...');
```

You can check out the [flash messages documentation](/docs/http/flash) for more information on how to use flash messages.
