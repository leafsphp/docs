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

By default, the `has()` method will only return `true` if the key exists and is not `null`. If you want to check if a key exists even if it's `null`, you can pass `false` as the second parameter.

```php
// nullableItem is null

$exists = session()->has('nullableItem', false);

echo $exists; // true
```
