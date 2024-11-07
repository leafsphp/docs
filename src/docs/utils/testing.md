# Testing & Code Styling

Testing helps you and your team build Leaf apps faster by making sure that new features and changes to existing code breaks nothing else. Testing also encourages you to organize your app into smaller, easier-to-manage parts like functions, modules, and components.

Since you might need to setup a project for rapid prototyping and deployment, we don't add any tests to the default Leaf installation. However, we have Alchemy, a user-friendly tool that simplifies your testing, code styling checks, and code coverage reports with a single command.

## Setting up

Leaf CLI will always ask if you want to add Alchemy to your project when you create a new project. If you already have a project and want to add Alchemy, you can do so by running the following command:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install alchemy --dev
```

```bash:no-line-numbers [Composer]
composer require leafs/alchemy --dev
```

:::

Once installed, you need to run the setup command to configure Alchemy for your project.

```bash:no-line-numbers
./vendor/bin/alchemy install
```

This will automatically set up an `alchemy.yml` file in your project's root which you can use to configure your tests, linting and github actions. It also sets up commands for testing and linting in your `composer.json` file.

## Configuring Alchemy

The `alchemy.yml` file should look something like this:

```yaml [alchemy.yml]
app:
  - app
  - src

tests:
  engine: pest
  parallel: true
  paths:
    - tests
  files:
    - '*.test.php'
  coverage:
    local: false
    actions: true

lint:
  preset: PSR12
  rules:
    no_unused_imports: true
    not_operator_with_successor_space: false
    single_quote: true

actions:
  run:
    - lint
    - tests
  os:
    - ubuntu-latest
  php:
    extensions: json, zip, dom, curl, libxml, mbstring
    versions:
      - '8.3'
  events:
    - push
    - pull_request
```

You can make edits to this file to suit your needs. The `app` key is an array of directories to look for your app files in. The `tests` key is an array of configurations for your tests. The `lint` key is an array of configurations for your code styling checks. Once you're done setting up your `alchemy.yml` file, you can run your test command, lint command, GitHub actions command or the alchemy command to do all of that at once.

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf run test # Generate/Run tests
leaf run lint # Generate/Run code styling checks
leaf run actions # Generate GitHub Actions
leaf run alchemy # Run all of the above
```

```bash:no-line-numbers [Composer]
composer run test # Generate/Run tests
composer run lint # Generate/Run code styling checks
composer run actions # Generate GitHub Actions
composer run alchemy # Run all of the above
```

:::

## Configuring Tests

Alchemy uses Pest for testing by default. Pest is a delightful PHP Testing Framework with a focus on simplicity which matches Leaf's philosophy. We are working on adding support for PHPUnit as well.

<!-- If you don't want to use Pest, Alchemy also supports PHPUnit. You can change the testing framework by editing the `alchemy.yml` file in your project root, add your tests to the `tests` directory, and run the test command again. You don't need to worry about setting up PHPUnit or Pest as Alchemy will handle that for you. -->

By default Pest expects a `phpunit.xml` file in your project root, but as it's quite annoying to read, Leaf provides a `alchemy.yml` file in your project root. This file is used to configure Pest and is much easier to read and understand. The `alchemy.yml` file is used to configure Pest and can be used to set up your test environment.

```yaml [alchemy.yml]
app:
  - app
  - src

tests:
  engine: pest
  parallel: true
  paths:
    - tests
  files:
    - '*.test.php'
  coverage:
    local: false
    actions: true
```

- `app`: This is a list of directories that contain your application code. Alchemy will use these directories to lint your code and also in code coverage reports. If you want to use the root directory, you can just remove the entire `app` section.

- `tests.engine`: The testing engine to use. Only Pest is supported engine at the moment, but we plan to add support for other engines in the future.

- `tests.parallel`: Whether to run tests in parallel. This can speed up your test suite significantly.

- `tests.paths`: The directories to look for tests in.

- `tests.files`: The files to look for tests in.

- `tests.coverage`: Configuration for code coverage.
  - You can configure `local` to generate code coverage reports locally. By default, Alchemy will generate code coverage reports only on GitHub Actions.
  - You can also set `include` to include specific directories in your code coverage report. By default Alchemy will just use the directories defined in the `app` configuration.

If you don't want code coverage reports, you can just remove the entire `coverage` section.

## Code Styling

Alchemy allows you to define code styling rules in your `alchemy.yml` file. Alchemy linting uses PHP CS Fixer which is a powerful tool that fixes your code to follow standards; whether you want to follow PHP coding standards as defined in the PSR-1, PSR-2, etc. Of course, all of this is abstracted into the beautiful `alchemy.yml` file.

```yaml [alchemy.yml]
app:
  - app
  - src

...

lint:
  preset: PSR12
  ignore_dot_files: true
  rules:
    array_syntax:
      syntax: short
    no_unused_imports: true
    single_quote: true
    ordered_imports:
      imports_order: null
      case_sensitive: false
      sort_algorithm: alpha
    ...
```

As you see, you can set up your code styling rules in the `lint` section of the `alchemy.yml` file. All of [PHP-CS-Fixer Configurator](https://mlocati.github.io/php-cs-fixer-configurator/) rules are supported.

- `lint`: Configuration for code styling checks.

- `lint.preset`: The preset to use for code styling checks. You can use any of the presets available to PHP CS Fixer. The default is `PSR12`.

- `lint.ignore_dot_files`: Whether to ignore dot files when linting.

- `lint.ignore_vc_files`: Whether to ignore version control files when linting.

- `lint.parallel`: Whether to run linting in parallel. This can speed up your linting significantly.

- `lint.rules`: An array of rules to use for code styling checks. These rules are the same as the rules available in PHP CS Fixer.

## Configuring GitHub Actions

Alchemy can also set up GitHub Actions for you. You can configure what it should generate in the `alchemy.yml` file. Once you have set up your `alchemy.yml` file, you can run the `alchemy` command to generate the GitHub Actions files.

```yaml
actions:
  run:
    - lint
    - tests
  os:
    - ubuntu-latest
    - windows-latest
    - macos-latest
  php:
    extensions: json, zip
    versions:
      - '8.3'
  events:
    - push
    - pull_request
```

- `actions`: Configuration for GitHub Actions. You can remove this entire section if you don't want to generate GitHub Actions.

- `actions.run`: An array of commands to generate GitHub Actions for. The default is `lint` and `tests`, but you can remove any command you don't want to generate.

- `actions.fail-fast`: Whether to stop the workflow as soon as one of the jobs fails.

- `actions.os`: The operating system to run the GitHub Actions on. The default is `ubuntu-latest`, but you can set `windows-latest` or `macos-latest` or all of them.

- `actions.php`: Configuration for PHP in GitHub Actions. You can set the PHP extensions to install and the PHP versions to test against.

- `actions.events`: An array of events to generate GitHub Actions for. The default is `push` and `pull_request`, but you can remove any event you don't want to generate.

<!-- ## Overriding Alchemy Configuration

Alchemy is designed to be a tool that sets up your tests and code styling checks with minimal configuration. Once you have written all the tests you need for your app and have your code styling checks, there's no longer the need for Alchemy's training wheels. At that point, you can remove Alchemy from your project and use PHPUnit or Pest directly with PHP CS Fixer.

To do this, you can run the following command:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf run alchemy:eject
```

```bash:no-line-numbers [Composer]
composer run alchemy:eject
```

:::

This command will export all of Alchemy's configuration to `phpunit.xml` and `.php_cs.dist` files in your project root. It will also update the `test` and `lint` commands in your `composer.json` file to use your selected engine and PHP CS Fixer directly. One more fresh install will be made automatically to ensure that your project is up to date, and then Alchemy will be removed from your project automatically.

If you find that you need to override Alchemy's configuration, you can do so by creating a `phpunit.xml` file in your project root. Once you have this file, Alchemy will use it and automatically delete the `alchemy.yml` file. -->
