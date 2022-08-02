# Testing

Leaf is built with testing in mind. Although support for testing in your Leaf apps isn't included out of the box, we have provided a simple solution to get you up and testing in less than a minute. All you need to do is install the Alchemy test runner.

Before you continue, keep in mind that Alchemy is only a test runner, not a test framework. Alchemy runs tests using [Pest](https://pestphp.com/)/[PHPUnit](https://phpunit.de/) (Pest by default).

## Installing Alchemy

You can quickly install alchemy using Leaf CLI:

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

After this, you can add the specific tests you need in your app. You can then execute these tests using the `run` command:

```sh
./vendor/bin/alchemy run
```

<!-- Or with the Leaf CLI:

```sh
leaf test:run
``` -->

You should see something like this:

- PHPUnit

![pest run](https://user-images.githubusercontent.com/26604242/182264487-6db016be-bee3-40d2-bb75-64d34d893e6a.png)

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

- PestPHP

![phpunit](https://user-images.githubusercontent.com/26604242/182213801-501067c4-d77c-4769-b18a-d83573047b84.png)

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
