# Installation

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoModal from '@theme/components/shared/VideoModal.vue'
</script>

Leaf 4 is built by design to be incrementally adoptable. This means that it can be integrated into a project multiple ways depending on the requirements. You can use Leaf on its own which is generally recommended for small/medium sized projects, or you can use it with an additional structure like [Leaf MVC](/docs/mvc/) for more complex applications.

1. [Use the Leaf CLI to scaffold a project [RECOMMENDED]](#leaf-cli).
2. [Download leaf through composer](#composer)
3. [Scaffold a Leaf MVC project](#mvc-setup)

## Technical Requirements

Before you create your first Leaf application, you need to make sure you meet the following requirements:

- Leaf currently supports PHP 7.4 and higher, but we are in the process of changing the minimum required version to PHP 8.1
- Leaf requires these PHP extensions (which are installed and enabled by default in most PHP installations): json, zip;
- [Install Composer](https://getcomposer.org/download/), which is used to install PHP packages.
- Optionally, you can also install [Leaf CLI](/docs/cli/). This provides all the tools you need to create and manage your Leaf application locally. This is optional but highly recommended.

::: details Not sure where to start?

- Laravel released an amazing tool called [Laravel Herd](https://herd.laravel.com/) that provides a quick and easy way to set up a local PHP development environment for Mac. It's a great way to get started with PHP and Leaf.

- On Windows, Linux and Mac, you can use [Xampp](https://www.apachefriends.org/), which is a free and open-source cross-platform web server solution stack package developed by Apache Friends, consisting mainly of the Apache HTTP Server, MariaDB database, and interpreters for scripts written in the PHP and Perl programming languages.

:::

## Leaf CLI

<VideoModal
  subject="Watch the leaf installation walkthrough"
  videoUrl="https://www.youtube.com/embed/PuOk5xqTIsA"
/>

Leaf provides an [official CLI](https://github.com/leafsphp/cli) for quickly creating and managing your Leaf applications. It takes just a few seconds to get up and running with your leaf app. See [the Leaf CLI docs](/docs/cli/) for more details.

Using the CLI, you can quickly scaffold a new Leaf project with:

```bash:no-line-numbers
leaf create <project-name>
```

The CLI also allows you to completely customize the installation you wish to create. You can choose different features like database, authentication, etc. This is done using the `--custom` flag:

```bash:no-line-numbers
leaf create <project-name> --custom
```

You can then run your app using the `serve` command:

```bash:no-line-numbers
leaf serve
```

## Composer

<!-- <VideoModal
  subject="Watch the composer setup on youtube"
  description="Learn how to set up a leaf app with composer."
  link="https://www.youtube.com/watch?v=t-pNURSTOKw"
/> -->

Leaf also allows a more traditional approach to installation. You can install leaf through composer. You can use this method if you don't want to use the leaf cli or if you want to use leaf as a dependency in your project. The disadvantage of this method is that you don't get a quick-start setup like you do with the leaf cli.

```bash:no-line-numbers
composer require leafs/leaf
```

After insalling Leaf, you need to create your index.php file which will be the entry point to your application.

::: code-group

```php [Functional Mode]
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  response()->json(['message' => 'Hello World!']);
});

app()->run();
```

```php [Class Mode]
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->get('/', function () use($app) {
  $app->response()->json(['message' => 'Hello World!']);
});

$app->run();
```

:::

When hosting your application on a webserver, all requests coming into your app must be routed through Leaf. It is really simple to do, and all needed instructions can be found @ [URL rewriting](/docs/routing/url-rewriting).

## MVC Setup

Leaf is built to be modular, so you can use only what you need. Unfortunately, this means that a simple Leaf app does not give you any structure to work with. You can structure your app however you want, but if you're building a complex application, you might want to consider using Leaf MVC. Leaf MVC is a full but ridiculously light-weight MVC framework that creates an MVC skeleton for you to work with. It is still Leaf, but with a more structured approach. To get started, you can check out the [MVC docs](/docs/mvc/).
