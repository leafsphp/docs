# Validating request data

Different apps require different kinds of information, for instance, your app may require a phone number and password to sign in, but another may require an email and password to sign in. In some cases, users may be able to pass in whatever data they think of directly into your apps. This is even more true in case your leaf app is an API. For this reason, you should always validate or verify the data that is passed into your app.

Leaf once again makes this process simple. We will use the leaf form module to write validation rules for our data. To get started with leaf form, <span class="class-mode">you can use the `Leaf\Form` class.</span><span class="functional-mode">you can simply call the `form` function from anywhere in your app</span>

<div class="class-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->get('/', function () use($app) {
  $rules = Leaf\Form::supportedRules();
  $app->response()->json($rules);
});

$app->run();
```

</div>
<div class="functional-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  $rules = form()->supportedRules();
  response()->json($rules);
});

app()->run();
```

</div>

For this exercise, we've populated some data which will be passed into your app in the `request.json` file. You can edit this to get different data in your app. We'll also be using different validation rules against this data.

<br>

## VALIDATION RULES

Leaf comes with some default validation rules, if you run the code above, then you'd already know some of these rules. If you haven't already done so, the code above returns all the supported validations rules leaf has by default. Throughout this exercise, we'll be using different validation rules to validate our data.

<details>
<summary>Validation rule list</summary>

| Validation rule     |  Purpose                                     |
|:--------------------|:---------------------------------------------|
| required            | field is required                             |
| number              | must only contain numbers                    |
| text                | must only contain text and spaces            |
| textOnly            | should be text only, no spaces allowed       |
| validUsername       | must only contain characters 0-9, A-Z and _  |
| username            | alias for validUsername                      |
| email               | must be a valid email                        |
| noSpaces            | can't contain any spaces                     |
| max                 | max length of a string (requires arguments)  |
| min                 | min length of a string (requires arguments)  |
| date                | string should be a valid date                |

::: tip Note
These rules are **NOT** case-sensitive, so you can type them anyway you prefer, as long as the spelling is the same.
:::

</details>

<br>

## VALIDATING OUR DATA

We've looked at all the default validation rules, but you might be asking how we can actually use these to validate our data. We can do this by calling the `validate` method on leaf form.

::: tip request.json
This is the data we're passing into our app.

```json
{
  "name": "Michael Darko",
  "country": "Ghana",
  "city": "Accra",
  "email": "mychi.darko@gmail.com"
}
```

:::

<div class="class-mode">

```php{8-11}
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->get('/', function () use($app) {
  $isValid = Leaf\Form::validate([
    'email' => 'email',
    'name' => 'text',
  ]);

  $app->response()->json(
    $isValid ? 'success' : Leaf\Form::errors()
  );
});

$app->run();
```

</div>
<div class="functional-mode">

```php{6-9}
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  $isValid = form()->validate([
    'email' => 'email',
    'name' => 'text',
  ]);

  response()->json(
    $isValid ? 'success' : form()->errors()
  );
});

app()->run();
```

</div>

We passed an array into the `validate` function above. The array tells the `validate` function what rule to run against what data. The `email` rule is run against the email field we passed to make sure it's a valid email. In the same way, we're running the `text` method against the name field to make sure that it only contains text and spaces. You can try this out in the editor.

If you want the validation to fail, you can edit the `data` in the `request.json` file with invalid data.

::: danger WIP
WIP
:::
