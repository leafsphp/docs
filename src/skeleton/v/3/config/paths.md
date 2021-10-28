# 📕 Skeleton Path Config

Skeleton v2 comes in with a whole lot of available customizations. One major customization is the paths config. This allows you to change Skeleton's directory structure to something you prefer. This means you can rearrange the whole of Skeleton and have all your files still map correctly: a feature which was only available in skeleton.

```php
<?php

return [
  "controllers_path" => "Controllers",

  "models_path" => "Models",

  "migrations_path" => "Database/Migrations",

  "seeds_path" => "Database/Seeds",

  "factories_path" => "Database/Factories",

  "helpers_path" => "Helpers",

  "views_path" => "Views",

  "config_path" => "Config",

  "storage_path" => "storage",

  "commands_path" => "Console",

  "routes_path" => "routes",

  "lib_path" => "Lib",

  "public_path" => "public",
];
```

These defined paths become available through global shortcut functions like `views_path()`

Built with ❤ by [**Mychi Darko**](//mychi.netlify.app)
