# Leaf Redis

<!-- markdownlint-disable no-inline-html -->

Redis stores data in memory, which makes it useful for fast, temporary, or frequently-read application state. Leaf includes a Redis module that allows you to integrate Redis into your Leaf application.

## Setting Up Leaf Redis

<div class="not-prose my-6 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm leading-6 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-300">
  Leaf Redis is currently supported in Leaf MVC. Core support is planned, but MVC apps can use it today.
</div>

To get started with Leaf Redis, you need to have Redis installed on your machine. You can install Redis PHP extension by following the instructions [here](https://github.com/phpredis/phpredis/blob/develop/INSTALL.md), however, if you can't install the extension, you can use the [Predis](https://github.com/predis/predis) composer package.

Leaf Redis supports both the Redis PHP extension and Predis, and will automatically detect which one you have installed and work with it.

After that, we can install Leaf Redis through composer or the leaf cli.

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install redis
```

```bash:no-line-numbers [Composer]
composer require leafs/redis
```

:::

From there, restart your server and Leaf will automatically detect the Redis package and start a Redis process alongside your application.

## Connecting to Redis

Just like a normal data store, we need to initialize a connection to Redis before we can start using it.

By default, Leaf MVC connects to `127.0.0.1` on port `6379`, which is also the default Redis configuration. So, if you're using the default configuration, then you don't need to do any setup. You can just jump into your application and start using Redis.

## Ping Pong

You can check if your Redis connection is working by using the `ping()` method. The `ping()` method returns a string with the message "PONG" if the connection is successful.

```php:no-line-numbers
echo redis()->ping();
```

## Setting values

You can set values in Redis using the `set()` method. The `set()` method takes in a key and a value.

```php:no-line-numbers
redis()->set('name', 'Michael');
```

You can also set multiple values at once by passing in an array.

```php
redis()->set([
  'name' => 'Michael',
  'age' => 22
]);
```

You can also set values with an expiration time by passing in a third argument.

```php:no-line-numbers
redis()->set('name', 'Michael', 3600);
```

If you need Leaf to ignore the expiration time, you can pass in `0` as the third argument.

```php:no-line-numbers
redis()->set('name', 'Michael', 0);
```

## Getting values

You can get values from Redis using the `get()` method. The `get()` method takes in a key and returns the value.

```php:no-line-numbers
$name = redis()->get('name');
```

You can also get multiple values at once by passing in an array.

```php:no-line-numbers
$values = redis()->get(['name', 'age']);

// $values => ['name' => 'Michael', 'age' => 22]
```

## Deleting values

You can delete values from Redis using the `delete()` method. The `delete()` method takes in a key and deletes the value.

```php:no-line-numbers
redis()->delete('name');
```

You can also delete multiple values at once by passing in an array.

```php:no-line-numbers
redis()->delete(['name', 'age']);
```

## Checking if a key exists

You can check if a key exists in Redis using the `exists()` method. The `exists()` method takes in a key and returns a boolean.

```php:no-line-numbers
$exists = redis()->exists('name');
```

## Getting all keys

You can get all keys in Redis using the `keys()` method.

```php:no-line-numbers
$keys = redis()->keys();
```

## Counters <Badge text="New" type="tip" />

Redis counters are atomic, which makes them perfect for rate limiting, view counts, and quick stats with no read-modify-write races:

```php:no-line-numbers
redis()->increment('page:views');           // 1
redis()->increment('page:views', 10);       // 11
redis()->decrement('page:views', 5);        // 6
```

Both return the new value after the operation. A missing key starts from 0.

## Key lifetimes <Badge text="New" type="tip" />

You can already set a ttl when writing (`set('key', 'value', 60)`), but you can also manage expiry on existing keys:

```php:no-line-numbers
redis()->expire('cached:report', 3600); // expire in an hour
redis()->ttl('cached:report');          // seconds remaining
```

`ttl()` returns `-1` when the key has no expiry, and `-2` when the key doesn't exist.

## Every other redis command <Badge text="New" type="tip" />

Leaf Redis gives first-class methods to the operations you'll reach for daily, but the whole redis command set is available: any method Leaf doesn't define is passed straight to the underlying client:

```php:no-line-numbers
redis()->hSet('user:1', 'name', 'Leaf'); // hashes
redis()->hGet('user:1', 'name');
redis()->lPush('queue:jobs', $payload);  // lists
redis()->sAdd('online', $userId);        // sets
```

These calls go to whichever client is installed (phpredis or Predis), so check the matching client's documentation for exact signatures and return types.

## Flushing Redis

You can flush all keys in Redis using the `flush()` method.

```php:no-line-numbers
redis()->flush();
```

## Configuring Leaf Redis

Most of the Leaf Redis config can be done using your `.env` file. Here are the available configurations:

```txt
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=null
REDIS_SESSION=false
```

If you need to set more configurations, you can publish the built-in Redis config file by running the following command:

```bash:no-line-numbers
leaf config:publish redis
```

This will generate a `config/redis.php` file in your project root. You can then set your configurations in this file.

```php
<?php

return [
    /*
    |-----------------------------------------------------------------
    | Redis host
    |-----------------------------------------------------------------
    |
    | Set the host for redis connection
    |
    */
    'host' => _env('REDIS_HOST', '127.0.0.1'),

    /*
    |-----------------------------------------------------------------
    | Redis host port
    |-----------------------------------------------------------------
    |
    | Set the port for redis host
    |
    */
    'port' => _env('REDIS_PORT', 6379),

    /*
    |-----------------------------------------------------------------
    | Redis auth
    |-----------------------------------------------------------------
    |
    | Set the password for redis connection
    |
    */
    'password' => _env('REDIS_PASSWORD', null),

    /*
    |-----------------------------------------------------------------
    | Redis session handler
    |-----------------------------------------------------------------
    |
    | Set redis as session save handler
    |
    */
    'session' => _env('REDIS_SESSION', false),

    /*
    |-----------------------------------------------------------------
    | Redis connection timeout
    |-----------------------------------------------------------------
    |
    | Value in seconds (optional, default is 0.0 meaning unlimited)
    |
    */
    'connection.timeout' => 0.0,

    /*
    |-----------------------------------------------------------------
    | Redis connection reserved
    |-----------------------------------------------------------------
    |
    | should be null if $retryInterval is specified
    |
    */
    'connection.reserved' => null,

    /*
    |-----------------------------------------------------------------
    | Redis session handler
    |-----------------------------------------------------------------
    |
    | Connection retry interval in milliseconds.
    |
    */
    'connection.retryInterval' => 0,

    /*
    |-----------------------------------------------------------------
    | Redis connection read timeout
    |-----------------------------------------------------------------
    |
    | Value in seconds (optional, default is 0 meaning unlimited
    |
    */
    'connection.readTimeout' => 0.0,

    /*
    |-----------------------------------------------------------------
    | Redis session save_path
    |-----------------------------------------------------------------
    |
    | Save path for redis session. Leave null to automatically
    | generate the session save path. You can also use
    | multiple save urls by passing in an array.
    |
    */
    'session.savePath' => null,

    /*
    |-----------------------------------------------------------------
    | Redis session save_path options
    |-----------------------------------------------------------------
    |
    | Options for session save path. You can pass in multiple
    | options in the order of the save path above.
    |
    */
    'session.saveOptions' => [],
];
```
