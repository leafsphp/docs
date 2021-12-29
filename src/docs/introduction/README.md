# Introduction

::: warning ⚡️ RC Release
Leaf 3 is currently in its "Release Candidate" phase, as such the API will not change, and it can be considered near production ready.

If you however want to use the more stable version 2, you can find the docs at [archive.leafphp.dev](https://archive.leafphp.dev)
:::

## What is Leaf PHP?

Leaf is a slim and lightweight PHP framework for quickly bootstrapping clean, simple but powerful web apps and APIs quickly and easily. Over the years, we've been focusing on delivering much simpler and performant code which can be used in all your PHP apps.

Version 3 of Leaf brings more to the table with a theme centering on developer experience and usability, but with all the goodies while ensuring users have the best experience as well.

[→ Checkout leaf 3's features](/docs/introduction/features)

## Getting Started

The official guide assumes **basic** level knowledge of PHP.

::: warning 😵‍💫 Don't know PHP?
If you are not familiar with PHP, we recommend that you check out the [W3Schools PHP Tutorial](https://www.w3schools.com/php/default.asp) before continuing. This is because you will basically be writing PHP code when using leaf (or any other framework).
:::

<!-- ::: info Video Docs
Throughout the leaf documentation, you will see video links like the one just below. This gives you another means to follow along our documentation if you are more of a visual learner. We call this the video docs.

<VideoLesson href="https://www.youtube.com/embed/BTcUgeOZLyM" title="Introduction to leaf PHP">Watch the leaf 3 intro video on youtube</VideoLesson>
::: -->

### Installation

To quickly get started with leaf, check out our [installation guide](/docs/introduction/installation.html). This gives you an in-depth explanation on how to setup leaf using various methods.

::: tip Migrating
Already know Leaf 2 and just want to learn about what's new in Leaf 3? Check out the [Migration Guide](/docs/migration/introduction.html)!
:::

Below is a hello world example which takes you through the core of Leaf. Other parts of the docs cover deeper examples. You can also refer to our [codelab experiments](/codelabs/) for real world examples and use-cases.

## Hello world example

At the core of Leaf PHP is a system that enables us to declaratively define applications using a friendly and straightfoward syntax:

**index.php:**

```php
<?php

require __DIR__ . "/vendor/autoload.php";

$app = new Leaf\App;

$app->get("/", function () {
  echo "Hello world";
});

$app->run();
```

We have already created our very first Leaf app! This is as simple as it gets.

In addition, we can output data with `Leaf\Http\Response`. This is a module which allows us to output data of various types without any hussle.

```php
<?php

require __DIR__ . "/vendor/autoload.php";

use Leaf\Http\Response;

$app = new Leaf\App;

$app->get("/", function () {
  Response::markup("Hello world");
});

$app->run();
```

Now you might be wondering why we need ro go through all of this just to return some html when we can just use echo. The reason for this is simple. `Response` takes care of a whole lof issues for us under the hood and renders exactly what we expect. Let's look at an example below.

```php
<?php

require __DIR__ . "/vendor/autoload.php";

$app = new Leaf\App;

$app->get("/", function () {
  // set content-type to json
  Leaf\Http\Headers::contentJSON();

  echo "<b>Hello world</b>";
});

$app->run();
```

When we run this, we get:

```json
"<b>Hello world</b>"
```

instead of

```html
Hello World
```

Unlike the confusion above between the content type and echo, leaf response makes sure that whatever content we're trying to render reflects in the content type. This is just one of the many things that response takes care of automatically.

## "Functional Mode"

We have mostly talked about general features which are the same even in Leaf 2, now let's talk about some spice in Leaf 3.

::: tip
This is just an introduction to functional mode, read the [functional mode documentation](/docs/tooling/functions.html) for the full explanation.
:::

Basically, leaf 3 comes with global helper functions which take away the only pain anyone has ever had in using leaf, i.e. long namespaces and class initializers. Let's rewrite the first example in functional mode.

```php
<?php

require __DIR__ . "/vendor/autoload.php";

app()->get("/", function () {
  response()->markup("Hello world");
});

app()->run();
```

You notice that we've gotten rid of the lengthy `use Leaf\Http\Response;` and even the leaf initializer. Leaf 3 helps you focus on only what matters: your application. Everything is either done for you under the hood or the provided to you in simple to use tools.

::: info Note that
From this point onwards, we will be using the functional mode syntax.
:::

### Handling User Input

One very important part of building web apps/APIs is user input. Users may pass data into your leaf app through forms, http request bodies, urls, ...

You must read this data and make sure it can't harm your system before performing any operations on it. This can be very clumsy when done raw with PHP, especially when the data comes in through multiple channels. Leaf has however prepared a simple handler for this: `Leaf\Http\Request`. Since we are using functional mode, we will use the `request` method instead of this lengthy class.

user goes to /?greeting=hello%20world

```php
<?php

require __DIR__ . "/vendor/autoload.php";

app()->get("/", function () {
  // we can get the GET request data from the URL like this
  $greeting = request()->get("greeting"); // hello world

  // output json encoded data
  response()->json([
    "greeting" => $greeting
  ]);
});

app()->run();
```

The most beautiful thing about the request object is that all data passed into your app is automatically sanitized to prevent attacks like XSS. You have simple and safe code working for you.

### Installing modules

Modules are pieces of functionality that have been packaged and shipped separately from Leaf core. Modules are used to extend Leaf's reach to perform some operations not available on the core. Modules were introduced with Leaf 3, but some of them can be used with earlier versions of Leaf. Modules can also be used in external libraries and frameworks as well. To install a module, simply run it's install script with composer or use th leaf cli.

To demonstrate this, we will expand the app above to output a template instead of the json data from earlier. For this, we will need a template module. Leaf has 3 template modules

- BareUI: Super lightweight, blazing fast templating engine with zero compilation
- Blade: A port of the laravel blade templating engine
- Leaf Veins: Lightweight but powerful templating

For this demo, we will use bareUI. We can install bareUI with composer.

```sh
composer require leafs/bareui
```

Or with leaf cli:

```sh
leaf install bareui
```

After this, leaf **automatically** links the bareUI class for you and makes it available on the leaf object as `template`. So from there, we can do create our template. I'll name this `index.view.php` (bare ui templates end in `.view.php`)

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
  <h2><?php echo $greeting; ?></h2>
</body>
</html>
```

The next thing to do is to tell bareUI where to look for templates and finally render `index.view.php`.

```php
<?php

require __DIR__ . "/vendor/autoload.php";

// point to the templates directory
app()->template->config("path", "./");

app()->get("/", function () {
  // we can get the GET request data from the URL like this
  $greeting = request()->get("greeting"); // hello world

  // render our template
  echo app()->template->render("index", [
    "greeting" => $greeting,
  ]);
});

app()->run();
```

Just as you saw above, most Leaf modules require absolutely no configuration in order to work with leaf core. They just fit right in.

## Ready for More?

We've briefly introduced the most basic features of Leaf 3 - the rest of this guide will cover them and other advanced features with much finer details, so make sure to read through it!

## Next Steps

If you skipped the [Introduction](/guide/introduction), we strongly recommend reading it before moving on to the rest of the documentation.

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/docs/introduction/installation">
    <h3 class="next-steps-link">Continue the Guide</h3>
    <small class="next-steps-caption">The guide walks you through every aspect of the framework in full details.</small>
  </a>
  <a class="vt-box" href="/docs/introduction/first-app">
    <h3 class="next-steps-link">Follow the Tutorial</h3>
    <small class="next-steps-caption">For those who prefer learning things hands-on. Let's build something real!</small>
  </a>
  <a class="vt-box" href="https://codelabs.leafphp.dev" target="_blank">
    <h3 class="next-steps-link">Check out CodeLabs</h3>
    <small class="next-steps-caption">Codelabs provides interactive tutorials with in-depth explanations.</small>
  </a>
</div>
