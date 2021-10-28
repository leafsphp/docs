<!-- markdownlint-disable no-inline-html -->
# 📕 Skeleton Models

<p class="alert -warning">
  Skeleton models extend the base model, so read <a href="/#/leaf/v/2.5.0/core/model">the docs</a> for full functionality.
</p>

In Skeleton, we don't really have anything to do with our models: Leaf Core has taken all the trouble out of using models, so all we have to do in Skeleton is to generate the model and include it in our controller.

Any new model created should be in the `Models` directory and should look like this:

```php
<?php
namespace Models;

class ClassName extends Model {

}
```

That's all we **need** to do with our model. Skeleton's models have methods prepared which allow us to manipulate out database without doing much.

We can create, read, update and delete without writing any code to specially access our database.

## Using a model

As mentioned earlier, we include models in our controller to use them. We can do that by using the `use` keyword.

```php
<?php
namespace Controllers;

// include the model
use Models\User;

class UserController extends Controller {
  public function index($id) {
    // use the model here
    $user = User::find($id);
    $this->respond($user);
  }
}
```

In our controller, we can do these:

```php
// return all rows
ModelName::all();

// return all rows sorted by date created
ModelName::orderBy('created_at', 'desc')->get()

// find a database row by id
ModelName::find($id);

// find a database row by title
ModelName::where('title', 'Title goes here')->get();

// create a new database row
$model = new ModelName;
$model->field = $this->request->get("field");
$model->save();

// delete a post
$model = ModelName::find($id);
$model->delete();
```

Read [Leaf Core Model docs](leaf/v/2.5.0/core/model) for more info on models.

Checkout [building your first app](/intro/first-app) for more practical use cases.

## Others

You can create a migration for your model by including the `-m` flag

```bash
php leaf g:model -m <ModelName>
```

### Model Help (Leaf Console)

```bash
Description:
  Create a new model class

Usage:
  g:model [options] [--] <model>

Arguments:
  model                 model file name

Options:
  -m, --migration       Create a migration for model
  -h, --help            Display this help message
  -q, --quiet           Do not output any message
  -V, --version         Display this application version
      --ansi            Force ANSI output
      --no-ansi         Disable ANSI output
  -n, --no-interaction  Do not ask any interactive question
  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug
```

## Next Steps

- [Leaf Core Model](/leaf/v/2.5.0/core/model)
- [Leaf Core API Controllers](/leaf/v/2.5.0/core/api-controller)
- [Migrations](/skeleton/v/2.0/database/migrations)
- [Views](/skeleton/v/2.0/core/views)

Built with ❤ by [**Mychi Darko**](//mychi.netlify.app)
