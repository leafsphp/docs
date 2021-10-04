---
title: "Version 1.0"
---

# 💻 Leaf CLI v1.0

![Latest Stable Version](https://poser.pugx.org/leafs/cli/v/stable)
![Total Downloads](https://poser.pugx.org/leafs/cli/downloads)


## 📂 Installation

You can get this tool up and running on your system using composer:

```bash
composer global require leafs/cli ^1.0
```

Make sure to place Composer's system-wide vendor bin directory in your `$PATH` so the leaf executable can be located by your system. This directory exists in different locations based on your operating system; however, some common locations include:

- Windows: `%USERPROFILE%\AppData\Roaming\Composer\vendor\bin`
- macOS: `$HOME/.composer/vendor/bin`
- GNU / Linux Distributions: `$HOME/.config/composer/vendor/bin` or `$HOME/.composer/vendor/bin`

You could also find the composer's global installation path by running `composer global about` and looking up from the first line.

Eg (Adding composer bin to path linux):

```sh
export PATH=$PATH:$HOME/.config/composer/vendor/bin
```

## 📕 Usage Guide

### 🚧 Creating projects

To start a new project, simply open up your console or terminal in your directory
for projects and enter:

```bash
leaf create <project-name>
```

This will generate a new Leaf PHP app in the `<project-name>` directory. You can also create [Leaf API](leaf-api/) and [Leaf MVC](https://github.com/leafsphp/leafmvc) apps from the cli.

**Leaf API:**

```bash
leaf create <project-name> --api
```

or

```bash
leaf create <project-name> -a
```

**Leaf MVC:**

```bash
leaf create <project-name> --mvc
```

or

```bash
leaf create <project-name> -m
```

### ➕ Installing packages

This cli tool also adds a feature to install packages from composer

```bash
leaf install leafs/ui
```

### 🧿 Interactive Shell

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

### 📺 Previewing your app

This opens up your app on the PHP local server.

```bash
leaf app:serve
```

You can also specify the port

```bash
leaf app:serve -p 8000
```

Full

```bash
Leaf CLI 1.0.0

Usage:
  command [options] [arguments]

Options:
  -h, --help            Display this help message
  -q, --quiet           Do not output any message
  -V, --version         Display this application version
      --ansi            Force ANSI output
      --no-ansi         Disable ANSI output
  -n, --no-interaction  Do not ask any interactive question
  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug

Available commands:
  create        Create a new Leaf PHP project
  help          Displays help for a command
  install       Add a new package to your leaf app
  list          Lists commands
 app
  app:interact  Interact with your application
  app:serve     Run your Leaf app
```
