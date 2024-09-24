# Configuration

Unlike other popular frameworks, Leaf works out of the box without any external configuration (unless you are using Leaf MVC). While the default configuration is good enough for most use cases, you can still configure Leaf to better suit your needs.

Since Leaf modules are designed to be plug-and-play, they have their own individual accepted configuration options which you can find in their respective documentation. This document covers the global configuration options that are available to you.

## Configuring Leaf

To add any configuration to Leaf, you can pass an array of configuration options to the `config()` method. This method takes in an array of configuration options and merges them with the default configuration.

```php
app()->config([
  'debug' => true,
  'views.path' => 'views',
]);
```

## Retrieving Configuration

You can retrieve configuration values by passing a key to the `config()` method. This will return the value of the configuration key you pass to it.

```php
$debug = app()->config('debug');
```

## Logging

Leaf has a built-in logger that can be used to log errors and other messages. You can check the [logging page](/docs/utils/logging) for more information on how to use Leaf's logger. This page will show you all the configs available for Leaf's logger.

To get started, make sure you have the logger module installed. Once installed, you should have access to a `logger()` method on the Leaf instance. You can use this method to access Leaf's logger if you want to manually log messages.

```php
$app->logger()->info('Hello World!');
```
