# Leaf API Paths <sup class="new-tag-1">New</sup>

Paths define where Leaf API should look for items throughout the file system. Also these paths are available as methods you can call.

## Available Paths

As mentioned, paths can be returned by calling their global methods. All methods have space to take in a string to add to the path. Simply put, you can pass files and folders into the first parameter of all path methods to add them to the full path.

### commands_path

Returns the commands path

```php
commands_path("ExampleCommand.php");
```

### config_path

Returns the config path

```php
config_path("Console.php");
```

### controllers_path

Returns the controllers path

```php
controllers_path("UsersController.php");
```

### factories_path

Returns the factories path

```php
factories_path("UsersHelper.php");
```

### helpers_path

Returns the helpers path

```php
helpers_path("UsersHelper.php");
```

### lib_path

Returns the lib path

```php
lib_path("ExtLib.php");
```

### migrations_path

Returns the migrations path. You can also add a second parameter to hide or show a slash infront of the complete path.

```php
migrations_path("migration");
// => App/Database/Migrations/migration

migrations_path("migration", false);
// => App/Database/Migrations/migration

migrations_path("migration", true);
// => /App/Database/Migrations/migration
```

### models_path

Returns the models path

```php
models_path("ExtLib.php");
```

### public_path

Returns the public path

```php
public_path("file");
```

### routes_path

Returns the routes path

```php
routes_path("_users.php");
```

### seeds_path

Returns the seeds path

```php
seeds_path("UsersSeeder.php");
```

### storage_path

Returns the storage path

```php
storage_path("app/public/image.jpg");
```

### views_path

Views path determines where to look for stuff pertaining to views.

```php
$cssPath = views_path("assets/css/app.css");

...

<link href="<?php echo $cssPath; ?>" rel="stylesheet">
```

You can also pass a second parameter into `views_path` to hide/show a `/` in front of the complete path.

```php
views_path("assets/css/app.css");
// => App/Views/assets/css/app.css

views_path("assets/css/app.css", false);
// => App/Views/assets/css/app.css

views_path("assets/css/app.css", true);
// => /App/Views/assets/css/app.css
```

## Next Steps

- [Routing](/leaf-api/v/2.0/core/routing)
- [Controllers](/leaf-api/v/2.0/core/controllers)
- [Models](/leaf-api/v/2.0/core/models)
- [Migrations](/leaf-api/v/2.0/database/migrations)

Built with ❤ by [**Mychi Darko**](//mychi.netlify.app)
