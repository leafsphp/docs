# Leaf CLI

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoModal from '@theme/components/shared/VideoModal.vue'
</script>

<p class="flex flex:start-all" style="gap:10px;">
  <img src="https://poser.pugx.org/leafs/cli/v/stable" class="m:0" alt="">
  <img src="https://poser.pugx.org/leafs/cli/downloads" class="m:0" alt="">
</p>

Leaf CLI is a command line tool that helps you create, manage and deploy Leaf applications. It's a powerful tool that helps you get started with Leaf quickly and easily. You can do things like creating apps, running your projects, installing dependencies, and more.

## Installation

<VideoModal
  buttonText="CLI installation walkthrough"
  description="You can take a look at our leaf cli setup walkthrough on youtube."
  videoUrl="https://www.youtube.com/embed/jqkear8zue8"
/>

*This guide will assume that your system meets all the [technical requirements](/docs/#creating-a-new-app).*

You can verify that composer is installed by running:

```bash:no-line-numbers
composer --version
```

To install the Leaf CLI, you can run the following command:

```bash:no-line-numbers
composer global require leafs/cli
```

This tells Composer to install the Leaf CLI globally on your system. You can verify that the CLI is installed correctly by running:

```bash:no-line-numbers
leaf --version
```

::: details [Error] command not found: leaf

If you get an error saying `leaf: command not found`, you need to add Composer's global bin directory to your system's PATH. This directory contains every package installed through `composer global require`. Let's fix this by adding the directory to your PATH.

Depending on your operating system, the composer bin directory will be located in different places. You can find the location by running:

```bash:no-line-numbers
composer global config bin-dir --absolute
```

If this command does not work, you can try these common locations:

- Windows: `%USERPROFILE%\AppData\Roaming\Composer\vendor\bin`
- macOS: `$HOME/.composer/vendor/bin`
- GNU / Linux Distributions: `$HOME/.config/composer/vendor/bin` or `$HOME/.composer/vendor/bin`

**Adding to PATH:**

Once you have the location, you can add it to your PATH. On Mac and Linux, you can do this by running these in your terminal:

```bash:no-line-numbers
echo 'export PATH="$PATH:$HOME/.composer/vendor/bin"' >> ~/.bashrc
source ~/.bashrc
```

Or if you're using Zsh:

```bash:no-line-numbers
echo 'export PATH="$PATH:$HOME/.composer/vendor/bin"' >> ~/.zshrc
source ~/.zshrc
```

:::

Besides creating apps, Leaf CLI also helps you manage your apps. This includes things like running your app, dependency management, running commands, and more. This guide covers all such features.

## Running your app

You can run your app by navigating into your app's directory and running the `leaf serve` command. This will start a development server and serve your app on `localhost:5500`.

```bash:no-line-numbers
cd my-app
leaf serve
```

You can also specify a port to run your app on by passing the `--port` or `-p` flag:

```bash:no-line-numbers
leaf serve --port=8080
```

The serve command also has a `--watch` flag that watches your app for changes and automatically reloads your app when changes are detected:

```bash:no-line-numbers
leaf serve --watch
```

*Note: The `--watch` flag is only available when running your app in development mode and uses nodejs to watch your app for changes.*

If you want to run your application from a different directory, you can pass the path to the directory as an argument:

```bash:no-line-numbers
leaf serve /path/to/your/app
```

::: info Automatic dependency installation
When running your app, Leaf will automatically try to install missing dependencies if no `vendor` directory is found in your app's directory.
:::

## Running commands

Leaf CLI also allows you to run commands in your app's directory. If you have a command in your `composer.json` file, you can run it using the `leaf run` command:

```bash:no-line-numbers
leaf run my-command
```

## Dependency management

Leaf CLI also has commands built on top of Composer to help you manage your app's dependencies. Leaf has a whole ecosystem of packages that are treated as first-class citizens in the Leaf ecosystem, and are given special treatment by the CLI. This makes working with Leaf packages a breeze, but also allows you to work with any Composer package.

::: details Are you a visual learner?

This video will help you understand how to work with packages on the Leaf CLI.

<VideoModal
  subject="Working with packages on the Leaf CLI"
  description="Working with packages and the leaf cli"
  videoUrl="https://www.youtube.com/embed/K9jSl_xpr48"
/>

:::

### Installing packages

This cli tool also adds a feature to install leaf packages from composer.

```bash:no-line-numbers
leaf install leafs/ui
```

If you are installing a leaf module or package, you can leave out the `leafs/` part.

```bash:no-line-numbers
leaf install ui
```

You can also pass in a bunch of packages to install at once.

```bash:no-line-numbers
leaf install ui db illuminate/support
```

***Versioning***

Leaf CLI also allows you to install a particular version of any package using `@`

```bash:no-line-numbers
leaf install ui@1.0 illuminate/support@9.0.2
```

### Uninstalling packages

This works the same way as installing packages, but you use the `uninstall` command instead.

```bash:no-line-numbers
leaf uninstall ui
leaf uninstall ui db illuminate/support
```

## View commands

Leaf CLI also allows you to create and interact with frontend setups using the `view` commands. You can scaffold frontend setups like React, Vue, templating engines, build tools, and more.

### Scaffolding views

Leaf CLI ships with a `view:install` command that allows you to set up React, Vue, and templating engines like Blade and BareUI. You can use the `--react`, `--vue`, `--blade`, and `--svelte` options to scaffold your frontend setup.

```bash:no-line-numbers
leaf view:install --react
```

You can also use the `--vite` and `--tailwind` options to scaffold Vite and Tailwind respectively.

### Building frontend setups

You can also use the `view:build` command to build your frontend setup for production.

```bash:no-line-numbers
leaf view:build
```
