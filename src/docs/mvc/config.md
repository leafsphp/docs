# MVC Configuration

Leaf MVC, Leaf API and Skeleton all try to maintain a working out-of-the-box configuration as much as possible, so, for the most part, you don't have to configure anything. However, there are some things you may want to configure, and this page will show you how.

## Overview

You can find your application in the `config` directory. This directory contains the configuration files for Leaf MVC, Leaf API and Skeleton. You only need to configure the files that you need to configure. If you don't need to configure a file, you can just leave it as is. Each option is documented, so feel free to look through the files and get familiar with the options available to you.

These configuration files allow you to configure things like your database connection information, your mail server information, as well as various other core configuration values such as your application timezone and encryption key.

For the most part, you will only need to set the values in the `.env` file.

## The `.env` file

Having different configuration values based on the environment in which an application is operating is usually pretty helpful. For instance, you may need to use a different database for local development compared to your production server.

The `.env` file allows you to define environment specific configuration values. You can define as many environment variables as you want in this file. The values in this file will be loaded into the `$_ENV` superglobal variable, and will be accessible via the `_env()` helper function.

In a new Leaf installation, the root folder of your application will include an `.env.example` file that specifies numerous typical environment variables. As part of the Leaf installation process, this file will be automatically duplicated to `.env`. You may then modify the `.env` file to suit your needs. The `.env` file is not tracked by Git, so you can safely modify it without worrying about it being overwritten by future updates.

::: tip Managing Environment Variables

If you add new environment variables to a team project, be sure to add the keys to the `.env.example` file so that other developers will know what environment variables are available.

:::

## Application Config

This configuration basically controls how Leaf works with your application. This file contains the following options by default:

```php
/*
|--------------------------------------------------------------------------
| App Config
|--------------------------------------------------------------------------
|
| This file contains the configuration for your app. Most of this
| configuration is for Leaf's core but has been made available
| to you for your convenience.
|
| You can link your environment variables to this file by using the
| _env() helper function. This function will return the value set in
| your .env file. You can use the below settings as a reference.
|
*/

return [
  /*
  |--------------------------------------------------------------------------
  | Place app in maintainance mode
  |--------------------------------------------------------------------------
  |
  | Replacement for earlier mode=down. You can set this to true to place
  | your app in a maintainance like state. It will display Leaf's default
  | app down page if a custom handler is not set.
  |
  | See: https://leafphp.dev/docs/config/settings.html#app-down
  |
  */
  'app.down' => _env('APP_DOWN', false),

  /*
  |--------------------------------------------------------------------------
  | App debugging
  |--------------------------------------------------------------------------
  |
  | If debugging is enabled, Leaf will use its built-in error handler to
  | display diagnostic information for uncaught Exceptions, else it will
  | display a bare error page usable in production. You can set a
  | custom error page to display using `$app->setError`.
  |
  | You might want to turn this off in production.
  |
  */
  'debug' => _env('APP_DEBUG', true),

  /*
  |--------------------------------------------------------------------------
  | HTTP Version
  |--------------------------------------------------------------------------
  |
  | By default, Leaf returns an HTTP/1.1 response to the client.
  | Use this setting if you need to return an HTTP/1.0 response.
  |
  */
  'http.version' => '1.1',

  /*
  |--------------------------------------------------------------------------
  | Log directory
  |--------------------------------------------------------------------------
  |
  | This tells leaf which directory to save and look for logs.
  |
  */
  'log.dir' => 'storage/logs/',

  /*
  |--------------------------------------------------------------------------
  | Log Enabled
  |--------------------------------------------------------------------------
  |
  | This enables or disables Leaf’s logger. Note that if log.enabled is
  | set to false. Leaf will skip initializing anything related to logs,
  | as such, you won't have access to $app->logger(),
  | $app->log or $app->logWriter.
  |
  */
  'log.enabled' => true,

  /*
  |--------------------------------------------------------------------------
  | Log file
  |--------------------------------------------------------------------------
  |
  | This setting tells leaf which file to write logs to.
  |
  */
  'log.file' => 'app.log',

  /*
  |--------------------------------------------------------------------------
  | Log level
  |--------------------------------------------------------------------------
  |
  | Leaf has these log levels:
  |
  | - \Leaf\Log::EMERGENCY
  | - \Leaf\Log::ALERT
  | - \Leaf\Log::CRITICAL
  | - \Leaf\Log::ERROR
  | - \Leaf\Log::WARN
  | - \Leaf\Log::NOTICE
  | - \Leaf\Log::INFO
  | - \Leaf\Log::DEBUG
  |
  */
  'log.level' => \Leaf\Log::DEBUG,

  /*
  |--------------------------------------------------------------------------
  | Log open
  |--------------------------------------------------------------------------
  |
  | Takes in a boolean and determines whether Leaf should create
  | the specified log file if it doesn't exist.
  |
  */
  'log.open' => true,

  /*
  |--------------------------------------------------------------------------
  | Log writer
  |--------------------------------------------------------------------------
  |
  | Use a custom log writer to direct logged messages
  | to the appropriate output destination.
  |
  */
  'log.writer' => null,

  /*
  |--------------------------------------------------------------------------
  | Mode
  |--------------------------------------------------------------------------
  |
  | This is an identifier for the application’s current mode of operation.
  | The mode does not affect a Leaf application’s internal functionality.
  |
  */
  'mode' => 'development',

  /*
  |--------------------------------------------------------------------------
  | Views path
  |--------------------------------------------------------------------------
  |
  | The relative or absolute path to the filesystem directory that
  | contains your Leaf application’s view files.
  |
  */
  'views.path' => ViewsPath(null, false),

  /*
  |--------------------------------------------------------------------------
  | views cache path
  |--------------------------------------------------------------------------
  |
  | This config tells leaf where to save cached and compiled views.
  |
  */
  'views.cachePath' => StoragePath('framework/views')
];
```

You can find more information about these settings in the [App Config](/docs/config/settings.html) documentation.

## Aloe CLI Config

This configuration file is used to configure the Aloe CLI. This file basically contains a map of paths that directs Aloe where to find framework files. This file contains the following options by default:

```php
// config for aloe CLI
return [
  'paths' => [
    'controllers_path' => '/app/controllers',
    'models_path' => '/app/models',
    'migrations_path' => '/app/database/migrations',
    'seeds_path' => '/app/database/seeds',
    'factories_path' => '/app/database/factories',
    'helpers_path' => '/app/helpers',
    'views_path' => '/app/views',
    'config_path' => '/app/config',
    'storage_path' => '/storage',
    'commands_path' => '/app/console',
    'routes_path' => '/app/routes',
    'lib_path' => '/lib',
  ],
];
```

You only need to configure this file if you want to change the default paths.

## Auth Config

This configuration file is used to configure [Leaf Auth](/modules/auth/). You only need to update this config if you want to switch up the way Leaf Auth works out of the box. This file contains the following options by default:

```php
use Leaf\Helpers\Password;

return [
  /*
  |--------------------------------------------------------------------------
  | Database table
  |--------------------------------------------------------------------------
  |
  | This is the table that leaf auth will perform authentication
  | checks on and edit/retrieve users from.
  |
  */
  'DB_TABLE' => 'users',

  /*
  |--------------------------------------------------------------------------
  | Use session
  |--------------------------------------------------------------------------
  |
  | Use session based authentication instead of the default JWT based auth.
  |
  */
  'USE_SESSION' => true,

  /*
  |--------------------------------------------------------------------------
  | Generate timestamps
  |--------------------------------------------------------------------------
  |
  | Automatically generate created_at/updated_at timestamps for register
  | and update methods
  |
  */
  'USE_TIMESTAMPS' => true,

  /*
  |--------------------------------------------------------------------------
  | Encode password
  |--------------------------------------------------------------------------
  |
  | Password encode is run when leaf wants to encode passwords on register
  | This exact method is used by default in Leaf, so you can set it to null
  | if you want to.
  |
  | You can set your own implementation instead of Password::hash
  |
  */
  'PASSWORD_ENCODE' => function ($password) {
    return Password::hash($password);
  },

  /*
  |--------------------------------------------------------------------------
  | Verify Password
  |--------------------------------------------------------------------------
  |
  | This function is run to verify the password. This implementation is done
  | by default, so you can set it to null, and it will still work fine.
  |
  | You can add your own implementation instead of Password::verify
  |
  */
  'PASSWORD_VERIFY' => function ($password, $hashedPassword) {
    return Password::verify($password, $hashedPassword);
  },

  /*
  |--------------------------------------------------------------------------
  | Password Key
  |--------------------------------------------------------------------------
  |
  | The default password key. Leaf will expect this key to hold passwords
  | in your database.
  |
  */
  'PASSWORD_KEY' => 'password',

  /*
  |--------------------------------------------------------------------------
  | Hide id
  |--------------------------------------------------------------------------
  |
  | Hide id field from user object returned in login, register and update
  |
  */
  'HIDE_ID' => true,

  /*
  |--------------------------------------------------------------------------
  | Hide password
  |--------------------------------------------------------------------------
  |
  | Hide password from user object returned in login, register and update
  |
  */
  'HIDE_PASSWORD' => true,

  /*
  |--------------------------------------------------------------------------
  | Login params error
  |--------------------------------------------------------------------------
  |
  | Error to show when the login params aren't found in db
  |
  */
  'LOGIN_PARAMS_ERROR' => 'Username not registered!',

  /*
  |--------------------------------------------------------------------------
  | Password error
  |--------------------------------------------------------------------------
  |
  | Error to show when the login password is wrong
  |
  */
  'LOGIN_PASSWORD_ERROR' => 'Password is incorrect!',

  /*
  |--------------------------------------------------------------------------
  | Session on register
  |--------------------------------------------------------------------------
  |
  | If true, a session will be created on a successful registration, else
  | you it'll be created on login rather.
  |
  */
  'SESSION_ON_REGISTER' => false,

  /*
  |--------------------------------------------------------------------------
  | Login page route
  |--------------------------------------------------------------------------
  */
  'GUARD_LOGIN' => '/auth/login',

  /*
  |--------------------------------------------------------------------------
  | Register page route
  |--------------------------------------------------------------------------
  */
  'GUARD_REGISTER' => '/auth/register',

  /*
  |--------------------------------------------------------------------------
  | Logout route
  |--------------------------------------------------------------------------
  */
  'GUARD_HOME' => '/home',

  /*
  |--------------------------------------------------------------------------
  | Logout route
  |--------------------------------------------------------------------------
  */
  'GUARD_LOGOUT' => '/auth/logout',

  /*
  |--------------------------------------------------------------------------
  | Home page route
  |--------------------------------------------------------------------------
  */
  'GUARD_HOME' => '/home',

  /*
  |--------------------------------------------------------------------------
  | JWT + Session
  |--------------------------------------------------------------------------
  |
  | Add an auth token to the auth session?
  |
  */
  'SAVE_SESSION_JWT' => false,

  /*
  |--------------------------------------------------------------------------
  | JWT Token Secret
  |--------------------------------------------------------------------------
  |
  | Secret string to encode JWT
  |
  */
  'TOKEN_SECRET' => '@_leaf$0Secret!',

  /*
  |--------------------------------------------------------------------------
  | JWT Lifetime
  |--------------------------------------------------------------------------
  |
  | How long should JWT be valid for?
  |
  */
  'TOKEN_LIFETIME' => 60 * 60 * 24 * 365
];
```

You can find more information about these settings in the [Auth Config](/modules/auth/v/2.1/config.html) documentation.

## CORS config

This config allows you pass options to the [Leaf CORS module](/modules/cors/). The default config looks like this:

```php
return [
  /*
  |--------------------------------------------------------------------------
  | Configure allowed origins
  |--------------------------------------------------------------------------
  |
  | Configures the Access-Control-Allow-Origin CORS header. Possible values:
  |
  | * String - set origin to a specific origin. For example if
  |   you set it to "http://example.com" only requests from
  |   "http://example.com" will be allowed.
  |
  | * RegExp - set origin to a regular expression pattern which will be
  |   used to test the request origin. If it's a match, the request origin
  |   will be reflected. For example the pattern /example\.com$/ will reflect
  |   any request that is coming from an origin ending with "example.com".
  |
  | * Array - set origin to an array of valid origins. Each origin can be a String
  |   or a RegExp. For example ["http://example1.com", /\.example2\.com$/] will
  |   accept any request from "http://example1.com" or from
  |   a subdomain of "example2.com".
  |
  | * Function - set origin to a function implementing some custom
  |   logic. The function takes the request origin as the first parameter
  |   and a callback (called as callback(err, origin), where origin is a
  |   non-function value of the origin option) as the second.
  |
  */
  'origin' => '*',

  /*
  |--------------------------------------------------------------------------
  | Configure allowed HTTP methods
  |--------------------------------------------------------------------------
  |
  | Configures the Access-Control-Allow-Methods CORS header.
  | Expects a comma-delimited string (ex: 'GET,PUT,POST') or
  | an array (ex: ['GET', 'PUT', 'POST'])
  |
  */
  'methods' => 'GET,HEAD,PUT,PATCH,POST,DELETE',

  /*
  |--------------------------------------------------------------------------
  | Configure allowed HTTP headers
  |--------------------------------------------------------------------------
  |
  | Configures the Access-Control-Allow-Headers CORS header. Expects a
  | comma-delimited string (ex: 'Content-Type,Authorization') or
  | an array (ex: ['Content-Type', 'Authorization']). If not specified,
  | defaults to reflecting the headers specified in the request's
  | Access-Control-Request-Headers header.
  |
  */
  'allowedHeaders' => '*',

  /*
  |--------------------------------------------------------------------------
  | Configure expose headers
  |--------------------------------------------------------------------------
  |
  | Configures the Access-Control-Expose-Headers CORS header. Expects
  | a comma-delimited string (ex: 'Content-Range,X-Content-Range')
  | or an array (ex: ['Content-Range', 'X-Content-Range']).
  | If not specified, no custom headers are exposed.
  |
  */
  'exposedHeaders' => '',

  /*
  |--------------------------------------------------------------------------
  | Configure credentials
  |--------------------------------------------------------------------------
  |
  | Configures the Access-Control-Allow-Credentials CORS header.
  | Set to true to pass the header, otherwise it is omitted.
  |
  */
  'credentials' => false,

  /*
  |--------------------------------------------------------------------------
  | Configure max age
  |--------------------------------------------------------------------------
  |
  | Configures the Access-Control-Max-Age CORS header. Set to
  | an integer to pass the header, otherwise it is omitted.
  |
  */
  'maxAge' => null,

  /*
  |--------------------------------------------------------------------------
  | Configure preflight continue
  |--------------------------------------------------------------------------
  |
  | Pass the CORS preflight response to the next handler.
  |
  */
  'preflightContinue' => false,

  /*
  |--------------------------------------------------------------------------
  | Log open
  |--------------------------------------------------------------------------
  |
  | Provides a status code to use for successful OPTIONS requests,
  | since some legacy browsers (IE11, various SmartTVs) choke on 204.
  |
  */
  'optionsSuccessStatus' => 204,
];
```

You can find more information on the configuration options on the [cors config docs](/modules/cors/#configuration-options).
