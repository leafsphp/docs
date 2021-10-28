# 📕 leaf MVC Path Config

leaf MVC v2 comes in with a whole lot of available customizations. One major customization is the paths config. This allows you to change leaf MVC's directory structure to something you prefer. This means you can rearrange the whole of leaf MVC and have all your files still map correctly: a feature which was only available in skeleton.

```php
<?php

return [
  "controllers_path" => "App/Controllers",

  "models_path" => "App/Models",

  "migrations_path" => "App/Database/Migrations",

  "seeds_path" => "App/Database/Seeds",

  "factories_path" => "App/Database/Factories",

  "helpers_path" => "App/Helpers",

  "views_path" => "App/Views",

  "config_path" => "App/Config",

  "storage_path" => "App/storage",

  "commands_path" => "App/Console",

  "routes_path" => "App/Routes",

  "lib_path" => "Lib",

  "public_path" => "public",
];
```

These defined paths become available through global shortcut functions like `views_path()`

## Next Steps

- [Path Utils](/leaf-mvc/v/2.0/utils/paths)
- [Leaf Blade](/leaf/v/2.4.3/views/blade)
- [Leaf Forms](/leaf/v/2.4.3/views/forms)

Built with ❤ by [**Mychi Darko**](//mychi.netlify.app)
