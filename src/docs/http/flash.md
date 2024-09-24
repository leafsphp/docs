# Session Flash

Session flash allows you to store data in the session for a single request. This is useful for scenarios like displaying a message after a form submission. Leaf provides a straightforward way to work with flash messages.

## Adding a new flash

You can set a new flash item using the `set()` method. It method accepts two arguments:

- The item to flash
- The key to save it under. The key is optional and defaults to `message`.

```php
flash()->set('This is my message');
flash()->set('This is my message', 'info');
```

You are not limited to strings. You can flash different types of data:

```php
flash()->set($userObject);
flash()->set($userArray);
flash()->set($userString);
flash()->set($userInt);
```

## Display a flash item

To display a flash item, you can use the `display()` method. This method accepts the key of the item to get. If the key is not provided, it defaults to `message`.

```php
echo flash()->display();
```

If you set a flash item with a key, you can pass the key to the `display()` method to get the item.

```php
flash()->set('This is my message', 'info');
...

echo flash()->display('info');
```

The item will be removed from the session after it has been displayed.

## Manually removing a flash item

You may choose to remove a flash item manually using the `remove()` method. This method accepts the key of the item to remove.

```php
flash()->remove('info');
```
