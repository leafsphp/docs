# BareUI
<!-- markdownlint-disable no-inline-html -->

Most templating engines out there ship with a nice syntax, handy ways to use expressions, layouts and code blocks, however, there's one problem: speed! Bare UI is here to solve that. Bare UI is a barebones templating engine focused on speed, speed and more speed! It lacks all the syntatic sugar added in other engines like blade, but it also requires no compiling, no caching, just speed!

**Bare UI will be taking over from blade as leaf's default engine in the next release.** Not to worry, you can always manually install `leafs/blade` or any templating engine of your choice whenever you feel you need something else. The reason behind this decision is that most people who use leaf directly either don't use blade or install something simpler and faster. Also, this switch won't affect Leaf MVC and Leaf API in any way.

## Getting Started

BareUI takes a fully static approach which means you can use all of it's methods without having to initilaize the package first. Also, there are only 2 things you need to keep in mind about Bare UI

### config

This method allows you to configure bare ui.

```php
Leaf\BareUI::config("path", "templates");

// or

Leaf\BareUI::config(["path" => "templates", ...]);
```

### render

As the name implies, this method allows you to return an bare ui. It takes in the UI to render.

**Note that bare ui files end with `.view.php`.** This allows you easily distinguish them from the rest of your files.

Let's look at a simple template:

welcome.view.php

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

```php
echo $app->template->render("welcome", [
    "var" => "Something",
]);
```

Since bare UI templates are just raw PHP, you can do stuff like this:

```php
echo $app->template->render("app", [
    "items" => ["i1", "i2"],
]);
```

app.view.php

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
            UI::form("POST", "/app/login", [
                UI::h2("Login To $appName"),
                UI::FormGroup([
                    UI::input("text", "loginCode", [
                        "placeholder" => "Enter your login code",
                        "label" => "Login Code"
                    ]),
                ]),
                UI::button("Login", [
                    "type" => "submit"
                ]),
            ]),
        ],
    ],
]);
```
