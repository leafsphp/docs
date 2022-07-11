# Leaf response

Since we've looked at creating a route, we need to know how to output data from our route. In the earlier example, we used `echo` to output data from our app. That approach however has some issues.

If the content type of your app is set to `application/json`, using echo to output `<b>something</b>` will give you JSON instead of html. We can test this with the editor on the right.

<div class="class-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

header('Content-Type: application/json');

$app = new Leaf\App;

$app->get('/', function () {
  echo "<b>Something</b>";
});

// don't forget to call run
$app->run();
```

</div>
<div class="functional-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

header('Content-Type: application/json');

app()->get('/', function () {
  echo "<b>Something</b>";
});

// don't forget to call run
app()->run();
```

</div>

Just like in the last exercise, we have empty slots for your routes. Create a route for the `/` path which uses the PUT HTTP method. **Replace `// 1. put route here` with your route**

<br>

## THE ROUTE PATH

Just as we did in the last exercise, you can pass in a custom route into these shortcut methods. Your task this time is to create a PATCH request using a custom path.

::: tip Watch out
When you're running a route other than the `/` route, you'll need to tell the editor which path you want to run. You can do this by editing the `path` option in the `request.json` file in the editor. This is not part of Leaf but is required to tell the editor what to do.
:::
