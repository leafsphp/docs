# Authentication

<!-- markdownlint-disable no-inline-html -->

Numerous web applications offer their users a means to authenticate and access the application by "logging in." Adding this functionality to web applications can be a challenging and potentially dangerous task.

Leaf provides a lightweight but very powerful authentication system to handle all the complexities of authentication in a few lines of code. We understand that authentication is a critical part of your application, so we've made it as simple and secure as possible.

::: warning Docs version
This documentation covers Auth v3 and above. If you're using an older version, you can check the documentation [hosted here](https://v3.leafphp.dev/modules/auth/).
:::

## Setting up

You can install Leaf Auth using the Leaf CLI:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install auth
```

```bash:no-line-numbers [Composer]
composer require leafs/auth
```

:::

The next step is to link your database and start signing users in.

## Connecting to a database

To do any kind of authentication, you need to connect to some kind of database which will store your users' data. If you are already using Leaf DB or Leaf MVC, then your database connection will automatically be used by Leaf Auth, so you don't need to connect to your database again.

If you are **NOT** using Leaf DB or Leaf MVC, you can connect to your database manually:

::: code-group

```php [Auth connect]
auth()->connect([
  'dbtype' => '...',
  'charset' => '...',
  'port' => '...',
  'host' => '...',
  'dbname' => '...',
  'user' => '...',
  'password' => '...'
]);
```

```php [Existing PDO instance]
$db = new PDO('mysql:dbname=test;host=127.0.0.1', 'root', '');

auth()->dbConnection($db);

// you can use leaf auth the same way you always have
```

:::

## Auth + Leaf MVC

If you are using Leaf MVC, you can set up Leaf Auth to work with your default database connection by heading over to the `public/index.php` file and uncommenting the line that connects to the database:

```php
/*
|--------------------------------------------------------------------------
| Sync Leaf Db with ORM and connect
|--------------------------------------------------------------------------
|
| Sync Leaf Db with ORM and connect to the database
| This allows you to use Leaf Db without having
| to initialize it in your controllers.
|
| If you want to use a different connection from those
| used in your models, you can remove the line below and
| add your own connection with:
| db()->connect(...)
|
| **Uncomment the line below to use Leaf Db**
| **You don't need this line to use Leaf Auth**
*/
// \Leaf\Database::initDb(); [!code --]
\Leaf\Database::initDb(); // [!code ++]
```

That's all you need to do. Leaf Auth will automatically connect to your database using the details in your environment file. The auth configuration for your project can be found in the `config/auth.php` file. You can edit this file to change the configuration of Leaf Auth.

## Database Considerations

Leaf Auth doesn't give you any structure for your database, with that, you can structure your database in any way you prefer. However, there are some things you should note:

1. By default, Leaf Auth assumes that your database primary key is `id`. If you have a database where you are using another field, say `admin_id` as the primary key, you will need to tell Leaf the name of your primary key. You can do this using the `id.key` config:

    ::: code-group

    ```php:no-line-numbers [Leaf]
    auth()->config('id.key', 'admin_id');
    ```

    ```php:no-line-numbers [Leaf MVC - config/auth.php]
    'id.key' => 'admin_id'
    ```

2. Leaf Auth assumes that you will save your users in a database table named `users`, this might however not be the case for your application. If you want to use a different table, you can configure Leaf Auth using `db.table`:

    ::: code-group

    ```php:no-line-numbers [Leaf]
    auth()->config('db.table', 'admins');
    ```

    ```php:no-line-numbers [Leaf MVC - config/auth.php]
    'db.table' => 'admins'
    ```

    :::
