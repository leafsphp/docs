# BareUI

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoModal from '@theme/components/shared/VideoModal.vue'
</script>

BareUI is a simple, lightweight, and barebones templating engine focused on speed, speed, and more speed! Most templating engines out there ship with a nice syntax, handy ways to use expressions, layouts and code blocks, however, there's one problem: they are slow!

BareUI takes advantage of PHP's innate templating capabilities so it's syntax is PHP's syntax. It lacks all the syntactic sugar added in other engines like blade, but it also requires no compiling, no caching, just speed!

::: details New to template engines?

Learn how using a template engine can improve your view files with "dumb" templates that are easy to read and understand in this video by LaraCasts.

<VideoModal
  title="Templating engines in PHP"
  subject="Templating engines in PHP: what they are and how they can improve your code"
  description=""
  videoUrl="https://www.youtube.com/embed/AmaZDxp7Ejg"
/>

:::

## Setting Up

You can install BareUI through the Leaf CLI:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install bareui
```

```bash:no-line-numbers [Composer]
composer require leafs/bareui
```

:::

Once installed, BareUI will be available in your Leaf app on the `template()` method. This makes it easy to use BareUI from anywhere in your app.

## Configuring BareUI

BareUI doesn't require any real configuration to work, but you need to tell it where to look for your templates. You can do this using the `config()` method. If you are using Leaf MVC, this has already been done for you in the `config/view.php` file, so you can skip this step.

```php:no-line-numbers
app()->template()->config('path', './views');
```

This will tell BareUI to look for templates in the `views` directory in your project. Now that BareUI knows where to look for templates, you can start writing your templates.

## Writing Templates

BareUI templates are regular PHP files, so you can create your templates using PHP without learning any new syntax or special language. These template files have a .view.php extension, making it easy to identify them separately from other files in your project. This approach keeps things simple and familiar for PHP developers.

::: code-group

```html [welcome.view.php]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    Hello World
  </body>
</html>
```

:::

## Rendering Templates

Once you have your template, you can render it using the `render()` method on Leaf's response. This method takes in the name of the template to render and an array of data to pass to the template.

```php:no-line-numbers
response()->render('welcome');
```

When rendering a template, you don't need to include the `.view.php` extension in the template name. BareUI automatically adds it for you when it looks for the template file. So, you only need to pass the name of the template without the extension, and BareUI will handle the rest!

## Passing Data to Templates

Passing data into a template file means sending information from your main code to a template so it can be displayed or used there. Template files are pretty dumb on their own; they don't know anything about the outside world. They just display whatever data you pass to them.

Let's look at a simple template:

::: code-group

```blade [welcome.view.php]
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    Hello <?php echo $name; ?>
</body>
</html>
```

:::

This is an empty HTML page with a PHP tag that echoes a variable. On its own, this template doesn't do much. But when we fill in the `$name` variable, it will display the value of that variable on the page.

To pass data to this `$name` variable, you can pass an array of data as the second argument to the `render()` method. This array should contain the same keys as the variables you want to use in the template.

```php
response()->render('welcome', [
    'name' => 'Something',
]);
```

This will render the template and replace the `$name` variable with the value `'Something'`. You can pass as many variables as you want to the template, and they will all be available in the template file. These values can be anything from strings to arrays, objects, or even functions.

```php [app.php]
response()->render('products', [
    'items' => [
      ['name' => 'Item 1'],
      ['name' => 'Item 2'],
    ],
]);
```

And in your template file:

::: code-group

```blade [app.view.php]
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php if (count($items) > 0) : ?>
        <ul>
            <?php foreach($items as $item) : ?>
                <li><?php echo $item['name']; ?></li>
            <?php endforeach; ?>
        </ul>
    <?php else : ?>
        <p>There are no items</p>
    <?php endif; ?>
</body>
</html>
```

:::

This will render a list of items if there are any items in the array, or display a message if there are no items. You can use this approach to pass any data you want to your templates and display it however you like.

## What about Security?

Lots of templating engines shun PHP's native templating capabilities because they don't encode output by default. This can lead to security vulnerabilities if you're not careful. While BareUI doesn't come with any built-in encoding, Leaf takes care of this for you. Leaf automatically encodes all data in your app to prevent XSS attacks. This means you can safely echo data in your templates without worrying about encoding it yourself.

## Control Structures

BareUI supports all the control structures you'd expect in a templating engine. This includes `if`, `else`, `elseif`, `foreach`, `for`, and `while` loops. You can use these control structures to conditionally display content, loop over arrays, and more.

```blade
<body>
    <?php if (count($items) > 1) : ?>
        <ul>
            <?php foreach($items as $item) : ?>
                <li><?php echo $item; ?></li>
            <?php endforeach; ?>
        </ul>

        <ul>
            <?php for($i = 0; $i < count($items); $i++) : ?>
                <li><?php echo $items[$i]; ?></li>
            <?php endfor; ?>
        </ul>
    <?php else if (count($items) === 1) : ?>
        <p>There is only one item</p>
    <?php else : ?>
        <p>There are no items</p>
    <?php endif; ?>
</body>
```

As you guessed, any valid PHP code can be used in BareUI templates. This means you can use any PHP function, class, or method in your templates. This makes BareUI a powerful templating engine that can handle any task you throw at it.

## Sub-templates/Partials

Sub-templates are templates that are included in other templates. This allows you to break your templates into smaller, more manageable pieces that can be reused across multiple templates. This is a great way to keep your templates DRY and avoid repeating yourself.

To include a sub-template in a template, you can use the `$template->render()` method with the name of the sub-template you want to include.

```blade
<body>
    <?php echo $template->render('partials/header'); ?>

    <h1>Welcome to my site</h1>

    <?php
      echo $template->render('partials/footer', [
          'year' => date('Y'),
      ]);
    ?>
</body>
```

All BareUI templates have access to the `$template` variable, which is an instance of the BareUI engine. Calling the `render()` method on this variable will include the specified sub-template in the current template.
