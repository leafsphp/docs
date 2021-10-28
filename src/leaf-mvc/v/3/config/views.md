# 📕 leaf MVC View Config

leaf MVC v2 also ports in Leaf MVC's view config which allows you to customize how Leaf manages templates.

```php
<?php

return [
    /*
    |--------------------------------------------------------------------------
    | View Storage Paths
    |--------------------------------------------------------------------------
    |
    | Most templating systems load templates from disk. Here you may specify
    | an array of paths that should be checked for your views. Of course
    | the usual LeafMVC view path has already been registered for you.
    |
    */
    "views_path" => views_path(),

    /*
    |--------------------------------------------------------------------------
    | Compiled View Path
    |--------------------------------------------------------------------------
    |
    | This option determines where all the compiled Blade templates will be
    | stored for your application. Typically, this is within the storage
    | directory. However, as usual, you are free to change this value.
    |
    */
    "cache_path" => storage_path('framework/views'),
];
```

## Next Steps

- [Leaf Blade](/leaf/v/2.4.3/views/blade)
- [Leaf Forms](/leaf/v/2.4.3/views/forms)

Built with ❤ by [**Mychi Darko**](//mychi.netlify.app)
