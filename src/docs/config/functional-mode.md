# Functional Mode

Leaf, just like any other framework, is made of many individual classes and components that work together to make your app work. These classes are usually instantiated and used in your app to make it work. However, using classes can sometimes be a bit too much for simple apps or APIs.

Classes are powerful, but easily get bulky and lengthy, difficult to scope, and plain annoying especially when you have to declare lengthy namespaces in every file you use them in. This is where functional mode comes in.

![image](https://github.com/user-attachments/assets/a8ae49d4-b4bc-42ac-b578-951ebe6ebb75)

Functional mode is just an elegant way to use Leaf without having to import classes or instantiate them. It's a way to use Leaf in a more functional way, without having to rely on classes. Leaf does all the class instantiation and importing for you under the hood.

Functional mode is 100% optional and requires zero setup or configuration since it's available right after installing Leaf.

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  response()->json(['message' => 'Leaf is amazing!']);
});

app()->run();
```

Using classes, the above code would look like this:

```php
<?php

use Leaf\App;

require __DIR__ . '/vendor/autoload.php';

$app = new App;

$app->get('/', function () use ($app) {
  $app->response()->json(['message' => 'Leaf is amazing!']);
});

$app->run();
```

As seen in the examples above, functional mode allows you to use Leaf without having to import classes or instantiate them. This gives you powerful tooling and lets you get rid of imports, namespaces and lengthy initializers.

Most Leaf modules are built to work in both functional and class modes. You can use the functional mode functions or the class methods interchangeably, although the functional mode functions are usually shorter and more concise.

The documentation will usually show you how to use modules in functional mode, but will also show you how to use them in class mode if you prefer that.
