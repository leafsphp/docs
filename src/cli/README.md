---
title: Intro
---

# Leaf CLI

![Latest Stable Version](https://poser.pugx.org/leafs/cli/v/stable)
![Total Downloads](https://poser.pugx.org/leafs/cli/downloads)

::: tip
Leaf CLI 2 has just been released. Check out the docs [here](/cli/v/2.0/)
:::

A simple command line tool for creating  and interacting with your leaf projects. You can do stuff like installing packages, interacting with your app, previewing your app...

## Installation

You can get this tool up and running on your system using composer:

```bash
composer global require leafs/cli
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

Eg (Adding composer bin to path mac):

```sh
export PATH=$PATH:$HOME/.composer/vendor/bin
echo $PATH
```

::: tip NOTE
To get leaf cli installed permanently, you will need to add your composer bin your `.bashrc` or `.zshrc` file on mac and linux.

**zsh:**

```sh
echo 'export PATH="$PATH:$HOME/.composer/vendor/bin"' >> ~/.zshrc
source ~/.zshrc
```

**bash:**

```sh
echo 'export PATH="$PATH:$HOME/.composer/vendor/bin"' >> ~/.bashrc
source ~/.bashrc
```

:::

## Versions

- [Version 1 Docs](/cli/v/1.0/)
- [Version 2 Docs](/cli/v/2.0/)
