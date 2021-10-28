# 🎉 v2.0 - Aloe

Version 2 of Leaf API contains a bunch of new features, some inclusions and even some breaking changes which are geared to easy integration with other libraries, as well as bettering some internal features used by Leaf API and Leaf MVC.

## NEW IN LEAF API

### Better configuration

Leaf API now includes configurations in the `Config` folder which allows you to easily configure Leaf's features: things like views, authentication and aloe's directories. Editing the configuration allows you to customize the behaviour of Leaf's features.

### Global Methods

More global shortcut methods which can be called from anywhere in your app. These methods include things like session management, authentication management and authentication states...

### Aloe CLI

Aloe is a simple but powerful console service that makes building your leaf apps just a simple walk in the park. Aloe CLI ships with the default Leaf console tool in the newer versions of Leaf API. Aloe doesn't just power all commands in your leaf app, but also includes a new, simpler and faster way to write your commands.

What this means for the leaf console tool is that a bunch of changes have gone on through the whole system:

#### Database Install Command

Before, databases would be created manually before linking them to the Leaf application, however now, from the comfort of your console, you can create the database defined in your `.env` file if it doesn't already exist.

```sh
php leaf db:install
```

#### Rollback particular migration

This is a little feature added to allow you rollback particular files instead of rolling back all migrations just to change 1 file. This can be achieved by adding the `-f` flag, then the migration to rollback.

**Note that only the part of the filename after TIMESTAMP_create_ is required.**

```sh
php leaf db:rollback -f users
```

#### Migrate single file

Since you can rollback a single file, it only makes sense to be able to migrate a single file as well. Just like with with rollback, this can be achieved with the `-f` flag followed by the migration.

```sh
php leaf db:migrate -f users
```

#### Generate Console commands

You can also now generate console commands from the console directly. Leaf doesn't just generate the command file for you, but also registers it in the console, so you can use it right away, amazing right?

```sh
php leaf g:command start
```

This will generate `StartCommand` in `App\Console`. It's also registered in the console, so right away, you can do:

```sh
php leaf start
```

What of namespaced commands? Not to worry, Leaf is SMART! Just go ahead and do your stuff, Leaf will take care of the rest.

```sh
php leaf g:command order:items
```

Leaf will create the `OrderItemsCommand`, add the order namespace in the console and register the command for immediete use. It doesn't get any better. You can also use the filename you want instead of the command.

```sh
php leaf g:command ClockCommand
```

#### Delete Console Commands

Since you can create, you can delete as well. Leaf Console allows you to delete custom console commands. The command isn't only deleted, but it's also unregistered.

```sh
php leaf d:command ClockCommand

# or

php leaf d:command Clock
```

#### More detailed console output

Although this is a small one, it's helpful to know exactly what the console tool is working on, as such more readable output messages have been prepared for you.

```bash
$ php leaf db:seed

> UsersSeeder seeded successfully
> TableNameSeeder seeded successfully

Database seed complete
```

<hr>

### FIXES

These group of features are fixes from previous versions. Enjoy!!

#### Model sub directories

Creating models in subdirectories before created a correct file structure, but a messed up class name, eg:

```sh
php leaf g:model Users/Notification
```

This would create the Notification model in the Users subdirectory, however, the file created would look like this:

```php
class Users/Notification extends Model ...
```

This has been fixed, also, if the Users subdirectory doesn't exist, it is automatically created.

#### Working with Seeds

This version also comes with extensive support for database seeds. There are now commands to create and delete seeds, as well as to seed the database with records, courtesy of [Mauro Callegari](https://github.com/MauMaxxa)

Create seeds:

```sh
$ php leaf g:seed Admins

# or

$ php leaf g:seed AdminsSeeder
```

Delete:

```sh
php leaf d:seed ...
```

Seed Db

```sh
php leaf db:seed
```

<hr>

### BREAKING CHANGES

A few changes which might need you to tweak you app a little bit. Don't worry, these aren't sharp, disastrous changes, just tweaking one or two lines of code.

#### Registering console commands

Before, in order to add a new console command, you would just need to head over to the `leaf` file in the root directory of your app and add your command, just like the example command.

```php
/*
|--------------------------------------------------------------------------
| Add custom command
|--------------------------------------------------------------------------
|
| If you have a new command to add to Leaf
|
*/
$console->registerCustom(new \App\Console\ExampleCommand());
```

However, now, Leaf Console supports multiple commands in the form of arrays, so you can now pass an array into `registerCustom`, however, the `new` keyword is no longer needed, instead, the class instance is passed into `registerCustom`.

So the example above will now look like this:

```php
/*
|--------------------------------------------------------------------------
| Add custom command
|--------------------------------------------------------------------------
|
| If you have a new command to add to Leaf
|
*/
$console->registerCustom(\App\Console\ExampleCommand::class);

// multiple commands
$console->registerCustom([
    \App\Console\CommandOne::class,
    \App\Console\CommandTwo::class
]);
```

### 🌱 Working with seeds

Leaf Console tool which initially didn't have a command to run seeds, now has included one through Aloe. This change however has added a little twist to the way seeds are defined in Leaf API. Just as before, seeds are created in the `App\Database\Seeds` directory, but are registered in the `DatabaseSeeder` file. In the `DatabaseSeeder`, previous versions would need you to call `$this->call` to register your own seed files:

```php
public function run()
{
    $this->call(UsersSeeder::class);

    // if there's more than 1 class
    $this->call([
        UsersSeeder::class,
        TableNameSeeder::class
    ]);
}
```

In this version however, in the `run` method, all you need to do is return an array of all the seeds you want to register.

```php
public function run() : array
{
    return [
        UsersSeeder::class,
        TableNameSeeder::class
    ];
}
```

### New helper methods

Leaf API also got a bunch of new helper methods and directory shortcut methods. Refer to the docs for the full list.

### Config arrays

Another important change is that Leaf API config files now return arrays instead of the previous methods. This method is adapted from laravel.

```php
<?php
// config for aloe CLI
return [
    "paths" => [
        "controllers_path" => "/App/Controllers",
        "models_path" => "/App/Models",
        "migrations_path" => "/App/Database/Migrations",
        "seeds_path" => "/App/Database/Seeds",
        "factories_path" => "/App/Database/Factories",
        "helpers_path" => "/App/Helpers",
        "views_path" => "/App/Views",
        "config_path" => "/App/Config",
        "storage_path" => "/App/storage",
        "commands_path" => "/App/Console",
        "routes_path" => "/App/Routes",
        "lib_path" => "/Lib",
    ]
];
```

## CHANGED IN LEAF API v2

### 📁 Directory Structure

#### Routes

Routes were defined in `Routes.php` in previous versions, however, for 'scalability' reasons, routes have been grouped in the `Routes` directory in which other files can be created to group routes in. An example has already been created which you can refer to.

## Next Steps

- [First App](/leaf-api/v/2.0/intro/first-app)
- [Routing](/leaf-api/v/2.0/core/routing)
- [Leaf Console](/leaf-api/v/2.0/utils/console)
- [Controllers](/leaf-api/v/2.0/core/controllers)
