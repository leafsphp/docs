# Using Databases with Leaf

Databases are important for many apps because they store information that you can use and update anytime. Leaf makes working with databases simple by letting you avoid complicated steps. It helps you easily connect to your database and run commands to manage and work with your data.

## Setting Up

::: details Installing Leaf DB
Leaf DB does not come pre-installed with Leaf because not all apps need a database. However, it's easy to install Leaf DB. You can do this by running the following command:

::: code-group

```bash [Leaf CLI]
leaf install db
```

```bash [Composer]
composer require leafs/db
```

:::

Leaf DB has already been set up for you in this tutorial, so you can go right ahead and start using it.

You can access Leaf DB using the `db()` function which you can call anywhere in your app.

## Connecting to a Database

Connecting to a database is the first step to working with databases, and Leaf DB provides a `connect()` method for just this case.

This method takes in the connection parameters for your database:

- The hostname of the database to connect to
- The database name
- The database username
- The database password.

You can also *optionally* add type of database you're connecting to. This means that a connection will look something like this:

```php
// syntax
db()->connect('hostname', 'dbname', 'username', 'password', 'mysql');
```

Your first task is to make a database connection using the `connect()` method. We've provided connection paramters to a real database. You can try connecting with the correct parameters or switch up the connection parameters if you want to get a view of what a connection error wwould look like.

::: tip Test DB Credentials

- Hostname: eu-cdbr-west-03.cleardb.net,
- Dbname: heroku_fb1311a639bb407,
- Username: b9607a8a6d5ebb,
- Password: cc589b17

:::

## Writing Database Queries

Queries are the commands you run on your database to get, insert, update or delete data. Leaf DB provides a simple way to run queries using the query builder, but also allows you to run raw SQL queries.

We can run queries using the `query()` method. This method takes in a query string and returns a query builder instance. This means that you can run queries like this:

```php
$users = db()->query('SELECT * FROM users')->all();
```

Although you are running a raw query, you can still use the query builder methods to modify your query. For example, you can bind values to your query using the `bind()` method:

```php
db()
  ->query('SELECT * FROM users WHERE id = ?')
  ->bind('1')
  ->fetchObj();
```

This provides a more secure and dynamic way to write SQL if you need to.

## Running Queries

There are different kinds of database commands: some give you results (like data) and some don’t. Leaf Db makes it easy to handle both types without any hassle.

You can use `execute()` to run queries that don't return values. This method returns `true` if the query was successful and `false` if it wasn't. You can run a query like this:

```php
db()->query('CREATE DATABASE dbname')->execute();
```

For queries that actually return values, you can use `all()`, `get()`, `fetchObj()` and `fetchAssoc()` to get the results. You can read more on them [here](/docs/database/#running-queries).

## YOUR TASK

Your second task is to run a raw query using the `query` method. We've provided a query string for you to run. You can run the query as is or you can modify it to suit your needs.

```sql
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT(6) UNSIGNED AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
)
```

After that, create another route and run this query to insert some data into the table:

```sql
INSERT INTO users (name, email)
VALUES
  ('John Doe', 'johndoe@test.com')
```

To prove that all what we just did actually works, we'll need to fetch the data we just inserted. We've prepared a query for you to fetch the data. You can run the query as is or you can modify it to suit your needs.

```sql
SELECT * FROM users
```

Just as with the exercise above, you should create a new route and run the query.

::: tip Return values
Since this query returns multiple results, `execute()` won't work. You'll need to use either `all()` or `get()`.
:::
