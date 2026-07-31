# Data Validation

Input validation is the process of checking the data that users enter into your app (like forms, login pages, or search boxes) to make sure it's correct and safe. This helps prevent mistakes, like someone entering letters where numbers are needed, and protects your app from harmful data, like malicious code.

Leaf provides a form module that helps you easily validate your data. This module comes with a lot of built-in rules validation rules, and even allows you add your own custom rules.

## Setting Up

You can install the form module using the Leaf CLI:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install form
```

```bash:no-line-numbers [Composer]
composer require leafs/form
```

:::

Once you've installed the form module, you can start validating data right on the incoming request.

## Validating an incoming request

Validation is usually done inside your route handler. This can be a function passed into the router or a controller method. Regardless of where you're validating your data, you can easily validate incoming data on the `request()` object.

Here's how you can validate incoming data:

```php
$validatedData = request()->validate([
  'title' => 'string|min:5',
  'body' => 'email',
  'description' => ['optional', 'string', 'min:8']
]);
```

The `validate()` method takes an array of rules to validate the incoming data. The keys in your array should match the keys in the incoming data. For example, if you're validating a form with a username and password, your validation array should look like this:

```php
[
  'username' => '...',
  'password' => '...',
]
```

If the incoming data doesn't match the rules you've set, the validation will fail and the `validate()` method will return false. You can get the validation errors by calling the `errors()` method on the request object.

```php
$validatedData = request()->validate([
  'title' => 'string|min:5',
  'body' => 'email',
  'description' => 'optional|string|min:8'
]);

if(!$validatedData) {
  // Handle validation errors
  $errors = request()->errors();
}
```

We do this to allow you handle validation errors in your own way. You can return the errors as JSON, redirect the user back to the form, or do anything else you want.

## Customizing Error Messages

Leaf Form comes with a default set of error messages for each validation rule. However, you can customize these messages to suit your needs. You can do this by using the `message()` method on the request object.

```php
request()->validator()->message([
  'required' => '{field} is required',
  'email' => '{field} must be a valid email address',
]);
```

It takes in an array of messages where the key is the rule name and the value is the message you want to display. The message also contains a few placeholders that you can use to display the field name in the error message. Here's a list of all the available placeholders:

- `{field}`: The name of the field being validated
- `{value}`: The value of the field being validated

If you want to capitalize the first letter of the placeholder, you just need to capitalize the first letter of the placeholder. For example, `{Field}` will display the field name with the first letter capitalized.

### Per-field messages

Sometimes a global message is too broad. You may want a friendly message for the `min` rule on the password field without changing what `min` says everywhere else. You can do this by prefixing the rule name with the field name and a dot:

```php
form()->addMessage('password.min', 'Your password should be a little longer');
form()->addMessage('username.required', 'Pick a username first');
```

Per-field messages only apply to that field, so `password.min` changes the `min` message for the password field while every other field keeps the global `min` message. Plain rule keys like `'min' => '...'` remain global.

```php
request()->validator()->message([
  'required' => '{Field} is required',
  'email' => '{field} debe ser una dirección de correo válida',
]);

...

$validatedData = request()->validate([
  'title' => 'string',
  'email' => 'email',
]);

if (!$validatedData) {
  $errors = request()->errors();
  // 'title' => 'Title is required'
  // 'email' => 'email debe ser una dirección de correo válida'
}
```

## Available Validation Rules

Leaf Form comes with a number of built-in rules that you can use to validate data. Here's a list of all the available rules:

| Rule | Description |
| --- | --- |
| `email` | The field under validation must be a valid e-mail address. This uses PHP's own email validation, so addresses with any valid TLD are accepted. |
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
| `matchesvalueof` | The field under validation must match the value of another field in the data being validated, e.g. `matchesvalueof<password>`. |
| `contains` | The field under validation must contain a value. |
| `in` | The field under validation must be included in a given list of values. |
| `ip` | The field under validation must be a valid IP address (v4 or v6). Octet ranges are checked, so `999.1.1.1` fails. |
| `ipv4` | The field under validation must be a valid IPv4 address. |
| `ipv6` | The field under validation must be a valid IPv6 address, including compressed forms like `::1`. |
| `url` | The field under validation must be a valid URL, validated with PHP's own URL validation. |
| `domain` | The field under validation must be a valid domain. |
| `creditCard` | The field under validation must be a valid credit card number. |
| `phone` | The field under validation must be a valid phone number. |
| `uuid` | The field under validation must be a valid UUID. |
| `slug` | The field under validation must be a valid slug. |
| `json` | The field under validation must be a valid JSON string. The value is actually parsed, so invalid JSON fails no matter how JSON-like it looks. |
| `regex` | The field under validation must match a given regular expression. |

## Matching another field

A common validation is checking that two fields have the same value, like a password and its confirmation. The `matchesvalueof` rule compares a field against another field in the same data set being validated:

```php
$validatedData = request()->validate([
  'password' => 'string|min:8',
  'confirmPassword' => 'matchesvalueof<password>',
]);
```

If `confirmPassword` doesn't have the same value as `password`, validation fails with a clear error message.

## Optional Fields

Unlike other validation libraries, Leaf expects all incoming data to be present. This is because we believe that all incoming data should be validated.

However, we understand that there are cases where you might want to make a field optional. You can do this by adding the `optional` rule to the field.

```php{4}
$validatedData = request()->validate([
  'title' => 'string|min:5',
  'body' => 'email',
  'description' => 'optional|string|min:8'
]);
```

Only `null`, an empty string or an empty array count as "missing" here. Falsy values like `false`, `0` and `'0'` are real values, so a checkbox that submits `false` or a quantity of `0` will still be validated normally instead of failing a required check.

## Passing parameters to rules

Some rules like `min`, `max`, `between`, `match`, `contains`, `in` and `regex` require additional parameters. You can pass these parameters to the rules by separating them with a colon (`:`).

```php{2}
request()->validate([
  'bio' => 'min:10',
]);
```

Some rules like `between` and `in` require multiple parameters. You can pass these parameters by using an array.

```php{2}
request()->validate([
  'bio' => 'between:[18,30]',
]);
```

Rule names are case-insensitive, so `Min:10` and `min:10` behave the same. The parameters you pass keep their case though, which means `contains<Foo>` looks for `Foo` and not `foo`.

## Custom Validation Rules

You can create your own rules using the `addRule()` method or it's alias `rule()`. It takes in three arguments:

- The name of the rule
- The rule's handler which can be a regular expression or a function that returns a boolean
- The rule's error message for when the rule fails

::: code-group

```php [Regular Expression]
request()->validator()->rule('isEven', '/^\d*[02468]$/', '{field} must be even.');

...

$validatedData = request()->validate([
  'number' => 'isEven',
]);
```

```php [Validator Function]
request()->validator()->rule('superTest', function ($value) {
  // in functions, you can also add the error messages like this
  request()->validator()->message('superTest', '{field} should be superTest!');

  return $value === 'superTest';
});

...

$validatedData = request()->validate([
  'test' => 'superTest'
]);
```

:::

Validator functions receive up to four arguments: the value being validated, the rule parameter, the field name and the full set of data being validated. The last one makes cross-field rules possible, like checking that an end date comes after a start date:

```php
request()->validator()->rule('afterStart', function ($value, $param, $fieldName, array $dataSource) {
  return strtotime($value) > strtotime($dataSource['start_date'] ?? '');
}, '{Field} must be after start_date');

...

$validatedData = request()->validate([
  'start_date' => 'date',
  'end_date' => 'date|afterStart',
]);
```

You only need to declare the arguments you use, so existing rules that take just the value (or the value and parameter) keep working without changes.

## Validating Indexed Arrays

PHP provides 2 different kinds of arrays: indexed arrays and associative arrays. Indexed arrays are arrays with numeric keys, while associative arrays are arrays with string keys.

An indexed array can contain a list of values, like a list of numbers or strings. Leaf allows you to validate the values in an indexed array to make sure they're what you expect.

```php
['one', 'two', 'three'] // Indexed array of strings
[1, 2, 3] // Indexed array of numbers
```

You can validate an indexed array like this:

```php
$validatedData = request()->validate([
  'items' => 'array<string>',
  'numbers' => 'array<number>'
  'emails' => 'array<email>',
  'passwords' => 'array<string|min:8>'
]);
```

The example above shows how to use the `array` rule to validate an indexed array. The `array` rule takes a type argument that can be any of the available validation rules. Using this, you can make sure that arrays don't contain any unexpected values.

## Validating Associative Arrays/Objects

Associative arrays are arrays with string keys. They're usually used to represent objects or key-value pairs. Leaf allows you to validate the values in an associative array to make sure they're what you expect.

```php
['name' => 'John Doe', 'age' => 25] // Associative array of strings and numbers
```

Unlike indexed arrays, validating associative arrays requires you to specify the rules for each key in the array. You can do this by using the `.` operator to specify the rules for each key.

```php
$validatedData = request()->validate([
  'user.name' => 'string',
  'user.age' => ['number', 'optional']
]);
```

Things get a bit funny here because a user may pass a string with the key `user.name` into your application. If you try to validate this, Leaf will fail the validation because it's expecting an associative array or object. To fix this, you can use `\.` instead of `.` to escape the `.` character.

```php
$validatedData = request()->validate([
  'user\.name' => 'string',
]);
```

## Validating Data from other sources

Sometimes, you may want to validate data that does not come from the request object. You can do this by accessing the `Leaf\Form` class directly. We have a `form()` shortcut that returns the validator instance.

```php
$dataToValidate = [
  'name' => 'John Doe',
  'age' => 25
];

$validatedData = form()->validate($dataToValidate, [
  'name' => 'string',
  'age' => 'number'
]);

if (!$validatedData) {
  $errors = form()->errors();
}
```
