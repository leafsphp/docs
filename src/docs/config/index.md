# Overview
<!-- markdownlint-disable no-inline-html -->

::: tip
Leaf aims for zero configurations out of the box, as such, none of these configurations are required. But for those who want other options with Leaf, this is the place for you.
:::

## Applying Config

There are three ways to apply settings to the Leaf application. First during Leaf application instantiation, second with the leaf config class and finally, after instantiation. All settings can be applied at instantiation time by passing Leaf’s constructor an associative array. All settings can be retrieved and modified after instantiation, however some of them can not be done simply by using the config application instance method but will be demonstrated as necessary below. Before I list the available settings, I want to quickly explain how you may define and inspect settings with your Leaf application.

<!-- ::: tip Video Docs
Everything you need to know about configuring your leaf apps.

<VideoLesson href="https://www.youtube.com/embed/BTcUgeOZLyM" title="Introduction to leaf PHP">Watch the config guide on youtube</VideoLesson>
::: -->

### During Instantiation

To define settings upon instantiation, pass an associative array into the Leaf constructor.

```php
$app = new Leaf\App([
    'debug' => true
]);
```

### Leaf Config

Leaf config allows you to quickly configure your leaf application from anywhere in your app.

```php
Leaf\Config::set([
    "views.path" => "views",
    "views.cachePath" => "views/cache"
]);
```

The best part of this is that you don't need to pass these configurations to any file or methods. Leaf automatically picks up all the configurations made in this file whether the configuration is done before of after initializing leaf.

You can also get configuration values using `get`

```php
$appConfig = Leaf\Config::get("views.path");
```

You can also get all the settings your app is using by leaving the parameter on Leaf Config empty

```php
$appConfig = Leaf\Config::get();
```

### After Instantiation

To define settings after instantiation, the majority can use the config application instance method; the first argument is the setting name and the second argument is the setting value.

```php
$app = new Leaf\App;
$app->config('debug', false);
```

You may also define multiple settings at once using an associative array:

```php
$app->config([
    'debug' => true,
    'views.path' => '../views'
]);
```

To retrieve the value of a setting, you also use the config application instance method; however, you only pass one argument - the name of the setting you wish to inspect. If the setting you request does not exist, null is returned.

```php
$settingValue = $app->config('views.path'); // returns "../views"
```

## Nested Config

From v3 of leaf, config works a little bit differently under the hood. Leaf now allows you to set and get config under groups in an array form. Before, all config was saved in one flat array, and you namespacing commands eg: `app.down` would add a new entry in the flat array just as defined.

Leaf Config in v3 now creates a sub array which allows you to group all the config related to an item in an array.

::: tip Note
This in no way affects the way Leaf config works, it simply creates new possibilities for use, especially externally with modules and functional mode.
:::

Instead of your config looking like this:

```php
['app.down' => false, ..., 'log.enabled' => false, 'log.file' => '1.txt', ...]
```
You'll have this:

```php
['app' => ['down' => false, ...], 'log' => ['enabled' => false, ...], ...]
```

This means that you can simply grab a single group if you want to:

```php
$appConfig = app()->config('app');
$loggerConfig = app()->config('log');
```

You can also create your own group and config:

```php
app()->config(['home.key' => '2']);

$homeConfig = app()->config('home');
$homeKey = $homeConfig['key'];

// or

$homeKey = app()->config('home.key');
```
