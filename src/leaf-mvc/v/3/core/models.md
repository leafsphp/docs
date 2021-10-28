<!-- markdownlint-disable no-inline-html -->
# 📕 leaf MVC Models

<p class="alert -warning">
  leaf MVC models extend thebase model, so read <a href="/#/leaf/v/2.4.3/core/model">the docs</a> for full functionality.
</p>

In leaf MVC, we don't really have anything to do with our models: Leaf Core has taken all the trouble out of using models, so all we have to do in leaf MVC is to generate the model and include it in our controller.

Our Models are kept in `App/Models`, but we won't need to create our models manually. leaf MVC's command line tool covers this for us.

<p class="alert -warning">
  Model commands now rely on Aloe CLI instead of the standard Leaf CLI.
</p>

```bash
php leaf g:model <Name>
```

A new model will be created in the `App\Models` directory which looks like this:

```php
<?php
namespace App\Models;

class ClassName extends Model {

}
```

That's all we **need** to do with our model. leaf MVC's models have methods prepared which allow us to manipulate out database without doing much.

We can create, read, update and delete without writing any code to specially access our database.

## Using a model

As mentioned earlier, we include models in our controller to use them. We can do that by using the `use` keyword.

```php
<?php
namespace App\Controllers;

// include the model
use App\Models\User;

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

Read [Leaf Core Model docs](leaf/v/2.4-beta/core/model) for more info on models.

Checkout [building your first app](/intro/first-app) for more practical use cases.

## Others

You can create a migration for your model by including the `-m` flag

```bash
php leaf g:model -m <ModelName>
```

### Model Help (Leaf Console)

```bash
Description:
  Create a new controller class

Usage:
  g:controller [options] [--] <controller>

Arguments:
  controller            controller name

Options:
  -a, --all             Create a model and migration for controller
  -m, --model           Create a model for controller
  -t, --template        Create a template for controller
  -r, --resource        Create a resource controller
  -w, --web             Create a web(ordinary) controller
      --api             Create an API controller
  -h, --help            Display help for the given command. When no command is given display help for the list command
  -q, --quiet           Do not output any message
  -V, --version         Display this application version
      --ansi            Force ANSI output
      --no-ansi         Disable ANSI output
  -n, --no-interaction  Do not ask any interactive question
  -ar, --api-resource   Create an API resource controller
  -wr, --web-resource   Create a web resource controller
  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug
```

## Next Steps

- [Leaf Core Model](/leaf/v/2.4.3/core/model)
- [Leaf Core API Controllers](/leaf/v/2.4.3/core/api-controller)
- [Migrations](/leaf-mvc/v/2.0/database/migrations)
- [Views](/leaf-mvc/v/2.0/core/views)

Built with ❤ by [**Mychi Darko**](//mychi.netlify.app)
