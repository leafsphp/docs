# Saving items in a database

Leaf provides a lightweight db client/query builder which can be used to make queries quickly and easily. We call this query builder Leaf DB. Just like any other database client out there, you need to make a database connection first. You can do this with the `connect` method. This method takes in all the parameters you need to connect to your database.

## Connecting to your database

As mentioned above, we'll use the `connect` method to connect to our database. This method takes in a hostname, dbname, username, password and options in that order. This means that a db connection will look something like this:

<div class="functional-mode">

```php
// syntax
db()->connect(
  $host = '',
  string $dbname = '',
  string $user = '',
  string $password = '',
  string $dbtype = 'mysql',
  array $pdoOptions = []
);
```

</div>
<div class="class-mode">

```php
$db = new Leaf\Db;

// syntax
$db->connect(
  $host = '',
  string $dbname = '',
  string $user = '',
  string $password = '',
  string $dbtype = 'mysql',
  array $pdoOptions = []
);
```

</div>

Your first task is to make a database connection using the `connect` method. We've provided connection paramters to a real database. You can try connecting with the correct parameters or switch up the connection parameters if you want to get a view of what a connection error wwould look like.

- Hostname: eu-cdbr-west-03.cleardb.net,
- Dbname: heroku_fb1311a639bb407,
- Username: b9607a8a6d5ebb,
- Password: cc589b17

## Running DB Queries



::: danger WIP
WIP
:::
