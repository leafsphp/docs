---
title: "Session"
---

<!-- markdownlint-disable no-inline-html -->
# Leaf Sessions

Leaf offers simple session management to help you quickly build your apps and APIs.

<p class="alert -info">
  All session methods are now static. You can now call session methods from anywhere within your Leaf app without initialization.
</p>

## Using Session

```php
use Leaf\Http\Session;

$app = new Leaf\App;

$app->get("/text", function() use($session) {
  Session::set("name", "Michael Darko");
});
```

## Starting a new session

A new session is started or an old one continued when you instanciate the `Leaf\Http\Session`.

```php
// new session not started
$session = new Leaf\Http\Session(false);

// new session/continue session
$session = new Leaf\Http\Session;

// new session/continue session
$session = new Leaf\Http\Session(true);
```

Since we want to avoid sessions conflicting, v2.3+ allows you to choose whether you want to start a new session on init. This also allows smooth integration with native PHP sessions, so you can always switch to Leaf sessions when you're ready.

Also, since leaf session is 100% compatible with native PHP sessions, you can use the `session_start` method if you need to.

When using leaf sessions staticly, there's no need for the above methods, just go straight for which ever you need to use.

```php
$sessionBody = Leaf\Http\Session::body();
```

<hr>

## Leaf Session Methods

From this point on you'll be able to use everything Leaf Sessions have to offer. Let's look at the session methods.

### set

set simply sets new native session variables for your app.

```php
Session::set("username", $username);
```

#### Setting multiple values

In v2.0, `set` can take in an array if you wish to set multiple values or just want to use one.

```php
Session::set(["username" => $username, "mobile_number" => $mobile_number]);
```

<hr>

### get

get is a simple method that returns a session value. It takes in one parameter: the name of the param passed into the app through the session It works just like how `$_SESSION['key']` does.

```php
$username = Session::get("username");
```

#### Multiple Get

In v2.4, you can return many fields at once from the session:

```php
$user = Session::get(["username", "email"]);
```

#### Security Fixes

`set()` has also received a bunch of security fixes which prevent maliscious scripts from being passed into your application. In v2.4, you can choose to turn this feature off, maybe for html values:

```php
// turn off sanitize
$html = Session::get("blog", false);
```

<hr>

## retrieve

retrieve returns the requested value and removes it from the session, just like calling `get` first and then `unset` for the same key.

It takes in two parameters:

- the name of the param you want to get It works just like how `$_SESSION['key']` does

- The default value to use if it doesn't exist.

```php
$username = $session>retrieve("username");
```

<hr>

### body

body returns the key => value pairs of all the session data including any CSRF data as an associative array.

```php
$body = Session::body();
```

<hr>

### unset

`unset` simply deletes a session variable. You can also delete multiple values at once.

```php
// single value
Session::unset('email');
// multiple values
Session::unset(['name', 'email']);
```

<hr>

### reset

`reset` simply re-initialises a session.

```php
$app->post('/session/reset', function() use($session) {
 Session::reset();
});
```

<hr>

### id

`id` sets and/or returns the current session id. It takes in an **optional** parameter: the ID to overwrite the session id.

```php
$id = Session::id();
```

So if the session id is not set, this will generate and return a new session id. However, if the session id is already set, it will just return it.

You can also set your own session id with this syntax below. It will be returned as well, so you can keep it in a variable.

```php
$id = Session::id("new session id");
```

<hr>

### regenerate

regenerate simply generates a new session id. It takes in a boolean parameter which indicates whether to delete all session data or not(has a default of false)

```php
Session::regenerate();
Session::regenerate(false);
Session::regenerate(true); // will clear all session data
```

### destroy

You can end a session with `destroy`.

```php
Session::destroy();
```

### encode

v2.4 comes with the encode feature which allows you to encode the current session data as a string.

```php
$sessionString = Session::encode();
```

### decode

You can also decode a serialized session using the `decode` method. It takes in the string to decode and returns true on success, false on failure.

```php
$success = Session::decode($sessionString);
```

## flash <sup class="new-tag-1"><small>NEW</small></sup>

Leaf now provides extensive support for flash messages utilizing `Leaf\Flash`. This functionality is now available on the session method in the form of `flash`. You can set and get flash messages using this method.

```php
use Leaf\Http\Session;

Session::flash("my flash message");

echo Session::flash(); // my flash message
```

## Error Handling

If any of the above methods fail an operation, `false` is returned and an error is left in the `Leaf\Http\Session` local state. This error or errors can be returned by calling the `errors` method.

```php
$user = Session::get("user");

if (!$user) $response->throwErr(Session::errors());
```

As you can see, you'd manually need to throw errors, this gives you more flexibility in web apps, so instead of throwing session errors, you might do something like this:

```php
<?php
// ...
foreach (Session::errors() as $error => $value) {
  echo "<b>{$value}</b>";
}
```
