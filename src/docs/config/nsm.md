---
title: "Instance and Mode"
---

<!-- markdownlint-disable no-inline-html -->

## Config app instance

Once leaf is initialized, a config named app is populated with the app instance and container. You can use these from anywhere in your app.

```php
<?php

// ...
$app = Leaf\Config::get("app")["instance"];

$app->set404(Custom404::build());
```

## Modes

It is common practice to run web applications in a specific mode depending on the current state of the project. If you are developing the application, you will run the application in “development” mode; if you are testing the application, you will run the application in “test” mode; if you launch the application, you will run the application in “production” mode.

Leaf supports the concept of modes in that you may define your own modes and prompt Leaf to prepare itself appropriately for the current mode. For example, you may want to enable debugging in “development” mode but not in “production” mode. The examples below demonstrate how to configure Leaf differently for a given mode.

### What is a mode?

Technically, an application mode is merely a string of text - like `development` or `production` - that has an associated callback function used to prepare the Leaf application appropriately. The application mode may be anything you like: `testing`, `production`, `development`, or even `foo`.

### How do I set the app mode?

#### Use leaf config

You can directly set the mode using Leaf Config.

```php
Leaf\Config::set("mode", "production");
```

#### Use application setting

If an environment variable is not found, Leaf will next look for the mode in the application settings.

```php
$app = new \Leaf\App([
    'mode' => 'production'
]);
```

#### Use .env

You can also use the `APP_ENV` environment variable to set the application mode. Leaf will automatically search for this environment variable and set the application mode from it.

::: warning NOTE
If you want to go down this route, leaf expects you to load your environment variables correctly and will not be responsible for doing so. If however, you use Leaf API, Leaf MVC or Skeleton, this is already taken care of for you.
:::

#### Default mode

If no mode setting is found, Leaf will set the application mode to `development`.

### How do I use an app mode?

After you instantiate a Leaf application, you may configure the Leaf application for a specific mode with the Leaf application’s `script` method. This method accepts two arguments: the name of the target mode and a callable function to be immediately invoked if the first argument matches the current application mode.

Assume the current application mode is `production`. Only the callable associated with the `production` mode will be invoked. The callable associated with the `development` mode will be ignored until the application mode is changed to `development`.

```php
<?php
// Set the current mode
app()->config([
    'mode' => 'production'
]);
```

```php
// Only invoked if mode is "production"
app()->script('production', function () use ($app) {
    app()->config([
        'log.enable' => true,
        'debug' => false
    ]);
});

// Only invoked if mode is "development"
app()->script('development', function () use ($app) {
    app()->config([
        'log.enable' => false,
        'debug' => true
    ]);
});
```
