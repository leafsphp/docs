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

**Copy and paste the code above in the editor and click on run to see the results.**

You'll notice that although we're outputting html, the browser renders JSON because of the content type. That and many more inconsistencies have been addressed in the response object. To get started with the response object, <span class="class-mode">you can call the `response` method on the leaf instance or use the `Leaf\Http\Response` class.</span><span class="functional-mode">you can simply call the `response` function from anywhere in your app</span>

<div class="class-mode">

```php{8}
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->get('/', function () {
  $app->response()->markup('something');
});

// don't forget to call run
$app->run();
```

</div>
<div class="functional-mode">

```php{6}
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  response()->markup('something');
});

// don't forget to call run
app()->run();
```

</div>

In this exercise, we'll be rendering various content types with leaf response. Let's jump right into it.

<br>

## WORKING WITH JSON

Today, most APIs output JSON to the client, and this requires you to set a content type and encode your data as JSON. All of this however, has been taken by leaf. All you need to do is to call the `json` method on the leaf response object. The JSON method takes in some data to output and the [http status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) to attach

<div class="class-mode">

```php{8}
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->get('/', function () {
  $app->response()->json('something');
});

// don't forget to call run
$app->run();
```

</div>
<div class="functional-mode">

```php{6}
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  response()->json('something');
});

// don't forget to call run
app()->run();
```

</div>

Try outputing an array or associative array with the `json` method from the editor. You can do this in the slot that says `// 1. json output`
