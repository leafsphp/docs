# Custom Libraries

We usually recommend abstracting repetitive code into helpers, but sometimes you might want to write some application logic that doesn't fit into a controller, model, or helpers. It makes sense to create a custom library for this functionality. For example, you might want to create a library that calculates the distance between two points on a map. You could then use this library in any controller, helper, or view.

Custom libraries are not stored in the `app` folder because they are not autoloaded by Leaf MVC. Instead, you can store them in the `lib` folder which Leaf will then pick up. Things are done this way because you may not always have a library that follows an autoloadable structure and may need to be `require`d manually.

## Autoloading Libraries

Leaf MVC only loads items in the `app` folder by default. To add any external library to your project, you need to set Leaf MVC up for it using the console. You can do this by running the following command:

```bash:no-line-numbers
php leaf config:lib
```

That's it! A `lib` folder will be created in your application root and Leaf will now autoload any library you place in this folder.

<!-- ::: info Older Leaf MVC versions
If you are using an older version of Leaf MVC where you don't have the `config:lib` command, you simply need to head over to your `public/index.php` file and uncomment the following line:

```php
// \Leaf\Core::loadLibs();
```

::: -->

## Creating a Library

To create a library, simply create a new file in the `lib` folder. For example, let's create a library called `Math.php`:

```php
<?php

namespace MyRandom\Name\Space;

class Math {
  public static function add($a, $b) {
    return $a + $b;
  }
}
```

## Using a Library

To use a library, you must first import it. You can then use it like any other class. For example, let's import the `Math` library we created above:

```php
<?php

namespace App\Controllers;

use MyRandom\Name\Space\Math;

class HomeController extends Controller {
  public function index() {
    $sum = Math::add(1, 2);
    echo view('home', ['sum' => $sum]);
  }
}
```

## Library Structure

As mentioned above, libraries can be just about anything. They are completely based on your own preference. However, it is recommended that you keep your libraries as simple as possible. Below is the same `Math` library from above, but this time it is a simple function instead of a class:

```php
<?php

namespace Lib;

function add($a, $b) {
  return $a + $b;
}
```

You can then use this library like so:

```php
<?php

namespace App\Controllers;

use function Lib\add;

class HomeController extends Controller {
    public function index() {
        $sum = add(1, 2);
        echo view('home', ['sum' => $sum]);
    }
}
```

## Using a non-autoloadable library

Some older libraries may not follow the autoloadable structure but are linked together using `require` statements. You can still use these libraries in your Leaf MVC application. To use such a library, you need to add it's index file to the `lib` folder and require any other files it needs in the index file. For example, let's say you have a library called `MyLibrary` that has the following structure:

```bash:no-line-numbers
MyLibrary/
  index.php
  file1.php
  file2.php
```

You can add this library to your Leaf MVC application by moving the `MyLibrary` folder to the `lib` folder and creating an `index.php` file in the `MyLibrary` folder that requires the other files:

```bash:no-line-numbers
app/
lib/
  mylibrary.php
  MyLibrary/
    index.php
    file1.php
    file2.php
```

And in `lib/mylibrary.php`:

```php
<?php

require __DIR__ . '/MyLibrary/index.php';
```

From here, you can use `MyLibrary` and all it's functions in your Leaf MVC application.
