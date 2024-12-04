# Cookies

Cookies are small pieces of text sent to a client's browser by your application. They help your app remember information about users' visits, which can both make it easier to visit your app and make it more useful to your users.

Leaf provides a lightweight cookie module that helps you create, delete, and interact with cookies.

## Getting Started

You can install Leaf's cookie module using composer or the Leaf CLI.

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install cookie
```

```bash:no-line-numbers [Composer]
composer require leafs/cookie
```

:::

## Setting Cookies

Since cookies are sent to the client's browser as part of the response, Leaf provides a direct way to set cookies on your response. You can directly call `withCookie()` on your response object to set a cookie.

```php:no-line-numbers
response()->withCookie('name', 'Fullname');
```

Using this method, you can even chain multiple cookies together with your response like this:

```php
response()
  ->withCookie('name', 'Fullname')
  ->withCookie('age', 20)
  ->json([
      'message' => 'Cookies set'
    ]);
```

The `withCookie()` method takes in 3 parameters:

- cookie name
- cookie value
- cookie expiration time (optional)

## Setting Cookies with Options

`response()->withCookie()` is a simple way to set cookies, but it only works for the most basic use cases. If you need a more powerful way to set cookies, you can use the `set()` method. It takes in 3 parameters:

- cookie name
- cookie value
- cookie options

```php
cookie()->set('name', 'Fullname', [
  'expire' => time() + 3600,
  'path' => '/',
  'domain' => 'example.com',
  'secure' => true,
  'httponly' => true,
  'samesite' => 'None'
]);
```

The `set()` method allows you to set cookies with more advanced options like expiration time, path, domain, secure, httponly, and samesite which are all optional.

## Reading Cookies

When you send cookies to the client, they are stored in your users' browser and automatically sent back to your app on every request. You can read these cookies using the `get()` method.

```php:no-line-numbers
$name = cookie()->get('name');
```

This method takes in the cookie name and returns the cookie value. If the cookie doesn't exist, it returns `null`.

You can also get all cookies at once using the `all()` method.

```php:no-line-numbers
$cookies = cookie()->all();
```

This method returns an array of all cookies sent to your app. Be careful when using this method as it can return a lot of data.

## Deleting Cookies

Deleting cookies works by letting your user's browser know that the cookie should be deleted. Once this is done, the cookie is removed from the user's browser and won't be sent back to your app. You can delete cookies using either the `delete()` method or `withoutCookie()` on your response object.

::: code-group

```php [Response Object]
response()->withoutCookie('name');

// It is also chainable with your response
response()
  ->withoutCookie('name')
  ->json([
      'message' => 'Cookie deleted'
    ]);
```

```php [Cookie Object]
cookie()->delete('name');
```

:::

You may also choose to delete all your cookies, for instance if you detect an authentication or authorization breech in your application. You can do this using the `deleteAll()` method on Leaf cookies.

```php:no-line-numbers
cookie()->deteleAll();
```
