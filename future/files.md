# Database Files

Leaf MVC inherited all the teachings of Laravel and Ruby on Rails, including the use of migrations, seeders, and factories which made creating, testing and seeding databases a breeze. On top of that, Leaf MVC also introduced a new concept called schema files which allowed you to generate migrations from JSON data. While this was a great feature, it was a bit too much for a lot of developers and added to the growing hell of files in your app. To solve this, we've decided to move away from the Rails/Laravel way of doing things and introduce a new way of handling database files in Leaf MVC.

## What are Database Files?

Database files are a way to handle migrations, seeders, and factories in a single file. This way, you can easily manage your database structure without having to create multiple files for each operation and without having to repeat yourself all over your app. Database files are written in yaml which makes them incredibly easy to read and write.

```yml [flights.yml]
defaultId: true
timestamps: true
columns:
  to: string
  from: string
  identifier: string

seeds:
  count: 10
  data:
    to: faker.city
    from: faker.city
    identifier: faker.uuid
```

## Creating a Database File

Aloe comes with a `g:db` command that you can use to generate a database file. You can generate a database file by running:

```bash:no-line-numbers
php leaf g:db users
```

This will create a database file at `app/database/users.yml` which looks like this:

```yml [users.yml]
defaultId: true
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
    name: faker.name
    email: faker.email
    password: "{{ bcrypt('password') }}"
```

Breaking down this file, we have:

- `defaultId`: This is used to set the default id of the table. If set to `true`, the table will have an auto-incrementing id. If set to `false`, the table will not have an id.

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
  - `data`: This is used to set the data of the seeds. The key is the column name and the value is the value of the column. You can use `faker.[value]` to generate fake data for the column. You can also use `{{ [value] }}` to use PHP code.
  - `truncate`: This is used to truncate the table before seeding.

## DB Migrations

Traditionally, migrations are used to create database tables and modify them. In Leaf MVC, you can create migrations in your database files. The `columns` key in your database file is used to create migrations. Here's an example of a migration:

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

In this example, we create a migration that creates a `users` table with `name`, `email`, `password`, and `email_verified_at` columns. To run your migrations, you can use the `db:migrate` command:

```bash:no-line-numbers
php leaf db:migrate
```

<!-- ## DB File Scripts

We understand that you might have some complicated functionality that you would want to run when migrating your database, which is why we allow you to run PHP scripts in your database files. This way, you can run any PHP code you want when migrating your database.

```yml [users.yml]
```

Now you need to create the PHP script that will run when migrating your database. You can create a PHP script at `app/database/scripts/users.php`:

```php [users.php]
```

In this example, we're running a PHP script that creates a new table in the database, but checks if particular columns exist before creating the table. -->

## DB Seeders

Seeders are used to populate your database with dummy data. In Leaf MVC, you can create seeders in your database files. The `seeders` key in your database file is used to create seeders. Here's an example of a seeder:

```yml [users.yml]
seeds:
  data:
    - name: 'Example User'
      email: 'example@example.com'
      password: "{{ bcrypt('password') }}"
```

In this example, we create a seeder that seeds the `users` table with an example user. We are passing an array of seeds to the `data` key, each seed being a key value pair of column name and value.

If you want to generate multiple seeds, you can pass an object to the `data` key instead of an array together with a `count` key:

```yml [users.yml]
seeds:
  count: 10
  data:
    name: 'Example User'
    email: 'example@example.com'
    password: "{{ bcrypt('password') }}"
```

After creating your seeder, you can run your seeders using the `db:seed` command:

```bash:no-line-numbers
php leaf db:seed
```

This will generate 10 seeds for the `users` table with the same data which is not very useful. To generate multiple fake seeds, you can use what other frameworks call a factory.

In Leaf MVC, factories and seeders are the same thing as we believe this confusion is unnecessary. If you want to generate fake data for your seeders, you can add `faker.[value]` as the value of a column in your seeder. Here's an example:

```yml{4,5} [users.yml]
seeds:
  count: 10
  data:
    name: faker.name
    email: faker.email
    password: "{{ bcrypt('password') }}"
```

In this example, we're generating 10 fake seeds for the `users` table.
