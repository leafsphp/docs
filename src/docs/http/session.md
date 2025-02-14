# Session

Normally, when you visit a website, each time you click on something, the website treats it like a new visit. This is because HTTP is stateless. This means that the website doesn't remember anything about you and other users from one request to the next. This is where sessions come in.

Sessions fix this problem by allowing the website to "remember" things about you, like if you're logged in or what's in your shopping cart.

Leaf makes it easy to work with sessions by handling all the heavy lifting for you. You can easily set, get and delete session data with Leaf in a few lines of code.

## Setting up

To start using sessions in Leaf, you need to install the Leaf Session module. It contains tons of helper methods to make working with sessions easier.

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install session
```

```bash:no-line-numbers [Composer]
composer require leafs/session
```

:::

Once this is done, you can start using sessions in your Leaf app.

## Setting session data

To set session data, you can use the `set()` method. This method takes two parameters:

- The key to save the data under
- The data to save

```php
session()->set('firstName', 'John');
session()->set('user', [
  'name' => 'John Doe',
  'email' => 'john@example.com'
]);
```

If you have multiple items to save, you can pass an array to the `set()` method.

```php
session()->set([
  'firstName' => 'John',
  'lastName' => 'Doe'
]);
```

## Checking if a session key exists

You can check if a session key exists using the `has()` method. It returns `true` if the key exists and `false` if it doesn't.

```php
session()->has('firstName');

/// or

if (session()->has('firstName')) {
  echo 'First name exists';
} else {
  echo 'First name does not exist';
}
```

<!-- By default, the `has()` method will only return `true` if the key exists and is not `null`. If you want to check if a key exists even if it's `null`, you can pass `true` as the second parameter.

```php
// nullableItem is null

$exists = session()->has('nullableItem', true);

echo $exists; // true
``` -->

## Getting session data

To get session data, you can use the `get()` method. This method takes three parameters:

- the key to get the data from
- a default value to return if the key doesn't exist
- a boolean to determine if the data should be sanitized (default is `true`)

```php
$firstName = session()->get('firstName');
$firstName = session()->get('firstName', 'John');
$firstName = session()->get('firstName', 'John', false);

// PHP 8+
$firstName = session()->get(param: 'firstName', sanitize: false);
```

You can also select multiple items by passing an array of keys to the `get()` method.

```php
$names = session()->get(['firstName', 'lastName']);

$fistName = $names['firstName'];
$lastName = $names['lastName'];
```

## Getting session data once

There are situations where you want to get session data only once. You can use the `retrieve()` method to get session data once. After the data is retrieved, it is removed from the session so it returns `null` if you try to get it again.

```php
$firstName = session()->retrieve('firstName');

// $firstName is 'John'

$firstName = session()->retrieve('firstName');

// $firstName is null
```

You can also pass a default value to the `retrieve()` method.

```php:no-line-numbers
$firstName = session()->retrieve('firstName', 'John');
```

::: tip Flash messages
`retrieve()` is useful for basic implementations of flash messages, but for more advanced flash messages, you should use the `flash()` method. You can find more information about flash messages in the [Flash Messages](/docs/http/flash) section.
:::

## Getting all session data

To get all session data, you can use the `all()` method. This method returns all session data as an array.

```php:no-line-numbers
$sessionData = session()->all();
```

## Deleting session data

When you're done with session data, you can delete it using the `delete()` method. This method takes the key to delete as a parameter.

```php:no-line-numbers
session()->delete('firstName');
```

You can also delete multiple items by passing an array of keys to the `delete()` method.

```php:no-line-numbers
session()->delete(['firstName', 'lastName']);
```

## Clearing all session data

There are situations where you want to delete all session data without stopping the session. In those cases, you can use the `clear()` method.

```php:no-line-numbers
session()->clear();
```

## Working with arrays

The Session module has one last trick up its sleeve. It provides a cleaner way of working with arrays in the session without having to deal with multiple `get()` and `set()` calls.

Let's say you have an array in the session like this:

```php
session()->set('user', [
  'name' => 'John Doe',
  'email' => 'john@example.com',
]);
```

You can easily add a new item to the array using the same `set()` method:

```php:no-line-numbers
session()->set('user.location', 'Everywhere');
```

This will add a location key to the user array in the session. This saves you from having to get the user array, adding the location key, and setting it back to the session.

It also works for the other methods like `get()`, `has()` and `delete()`.

```php
if (session()->has('user.username')) {
  // do something
}

$location = session()->get('user.location');
$email = session()->retrieve('user.email');

session()->delete('user.location');
```
