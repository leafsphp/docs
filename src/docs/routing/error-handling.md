# Error Handling

<!-- markdownlint-disable no-inline-html -->

It's super hard to get everything right the first time. Sometimes, you might encounter errors in your application. Leaf has a built-in error handler that displays a custom error page when an error occurs. It gives you some context about the error and what might have caused it.

<img src="https://github.com/user-attachments/assets/52f044bb-bb9b-4fdd-a3d7-835ac7e1f085" alt="Error Page" width="100%" class="border border-gray-500 rounded-lg">

In production, you might want to turn off error reporting to prevent users from seeing errors. You can do this by setting the `debug` config to `false`.

```php
app()->config([
  'debug' => false
]);
```

When you set `debug` to `false`, Leaf will automatically turn off error reporting and display a custom error page to users. You can customize this page using Leaf's `setErrorHandler()` method.

```php
app()->setErrorHandler(function () {
  echo "<h1>My custom error page</h1>";
});
```

## Handling 404

Leaf displays a default 404 screen when it can't find a page that a user wants to access in your app, however this page may not match your app's design or you may want to return JSON instead of HTML.

<img alt="404 page" src="https://github.com/user-attachments/assets/97073d77-1298-4549-aca0-7b652dd2aa0f" width="100%" class="border border-gray-500 rounded-lg">

You can customize the 404 page using Leaf's `set404()` method.

```php
app()->set404(function () {
  response()->json([
    "error" => "Page not found"
  ]);
});
```

Once this is set, Leaf will automatically use your custom 404 page when a user tries to access a page that doesn't exist in your app.

## Maintenance Mode

There are times where you need to take your application down for maintenance. This may be due to updates or other external reasons. Putting your application in down mode will display a maintenance message to users, and prevent them from accessing your application.

<img alt="down" src="https://github.com/user-attachments/assets/10adcf3a-8195-44a1-a4f1-783e0e8b3e34" width="100%" class="border border-gray-500 rounded-lg">

You can enable down mode by setting the `app.down` configuration option to `true`.

```php
app()->config([
  'app.down' => true
]);
```

When your application is in down mode, Leaf will automatically load the `down` screen. You can customize this screen using Leaf's `setDown()` method.

```php
app()->setDown(function () {
  echo 'Custom Down Handler!';
});
```

You can use this method to display a custom html page or any other content you want to show users when your application is in down mode.

```php
app()->setDown(function () {
  response()->page('./down.html');
});
```
