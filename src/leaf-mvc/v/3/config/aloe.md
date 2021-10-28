# 📕 leaf MVC Aloe Config

Aloe config basically allows you to configure Aloe CLI's behaviour. For now aloe only allows you to configure the directory paths. This allows you to select paths for stuff like controllers, models and migrations. This means that aloe will generate and read files only in the specified directories.

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
    ],
];
```

The default config has already been set to match leaf MVC's directories, but if you need to change any of Aloe CLI's paths, this is where you can do that.

## Next Steps

- [Aloe CLI](/aloe-cli/)

Built with ❤ by [**Mychi Darko**](//mychi.netlify.app)
