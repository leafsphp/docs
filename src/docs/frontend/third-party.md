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

```php:no-line-numbers
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

Leaf MVC comes with a view manager that makes Leaf aware of any template engine you want to use. This gives you pretty handy functions like the global `view()` function. To make our Smarty engine available in Leaf MVC, we need to let Leaf know about it and also let Leaf MVC know it's supposed to use it when you call the global `response()->render()` function.

The first step is to publish your view config so you can edit it:

```bash:no-line-numbers
php leaf config:publish view
```

This will create a `config/view.php` file in your project. You can then edit this file to include your Smarty engine:

```php
<?php

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
    'viewEngine' => \Smarty::class,

    /*
    |--------------------------------------------------------------------------
    | Custom config method
    |--------------------------------------------------------------------------
    |
    | Configuration for your templating engine.
    |
    */
    'config' => function (\Smarty $engine, array $config) {
        $engine->setTemplateDir($config['views']);
        $engine->setConfigDir('/some/config/dir');
        $engine->setCompileDir('/some/compile/dir');
        $engine->setCacheDir($config['cache']);
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
    'render' => function (\Smarty $engine, $view, $data) {
        foreach ($data as $key => $value) {
            $engine->assign($key, $value);
        }

        $engine->display($view);
    }),

    /*
    |--------------------------------------------------------------------------
    | Extend view engine
    |--------------------------------------------------------------------------
    |
    | Some view engines like blade allow you extend the engine to
    | add extra functions or directives. This is just the place to
    | do all of that. Extend is a function that accepts an instance
    | of your view engine which you can 'extend'
    |
    */
    'extend' => null,
];
```
