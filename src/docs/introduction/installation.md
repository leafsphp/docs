# Installation

Leaf 3 is built by design to be incrementally adoptable. This means that it can be integrated into a project multiple ways depending on the requirements.

There are four primary ways of adding Leaf PHP to a project:

1. Download leaf through composer
2. Download the leaf repo
3. Use [Leaf skeleton](https://leafphp.netlify.app/#/skeleton/v/2.0/) to quickstart your project
4. Use the [Leaf CLI](https://leafphp.netlify.app/#/cli/) to scaffold a project, which provides a base setup with important modules.

## Release Notes

Latest version 3 release: ![Latest Stable Version](https://poser.pugx.org/leafs/leaf/v/unstable)

Detailed release notes for each version are available on [GitHub](https://github.com/leafsphp/leaf/blob/v3.x-dev/CHANGELOG.md).

## Composer

Composer is the quickest and easiest way to set up leaf 3 from scratch.

```sh
# latest stable
$ composer require leafs/leaf

# version 3
$ composer require leafs/leaf dev-v3.x-dev
```

After insalling Leaf, you need to create your index.php file which will be the entry point to your application.

```php
<?php
require __DIR__ . "/vendor/autoload.php";

app()->get("/", function () {
  response()->json(["message" => "Hello World!"]);
});

app()->run();
```

You might want to check out [URL rewriting](/docs/introduction/url-rewriting.html).

## GitHub

You can also clone the leaf 3 branch.

::: info Setup
You can directly download v3.x-dev here.

<div style="margin-bottom: 30px;">
  <a
  href="https://github.com/leafsphp/leaf/tree/v3.x-dev"
>Download Repo</a>
</div>
:::

After downlaoding repo, you need to create an autoloader.

**Example autoloader: `autoloader.php`**

```php
<?php
spl_autoload_register(function ($class) {
  $file = str_replace('\\', '/', $class);

  if (!file_exists("leaf/src/$file.php")) return;

  require "leaf/src/$file.php";
});
```

The autoloader will allow you use leaf files without having to `require` or `include` them first. So straight up using `Leaf\App` will load `leaf\src\App.php`.

**This is only required if you downloaded the repo.**

Now, all you have to do is create your index.php file, install leaf's dependencies (core modules), and include your autoloader like this:

```php
<?php

require __DIR__ . "leaf/vendor/autoload.php";
require __DIR__ . "autoloader.php";
```

::: warning NOTE THAT
functional mode is not automatically available if you go down this route, you will have to manually add the leaf functions file in your app or in the autoloader.
:::

```php{5}
<?php

require __DIR__ . "leaf/vendor/autoload.php";
require __DIR__ . "autoloader.php";
require __DIR__ . "leaf/src/functions.php";
```

Although the setup for this method is a bit more complicated, it gives you full control over leaf and how it works since you will have access to the source code. You can directly edit leaf to behave the way you want it to. If you don't need this, we recommend that you install leaf with composer above or if you want a base setup, you can follow either of the methods below.

## Leaf skeleton

::: warning NOTE
Skeleton is not yet available for Leaf 3. We will let you know when you can install Leaf 3 with it.
:::

Leaf skeleton is an official leaf boilerplate that packs a default setup with optional MVC configuration and setup.

You can install skeleton through composer.

```sh
composer create-project leafs/skeleton <project-name>
```

## Leaf CLI

Leaf provides an [official CLI](https://github.com/leafsphp/cli) for quickly creating and managing your Leaf applications. It takes just a few seconds to get up and running with your leaf app. See [the Leaf CLI docs](/cli/) for more details.

```sh
leaf create <project-name> --v3
```

You can also install modules using the following syntax:

```sh
leaf install cors
```
