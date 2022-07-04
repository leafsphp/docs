# Your first app

::: info Pre-requisites

- Basic PHP knowledge

:::

This is an interactive tutorial to help you get started with leaf, right from installation to building your first leaf 3 app. This tutorial will require basic PHP knowledge with an optional knowledge on APIs.

## Getting started

::: tip Leaf CLI
We recommend using the [Leaf CLI](https://cli.leafphp.dev) for creating and managing your Leaf projects.
:::

To get started, we will need to generate a leaf application. We can do this simply with Leaf CLI:

```sh
leaf create <your-project-name> --basic --v3
```

<!-- ```sh
$ leaf init

✔ Project name: … <your-project-name>
✔ Select a preset … MVC, API, Skeleton, Basic
✔ Add Leaf Auth for authentication? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Generate sample tests? … No / Yes

Scaffolding project in ./<your-project-name>...
Done.
``` -->

Or with composer:

```sh
composer require leafs/leaf v3.0-rc
```

After this, you will need to create an `index.php` file. *This is already done for you if you used Leaf CLI.*

## Your app starter

Now that leaf is installed, you will need a file which will serve as the root of your project. Leaf uses a single root file, to which all routes are sent to. Leaf then takes the route and calls the related handler for it. You can read more in the [routing docs](/docs/routing/).

Your starter file will import leaf and hold your routes.

```php
<?php

require __DIR__ . '/vendor/autoload.php';
```

This above sort of imports our installed dependencies and allows us to use them without `require`ing or `include`ing them one by one.

From there, we can start building our app. We would normally need to initialize leaf, however, with with the introduction of functional mode, we don't need to do this. We can go straight to building our app.

Let's define a dummy route.

```php{1-3}
app()->get('/', function () {
  echo 'something';
});

// don't forget to call `run`
app()->run();
```

Defining a route is that simple with leaf. In this case, we just defined the `GET /` route. We can simply run this with `leaf serve` if you use the leaf CLI or `php -S localhost:[PORT]`.

## Our app

Now that we've gotten our hello world setup complete, we can get started with our application. We will build a simple note taking app which will allow us create and fetch notes from a database.

## Modules

Modules are pieces of leaf's functionality which are served as installable plugins. They were created in an attempt to stop leaf from bloating like other frameworks. This means that you can have only what you need in your app, and always extend Leaf's power on demand.

As you will see, modules are installed using the Leaf CLI or composer. For this app, we'll be using the `db` module to access our database.

## Getting our notes

### Creating our route

To get started with this step, we need to create a GET route which will return all the notes in our database. Since we already know how to create routes like the one above, this step is pretty simple.

```php
app()->get('/notes', function () {
  // fetch all notes from the database
  // output notes as JSON
  echo 'all notes';
});
```

### Fetching notes

As mentioned above, we will use the db module to access our database. Leaf DB has made database operations really simple and accessible to everyone. You don't even need knowledge on SQL to use Leaf DB.

#### Installing leaf db

To install the db module, we can use the Leaf CLI.

```sh
leaf install db
# or
leaf install leafs/db
```

You can also use composer:

```sh
composer require leafs/db
```

#### Connecting to our db

From there, we can head back inside our app and connect to our database.

```php
$db = new Leaf\Db;
$db->connect('127.0.0.1', 'dbname', 'username', 'password');
```

We can place this before before our routes so we can use the `$db` variable everywhere.

#### Using the db module

Back in our route, we can pass the `$db` variable into scope and get started with it. You can check the [db module docs](/modules/db/) for more info.

What we want to do here is retrieve all the data from our notes table, we can do this simply using `select`. This is a method provided by leaf db which allows us run the SQL `Select` command.

```php
$db = new Leaf\Db;
$db->connect('127.0.0.1', 'dbname', 'username', 'password');

// pass db into the callback using `use`
app()->get('/notes', function () use($db) {
  // fetch all notes from the database
  $notes = $db->select('notes')->all();

  // output notes as JSON
  echo 'all notes';
});
```

Now that we've been able to retrieve our data from the database, let's see how we can output this data.

### The response object

The response object is leaf's library for handling the way data flows out of your application. It has a very simple and easy to use interface, and with functional mode, it can be used from anywhere in your app without initilaizing it.

In the lines above, we retrieved our data from the database. Now all that's left is to output this data as JSON. We can do this simply by calling `json` on the response object.

```php
app()->get('/notes', function () use($db) {
  $notes = $db->select('notes')->all();

  response()->json([
    'status' => 'success',
    'data' => $notes,
  ]);
});
```

This will output JSON

```json
{
  "status": "success",
  "data": [...]
}
```

## Saving our notes

We need to create another route to handle adding new notes. In this case, we will create a POST route, meaning you will need to create a POST request to access it. This can be done using an HTTP client of some sort.

This new route will take some data into our application and then select only what we need to be saved in the database, and finally return a message.

```php
app()->post('/notes/new', function () use($db) {
  // get data from request
  // save items
  // return success message
});
```

### The request object

Just as we saw with the response object, Leaf also provides a request object which allows us to quickly and securely get data which flows into our application.

```php
$item = request()->get('item');
```

This line will get data with the key `item` passed into the app from a form, url or any other data and save it in the `$item` variable. In this case, our app will accept `title`, `body` and `date` which we will save in the database.

To do this, we can retrieve them one by one as we did above, but leaf provides an easier way.

```php
$data = request()->get(['title', 'body', 'date']);
```

With this, all other data passed in our app will be ignored, but will still be available for use.

### Saving data in the db

To save the data in the database, we will use leaf db as we did above. This time, the `insert` method instead.

```php
$db->insert('notes')->params($data)->execute();
```

`execute` is used on commands which don't return any value like `insert` and `update`.

Putting it all together, we'll have this:

```php
app()->post('/notes/new', function () use($db) {
  // get data from request
  $data = request()->get(['title', 'body', 'date']);

  // save items
  $db->insert('notes')->params($data)->execute();

  // return success message
  response()->json([
    'status' => 'success',
    'message' => 'Notes saved'
  ]);
});
```

## Putting it all together

```php
<?php

require __DIR__ . '/vendor/autoload.php';

$db = new Leaf\Db;
$db->connect('127.0.0.1', 'dbname', 'username', 'password');

app()->get('/notes', function () use($db) {
  $notes = $db->select('notes')->all();

  response()->json([
    'status' => 'success',
    'data' => $notes,
  ]);
});

app()->post('/notes/new', function () use($db) {
  $data = request()->get(['title', 'body', 'date']);

  $db->insert('notes')->params($data)->execute();

  response()->json([
    'status' => 'success',
    'message' => 'Notes saved'
  ]);
});
```

Building is this simple with leaf, as you can see, we've built a note taking app in less than 30 lines of code.
