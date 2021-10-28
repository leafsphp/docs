# 📕 leaf MVC Migrations

For those who struggle with maintaining their database schema, or who have problems applying updates and often revert them, there is a solution. leaf MVC migrations basically help in creating and manipulating database.

<p class="alert -warning">
  Leaf CLI has been mmoved to Aloe CLI, as such, all migration commands now depend on Aloe.
</p>

## Generating a migration

You can quickly generate a migration using the `g:migration` [Aloe CLI](/aloe-cli/) command:

```bash
php leaf g:migration <Name>
```

Once again, aloe is smart, all you need to do is input the name of the table, or a reference to the file name you want to create, Aloe handles the rest.

```sh
php leaf g:migration flights
```

The new migration will be placed in your `App/Database/Migrations` directory. Each migration file name begins with a timestamp.

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

## Running migrations

To run all of your outstanding migrations, execute the `db:migrate` command:

```bash
php leaf db:migrate
```

You may also run seeds alongside your migrations if you wish to do so:

```sh
php leaf db:migrate -s
# or
php leaf db:migrate --seed
```

### Migrate single file <sup class="new-tag-1">New</sup>

Aloe also allows you to specify a particular migration to run. You can do this with the `-f`/`--file` option.

```sh
php leaf db:migrate -f users
```

### Console help (db:migrate)

```sh
Description:
  Run the database migrations

Usage:
  db:migrate [options]

Options:
  -f, --file[=FILE]     Migrate a particular file
  -s, --seed            Run seeds after migration
  -h, --help            Display this help message
  -q, --quiet           Do not output any message
  -V, --version         Display this application version
      --ansi            Force ANSI output
      --no-ansi         Disable ANSI output
  -n, --no-interaction  Do not ask any interactive question
  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug

Help:
  Run the migrations defined in the migrations directory
```

## Rolling Back Migrations

To roll back the latest migration operation, you may use the `db:rollback` command.

```bash
php leaf db:rollback
```

You may roll back a limited number of migrations by providing the `step` option to the `rollback` command. For example, the following command will roll back the last five migrations:

```bash
php leaf db:rollback -s 2
```

To roll back all migrations, you can just pass `all` as the `step` option.

```bash
php leaf db:rollback --step all
```

### Rollback single file <sup class="new-tag-1">New</sup>

Since you can migrate a single file, it only makes sense to be able to do otherwise:

```sh
php leaf db:rollback -f users
```

### Console help (db:rollback)

```sh
Description:
  Rollback all database migrations

Usage:
  db:rollback [options]

Options:
  -s, --step[=STEP]     The batch to rollback [default: "all"]
  -f, --file[=FILE]     Rollback a particular file
  -h, --help            Display this help message
  -q, --quiet           Do not output any message
  -V, --version         Display this application version
      --ansi            Force ANSI output
      --no-ansi         Disable ANSI output
  -n, --no-interaction  Do not ask any interactive question
  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug

Help:
  Rollback database migrations, add -f to rollback a specific file. Don't use -s and -f together
```

## Next Steps

The idea for leaf MVC migrations was based on Laravel migrations, so you can read [Laravel migrations](https://laravel.com/docs/7.x/migrations) for a better understanding.

- [Views](/leaf-mvc/v/2.0/core/views)
- [Leaf Core Model](/leaf/v/2.4.3/core/model)
- [Leaf Core API Controllers](/leaf/v/2.4.3/core/api-controller)
- [Leaf Auth](/leaf/v/2.4.3/core/auth)

Built with ❤ by [**Mychi Darko**](//mychi.netlify.app)
