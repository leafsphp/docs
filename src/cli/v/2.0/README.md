---
title: "Version 2.0"
---

# 💻 Leaf CLI

![Latest Stable Version](https://poser.pugx.org/leafs/cli/v/stable)
![Total Downloads](https://poser.pugx.org/leafs/cli/downloads)

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

## License

Leaf CLI is open-sourced software licensed under the MIT license.
