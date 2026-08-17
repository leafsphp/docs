# Leaf DB

<!-- markdownlint-disable no-inline-html -->

<div class="not-prose mt-6 overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.02]">
  <div>
    <div class="border-b border-black/10 p-6 dark:border-white/10 md:p-8">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--vp-c-brand-1)]">Leaf DB</p>
      <div class="text-2xl font-semibold tracking-[-0.03em] text-neutral-950 dark:text-neutral-50 md:text-3xl">Query data without dragging a heavy database layer behind you.</div>
      <p class="!m-0 !mt-4 max-w-2xl text-base leading-7 text-neutral-600 dark:text-neutral-400">Leaf DB is a lightweight database module for connecting to SQL databases, writing fluent queries, running raw SQL when needed, and powering models and schema files in Leaf MVC.</p>
      <div class="mt-6 overflow-hidden rounded-lg border border-black/10 bg-neutral-950 dark:border-white/10">
        <div class="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div class="flex items-center gap-2">
            <span class="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]"></span>
            <span class="h-2.5 w-2.5 rounded-full bg-[#ffd166]"></span>
            <span class="h-2.5 w-2.5 rounded-full bg-[#2dd4bf]"></span>
          </div>
          <span class="font-mono text-xs text-neutral-500">query</span>
        </div>
        <div class="overflow-x-auto p-5 font-mono text-sm leading-7 text-neutral-100">
          <div>$users = db()-&gt;select('users')</div>
          <div class="pl-4 text-neutral-400">-&gt;where('active', true)</div>
          <div class="pl-4 text-neutral-400">-&gt;all();</div>
        </div>
      </div>
    </div>
    <div class="bg-neutral-50 p-6 dark:bg-white/[0.03] md:p-8">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">Supported</p>
      <div class="flex flex-wrap gap-2 font-mono text-sm text-neutral-600 dark:text-neutral-400">
        <div class="rounded-md border border-black/10 bg-white px-3 py-2 dark:border-white/10 dark:bg-white/[0.02]">MariaDB</div>
        <div class="rounded-md border border-black/10 bg-white px-3 py-2 dark:border-white/10 dark:bg-white/[0.02]">MySQL</div>
        <div class="rounded-md border border-black/10 bg-white px-3 py-2 dark:border-white/10 dark:bg-white/[0.02]">PostgreSQL</div>
        <div class="rounded-md border border-black/10 bg-white px-3 py-2 dark:border-white/10 dark:bg-white/[0.02]">SQLite</div>
        <div class="rounded-md border border-black/10 bg-white px-3 py-2 dark:border-white/10 dark:bg-white/[0.02]">SQL Server</div>
      </div>
    </div>
  </div>
</div>

Install the Leaf database module using Leaf CLI or Composer:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install db
```

```bash:no-line-numbers [Composer]
composer require leafs/db
```

:::

## Leaf MVC + DB

Leaf's DB module is great for building simple queries, especially when you are using Leaf as a micro-framework. However, if you are building a full-fledged application using Leaf MVC, you can take advantage of models and schema files, which make it easy to interact with your database.

Leaf MVC configures everything for you out of the box, so you just need to define your database schema using the schema files and create models to represent your database tables. You can then use the models to perform CRUD operations on your database without writing any SQL queries.

<div class="docs-paths not-prose my-6">
  <a href="/docs/database/files" class="docs-path-card">
    <span class="docs-path-index">01 / Structure</span>
    <strong class="docs-path-title">Schema files</strong>
    <span class="docs-path-description">Define tables, columns, relationships, and seed data in one readable file.</span>
    <span class="docs-path-action">Create your schema <span aria-hidden="true">&rarr;</span></span>
  </a>
  <a href="/docs/database/models" class="docs-path-card">
    <span class="docs-path-index">02 / Records</span>
    <strong class="docs-path-title">Models</strong>
    <span class="docs-path-description">Give your data a clean, object-oriented API for everyday application logic.</span>
    <span class="docs-path-action">Explore models <span aria-hidden="true">&rarr;</span></span>
  </a>
  <a href="/docs/database/builder" class="docs-path-card">
    <span class="docs-path-index">03 / Queries</span>
    <strong class="docs-path-title">Query builder</strong>
    <span class="docs-path-description">Drop closer to SQL when you need precise control without losing readability.</span>
    <span class="docs-path-action">Open the builder <span aria-hidden="true">&rarr;</span></span>
  </a>
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

Note that `query()` itself takes only the SQL string, there is no second argument for bindings. Always chain `bind()` to fill your `?` placeholders. `bind()` accepts multiple values, so `->bind($name, $email)` fills them in order. This provides a more secure and dynamic way to write SQL if you need to.

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
