---
title: "Version 2.0"
---

# 🍁 Sugar Maple

![Latest Stable Version](https://poser.pugx.org/leafs/cli/v/stable)
![Total Downloads](https://poser.pugx.org/leafs/cli/downloads)

Leaf CLI v2 (Sugar Maple) builds on the functionality provided by the earlier version. It comes with faster load times, full scaffolds, bug fixes and a ton of other powerful functionality. You can now work with presets, scaffold projects using both v2 and v3 of leaf.

Unlike v1, v2 supports all leaf scaffolds: leaf, leaf mvc, leaf api and skeleton. It also uses in-built scaffolds instead of zip files packaged on leaf downloads coupled with composer downloads which make Leaf CLI 2 faster and even more reliable.

::: tip What's new?
To find out what's new, you can [read the changelog](https://github.com/leafsphp/cli/releases/tag/v2.0.2)
:::

## Creating a leaf app

To start a new project, simply open up your console or terminal and move into the directory you want to generate your project. From there, you can use the `create` command:

```bash
leaf create <project-name>
```

This will now prompt you to select a preset <Badge text="New in v2" />

```sh
Creating a new Leaf app "<project-name>" in ./projects-directory.

Please pick a preset 
  [0] leaf
  [1] leaf mvc
  [2] leaf api
  [3] skeleton
 > 
```

::: tip
Note that you are to select a number, not type the name of the preset.
:::

Selecting a number will generate a leaf app based on the associated preset. As you can see, there are 4 presets:

- **Leaf**: a bare leaf project (supports leaf 3)
- **Leaf MVC**: a leaf MVC project with leaf 2
- **Leaf API**: a leaf API project with leaf 2
- **Skeleton**: a leaf skeleton project (supports leaf 3)

After picking a preset, your project will be automatically generated and initialized. All you need to do is open it up and start coding 🚀

### Quick presets

Leaf CLI also provides a quicker way to initialize your project without having to go through the interactive installer. You can use the `--mvc`, `--api`, `--basic` and `--skeleton` options to generate your project based on a specific presets. `--basic` generates a raw leaf project.

eg: `leaf create backend-api --api`

This will create a leaf api project named `backend-api`.

### Versioning

You might have noticed earlier that some presets had `(supports leaf 3)` attached to them. These presets come in both leaf 2 and leaf 3 versions. Although leaf 3 beta has not yet been released, we are working on allowing leaf's presets to use Leaf 3's dev version for all those curious about it.

By default, leaf cli will create a leaf 2 setup for your project, however, for presets which support Leaf 3, adding a `--v3` flag will switch to the v3 build instead of using Leaf v2.

eg: `leaf create backend-api --v3` or `leaf create backend-api --skeleton --v3`.

## Running your leaf apps

After generating your leaf app, you can `cd` into the directory and spin up a local dev server using leaf cli's `serve` command.

```sh
cd backend-api
leaf serve
```

You can also specify the port to run your leaf app on using the `--port` or `-p` options.

```sh
leaf serve -p 3000
```

## Installing packages

This cli tool also adds a feature to install leaf packages from composer

```bash
leaf install ui
```

## Interactive Shell

You can also use the interactive shell to interact with your app.

```bash
$ leaf app:interact
...
>>> $user = new User;
...
>>> $user->name = "Mychi";
...
>>> $user->save();
```

## Updating leaf cli

v2 contains an easy way to quickly update leaf cli to the latest version.

```bash
leaf update
```

## Usage Guide

```sh
Leaf CLI 2.0.0

Usage:
  command [options] [arguments]

Options:
  -h, --help            Display help for the given command. When no command is given display help for the list command
  -q, --quiet           Do not output any message
  -V, --version         Display this application version
      --ansi|--no-ansi  Force (or disable --no-ansi) ANSI output
  -n, --no-interaction  Do not ask any interactive question
  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug

Available commands:
  create        Create a new Leaf PHP project
  help          Display help for a command
  install       Add a new package to your leaf app
  interact      Interact with your application
  list          List commands
  serve         Run your Leaf app
  update        Update leaf cli to the latest version
```

This is the full list of commands available with Leaf CLI 2. A new update command has been added to allow you seamlessly update leaf CLI without having to run a bunch of commands. You don't even need to run this manually since leaf cli will automatically check for updates and upgrade to the latest stable release.

## License

Leaf CLI is open-sourced software licensed under the MIT license.
