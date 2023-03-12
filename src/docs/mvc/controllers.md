# Controllers

<!-- markdownlint-disable no-inline-html -->

Instead of using Closures in route files to define all your request handling logic, you can use controllers to organize this behavior. Controllers can group related request handling logic into a single class. For instance, 
you may want to group all logic that handles user account details into an `AccountsController` class: actions such as displaying, creating, updating, and deleting users.

Controllers can also be shared among different route files, giving you a single location to define a controller that can be used in different contexts throughout your application. Leaf MVC and Leaf API controllers are stored in the `app/controllers` directory while Skeleton controllers are stored in the `controllers` directory.

## Generating Controllers

::: warning Leaf Console
This section only applies to Leaf MVC and Leaf API. If you're using Skeleton, you can skip this section.
:::

Leaf MVC and Leaf API come with a console helper that can generate a new controller for you. To create a new controller, use the `g:controller` command:

```bash
php leaf g:controller users
```

This will create a new `UsersController` class in the `app/controllers` directory. The controller will contain a single method, `index`, that returns a simple string:

```php
<?php

namespace App\Controllers;

class UsersController extends Controller
{
    public function index()
    {
        response()->json([
            'message' => 'UsersController@index output'
        ]);
    }
}
```

You can see that the controller extends the `App\Controllers\Controller` class. This is the base controller class provided by Leaf MVC, Leaf API or Skeleton. It contains serves as the parent class for all your application's controllers.

## Defining Controllers

The above section looked at generating a new controller using the console helper in Leaf MVC and Leaf API. If you're using Skeleton, you can create a new controller by creating a new PHP file in the `controllers` directory. The file should contain a class that extends the `Controllers\Controller` class. The class should also contain at least one public method that returns a response.

For example, let's create a new controller that returns a simple string:

```php
<?php

namespace Controllers;

class HomeController extends Controller
{
    public function index()
    {
        return 'Hello World!';
    }
}
```

You can define a route to this controller action like so:

<div class="class-mode">

```php
$app->get('/', 'HomeController@index');
```

</div>
<div class="functional-mode">

```php
app()->get('/', 'HomeController@index');
```

</div>

## Resource Controllers

::: warning Skeleton
Skeleton does not come with a console helper to generate resource controllers. If you're using Skeleton, you need to create the controller yourself.
:::

Leaf resource routing assigns the typical create, read, update, and delete ("CRUD") routes to a controller with a single line of code. To get started, we can use the `g:controller` command's `--resource` option to quickly create a controller to handle these actions:

```sh
php leaf g:controller Photos --resource
```

This command will generate a controller at `app/controllers/PhotosController.php`. The controller will contain a method for each of the available resource operations. Next, you may register a resource route that points to the controller:

```php
app()->resource("/user/(\d+)", "UsersController");
```

The `resource` method accepts a URI and a controller name. The URI may contain route parameters, which will be passed to the controller methods. The controller name should be the fully-qualified class name of the controller. In this example, the `UsersController` class should be defined in the `app/controllers` directory on Leaf MVC and Leaf API or the `controllers` directory on Skeleton.

This single route declaration creates multiple routes to handle a variety of actions on the resource. The generated controller will already have methods stubbed for each of these actions:

```php
<?php
namespace App\Controllers;

class ClassName extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store() {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id) {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) {
        //
    }
}
```

Also routes are mapped to these methods:

| Verb           |   URI                   | Action  |
|----------------|-------------------------|---------|
| GET            |  /photos                | index   |
| GET            |  /photos/create         | create  |
| POST           |  /photos                | store   |
| GET            |  /photos/{photo}        | show    |
| GET            |  /photos/{photo}/edit   | edit    |
| POST/PUT/PATCH |  /photos/{photo}        | update  |
| DELETE         |  /photos/{photo}        | destroy |

::: tip Leaf API Resource Controllers
Leaf API resource controllers don't have a `create` or `edit` method. This is because Leaf API does not have a view layer like Leaf MVC and Skeleton.

| Verb           |   URI                   | Action  |
|----------------|-------------------------|---------|
| GET            |  /photos                | index   |
| POST           |  /photos                | store   |
| GET            |  /photos/{photo}        | show    |
| POST/PUT/PATCH |  /photos/{photo}        | update  |
| DELETE         |  /photos/{photo}        | destroy |

:::

## Leaf Console Helper

::: warning Leaf Console
This section only applies to Leaf MVC and Leaf API. If you're using Skeleton, you can skip this section.
:::

You can also generate a model together with your controller.

```bash
php leaf g:controller <ControllerName> -m
```

Create a template for your controller

```bash
php leaf g:controller <ControllerName> -t
```

Create a model and migration for your  controller

```bash
php leaf g:controller <ControllerName> -a
```

### Controller Help

```bash
Description:
  Create a new controller class

Usage:
  g:controller [options] [--] <controller>

Arguments:
  controller            controller name

Options:
  -a, --all             Create a model and migration for controller
  -m, --model           Create a model for controller
  -r, --resource        Create a resource controller
  -w, --web             Create a web(ordinary) controller
  -h, --help            Display this help message
  -q, --quiet           Do not output any message
  -V, --version         Display this application version
      --ansi            Force ANSI output
      --no-ansi         Disable ANSI output
  -n, --no-interaction  Do not ask any interactive question
  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debu
```

## Next Steps

Follow along with the next steps to learn more about Leaf MVC.

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/docs/mvc/routing">
    <h3 class="next-steps-link">Routing</h3>
    <small class="next-steps-caption">Learn how routing works in your Leaf applications.</small>
  </a>
  <a class="vt-box" href="/docs/mvc/views">
    <h3 class="next-steps-link">Views</h3>
    <small class="next-steps-caption">Learn how to use views in your Leaf applications.</small>
  </a>
  <a class="vt-box" href="/docs/mvc/models">
    <h3 class="next-steps-link">Models</h3>
    <small class="next-steps-caption">Learn how to configure and use models in your Leaf apps.</small>
  </a>
</div>
