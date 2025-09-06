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

Leaf's DB module is great for building simple queries, especially when you are using Leaf as a micro-framework. However, if you are building a full-fledged application using Leaf MVC, you can take advantage of the powerful models and schema files which make it easy to interact with your database.

Leaf MVC configures everything for you out of the box, so you just need to define your database schema using the schema files and create models to represent your database tables. You can then use the models to perform CRUD operations on your database without writing any SQL queries.

<div class="grid md:grid-cols-3 gap-4">
  <div
      class="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg"
  >
      <div
          class="w-full flex md:flex-col bg-gradient-to-br from-pink-500 to-rose-500"
      >
          <div
              class="sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6"
          >
              <p class="font-semibold text-sm text-rose-100 text-shadow mb-4">
                Schema files allow you to define the structure of your database tables in a simple and intuitive way.
              </p>
              <Button
                  as="a"
                  href="/docs/database/files"
                  class="mt-auto bg-rose-900 hover:!bg-rose-900 !text-white bg-opacity-50 hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-bold py-2 px-4 inline-flex"
                  >Create your schema</Button
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
  <div
      class="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg"
  >
      <div
          class="w-full flex md:flex-col bg-gradient-to-br from-green-500 to-blue-500"
      >
          <div
              class="sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6"
          >
              <p class="font-semibold text-sm text-blue-100 text-shadow mb-4">
                Models are a powerful way to interact with your database using an object-oriented approach.
              </p>
              <Button
                  as="a"
                  href="/docs/database/models"
                  class="mt-auto bg-blue-900 hover:!bg-blue-900 !text-white bg-opacity-50 hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-bold py-2 px-4 inline-flex"
                  >Check out models</Button
              >
          </div>
          <!-- <div
              class="relative md:pl-6 xl:pl-8 hidden sm:block"
          >
              Hello
          </div> -->
      </div>
      <div
          class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-500 hidden sm:block"
      ></div>
  </div>
  <div
      class="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg"
  >
      <div
          class="w-full flex md:flex-col bg-gradient-to-br from-yellow-400 to-orange-500"
      >
          <div
              class="sm:max-w-sm sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6"
          >
              <p class="font-semibold text-sm text-amber-100 text-shadow mb-4">
                You can use Leaf DB to build and run queries that don't fit into a model, without any config.
              </p>
              <Button
                  as="a"
                  class="mt-auto bg-amber-900 hover:!bg-amber-900 !text-white bg-opacity-50 hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-bold py-2 px-4 inline-flex"
                  href="/docs/database/builder"
                  >Skip to builder</Button
              >
          </div>
          <!-- <div class="relative hidden sm:block">
              <div class="absolute left-2 bottom-3 xl:bottom-5">
                  Hello
              </div>
          </div> -->
      </div>
      <div
          class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-orange-500 hidden sm:block"
      ></div>
  </div>
</div>

## Connecting to a database

The first step to using a database is to create a connection. It's like opening a door to the database, allowing you to interact with it. Here's how you can connect to a database using Leaf:

```php:no-line-numbers
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

```php:no-line-numbers [MySQL]
db()->connect([
  'host' => '127.0.0.1',
  'username' => 'root',
  'password' => '',
  'dbname' => 'Leaf',
]);
```

```php:no-line-numbers [PostgreSQL]
db()->connect([
  'dbtype' => 'pgsql',
  'host' => '127.0.0.1',
  'username' => 'root',
  'password' => '',
  'dbname' => 'Leaf',
  'port' => '5432',
]);
```

```php:no-line-numbers [SQLite]
db()->connect([
  'dbtype' => 'sqlite',
  'dbname' => 'db.sqlite',
]);
```

:::

Leaf DB will not connect to your database until you run a query. This means that you can pass in your database connection at the beginning of your application and only connect when you need to run a query which is a great way to save resources.

## Multi-DB Connections <Badge text="NEW" type="tip" />

Some applications may need to connect to multiple databases for things like queues and logs, and Leaf DB allows you to keep multiple connections open and query them independently. Here's how you can connect to multiple databases:

```php:no-line-numbers
db()->addConnections([
  'conn1' => [
    'dbtype' => '...',
    ...
  ],
  'conn2' => [
    'dbtype' => '...',
    ...
  ],
], 'conn1');
```

The `addConnections()` method takes an array of connection details for your databases as its first argument and the default connection name as its second argument. You can then switch between connections using the `useConnection()` method:

```php:no-line-numbers
db('conn2')->select('users')->all();
```

If no connection name is provided, Leaf DB will use the default connection.

## Writing simple queries

Once you've connected to a database, you can start writing queries to interact with it. Queries are the commands you run on your database to get, insert, update or delete data. Leaf DB provides a simple way to run queries using the query builder, but also allows you to run raw SQL queries.

We can run queries using the `query()` method. This method takes in a query string and returns a query builder instance. This means that you can run queries like this:

```php:no-line-numbers
$users = db()->query('SELECT * FROM users')->all();
```

The `query()` method takes an SQL query that you want to execute as its argument. You can then use the query builder methods to modify your query. For example, you can bind values to your query using the `bind()` method:

```php:no-line-numbers
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

```php:no-line-numbers
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
