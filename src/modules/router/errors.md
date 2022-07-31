---
title: "Error Handling"
---

# Error Handling
<!-- markdownlint-disable no-inline-html -->

In earlier versions, Leaf would always display default server error pages in case of errors like 404 and 500 errors, however, v2.5.0-beta introduced automatic displaying of error pages for both 404 and 500 errors. This simply means that by default, a pre-built error page will be shown in case of errors, however, you can also define your own error handlers.

## Handling 404

Leaf's core router has specially prepared for 404 errors, and is bent on giving users full control over displaying this error.

For this reason, we've prepared the set404() method. You can use `set404` to display your own custom 404 page.

```php
Router::set404(function () use($app) {
  response()->page("./pages/404.html");
});
```

## Application Down

Leaf router is also able to dynamically handle placing your application in maintainance mode using the `configure` method.

```php
Router::configure([
  "app.down" => true,
]);
```

Alternatively, you could also place your application in maintainance mode by setting the `APP_DOWN` environment variable to true. Since `.env` variables are given more priority than router config, the router config will be ignored as long as the env is set.

::: warning Note that
Leaf router expects you to manually load your `.env` file and will not be responsible for this. You can use [vlucas/phpdotenv](https://packagist.org/packages/vlucas/phpdotenv) to do this. After loading your `.env` variables into your app, leaf router will automatically pick them up.
:::

Along with this, we have prepared a simple method to display a custom maintainance error page: `setDown`.

```php
Router::setDown(function () {
  echo "Down for maintainance";
});
```
