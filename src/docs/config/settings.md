# App Settings
<!-- markdownlint-disable no-inline-html -->

These are configurations leaf uses to seamlessly configure your applications.

## app

This is a new configuration that allows you to get information about your Leaf app and it's instance. It is recommended to **set** anything on this config key as Leaf automatically sets up everything you might need.

After initializing Leaf with `new Leaf\App`, Leaf saves that instance with an `instance` key and the instance container as `container` inside the app config.

```php
$app = new Leaf\App;

// somewhere else...

$application = Leaf\Config::get("app");

// get the $app instance defined above
$leafApp = $application["instance"];

// get $app container
$container = $application["container"];

// use container data
$container->response->json("hello");

// use the $app instance
$leafApp->get("/", function() {
  echo "something";
});

// you can also get information about that instance
echo $leafApp->routes();
```

## app.down

A new `app.down` config was added to replace the `mode=down` which caused problems in earlier releases. You can set this to true to place your app in a maintainance like state.

```php
$app = new \Leaf\App([
  'app.down' => true
]);
```

To top it all, you no longer need `setDown` unless you want to define a custom maintainance screen as Leaf's default app down screen is now automatically loaded.

```php
$app->setDown(function () {
  echo "Custom Down Handler!";
});
```

## debug

If debugging is enabled, Leaf will use its built-in error handler to display diagnostic information for uncaught Exceptions. If debugging is disabled, Leaf will instead invoke your custom error handler, passing it the otherwise uncaught Exception as its first and only argument.

```php
$app = new \Leaf\App([
  'debug' => true
]);
```

## http.version

By default, Leaf returns an HTTP/1.1 response to the client. Use this setting if you need to return an HTTP/1.0 response. This is useful if you use PHPFog or an nginx server configuration where you communicate with backend proxies rather than directly with the HTTP client.

```php
$app = new \Leaf\App([
  'http.version' => '1.1'
));

// After instantiation
$app->config('http.version', '1.1');
```

## log.dir

This tells leaf which directory to save and look for logs.

```php
Leaf\Config::set("log.dir", __DIR__ . "/logs/");
```

## log.enabled

This enables or disables Leaf’s logger. To change this setting after instantiation you need to access Leaf’s logger directly and use its `setEnabled()` method.

```php
// During instantiation
$app = new \Leaf\App([
  'log.enabled' => true
]);

// After instantiation
$app->logger()->enabled(true);
```

Note that if `log.enabled` is set to `false`. Leaf will skip initializing anything related to logs, as such, you won't have access to `$app->logger()`, `$app->log` or `$app->logWriter`.

## log.file

This setting tells leaf which file to write logs to.

```php
Leaf\Config::set("log.file", "crashes.log");
```

## log.level

Leaf has these log levels:

- \Leaf\Log::EMERGENCY
- \Leaf\Log::ALERT
- \Leaf\Log::CRITICAL
- \Leaf\Log::ERROR
- \Leaf\Log::WARN
- \Leaf\Log::NOTICE
- \Leaf\Log::INFO
- \Leaf\Log::DEBUG

The `log.level` application setting determines which logged messages will be honored and which will be ignored. For example, if the `log.level` setting is `\Leaf\Log::INFO`, debug messages will be ignored while info, warn, error, and fatal messages will be logged.

To change this setting after instantiation you must access Leaf’s logger directly and use its `setLevel()` method.

```php
// During instantiation
$app = new \Leaf\App([
  'log.level' => \Leaf\Log::DEBUG
]);

// After instantiation
$log = $app->getLog();
$log->setLevel(\Leaf\Log::WARN);
```

## log.open

This option takes in a boolean and determines whether Leaf should create the specified log file if it doesn't exist.

## log.writer

Use a custom log writer to direct logged messages to the appropriate output destination. By default, Leaf’s logger will write logged messages to `STDERR`. If you use a custom log writer, it must implement this interface:

```php
public write(mixed $message, int $level);
```

The `write()` method is responsible for sending the logged message (not necessarily a string) to the appropriate output destination (e.g. a text file, a database, or a remote web service).

To specify a custom log writer after instantiation you must access Leaf’s logger directly and use its `setWriter()` method:

```php
// During instantiation
$app = new \Leaf\App([
  'log.writer' => new \My\LogWriter()
]);

// After instantiation
$app->logger()->setWriter(new \My\LogWriter());
```

## mode

This is an identifier for the application’s current mode of operation. The mode does not affect a Leaf application’s internal functionality. Instead, the mode is only for you to optionally invoke your own code for a given mode with the `configMode()` application method.

The application mode is declared during instantiation, either as an environment variable or as an argument to the Leaf application constructor. It cannot be changed afterward. The mode may be anything you want — “development”, “test”, and “production” are typical, but you are free to use anything you want (e.g. “foo”).

```php
$app = new \Leaf\App([
  'mode' => 'development'
]);
```

## views.path

The relative or absolute path to the filesystem directory that contains your Leaf application’s view files.

```php
$app = new \Leaf\App([
  'views.path' => './views'
]);
```

## views.cachePath

This config tells leaf where to save cached and compiled views.
