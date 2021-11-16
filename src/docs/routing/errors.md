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
