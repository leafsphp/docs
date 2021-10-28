# 🏀 Skeleton Controllers

Instead of defining all of your request handling logic as closures in your route files, you may wish to organize this behavior using "controller" classes. Controllers can group related request handling logic into a single class. For example, a `UserController` class might handle all incoming requests related to users, including showing, creating, updating, and deleting users. By default, controllers are stored in the `App/Controllers` directory.

## Writing Controllers

### Basic Controllers

Let's take a look at an example of a basic controller. Note that the controller extends the base controller class included with Skeleton. The base controller further extends Leaf's base controller, and since all your controllers extend that base controller, you can share behaviours and variables between all your controllers. A simple controller would look like this:

```php
<?php
namespace Controllers;

use Models\User;

class UsersController extends Controller
{
  /**
   * Show the profile for a given user.
   *
   * @param  int  $id
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
app()->setNamespace("\Controllers");

app()->get("/user/(\d+)", "UsersController@show");
```

When an incoming request matches the specified route URI, the show method on the `Controllers\UserController` class will be invoked and the route parameters will be passed to the method.

### Resource Controllers

Leaf resource routing assigns the typical create, read, update, and delete ("CRUD") routes to a controller with a single line of code. You may register a resource route that points to the controller:

```php
app()->resource("/items/(\d+)", "UsersController");
```

This single route declaration creates multiple routes to handle a variety of actions on the resource. The generated controller will already have methods stubbed for each of these actions:

```php
<?php
namespace Controllers;

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
| GET            |  /items                 | index   |
| GET            |  /items/create          | create  |
| POST           |  /items                 | store   |
| GET            |  /items/{photo}         | show    |
| GET            |  /items/{photo}/edit    | edit    |
| POST/PUT/PATCH |  /items/{photo}         | update  |
| DELETE         |  /items/{photo}         | destroy |

### API Resource Routes

When declaring resource routes that will be consumed by APIs, you will commonly want to exclude routes that present HTML templates such as `create` and `edit`. For convenience, you may use the `apiResource` method to automatically exclude these two routes:

```php
app()->apiResource("/photos", "PhotosController");
```

## Next Steps

- [Leaf Core APIControllers](/leaf/v/2.5.0/core/api-controller)
- [Leaf Core Controllers](/leaf/v/2.5.0/core/controller)
- [Models](/skeleton/v/2.0/core/models)

Built with ❤ by [**Mychi Darko**](//mychi.netlify.app)
