# Installation

Leaf 3 is built by design to be incrementally adoptable. This means that it can be integrated into a project multiple ways depending on the requirements.

There are four primary ways of adding Leaf PHP to a project:

1. Download leaf through composer
2. Use [Leaf skeleton](https://leafphp.netlify.app/#/skeleton/v/2.0/) to quickstart your project
3. Use the [Leaf CLI](https://leafphp.netlify.app/#/cli/) to scaffold a project, which provides a base setup with important modules.

## Release Notes

Latest version 3 release: ![Latest Stable Version](https://poser.pugx.org/leafs/leaf/v/unstable)

Detailed release notes for each version are available on [GitHub](https://github.com/leafsphp/Leaf-next/blob/master/CHANGELOG.md).

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
})

app()->run();
```

You might want to check out [URL rewriting](/docs/introduction/url-rewriting.html).

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

Leaf provides an [official CLI](https://github.com/leafsphp/cli) for quickly creating and managing your Leaf applications. It takes less than a minute to get up and running with your leaf app. See [the Leaf CLI docs](https://cli.leafphp.org) for more details.

```sh
composer global require leafs/cli
```

After this, start your leaf project with:

```sh
leaf init <project-name> --version 3 --dev
```

You can also install modules using the following syntax:

```sh
leaf install --module cors
```
