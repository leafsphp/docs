<!-- markdownlint-disable no-inline-html -->

# Installation

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

Leaf 3 is built by design to be incrementally adoptable. This means that it can be integrated into a project multiple ways depending on the requirements.

There are four primary ways of adding Leaf PHP to a project:

1. Use the [Leaf CLI](/docs/cli/) to scaffold a project [RECOMMENDED].
2. Download leaf through composer
3. Use [Leaf skeleton](https://leafphp.netlify.app/#/skeleton/v/2.0/) to quickstart your project
4. Download the leaf repo

::: tip Migrating
If you want to migrate an existing Leaf 2 project, skip this and follow the [Migration Guide](/docs/migration/introduction.html)
:::

## Technical Requirements

Before creating your first Leaf application you must:

- Install PHP 7.2 or higher and these PHP extensions (which are installed and enabled by default in most PHP installations): json, zip;
  ::: warning Note that
  Note that some specific modules require PHP 7.4, so to be safe, we recommend PHP 7.4 as your minimum PHP version.
  :::
- [Install Composer](https://getcomposer.org/download/), which is used to install PHP packages.
- Optionally, you can also install [Leaf CLI](/docs/cli/). This provides all the tools you need to create and manage your Leaf application locally.

Leaf 3 works as far back as PHP 7.2, however, some modules require PHP 7.4, so we advice using a minimum of PHP 7.4. There's also full support for PHP 8.

You'll also need some PHP extensions like json extension and the zip extension

## Leaf CLI

<VideoDocs
  subject="Watch the leaf 3 installation walkthrough"
  description="You can take a look at our leaf cli setup walkthrough on youtube."
  link="https://www.youtube.com/embed/PuOk5xqTIsA"
/>

Leaf provides an [official CLI](https://github.com/leafsphp/cli) for quickly creating and managing your Leaf applications. It takes just a few seconds to get up and running with your leaf app. See [the Leaf CLI docs](/docs/cli/) for more details.

```bash
leaf create <project-name> --v3
```

You can also install modules using the following syntax:

```bash
leaf install cors
```

You can then run your app using:

```bash
leaf serve
```

## Composer

<!-- <VideoDocs
  subject="Watch the composer setup on youtube"
  description="Learn how to set up a leaf app with composer."
  link="https://www.youtube.com/watch?v=t-pNURSTOKw"
/> -->

You can also set up a new leaf 3 project from scratch using composer:

```bash
# latest stable (v3)
$ composer require leafs/leaf

# version 3 dev
$ composer require leafs/leaf v3.x-dev
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

<!-- <VideoDocs
  subject="Watch the github setup on youtube"
  description="Learn how to set up a leaf app from the leaf codebase."
  link="https://www.youtube.com/watch?v=t-pNURSTOKw"
/> -->

You can also clone the leaf 3 branch.

::: tip Setup
You can directly download v3.x-dev here.

<div style="margin-bottom: 30px;">
  <a href="https://github.com/leafsphp/leaf/releases/latest">Download Repo</a>
</div>
:::

After downloading repo, you need to create an autoloader.

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

```bash
leaf create <project-name> --skeleton --v3
```

:::

The main installtion for skeleton is through composer.

```bash
composer create-project leafs/skeleton <project-name>
```
