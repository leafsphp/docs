# Leaf 5 — Database Reference

## Leaf DB (Query Builder)

Pre-installed in MVC. For Basic apps:
```bash
leaf install db
```

> In MVC, prefer Models over `db()` for structured code. `db()` is great for quick queries and Basic apps.

### Connecting

```php
// MySQL (default)
db()->connect([
    'host'     => '127.0.0.1',
    'username' => 'root',
    'password' => '',
    'dbname'   => 'myapp',
]);

// PostgreSQL
db()->connect([
    'dbtype'   => 'pgsql',
    'host'     => '127.0.0.1',
    'username' => 'root',
    'password' => '',
    'dbname'   => 'myapp',
    'port'     => '5432',
]);

// SQLite
db()->connect([
    'dbtype' => 'sqlite',
    'dbname' => 'db.sqlite',
]);
```

### Multiple Connections

```php
db()->addConnections([
    'conn1' => ['dbtype' => 'mysql', 'host' => '...', /* ... */],
    'conn2' => ['dbtype' => 'pgsql', 'host' => '...', /* ... */],
], 'conn1');  // 'conn1' is default

db('conn2')->select('users')->all();  // use specific connection
```

---

## Raw SQL

```php
$users = db()->query('SELECT * FROM users')->all();

db()->query('SELECT * FROM users WHERE id = ?')
    ->bind('1')
    ->fetchObj();

db()->query('CREATE DATABASE dbname')->execute();  // no return value
$users = db()->query('SELECT * FROM users')->first();
```

Result methods: `->all()`, `->first()`, `->fetchObj()`, `->fetchAssoc()`, `->fetchAll()`

`query()` takes no bindings parameter — chain `->bind(...$values)` for each `?` placeholder. There is no `whereIn()`; build the placeholders yourself: `db()->query('SELECT * FROM users WHERE id IN (' . rtrim(str_repeat('?,', count($ids)), ',') . ')')->bind(...$ids)`.

---

## Query Builder

### DDL

```php
db()->create('dbname')->execute();
db()->drop('dbname')->execute();
```

### Insert

```php
db()->insert('users')->params(['username' => 'mychi'])->execute();

// Unique constraint check
db()->insert('users')
    ->params(['username' => 'mychi', 'email' => 'mychi@leafphp.dev', 'password' => hash('test')])
    ->unique('username', 'email')
    ->execute();

$lastId = db()->lastInsertId();
```

### Select

```php
db()->select('users')->all();
db()->select('users', 'name, created_at')->all();   // specific columns

db()->select('users')->where('name', 'John Doe')->fetchObj();
db()->select('users')->where(['name' => 'John Doe', 'age' => 20])->fetchAssoc();

// Operators: >, <, >=, <=, !=, LIKE
db()->select('items')->where('tag', 'LIKE', '%new%')->fetchAll();

// orWhere
db()->select('users')->where('name', 'John Doe')->orWhere('age', 20)->fetchAll();
db()->select('users')->orWhere(['name' => 'John Doe', 'age' => 20])->fetchAll();

db()->select('users')->find(1);  // find by id
```

### Relationships

```php
db()->select('users')->with('posts')->all();
db()->select('users')->where('id', 1)->with('posts')->first();
```

### Update

```php
db()->update('users')->params(['name' => 'Jane Doe'])->execute();          // all rows
db()->update('users')->params(['name' => 'Jane Doe'])->where('id', 1)->execute();
```

### Delete

```php
db()->delete('users')->execute();                      // all rows — careful!
db()->delete('users')->where('id', '1')->execute();
```

---

## Result Modifiers

```php
// Hide fields from results
db()->select('users')->hidden('password')->all();
db()->select('users')->where('id', '1')->hidden('remember_token', 'reset_q_id')->first();

// Add computed fields
db()->select('users')->add('full_name', 'Something Here')->all();
db()->select('users')->where('id', '1')->add('full_name', 'Value')->first();

// Ordering & limiting
db()->select('users')->orderBy('created_at', 'DESC')->all();
db()->select('users')->orderBy('created_at')->limit(10)->all();

// Count
db()->select('users')->count();
db()->select('users')->where('age', '>', 20)->count();
```

> As of leafs/db 5.1.1, `count()` counts SELECT result rows correctly on every driver. Older versions used PDO's `rowCount()`, which returns 0 for SELECTs on sqlite.

---

## Transactions

```php
db()->transaction(function ($db) {
    $db->insert('purchases')->params([/* ... */])->execute();
    $db->update('balances')->params([/* ... */])->where([/* ... */])->execute();
    // can include non-DB logic too
});

$success = db()->transaction(function () { /* ... */ });
if (!$success) {
    $errors = db()->errors();
}
```

> In Leaf MVC (leafs/db 5.1+), `db()` and your models share one connection, so a `db()->beginTransaction()` covers model reads and writes too — wrap a check-then-insert (an availability check plus a booking insert, say) in one transaction to close the race between concurrent requests. On older setups where the connections are separate, transactions only cover `db()` queries.

---

## Error Handling

```php
$res = db()->insert('users')->params('username', 'mychi')->unique('username')->execute();

if ($res === false) {
    response()->exit(db()->errors());
    // errors: ['username' => 'username already exists']
}
```

---

## Leaf Redis

MVC only (Basic app support planned).

```bash
leaf install redis
```

### Config (`.env`)

```env
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=null
REDIS_SESSION=false
```

For advanced config:
```bash
leaf config:publish redis   # → config/redis.php
```

### Usage

```php
echo redis()->ping();

// Set
redis()->set('name', 'Michael');
redis()->set(['name' => 'Michael', 'age' => 22]);
redis()->set('name', 'Michael', 3600);  // with TTL (seconds)
redis()->set('name', 'Michael', 0);     // no expiration

// Get
$name   = redis()->get('name');
$values = redis()->get(['name', 'age']);  // ['name' => 'Michael', 'age' => 22]

// Delete
redis()->delete('name');
redis()->delete(['name', 'age']);

// Check
$exists = redis()->exists('name');
$exists = redis()->has('name');       // alias

// Utility
redis()->flush();
$keys = redis()->keys();
```
