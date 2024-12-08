# DB Factories

<!-- ::: warning Schema v1 released 💚
We just released a new version of Leaf Schema which replaces migrations, seeds and factories. This documentation will remain here for legacy purposes. Check out the [new schema system](/docs/database/files) for more info.
::: -->

Factories are a way to conveniently generate large amounts of database records. Instead of manually specifying the attributes for each model seed, you can use factories to define the attributes for each model. This way, you can easily generate a large number of records with random data.

## Creating a Factory

To create a factory, you can use the `g:factory` command. This command will create a new factory class in the `app/database/factories` directory.

```bash:no-line-numbers
php leaf g:factory UserFactory
```

This will create a new factory class in the `app/database/factories` directory. The factory class will contain a `definition` method that returns an array of attributes for the model. You can define the attributes for the model in this method.

```php
<?php

namespace App\Database\Factories;

use App\Models\User;
use Leaf\Factory;

class UserFactory extends Factory
{
  /**
   * The name of the factory's corresponding model.
   *
   * @var string
   */
  public $model = User::class;

  /**
   * Define the model's default state.
   *
   * @return array
   */
  public function definition()
  {
    return [
      'username' => strtolower($this->faker->firstName),
      'name' => $this->faker->name,
      'email' => $this->faker->unique()->safeEmail,
      'email_verified_at' => \Leaf\Date::now(),
      'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      'remember_token' => 'random string',
    ];
  }
}
```

This factory class defines the attributes for the `User` model. The `definition` method returns an array of attributes for the model. You can use the `faker` property to generate random data for the attributes.

## Using a Factory

To use a factory to generate records, you can use the `create` method on the factory class. This method will create a new record in the database using the attributes defined in the factory.

```php:no-line-numbers
(new UserFactory)->create(20)->save();
```

You would usually do this in your seeders to generate records for your database. You can use the `create` method to generate a single record or pass in the number of records you want to generate.

```php
<?php

namespace App\Database\Seeds;

use App\Database\Factories\UserFactory;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    (new UserFactory)->create(20)->save();
  }
}
```

This will generate 20 records in the `users` table using the attributes defined in the `UserFactory` class.

## Getting Faker Data

In some cases, you may not want to save the generated records to the database. You can use the `get()` method to get the generated data without saving it to the database.

```php:no-line-numbers
$users = (new UserFactory)->create(20)->get();
```

## Running Factories

You don't need to run factories manually. You can use the `db:seed` command to run your seeders, which will in turn run your factories.

```bash:no-line-numbers
php leaf db:seed
```
