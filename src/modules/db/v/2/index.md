# Getting Started
<!-- markdownlint-disable no-inline-html -->

## Installation

You can install Leaf Db with Leaf CLI:

```sh
leaf install db
```

Or with composer:

```sh
composer require leafs/db
```

From there, you can link your database and start writing some awesome queries.

::: info Coming from v1
If you are coming from Leaf Db v1, we recommend checking the [changelog](/modules/db/v/2/new)
:::

## Db Connection

After installing leaf db, you will need to connect to your database to get started. There are multiple ways to connect to your database using leaf db.

### connect on init

This method connects to the database when initializing Leaf Db.

```php
// syntax
$db = new Leaf\Db(
  $host = '',
  string $dbname = '',
  string $user = '',
  string $password = '',
  string $dbtype = 'mysql'
);

// example
$db = new Leaf\Db('127.0.0.1', 'db_name', 'root', 'password123');
```

Leaf db takes in 5 optional parameters:

- The database host eg: localhost
- The database name
- The database username
- The database password
- The PDO database driver eg: mysql, pgsql, ...

Alternatively, you can pass an array into the host parameter to connect to your database like this:

```php
// syntax
$db = new Leaf\Db([
  'dbtype' => 'mysql',
  'charset' => null,
  'port' => null,
  'unixSocket' => null,
  'host' => '127.0.0.1',
  'username' => 'root',
  'password' => '',
  'dbname' => '',
]);

// example
$db = new Leaf\Db([
  'host' => '127.0.0.1',
  'username' => 'root',
  'password' => 'password123',
  'dbname' => 'db name',
]);
```

You only need to pass the fields you want to configure.

### connect

Connect takes in 4 params just like the method above

```php
$db = new Leaf\Db;

// syntax
$db->connect(
  $host = '',
  string $dbname = '',
  string $user = '',
  string $password = '',
  string $dbtype = 'mysql',
  array $pdoOptions = []
);

// example
$db->connect('127.0.0.1', 'dbname', 'root', '');
```

Connect works the same way as the constructor, except that it accepts one more parameter: `$pdoOptions` which is a bunch of configuration specific to the `PDO` class.

### autoConnect

This method allows you to connect to your database from parameters in a `.env` file. Most MVC frameworks and other libraries rely on a `.env` for a lot of configurations including the database. With `autoConnect`, you can directly pick up these configs.

**example env:**

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=LeafMVC
DB_USERNAME=root
DB_PASSWORD=
```

**App:**

```php
$db = new Leaf\Db;
$db->autoConnect();
```

### PDO connection

Leaf Db also allows you to skip the entire connection process and share an existing PDO instance with leaf db. This allows you to gradually rewrite your existing apps with Leaf Db without having multiple db connections and doing so at your own pace.

```php
$db = new PDO('mysql:dbname=test;host=127.0.0.1', 'root', '');

db()->connection($db);

// you can use leaf db the same way you always have
```

## Functional Mode

If you are using leaf db v2 in a leaf 3 app, you will have access to the `db` global which allows you to use Leaf Db from anywhere in your entire application. You simply need to call `db()` and leaf 3 will create and maintain a shared instance of Leaf db which you can call from anywhere.

This also means that you don't need to initialize leaf db anymore.

```php
<?php

require __DIR__ . "/vendor/autoload.php";

db()->connect('127.0.0.1', 'test');

app()->get("/", function () {
  // db can be used here
  // db()->...
});

app()->run();
```

## Simple queries

Leaf Db provides a ton of functionality, with a bunch of powerful tools, but at the same time gives you a great deal of customizations with the `query` method. You can write your raw SQL queries with the `query` method, however you can still use the cool features Leaf Db provides.

```php
$users = db()->query('SELECT * FROM users')->all();
```

You can also use parameter binding with `query`

```php
db()->query('SELECT * FROM users WHERE id = ?')->bind('1')->fetchObj();
```

A shorter method would be to use `where`

```php
db()->query('SELECT * FROM users')->where('id', '1')->fetchObj();
```

You don't have to worry about security, `where` uses prepared statements by default, so you're pretty good.

You've seen all this, but guess what? There's something even shorter

```php
db()->select('users')->where('id', '1')->fetchObj();
```

This is what Leaf Db does for you. A new way to write your Database queries without actually needing to write any real queries. Also, unlike other query builders, there's no need to create classes and models for every table you want to fetch from. Everything's accessible with one line of code.

## Running queries

There are different types of queries, some return values and others don't. Leaf Db provides a seamless way of handling both.

### execute

`execute` is a method on Leaf Db which allows you to run a query instantly. The `execute` method is used when the query is **NOT** expected to return a value.

```php
db()->query('CREATE DATABASE dbname')->execute();
```

### fetchAll

`fetchAll` is a method simply returns all the results of a query. Under the hood, the query is run using `execute` and the value is retrieved and returned. This method is used when there are a lot of values to return.

```php
$users = db()->query('SELECT * FROM users')->fetchAll();
```

::: tip Aliases
`fetchAll` has aliases adapted from other libraries and frameworks. Instead of `fetchAll`, you can use `all` and `get`

```php
$users = db()->query('SELECT * FROM users')->all();
$users = db()->query('SELECT * FROM users')->get();
```

:::

In this case, the `$users` variable with contain an array of associative arrays, but if you want an array of objects, you can pass `obj` or `object` as a parameter into `fetchAll`

```php
$users = db()->query('SELECT * FROM users')->fetchAll('obj');
$users = db()->query('SELECT * FROM users')->all('object');
$users = db()->query('SELECT * FROM users')->get('obj');
```

### fetchObj

`fetchObj` is a method that fetches the next row and returns it as an object. It returns only one object, so it should be used only on queries that return a single item.

```php
$user = db()->query('SELECT * FROM users WHERE id = 1')->fetchObj();
```

::: tip Aliases
Instead of `fetchObj`, you can use `obj`

```php
$user = db()->query('SELECT * FROM users WHERE id = 1')->obj();
```

:::

::: warning Watch out
`fetchObj` returns an object, so you can use the result like this:

```php
$user = db()->query('SELECT * FROM users WHERE id = 1')->obj();;
$user->id // not $user["id"]
```

:::

### fetchAssoc

`fetchAssoc` is a method that fetches the next row and returns it as an array. It returns only one array, so it should be used only on queries that return a single item.

```php
$user = db()->query('SELECT * FROM users WHERE id = 1')->fetchAssoc();
```

::: tip Aliases
Instead of `fetchAssoc`, you can use `assoc`

```php
$user = db()->query('SELECT * FROM users WHERE id = 1')->assoc();
```

:::

::: warning Watch out
`fetchAssoc` returns an array, so you can use the result like this:

```php
$user = db()->query('SELECT * FROM users WHERE id = 1')->assoc();;
$user['id'] // not $user->id
```

:::

### first

`first` returns the first item in the database that matches the condition given.

```php
$user = db()->query('SELECT * FROM users')->first();
```

Although all our users are saved in the `users` table, `first` will return only the first record.

### last

`last` returns the last item in the database that matches the condition given.

```php
$user = db()->query('SELECT * FROM users')->last();
```

Although all our users are saved in the `users` table, `last` will return only the last record.

<!-- ## Next Steps

<div class="vt-box-container next-steps">
  <a class="vt-box h:_10 w:50" href="/modules/db/v/2/builder">
    <h3 class="next-steps-link mb:_1">Continue the Guide</h3>
    <small class="next-steps-caption">Learn how to build queries with Leaf Db's developer friendly syntax.</small>
  </a>
  <a class="vt-box ml:_1" href="/modules/db/v/2/new" target="_blank">
    <h3 class="next-steps-link">Follow the Tutorial</h3>
    <small class="next-steps-caption">For those who prefer learning things hands-on. Let's build something real!</small>
  </a>
  <a class="vt-box w:50 ml:_1" href="/modules/db/v/2/new">
    <h3 class="next-steps-link">What's new in v2</h3>
    <small class="next-steps-caption">Check out all the changes in this new version of leaf db.</small>
  </a>
</div> -->
