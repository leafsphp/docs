---
title: "Error Handling"
---

# Error Handling
<!-- markdownlint-disable no-inline-html -->

<!-- ::: info Video Docs
Learn how to handle errors in your leaf app, during and after development.

<VideoLesson href="#" title="Error handling in leaf PHP">Watch the error handling guide on youtube</VideoLesson>
::: -->

In earlier versions, Leaf would always display default server error pages in case of errors like 404 and 500 errors, however, v2.5.0-beta introduced automatic displaying of error pages for both 404 and 500 errors. This simply means that by default, a pre-built error page will be shown in case of errors, however, you can also define your own error handlers.

## Handling 404

Leaf's core router has specially prepared for 404 errors, and is bent on giving users full control over displaying this error.

For this reason, we've prepared the set404() method. You can use `set404` to display your own custom 404 page.

```php
app()->set404(function() use($app) {
  response()->page("./pages/404.html");
});
```

## Handling 500

By default, Leaf has 2 pre-built 500 error pages, the first is a general error page used in development. If you've ever run into an error during development, you've probably come across a nice looking page that gives you information about your error, line numbers and all that stuff, however, there's another error page used in production. You can switch to this by simply configuring Leaf's `debug` to `false`.

```php
$app = new Leaf\App(["debug" => false]);
```

You'll have an error page which doesn't give details on the error, however, if logs are enabled, all the errors are saved to a log file in the background.

If you still wish to use a custom handler, you can set one with `setErrorHandler`.

```php
// use an error handler from a package
app()->setErrorHandler(['\Leaf\Exception\General', 'defaultError']);

// use a custom function
app()->setErrorHandler(function() use($app) {
  response()->page("./pages/500.html");
});
```

## Application Down

Leaf is also able to dynamically handle placing your application in maintainance mode using leaf config.

```php
app()->config("app.down", true);
```

Alternatively, you could also place your application in maintainance mode by setting the `APP_DOWN` environment variable to true. Since `.env` variables are given more priority than router config, the router config will be ignored as long as the env is set.

::: warning Loading your env
Leaf expects you to manually load your `.env` file and will not be responsible for this. You can use [vlucas/phpdotenv](https://packagist.org/packages/vlucas/phpdotenv) to do this. After loading your `.env` variables into your app, leaf router will automatically pick them up.
:::

::: tip Loading your env
Your environment variables are automatically loaded into your application if you are using Leaf MVC, Leaf API or Skeleton.
:::

### Custom Down Handler

Leaf comes with a beautiful application down handler which you can use in production. However, it might not match your theme, or you might have a maintainance screen designed by someone which needs to match that design. Leaf gives you the flexibility to display a custom maintainance error page using the `setDown` method.

```php
app()->setDown(function () {
  echo "Down for maintainance";
});
```
