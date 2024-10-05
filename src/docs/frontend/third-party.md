# Using third-party Engines

Leaf provides first-class support for [BareUI](/docs/frontend/bareui) and [Blade](/docs/frontend/blade). However, you can use any template engine you want with the framework. In this section, we will show you how to use the [Smarty](https://www.smarty.net/) template engine with Leaf.

## Install your engine

To install Smarty, run the following command in your terminal:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install smarty/smarty
```

```bash:no-line-numbers [Composer]
composer require smarty/smarty
```

:::

Once installed, you need to tell Leaf about your engine. Leaf will try to cache your engine for future use. You can do this using the `attachView()` method on the app instance:

```php
app()->attachView(Smarty::class);
```

This will attach your engine to Leaf and make it available in your app directly from the app instance. Here's how you can use it with our Smarty example:

```php
app()->smarty()->setTemplateDir('/some/template/dir');
app()->smarty()->setConfigDir('/some/config/dir');
app()->smarty()->setCompileDir('/some/compile/dir');
app()->smarty()->setCacheDir('/some/cache/dir');
```

This will configure your engine, basically telling it where to look for templates, configs, compiled files, and cache files. You can now use your engine to render your views:

```php
app()->smarty()->assign('name', 'Michael');
app()->smarty()->display('index.tpl');
```

That's it! Pretty simple, right? You can follow this same pattern to use any other template engine with Leaf.

## Using with Leaf MVC

Unlike Leaf Core, Leaf MVC comes with a view manager that makes Leaf aware of any template engine you want to use. This gives you pretty handy functions like the global `view()` function. To make our Smarty engine available in Leaf MVC, we need to let Leaf know about it and also let Leaf MVC know it's supposed to use it when you call the global `view()` function.

The first step is to head over to your `public/index.php` file and attach Smarty to Leaf:

```php
app()->attachView(Smarty::class);
```

This will immediately make Smarty available in Leaf, but there's one more thing we need to do. We need to let Leaf MVC know that Smarty is the engine we want to use. We can do this by setting the `engine` key in the `config/view.php` file:

```php
<?php

use Leaf\View;

return [
    /*
    |--------------------------------------------------------------------------
    | Template Engine [EXPERIMENTAL]
    |--------------------------------------------------------------------------
    |
    | Leaf MVC unlike other frameworks tries to give you as much control as
    | you need. As such, you can decide which view engine to use.
    |
    */
    'viewEngine' => Smarty::class,

    /*
    |--------------------------------------------------------------------------
    | Custom config method
    |--------------------------------------------------------------------------
    |
    | Configuration for your templating engine.
    |
    */
    'config' => function ($config) {
        app()->smarty()->setTemplateDir($config['views']);
        app()->smarty()->setConfigDir('/some/config/dir');
        app()->smarty()->setCompileDir('/some/compile/dir');
        app()->smarty()->setCacheDir($config['cache']);
    },

    /*
    |--------------------------------------------------------------------------
    | Custom render method
    |--------------------------------------------------------------------------
    |
    | This render method is triggered whenever render() is called
    | in your app if you're using a custom view engine.
    |
    */
    'render' => function ($view, $data) {
        foreach ($data as $key => $value) {
            app()->smarty()->assign($key, $value);
        }

        app()->smarty()->display($view);
    }),
];
```
