# Authentication

<!-- markdownlint-disable no-inline-html -->

<script setup>
import Button from '@theme/components/shared/Button.vue';
</script>

Numerous web applications offer their users a means to authenticate and access the application by "logging in." Adding this functionality to web applications can be a challenging and potentially dangerous task.

Leaf provides a lightweight but very powerful authentication system to handle all the complexities of authentication in a few lines of code. We understand that authentication is a critical part of your application, so we've made it as simple and secure as possible.

<div
    class="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg sm:max-w-[50%]"
>
    <div
        class="w-full flex md:flex-col bg-gradient-to-br from-pink-500 to-rose-500"
    >
        <div
            class="sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6"
        >
            <h3 class="text-xl font-semibold mb-2 text-shadow !mt-0">
                Using Leaf MVC?
            </h3>
            <p class="font-medium text-rose-100 text-shadow mb-4">
                We've crafted a specialized guide for auth in Leaf MVC. While it's similar to the basic routing in Leaf, it's more detailed and tailored for Leaf MVC.
            </p>
            <Button
                as="a"
                href="/docs/auth/mvc"
                class="mt-auto bg-rose-900 hover:!bg-rose-900 !text-white bg-opacity-50 hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-bold py-2 px-4 inline-flex"
                >Start building</Button
            >
        </div>
        <!-- <div
            class="relative md:pl-6 xl:pl-8 hidden sm:block"
        >
            Hello
        </div> -->
    </div>
    <div
        class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-rose-500 hidden sm:block"
    ></div>
</div>

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
