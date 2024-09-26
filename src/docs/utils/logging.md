# Logging

Logs are records of events or actions that happen in your application. Whenever something significant happens, like an error, a request, or a user action, your app can save information about it in a log file.

The log files help you track what’s going on inside your app and is really useful for debugging or understanding issues you may face in production.

A log file looks something like this:

```log{4-5}
[2021-03-31 22:44:53]
ERROR - ErrorException: Trying to access array offset on value of type int in /home/mychi/Projects/leafphp/leaf/src/Experimental/Cache.php:83
Stack trace:
#0 /home/mychi/Projects/leafphp/leaf/src/Experimental/Cache.php(83): Leaf\Exception\General::handleErrors()
#1 /home/mychi/Projects/leafphp/leaf/test/index.php(45): Leaf\Experimental\Cache::get()
#2 [internal function]: {closure}()
#3 /home/mychi/Projects/leafphp/leaf/src/Router.php(337): call_user_func_array()
#4 /home/mychi/Projects/leafphp/leaf/src/Router.php(392): Leaf\Router::invoke()
#5 /home/mychi/Projects/leafphp/leaf/src/Router.php(443): Leaf\Router::handle()
#6 /home/mychi/Projects/leafphp/leaf/src/App.php(863): Leaf\Router::run()
#7 /home/mychi/Projects/leafphp/leaf/test/index.php(52): Leaf\App->run()
#8 {main}
```

The first lines usually contain the most important information, however, it may be different depending on the structure of your application.

## Logging in Leaf

Leaf provides a very friendly and easy-to-use logging system that allows you to log errors and exceptions in your app. The logger is already integrated with Leaf core on a base level and so there's no need to initialize it: you might never even need to use the logger module yourself.

To get started with logging, you need to first install the Leaf logger module. You can do this with the Leaf CLI:

::: code-group

```bash [Leaf CLI]
leaf install logger
```

```bash [Composer]
composer require leafs/logger
```

:::

## Logger Setup

Once you have installed the logger module, you need to tell Leaf to log all exceptions/errors. You can do this simply by enabling the `log.enabled` configuration option.

```php
app()->config([
  'log.enabled' => true
]);
```

You also need to tell Leaf which directory to save logs into. By default, Leaf saves logs in the `logs` directory in your app's root directory. You can change this by setting the `log.dir` configuration option:

```php
app()->config([
  'log.enabled' => true,
  'log.dir' => __DIR__ . '/logs/'
]);
```

All logs will be saved in a `log.txt` file in the directory you specify. You can also specify a custom log file name by setting the `log.file` configuration option:

```php{4}
app()->config([
  'log.enabled' => true,
  'log.dir' => __DIR__ . '/logs/',
  'log.file' => 'app.log'
]);
```
