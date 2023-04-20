# Leaf Veins

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

Veins is a view engine shipped with Leaf v1. It has a perfect balance of simplicity and power as well as speed and flexibility. For those who have used **Smarty** before, this will be really easy to get used to.

<details>
<summary>New to template engines?</summary>

Watch this video by Dave Hollingworth as an introduction to template engines.

<VideoDocs
  title="Templating engines in PHP"
  subject="Templating engines in PHP: what they are and how they can improve your code"
  description="Learn how using a template engine can improve your view files with simpler syntax, autoescaping of variables and template inheritance."
  link="https://www.youtube.com/embed/OK_JCtrrv-c"
/>
</details>

To add veins to your project simply run the command:

```bash
leaf install veins
```

Or with composer:

```bash
composer require leafs/veins
```

## Sample Vein File

```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>{$title}</title>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
</head>
<body>
  <h2>{$title}</h2>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
</body>
</html>
```

## Usage with Leaf

To use veins in a Leaf app, you need to attach veins to the Leaf view handler. This is done by adding the following code to your `app.php` file.

```php
Leaf\View::attach(Leaf\Veins::class);
```

From there, you can use the `view` property on the `app` object to render your veins files.

```php
app()->view->render("home");
```

## Usage without Leaf

To use veins outside of a Leaf app, you need to initialize the `Leaf\Veins` class after installing it.

```php
$veins = new Leaf\Veins();
```

You can then call any of the methods on the `Leaf\Veins` class to render your veins files.

```php
$veins->render("home");
```

## Quick Walk-through

This is a simple "tutorial" to get you up and going with Leaf Veins. The whole idea is to be able to pass items into our view(template).

To begin with, we'll need to tell Veins where to look for our templates and what directory to keep the template cache in. We can do this with `configure`.

```php
$app->veins->configure([
  "templateDir" => "views/",
  "cacheDir" => "views/cache/"
]);
```

Once we've done that, we can now set our data. Let's say we have a user object like this:

```php
$user = (object) [
  'name' => 'Michael Darko',
  'email' => 'mychi@leafphp.dev',
  'verified' => true
];
```

In order to use this object in our view(template), we'd have to pass this object into our view. We can do that by passing it as the second parameter to the `render` method.

```php
$app->veins->render("homepage", ['user' => $user]);
```

Now in our `homepage.vein.php` file, we can access the name variable like this:

```html
{$user->name}
```

## Variables

```html
{$variable}
{$object->key}
{$array.key}
{$array['key']}
```

## Constants

```html
{#constant#}
```

## Function

```html
{function="function"}
```

## Include

```html
{include="templateName"}
```

## No parse

Commenting in Vein

```html
{noparse}
  code
{/noparse}
```

## Loops

```html
{loop="$items" as $item}
  <div style="margin-bottom: 50px;">
    <h3><a href="/items/{$item->id}">{$item->title}</a></h3>
    <p>{$item->body}</p>
  </div>
{/loop}
```

Or

```html
{loop="$items"}
  <div style="margin-bottom: 50px;">
    <h3><a href="/items/{$value->id}">{$value->title}</a></h3>
    <p>{$value->body}</p>
  </div>
{/loop}
```

## If

```html
{if="count($posts) > 0"}
  All Posts
{/if}
```

## If else

```html
{if="count($posts) > 0"}
  All Posts
{else}
  There are no posts
{/if}
```

## AutoEscape

This has a lot of uses...but the most common use case is for rendering HTML

```php
$app->veins->set([
  "post" => [
    "body" => "<h2>This is the body</h2>"
  ]
]);
```

```html
{autoescape="off"}
  {$post.body}
{/autoescape}
```
