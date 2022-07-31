# BareUI

<!-- markdownlint-disable no-inline-html -->

Most templating engines out there ship with a nice syntax, handy ways to use expressions, layouts and code blocks, however, there's one problem: speed! Bare UI is here to solve that. Bare UI is a barebones templating engine focused on speed, speed and more speed! It lacks all the syntactic sugar added in other engines like blade, but it also requires no compiling, no caching, just speed!

## Installation

You can always install BareUI with composer:

```sh
composer require leafs/bareui
```

## Introduction

BareUI takes a fully static approach which means you can use all of it's methods without having to initilaize the package first. Also, there are only 2 things you need to keep in mind about Bare UI

::: tip Quick Tip
BareUI has deep integrations with Leaf core by default. This means that if you're using BareUI in leaf, it will always be available on the leaf instance as `template`.

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
app()->template->config("path", "./views");
```

:::

### config

This method allows you to configure bare ui.

```php
Leaf\BareUI::config("path", "./templates");

// or

Leaf\BareUI::config(["path" => "./templates", ...]);
```

#### Available options

There are currently only 2 options to configure.

- path (string): This tells leaf where to look for templates.
- params (array): These are a bunch of base parameters that will be available in all of your templates.

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
// app() will be available in all templates
app()->template->config("params", ["app" => function () {
  // do something
  return app();
}]);
```

`template.view.php`

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
<?php

if (!$something) {
  // you can nest templates
  echo app()->template->render("error");
}
```

### render

As the name implies, this method allows you to return an bare ui. It takes in the UI to render.

::: tip NOTE
BareUI files end with `.view.php`. This allows you easily distinguish them from the rest of your files.
:::

Let's look at a simple template:

`welcome.view.php`

```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php echo $var; ?>
</body>
</html>
```

We can render this from where we want the UI to show:

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
echo $app->template->render("welcome", [
    "var" => "Something",
]);
```

Since bare UI templates are just raw PHP, you can do stuff like this:

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
echo $app->template->render("app", [
    "items" => ["i1", "i2"],
]);
```

`app.view.php`

```php
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
                <li><?php echo $item; ?></li>
            <?php endforeach; ?>
        </ul>
    <?php else : ?>
        <p>There are no items</p>
    <?php endif; ?>
</body>
</html>
```

You can also easily combine Bare UI with Leaf UI, so your templates look something like this:

```php
<?php
use \Leaf\UI\WynterCSS\Template as UI;

echo UI::Scaffold([
    "title" => $appName,
    "body" => [
        "appBar" => UI::AppBar([
            "title" => $appName,
            "links" => [
                "Home" => "/home",
                "About" => "/about",
            ],
        ]),
        "children" => [
            form("POST", "/app/login", [
                h2("Login To $appName"),
                UI::FormGroup([
                    input("text", "loginCode", [
                        "placeholder" => "Enter your login code",
                        "label" => "Login Code"
                    ]),
                ]),
                button("Login", [
                    "type" => "submit"
                ]),
            ]),
        ],
    ],
]);
```
