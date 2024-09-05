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
  videoUrl="https://www.youtube.com/embed/yb3LUYHtopQ"
/>

*This guide will assume that your system meets all the [technical requirements](/docs/installation#technical-requirements).*

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

## [Error] command not found: leaf

If you get an error saying `leaf: command not found`, you need to add Composer's global bin directory to your system's PATH. This directory contains every package installed through `composer global require`. Let's fix this by adding the directory to your PATH.

Depending on your operating system, the composer bin directory will be located in different places. You can find the location by running:

```bash:no-line-numbers
composer global config bin-dir --absolute
```

If this command does not work, you can try these common locations:

- Windows: `%USERPROFILE%\AppData\Roaming\Composer\vendor\bin`
- macOS: `$HOME/.composer/vendor/bin`
- GNU / Linux Distributions: `$HOME/.config/composer/vendor/bin` or `$HOME/.composer/vendor/bin`

### Adding to PATH

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
