---
title: "Leaf View"
---

<!-- markdownlint-disable no-inline-html -->
# Leaf View

<!-- ::: info Video Docs
Learn how to use views in leaf PHP.

<VideoLesson href="#" title="Views in leaf PHP">Watch the views guide on youtube</VideoLesson>
::: -->

Leaf view is a view manager for your leaf apps. This simply gives you the platform to register, configure and use as many templating engines as you want within your app. This means you can now ship your app with various engines, or rewrite your UIs with a different engine without having to translate or pull down the whole app first.

Leaf view also allows you to run multiple instances of the same engine, with different configurations, values and all that.

## Getting Started

View comes with only one method, `attach`. This method allows your to link UI engines to your leaf app. If attach is called before initializing your leaf app, leaf will automatically attach these engines to the leaf instance.

`attach` takes in 2 parameters:

- The UI engine class to attach (required)
- The key to save the engine as (optional). If it's not provided, it'll use the class' name.

```php
Leaf\View::attach(\Leaf\Veins\Template::class, "veins");
Leaf\View::attach(\Leaf\Blade::class);

$app = new Leaf\App;

// leaf will automatically pick up attached views
// and their keys so you can use them like this:

$app->veins->render("page");
echo $app->blade->render("page");
```

If the views are attached after leaf is initialized, you need to tell leaf to attach them to the instance if you prefer it. This can be done by calling `loadViewEngines`

```php
$app = new Leaf\App;

View::attach(\Leaf\Veins\Template::class, "veins");

$app->loadViewEngines(); // here

// you can use veins now

$app->veins->render("app");
```

If you don't want to set up your engine to the Leaf instance, you can still use it on the View class:

```php
View::attach(\Leaf\Veins\Template::class, "veins");

// $veins becomes available after attaching it
View::veins()->configure([
    'veins_dir' => $app->config("views.path"),
    'cache_dir' => $app->config("views.cachePath"),
]);
```
