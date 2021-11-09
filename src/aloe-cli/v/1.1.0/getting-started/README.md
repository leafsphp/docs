# Aloe CLI: Getting Started

<div class="alert -warning">
    If you're using Leaf MVC or Leaf API, you can skip this page.
</div>

Aloe CLI is a smart CLI that takes care of a lot of a whole lot of time consuming tasks during your development, allowing you to focus only on important stuff.

**Aloe is based on the symfony console, with that, all symfony commands are also valid aloe commands and can be called through the aloe cli.**

*Currently, Aloe is only fully supported by Leaf MVC and Leaf API, as some commands may not work on other setups.*

## Installation

As mentioned, other systems may not fully support Aloe, but you can install Aloe with composer.

```sh
composer require leafs/aloe
```

## Setup

After installing aloe, you need to set it up so you can run commands like `php leaf ...`. To do this, simply create a file with the name you want to run in your console. eg: To run commands using `php console ...`, you'll need to create a file named `console`. With Leaf API and Leaf MVC, this file is named `leaf` which is the reason you run commmands with `php leaf ...`. I'll name this file `poison` which means I'll run commands like `php poison serve`

In the `poison` file, we need to do a couple of things:

- Bring in composer's autoloader
- Bring in a custom autoloader to dynamically require your migrations, seeds and other files when they're directly initialized in the CLI.
- Bring in our env variables
- Finally, load up aloe and it's commands

The setup used in Leaf MVC looks like this:

```php
#!/usr/bin/env php
<?php
/*
|--------------------------------------------------------------------------
| Register The Auto Loader
|--------------------------------------------------------------------------
|
| Composer provides a convenient, automatically generated class loader
| for our application. We just need to utilize it! We'll require it
| into the script here so that we do not have to worry about the
| loading of any our classes "manually". Feels great to relax.
|
*/
require __DIR__ . '/vendor/autoload.php';

/*
|--------------------------------------------------------------------------
| Register The Leaf Command Auto Loader
|--------------------------------------------------------------------------
|
| Require all the files containing the Leaf Commands
|
*/
require __DIR__ . '/Config/bootstrap.php';

/*
|--------------------------------------------------------------------------
| Bring in (env)
|--------------------------------------------------------------------------
|
| Quickly use our environment variables
|
*/
file_exists(__DIR__ . "/.env") && \Dotenv\Dotenv::create(__DIR__)->load();

/*
|--------------------------------------------------------------------------
| Initialise Leaf CMD
|--------------------------------------------------------------------------
|
| Initialise aloe CLI
|
*/
$console = new \Aloe\Console("Leaf MVC", "v2.3");

/*
|--------------------------------------------------------------------------
| Add commands
|--------------------------------------------------------------------------
|
| Add custom commands
|
*/
$console->register(\App\Console\ExampleCommand::class);

/*
|--------------------------------------------------------------------------
| Run The console Application
|--------------------------------------------------------------------------
|
| Transport water and dissolved substances to the rest of Leaf😂
|
*/
$console->run();
```

Leaf API's config includes a little twist which lets Aloe run in API first mode. Which means aloe will run the API centered version of commands if available.

```php
\Aloe\Command\Config::$env = "API";
```

## Next Steps

- [DB Commands](/aloe-cli/v/1.1.0/commands/db-commands)
- [Custom commands](/aloe-cli/v/1.1.0/commands/custom)
- [Commands IO](/aloe-cli/v/1.1.0/commands/io)
- [Creating Libraries](/aloe-cli/v/1.1.0/libraries)

Built with ❤ by [**Mychi Darko**](//mychi.netlify.app)
