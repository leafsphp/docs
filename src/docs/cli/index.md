# Leaf CLI

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

<p class="flex flex:start-all">
  <img src="https://poser.pugx.org/leafs/cli/v/stable" class="m:0" alt="">
  <img src="https://poser.pugx.org/leafs/cli/downloads" class="m:0 ml:_2" alt="">
</p>

Leaf CLI is a simple command line tool for creating and interacting with your leaf projects. You can do stuff like installing packages, interacting with your app, previewing your app...

## Installation

<VideoDocs
  subject="Watch the leaf CLI installation walkthrough"
  description="You can take a look at our leaf cli setup walkthrough on youtube."
  link="https://www.youtube.com/embed/yb3LUYHtopQ"
/>

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

## Creating a leaf app

<VideoDocs
  subject="Watch the leaf 3 installation walkthrough"
  description="You can take a look at our leaf cli setup walkthrough on youtube."
  link="https://www.youtube.com/embed/PuOk5xqTIsA"
/>

To start a new project, simply open up your console or terminal and move into the directory you want to generate your project. From there, you can use the `create` command:

```bash
leaf create <project-name>
```

with leaf 3:

```sh
leaf create <project-name> --v3
```

or with leaf 2:

```sh
leaf create <project-name> --v2
```

This will now prompt you to select a preset

```sh
Creating a new Leaf app "<project-name>" in ./projects-directory.

* Please pick a preset 
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

After picking a preset, if no version was specified, leaf will display an interactive version picker like the one above:

```sh
* Select a version to use 
  [0] v3
  [1] v2
 >
```

your project will be automatically generated and initialized. All you need to do is open it up and start coding 🚀

### Adding Tests

From Leaf CLI v2.3, you will be asked if you want to add tests to your project. You can add tests by replying `y`.

```sh
* Add testing with Leaf Alchemy? [y, n] y

 - Adding alchemy for tests
```

For a quicker method, you can use the `--phpunit` or `--pest` option to add tests to your project using PHPUnit or Pest respectively. You can also use the `--no-tests` option to completely skip adding tests.

```sh
leaf create <project-name> --no-tests
```

### Quick presets

Leaf CLI also provides a quicker way to initialize your project without having to go through the interactive installer. You can use the `--mvc`, `--api`, `--basic` and `--skeleton` options to generate your project based on a specific presets. `--basic` generates a raw leaf project.

eg: `leaf create backend-api --api`

This will create a leaf api project named `backend-api`.

### Versioning

If no version is specified, leaf displays the interactive installer to you, however, to quickly install a particular version, you can use the `--v2` or `--v3` options. These can be coupled with presets as well.

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

### File watching

In v2.1, you can also start the leaf server with hot module watching. This reloads your application anytime a change is made to your application code. To get started, simply start the leaf server with the `--watch` flag.

```sh
leaf serve --port 8000 --watch
```

### Dependency Management

The serve command also now installs dependencies when there is no `vendor` folder present in the current working directory.

<VideoDocs
  subject="Working with packages on the Leaf CLI"
  description="Working with packages and the leaf cli"
  link="https://www.youtube.com/embed/K9jSl_xpr48"
/>

## Testing your Leaf apps

Testing helps prevent bugs in your app which you may not catch until you publish your app to production. Leaf introduced a test runner which helps you initialize testing and run tests in your app without needing any config first. Alchemy has also been integrated into the Leaf CLI and so you can use it's functionality directly.

### Setting up tests

Leaf CLI allows you to setup tests in your project with one command:

```sh
leaf test:setup
```

This command will generate Pest PHP tests for your application. If you however want to use PHPUnit, you'll need to pass the `--phpunit` option to the command.

```sh
leaf test:setup --phpunit
```

### Running tests

To run tests you've setup or created, you can simply run the `test` command.

```sh
leaf test
```

## Installing packages

This cli tool also adds a feature to install leaf packages from composer.

```bash
leaf install leafs/ui
```

If you are installing a leaf module or package, you can leave out the `leafs/` part.

```sh
leaf install ui
```

You can also pass in a bunch of packages to install at once.

```sh
leaf install ui db illuminate/support
```

***Versioning***

Leaf CLI also allows you to install a particular version of any package using `@`

```sh
leaf install ui@1.0 illuminate/support@9.0.2
```

***Package Chaining***

You can now add a bunch of packages to install as done with composer, npm and other CLIs as well.

```sh
leaf install db illuminate/support
```

Using this method, you can even add specific versions of some packages like this:

```sh
leaf install db illuminate/support@9.0.2 nesbot/carbon
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

## Running Scripts

Leaf CLI also now allows you run scripts defined in your `composer.json` file. For example, if you have this in your composer.json:

![image](https://user-images.githubusercontent.com/26604242/166419297-225b0b00-c979-4096-a23d-4f7858def8fb.png)

You can run the test script like this:

```sh
leaf run test
```

## Usage Guide

```sh
 _              __    ___ _    ___ 
| |   ___ __ _ / _|  / __| |  |_ v2.7.0
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
  completion  Dump the shell completion script
  create      [init] Create a new Leaf PHP project
  deploy      [publish] Deploy your leaf project
  help        Display help for a command
  install     Add a new package to your leaf app
  interact    Interact with your application
  list        List commands
  run         Run a script in your composer.json
  serve       Run your Leaf app
  test        Test your leaf application through leaf alchemy
  uninstall   Uninstall a  package
  update      Update leaf cli to the latest version
 test
  test:setup  Add tests to your application
```

This is the full list of commands available with Leaf CLI 2. A new update command has been added to allow you seamlessly update leaf CLI without having to run a bunch of commands. You don't even need to run this manually since leaf cli will automatically check for updates and upgrade to the latest stable release.
