# Schema Files

Leaf MVC has always taken cues from Laravel and Rails to make database management smooth. But juggling migrations, seeders, and factories for one table? That gets messy, quickly! Schema files offer a cleaner, all-in-one way to define, test, and seed your database.

## What are Schema Files?

With Schema Files in Leaf MVC 4, you can define your database tables, seed data, and test data—all in one simple YAML file. No need to manage separate migrations, seeders, or factories. It’s clean, readable, and designed to help you move fast without the overhead.

```yml [flights.yml]
columns:
  to: string
  from: string
  identifier: string

seeds:
  count: 10
  data:
    to: '@faker.city'
    from: '@faker.city'
    identifier: '@faker.uuid'
```

## Creating a Schema File

Leaf MVC's console comes with a `g:schema` command that you can use to generate a database file. You can generate a database file by running:

```bash:no-line-numbers
php leaf g:schema <table-name>
```

Remember, every schema file is tied to a table in your database. When you run the command above, Leaf will create a schema file in your `app/database` directory with the name `<table-name>.yml`. Here’s an example:

```bash:no-line-numbers
php leaf g:schema posts
```

This will create a schema file at `app/database/posts.yml` which looks like this:

```yml [posts.yml]
# schema files add auto-increments and timestamps by default

# you can add all the columns you want under the columns key
columns:
  name: string
  identifier:
    type: string
    unique: true
  verified_at:
    type: timestamp
    nullable: true

# you can add foreign ids for other models under the relationships key key
relationships:
  - User

# seeds are optional and can be used to populate the database with dummy data
seeds:
  count: 5
  truncate: true
  data:
    name: '@faker.name'
    identifier: '@faker.uuid'
    verified_at: '@tick.format:YYYY-MM-DD HH:mm:ss'
```

Breaking this file down, there are three main sections:

- `columns`: This is used to set the columns of the table. The key is the column name and the value is the type/properties of the column.

- `seeds`: This is used to set the seeders of the table. The available properties are:
  - `count`: This is used to set the number of seeds to generate.
  - `data`: This is used to set the data of the seeds. The key is the column name and the value is the value of the column. You can use `@faker.[value]` to generate fake data for the column. <!-- You can also use `{{ [value] }}` to use PHP code, but this is a separate PHP thread which means you can't use variables from the current scope. -->
  - `truncate`: This is used to truncate the table before seeding.

- `relationships`: This is used to set the relationships of the table. The value is an array of models the table is related to. This is used to generate foreign keys for the table.

## Applying schema files

Each schema file represents a single database table—just name the file after the table you’re creating. Inside, define your table structure under the `columns` key. Leaf takes care of the rest. No need for separate migration files or extra setup—just one clear, structured file for everything your table needs. Here's an example:

```yml [users.yml]
columns:
  name: string
  email:
    type: string
    length: 255
    unique: true
  password: string
  email_verified_at: timestamp
```

In this example, we create a `users` table with `name`, `email`, `password`, and `email_verified_at` columns. We can then migrate this table to our database using the `db:migrate` command:

```bash:no-line-numbers
php leaf db:migrate
```

You can have multiple schema files in your `app/database` directory, each tied to a particular table. When you run the `db:migrate` command, Leaf will migrate all the tables in your `app/database` directory. If you want to migrate only a specific table, you can pass the table name as an argument to the `db:migrate` command:

```bash:no-line-numbers
php leaf db:migrate users
```

## Database schema defaults

Schema Files come with smart defaults to make setup faster. Every table automatically includes an auto-incrementing `id` and `created_at`/`updated_at` timestamps—no need to add them manually. Want to change that? Use the `increments` and `timestamps` keys to disable them. Here's an example:

```yml:no-line-numbers [posts.yml]
increments: false # this will remove the auto-incrementing id column
timestamps: false # this will remove the timestamps columns
```

Once you turn off auto-increments, you can add your own `id` column. Here's an example:

```yml:no-line-numbers [posts.yml]
increments: false

columns:
  id:
    type: integer
    primary: true

...
```

The same thing goes for timestamps. If you want to add your own timestamps, you can turn off the default timestamps and add your own. Here's an example:

```yml:no-line-numbers [posts.yml]
timestamps: false

columns:
  ...
  created_at: timestamp
```

This example will add a `created_at` column to the `posts` table with the current timestamp as the default value.

## Multiple DB connections <Badge>New</Badge>

Leaf MVC supports multiple database connections via the `config/database.php` configuration file. By default, Leaf uses the `default` connection for all database operations. However, if you want to use a different connection for a specific table, you can specify the connection in the schema file using the `connection` key. Here's an example:

```yml:no-line-numbers [posts.yml]
connection: postsDbConnection

columns:
  title: string
  body: text
```

::: details Example Multi-Database Setup

Here is an example of how you might set up multiple database connections in your `config/database.php` file:

```php
<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Database Connection Name
    |--------------------------------------------------------------------------
    |
    | Here you may specify which of the database connections below you wish
    | to use as your default connection for all database work. Of course
    | you may use many connections at once using the Database library.
    |
    */
    'default' => _env('DB_CONNECTION', 'pgsql'),

    /*
    |--------------------------------------------------------------------------
    | Database Connections
    |--------------------------------------------------------------------------
    |
    | Here are each of the database connections setup for your application.
    | Of course, examples of configuring each database platform that is
    | supported by eloquent is shown below to make development simple.
    |
    |
    | All database work in eloquent is done through the PHP PDO facilities
    | so make sure you have the driver for your particular database of
    | choice installed on your machine before you begin development.
    |
    */
    'connections' => [
        'sqlite' => [
            'driver' => 'sqlite',
            'url' => _env('DATABASE_URL'),
            'database' => _env('DB_DATABASE', AppPaths('databaseStorage') . '/database.sqlite'),
            'prefix' => '',
            'foreign_key_constraints' => _env('DB_FOREIGN_KEYS', true),
        ],

        'pgsql' => [
            'driver' => 'pgsql',
            'url' => _env('DATABASE_URL'),
            'host' => _env('DB_HOST', '127.0.0.1'),
            'port' => _env('DB_PORT', '5432'),
            'database' => _env('DB_DATABASE', 'forge'),
            'username' => _env('DB_USERNAME', 'forge'),
            'password' => _env('DB_PASSWORD', ''),
            'charset' => _env('DB_CHARSET', 'utf8'),
            'prefix' => '',
            'prefix_indexes' => true,
            'schema' => 'public',
            'sslmode' => 'prefer',
        ],

        'analytics' => [
            'driver' => 'pgsql',
            'url' => _env('ANALYTICS_DATABASE_URL'),
            'host' => _env('ANALYTICS_DB_HOST', '127.0.0.1'),
            'port' => _env('ANALYTICS_DB_PORT', '5432'),
            'database' => _env('ANALYTICS_DB_DATABASE', 'forge'),
            'username' => _env('ANALYTICS_DB_USERNAME', 'forge'),
            'password' => _env('ANALYTICS_DB_PASSWORD', ''),
            'charset' => _env('ANALYTICS_DB_CHARSET', 'utf8'),
            'prefix' => '',
            'prefix_indexes' => true,
            'schema' => 'public',
            'sslmode' => 'prefer',
        ],

        'imports' => [
            'driver' => 'pgsql',
            'url' => _env('IMPORTS_DATABASE_URL'),
            'host' => _env('IMPORTS_DB_HOST', '127.0.0.1'),
            'port' => _env('IMPORTS_DB_PORT', '5432'),
            'database' => _env('IMPORTS_DB_DATABASE', 'forge'),
            'username' => _env('IMPORTS_DB_USERNAME', 'forge'),
            'password' => _env('IMPORTS_DB_PASSWORD', ''),
            'charset' => _env('IMPORTS_DB_CHARSET', 'utf8'),
            'prefix' => '',
            'prefix_indexes' => true,
            'schema' => 'public',
            'sslmode' => 'prefer',
        ],
    ],
];
```

This example defines three PostgreSQL connections: `pgsql`, `analytics`, and `imports`, and an SQLite connection. You can then specify which database you want to run a migration on by setting the `connection` property as shown above.

:::

## Schema columns

In a schema file, you can define the columns of your table under the `columns` key. The key is the column name and the value is the type of column or an array of properties for the column:

```yml:no-line-numbers [users.yml]
columns:
  # directly defining the column type
  email: string

  # defining the column type and properties
  email:
    type: string
    length: 255
    unique: true
```

The schema builder blueprint offers a variety of methods that correspond to the different types of columns you can add to your database tables. Each of the available methods are listed in the table below:

| Method | Description | Method | Description |
|--------|-------------| -------|-------------|
| `boolean` | Creates a boolean column. | `increments` | Creates an auto-incrementing integer column. |
| `integer` | Creates an integer column. | `bigIncrements` | Creates a big integer column. |
| `bigInteger` | Creates a big integer column. | `smallIncrements` | Creates a small integer column. |
| `char` | Creates a character column. | `decimal` | Creates a decimal column. |
| `string` | Creates a string column. | `float` | Creates a float column. |
| `text` | Creates a text column. | `double` | Creates a double column. |
| `tinyText` | Creates a tiny text column. | `unsignedBigInteger` | Creates an unsigned big integer column. |
| `mediumText` | Creates a medium text column. | `id` | Creates an auto-incrementing integer column. |
| `longText` | Creates a long text column. | `uuid` | Creates a UUID column. |
| `date` | Creates a date column. | `json` | Creates a JSON column. |
| `enum` | Creates an enum column. | `jsonb` | Creates a JSONB column. |

You can check the [Laravel migration documentation](https://laravel.com/docs/12.x/migrations#available-column-types) for more information on the available types. Any method that is not present in the table above or not listed in the Laravel migration documentation is not supported in Leaf MVC.

## Column properties/modifiers

In addition to the column types, you can also add properties/modifiers to your columns to make them behave differently. The available properties are:

| Property | Description |
|----------|-------------|
| `type` | The type of the column. This is required for all columns |
| `length` | The length of the column. This is optional and defaults to 255 for string columns |
| `nullable` | This is used to set the column as nullable. This is optional and defaults to false |
| `default` | This is used to set the default value of the column. |
| `unsigned` | This is used to set the column as unsigned. This is optional and defaults to false |
| `index` | This is used to set the column as an index. This is optional and defaults to false |
| `unique` | This is used to set the column as unique. This is optional and defaults to false |
| `primary` | This is used to set the column as the primary key. This is optional and defaults to false |
| `values` | This is used to set the values of the column. This is only required for `enum` and `set` columns. |
| `onDelete` | This is used to set the `ON DELETE` constraint of the foreign key. |
| `onUpdate` | This is used to set the `ON UPDATE` constraint of the foreign key. |
| `comment` | This is used to set the comment of the column. |
| `autoIncrement` | This is used to set the column as auto-incrementing. This is optional and defaults to false |
| `useCurrent` | This is used to set the column to use the current timestamp. This is only used for `timestamp` columns. |
| `useCurrentOnUpdate` | This is used to set the column to use the current timestamp on update. This is only used for `timestamp` columns. |
<!-- | `foreign` | This is used to set the column as a foreign key. The value of this key is the table and column the column is a foreign key to. | -->

You can use these properties to modify the behavior of your columns. For example, if you want to create a `name` column that is unique and has a default value of `John Doe`, you can do it like this:

```yml:no-line-numbers [users.yml]
columns:
  name:
    type: string
    unique: true
    default: 'John Doe'
```

When defining columns, it’s good to be mindful—some properties can affect performance or behave differently across databases. For example, setting a column as `unique` adds an index, which can slow down inserts and updates on large tables. And properties like `comment` aren’t supported in SQLite, which could lead to unexpected behavior. Leaf gives you the flexibility—you just want to use it wisely.

::: tip Missing some functionality?
We are working on adding more properties/modifiers to the columns, just to make it easier to work with your database. If you have any suggestions, please let us know.
:::

## Migration histories

Migration histories keep track of changes to your database, making it easy to roll back if needed. Unlike other frameworks, **Leaf MVC handles this automatically**—no need to manually create migrations just to track history.

```yml [users.yml]
columns:
  name: string
  email:
    type: string
    length: 255
    unique: true
  password: string
  email_verified_at: timestamp
  is_super_admin: # [!code ++]
    type: boolean # [!code ++]
    default: false # [!code ++]
```

This example adds a new column `is_super_admin` to the `users` table. When you run `php leaf db:migrate`, Leaf will compare it to the previous version of the file, find the differences and automatically create the `is_super_admin` column for you in your database. You don't need to worry about writing migration files or keeping track of changes manually.

## Reverting changes

The schema system automatically tracks changes, so you can easily roll back to a previous state. Just run:

```bash:no-line-numbers
php leaf db:rollback
```

This will revert the last set of changes made to your database. If you want to roll back a specific table instead of all tables, you can pass the table name as an argument to the `db:rollback` command:

```bash:no-line-numbers
php leaf db:rollback users
```

Rolling back is like hitting "undo" on your database: It reverts the last migration, letting you step back through changes one at a time. Sometimes, you might need to revert multiple steps at a time, so you can use the `--steps` option to specify how many steps to roll back:

```bash:no-line-numbers
php leaf db:rollback --steps=3
```

This command will roll back the last three migrations made to your database.

------

### Resetting tables

While rolling back is great for undoing recent changes, there are times when you might want to reset your entire database to a clean state. For those situations, Leaf provides the `db:reset` command. This command will roll back all migrations and then re-apply them, effectively giving you a fresh start. You can run it like this:

```bash:no-line-numbers
php leaf db:reset
```

You can also reset a specific table by passing the table name as an argument:

```bash:no-line-numbers
php leaf db:reset users
```

------

### Dropping tables <Badge>New</Badge>

Finally, if you want to completely remove all tables from your database, you can use the `db:drop` command, meaning all your data and tables will be deleted. Use this command with caution:

```bash:no-line-numbers
php leaf db:drop
```

You can also drop a specific table by passing the table name as an argument:

```bash:no-line-numbers
php leaf db:drop users
```

## Seeding your database

Database seeds let you pre-populate your database with initial data—whether it's default settings, test data, or sample records. Instead of manually adding entries, you can use seeders to automate this process.

In Leaf MVC, you define seeders directly in your Schema Files under the `seeds` key. This keeps everything in one place, making it easier to manage your database setup. Here's an example of a seeder:

```yml [users.yml]
seeds:
  data:
    - name: 'Example User'
      email: 'example@example.com'
      password: '@hash:passwordForThisUser' # @hash requires leafs/password
    - name: 'Another User'
      email: 'another@example.com'
      password: '@hash:passwordForThisUser' # @hash requires leafs/password
```

In this example, we create a seeder that seeds the `users` table with two example users. We are passing an array of seeds to the `data` key, each seed being a key value pair of column name and value.

Another way to generate multiple seeds is to use the `count` key. When using the `count` key, you can pass an integer value to generate multiple seeds with the same data. Here's an example:

```yml{2} [users.yml]
seeds:
  count: 10
  data:
    name: 'Example User'
    email: 'example@example.com'
    password: '@hash:password'
```

After creating your seeder, you can run your seeders using the `db:seed` command:

```bash:no-line-numbers
php leaf db:seed
```

This will generate 10 seeds for the `users` table with the same data which is not very useful. To generate multiple fake seeds, you can use what other frameworks call a factory.

In Leaf MVC, factories and seeders are the same thing as we believe this confusion is unnecessary. If you want to generate fake data for your seeders, you can add `@faker.[value]` as the value of a column in your seeder. Here's an example:

```yml{4,5} [users.yml]
seeds:
  count: 10
  data:
    name: '@faker.name'
    email: '@faker.email'
    password: '@hash:password'
```

In this example, we're generating 10 fake seeds for the `users` table.

After adding your seeds, you can run your seeders using the `db:seed` command:

```bash:no-line-numbers
php leaf db:seed
```

If you want to seed a specific table, you can pass the table name as an argument to the `db:seed` command:

```bash:no-line-numbers
php leaf db:seed users
```

<!-- ## Database migrations vs data migrations

Usually, when making substancial changes to your database, you would create a migration file which is usually in charge of modifying the structure of your database. In some situations, you might want to run some kind of data migration which may copy data from one table to another, or run some kind of data manipulation on your recently migrated database. Some frameworks combine these two into one, but in Leaf MVC, we separate these two because we believe they are two different things. While database migrations are common, data migrations are not so common and are usually done manually.

Leaf MVC provides database scripts which you can use to handle your data migrations. Separating database migrations from data migrations allows you to safely roll-back your data migrations without affecting your database structure. Here's an example of a database script:

```php [ImportUsersFromOldTable.php]
<?php

use App\Models\User;

class ImportUsersFromOldTable
{
  public function up()
  {
    $oldUsers = getOldUsersAndMapToNewUsers();

    foreach ($oldUsers as $oldUser) {
      User::create([
        'name' => $oldUser->name,
        'email' => $oldUser->email,
        'password' => $oldUser->password,
        'is_from_old_table' => true
      ]);
    }
  }

  public function down()
  {
    User::where('is_from_old_table', true)->delete();
  }
}
```

Now you just need to run the script using the `db:script` command:

```bash:no-line-numbers
php leaf db:script ImportUsersFromOldTable
``` -->
