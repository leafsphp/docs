# Leaf Cookie
<!-- markdownlint-disable no-inline-html -->

This is a module which helps you create, interact with and manage your cookies. You can quickly install leaf cookies with composer or leaf cli.

```sh
leaf install cookies
```

or with composer:

```sh
composer require leafs/cookies
```

## Usage

<div class="functional-mode">

### Functional mode
<!-- <Badge text="new" /> -->

Leaf cookie also hooks into leaf 3's functional mode. If you are using leaf 3, then this is the fastest way to use the cookie class.

#### cookie

Cookie is a global method that can be used to return the cookie object:

```php
cookie()->unsetAll();
```

</div>
<div class="class-mode">

### Leaf Cookie Class

Leaf cookie provides a `Leaf\Http\Cookie` class for quickly using cookie methods:

```php
use Leaf\Http\Cookie;
// ...
Cookie::set("name", "Michael");
```

</div>

## Set

This method replaces the previous `setCookie` method. It takes in 3 params:

- cookie name (string|array)
- cookie value (optional - string)
- cookie options (optional - array)

<div class="functional-mode">

```php
// normal method
cookie()->set("name", "Michael");

// using array
cookie()->set(["name" => "Michael"]);
```

</div>
<div class="class-mode">

```php
// normal method
Cookie::set("name", "Michael");

// using array
Cookie::set(["name" => "Michael"]);
```

</div>

You can also set multiple cookies at a time

<div class="functional-mode">

```php
cookie()->set([
  "name" => "Michael",
  "age" => "18"
]);
```

</div>
<div class="class-mode">

```php
Cookie::set([
  "name" => "Michael",
  "age" => "18"
]);
```

</div>

Adding cookie options

<div class="functional-mode">

```php
cookie()->set("name", "Michael", ["expire" => 0]);
```

</div>
<div class="class-mode">

```php
Cookie::set("name", "Michael", ["expire" => 0]);
```

</div>

Options for cookies are:

- expire
- path
- domain
- secure
- httponly

## simpleCookie

This method allows you to quickly set a cookie and it's expiry time. It takes in 3 params:

- cookie name (string|array)
- cookie value (optional - string)
- cookie expiresAt (optional - string - default of 7 days)

<div class="functional-mode">

```php
cookie()->simpleCookie("name", "Michael", "2 days");
```

</div>
<div class="class-mode">

```php
Cookie::simpleCookie("name", "Michael", "2 days");
```

</div>

## all

`all` returns all set cookies.

<div class="functional-mode">

```php
$cookies = cookie()->all();
```

</div>
<div class="class-mode">

```php
$cookies = Cookie::all();
```

</div>

## get

`get` returns a particular set cookie

<div class="functional-mode">

```php
$name = cookie()->get("name");
```

</div>
<div class="class-mode">

```php
$name = Cookie::get("name");
```

</div>

## unset

This method replaces the previous `deleteCookie` method. It takes in the cookie to unset.

<div class="functional-mode">

```php
// normal method
cookie()->unset("name");

// using array
cookie()->unset(["name"]);
```

</div>
<div class="class-mode">

```php
// normal method
Cookie::unset("name");

// using array
Cookie::unset(["name"]);
```

</div>

You can also unset multiple cookies at a time

<div class="functional-mode">

```php
cookie()->unset(["name", "age"]);
```

</div>
<div class="class-mode">

```php
Cookie::unset(["name", "age"]);
```

</div>

## unsetAll

This method removes all set cookies.

<div class="functional-mode">

```php
cookie()->unsetAll();
```

</div>
<div class="class-mode">

```php
Cookie::unsetAll();
```

</div>
