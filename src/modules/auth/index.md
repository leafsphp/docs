# Authentication

<!-- markdownlint-disable no-inline-html -->

Numerous web applications offer their users a means to authenticate and access the application by "logging in." Adding this functionality to web applications can be a challenging and potentially dangerous task. For this reason, Leaf provides a lightweight but very powerful authentication system known as Leaf Auth.

Leaf Auth gives you clean and simple functions to handle complex authentication flows in a few lines of code. Leaf auth is customizable to the core and allows for a bunch of configuration options that determine how it handles authentication in general.

::: tip Note that
You can still handle authentication without using Leaf Auth. The idea behind Leaf Auth is to make authentication simpler.
:::

## Installing Leaf Auth

You can install Leaf Auth using the Leaf CLI:

```bash
leaf install auth
```

Or with composer:

```bash
composer require leafs/auth
```

From there, you can link your database and start writing some awesome queries.

## Database Considerations

Leaf Auth doesn't give you any structure for your database, with that, you can structure your database in any way you prefer. However, there are some things you should note:

### Database primary key

By default, Leaf Auth assumes that your database primary key is `id`. If however, you have a database where you are using another field, say `admin_id` as the primary key, you will need to tell Leaf Auth the name of your primary key. You can do this using the `ID_KEY` config:

<div class="class-mode">

```php
$auth = new Leaf\Auth;
$auth->config('ID_KEY', 'admin_id');

...
```

</div>

<div class="functional-mode">

```php
auth()->config('ID_KEY', 'admin_id');
```

</div>

### Database table

By default, Leaf Auth assumes that you will save your users in a database table named `users`, this might however not be the case for your application. If you want to use a different table, you can configure Leaf Auth using `DB_TABLE`:

<div class="class-mode">

```php
$auth = new Leaf\Auth;
$auth->config('DB_TABLE', 'admins');

...
```

</div>

<div class="functional-mode">

```php
auth()->config('DB_TABLE', 'admins');
```

</div>

## Database Connection

After installing leaf auth, you would need to connect to a database. Leaf auth will search for users and add/update users in this database when a login/register or update operation is called. There are a couple of ways to connect to a database with leaf auth.

### connect

The connect method allows you to pass in your database connection parameters directly to leaf auth.

<div class="class-mode">

```php
$auth = new Leaf\Auth;

// syntax
$auth->connect(
  $host = '',
  string $dbname = '',
  string $user = '',
  string $password = ''
);

// example
$auth->connect('127.0.0.1', 'dbname', 'root', '');
```

</div>

<div class="functional-mode">

```php
// syntax
auth()->connect(
  $host = '',
  string $dbname = '',
  string $user = '',
  string $password = ''
);

// example
auth()->connect('127.0.0.1', 'dbname', 'root', '');
```

</div>

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

<div class="class-mode">

```php
$auth = new Leaf\Auth;
$auth->autoConnect();
```

</div>

<div class="functional-mode">

```php
auth()->autoConnect();
```

</div>

### PDO connection

Leaf Auth also allows you to skip the entire connection process and share an existing PDO instance with leaf db. This allows you to gradually rewrite your existing apps with Leaf Auth without having multiple db connections and doing so at your own pace.

<div class="class-mode">

```php
$db = new PDO('mysql:dbname=test;host=127.0.0.1', 'root', '');
$auth = new Leaf\Auth;

$auth->dbConnection($db);

// you can use leaf auth the same way you always have
```

</div>

<div class="functional-mode">

```php
$db = new PDO('mysql:dbname=test;host=127.0.0.1', 'root', '');

auth()->dbConnection($db);

// you can use leaf auth the same way you always have
```

</div>

Leaf Db has been rewritten based on PDO, this also means that you can pass your leaf db connection into leaf auth directly.

<div class="class-mode">

```php
$auth->dbConnection($db->connection());
```

</div>

<div class="functional-mode">

```php
auth()->dbConnection(db()->connection());
```

### Leaf db (auth v2 + leaf 3 only)

If you are using leaf auth in a leaf 3 app, you will have access to the auth global as shown in some of the above connections. Along with this, if you already have a leaf db connection, you no longer need to explicitly connect to your database. Leaf auth searches for a leaf db instance and connects to it automatically.

::: warning Note
This only works in a leaf 3 app and only if you already have a leaf db connection.
:::

```php
<?php

db()->connect('127.0.0.1', 'dbname', 'username', 'password');

// you can use auth straight away without any connect
auth()->login(...);
```

## Functional Mode

If you are using leaf auth v2 in a leaf 3 app, you will have access to the `auth` global which allows you to use Leaf Auth from anywhere in your entire application. You simply need to call `auth()` and leaf 3 will create and maintain a shared instance of Leaf auth which you can call from anywhere.

This also means that you don't need to initialize leaf auth anymore.

```php
<?php

require __DIR__ . "/vendor/autoload.php";

auth()->autoConnect();

app()->get("/", function () {
  // auth can be used here
  // auth()->...
});

app()->run();
```

Functional mode also makes the `guard`, `hasAuth` and `sessionUser` globals available to you from anywhere.

### guard

The guard method is a shortcut method for `Auth::guard()`. You can find the guards documentation [here](/modules/auth/session.html#guard).

### hasAuth

`hasAuth` returns a boolean which is whether there's an active user session or not.

### sessionUser

This method returns the active session user or null if there's no session user.

</div>

## Next Steps

<div class="vt-box-container next-steps">
  <a class="vt-box w-lg-up:33" href="/modules/auth/config">
    <h3 class="next-steps-link mb:_1">Auth Config</h3>
    <small class="next-steps-caption">Configure leaf auth to meet your needs.</small>
  </a>
  <a class="vt-box w-lg-up:33" href="/modules/auth/methods">
    <h3 class="next-steps-link">Auth Methods</h3>
    <small class="next-steps-caption">Docs on all the methods provided in Leaf Auth</small>
  </a>
  <a class="vt-box w-lg-up:33" href="/modules/auth/session">
    <h3 class="next-steps-link">Auth Sessions</h3>
    <small class="next-steps-caption">Session support with Leaf Auth.</small>
  </a>
</div>
