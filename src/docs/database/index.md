# Leaf DB

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoModal from '@theme/components/shared/VideoModal.vue';
import Button from '@theme/components/shared/Button.vue';
</script>

A database is an organized storage system for managing data like your users' profiles or product details. Leaf offers a lightweight module that simplifies database interaction and supports five major database systems.

- MariaDB
- MySQL
- PostgreSQL
- SQLite
- SQL Server

You can install the Leaf database module using the following command:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install db
```

```bash:no-line-numbers [Composer]
composer require leafs/db
```

:::

::: details New to databases?

Databases are essential for most applications, as they help you store and retrieve data efficiently. Check out this video from Linux Academy to learn more about databases and the different types available:

<VideoModal
  buttonText="DB intro by Linux Academy"
  subject="What is a database in under 4 minutes"
  description="In this episode of the Linux Academy Weekly Update, we are covering Databases, what they are, and what are the different types of them."
  videoUrl="https://www.youtube.com/embed/Tk1t3WKK-ZY"
/>

<!-- <VideoModal
  button="Structured Query Language - or SQL, is a language that communicates with databases. Learn what SQL is, and why it is an important language to learn in the era of big data."
  title="Danielle Thé explains SQL"
  subject="What is SQL? [in 4 minutes for beginners]"
  description="Structured Query Language - or SQL, is a language that communicates with databases. Learn what SQL is, and why it is an important language to learn in the era of big data."
  link="https://www.youtube.com/embed/27axs9dO7AE"
/> -->

:::

## Leaf MVC + DB

<div
    class="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg sm:max-w-[50%]"
>
    <div
        class="w-full flex md:flex-col bg-gradient-to-br from-pink-500 to-rose-500"
    >
        <div
            class="sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6"
        >
            <p class="font-medium text-rose-100 text-shadow mb-4">
              Models are a more powerful way to interact with your database in Leaf MVC using an object-oriented approach, which also makes your code more readable and maintainable.
            </p>
            <Button
                as="a"
                href="/docs/database/models"
                class="mt-auto bg-rose-900 hover:!bg-rose-900 !text-white bg-opacity-50 hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-bold py-2 px-4 inline-flex"
                >Let's go</Button
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

If you still want to use Leaf DB with Leaf MVC, everything has been set up for you and Leaf DB will use the default database connection details in your `.env` file.

Here are a few example connections:

::: code-group

```txt [MySQL]
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=LeafMVC
DB_USERNAME=root
DB_PASSWORD=
```

```txt [PostgreSQL]
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=LeafMVC
DB_USERNAME=root
DB_PASSWORD=
```

```txt [SQLite]
DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/to/database.sqlite
```

:::

You can skip the DB connection section: Leaf MVC sets up a deferred connection for you. This means that the connection will only be made when you run a query.

## Connecting to a database

The first step to using a database is to create a connection. It's like opening a door to the database, allowing you to interact with it. Here's how you can connect to a database using Leaf:

```php
db()->connect([
  'dbtype' => '...',
  'charset' => '...',
  'port' => '...',
  'unixSocket' => '...',
  'host' => '...',
  'username' => '...',
  'password' => '...',
  'dbname' => '...',
]);
```

The `connect()` method takes an array of connection details for your database as its argument. Depending on the database system you're using, you'll need to provide different connection details.
Here are some examples of how you can connect to different databases:

::: code-group

```php [MySQL]
db()->connect([
  'host' => '127.0.0.1',
  'username' => 'root',
  'password' => '',
  'dbname' => 'Leaf',
]);
```

```php [PostgreSQL]
db()->connect([
  'dbtype' => 'pgsql',
  'host' => '127.0.0.1',
  'username' => 'root',
  'password' => '',
  'dbname' => 'Leaf',
  'port' => '5432',
]);
```

```php [SQLite]
db()->connect([
  'dbtype' => 'sqlite',
  'dbname' => 'db.sqlite',
]);
```

:::

## Deferred database connection <Badge text="NEW" type="tip" />

In a lot of cases, your application may have other routes that don't need a database connection, but popping up a connection before the route is hit can be a waste of resources. Leaf DB now allows you to defer your database connection until you actually need it. Here's how you can defer your database connection:

```php
db()->load([
  'dbtype' => '...',
  'charset' => '...',
  'port' => '...',
  'unixSocket' => '...',
  'host' => '...',
  'username' => '...',
  'password' => '...',
  'dbname' => '...',
]);
```

It takes in the same arguments as `connect()`, but it doesn't connect to the database immediately. It only connects when you run a query.

## Writing simple queries

Once you've connected to a database, you can start writing queries to interact with it. Queries are the commands you run on your database to get, insert, update or delete data. Leaf DB provides a simple way to run queries using the query builder, but also allows you to run raw SQL queries.

We can run queries using the `query()` method. This method takes in a query string and returns a query builder instance. This means that you can run queries like this:

```php:no-line-numbers
$users = db()->query('SELECT * FROM users')->all();
```

The `query()` method takes an SQL query that you want to execute as its argument. You can then use the query builder methods to modify your query. For example, you can bind values to your query using the `bind()` method:

```php
db()
  ->query('SELECT * FROM users WHERE id = ?')
  ->bind('1')
  ->fetchObj();
```

This provides a more secure and dynamic way to write SQL if you need to.

## Running queries

There are different kinds of database commands: some give you results (like data) and some don’t. Leaf Db makes it easy to handle both types without any hassle.

You can use `execute()` to run queries that don't return values. This method returns `true` if the query was successful and `false` if it wasn't. You can run a query like this:

```php:no-line-numbers
db()->query('CREATE DATABASE dbname')->execute();
```

If you want to run a query that returns data, you can use the `all()` method to get all the results. For example, you can run a query like this:

```php:no-line-numbers
$users = db()->query('SELECT * FROM users')->all();
```

This will return an array of all the users in the database that match the query.

If you only want to get one result, you can use the `fetchObj()` or `fetchAssoc()` method. For example, you can run a query like this:

```php
$user = db()
  ->query('SELECT * FROM users WHERE id = ?')
  ->bind('1')
  ->fetchObj();
```

This will return the matched user as an object.

There may be times when you want to get a single value from a query that returns multiple rows. In such cases, you can use the `first()` method. For example, you can run a query like this:

```php:no-line-numbers
$user = db()->query('SELECT * FROM users')->first();
```
