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

To display a flash item, you can use the `flash()` method on the Leaf Request. This method accepts the key of the item to get. If the key is not provided, it will return the default flash message.

```php:no-line-numbers
$message = request()->flash();
```

If you set a flash item with a different key, you can pass the key to the `display()` method to get the item.

```php
$message = request()->flash('info');
$object = request()->flash('object');
$array = request()->flash('array');
```

The item will be removed from the session after it has been displayed.

## Manually removing a flash item

You may choose to remove a flash item manually without displaying it first. You can do this by calling the `remove()` method with the key of the item to remove.

```php:no-line-numbers
flash()->remove('info');
```

## Toast Notifications

If you are using Leaf Blade with Tailwind and Alpine, you can easily display toast notifications using the `@toastContainer` directive. This directive will automatically display all flash messages in the session.

```php:no-line-numbers
return response()
  ->withFlash('leaf.toast', [
      'title' => 'Your email has been verified. Sign in to continue.',
      'type' => 'success'
  ])
  ->redirect('/pageWithToastContainer');
```

And then on the page you want to display the toast container:

```blade
<body>
  ...

  @toastContainer
</body>
```

And that's it! You will see a toast notification with the message you provided.

Available toast types are `success`, `danger`, `warning`, `info` and `default`. You can also pass a description to the toast notification which will appear below the title.

```php:no-line-numbers
return response()
  ->withFlash('leaf.toast', [
      'title' => 'Your email has been verified. Sign in to continue.',
      'description' => 'You can now sign in to your account.',
      'type' => 'success'
  ])
  ->redirect('/pageWithToastContainer');
```
