# Validating request data

A golden rule in web development is to never trust user input. Users will always find a way to break your app if you give them the chance and validating data is one way to keep your app safe. Leaf comes with built-in validation rules to help you validate your data. In this exercise, we'll look at how to validate data in Leaf.

## Built-in validation rules

These are the rules Leaf provides out-of-the-box for validating data:

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

## Validating data

Leaf provides a request object that allows you to get data passed into your app. This same object also has a `validate()` method that allows you to validate data passed into your app. The `validate()` method takes an array of data to validate and returns a boolean value. If the data is valid, it returns `true`, otherwise, it returns `false`.

::: tip request.json
This is the data we're passing into our app.

```json
{
  "name": "Michael Darko",
  "country": "Ghana",
  "city": "Accra",
  "email": "mychi@leafphp.dev"
}
```

:::

```php{6-9}
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  $isValid = request()->validate([
    'email' => 'email',
    'name' => 'text',
  ]);

  response()->json(
    $isValid ? 'success' : request()->errors()
  );
});

app()->run();
```

</div>

The array tells the `validate()` function what rule(s) to run against what data. The `email` rule is run against the email field we passed to make sure it's a valid email. In the same way, we're running the `text` method against the name field to make sure that it only contains text and spaces. You can try this out in the editor.

If you want the validation to fail, you can edit the `data` in the `request.json` file with invalid data. Try passing a number into the email field and see what happens.

## Multiple validation rules

So far, we've only looked at validating data against a single rule. But what if we want to validate data against multiple rules? We can do this by passing an array of rules into the `validate` function. For example, we can validate the email field against the `email` and `required` rules.

```php
'email' => ['required', 'email'],
```

You can add as many rules as you want to the array, in the order you want to validate the data. The only rule here is to make sure your validation rules don't fight each other. For example, if you use the `textOnly` rule and the `number` rule together, the validation will always fail because the `textOnly` rule will always fail the `number` rule.

## Getting validation errors

When validation fails, Leaf automatically stores the errors in the request object and returns `false`. You can get these errors by calling the `errors()` method on the request object. This method returns an array of errors. You can output these errors to the user or use them in any way you want.

```php
$isValid = request()->validate([
  'email' => ['required', 'email'],
  'name' => ['required', 'text'],
]);

response()->json(
  $isValid ? 'success' : request()->errors()
);
```

In the example above, we're validating the email and name fields. If the validation fails, we're outputting the errors to the user. You can try this out in the editor.
