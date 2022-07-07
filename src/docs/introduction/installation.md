# Installation

::: tip Leaf 3 release 🎊
The official leaf 3 release candidate has been released.
:::

Leaf 3 is built by design to be incrementally adoptable. This means that it can be integrated into a project multiple ways depending on the requirements.

There are four primary ways of adding Leaf PHP to a project:

1. Use the [Leaf CLI](https://cli.leafphp.dev/) to scaffold a project [RECOMMENDED].
2. Download leaf through composer
3. Use [Leaf skeleton](https://leafphp.netlify.app/#/skeleton/v/2.0/) to quickstart your project
4. Download the leaf repo

::: tip Migrating
If you want to migrate an existing Leaf 2 project, skip this and follow the [Migration Guide](/docs/migration/introduction.html)
:::

## Release Notes

Latest version 3 release: ![Latest Stable Version](https://poser.pugx.org/leafs/leaf/v/stable)

Detailed release notes this version available on [GitHub](https://github.com/leafsphp/leaf/releases/tag/v3.0).

## Leaf CLI

::: info Video Docs
You can take a look at our leaf cli setup walkthrough on youtube.

<VideoLesson href="https://www.youtube.com/watch?v=yb3LUYHtopQ" title="Install leaf PHP">Watch the leaf 3 installation walkthrough</VideoLesson>
:::

Leaf provides an [official CLI](https://github.com/leafsphp/cli) for quickly creating and managing your Leaf applications. It takes just a few seconds to get up and running with your leaf app. See [the Leaf CLI docs](https://cli.leafphp.dev) for more details.

```sh
leaf create <project-name> --v3
```

You can also install modules using the following syntax:

```sh
leaf install cors
```

You can then run your app using:

```sh
leaf serve
```

## Composer

<!-- ::: info Video Docs
Learn how to set up a leaf app with composer.

<VideoLesson href="https://www.youtube.com/watch?v=t-pNURSTOKw" title="Install leaf PHP">Watch the composer setup on youtube</VideoLesson>
::: -->

You can also set up a new leaf 3 project from scratch using composer:

```sh
# latest stable (v3)
$ composer require leafs/leaf

# version 3 dev
$ composer require leafs/leaf dev-v3.x-dev
```

After insalling Leaf, you need to create your index.php file which will be the entry point to your application.

<div class="class-mode">

```php
<?php

require __DIR__ . "/vendor/autoload.php";

$app = new Leaf\App;

$app->get("/", function () use($app) {
  $app->response()->json(["message" => "Hello World!"]);
});

$app->run();
```

</div>

<div class="functional-mode">

```php
<?php

require __DIR__ . "/vendor/autoload.php";

app()->get("/", function () {
  response()->json(["message" => "Hello World!"]);
});

app()->run();
```

</div>

You might want to check out [URL rewriting](/docs/introduction/url-rewriting.html).

## GitHub

<!-- ::: info Video Docs
Learn how to set up a leaf app from the leaf codebase.

<VideoLesson href="https://www.youtube.com/watch?v=t-pNURSTOKw" title="Install leaf PHP">Watch the github setup on youtube</VideoLesson>
::: -->

You can also clone the leaf 3 branch.

::: tip Setup ☁️
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

Leaf skeleton is an official leaf boilerplate that packs a default setup with optional MVC configuration and setup.

::: warning NOTE
Skeleton with Leaf 3 is also available on the leaf cli. You can quickly scaffold a skeleton 3 project with:

```sh
leaf create <project-name> --skeleton --v3
```

:::

The main installtion for skeleton is through composer.

```sh
composer create-project leafs/skeleton <project-name>
```
