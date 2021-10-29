# Leaf Redis

<!-- [![Latest Stable Version](https://poser.pugx.org/leafs/leaf/v/stable)](https://packagist.org/packages/leafs/leaf)
[![Total Downloads](https://poser.pugx.org/leafs/leaf/downloads)](https://packagist.org/packages/leafs/leaf)
[![License](https://poser.pugx.org/leafs/leaf/license)](https://packagist.org/packages/leafs/leaf) -->

This is a new addition to Leaf's collection of packages. Unlike other packages, this one doesn't come pre-packaged with Leaf by default and so needs to be installed separately.

## Installation

You can quickly and simply install Leaf Redis through composer.

```sh
composer require leafs/redis
```

**NOTE:** Leaf redis is a separate package and so can be used outside of Leaf.

## Getting Started

To get started with Leaf Redis, you simply need to call the `init` method and pass in any configuration you need.

```php
Leaf\Redis::init();
```

This will initialize a new redis connection, from there, you can call any function you need to call.

### Aloe CLI

Although Leaf Redis can be used outside the Leaf environment, there's more support for Leaf based frameworks. Leaf Redis comes with out of the box support for Aloe CLI which is used in Leaf MVC and Leaf API. To get started, head over to the `leaf` file in the root directory of your Leaf API/Leaf MVC app or wherever aloe CLI is registered and register a new command.

```php
$console->register(\Leaf\Redis::commands());
```

From there you should have access to a bunch of new commands from Leaf redis. The available commands are:

```sh
redis
  redis:install  Create leaf redis config and .env variables
  redis:server   Start redis server
```

## Config

As mentioned above, the `init` method takes in an array for configuration. Below is the default config for `init`.

```php
/*
|--------------------------------------------------------------------------
| Redis host
|--------------------------------------------------------------------------
|
| Set the host for redis connection
|
*/
"host" => "127.0.0.1",

/*
|--------------------------------------------------------------------------
| Redis host port
|--------------------------------------------------------------------------
|
| Set the port for redis host
|
*/
"port" => 6379,

/*
|--------------------------------------------------------------------------
| Redis auth
|--------------------------------------------------------------------------
|
| Set the password for redis connection
|
*/
"password" => null,

/*
|--------------------------------------------------------------------------
| Redis session handler
|--------------------------------------------------------------------------
|
| Set redis as session save handler
|
*/
"session" => false,

/*
|--------------------------------------------------------------------------
| Redis connection timeout
|--------------------------------------------------------------------------
|
| Value in seconds (optional, default is 0.0 meaning unlimited)
|
*/
"connection.timeout" => 0.0,

/*
|--------------------------------------------------------------------------
| Redis connection reserved
|--------------------------------------------------------------------------
|
| should be null if $retryInterval is specified
|
*/
"connection.reserved" => null,

/*
|--------------------------------------------------------------------------
| Redis session handler
|--------------------------------------------------------------------------
|
| Connection retry interval in milliseconds.
|
*/
"connection.retryInterval" => 0,

/*
|--------------------------------------------------------------------------
| Redis connection read timeout
|--------------------------------------------------------------------------
|
| Value in seconds (optional, default is 0 meaning unlimited
|
*/
"connection.readTimeout" => 0.0,

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
"session.savePath" => null,

/*
|--------------------------------------------------------------------------
| Redis session save_path options
|--------------------------------------------------------------------------
|
| Options for session save path. You can pass in multiple options in
| the order of the save path above.
|
*/
"session.saveOptions" => [],
```

```php
use Leaf\Redis;

Redis::init([
  // you can use multiple hosts
  "session.savePath" => ["tcp://host1:6379", "tcp://host2:6379"],

  // the first array is for the first host, second for the second host
  "session.saveOptions" => [["weight" => 1], ["weight" => 2]],
]);
```

## Available Methods

### set

This allows you to set a redis entry.

```php
Leaf\Redis::set("key", "value");

// you can also use arrays to set multiple values at once

Leaf\Redis::set(["key" => "value", "key2" => "value"]);
```

### get

This returns a saved redis entry.

```php
$value = Leaf\Redis::get("key");

// You can also get multiple entries at once

$data = Leaf\Redis::get(["key", "key2"]);

// $data => [key => value, key2 => value]
```

### ping

Ping the redis server

```php
Leaf\Redis::ping();
```

Built with ❤ by [**Mychi Darko**](https://mychi.netlify.app)
