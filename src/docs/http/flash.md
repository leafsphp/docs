# Session Flash

Session flash allows you to store data in the session for a single request. This is useful for scenarios like displaying a message after a form submission or passing data from one request to another.

## Adding a new flash

You can add a new flash message to a response using the `withFlash()` method. This method accepts two arguments:

- The name of the flash message
- The value of the flash message

```php:no-line-numbers
response()->withFlash('message', 'something');
```

You can chain the `withFlash()` method with your main response methods to return a response with a flash message.

```php
response()
  ->withFlash('message', 'something')
  ->json('...');
```

You are not limited to strings. You can flash different types of data:

```php
response()->withFlash('object', $userObject)->json('...');
response()->withFlash('array', $userArray)->json('...');
response()->withFlash('string', $userString)->json('...');
response()->withFlash('int', $userInt)->json('...');
```

## Display a flash item

To display a flash item, you can use the `display()` method. This method accepts the key of the item to get. If the key is not provided, it defaults to `message`.

```php:no-line-numbers
$message = flash()->display();
```

If you set a flash item with a different key, you can pass the key to the `display()` method to get the item.

```php
$message = flash()->display('info');
$object = flash()->display('object');
$array = flash()->display('array');
```

The item will be removed from the session after it has been displayed.

## Manually removing a flash item

You may choose to remove a flash item manually without displaying it first. You can do this by calling the `remove()` method with the key of the item to remove.

```php:no-line-numbers
flash()->remove('info');
```
