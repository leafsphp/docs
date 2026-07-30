# Schema Files

Leaf MVC has always taken cues from Laravel and Rails to make database management smooth. But juggling migrations, seeders, and factories for one table? That gets messy, quickly! Schema files offer a cleaner, all-in-one way to define, test, and seed your database.

## What are Schema Files?

Schema Files allow you to define your database tables, seed data, and keep track of your database automatically in one simple YAML file. It’s clean, readable, and designed to help you move fast without the overhead.

```yml [flights.yml]
columns:
  to: string
  from: string
  identifier: string

seeds:
  count: 10
```

## Creating a Schema File

Leaf MVC's console comes with a `g:schema` command that you can use to generate a database file. You can generate a database file by running:

```bash:no-line-numbers
leaf g:schema <table-name>
```

Remember, every schema file is tied to a table in your database. When you run the command above, Leaf will create a schema file in your `app/database` directory with the name `<table-name>.yml`. Here’s an example:

```bash:no-line-numbers
leaf g:schema posts
```

This will create a schema file at `app/database/posts.yml` which looks like this:

```yml [posts.yml]
# schema files add auto-increments and timestamps automatically

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

# seeds are optional and can be used to populate the database with dummy data from models
seeds:
  count: 5
  truncate: true
```

Breaking this file down, there are three main sections:

- `columns`: This is used to set the columns of the table. The key is the column name and the value is the type/properties of the column.

- `seeds`: This is used to set the seeders of the table. The available properties are:
  - `count`: This is used to set the number of seeds to generate.
  - `data`: The values to seed, as column/value pairs (or a list of rows). Values support `@` tokens like `@faker.numberBetween(18, 65)` and `@hash("password")` — see [Using factories](#using-factories-for-generating-fake-data).
  - `locale`: The Faker locale used for generated data, e.g. `fr_FR`.
  - `model`: Seed from a model's static `__seeder()` method instead of inline data.
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
leaf db:migrate
```

You can have multiple schema files in your `app/database` directory, each tied to a particular table. When you run the `db:migrate` command, Leaf will migrate all the tables in your `app/database` directory. If you want to migrate only a specific table, you can pass the table name as an argument to the `db:migrate` command:

```bash:no-line-numbers
leaf db:migrate users
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

## Multiple DB connections

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

The history itself lives in your database, in a small `leaf_schema_history` table that Leaf manages for you. Every environment tracks the state that was actually applied to *its* database, so staging, production and every developer's machine each diff against their own reality—no shared files to keep in sync. (Apps upgrading from Leaf 4 are migrated automatically: the old `storage/database` snapshots are imported into the history table on your first `db:migrate`.)

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

This example adds a new column `is_super_admin` to the `users` table. When you run `leaf db:migrate`, Leaf will compare it to the previous version of the file, find the differences and automatically create the `is_super_admin` column for you in your database. You don't need to worry about writing migration files or keeping track of changes manually.

## Reverting changes

The schema system automatically tracks changes, so you can easily roll back to a previous state. Just run:

```bash:no-line-numbers
leaf db:rollback
```

This will revert the last set of changes made to your database. If you want to roll back a specific table instead of all tables, you can pass the table name as an argument to the `db:rollback` command:

```bash:no-line-numbers
leaf db:rollback users
```

Rolling back is like hitting "undo" on your database: It reverts the last migration, letting you step back through changes one at a time. Sometimes, you might need to revert multiple steps at a time, so you can use the `--steps` option to specify how many steps to roll back:

```bash:no-line-numbers
leaf db:rollback --step=3
```

This command will roll back the last three versions applied to your database.

::: info Your schema files stay put
Rolling back changes your *database*, not your schema files—they stay exactly as you wrote them, which means they are now ahead of the database. Run `leaf db:migrate` to re-apply them, or edit them to match the rolled-back state if the rollback is meant to stick.
:::

------

### Resetting tables

While rolling back is great for undoing recent changes, there are times when you might want to reset your entire database to a clean state. For those situations, Leaf provides the `db:reset` command. This command will roll back all migrations and then re-apply them, effectively giving you a fresh start. You can run it like this:

```bash:no-line-numbers
leaf db:reset
```

You can also reset a specific table by passing the table name as an argument:

```bash:no-line-numbers
leaf db:reset users
```

------

### Dropping tables

Finally, if you want to completely remove all tables from your database, you can use the `db:drop` command, meaning all your data and tables will be deleted. Use this command with caution:

```bash:no-line-numbers
leaf db:drop
```

You can also drop a specific table by passing the table name as an argument:

```bash:no-line-numbers
leaf db:drop users
```

## Seeding your database

Database seeds let you pre-populate your database with initial data—whether it's default settings, test data, or sample records. Instead of manually adding entries, you can use seeders to automate this process.

In Leaf MVC, you can define seeders directly in your Schema Files under the `seeds` key. This keeps everything in one place, making it easier to manage your database setup. Here's an example of a seeder:

```yml [users.yml]
seeds:
  data:
    - name: 'Example User'
      email: 'example@example.com'
      password: '@hash("password")'
    - name: 'Another User'
      email: 'another@example.com'
      password: '@hash("password")'
```

In this example, we create a seeder that seeds the `users` table with two example users. We are passing an array of seeds to the `data` key, each seed being a key value pair of column name and value.

Another way to generate multiple seeds is to use the `count` key. When using the `count` key, you can pass an integer value to generate multiple seeds with the same data. Here's an example:

```yml{2} [users.yml]
seeds:
  count: 10
  data:
    name: 'Example User'
    email: 'example@example.com'
    password: '@hash("password")'
```

After creating your seeder, you can run your seeders using the `db:seed` command:

```bash:no-line-numbers
leaf db:seed
```

This will generate 10 seeds for the `users` table with the same data which is not very useful. To generate multiple fake seeds, you can use what other frameworks call a factory.

## Using factories for generating fake data

In Leaf MVC, factories and seeders are the same thing as we believe this confusion is unnecessary. To generate fake data, use `@` tokens as column values. A token is written exactly like the PHP call it stands for, so anything [Faker](https://fakerphp.org) can do, your YAML can do:

```yml{4-9} [users.yml]
seeds:
  count: 10
  data:
    name: '@faker.name'
    email: '@faker.unique.safeEmail'
    age: '@faker.numberBetween(18, 65)'
    plan: '@faker.randomElement(["free", "pro", "scale"])'
    api_token: '@randomString(32)'
    password: '@hash("password")'
```

Arguments are parsed with real types—numbers stay numbers, booleans stay booleans, and arrays are arrays—and chaining works the way it does in PHP, so Faker modifiers like `unique` behave correctly across all generated rows. Anything that isn't a recognised token (like a plain string that happens to contain `@`) is passed through untouched.

The available roots are:

- `@faker.*` — any [Faker formatter or modifier](https://fakerphp.org/formatters/), with arguments: `@faker.realText(120)`, `@faker.optional(0.5).phoneNumber`
- `@tick.*` — date values via [Tick](/docs/utils/date): `@tick.subtract(30, "day").format("YYYY-MM-DD")`
- `@randomString(length)` — a random string, 10 characters if no length is given
- `@hash("value")` — a bcrypt hash of the given value, perfect for passwords

Faker can also generate locale-aware data—set a locale for the whole seed run:

```yml{2} [users.yml]
seeds:
  count: 10
  locale: fr_FR
  data:
    name: '@faker.name'
```

::: details Upgrading from Leaf 4?
The old colon syntax (`@faker.date:Y-m-d`, `@randomString:16`) still works, so existing schema files keep seeding without changes—but the call syntax above is the one documented and recommended going forward.
:::

After adding your seeds, you can run your seeders using the `db:seed` command:

```bash:no-line-numbers
leaf db:seed
```

If you want to seed a specific table, you can pass the table name as an argument to the `db:seed` command:

```bash:no-line-numbers
leaf db:seed users
```

## Writing custom seeders

While schema-based seeders are great for simple data, sometimes you need more control. For complex scenarios—like pulling data from an API, processing files, or setting up intricate relationships—you can create seeders in your models. Your model can have a static `__seeder` method that contains the logic for seeding data. Here's an example:

```php [User.php]
<?php

namespace App\Models;

class User extends Model
{
  public static function __seeder(): array
  {
    return [
      'name' => fake()->name(),
      'email' => fake()->email(),
      'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
    ];
  }
}
```

In this case, your schema file's `seeds` section can simply specify the number of records to create:

```yml:no-line-numbers [users.yml]
seeds:
  count: 10
```

Schema files will automatically detect this method if the model name matches the table name, eg: `User` model for `users` table, `TestUser` model for `test_users` table, etc. You can also specify a different model name in your schema file using the `model` key:

```yml:no-line-numbers [users.yml]
seeds:
  count: 10
  model: CustomUserModel
```

Then, when you run the `db:seed` command, Leaf will call the `__seeder` method on your model to generate the seed data.

```bash:no-line-numbers
leaf db:seed
```

<!--

## Database migrations vs data migrations

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
leaf db:script ImportUsersFromOldTable
``` -->
