<!-- markdownlint-disable no-inline-html -->
# Leaf View

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

<VideoDocs
  subject="Watch the leaf 3 installation walkthrough"
  description="Throughout the leaf documentation, you will see video links like the one just below. If you are a visual learner, this gives you another way to follow along with our documentation. We call these the video docs."
  link="https://www.youtube.com/embed/BTcUgeOZLyM"
/>

<!-- ::: tip Video Docs
Learn how to use views in leaf PHP.

<VideoLesson href="#" title="Views in leaf PHP">Watch the views guide on youtube</VideoLesson>
::: -->

Leaf view is a view manager for your leaf apps. This simply gives you the platform to register, configure and use as many templating engines as you want within your app. This means you can now ship your app with various engines, or rewrite your UIs with a different engine without having to translate or pull down the whole app first.

Leaf view also allows you to run multiple instances of the same engine, with different configurations, values and all that.

## Getting Started

View comes with only one method, `attach`. This method allows you to link UI engines to your leaf app. If attach is called before initializing your leaf app, leaf will automatically attach these engines to the leaf instance.

`attach` takes in 2 parameters:

- The UI engine class to attach (required)
- The key to save the engine as (optional). If it's not provided, it will use the class name.

<div class="class-mode">

```php
Leaf\View::attach(\Leaf\Veins\Template::class, "veins");
Leaf\View::attach(\Leaf\Blade::class);

// when views are attached before leaf is initialized,
// leaf will automatically pick up attached view engines
$app = new Leaf\App;

// You can use attached views like this:
$app->veins->render('page');
echo $app->blade->render('page');
```

</div>
<div class="functional-mode">

```php
Leaf\View::attach(\Leaf\Veins\Template::class, "veins");
Leaf\View::attach(\Leaf\Blade::class);

// when views are attached before you call `app`,
// leaf will automatically pick up attached view engines
// You can use attached views like this:
app()->veins->render('page');
echo app()->blade->render('page');
```

</div>

If the views are attached after leaf is initialized, you need to tell leaf to attach them to the instance if you prefer it. This can be done by calling `loadViewEngines`

<div class="class-mode">

```php
// leaf is initialized before the view is attached
$app = new Leaf\App;

View::attach(\Leaf\Veins\Template::class, "veins");

$app->loadViewEngines(); // here

// you can use veins now

$app->veins->render("app");
```

</div>
<div class="functional-mode">

```php
// `app` is called here, so leaf is initialized before the
// view is attached
app()->get('/', function () {
  // ...
});

View::attach(\Leaf\Veins\Template::class, "veins");

app()->loadViewEngines(); // here

// you can use veins now
app()->veins->render("app");
```

</div>

If you don't want to set up your engine to the Leaf instance, you can still use it on the View class:

<div class="functional-mode">

```php
View::attach(\Leaf\Veins\Template::class, "veins");

// $veins becomes available after attaching it
View::veins()->configure([
    'veins_dir' => app()->config("views.path"),
    'cache_dir' => app()->config("views.cachePath"),
]);
```

</div>
<div class="class-mode">

```php
View::attach(\Leaf\Veins\Template::class, "veins");

// $veins becomes available after attaching it
View::veins()->configure([
    'veins_dir' => $app->config("views.path"),
    'cache_dir' => $app->config("views.cachePath"),
]);
```

</div>
