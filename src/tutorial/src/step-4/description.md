# Leaf response

Since we've looked at creating a route, we need to know how to output data from our route. In the earlier example, we used **`echo`** to output data from our app. That approach however has some issues.

If the content type of your app is set to **`application/json`**, using echo to output **`<b>something</b>`** will give you JSON instead of html. We can test this with the editor on the right.

```php
<?php

require __DIR__ . '/vendor/autoload.php';

header('Content-Type: application/json');

app()->get('/', function () {
  echo '<b>Something</b>';
});

app()->run();
```

**Copy and paste the code above in the editor and click on run to see the results.**

You'll notice that although we're outputting html, the browser renders JSON because of the content type. That and many more inconsistencies have been addressed in Leaf's special response object. To get started with the response object, you can call the `response()` function from anywhere in your app.

```php{6}
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  response()->markup('<b>something</b>');
});

app()->run();
```

In this exercise, we'll be outputing JSON, HTML and rendering pages using the leaf response object.

## Working with JSON

Many apps today have a separate front-end and back-end. The front-end is often a single page application (SPA) that talks to the back-end through an API.

The API is just a set of links (endpoints) that send and receive data usually in JSON format. Leaf simplifies this process by providing a `json()` method on the response object.

The JSON method takes in some data to output and the [http status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) to attach.

```php{6}
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  response()->json('something');
});

app()->run();
```

Your next task is to output some JSON using the `json()` method from the editor.

- Output an array or associative array with the `json` method
- **Replace `// 1. json output` with your code**

## Working with HTML

Leaf provides a `markup()` method that allows you to output HTML. This method is useful when you want to output some HTML from your app.

```php{6}
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  response()->markup('something');
});

app()->run();
```

Try outputing some HTML using the `markup` method from the editor.

- Output some HTML with the `markup` method
- **Replace `// 2. markup output` with your code**
- Update the `path` option in the `request.json` file to the path you want to run

## Rendering Pages

Sometimes, simply being able to output html or PHP isn't enough. You may have some pre-built pages which you need to render, and that's what the `page()` method was built for.

```php{6}
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  response()->page('./index.html');
});

app()->run();
```

We've created a `page.html` file for this exercise. Your task is to output the html page using the `page()` method.

- Output the `page.html` file with the `page()` method
- **Replace `// 3. page output` with your code**
- Update the `path` option in the `request.json` file to the path you want to run

## Exiting after output

Sometimes you need to show an error in JSON or HTML. The `exit()` method lets you send a response and immediately stop the app, so nothing after `exit()` will run.

```php{7}
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  if (!is_dir('./project')) {
    response()->exit('Folder not found');
    // nothing below will run if exit is executed
  }

  response()->markup('folder found');
});

app()->run();
```

This code simply checks for a folder. If the folder is found, we output some markup otherwise we output an error and exit the application.

- Check if the `index.html` file exists
- If it doesn't, output an error with `exit()`
- **Replace `// 4. exit output` with your code**
- Update the `path` option in the `request.json` file to the path you want to run
