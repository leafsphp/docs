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

To get started with Leaf Redis, you need to have Redis installed on your machine. You can install Redis PHP extension by following the instructions [here](https://github.com/phpredis/phpredis/blob/develop/INSTALL.md).

After that, we can install Leaf Redis through composer or the leaf cli.

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install redis
```

```bash:no-line-numbers [Composer]
composer require leafs/redis
```

:::

Once that's done, we can start using Leaf Redis in our Leaf application. Just like any other database, we need to initialize a connection to Redis before we can start using it.

```php
redis()->connect();
```

This will initialize a new Redis connection. From there, you can start storing and retrieving data from Redis.

## Usage with Leaf MVC

If you're using Leaf MVC, you can add on some extra features to your setup. Leaf Redis comes with a few commands that you can attach to your Aloe CLI. You can do this by heading over to the `app/console/Commands.php` file in your Leaf MVC app and adding the following line to the return array.

```php
<?php 

namespace App\Console;

class Commands
{
    /**
     * Register commands
     * 
     * @param $console
     * @return void
     * 
     */
    public static function register($console): void
    {
        $console->register([
            ExampleCommand::class,
            \Leaf\Redis::commands() // [!code ++]
        ]);
    }
}
```

Once you've done that, you should have access to a bunch of new commands from Leaf Redis. The available commands are:

```bash
redis
  redis:install  Create leaf redis config and .env variables
  redis:server   Start redis server
```

You can then run `php leaf redis:install` to install the redis config and environment variables, and then `php leaf redis:server` to start the redis server.

## Configuring Leaf Redis

The `connect` method takes in an array for configuration. Below is the default config for `connect`.

```php
/*
|--------------------------------------------------------------------------
| Redis host
|--------------------------------------------------------------------------
|
| Set the host for redis connection
|
*/
'host' => '127.0.0.1',

/*
|--------------------------------------------------------------------------
| Redis host port
|--------------------------------------------------------------------------
|
| Set the port for redis host
|
*/
'port' => 6379,

/*
|--------------------------------------------------------------------------
| Redis auth
|--------------------------------------------------------------------------
|
| Set the password for redis connection
|
*/
'password' => null,

/*
|--------------------------------------------------------------------------
| Redis session handler
|--------------------------------------------------------------------------
|
| Set redis as session save handler
|
*/
'session' => false,

/*
|--------------------------------------------------------------------------
| Redis connection timeout
|--------------------------------------------------------------------------
|
| Value in seconds (optional, default is 0.0 meaning unlimited)
|
*/
'connection.timeout' => 0.0,

/*
|--------------------------------------------------------------------------
| Redis connection reserved
|--------------------------------------------------------------------------
|
| should be null if $retryInterval is specified
|
*/
'connection.reserved' => null,

/*
|--------------------------------------------------------------------------
| Redis session handler
|--------------------------------------------------------------------------
|
| Connection retry interval in milliseconds.
|
*/
'connection.retryInterval' => 0,

/*
|--------------------------------------------------------------------------
| Redis connection read timeout
|--------------------------------------------------------------------------
|
| Value in seconds (optional, default is 0 meaning unlimited
|
*/
'connection.readTimeout' => 0.0,

/*
|--------------------------------------------------------------------------
| Redis session save_path
|--------------------------------------------------------------------------
|
| Save path for redis session. Leave null to automatically
| generate the session save path. You can also use multiple save urls
| by passing in an array.
|
*/
'session.savePath' => null,

/*
|--------------------------------------------------------------------------
| Redis session save_path options
|--------------------------------------------------------------------------
|
| Options for session save path. You can pass in multiple options in
| the order of the save path above.
|
*/
'session.saveOptions' => [],
```

You can pick and choose which configuration options you want to set. You can set these configurations by passing an array to the `connect` method.

```php
redis()->connect([
  // you can use multiple hosts
  'session.savePath' => ['tcp://host1:6379', 'tcp://host2:6379'],

  // the first array is for the first host, second for the second host
  'session.saveOptions' => [['weight' => 1], ['weight' => 2]],
]);
```

## Ping Pong

You can check if your Redis connection is working by using the `ping()` method. The `ping()` method returns a string with the message "PONG" if the connection is successful.

```php
echo redis()->ping();
```

## Setting values

You can set values in Redis using the `set()` method. The `set()` method takes in a key and a value.

```php
redis()->set('name', 'Michael');
```

You can also set multiple values at once by passing in an array.

```php
redis()->set([
  'name' => 'Michael',
  'age' => 22
]);
```

## Getting values

You can get values from Redis using the `get()` method. The `get()` method takes in a key and returns the value.

```php
$name = redis()->get('name');
```

You can also get multiple values at once by passing in an array.

```php
$values = redis()->get(['name', 'age']);

// $values => ['name' => 'Michael', 'age' => 22]
```
