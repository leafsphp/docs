# Seedling

Seedling is a variation of Leaf MVC built for console applications. It takes the ideas behind Leaf MVC and adapts them to the terminal, so you can build command-line tools with the same structure you already know.

It is built on [Leaf Sprout](/docs/mvc/commands), which allows you to create commands using a simple, familiar structure:

```php
<?php

namespace App\Console;

use Leaf\Sprout\Command;

class GreetCommand extends Command
{
    protected $signature = 'greet
        {name=everyone : The name of the person}
        {--greeting=Hello : The greeting to use}';
    protected $description = 'An example command that greets a person with a specified greeting';
    protected $help = 'This command allows you to greet a person with a custom greeting.';

    protected function handle(): int
    {
        $name = $this->argument('name');
        $greeting = $this->option('greeting');

        $this->info("$greeting, $name!");

        return 0;
    }
}
```

You can run this command from the terminal like so:

```bash:no-line-numbers
leaf greet John --greeting Hi # Hi, John!
```

## Creating a Seedling App

Just like with the rest of Leaf, you can get started with a simple `leaf create` command:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf create <app-name> --console
```

```bash:no-line-numbers [Composer]
composer create-project leafs/seedling <app-name>
```

:::

This will set up a new Seedling application in the specified `<app-name>` directory, complete with the necessary structure and dependencies for building console applications.

## Quick Start

Your generated Seedling application will have a similar structure to a Leaf MVC app, but focused on console commands.

```bash:no-line-numbers
├── app
│   ├── console
│   └── anything-else-you-need
├── bin
└── vendor
```

This file structure gives you just the basics you need to start building your console applications, but you can always add more directories, like `models`, `jobs` or `services`, as your application grows.

## Running Commands

In development, you can run your commands using the Leaf CLI, for example, you can run the `greet` command like so:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf greet John --greeting Hi
```

```bash:no-line-numbers [Seedling CLI]
php leaf greet John --greeting Hi
```

:::

You can also use this same command structure to run seedling specific tasks, such as database migrations, seeding, and more.

This makes it easy to build your application, but if you are distributing it, [check this out](#distribution)

## Writing commands

All commands are stored in the `app/console` directory, and we've provided a simple example command to get you started. Since Seedling is just like Leaf MVC, you can create commands the same way you would in a Leaf MVC application. You can refer to the [writing commands documentation](/docs/mvc/commands) for more details on how to create and manage your console commands.

## Distribution

If your Seedling application is intended to be distributed as a package or tool, you can set it up to be installed via composer, either in an app or globally. To do this, head over to your `bin` directory and create and rename the file in there to whatever you want your command to be called, for example, `mytool`. This way if your command is installed globally, users can run:

```bash:no-line-numbers
mytool greet John --greeting Hi
```

And if it's installed in an app, they can run:

```bash:no-line-numbers
php vendor/bin/mytool greet John --greeting Hi
```

The next thing to do is check the `bin` key in your `composer.json` file and make sure it points to the same name you chose for your file in the `bin` directory. For example:

```json:no-line-numbers
"bin": [
    "bin/mytool"
],
```

And that's it! You can now distribute your Seedling application as a package or tool on Packagist or any other composer repository.

::: warning Phar Distribution

We don't yet have a built-in way to create Phar distributions of Seedling applications. If you need to distribute your application as a Phar, you'll need to set that up manually using tools like [Box](https://github.com/box-project/box) or similar.

:::
