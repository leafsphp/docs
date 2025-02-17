# Models

A model is a class that represents your app’s data, acting as a bridge between your database and application. Instead of [building complex SQL queries](/docs/database/builder), models let you work with your data in a clean, reusable, and organized way.

## Why use models?

- Organization – Keeps database logic separate from your views and controllers, making your app cleaner and easier to maintain.
- Reusability – Define once, use anywhere—no need to repeat database code.
- Consistency – Enforces a structured way of interacting with data, reducing errors.

Each model maps to a database table, keeping your data structured and easy to manage.

## Creating a model

You can generate a model using the MVC Console:

```bash:no-line-numbers
php leaf g:model flight
```

This will create a model at `app/models/Flight.php` which looks like this:

```php
<?php

namespace App\Models;

class Flight extends Model
{
    // 
}
```

You may find the initial model class to be empty, which is fine. Leaf MVC handles the database connection and query building for you, so you don't need to worry about that in your model.

## Retrieving Model data

Once you have created a model and its associated database table, you are ready to start retrieving data from your database. Every model you create inherits a powerful query builder allowing you to fluently query the database table associated with the model. For example:

```php
$flights = Flight::all();

foreach ($flights as $flight) {
    echo $flight->name;
}
```

This code will retrieve all rows from the `flights` table and then loop through each row, echoing the `name` attribute of each row.

### Adding Additional Constraints

The Leaf all method will return all of the results in the model's table. Since each Leaf model serves as a query builder, you may also add constraints to queries, and then use the get method to retrieve the results:

```php:no-line-numbers
$flights = Flight::where('active', 1)->orderBy('name', 'desc')->take(10)->get();
```

> **You can check [here](https://laravel.com/docs/10.x/queries) for available queries on your models.**

### Refreshing Models

You can refresh models using the `fresh` and `refresh` methods. The `fresh` method will re-retrieve the model from the database. The existing model instance will not be affected:

```php
$flight = Flight::where('number', 'FR 900')->first();

$freshFlight = $flight->fresh();
```

The `refresh` method will re-hydrate the existing model using fresh data from the database. In addition, all of its loaded relationships will be refreshed as well:

```php
$flight = Flight::where('number', 'FR 900')->first();

$flight->number = 'FR 456';

$flight->refresh();

$flight->number; // "FR 900"
```

## Inserting data using models

Inserting data using your models involves creating a new instance of a model, setting its attributes, and saving it to the database.

```php
<?php

namespace App\Controllers;

use App\Models\Flight;

class FlightController extends Controller
{
    public function store()
    {
        // Validate the request...

        $flight = new Flight;

        $flight->name = $this->request->name;

        $flight->save();
    }
}
```

In this example, we assign the name parameter from the incoming HTTP request to the name attribute of the `Flight` model instance. When we call the save method, a record will be inserted into the database. The created_at and updated_at timestamps will automatically be set when the save method is called, so there is no need to set them manually.

## Updating data using models

To update data using a model, you retrieve the record you want to update, change its attributes, and then save it back to the database. Here's the step-by-step process:

```php
$flight = Flight::find(1); // Find the flight with an ID of 1

$flight->name = 'New Flight Name'; // Change the name attribute

$flight->save(); // Save the changes
```

In this example, we find the flight with an ID of 1, change its name attribute, and then save the changes. The updated_at timestamp will automatically be updated, so there is no need to manually set its value.

## Deleting data using models

Before we talk about how to delete data using models, let's talk about two ways to delete data using Leaf models. You can either use soft deletes or hard deletes.

### Hard deletes

A hard delete permanently removes a record from the database. Once deleted, the data is gone and cannot be recovered unless you have backups. This is the default behavior of Leaf models.

```php
$flight = Flight::find(1); // Find the flight with an ID of 1

$flight->delete(); // Delete the flight
```

### Soft deletes

A soft delete marks a record as deleted without actually removing it from the database. Instead, a `deleted_at` timestamp is set, and the record is hidden from query results. The data is still in the database, allowing you to restore it later if needed. To get started with soft deletes, add a `deleted_at` column to your table. You can do this by adding the following line to your [migration file](/docs/database/migrations):

```php:no-line-numbers
$table->timestamp('deleted_at')->nullable();
```

After that, we can add the `SoftDeletes` trait to our model. This is a trait provided by Eloquent that will automatically handle soft deletes for us:

```php
use Illuminate\Database\Eloquent\SoftDeletes;

class Flight extends Model
{
    use SoftDeletes;
}
```

Now, when you run the `delete()` method on the Flight model, the flight record will not be removed from the database but instead marked with a `deleted_at` timestamp.

```php
$flight = Flight::find(1); // Find the flight with an ID of 1

$flight->delete(); // Soft delete the flight
```

## Model conventions

Leaf models are built on top of [Laravel's Eloquent ORM](https://laravel.com/docs/11.x/eloquent), so everything you know about Eloquent applies to Leaf models. If you've never used Eloquent before, don't worry, we'll go over everything you need to get started.

Every model corresponds to a database table, which is usually the snake_case, plural form of the model name. For example, a `Flight` model corresponds to a `flights` table. If this is not the case, you can specify the table name in your model like this:

```php
<?php

namespace App\Models;

class Flight extends Model
{
    protected $table = 'my_flights';
}
```

Your model will also assume that each table has a primary key column named `id`. If this is not the case, you can specify the primary key in your model like this:

```php
class Flight extends Model
{
    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'flight_id';
}
```

In addition, Leaf assumes that the primary key is an incrementing integer value, which means that by default the primary key will automatically be cast to an int. If you wish to use a non-incrementing or a non-numeric primary key you must set the public $incrementing property on your model to false:

```php
/**
* Indicates if the IDs are auto-incrementing.
*
* @var bool
*/
public $incrementing = false;
```

If your primary key is not an integer, you should set the protected $keyType property on your model to string:

```php
/**
* The "type" of the auto-incrementing ID.
*
* @var string
*/
protected $keyType = 'string';
```

## Timestamps

By default, Leaf expects `created_at` and `updated_at` columns to exist on your tables. If you do not wish to have these columns automatically managed by Leaf, set the $timestamps property on your model to false:

```php
class Flight extends Model
{
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;
}
```

If you need to customize the format of your timestamps, set the `$dateFormat` property on your model. This property determines how date attributes are stored in the database, as well as their format when the model is serialized to an array or JSON:

```php
/**
* The storage format of the model's date columns.
*
* @var string
*/
protected $dateFormat = 'U';
```

If you need to customize the names of the columns used to store the timestamps, you may set the `CREATED_AT` and `UPDATED_AT` constants in your model:

```php
class Flight extends Model
{
    const CREATED_AT = 'creation_date';
    const UPDATED_AT = 'last_update';
}
```

## Database Connection

By default, all Leaf models will use the default database connection configured for your application. If you would like to specify a different connection for the model, use the `$connection` property:

```php
class Flight extends Model
{
    /**
     * The connection name for the model.
     *
     * @var string
     */
    protected $connection = 'connection-name';
}
```

## Default Attribute Values

If you would like to define the default values for some of your model's attributes, you may define an $attributes property on your model:

```php
<?php

namespace App\Models;

class Flight extends Model
{
    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    protected $attributes = [
        'delayed' => false,
    ];
}
```

There's a lot more you can do with models, but this should be enough to get you started. You can check out the [Eloquent documentation](https://laravel.com/docs/11.x/eloquent) for more information on what you can do with models.
