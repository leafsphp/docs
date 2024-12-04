# Leaf + Blade

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoModal from '@theme/components/shared/VideoModal.vue'
</script>

Blade is a templating engine included with Laravel that helps you create dynamic views easily. Unlike other templating engines, Blade allows you to use regular PHP code inside your templates together with all the goodness it offers you. Behind the scenes, Blade templates are turned into plain PHP and cached, so they run quickly without slowing down your app. Blade files use the `.blade.php` extension to distinguish them from regular PHP files.

Leaf Blade is a port of the [jenssegers/blade](https://github.com/jenssegers/blade) package that allows you to use blade templates in your Leaf PHP projects.

::: details New to Blade?

This video by The Net Ninja will help you get started with blade.

<VideoModal
  title="New to Blade?"
  subject="Laravel Tutorial for Beginners #5 - Blade Basics"
  description="This video by The Net Ninja will help you get started with blade."
  videoUrl="https://www.youtube.com/embed/pQ2vxa4_f2w"
/>

:::

## Setting Up

::: info Blade + Leaf MVC

Blade comes with Leaf MVC out of the box, fully configured and ready to use. However, if you're using Leaf Core, you'll need to set up Blade yourself.

:::

You can install Leaf Blade using the Leaf CLI:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install blade
```

```bash:no-line-numbers [Composer]
composer require leafs/blade
```

:::

After this, you just need to inform Leaf of Blade's existence:

```php:no-line-numbers
app()->attachView(Leaf\Blade::class);
```

This will magically set up Blade for you and pop up a `blade()` function you can use to render your Blade views.

```php
app()->blade()->configure([
  'views' => 'views',
  'cache' => 'storage/cache'
]);
```

Magic! You can now use Blade to create and render your views.

## Creating Blade Views

Blade views are a pretty sweet mixture of HTML, PHP, and clean syntax. You can create a new Blade view by creating a new file with the `.blade.php` extension in your "views" folder. Here's an example of a simple Blade view:

::: code-group

```blade [hello.blade.php]
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Hello, {{ $name }}</h1>
</body>
</html>
```

:::

This should look pretty familiar if you know HTML (of course you do). The only difference is the `{{ $name }}` part. This is Blade's way of creating a variable in your view. When you render this view, Blade will allow you pass in a variable called `$name` and it will be displayed in place of `{{ $name }}`. Let's see how you can render this view.

## Rendering Blade Views

Remember we set up Blade earlier? Now we can use it to render our Blade views. Here's how you can render the `hello.blade.php` view we created earlier:

```php:no-line-numbers
echo app()->blade()->render('hello', ['name' => 'Michael']);
```

This will render the `hello.blade.php` view and pass in a variable called `name` with the value `Michael`. When you open the view in your browser, you should see a big "Hello, Michael" on your screen.

## Extending Blade Views

Blade allows you to define custom directives using the `directive()` method. When the Blade compiler encounters the custom directive, it will call the provided callback with the expression that the directive contains. The callback is free to return the value of its contents however you like:

```php
app()->blade()->directive('datetime', function ($expression) {
    return "<?php echo with({$expression})->format('F d, Y g:i a'); ?>";
});
```

Which allows you to use the following in your blade template:

```blade:no-line-numbers
Current date: @datetime($date)
```

This will output the current date in the format `F d, Y g:i a`. You can define as many custom directives as you want to make your Blade views more powerful.

## Conclusion

This is just the beginning of what you can do with Blade. Blade is a powerful templating engine that allows you to create dynamic views with ease. You can use Blade to create complex views with loops, conditions, and even include other views. As this is just an adapter for the original Blade package, you can check out the [Blade documentation](https://laravel.com/docs/8.x/blade) for more information on what you can do with Blade.
