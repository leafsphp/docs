# Testing

Leaf is built with testing in mind. However, since you might need to quickly setup a project for a showcase or non-mainstream reason, we don't add any test library to the default Leaf installation, but can be added by simply installing our Alchemy module.

::: warning Note
Before you continue, keep in mind that Alchemy is only a test runner, not a test framework. Alchemy runs tests using [Pest](https://pestphp.com/)/[PHPUnit](https://phpunit.de/) (Pest by default).
:::

## Why Test?

Automated tests help you and your team build complex Leaf apps quickly and confidently by preventing regressions and encouraging you to break apart your application into testable functions, modules, classes, and components. As with any app, your new Leaf app can break in many ways, and it's important that you can catch these issues and fix them before releasing.

## When to Test

Start testing early! We recommend you begin writing tests as soon as you can. The longer you wait to add tests to your application, the more dependencies your application will have, and the harder it will be to start.

## Adding tests to a new project

From Leaf CLI v2.3, you will be asked if you wish to add tests to your application. From there, Alchemy and default tests are setup for you. You can update and run these tests using the Leaf CLI:

```sh
leaf test
```

Or directly from Alchemy:

```sh
./vendor/bin/alchemy run
```

## Adding tests to an existing project

If you've already setup a Leaf project, you can add tests by simply installing the Alchemy module. You can do this with the Leaf CLI:

```sh
leaf install alchemy
```

Or with composer

```sh
composer require leafs/alchemy
```

## Your first test

After installing alchemy, you can quickly generate a sample test with a single command:

```sh
./vendor/bin/alchemy setup
```

If you're using PHPUnit, you'll have to add a `--phpunit` option to the setup command:

```sh
./vendor/bin/alchemy setup --phpunit
```

After this, you can add the specific tests you need in your app. You can then execute these tests using the Leaf CLI:

```sh
leaf test
```

Or directly from Alchemy:

```sh
./vendor/bin/alchemy run
```

<!-- Or with the Leaf CLI:

```sh
leaf test:run
``` -->

You should see something like this:

- PestPHP

![phpunit](https://user-images.githubusercontent.com/26604242/182213801-501067c4-d77c-4769-b18a-d83573047b84.png)

<!-- ## Testing with [PHPUnit](https://phpunit.de/)

PHPUnit is a programmer-oriented testing framework for PHP. By default, Alchemy assumes your tests are written with Pest, however, you can also write and run your tests with PHPUnit. If you want to go this route, instead of the above code in your `index.test.php`, you can place this:

```php
<?php

use PHPUnit\Framework\TestCase;

final class StackTest extends TestCase
{
  public function testPushAndPop(): void
  {
    $stack = [];
    $this->assertSame(0, count($stack));

    array_push($stack, 'foo');
    $this->assertSame('foo', $stack[count($stack)-1]);
    $this->assertSame(1, count($stack));

    $this->assertSame('foo', array_pop($stack));
    $this->assertSame(0, count($stack));
  }
}
```

After this, you can run your tests with Alchemy like this:

```sh
./vendor/bin/alchemy run --phpunit
```

Or with Leaf CLI

```sh
leaf test:run --phpunit
``` 

You should get something like this: -->

- PHPUnit

![pest run](https://user-images.githubusercontent.com/26604242/182264487-6db016be-bee3-40d2-bb75-64d34d893e6a.png)

## Config

As mentioned before, Alchemy simply runs your tests for you. It allows you to run tests without having to do a ton of config first or even write a `phpunit.xml`. All config is handled by Alchemy itself. However, if you want to have control over the `phpunit.xml` file, you can export Alchemy's default config to create a `phpunit.xml` file. You can do this with:

```sh
./vendor/bin/alchemy config:export
```

<!-- Or with Leaf CLI

```sh
leaf test:configure
``` -->

After running the command listed above, you'll have access to a `phpunit.xml` file. Any configuration you need for either Pest or PHPUnit can be done in there.

If you want to totally switch from alchemy to pest or phpunit, you can eject your tests.

```sh
./vendor/bin/alchemy config:eject
```

This creates a `phpunit.xml` file and completely removes everything alchemy related.
