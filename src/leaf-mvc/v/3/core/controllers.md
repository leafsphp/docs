# 🏀 leaf MVC Controllers

Instead of defining all of your request handling logic as closures in your route files, you may wish to organize this behavior using "controller" classes. Controllers can group related request handling logic into a single class. For example, a `UserController` class might handle all incoming requests related to users, including showing, creating, updating, and deleting users. By default, controllers are stored in the `App/Controllers` directory.

## Writing Controllers

### Generating Controllers

<p class="alert -warning">
  v2 of leaf MVC completely replaces Leaf's standard console tool with <a href="/#/aloe-cli/">aloe cli</a>
</p>

All leaf MVC controllers are kept in the `App/Controllers` directory. So you can manually create your own Controller there, but the recommended method is to use the [aloe cli](/aloe-cli/). So, in the root of your leaf MVC project, open up your console and type:

```sh
php leaf g:controller <Name>
```

Aloe CLI always tries to make your job as simple as possible, hence, you don't even need to add the `Controller` part to the controller name, so instead of `AppsController`, you can just type `Apps`, aloe does the rest for you.

```sh
php leaf g:controller Apps
```

Even better, you don't need to type out `g:controller`, just `g:con` or anything along those lines is fine.

Aloe also includes support for other types of controllers like [resource controllers](/leaf-mvc/v/2.0/core/controllers?id=resource-controllers). You can generate a resource controller like this:

```sh
php leaf g:controller <Name> --resource
# or
php leaf g:controller <Name> -r
```

### Basic Controllers

Let's take a look at an example of a basic controller. Note that the controller extends the base controller class included with leaf MVC. The base controller further extends Leaf's base controller, and since all your controllers extend that base controller, you can share behaviours and variables between all your controllers. A simple controller would look like this:

```php
<?php
namespace App\Controllers;

use App\Models\User;

class UsersController extends Controller
{
  /**
   * Show the profile for a given user.
   *
   * @param  int  $id
   * @return \Illuminate\View\View
   */
  public function show($id)
  {
    json([
      'user' => User::findOrFail($id)
    ]);
  }
}
```

You can define a route to this controller method like so:

```php
// this is done for you by default
app()->setNamespace("\App\Controllers");

app()->get("/user/(\d+)", "UsersController@show");
```

When an incoming request matches the specified route URI, the show method on the `App\Controllers\UserController` class will be invoked and the route parameters will be passed to the method.

### Resource Controllers

Leaf resource routing assigns the typical create, read, update, and delete ("CRUD") routes to a controller with a single line of code. To get started, we can use the `g:controller` command's `--resource` option to quickly create a controller to handle these actions:

```sh
php leaf g:controller Photos --resource
```

This command will generate a controller at `App/Controllers/PhotosController.php`. The controller will contain a method for each of the available resource operations. Next, you may register a resource route that points to the controller:

```php
app()->resource("/user/(\d+)", "UsersController");
```

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

### API Resource Routes

When declaring resource routes that will be consumed by APIs, you will commonly want to exclude routes that present HTML templates such as `create` and `edit`. For convenience, you may use the `apiResource` method to automatically exclude these two routes:

```php
app()->apiResource("/photos", "PhotosController");
```

### Other Aloe Flags

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

### Controller Help (Aloe CLI)

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

- [Leaf Core APIControllers](/leaf/v/2.4.3/core/api-controller)
- [Leaf Core Controllers](/leaf/v/2.4.3/core/controller)
- [Models](/leaf-mvc/v/2.0/core/models)
- [Migrations](/leaf-mvc/v/2.0/database/migrations)

Built with ❤ by [**Mychi Darko**](//mychi.netlify.app)
