# Testing

Leaf is built with testing in mind. In fact, support for testing with [Pest PHP](https://pestphp.com/)/[PHPUnit](https://phpunit.de/) is included out of the box. All that you need to do is to create a `test` or `tests` directory and start writing your tests. Leaf allows you to run the tests you've created with what we call alchemy.

::: warning Alchemy Tests
If both a `tests` and `test` directory exist, Alchemy will only run the `tests` directory. Also, Alchemy will only run files with the `.test.php` extension. This is to give more room for setup files and more.
:::

Before you continue, keep in mind that Alchemy is only a test runner, not a test framework. Alchemy runs tests using [Pest](https://pestphp.com/)/[PHPUnit](https://phpunit.de/) (Pest by default).

## Your first test

As mentioned above, all you need to do to get started with testing in leaf is to create a `test` or `tests` directory.

If you have the Leaf CLI installed, you can quickly generate a sample test with a single command:

```sh
leaf test:init
```

From there, we can start writing our tests. Create an `index.test.php` file in the `tests` directory:

```php
test('n is true', function () {
  $n = true;
  expect($n)->toBeTrue();
});
```

After creating this test, we need a way to run this test. That's where alchemy comes in. We can use alchemy to run this Pest PHP test. We can run this simply with one command.

```sh
./vendor/bin/alchemy run
```

Or with the Leaf CLI:

```sh
leaf test:run
```

You should see something like this:

![pest run](https://pestphp.com/assets/img/pestinstall.png)

## Testing with [PHPUnit](https://phpunit.de/)

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

You should get something like this:

![phpunit](https://valuebound.com/sites/default/files/inline-images/phpunit%204.jpg)

## Config

As mentioned before, Alchemy simply runs your tests for you. It allows you to run tests without having to do a ton of config first or even write a `phpunit.xml`. All config is handled by Alchemy itself. However, if you want to have control over the `phpunit.xml` file, you can export Alchemy's default config to create a `phpunit.xml` file. You can do this with:

```sh
./vendor/bin/alchemy configure
```

Or with Leaf CLI

```sh
leaf test:configure
```

After running either of the commands listed above, you'll have access to a `phpunit.xml` file. Any configuration you need for either Pest or PHPUnit can be done in there. Alchemy takes in no config since it's not responsible for testing, it simply forwards your tests to the appropriate handler.
