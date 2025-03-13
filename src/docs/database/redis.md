# Leaf Redis

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoModal from '@theme/components/shared/VideoModal.vue'
</script>

Redis is like a powerful database, but instead of storing data on a hard drive like other databases, Redis keeps everything in memory (RAM), making it much super-fast. It's often used for things that need to be accessed really fast, like caching (storing temporary data), session management, or tracking real-time data.

Leaf includes a Redis module that allows you to easily integrate Redis into your Leaf application.

::: details New to Redis?

We've included this amazing video by TechWorld with Nana to help you get started with Redis.

<VideoModal
  title="Redis intro by TechWorld with Nana"
  subject="Redis Crash Course - the What, Why and How to use Redis ..."
  description="Redis Tutorial - the What, Why and How to use Redis as a primary database."
  videoUrl="https://www.youtube.com/embed/OqCK95AS-YE"
/>

:::

## Setting Up Leaf Redis

<section class="flex mt-4">
    <div
        class="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg"
    >
        <div
            class="w-full flex md:flex-col bg-gradient-to-br from-pink-500 to-rose-500"
        >
            <div
                class="sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6 xl:p-8"
            >
                <!-- <h3 class="text-xl font-semibold mb-2 text-shadow !mt-0">
                  Leaf MVC
                </h3> -->
                <p class="font-medium text-rose-100 text-shadow mb-4">
                  Leaf Redis is only supported by Leaf MVC. We plan to add support for Leaf Core in the near future.
                </p>
            </div>
            <!-- <div
                class="relative md:pl-6 xl:pl-8 hidden sm:block"
            >
                Hello
            </div> -->
        </div>
        <div
            class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-rose-500 hidden sm:block"
        ></div>
    </div>
</section>

To get started with Leaf Redis, you need to have Redis installed on your machine. You can install Redis PHP extension by following the instructions [here](https://github.com/phpredis/phpredis/blob/develop/INSTALL.md), however, if you can't install the extension, you can use the [Predis](https://github.com/predis/predis) composer package. Leaf Redis supports both the Redis PHP extension and Predis, and will automatically detect which one you have installed and work with it.

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

Just like a normal data store, we need to initialize a connection to Redis before we can start using it. By default, Leaf MVC connects to `127.0.0.1` on port `6379`, which is also the default Redis configuration. So, if you're using the default configuration, then you don't need to do any setup. You can just jump into your application and start using Redis.

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

## Flushing Redis

You can flush all keys in Redis using the `flush()` method.

```php:no-line-numbers
redis()->flush();
```

## Configuring Leaf Redis

Most of the Leaf Redis config can be done using your `.env` file. Here are the available configurations:

```env
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=null
REDIS_SESSION=false
```

If you need to set more configurations, you can publish the built-in Redis config file by running the following command:

```bash:no-line-numbers
php leaf config:publish redis
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
