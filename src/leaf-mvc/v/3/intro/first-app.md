# Your first leaf MVC app ✨

Before you go on, leaf MVC is powered by [Leaf](/leaf), so we'll recommend getting familiar with the core [Leaf package](/leaf) first. Not to worry, it takes just about 5-10 minutes to completely learn the basics if you've used any PHP framework before.

Note that all your development is done in the `App` directory. By default, a few demos have been created to give you a quick idea on how leaf MVC works.

## Introduction 📖

This is a little "tutorial" put together to introduce you to leaf MVC, and help you learn all needed concepts. We'll be building a simple blog to demonstrate how leaf MVC works. We’ll be using models, request, views, controllers, migrations, leaf’s command line tool and a whole lot of other tools provided for us.😎

**Note: If you are not familiar with PHP, we recommend that you check out the [W3Schools PHP Tutorial](https://www.w3schools.com/php/default.asp) before continuing.**

## Our First App

In the [previous section](/leaf-mvc/v/2.0/?id=Installation), we looked at installation, leaf MVC's directory structure and running your project, it's assumed you've already read this section. After following the installation instructions, your leaf MVC structure should be initialized for you. You can run the intro app with

```bash
php leaf serve
```

When we take a look at our `index.php` file, we see that Leaf Core is initialised and a bunch of files including our routes are imported.

As such, `index.php` serves as our project root. Every request/page load passes through `index.php` first and this is done because of the [.htaccess](/leaf/v/2.4.3/intro/htaccess) file.

### Routing

In v2, the `Routes.php` file has been replaced with the `Routes` directory. If you however want to continue using the `Routes.php`, you can create a `Routes.php` file and link it in the `index.php` file in the root directory.

Example routes have been created to give you a fair idea on how to handle routing with Leaf. You can check out Leaf router's docs [here](/leaf/v/2.4.3/routing/).

Now, let’s get started.

```php
<?php
$app->get('/', function() {
  // Do something here
});

Route("GET", "/", function() {
  // Do something here
});

# New in leaf v2.4
use Leaf\Router;

Router::get("/", function() {
  // Do something here
});
```

This is what a basic Leaf route looks like.

But in this case we're working in an MVC environment, we would want controllers to handle various routes, so, let's do just that.

### Using Controllers

The first thing we need to do to use a controller is obviously to create the controller. Our controllers are kept in `App/Controllers`…you can manually create your controller in this directory, but there’s a better way😊. Remember we talked about the Leaf Console? We’re going to generate a controller now using the Leaf console tool. Open up your console and type:

```bash
php leaf g:controller PagesController

# aloe is smart, you can get away with this 
php leaf g:controller pages

# good console gone eeevil 😈
php leaf g:con pages
```

This will generate `PagesController` in our `App/Controllers` directory

Back in our routes file, we can use this controller like so:

```php
$app->get('/', '\App\Controllers\PagesController@index');

Route("GET", "/", "\App\Controllers\PagesController@index");

# New in leaf v2.4
use Leaf\Router;

Router::get("/", "\App\Controllers\PagesController@index");
```

Although this is perfectly fine, it's quite annoying to type `\App\Controllers` for every route, so we can set a namespace for all our routes.

```php
$app->setNamespace("\App\Controllers");

$app->get("/", "PagesController@index");

# New in leaf v2.4
use Leaf\Router;

Router::get("/", "PagesController@index");
```

Now, let's create a basic controller that just outputs some JSON. Leaf comes with a really powerful console tool which allows you to generate files, interact and run commands on your leaf MVC. We can generate our controller like this:

```sh
php leaf g:controller <name>
```

Aloe CLI tool is smart, and enforces naming conventions used by other frameworks like laravel, ruby on rails and django. Aloe CLI has a powerful file generation system that always seems to understand what you want to do, as such, it cuts down the amount of time working with files significantly.

In this case, this particular controller @ method index, is supposed to output a view. There are a bunch of ways to output views in Leaf MVC. You can simply output a bunch of markup with `markup`.

```php
markup("<h2>Hello</h2>");
```

Of course, this isn't that practical😆

The next method is to output a static HTML/PHP page. Of course, this method is more practical.

```php
response()->page("./index.html");
```

The final method is to use a templating engine. This is the most common method people use when it comes to displaying views. Leaf comes with Leaf blade by default which you can utilize by simply calling `view` or `render`. Let's use that in our controller.

```php
<?php

namespace App\Controllers;

class PagesController extends Controller {
  public function index()
  {
    render("pages.home");
  }
}
```

Now, we need to define `pages/home.blade.php` so we don't get an error when we load this route. We can do this quickly with aloe cli:

```sh
php leaf g:template pages/home
```

*Quick tip: Aloe allows you to generate templates for other systems too. You can pass a -t with any of these values (html, jsx, vue, blade) to specify what view you prefer. Defaults to blade if nothing is provided.*

### Request

Response/Views send data out of our application, on the flip side, Request handles the data that comes into our application. You can find Leaf Request docs [here](/leaf/v/2.4.3/http/request).

Let's look at a basic example. Inside our controller:

```php
public function search() {
  $keywords = $this->request->get("keywords");

  // ... handle search operation
  $this->json($results);
}
```

There are however global methods like `json` we saw above. You can use these methods from anywhere within your app. There are also global methods for request as well: `requestData` or `request` and `requestBody`, using global methods, the example above will look like this:

```php
public function search() {
  $keywords = requestData("keywords");

  // ... handle search operation
  render("search", ["results" => $results]);
}
```

Now in leaf MVC v2, the whole request object is available on the `request` method. The `request` method can also be used to get items from the request.

```php
// get username
$username = request("username");

// get username
$username = request()->get("username");
```

Leaf v2.4.3 allows you to use request methods statically which means you can also do this:

```php
use Leaf\Http\Request;

public function search() {
  $keywords = Request::get("keywords");

  // ... handle search operation
  render("search", ["results" => $results]);
}
```

### Models & Migrations

Our models represent our data layer, usually from a database. Our models are kept in the `App/Models` directory. Controllers get required information from models which is then passed into the response. We won't be doing much work in the model itself, since all the ground work has already been done by Leaf Core.

***To use your database, you have to head to `.env` and configure your database: set the databse name, username, password...***

In v2, after configuring your .env variables, if the database doesn't exist, you can create it with Leaf console instead of using some database management tool or writing some scripts.

```bash
php leaf db:install
```

Now, let's generate a model.

```bash
php leaf g:model Post
```

This will generate a simple model.

If we don't have a `posts` table, we can create a migration along with the model. Migrations help us create/manage database tables right off the bat without writing long SQL.

```bash
php leaf g:model Post -m
```

After this, you should find a new migration in `App\Database\Migrations` looking like `YYYY_MM_DD_TIME_create_posts.php`. So, in this file, we can create all the rows we want inside our table.

```php
<?php

namespace App\Database\Migrations;

use Leaf\Database;
use Illuminate\Database\Schema\Blueprint;

class CreateUsers extends Database {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()  {
    if(!$this->capsule::schema()->hasTable("posts")):
      $this->capsule::schema()->create("posts", function (Blueprint $table) {
        $table->increments('id');
        $table->unsignedBigInteger('user_id');
        $table->string('title');
        $table->text('body');
        $table->timestamp('post_verified_at')->nullable();
        $table->timestamps();
      });
    endif;
  }
  
  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    $this->capsule::schema()->dropIfExists("posts");
  }
}
```

After that, we can run our migrations from the console with:

```bash
php leaf db:migrate
```

So now we can work with the table we generated. Let's look at our model. You can read more on [Leaf Models](/leaf/v/2.4.3/core/model)

```php
<?php
namespace App\Models;

class Post extends Model {
  //
}
```

### Using our model

As mentioned before, we don't really do much in the model. The magic happens in our controller. Let's generate a new controller.

```bash
php leaf g:controller Posts --resource
```

We added the resource flag to it in order to generate a `resource controller`.

When we look in `App/Controllers/PostsController`, we see:

```php
<?php
namespace App\Controllers;

class PostsController extends Controller {
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

A resource controller is filled with resource methods which quickly help us perform CRUD functions.

So let's say we have a database named `blog` with a table named `posts` which has some data in it, to retrieve all the data in the `posts` table, we'll head to our controller. The first thing we'll have to do is link the resource controller to our routes. Leaf provides a simple way to do this:

```php
$app->resource("/posts", "PostsController");
```

With this, leaf will create all the required routes for your resource controller. Check out the [routing docs](/leaf/v/2.4.3/routing/?id=resource-routes) for a break down on resource routes. Next, we need to bring in our `Post` model so we can use our database.

```php
<?php
namespace App\Controllers;

// our model
use App\Models\Post;

class PostsController extends Controller {
  public function __construct() {
    .....
```

Now let's head over to our index method and enter this:

```php
public function index() {
  render("posts", ["posts" => Post::all()]);
}
```

`Post::all()` is a method which will query our database and retrieve all our `posts` for us, we're using `json()` to send all our posts to a client as JSON.

So when we navigate to `/posts` in our browser, we see all our posts in JSON format.

For a blog app, we'd usually want to see our latest posts first, so we can order the posts by the time they were created. In our controller,

```php
public function index() {
  render("posts", ["posts" => Post::orderBy('id', 'desc')->get()]);
}
```

This will get the latest posts first.

Next, we'll want to show a particular post when we navigate to `/post/{id}` eg: when we go to `/posts/2` in our browser, we would want to see the post 2...so, in our controller's show method, we simply have to get that particular post and pass it into the response. We can get the current post with `Post::find($id);`

```php
public function show($id) {
  render("post", ["posts" => Post::find($id)]);
}
```

Here are a bunch of other cool stuff you can do wiith the model in our controller,

```php
// find a post by title
Post::where('title', 'Post Two')->get();

// create a new post
$post = new Post;
$post->title = request("title");
$post->body = request("body");
$post->save();

// delete a post
$post = Post::find($id);
$post->delete();
```

## Next Steps

- [Routing](/leaf-mvc/v/2.0/core/routing)
- [Leaf Console](/leaf-mvc/v/2.0/utils/console)
- [Helper Functions](/leaf-mvc/v/2.0/utils/functions)
- [Controllers](/leaf-mvc/v/2.0/core/controllers)

Built with ❤ by [**Mychi Darko**](//mychi.netlify.app)
