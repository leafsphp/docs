# Schema Files

Leaf MVC inherited all the teachings of Laravel and Ruby on Rails, including the use of migrations, seeders, and factories which made creating, testing and seeding databases a breeze. It even introduced schema files, allowing you to generate migrations from JSON data. While helpful, this added complexity and clutter to projects. To simplify things, we’re moving away from the Rails/Laravel approach and creating a more streamlined, Leaf-like solution.

## What are Schema Files?

Schema files build on the JSON schema idea we introduced in earlier Leaf MVC versions, but they take things further. Instead of juggling separate files for migrations, seeders, and factories, you can handle everything in one place. They’re written in YAML, so they’re easy to read and work with—no extra hassle, no repeating yourself.

```yml [flights.yml]
increments: true
timestamps: true
columns:
  to: string
  from: string
  identifier: string

seeds:
  count: 10
  data:
    to: 'faker:city'
    from: 'faker:city'
    identifier: 'faker:uuid'
```

## Creating a Schema File

Aloe comes with a `g:schema` command that you can use to generate a database file. You can generate a database file by running:

```bash:no-line-numbers
php leaf g:schema <table-name>
```

Remember, every schema file is tied to a table in your database. When you run the command above, Leaf will create a schema file in your `app/database` directory with the name `<table-name>.yml`. Here’s an example:

```bash:no-line-numbers
php leaf g:schema users
```

This will create a schema file at `app/database/users.yml` which looks like this:

```yml [users.yml]
increments: true
timestamps: true
columns:
  name: string
  email:
    type: string
    length: 255
    unique: true
  password: string
  email_verified_at: timestamp

seeds:
  count: 10
  data:
    name: 'faker:name'
    email: 'faker:email'
    password: 'hash:password'
```

Breaking down this file, we have:

- `increments`: This is used to set the default id of the table. If set to `true`, the table will have an auto-incrementing id. If set to `false`, the table will not have an id, and you can set your own primary key.

- `timestamps`: This is used to set timestamps on the table. If set to `true`, the table will have `created_at` and `updated_at` columns. If set to `false`, the table will not have timestamps.

- `columns`: This is used to set the columns of the table. The key is the column name and the value is a key value pair of column properties. The available properties are:
  - `type`: The type of the column. This can be `string`, `integer`, `timestamp` or any type supported by Laravel's Eloquent.
  - `length`: The length of the column. This is only used for `string` columns.
  - `unique`: This is used to set the column as unique.
  - `nullable`: This is used to set the column as nullable.
  - `default`: This is used to set the default value of the column.
  - `autoIncrement`: This is used to set the column as auto-incrementing.
  - `unsigned`: This is used to set the column as unsigned.
  - `index`: This is used to set the column as an index.
  - `primary`: This is used to set the column as the primary key.
  - `foreign`: This is used to set the column as a foreign key. The value of this key is the table and column the column is a foreign key to.
  - `onDelete`: This is used to set the `ON DELETE` constraint of the foreign key.
  - `onUpdate`: This is used to set the `ON UPDATE` constraint of the foreign key.

- `seeds`: This is used to set the seeders of the table. The available properties are:
  - `count`: This is used to set the number of seeds to generate.
  - `data`: This is used to set the data of the seeds. The key is the column name and the value is the value of the column. You can use `faker:[value]` to generate fake data for the column. <!-- You can also use `{{ [value] }}` to use PHP code, but this is a separate PHP thread which means you can't use variables from the current scope. -->
  - `truncate`: This is used to truncate the table before seeding.

## Database tables

Traditionally, migrations are used to create database tables and modify them. In Leaf MVC, every schema file is tied to a particular table which is the name of the file. All you need to do is modify the columns of the table using the `columns` key in your schema file. Here's an example:

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

## Migration histories

Migration histories are used to keep track of the migrations that have been run on your database. This is useful for keeping track of the state of your database so you can easily roll back to a previous state if needed. Unlike in other frameworks, Leaf MVC does require you to manually create migrations to keep track of your migration history. This is done automatically for you.

Every time you edit a schema file and run the `db:migrate` command, Leaf will automatically keep track of the migrations that have been run on your database, which means less time scrambling through migration files and more time building your app.

In the end, this means you can continue to use `php leaf db:rollback` to roll back your database to a previous state.

## Seeding your database

Database seeds are a way to populate a database with initial data. This initial data can be used to set up default values or pre-populate a database with test data. Database seeds typically contain small amounts of data, such as default settings, test data, or sample records.

Seeders are used to populate your database with dummy data. In Leaf MVC, you can create seeders in your database files. The `seeders` key in your database file is used to create seeders. Here's an example of a seeder:

```yml [users.yml]
seeds:
  data:
    - name: 'Example User'
      email: 'example@example.com'
      password: 'hash:password'
    - name: 'Another User'
      email: 'another@example.com'
      password: 'hash:password'
```

In this example, we create a seeder that seeds the `users` table with two example users. We are passing an array of seeds to the `data` key, each seed being a key value pair of column name and value.

Another way to generate multiple seeds is to use the `count` key. When using the `count` key, you can pass an integer value to generate multiple seeds with the same data. Here's an example:

```yml{2} [users.yml]
seeds:
  count: 10
  data:
    name: 'Example User'
    email: 'example@example.com'
    password: 'hash:password'
```

After creating your seeder, you can run your seeders using the `db:seed` command:

```bash:no-line-numbers
php leaf db:seed
```

This will generate 10 seeds for the `users` table with the same data which is not very useful. To generate multiple fake seeds, you can use what other frameworks call a factory.

In Leaf MVC, factories and seeders are the same thing as we believe this confusion is unnecessary. If you want to generate fake data for your seeders, you can add `faker:[value]` as the value of a column in your seeder. Here's an example:

```yml{4,5} [users.yml]
seeds:
  count: 10
  data:
    name: 'faker:name'
    email: 'faker:email'
    password: 'hash:password'
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
