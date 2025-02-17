# MVC Globals

Leaf MVC comes with a couple of global functions that you can use to access your app's configuration, paths and more. These functions are available globally and can be used anywhere in your app.

## Loading app paths

Since Leaf MVC comes with a robust structure out of the box, it also comes with quick ways to reference files in these structures. For example, if you want to reference a file in your `public` folder, you can use the `PublicPath()` helper.

### AppPaths()

This returns an array of all the paths in your application.

```php
$paths = AppPaths();

$controllersPath = AppPaths('controllers'); // you can do this
$controllersPath = $paths['controllers']; // or this
```

<!-- If the path you are looking for doesn't have a helper function, you can use the `AppPaths()` helper to get the path. Just make sure that the path is defined in your `config/paths.php` file. If your Leaf MVC app does not come with a `config/paths.php` file, you can create one. This is the default structure of the `config/paths.php` file:

```php{15}
<?php

/*
|--------------------------------------------------------------------------
| Paths Config
|--------------------------------------------------------------------------
|
| Leaf allows you to completely modify the directory structure of your
| MVC application. This file just tells Leaf and other components
| where to find the important files in your app.
|
*/

return [
    'myCustomPath' => 'app/myCustomPath',
    'commands' => 'app/console',
    'config' => 'config',
    'channels' => 'app/channels',
    'components' => 'app/components',
    'controllers' => 'app/controllers',
    'databaseStorage' => 'storage/app/db',
    'events' => 'app/events',
    'factories' => 'app/database/factories',
    'helpers' => 'app/helpers',
    'jobs' => 'app/jobs',
    'lib' => 'lib',
    'mail' => 'app/mail',
    'middleware' => 'app/middleware',
    'migrations' => 'app/database/migrations',
    'models' => 'app/models',
    'routes' => 'app/routes',
    'schema' => 'app/database/schema',
    'scripts' => 'app/scripts',
    'seeds' => 'app/database/seeds',
    'services' => 'app/services',
    'storage' => 'storage',
    'utils' => 'app/utils',
    'views' => 'app/views',
    'workers' => 'app/workers',
];
```

After defining your paths in your `config/paths.php` file, you can use the `AppPaths()` helper to get the path.

```php:no-line-numbers
AppPaths('myCustomPath');
```

Keep in mind that not every path in your `config/paths.php` file has a helper function. If you want to get the path to a path that doesn't have a helper function, you can use the `AppPaths()` helper. -->

### assets()

This returns the path to your assets folder. You can pass in a file name to get the path to that file.

```php
$asset = assets('css/main.css');
// -> public/assets/css/main.css
```

You can configure the path to your assets folder in your `config/paths.php` file.

```php:no-line-numbers
'assets' => 'public/assets'
```

### ConfigPath()

This returns the path to your config folder. You can pass in a file name to get the path to that file.

```php
$dbConfigFile = ConfigPath('db.php');
// -> config/db.php
```

### CommandsPath()

This returns the path to your commands folder. You can pass in a file name to get the path to that file.

```php
$command = CommandsPath('MainCommand.php');
// -> app/console/MainCommand.php
```

### ControllersPath()

This returns the path to your controllers folder. You can pass in a file name to get the path to that file.

```php
$controller = ControllersPath('MainController.php');
// -> app/controllers/MainController.php
```

### DatabasePath()

This returns the path to your database folder. You can pass in a file name to get the path to that file.

```php
$database = DatabasePath('migrations');
// -> app/database/migrations
```

### FactoriesPath()

This returns the path to your factories folder. You can pass in a file name to get the path to that file.

```php
$factory = FactoriesPath('UserFactory.php');
// -> app/database/factories/UserFactory.php
```

### HelpersPath()

This returns the path to your helpers folder. You can pass in a file name to get the path to that file.

```php
$helper = HelpersPath('MainHelper.php');
// -> app/helpers/MainHelper.php
```

### LibPath()

This returns the path to your lib folder. You can pass in a file name to get the path to that file.

```php
$lib = LibPath('MainLib.php');
// -> lib/MainLib.php
```

### MigrationsPath()

This returns the path to your migrations folder. You can pass in a file name to get the path to that file.

```php
$migration = MigrationsPath('MainMigration.php');
// -> app/database/migrations/MainMigration.php
```

### ModelsPath()

This returns the path to your models folder. You can pass in a file name to get the path to that file.

```php
$model = ModelsPath('User.php');
// -> app/models/User.php
```

### PublicPath()

This returns the path to your public folder. You can pass in a file name to get the path to that file.

```php
$public = PublicPath('index.php');
// -> public/index.php
```

### RoutesPath()

This returns the path to your routes folder. You can pass in a file name to get the path to that file.

```php
$routes = RoutesPath('_auth.php');
// -> app/routes/_auth.php
```

### SeedsPath()

This returns the path to your seeds folder. You can pass in a file name to get the path to that file.

```php
$seed = SeedsPath('MainSeed.php');
// -> app/database/seeds/MainSeed.php
```

### StoragePath()

This returns the path to your storage folder. You can pass in a file name to get the path to that file.

```php
$storage = StoragePath('MainStorage.php');
// -> storage/MainStorage.php
```

### ViewsPath()

This returns the path to your views folder. You can pass in a file name to get the path to that file.

```php
$view = ViewsPath('index.leaf.php');
// -> app/views/index.leaf.php
```

## Loading app config

There are some situations that may require you to load up your config files. For such situations, we've prepared a couple of helpers to help you load up your config files.

### MvcConfig()

This returns an array of all the config files in your application.

```php
$configs = MvcConfig();

$dbConfig = MvcConfig('db'); // you can do this
$dbConfig = $configs['db']; // or this
```

It also allows you to load up a specific config from the config file you pass in.

```php
$config = MvcConfig('db', 'host'); // you can do this
$config = $configs['db']['host']; // or this
```

### AppConfig()

This returns an array of all the config in your `config/app.php` file.

```php
$configs = AppConfig();

$debug = AppConfig('debug'); // you can do this
$debug = $configs['debug']; // or this
```

### AuthConfig()

This returns an array of all the config in your `config/auth.php` file.

```php
$configs = AuthConfig();

$auth = AuthConfig('auth'); // you can do this
$auth = $configs['auth']; // or this
```

### CorsConfig()

This returns an array of all the config in your `config/cors.php` file.

```php
$configs = CorsConfig();

$origin = CorsConfig('origin'); // you can do this
$origin = $configs['origin']; // or this
```

### DatabaseConfig()

This returns an array of all the config in your `config/db.php` file.

```php
$configs = DatabaseConfig();

$host = DatabaseConfig('host'); // you can do this
$host = $configs['host']; // or this
```

### MailConfig()

This returns an array of all the config in your `config/mail.php` file.

```php
$configs = MailConfig();

$host = MailConfig('host'); // you can do this
$host = $configs['host']; // or this
```

### ViewConfig()

This returns an array of all the config in your `config/view.php` file.

```php
$configs = ViewConfig();

$host = ViewConfig('viewEngine'); // you can do this
$host = $configs['viewEngine']; // or this
```
