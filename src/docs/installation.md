# Installation

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoModal from '@theme/components/shared/VideoModal.vue';
</script>

Leaf is built by design to be incrementally adoptable. This means that it can be integrated into a project multiple ways depending on the requirements. You can use Leaf on its own which is generally recommended for small/medium sized projects, or you can use it with an additional structure like [Leaf MVC](/docs/mvc/) for more complex applications.

## Technical Requirements

Before you create your first Leaf application, you need to make sure you meet the following requirements:

- Leaf currently supports PHP 7.4 and higher, but we are in the process of changing the minimum required version to PHP 8.1
- Leaf requires these PHP extensions (which are installed and enabled by default in most PHP installations): json, zip;
- [Install Composer](https://getcomposer.org/download/), which is used to install PHP packages.
- Optionally, you can also install [Leaf CLI](/docs/cli/). This provides all the tools you need to create and manage your Leaf application locally. This is optional but highly recommended.

::: details Not sure where to start?

- Beyond Code released an amazing tool called [Laravel Herd](https://herd.laravel.com/) that provides a quick and easy way to set up a local PHP development environment for Mac and Windows. It's a great way to get started with PHP if you don't have it installed yet.

- Another way to install PHP and Composer without any hassle is to use [php.new](https://php.new/) which was created by Beyond Code. It's a quick way to get started on Windows, Linux and Mac with just one command.

- A more traditional way on Windows, Linux and Mac, you can use [Xampp](https://www.apachefriends.org/), which is a free and open-source cross-platform web server solution stack package developed by Apache Friends, consisting mainly of the Apache HTTP Server, MariaDB database, and interpreters for scripts written in the PHP and Perl programming languages.

Once you have PHP and Composer installed, you can proceed with the installation of Leaf CLI.

:::

## Automatic Installation

We recommend starting a new Leaf app using the Leaf CLI, which sets up everything automatically for you. To create a project, run:

```bash:no-line-numbers
leaf create <project-name>
```

This command will walk you through a quick setup process where you can choose the features you want in your app. There are more options available in the CLI, which you can find in the [CLI documentation](/docs/cli/).

Once your project is generated, you can run it using the `serve` command:

```bash:no-line-numbers
leaf serve
```

<VideoModal
  buttonText="Setup a project via CLI"
  subject="Watch the leaf installation walkthrough"
  videoUrl="https://www.youtube.com/embed/PuOk5xqTIsA"
/>

## Manual Installation

<!-- <VideoModal
  subject="Watch the composer setup on youtube"
  description="Learn how to set up a leaf app with composer."
  link="https://www.youtube.com/watch?v=t-pNURSTOKw"
/> -->

Leaf also allows a more traditional approach to installation through [composer](https://getcomposer.org/). We recommend using the Leaf CLI since it provides a more streamlined setup process, but of course, you can use composer if you prefer. The disadvantage of this method is that you don't get a quick-start setup like you do with the leaf cli.

```bash:no-line-numbers
composer require leafs/leaf
```

After installing Leaf, you need to create your index.php file which will be the entry point to your application.

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
