---
title: "Leaf Cookie"
---

<!-- markdownlint-disable no-inline-html -->
# 🍪 Cookies

This is a module which helps you create, interact with and manage your cookies. You can quickly install leaf cookies with composer or leaf cli.

```sh
composer require leafs/cookies
```

or with leaf cli:

```sh
leaf install cookies
```

## Usage

Laef cookie provides a `Leaf\Http\Cookie` class for quickly using cookie methods:

```php
use Leaf\Http\Cookie;
// ...
Cookie::set("name", "Michael");
```

## Set

This method replaces the previous `setCookie` method. It takes in 3 params:

- cookie name (string|array)
- cookie value (optional - string)
- cookie options (optional - array)

```php
// normal method
Cookie::set("name", "Michael");
// using array
Cookie::set(["name" => "Michael"]);
```

You can also set multiple cookies at a time

```php
Cookie::set([
    "name" => "Michael",
    "age" => "18"
]);
```

Adding cookie options

```php
Cookie::set("name", "Michael", ["expire" => 0]);
```

Options for cookies are:

- expire
- path
- domain
- secure
- httponly

<hr>

## simpleCookie

This method allows you to quickly set a cookie and it's expiry time. It takes in 3 params:

- cookie name (string|array)
- cookie value (optional - string)
- cookie expiresAt (optional - string - default of 7 days)

```php
Cookie::simpleCookie("name", "Michael", "2 days");
```

<hr>

## all

`all` returns all set cookies.

```php
$cookies = Cookie::all();
```

<hr>

## get

`get` returns a particular set cookie

```php
$name = Cookie::get("name");
```

<hr>

## unset

This method replaces the previous `deleteCookie` method. It takes in the cookie to unset.

```php
// normal method
Cookie::unset("name");
// using array
Cookie::unset(["name"]);
```

You can also unset multiple cookies at a time

```php
Cookie::unset(["name", "age"]);
```

<hr>

## unsetAll

This method removes all set cookies.

```php
Cookie::unsetAll();
```

## Functional mode <Badge text="new" />

Leaf cookie also hooks into leaf 3's functional mode. If you are using leaf 3, then this is the fastest way to use the cookie class.

### cookie

Cookie is a global method that can be used to create a cookie or return the cookie object.

```php
cookie("name", "Michael");
```

or return the cookie object:

```php
cookie()->unsetAll();
```
