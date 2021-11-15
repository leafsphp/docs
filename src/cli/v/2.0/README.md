---
title: "Version 2.0"
---

# 🍁 Sugar Maple

![Latest Stable Version](https://poser.pugx.org/leafs/cli/v/stable)
![Total Downloads](https://poser.pugx.org/leafs/cli/downloads)

Leaf CLI v2 (Sugar Maple) builds on the functionality provided by the earlier version. It comes with faster load times, full scaffolds, bug fixes and a ton of other powerful functionality. You can now work with presets, scaffold projects using both v2 and v3 of leaf.

Unlike v1, v2 supports all leaf scaffolds: leaf, leaf mvc, leaf api and skeleton. It also uses in-built scaffolds instead of zip files packaged on leaf downloads coupled with composer downloads which make Leaf CLI 2 faster and even more reliable.

::: tip What's new?
To find out what's new, you can [read the changelog](https://github.com/leafsphp/cli/releases/latest)
:::

## Creating a leaf app

To start a new project, simply open up your console or terminal and move into the directory you want to generate your project. From there, you can use the `create` command:

```bash
leaf create <project-name>
```

or with leaf 3:

```sh
leaf create <project-name> --v3
```

::: tip
Note that the leaf 3 has not yet been released. This is why the default installation uses leaf 2. After the main v3 is released, leaf cli will switch to leaf 3 for its default installations.
:::

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

- **Leaf**: a bare leaf project
- **Leaf MVC**: a leaf MVC project with leaf 2
- **Leaf API**: a leaf API project with leaf 2
- **Skeleton**: a leaf skeleton project

After picking a preset, your project will be automatically generated and initialized. All you need to do is open it up and start coding 🚀

### Quick presets

Leaf CLI also provides a quicker way to initialize your project without having to go through the interactive installer. You can use the `--mvc`, `--api`, `--basic` and `--skeleton` options to generate your project based on a specific presets. `--basic` generates a raw leaf project.

eg: `leaf create backend-api --api`

This will create a leaf api project named `backend-api`.

### Versioning

Just as promised, leaf CLI now allows you use the dev version of leaf 3 packages, and with that, all packages now support leaf 3. This means that you can seamlessly follow leaf 3's development by running one command.

Leaf API 3 example:

```sh
leaf create backend-api --api --v3
```

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
$ leaf interact
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
