# Validating request data

A golden rule in web development is to never trust user input. Users will always find a way to break your app if you give them the chance and validating data is one way to keep your app safe. Leaf comes with built-in validation rules to help you validate your data. In this exercise, we'll look at how to validate data in Leaf.

## Built-in validation rules

These are the rules Leaf provides out-of-the-box for validating data:

| Rule | Description |
| --- | --- |
| `email` | The field under validation must be formatted as an e-mail address. |
| `string` | The field under validation must contain only alphabetic characters and spaces. |
| `text` | The field under validation must contain only alphabetic characters and spaces. |
| `textOnly` | The field under validation must contain only alphabetic characters (no-spaces). |
| `alpha` | The field under validation must contain only alphabetic characters. |
| `alphaNum` | The field under validation must contain only alpha-numeric characters. |
| `alphaDash` | The field under validation must contain only alpha-numeric characters, underscores, and dashes. |
| `username` | The field under validation must contain only alpha-numeric characters and underscores. |
| `number` | The field under validation must contain only numeric characters. |
| `float` | The field under validation must contain only float values. |
| `date` | The field under validation must be a valid date. |
| `min` | The field under validation must have a minimum value. |
| `max` | The field under validation must have a maximum value. |
| `between` | The field under validation must be between two values in length. |
| `match` | The field under validation must match a value. |
| `contains` | The field under validation must contain a value. |
| `in` | The field under validation must be included in a given list of values. |
| `ip` | The field under validation must be a valid IP address. |
| `ipv4` | The field under validation must be a valid IPv4 address. |
| `ipv6` | The field under validation must be a valid IPv6 address. |
| `url` | The field under validation must be a valid URL. |
| `domain` | The field under validation must be a valid domain. |
| `creditCard` | The field under validation must be a valid credit card number. |
| `phone` | The field under validation must be a valid phone number. |
| `uuid` | The field under validation must be a valid UUID. |
| `slug` | The field under validation must be a valid slug. |
| `json` | The field under validation must be a valid JSON string. |
| `regex` | The field under validation must match a given regular expression. |

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
  $validatedData = request()->validate([
    'email' => 'email',
    'name' => 'string',
    'city' => 'string',
    'country' => 'string',
  ]);

  response()->json(
    $validatedData ?: request()->errors()
  );
});

app()->run();
```

</div>

The array tells the `validate()` function what rule(s) to run against what data. The `email` rule is run against the email field we passed to make sure it's a valid email. It works the same for all other fields, but there are a few things to note about Leaf's validation.

1. The `validate()` method will only return the fields that were validated. If there are fields that weren't validated, they won't be returned. *You can try this by removing the `name` field from the `validate()` method and see what happens.*
2. The `validate()` method will return the validated data if the validation passes. If the validation fails, it will return `false`. *You can try this by passing an invalid email address and see what happens.*
3. Leaf's validation assumes that every field is required. If you want to make a field optional, you can use the `optional` rule.

## Multiple validation rules

So far, we've only looked at validating data against a single rule. But what if we want to validate data against multiple rules? We can do this by passing an array of rules into the `validate` function. For example, we can validate the email field against the `email` and `required` rules.

```php
'email' => ['string', 'email'],
```

You can also use a string with rules separated by a pipe `|`.

```php
'email' => 'string|email',
```

You can add as many rules as you want, in the order you want to validate the data. The only rule here is to make sure your validation rules don't fight each other. For example, if you use the `textOnly` rule and the `number` rule together, the validation will always fail because the `textOnly` rule will always fail the `number` rule and vice versa.

## Getting validation errors

When validation fails, Leaf automatically stores the errors in the request object and returns `false`. You can get these errors by calling the `errors()` method on the request object. This method returns an array of errors. You can output these errors to the user or use them in any way you want.

```php
$validatedData = request()->validate([
  'email' => 'email',
  'name' => 'string',
]);

response()->json(
  $validatedData ?: request()->errors()
);
```

In the example above, we're validating the email and name fields. If the validation fails, we're outputting the errors to the user. You can try this out in the editor.
