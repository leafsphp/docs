# Testing

Testing helps you and your team build Leaf apps faster by making sure that new features and changes to existing code breaks nothing else. Testing also encourages you to organize your app into smaller, easier-to-manage parts like functions, modules, and components.

Since you might need to setup a project for rapid prototyping and deployment, we don't add any tests to the default Leaf installation. However, we have a user-friendly test runner called Alchemy that can take care of your testing needs.

## Adding Tests to a New Project

The easiest way to add tests to a new project is to use the Leaf CLI. When you create a new project, you'll be asked if you want to add tests. If you say yes, default tests will be set up for you. You can update and run these tests using the Leaf CLI:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf run test
```

```bash:no-line-numbers [Composer]
composer run test
```

:::

## Adding Tests to an Existing Project

It is not uncommon to add tests to an existing project. Once again, Leaf makes this a breeze. All you need to do is install the Alchemy module. You can do this using the Leaf CLI:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install alchemy
```

```bash:no-line-numbers [Composer]
composer require leafs/alchemy
```

:::

Once installed, Alchemy automatically set up testing using the [Pest PHP Framework](https://pestphp.com/). It will generate a `tests` directory in your project root with example tests to get you started. Alchemy will also add a `tests.yml` file in your project root to configure where Pest looks for tests and how it should run them. You can then run your tests using the Leaf CLI:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf run test
```

```bash:no-line-numbers [Composer]
composer run test
```

:::

If you don't want to use Pest, you can follow the instructions for installing the testing framework of your choice, but you won't have the convenience of Alchemy to help you set up your tests.

## Configuring Tests

By default Pest expects a `phpunit.xml` file in your project root, but as it's quite annoying to read, Leaf provides a `tests.yml` file in your project root. This file is used to configure Pest and is much easier to read and understand. The `tests.yml` file is used to configure Pest and can be used to set up your test environment.

```yaml
engine: pest
parallel: true
paths:
  - tests
files:
  - '*.test.php'
coverage:
  processUncoveredFiles: true
  include:
    - app
    - src
```

Breaking down the `tests.yml` file:

- `engine`: The testing engine to use. Pest is the only supported engine at the moment, but we plan to add support for other engines like PHPStan in the future.
- `parallel`: Whether to run tests in parallel. This can speed up your test suite significantly.
- `paths`: The directories to look for tests in.
- `files`: The files to look for tests in.
- `coverage`: Configuration for code coverage. You can set `processUncoveredFiles` to `true` to process files that are not covered by tests. You can also set `include` to include specific directories in your code coverage report.

## Overriding Alchemy Configuration

If you find that you need to override Alchemy's configuration, you can do so by creating a `phpunit.xml` file in your project root. Once you have this file, Alchemy will use it and automatically delete the `tests.yml` file.
