# Migrating from other frameworks

This page contains a guide for developers who have a working application in another framework and want to port over to Leaf. Since Leaf is modular, you can pick different pieces and incrementally add them to your existing application. This way, you can gradually rewrite your application without breaking any code.

## Why Migrate to Leaf?

Depending on the framework you're coming from, you might have different reasons for migrating to Leaf. Leaf is lightweight, modular, and has a simple API. It offers better performance and flexibility compared to many other frameworks. Leaf also allows you to integrate other libraries seamlessly into your Leaf apps with no conflicts or complexities.

We are still in the process of creating migration guides for different frameworks. If you have a specific framework you'd like to migrate from, please let us know by creating an issue on our GitHub repository. For now, you can follow the general guide below.

## Quickstart

Since you can pick and choose different modules in Leaf, you can start by finding the feature you want to use and installing it. Below is an example of a Slim PHP 4 application that we want to use Leaf 3 in:

```php
<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

$app->get('/', function (Request $request, Response $response, $args) {
    $name = $args['name'];
    $response->getBody()->write("Hello, $name");
    return $response;
});

$app->run();
```

Slim and Leaf are both micro-frameworks, so the migration process is relatively straightforward. You can install Leaf in your Slim application and start using Leaf's features.

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install leaf
```

```bash:no-line-numbers [Composer]
composer require leafs/leaf
```

:::

We can start off by swapping out the Slim request and response objects with Leaf's. Since this is a little change, we installed the `leaf` module which contains Leaf's core features, including the request and response objects. In more complex applications, you can install specific modules that you need like Auth, Database, etc.

## Replacing HTTP Interfaces

Now, we can replace Slim's request and response objects with Leaf's. What makes this process easy is that Leaf's request and response objects are not tied to any specific framework. This means you can use them in any PHP application. They use PHP's internal methods which makes them compatible with any PHP application.

```php
<?php

use Psr\Http\Message\ResponseInterface as Response; // [!code --]
use Psr\Http\Message\ServerRequestInterface as Request; // [!code --]
use Leaf\App; // [!code ++]

require __DIR__ . '/../vendor/autoload.php';

$app = App::create();
$leaf = new Leaf\App(); // [!code ++]

$app->get('/', function (Request $request, Response $response, $args) { // [!code --]
$app->get('/', function () use ($leaf) { // [!code ++]
    $name = $args['name']; // [!code --]
    $name = $leaf->request()->get('name'); // [!code ++]

    $response->getBody()->write("Hello, $name"); // [!code --]
    return $response; // [!code --]
    $leaf->response()->markup("Hello, $name"); // [!code ++]
});

$app->run();
```

After making these changes, you can run your application and see that it still works as expected. It should look something like this:

```php
<?php

use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();
$leaf = new Leaf\App();

$app->get('/', function () use($leaf) {
    $name = $leaf->request()->get('name');
    $leaf->response()->markup("Hello, $name");
});

$app->run();
```

## Replacing Router Interfaces

We've replaced the request and response objects, but we still need to replace the router. Leaf's router is an extremely powerful and flexible router that can handle any type of route. Since we already installed the `leaf` module, we can start using Leaf's router.

```php
<?php

use Slim\Factory\AppFactory; // [!code --]

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create(); // [!code --]
$app = new Leaf\App(); // [!code ++]

$app->get('/', function () use($leaf) { // [!code --]
$app->get('/', function () use($app) { // [!code ++]
    $name = $app->request()->get('name');
    $app->response()->markup("Hello, $name");
});

$app->run();
```

After verifying that your application still works, you can remove the Slim framework from your application. You can now start using Leaf's features and modules in your application. The final code should look like this:

```php
<?php

require __DIR__ . '/../vendor/autoload.php';

$app = new Leaf\App();

$app->get('/', function () {
    $name = request()->get('name');
    response()->markup("Hello, $name");
});

$app->run();
```

## Functional Mode

Leaf provides a functional mode that allows you to use Leaf without creating an instance of the `Leaf\App` class or any other Leaf modules. It offers a more functional approach to building applications, but we recommend using this only after you have migrated the core parts of your application.

```php
<?php

require __DIR__ . '/../vendor/autoload.php';

app()->get('/', function () {
    $name = request()->get('name');
    response()->markup("Hello, $name");
});

app()->run();
```
