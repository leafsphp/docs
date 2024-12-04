# Migrations

<!-- ::: warning Schema v1 released 💚
We just released a new version of Leaf Schema which replaces migrations, seeds and factories. This documentation will remain here for legacy purposes. Check out the [new schema system](/docs/database/files) for more info.
::: -->

Database migrations are like version control for your database. They allow you to easily create, modify, or delete tables and columns in your database in a structured way, without having to manually write SQL queries.

When you make changes to your database like adding a new table or column, modifying an existing column's data type, or changing a relationship between tables, database migrations allow you to propagate those changes to all instances of your database.

## Generating Migrations

Leaf MVC provides a simple way to generate migrations using the `g:migration` command:

```bash
php leaf g:migration <Name>

# example

php leaf g:migration flights
```

The new migration will be placed in your `app/database/migrations` directory. Each migration file name begins with a timestamp.

## Migration Structure

A migration class contains two methods: up and down. The up method is used to add new tables, columns, or indexes to your database, while the down method should reverse the operations performed by the up method.

You can create and modify tables in the both of these methods. In this example, we create a posts table:

```php
<?php
namespace App\Database\Migrations;

use Leaf\Database;
use Illuminate\Database\Schema\Blueprint;

class CreateUsers extends Database {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    if (!$this->capsule::schema()->hasTable("posts")):
      $this->capsule::schema()->create("posts", function (Blueprint $table) {
        $table->increments('id');
        $table->string('author_id');
        $table->string('title');
        $table->text('body');
        $table->timestamps();
      });
    endif;
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    $this->capsule::schema()->dropIfExists("posts");
  }
}
```

::: tip Note
Instead of building your migrations from scratch, you can use Leaf's schema builder to generate migrations from JSON data. [Learn more](/docs/database/schema).
:::

## Running migrations

To run all of your outstanding migrations, execute the `db:migrate` command:

```bash
php leaf db:migrate
```

You may also run seeds alongside your migrations if you wish to do so:

```bash
php leaf db:migrate -s
# or
php leaf db:migrate --seed
```

You can also choose to run a specific migration file:

```bash
php leaf db:migrate -f users
```

## Rolling Back Migrations

To roll back the latest migration operation, you may use the `db:rollback` command.

```bash
php leaf db:rollback
```

You may roll back a limited number of migrations by providing the `step` option to the `rollback` command. For example, the following command will roll back the last two migrations:

```bash
php leaf db:rollback -s 2
```

To roll back all migrations, you can just pass `all` as the `step` option.

```bash
php leaf db:rollback --step all
```

You can also rollback a specific migration file:

```bash
php leaf db:rollback -f users
```

## Refreshing Migrations

If you would like to reset your database and re-run all of your migrations with seeds, you may use the `db:reset` command. This command will drop all tables in your database and re-run all of your migrations:

```bash
php leaf db:reset
```

If you want to prevent seeds from running, you can use the `--noSeed` option:

```bash
php leaf db:reset --noSeed
```
