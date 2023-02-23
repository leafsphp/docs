---
title: "Leaf Veins"
---

<!-- markdownlint-disable no-inline-html -->
# Leaf Veins

Leaf Veins templating engine is the very first templating engine that was shipped in the first version of Leaf PHP. It focuses on keeping things simple and elegant. For those who have used **Smarty** before, this will be really easy to get used to.

Remember, all vein files end with `.vein.php`

::: tip
Leaf veins is still being maintained and will continue to receive updates.
:::

To add veins to your project simply run the command:

```bash
composer require leafs/veins
```

## Sample Vein File

```html
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

<hr>

## Intro

To use veins, you can initialise the `Leaf\Veins` after installing it.

### Leaf\Veins init

```php
$veins = new Leaf\Veins();
```

## Quick Walk-through

This is a simple "tutorial" to get you up and going with Leaf Veins. The whole idea is to be able to pass items into our view(template).

Imagine this object

```php
$user = (object) [
  'name' => 'Michael Darko',
  'email' => 'mychi@leafphp.dev',
  'verified' => true
];
```

In order to use this object in our view(template), we'd have to pass this object through `set()` and then render our view. `set()` is a special method that passes values directly into out template.

<div class="functional-mode">

```php
db()->create('dbname')->execute();
```

</div>
<div class="class-mode">

```php
$db->create('dbname')->execute();
```

</div>

```php
// pass single value to template
$app->veins->set("name", $user->name);

// pass multiple values
$app->veins->set(["name" => $user->name, "email" => $user->email]);
```

Now that our data has been set, we'll need to render this our template which the data is getting passed into. But before that, we'll have to tell Veins where to look for our templates and what directory to keep the template cache in. We can do this with `configure`.

<div class="functional-mode">

```php
db()->create('dbname')->execute();
```

</div>
<div class="class-mode">

```php
$db->create('dbname')->execute();
```

</div>

```php
$app->veins->configure([
  "veins_dir" => "views/",
  "cache_dir" => "views/cache/"
]);
```

There are many more configurations available. This is an array of Veins default configurations, you can configure based on these.

```php
[
  'checksum' => array(),
  'charset' => 'UTF-8',
  'debug' => false,
  'veins_dir' => 'views/',
  'cache_dir' => 'cache/',
  'base_url' => '',
  'php_enabled' => false,
  'auto_escape' => true,
  'sandbox' => true,
  'remove_comments' => false
];
```

Now that we've set the template and cache directories, we can now render our template

<div class="functional-mode">

```php
db()->create('dbname')->execute();
```

</div>
<div class="class-mode">

```php
$db->create('dbname')->execute();
```

</div>

```php
$app->veins->render("homepage"); // homepage.vein.php
```

Now in our homepage.vein.php file, we can access the name variable like this:

```html
{$name}
```

## Variables

```html
{$variable}
{$object.key}
{$object->key}
{$array->key}
```

## Connstants

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

<div class="functional-mode">

```php
db()->create('dbname')->execute();
```

</div>
<div class="class-mode">

```php
$db->create('dbname')->execute();
```

</div>

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
