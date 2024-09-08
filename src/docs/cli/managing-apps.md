# Managing apps

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoModal from '@theme/components/shared/VideoModal.vue'
</script>

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

Leaf CLI ships with a `view:install` command that allows you to set up React, Vue, and templating engines like Blade and BareUI. You can use the `--react`, `--vue`, `--blade`, and `--bareui` options to scaffold your frontend setup.

```bash:no-line-numbers
leaf view:install --react
```

You can also use the `--vite` and `--tailwind` options to scaffold Vite and Tailwind respectively.

### Running frontend setups

Since Leaf CLI is a backend tool, it doesn't come with a frontend server. However, you can use the `view:dev` command to run your frontend setup which may include in a dev server for your frontend.

```bash:no-line-numbers
leaf view:dev
```

### Building frontend setups

You can also use the `view:build` command to build your frontend setup for production.

```bash:no-line-numbers
leaf view:build
```

### API Reference

This is the full list of commands you can use to manage your app's dependencies:

```bash:no-line-numbers

 _              __    ___ _    ___ 
| |   ___ __ _ / _|  / __| |  |_ v2.12.0
| |__/ -_) _` |  _| | (__| |__ | | 
|____\___\__,_|_|    \___|____|___|                       


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
  completion    Dump the shell completion script
  create        [init|new] Create a new Leaf PHP project
  deploy        [publish] Deploy your leaf project
  help          Display help for a command
  install       Add a new package to your leaf app
  interact      Interact with your application
  list          List commands
  run           Run a script in your composer.json
  serve         Run your Leaf app
  test          Test your leaf application through leaf alchemy
  ui            [gui] Start the Leaf CLI GUI process
  uninstall     Uninstall a  package
  update        Update leaf cli to the latest version
 view
  view:build    Run your frontend dev server
  view:dev      [view:serve] Run your frontend dev server
  view:install  Run a script in your composer.json
```
