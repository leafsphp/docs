---
title: "Names and Scopes"
---

<!-- markdownlint-disable no-inline-html -->
# Names and Scopes

When you build a Leaf application you will enter various scopes in your code (e.g. global scope and function scope). You will likely need a reference to your Leaf application in each scope. There are several ways to do this:

- Use Config app instance
- Curry an application instance into function scope with the `use` keyword

<hr>

## Config app instance

Once leaf is initialized, a config named app is populated with the app instance and container. You can use these from anywhere in your app.

```php
<?php

// ...
$app = Leaf\Config::get("app")["instance"];

$app->set404(Custom404::build());
```

## Scope Resolution

So how do you get a reference to your Leaf application? The example below demonstrates how to obtain a reference to a Leaf application within a route callback function. The `$app` variable is used in the global scope to define the HTTP GET route. But the `$app` variable is also needed within the route’s callback scope to render a template.

```php
$app = new \Leaf\App;

$app->get('/foo', function () {
    $app->response()->json("something"); // <-- ERROR
});
```

This example fails because the $app variable is unavailable inside the route callback function.

### Currying

We can inject the `$app` variable into the callback function with the `use` keyword:

```php
$app = new \Leaf\App;

$app->get('/foo', function () use ($app) {
    $app->response()->json("something"); // <-- SUCCESS
});
```

<hr>

# Modes

It is common practice to run web applications in a specific mode depending on the current state of the project. If you are developing the application, you will run the application in “development” mode; if you are testing the application, you will run the application in “test” mode; if you launch the application, you will run the application in “production” mode.

Leaf supports the concept of modes in that you may define your own modes and prompt Leaf to prepare itself appropriately for the current mode. For example, you may want to enable debugging in “development” mode but not in “production” mode. The examples below demonstrate how to configure Leaf differently for a given mode.

## What is a mode?

Technically, an application mode is merely a string of text - like “development” or “production” - that has an associated callback function used to prepare the Leaf application appropriately. The application mode may be anything you like: “testing”, “production”, “development”, or even “foo”.

## How do I set the application mode?

### Use leaf config

You can directly set the mode using Leaf Config.

```php
Leaf\Config::set("mode", "production");
```

### Use application setting

If an environment variable is not found, Leaf will next look for the mode in the application settings.

```php
$app = new \Leaf\App([
    'mode' => 'production'
]);
```

### Default mode

If no mode setting is found, Leaf will set the application mode to “development”.

## Configure for a Specific Mode

After you instantiate a Leaf application, you may configure the Leaf application for a specific mode with the Leaf application’s configureMode() method. This method accepts two arguments: the name of the target mode and a callable function to be immediately invoked if the first argument matches the current application mode.

Assume the current application mode is “production”. Only the callable associated with the “production” mode will be invoked. The callable associated with the “development” mode will be ignored until the application mode is changed to “development”.

```php
<?php
// Set the current mode
$app = new \Leaf\App([
    'mode' => 'production'
]);
```

<!-- // Only invoked if mode is "production"
$app->runIn('production', function () use ($app) {
    $app->config([
        'log.enable' => true,
        'debug' => false
	]);
});

// Only invoked if mode is "development"
$app->runIn('development', function () use ($app) {
    $app->config([
        'log.enable' => false,
        'debug' => true
	]);
}); -->
