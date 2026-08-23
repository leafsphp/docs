# Leaf 5: MVC Reference

## Controllers

```bash
leaf g:controller Users          # → app/controllers/UsersController.php
leaf g:controller photos --resource  # CRUD controller
leaf g:controller photos --api       # API CRUD controller (no create/edit)

leaf g:controller Users -m       # + model
leaf g:controller Users -t       # + view template
leaf g:controller Users -a       # + model + schema file
```

### Basic Controller

```php
namespace App\Controllers;

class UsersController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'UsersController@index']);
    }

    public function show($id)
    {
        return response()->render('users/show', ['id' => $id]);
    }
}
```

### Routes

```php
app()->get('/users', 'UsersController@index');
app()->get('/users/{id}', 'UsersController@show');
app()->get('/users', ['middleware' => 'auth', 'UsersController@index']);

// Resource routes (CRUD) — all 7 routes in one line
app()->resource('/photos', 'PhotosController');

// API resource (no create/edit routes)
app()->apiResource('/photos', 'PhotosController');
```

**Resource route map:**

| Method | URI | Action |
|---|---|---|
| GET | `/photos` | `index` |
| GET | `/photos/create` | `create` |
| POST | `/photos` | `store` |
| GET | `/photos/{id}` | `show` |
| GET | `/photos/{id}/edit` | `edit` |
| PUT/PATCH | `/photos/{id}` | `update` |
| DELETE | `/photos/{id}` | `destroy` |

---

## Models (MVC Only)

Built on Eloquent ORM, full Eloquent docs apply.

```bash
leaf g:model Flight   # → app/models/Flight.php
```

### Basic Model

```php
namespace App\Models;

class Flight extends Model
{
    // Conventions: table = 'flights' (snake_case plural of class name)
    // Primary key: 'id' (auto-incrementing integer)
    // Timestamps: created_at, updated_at (auto-managed)
}
```

### Overriding Conventions

```php
class Flight extends Model
{
    protected $table      = 'my_flights';         // custom table name
    protected $primaryKey = 'flight_id';          // custom PK
    public    $incrementing = false;              // non-auto-incrementing PK
    protected $keyType    = 'string';             // non-integer PK type
    public    $timestamps = false;               // disable timestamps
    protected $dateFormat = 'U';                 // custom timestamp format
    protected $connection = 'secondary';          // specific DB connection

    const CREATED_AT = 'creation_date';           // custom timestamp column names
    const UPDATED_AT = 'last_update';

    protected $attributes = [                     // default attribute values
        'delayed' => false,
    ];
}
```

### Querying

```php
// All records
$flights = Flight::all();

// With constraints
$flights = Flight::where('active', 1)->orderBy('name', 'desc')->take(10)->get();

// Single record
$flight = Flight::find(1);
$flight = Flight::where('number', 'FR 900')->first();

// Refresh from DB
$freshFlight = $flight->fresh();      // new instance, original unchanged
$flight->refresh();                   // re-hydrate existing instance
```

### Insert

```php
$flight       = new Flight;
$flight->name = request()->get('name');
$flight->save();   // created_at/updated_at set automatically
```

### Update

```php
$flight       = Flight::find(1);
$flight->name = 'New Name';
$flight->save();   // updated_at set automatically
```

### Delete

```php
// Hard delete (permanent)
$flight = Flight::find(1);
$flight->delete();

// Soft delete — add to schema: softDeletes: true
// Add trait to model:
use Illuminate\Database\Eloquent\SoftDeletes;
class Flight extends Model {
    use SoftDeletes;
}
// Now delete() sets deleted_at instead of removing the row
$flight->delete();
```

---

## Schema Files (MVC Only)

One YAML file per table, defines columns, seeds, and relationships. No separate migration files needed.

```bash
leaf g:schema posts       # → app/database/posts.yml

leaf db:migrate           # migrate all tables
leaf db:migrate users     # migrate specific table
leaf db:rollback          # revert last migration
leaf db:rollback users    # revert specific table
leaf db:rollback --steps=3
leaf db:reset             # rollback all → re-migrate
leaf db:reset users
leaf db:drop              # drop all tables (careful!)
leaf db:drop users
leaf db:seed              # run all seeders
leaf db:seed users        # seed specific table
```

### Full Schema Example

```yaml
# app/database/posts.yml

# auto-adds: id (auto-increment), created_at, updated_at
increments: false    # disable auto-increment id
timestamps: false    # disable auto timestamps
connection: postsDbConnection  # specific DB connection

columns:
  # Simple type
  name: string

  # With properties
  email:
    type: string
    length: 255
    unique: true
  bio:
    type: text
    nullable: true
  status:
    type: enum
    values: [draft, published, archived]
    default: draft
  verified_at:
    type: timestamp
    nullable: true
    useCurrent: false
  score:
    type: integer
    unsigned: true
    default: 0
    index: true

# Foreign keys — generates user_id → users.id
relationships:
  - User
  - Category

seeds:
  count: 10
  truncate: true
  model: CustomModel   # optional: specify model for __seeder method
  data:
    - name: 'John Doe'
      email: 'john@example.com'
    - name: 'Jane Doe'
      email: 'jane@example.com'
```

Seeding is opt-in: a schema file with no `seeds:` block seeds nothing. With a `seeds:` block, rows come from `data:` (inline), or from `model:`'s `__seeder()` method repeated `count` times.

### Faker Seeds

```yaml
seeds:
  count: 10
  data:
    name: '@faker.name'
    email: '@faker.email'
    password: '$2y$10$hashedpassword'
```

### Column Types

`boolean`, `integer`, `bigInteger`, `char`, `string`, `text`, `tinyText`, `mediumText`, `longText`, `date`, `enum`, `increments`, `bigIncrements`, `smallIncrements`, `decimal`, `float`, `double`, `unsignedBigInteger`, `id`, `uuid`, `json`, `jsonb`, `timestamp`

Eloquent writes `date` and `timestamp` columns as `YYYY-MM-DD HH:MM:SS`. Compare them with `whereDate()`, not `where()`, a string comparison against a bare `YYYY-MM-DD` treats an exact boundary date as greater-than and returns wrong rows with no error.

### Column Properties

| Property | Description |
|---|---|
| `type` | Column type (required) |
| `length` | Column length (default 255 for string) |
| `nullable` | Allow null (default false) |
| `default` | Default value |
| `unsigned` | Unsigned integer |
| `index` | Add index |
| `unique` | Unique constraint |
| `primary` | Primary key |
| `values` | Enum/set values |
| `autoIncrement` | Auto-increment |
| `useCurrent` | Default to current timestamp |
| `useCurrentOnUpdate` | Update to current timestamp on update |
| `onDelete` | FK ON DELETE action |
| `onUpdate` | FK ON UPDATE action |
| `comment` | Column comment (not SQLite) |

### Custom Seeder in Model

```php
class User extends Model
{
    public static function __seeder()
    {
        return [
            'name'     => fake()->name(),
            'email'    => fake()->email(),
            'password' => '$2y$10$hashedpassword',
        ];
    }
}
```

Schema auto-detects `__seeder` when model name matches table name (e.g. `User` → `users`, `TestUser` → `test_users`).

---

## Services (MVC)

Plain PHP classes for reusable business logic. Store in `app/services/` by convention.

```php
// app/services/StatsService.php
namespace App\Services;

class StatsService
{
    public function getDashboardData()
    {
        return ['users' => 1500, 'sales' => 2300, 'revenue' => 12000];
    }
}
```

Use with `make()`, always prefer over `new`:

```php
use App\Services\StatsService;

class DashboardController extends Controller
{
    public function index()
    {
        return response()->inertia(
            'dashboard',
            make(StatsService::class)->getDashboardData()
        );
    }
}
```

> Use services when: logic is reused across controllers, you want thin controllers, or you're encapsulating complex business operations.

---

## Custom Libraries (MVC)

For logic that doesn't fit controllers, models, or helpers. Stored in `lib/` (not autoloaded by default).

```bash
leaf config:lib   # creates lib/ and enables autoloading
```

```php
// lib/Math.php
namespace MyApp\Lib;

class Math {
    public static function add($a, $b) { return $a + $b; }
}

// lib/helpers.php (function-based)
namespace Lib;
function add($a, $b) { return $a + $b; }
```

```php
// In a controller
use MyApp\Lib\Math;
$sum = Math::add(1, 2);

// Function-based
use function Lib\add;
$sum = add(1, 2);
```

For non-autoloadable libraries, move to `lib/MyLibrary/` and create `lib/mylibrary.php` that requires the index:

```php
// lib/mylibrary.php
require __DIR__ . '/MyLibrary/index.php';
```

---

## MVC Global Helpers

### Path Helpers

```php
AppPaths();                              // all paths as array
AppPaths('controllers');                 // specific path

assets('css/main.css');                  // public/assets/css/main.css
ConfigPath('db.php');                    // config/db.php
CommandsPath('MainCommand.php');         // app/console/MainCommand.php
ControllersPath('UsersController.php');  // app/controllers/UsersController.php
DatabasePath('migrations');              // app/database/migrations
FactoriesPath('UserFactory.php');        // app/database/factories/UserFactory.php
HelpersPath('MainHelper.php');           // app/helpers/MainHelper.php
LibPath('MainLib.php');                  // lib/MainLib.php
MigrationsPath('MainMigration.php');     // app/database/migrations/MainMigration.php
ModelsPath('User.php');                  // app/models/User.php
PublicPath('index.php');                 // public/index.php
RoutesPath('_auth.php');                 // app/routes/_auth.php
SeedsPath('MainSeed.php');              // app/database/seeds/MainSeed.php
StoragePath('logs');                     // storage/logs
ViewsPath('home.blade.php');            // app/views/home.blade.php
```

### Config Helpers

```php
MvcConfig();                    // all config files
MvcConfig('db');                // config/db.php as array
MvcConfig('db', 'host');        // specific key from config

AppConfig();                    AppConfig('debug');
AuthConfig();                   AuthConfig('session');
CorsConfig();                   CorsConfig('origin');
DatabaseConfig();               DatabaseConfig('host');
MailConfig();                   MailConfig('host');
ViewConfig();                   ViewConfig('viewEngine');
```
