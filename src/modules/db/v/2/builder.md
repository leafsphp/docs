# Building Queries

As demonstrated [before](/modules/db/v/2/#simple-queries), Leaf Db allows you to perfectly write SQL queries, however, it also provides simpler and more convenient methods for building queries. This means that you won't need to write any SQL statements.

## create <Badge text="New" />

This method helps you build a query to create a database.

```php
db()->create('dbName')->execute();
```

## drop <Badge text="New" />

This method helps you build a query to drop a database.

```php
db()->drop('dbName')->execute();
```

## select

This is a method for quickly building select statements. The `SELECT` statement is used to select data from a database.

It takes in 2 parameters:

- The table to select items from
- The columns to include (includes all by default)

```php
// returns all items
$items = db()->select('items')->all();

// returns the username & email of all buyers
$buyers = db()->select("buyers", "username, email")->fetchAll();
```

### where

The where method allows you to quickly write a where block.

```php
$user = db()->select("users")->where("username", "mychi")->first();
```

You can also pass in a bunch of params to check for:

```php
$user = db()->select("users")->where(["username" => "mychi", "password" => "..."])->first();
```

#### Comparators <Badge text="new" />

v2 of leaf db introduces a third parameter to the `where` and `orWhere` blocks. This allows you to check how a value compares to another using `=`, `LIKE`, `>`, ...

```php
db()
  ->select('items')
  ->where('tag', 'LIKE', '%new%')
  ->fetchAll();
```

### orWhere

`orWhere` also functions just like `where`, except that in the case of multiple parameters, `orWhere` returns results even if one of the conditions is met, but `where` only returns results if all the conditions are matched.

```php
$users = db()->select("users")->orWhere(["username" => "mychi", "username" => "darko"])->all();
```

Kind of like `SELECT * FROM users WHERE username = 'mychi' OR username = 'darko'`

::: tip Chaining
You can chain `where` and `orWhere` blocks together to make queries that use `AND` and `OR` operators.

```php
db()
  ->select('users')
  ->where('username', 'mychi')
  ->orWhere('username', 'darko')
  ->first();
```

This query will look for a username which is either `mychi` or `darko` and return whichever it finds first.

:::

### find

This method allows you to quickly perform a check for the `id` key on a table. It takes in 1 parameter which is the id of the row to get.

```php
$user = db()->select("users")->find(1);
```

::: tip Note
Find returns the value it finds immediately, so you should not use `fetchAssoc` or any other fetch method on the value returned.
:::

## Table operations

### table

`table` sets the table pointer for the db table being used. `table` can be combined with other methods like `search`.

```php
db()->table("items");
```

### search

Just as the name implies, you can use this method to search for a value in the database table. It is used with the `table` method.

```php
$res = db()->table("items")->search("name", "chocola");
```

This will try to find an item which has chocola in it's name field.

## insert

`Insert` provides a much simpler syntax for making insert queries.

```php
db()->insert("users") // faster than db()->query("INSERT INTO users")
```

### params

This method is used on `insert` and `update` just like how `where` is used on `select` and `delete`.

```php
db()->insert("users")->params(["username" => "mychi"]);
```

To actually run this query, you have to call `execute`.

```php
db()->insert("users")->params(["username" => "mychi"])->execute();
```

This inserts a user with a username of mychi into the users table. But what if you wanted to add more params, simple!

```php
db()->insert("users")->params([
  "username" => "mychi",
  "email" => "mickdd22@gmail.com"
])->execute();
```

You're free to arrange this query anyhow you see fit, it's still considered as a single chain.

```php
db()->insert("users")
   ->params([
     "username" => "mychi",
     "email" => "mickdd22@gmail.com",
     "password" => Leaf\Password::hash("test")
   ])
   ->execute();
```

What if you already registered someone with the username mychi, this tiny flaw could break your authentication system. That's where `unique` comes in🧐

### unique

Just as the name implies, `unique` helps prevent duplicates in your database, fun fact, just chain one more method for this functionality🤗

```php
db()->insert("users")
   ->params([
     "username" => "mychi",
     "email" => "mickdd22@gmail.com",
     "password" => md5("test")
   ])
   ->unique("username", "email")
   ->execute();
```

If you have a 100 unique values, don't feel shy, just line them all up.

```php
->unique("username", "email", "what-not", ...)
```

Alternatively, you could just pack a truck load full of uniques in an array

```php
->unique(["username", "email", "what-not", ...])
```

## update

Quickly write an update query.

```php
db()->update("users")->params(["location" => "Ghana"])->where("id", "1")->execute();
```

This is generally how an update looks like. Just like with insert, you can add up uniques to make sure you don't have duplicates in your database.

**you can chain in unique here as well.**

## delete

Let's jump straight in for an example.

```php
db()->delete("users")->execute(); // careful now🙂
```

::: danger Watch out
Be careful when running `delete` queries without a `where` block. Doing that will wipe that whole table.
:::

```php
db()->delete("users")->where("id", "1")->execute();
```

You have succesfully deleted user 1

## Extras

### hidden

Not all information which is retrieved from the database is sent over to the client side or is added to the session or cookies. Usually, some fields are left out for "security" reasons. `hidden` returns the retrieved data without the `hidden` fields.

```php
db()->select("users")->hidden("remember_token", "reset_q_id")->fetchAll();
```

```php
db()->select("users")->where("id", "1")->hidden("remember_token", "reset_q_id")->fetchObj();
```

### add

That's right, just imagine doing the opposite of `hidden`, instead of hiding fields from the query data, `add` lets you add your own fields into the query data.

::: tip NOTE
This does not touch your database, it only appends a field into the data returned from the database.
:::

```php
db()->select("users")->add("tx_id", gID())->fetchAll();
```

This query adds a `tx_id` field with a value generated from `gID` to every user

```php
db()->select("users")->where("id", "1")->add("tx_id", "d362d7t2366")->fetchObj();
```

This is similar as the query above, except that this query is on the scale of a single user.

### bind

We've already seen `bind` in action, but we've not actually talked about it. This method allows you to bind parameters into your query.

```php
db()->select("users WHERE username = ?")->bind("mychi")->fetchAssoc();
```

And yet again another syntax🧐 As said above, Leaf  Db is highly customizable, and allows you to write queries in a way that suits you. This statement above binds `mychi` to the username.

```php
db()->select("users WHERE username = ? AND password = ?")->bind("mychi", "password")->fetchAssoc();
```

You can just pass multiple parameters into bind, as many as satisfy your query. If you feel more comfortable with arrays, you can use arrays.

```php
db()->select("users WHERE username = ? AND password = ?")->bind(["mychi", "password"])->fetchAssoc();
```

### orderBy

orderBy allows you to arrange the query results according to a row, in ascending (asc) or descending (desc) order.

```php
// if second param is not provided, desc is used by default
$items = db()->select("items")->orderBy("created_at")->all();

... orderBy("id", "desc")->all();
```

### limit

When retrieving data from your database for use in applications, you might want to show only a specific number of values.

```php
$itemsPerPage = 15;
$items = db()->select("items")->limit($itemsPerPage)->fetchAll();

// you can use limit and orderBy together
$items = db()->select("items")->orderBy("id", "desc")->limit($itemsPerPage)->fetchAll();
```

### error handling

Errors come up all the time, user errors, that is. What happens when validation fails, or if someone has already registered a username. Leaf Db provides a simple way to track these errors.

```php
$res = db()->insert("users")->params("username", "mychi")->unique("username")->execute();
if ($res === false) $app->response->throwErr(db()->errors());
```

Using `db()->errors()` returns an array holding any errors which caused the query to fail. eg:

```php
[
  "email" => "email already exists",
  "username" => "username can only contain characters 0-9, A-z and _"
]
```
