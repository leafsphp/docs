---
title: "Session"
---

<!-- markdownlint-disable no-inline-html -->
# Leaf Session

Leaf offers simple session management to help you quickly build your apps and APIs. You can quickly install leaf session with composer or leaf cli.

```sh
leaf install session
```

or with composer:

```sh
composer require leafs/session
```

## Using Session

You can quickly get started with Leaf session by using the `Leaf\Http\Session` class.

```php

require __DIR__ . "/vendor/autoload.php";

$app = new Leaf\App;
$session = new Leaf\Http\Session;

$app->get("/text", function () use($session) {
  $session->set("name", "Michael Darko");
});
```

## Functional mode <Badge text="new" />

Leaf session also hooks into leaf 3's functional mode. If you are using leaf 3, then this is the fastest way to use the session class.

### session

`session` is a global method that can be used to create a session or return the session object.

```php
session()->set("name", "Michael");
```

With the above example, no session already exists, so leaf session will create a new one and set the name variable.

You can call any session method on the `session` function:

```php
session()->destroy();
```

### flash

This is a simple class for getting and setting flash data or returning the leaf flash object.

```php
# return leaf session flash object
flash()->set("This is a message");
```

<div class="class-mode">

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

Since we want to avoid sessions conflicting, Leaf allows you to choose whether you want to start a new session on init. This also allows smooth integration with native PHP sessions, so you can always switch to Leaf sessions when you're ready.

Also, since leaf session is 100% compatible with native PHP sessions, you can use the `session_start` method if you need to.

When using leaf sessions staticly, there's no need for the above methods, just go straight for which ever you need to use.

```php
$sessionBody = Leaf\Http\Session::body();
```

Or

```php
use Leaf\Http\Session;

$sessionBody = Session::body();
```

<hr>

</div>

## Leaf Session Methods

From this point on you'll be able to use everything Leaf Sessions have to offer. Let's look at the session methods.

### set

set simply sets new native session variables for your app.

<div class="class-mode">

```php
$session->set("username", $username);
```

</div>
<div class="functional-mode">

```php
session()->set("username", $username);
```

</div>

#### Setting multiple values

`set` can take in an array if you wish to set multiple values or just want to use one.

<div class="class-mode">

```php
$session->set([
  "username" => $username,
  "mobile_number" => $mobile_number
]);
```

</div>
<div class="functional-mode">

```php
session()->set([
  "username" => $username,
  "mobile_number" => $mobile_number
]);
```

</div>

<hr>

### get

get is a simple method that returns a session value. It takes in one parameter: the name of the param passed into the app through the session It works just like how `$_SESSION['key']` does.

<div class="class-mode">

```php
$item = $session->get('item');
```

</div>
<div class="functional-mode">

```php
$item = session()->get('item');
```

</div>

#### Multiple Get

You can also return many fields at once from the session:

<div class="class-mode">

```php
$user = $session->get(["username", "email"]);
```

</div>
<div class="functional-mode">

```php
$user = session()->get(["username", "email"]);
```

</div>

#### Security Fixes

`set` has also received a bunch of security fixes which prevent maliscious scripts from being passed into your application. You can choose to turn this feature off, maybe for html values:

<div class="class-mode">

```php
// turn off sanitize
$html = $session->get("blog", false);
```

</div>
<div class="functional-mode">

```php
// turn off sanitize
$html = session()->get("blog", false);
```

</div>

<hr>

## retrieve

`retrieve` returns the requested value and removes it from the session, just like calling `get` first and then `unset` for the same key.

It takes in two parameters:

- the name of the param you want to get It works just like how `$_SESSION['key']` does
- The default value to use if it doesn't exist.

<div class="class-mode">

```php
$username = $session->retrieve("username");
```

</div>
<div class="functional-mode">

```php
$username = session()->retrieve("username");
```

</div>

<hr>

### body

This method returns the {key => value} pairs of all the session data including any CSRF data as an associative array.

<div class="class-mode">

```php
$body = $session->body();
```

</div>
<div class="functional-mode">

```php
$body = session()->body();
```

</div>

<hr>

### unset

`unset` simply deletes a session variable. You can also delete multiple values at once.

<div class="class-mode">

```php
// single value
$session->unset('email');

// multiple values
$session->unset(['name', 'email']);
```

</div>
<div class="functional-mode">

```php
// single value
session()->unset('email');

// multiple values
session()->unset(['name', 'email']);
```

</div>

<hr>

### reset

`reset` simply re-initialises a session.

<div class="class-mode">

```php
$app->post('/session/reset', function () use($session) {
 $session->reset();
});
```

</div>
<div class="functional-mode">

```php
app()->post('/session/reset', function () {
 session()->reset();
});
```

</div>

<hr>

### id

`id` sets and/or returns the current session id. It takes in an **optional** parameter: the ID to overwrite the session id.

<div class="class-mode">

```php
$id = $session->id();
```

</div>
<div class="functional-mode">

```php
$id = session()->id();
```

</div>

So if the session id is not set, this will generate and return a new session id. However, if the session id is already set, it will just return it.

You can also set your own session id with this syntax below. It will be returned as well, so you can keep it in a variable.

<div class="class-mode">

```php
$id = $session->id("new session id");
```

</div>
<div class="functional-mode">

```php
$id = session()->id("new session id");
```

</div>

<hr>

### regenerate

regenerate simply generates a new session id. It takes in a boolean parameter which indicates whether to delete all session data or not(has a default of false)

<div class="class-mode">

```php
$session->regenerate();
$session->regenerate(false);
$session->regenerate(true); // will clear all session data
```

</div>
<div class="functional-mode">

```php
session()->regenerate();
session()->regenerate(false);
session()->regenerate(true); // will clear all session data
```

</div>

### destroy

You can end a session with `destroy`.

<div class="class-mode">

```php
$session->destroy();
```

</div>
<div class="functional-mode">

```php
session()->destroy();
```

</div>

### encode

This feature allows you to encode the current session data as a string.

<div class="class-mode">

```php
$sessionString = $session->encode();
```

</div>
<div class="functional-mode">

```php
$sessionString = session()->encode();
```

</div>

### decode

You can also decode a serialized session using the `decode` method. It takes in the string to decode and returns true on success, false on failure.

<div class="class-mode">

```php
$success = $session->decode($sessionString);
```

</div>
<div class="functional-mode">

```php
$success = session()->decode($sessionString);
```

</div>

## Session flash

Leaf now provides extensive support for flash messages utilizing `Leaf\Flash`. This functionality is now available on the session method in the form of `flash`. You can set and get flash messages using this method.

<div class="class-mode">

```php
$session = new Leaf\Http\Session;

$session->flash("my flash message");

echo $session->flash(); // my flash message
```

</div>
<div class="functional-mode">

```php
session()->flash("my flash message");

echo session()->flash(); // my flash message
```

</div>

## Error Handling

If any of the above methods fail an operation, `false` is returned and an error is left in the `Leaf\Http\Session` local state. This error or errors can be returned by calling the `errors` method.

<div class="class-mode">

```php
$user = $session->get("user");

if (!$user) $response->exit($session->errors());
```

</div>
<div class="functional-mode">

```php
$user = session()->get("user");

if (!$user) response()->exit(session()->errors());
```

</div>

As you can see, you'd manually need to throw errors, this gives you more flexibility in web apps, so instead of throwing session errors, you might do something like this:

<div class="class-mode">

```php
<?php
// ...
foreach ($session->errors() as $error => $value) {
  echo "<b>{$value}</b>";
}
```

</div>
<div class="functional-mode">

```php
<?php
// ...
foreach (session()->errors() as $error => $value) {
  echo "<b>{$value}</b>";
}
```

</div>
