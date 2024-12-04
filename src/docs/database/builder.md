# Query Builder

Although you can write raw queries using the `query()` method, there's no fun in that. Leaf DB provides a query builder that makes it easy to write queries in a more readable and secure way. Let's take a look at what you can do with the query builder.

## Creating a database

This is something you would usually want to do outside of your application, but there are a few rare cases where you might want to create a database from within your application. Leaf DB provides a `create()` method that allows you to do just that.

```php:no-line-numbers
db()->create('dbname')->execute();
```

<!-- You might want to define the table structure as well. You can do this by passing a callback to the `create()` method. Here's an example:

```php
db()
  ->create('users', function($table) {
    $table->id();
    $table->string('username');
    $table->string('email');
  })
  ->execute();
``` -->

## Dropping a database

Dropping a database is the opposite of creating one. It deletes the database and all its contents. Leaf DB provides a `drop()` method that allows you to do this.

```php:no-line-numbers
db()->drop('dbname')->execute();
```

Be careful when using this method, as it will delete all the data in the database.

## Adding data to a database

Inserting data into a database means adding new entries to a table. You specify which table and columns to use, then provide the data. To do this, Leaf provides the `insert()` method.

This method needs the name of the table you want to add data to, like "users", and then it allows you to build the rest of your query from there. What we need now is to add the data we want to insert into the table. We can do this using the `params()` method.

Here's an example:

```php:no-line-numbers
db()->insert('users')->params(['username' => 'mychi']);
```

This is equivalent to the following SQL query:

```sql:no-line-numbers
INSERT INTO users (username) VALUES ('mychi')
```

Of course, it automatically takes care of parameter binding, which is important for preventing SQL injection attacks. Now that we have our query, we can execute it using the `execute()` method. Here's an example:

```php
db()
  ->insert('users')
  ->params(['username' => 'mychi'])
  ->execute();
```

This will insert a new user with the username "mychi" into the users table.

## Making values unique

A unique column does not allow duplicate values. Eg. you can't have two users with the same email address in a lot of applications. You'll usually get an error if you try to insert a duplicate value into a unique column. Leaf DB provides a `unique()` helper that makes sure the value you're trying to insert is unique.

```php{8}
db()
  ->insert('users')
  ->params([
    'username' => 'mychi',
    'email' => 'mychi@leafphp.dev',
    'password' => hash('test')
  ])
  ->unique('username', 'email')
  ->execute();
```

This also works when you are updating a row. If you try to update a row with a value that already exists in a unique column, you'll get an error.

## Getting the last inserted ID

When you insert a new row into a table, the database assigns it a unique ID. This ID is **usually** an auto-incrementing integer that starts at 1 and increments by 1 for each new row. Leaf DB provides a `lastInsertId()` method that allows you to get the ID of the last row you inserted.

```php
db()->insert('users')->params(['username' => 'mychi'])->execute();

$lastId = db()->lastInsertId();
```

Note that this may not work correctly if your database uses non-auto-incrementing IDs like UUIDs or ULIDs.

## Reading data from a database

Reading from a database means retrieving data stored in a table. Leaf DB provides a `select()` method that allows you to build a query to retrieve data from a table. The `select()` method takes the name of the table you want to read from as its argument.

```php:no-line-numbers
db()->select('users')->all();
```

This will return all the rows in the users table. You can also specify the columns you want to return by passing them as the second argument to the `select()` method.

```php:no-line-numbers
db()->select('users', 'name, created_at')->all();
```

This will return only the name and created_at columns from the users table.

Most of the time, you'll want to read data based on certain conditions. That's where conditional queries come in.

## Conditional queries

Leaf DB provides a `where()` method that allows you to add conditions to your query. The `where()` method takes a column name, an operator, and a value as its arguments.

```php
db()
  ->select('users')
  ->where('name', 'John Doe')
  ->fetchObj();
```

This will return the matching row in the users table where the name is "John Doe". You can also pass an array of column names and values to the `where()` method.

```php
db()
  ->select('users')
  ->where(['name' => 'John Doe', 'age' => 20])
  ->fetchObj();
```

The `where()` method also allows you to use comparison operators like `>`, `<`, `>=`, `<=`, `!=`, and `LIKE`.

```php
db()
  ->select('items')
  ->where('tag', 'LIKE', '%new%')
  ->fetchAll();
```

This will return all the rows in the items table where the tag column contains the word "new".

### OR conditions

By default, the `where()` method adds conditions using the `AND` operator. Meaning all conditions must be met for a row to be returned. For example, the following query will return all the rows in the users table where the name is "John Doe" and the age is 20.

```php
db()
  ->select('users')
  ->where(['name' => 'John Doe', 'age' => 20])
  ->fetchAll();
```

If you have a record where the name is "John Doe" but the age is not 20, it won't be returned. If you want to return rows where any of the conditions are met, you can use the `orWhere()` method.

```php
db()
  ->select('users')
  ->where('name', 'John Doe')
  ->orWhere('age', 20)
  ->fetchAll();
```

This will return all the rows in the users table where the name is "John Doe" or the age is 20. You can make things easier by passing an array of conditions to the `orWhere()` method.

```php
db()
  ->select('users')
  ->orWhere(['name' => 'John Doe', 'age' => 20])
  ->fetchAll();
```

## Finding Data by ID

Almost every database table has an `id` column that uniquely identifies each row. Leaf DB provides a `find()` method that allows you to retrieve a row by its `id`.

```php:no-line-numbers
db()->select('users')->find(1);
```

This will look in the "users" table for the row with the `id` of 1 and return it.

## Updating data in a database

Updating data in a database works by finding the data you want to update and then passing new data in to change the existing data. Leaf DB provides an `update()` method that allows you to build a query to update data in a table. You need to pair this with the `params()` method to specify the new data you want to update.

Here's an example:

```php
db()
  ->update('users')
  ->params(['name' => 'Jane Doe'])
  ->execute();
```

This will update every row in the users table with the name "Jane Doe". This is not something you want to do, so you can use conditional queries to update specific rows.

```php
db()
  ->update('users')
  ->params(['name' => 'Jane Doe'])
  ->where('id', 1)
  ->execute();
```

This will update the row in the users table with the `id` of 1 to have the name "Jane Doe".

## Deleting data from a database

Deleting data from a database works by finding the data you want to delete and then removing it from the table. Leaf DB provides a `delete()` method that allows you to build a query to delete data from a table.

Here's an example:

```php:no-line-numbers
db()->delete('users')->execute(); // careful now 🙂
```

This query will delete all the rows in the users table (be careful with this one). There is rarely a case where you would want to delete all the rows in a table, so you can use conditional queries to delete specific rows.

```php
db()
  ->delete('users')
  ->where('id', '1')
  ->execute();
```

This will delete the row in the users table with the `id` of 1.

## Database Transactions

Database transactions are a way to ...
Leaf DB allows you to create database transactions using the `transaction()` method. It takes in a callable which is every query you want to perform as part of your transaction.

```php
db()->transaction(function ($db) {
  $db->insert('purchases')->params(...)->execute();
  $db->update('balances')->params(...)->where(...)->execute();

  // you can even do external stuff here
  $res = fetch()->post(...)

  $doSomething = $res->data;

  ...
});
```

If anything in the function fails, Leaf will automatically rollback every change that has been made in the database till that point and return `false`. You can get the associated error using the `errors()` method.

```php
$success = db()->transaction(function () {
  ...
});

if ($success) {
  // do something
} else {
  $errors = db()->errors();
}
```

This is useful especially when you have a set of queries that rely on third party influence.

::: warning Rollback not working
Transactions will only work correctly if your queries use Leaf DB. This is because your queries need to use the same database connection to be able to be rolled back. This means you can't use transactions with your Leaf MVC models at the moment, but this may change in the future.
:::

## Hiding columns from results

Sometimes you might want to hide certain columns from the results of a query. For instance, you might want to hide the password column from the results of a query on the users table. Leaf DB provides a `hide()` method that allows you to do this.

```php
db()
  ->select('users')
  ->hide('password')
  ->all();
```

Or on a conditional query:

```php
db()
  ->select('users')
  ->where('id', '1')
  ->hide('remember_token', 'reset_q_id')
  ->first();
```

## Adding custom fields to results

Sometimes you might want to add custom fields to the results of a query. For instance, you might want to add a `full_name` field to the results of a query on the users table. Leaf DB provides a `add()` method that allows you to do this.

```php
db()
  ->select('users')
  ->add('full_name', 'Something Here')
  ->all();
```

This will add a `full_name` field to the results of the query with the value "Something Here". You can also do this for single results:

```php
db()
  ->select('users')
  ->where('id', '1')
  ->add('full_name', 'Something Here')
  ->first();
```

## Ordering results

You can order the results of a query using the `orderBy()` method. This method takes the column you want to order by as its first argument and the direction you want to order in as its second argument.

```php
db()
  ->select('users')
  ->orderBy('created_at', 'DESC')
  ->all();
```

`DESC` is the default order, so you can leave it out if you want to order in descending order.

```php
db()
  ->select('users')
  ->orderBy('created_at')
  ->all();
```

## Limiting results

You can limit the number of results returned by a query using the `limit()` method. This method takes the number of results you want to limit to as its argument.

```php
db()
  ->select('users')
  ->limit(10)
  ->all();
```

It works even better when combined with the `orderBy()` method.

```php
db()
  ->select('users')
  ->orderBy('created_at')
  ->limit(10)
  ->all();
```

## Error Handling

There are lots of times where your query might fail. This could be because of a syntax error, a missing table, or a missing column. Leaf DB provides an `errors()` method that allows you to get the error message if your query fails.

```php
$res = db()
  ->insert('users')
  ->params('username', 'mychi')
  ->unique('username')
  ->execute();

if ($res === false) {
  response()->exit(db()->errors());
}
```

You will get an error like this:

```php
[
  "username" => "username already exists",
]
```

We get this error because we set the `username` column to be unique, and we tried to insert a duplicate value.
