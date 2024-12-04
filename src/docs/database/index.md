# Leaf DB

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoModal from '@theme/components/shared/VideoModal.vue'
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

If you are using Leaf MVC, we have already set up everything for you. All you need to do is to head over to your `.env` file and set up your database connection details.

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

Remember to head over to `public/index.php` and uncomment the line that says `\Leaf\Database::initDb();`. This will automatically connect to your database using the details in your environment file.

## Writing simple queries

Once you've connected to a database, you can start writing queries to interact with it. Queries are the commands you run on your database to get, insert, update or delete data. Leaf DB provides a simple way to run queries using the query builder, but also allows you to run raw SQL queries.

We can run queries using the `query()` method. This method takes in a query string and returns a query builder instance. This means that you can run queries like this:

```php
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

```php
db()->query('CREATE DATABASE dbname')->execute();
```

If you want to run a query that returns data, you can use the `all()` method to get all the results. For example, you can run a query like this:

```php
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

```php
$user = db()->query('SELECT * FROM users')->first();
```
