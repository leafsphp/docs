# Debugging

<!-- markdownlint-disable no-inline-html -->

Debugging is the process of finding and fixing errors (bugs) in your code. When your program isn't working as expected, you "debug" by identifying where things go wrong and correcting them. It often involves reading error messages, using print statements or tools (like a debugger) to check the values of variables, and running the code step by step.

## Debugging in Leaf

While Leaf doesn't ship with a full-fledged debugger out of the box, it still provides tools that point you in the right direction. Your Leaf apps run in a development environment by default, which means you can see detailed error messages and stack traces in your browser when something goes wrong. This stack trace is Leaf's customized error page that shows you where the error occurred in your code.

<img src="https://github.com/user-attachments/assets/52f044bb-bb9b-4fdd-a3d7-835ac7e1f085" alt="Error Page" width="100%" class="border border-gray-500 rounded-lg">

It provides other information like the kind of information entering your app, your environment variables and other server information. This is useful for finding out what went wrong and where.

## Leaf DevTools <Badge type="warning" text="BETA" />

Leaf provides DevTools to give you more insight into your app than you can get from the error page. It has a beautiful and intuitive interface that give you information about your Leaf application, and a light-weight library that you can use to interact with the devtools frontend.

<img src="https://user-images.githubusercontent.com/26604242/235434208-82ccdd87-6289-43fd-b93b-5fa09e6acd20.jpg" alt="Error Page" width="100%" class="border border-gray-500 rounded-lg">

To get started with the DevTools, you need to install the Leaf DevTools module:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install devtools
```

```bash:no-line-numbers [Composer]
composer require leafs/devtools
```

:::

After installing the devtools module, you need to add the hook to your app. This will register the devtools routes and allow your Leaf app to communicate with the DevTools. You can do this by adding this line to your app root.

```php{5}
<?php

require __DIR__ . "/vendor/autoload.php";

\Leaf\DevTools::install();

...
```

From there, you can access the DevTools by visiting `<your-app-url>/leafDevTools`. The DevTools will show you information about your app, like the routes, the request and response, and the environment variables. You can also use the DevTools to interact with your app, like making requests to your app and seeing the response.

### Server Debug Logs

When working with JavaScript, you can use `console.log` to log information to the console. In PHP, you can use `echo` or `var_dump` to log information to the browser. However, this can be a bit cumbersome, especially when you're working with APIs or other server-side code. Leaf provides a `log` function that you can use to log information to the server. This is useful for debugging your app in a non-invaisive way.

```php
\Leaf\DevTools::console('This data should be logged in the console');
```

Adding this line to your code will log the data to the Leaf DevTools console without affecting the output of your app. This allows you to debug your app while going through the normal flow of your app.

```php
\Leaf\DevTools::console('This data should be logged in the console');
\Leaf\DevTools::console('This is a warning', 'warn');
\Leaf\DevTools::console('This is an error', 'error');
\Leaf\DevTools::console('This is an info message', 'info');
\Leaf\DevTools::console('This is a debug message', 'log');
```

These will output different colored messages in the console:

<img src="https://github.com/leafsphp/devtools/assets/26604242/195e15b1-d063-4cf2-a817-5a60e8ba184d" alt="Console page" width="100%" class="border border-gray-500 rounded-lg">

***Leaf will only allow access to the DevTools when the app is in a development environment, but not every hosting provider sets the environment to `production` automatically. To be safe, we recommend uninstalling the DevTools module before deploying your app.***

## Disabling Debugging

All Leaf applications run in a development environment by default. This means you can see detailed error messages and stack traces and are even able use devtools with much leaner security. However, when you're ready to deploy your app to production, you should disable debugging to prevent sensitive information from leaking. You can do this by setting the `app.debug` configuration option to `false`:

```php
app()->config([
  'app.debug' => false
]);
```

We know that it's really easy to forget to disable debugging when deploying your app, so Leaf will automatically disable debugging when you set the `APP_ENV` environment variable to `production`. This is usually done automatically by your hosting provider, but if you're deploying your app manually on a VPS or Cloud, you can set the `APP_ENV` environment variable in your `.env` file.

We understand that you might want to enable debugging in production for some reason, however, we strongly advise against it. Debugging in production can expose sensitive information about your app, which can be used by attackers to exploit your app. If you truly need to debug in production, you should turn to logging instead. Logging works in both development and production environments and is a safer way to debug your app.

## Logging

Logs are records of events in your application. They capture significant things like errors, requests, or user actions, helping you track your app's behavior. Log files are essential for debugging and understanding production issues. A typical log file looks like this:

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

Leaf offers a user-friendly logger for logging errors and other stuff in your app. It's integrated with Leaf's core, so no initialization is required, and you may not need to use the logger directly. To start logging, first install the Leaf logger module:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install logger
```

```bash:no-line-numbers [Composer]
composer require leafs/logger
```

:::

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
