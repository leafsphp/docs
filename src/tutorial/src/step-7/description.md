# Handling CORS

<details>
<summary>What is CORS</summary>

Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served.

For Ajax and HTTP request methods that can modify data (usually HTTP methods other than GET, or for POST usage with certain MIME types), the specification mandates that browsers "preflight" the request, soliciting supported methods from the server with an HTTP OPTIONS request method, and then, upon "approval" from the server, sending the actual request with the actual HTTP request method. Servers can also notify clients whether "credentials" (including Cookies and HTTP Authentication data) should be sent with requests.

</details>

Leaf provides a CORS package which helps you simply configure and handle CORS in your app. This package allows you to configure which origins (websites), headers, ... should be allowed in your app.

<details>
<summary>Adding leaf CORS to a project</summary>

::: tip
This has already been done for you in the editor, so you can just go ahead and use it.
:::

To get started with this in your project, you'll need to install it with the leaf CLI or composer:

```sh
leaf install cors
```

Or with composer:

```sh
composer require leafs/cors
```

</details>

Once the CORS package is added, it is automatically attached to the leaf instance, so you can configure it by calling the `cors` method.

<div class="class-mode">

```php{7}
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->cors();

$app->get('/', function () use($app) {
  $data = $app->request()->get('name');
  $app->response()->json($data);
});

$app->run();
```

</div>
<div class="functional-mode">

```php{5}
<?php

require __DIR__ . '/vendor/autoload.php';

app()->cors();

app()->get('/', function () {
  $data = request()->get('name');
  response()->json($data);
});

app()->run();
```

</div>

Trying the example above in the editor will throw a CORS error. You can open up the console of this website to view the exact CORS error.

<br>

## RETURNING ALL DATA PASSED IN YOUR APP

Leaf allows you to get every bit of data passed into your app all at once. This includes get request data, post request data, url encoded data, files and all of those.

To get all this data, you simply need to call the `body` method. As the name implies, this method returns the entire body of a request.

<div class="class-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->get('/', function () use($app) {
  $data = $app->request()->body();
  $app->response()->json($data);
});

$app->run();
```

</div>
<div class="functional-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  $data = request()->body();
  response()->json($data);
});

app()->run();
```

</div>

You can try this out in the editor.

### GETTING A PARTICULAR ITEM FROM THE REQUEST

Although we have an entire pool of data being passed in, sometimes you need to grab one item, maybe for validation. You can do this simply using the `get` method.

<div class="class-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->get('/', function () use($app) {
  $data = $app->request()->get('name');
  $app->response()->json($data);
});

$app->run();
```

</div>
<div class="functional-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  $data = request()->get('name');
  response()->json($data);
});

app()->run();
```

</div>

Your task is to get the `country` passed into the request.

### MULTIPLE SPECIFIC ITEMS FROM REQUEST

You can retrieve items from the request one by one, but sometimes, you might need particular items from the request for a specific task. Leaf allows you to retrieve all these items using the same `get` method. But instead of passing in a string, you pass an array of items you want to get.

<div class="class-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->get('/', function () use($app) {
  $data = $app->request()->get(['name', 'country']);
  $app->response()->json($data);
});

$app->run();
```

</div>
<div class="functional-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  $data = request()->get(['name', 'country']);
  response()->json($data);
});

app()->run();
```

</div>

In the editor, try retrieving the `country` and `city` fields.
