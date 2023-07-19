# Leaf Form

During development, you often come accross data that should meet some expectations. For example, a user's email address should be a valid email address. Or a user's password should be at least 8 characters long. Unfortunately, you can't always trust the data you deal with, especially when it comes from the user. That's why you need to validate it.

Leaf Form is a clean and simple interface that allows you to validate data. It's not a form builder, it's not a form renderer, it's just a simple data validation library.

## Installation

You can quickly install Leaf Form using the [Leaf CLI](/cli/):

```bash
leaf install form
```

Or via composer:

```bash
composer require leafs/form
```

## Validating data

Leaf Form comes with a very handy `validate()` method that allows you to validate data. It takes in two arguments:

- An array of the data to validate
- The rules to validate the data against

<div class="class-mode">

```php{11-15}
<?php

use Leaf\Form;

$data = [
  'name' => 'Full Name',
  'email' => 'mail@example.com',
  'password' => 'password',
];

$success = Form::validate($data, [
  'name' => 'text',
  'email' => 'email',
  'password' => 'min:8',
]);

if ($success) {
  // data is valid
} else {
  // data is invalid
}
```

</div>
<div class="functional-mode">

```php{9-13}
<?php

$data = [
  'name' => 'Full Name',
  'email' => 'mail@example.com',
  'password' => 'password',
];

$success = form()->validate($data, [
  'name' => 'text',
  'email' => 'email',
  'password' => 'min:8',
]);

if ($success) {
  // data is valid
} else {
  // data is invalid
}
```

</div>

`validate()` returns a boolean value indicating whether the data is valid or not. If the data is invalid, you can get the errors using the `errors()` method.

<div class="class-mode">

```php{16}
<?php

use Leaf\Form;

...

$success = Form::validate($data, [
  'name' => 'text',
  'email' => 'email',
  'password' => 'min:8',
]);

if ($success) {
  // data is valid
} else {
  $errors = Form::errors();
  // data is invalid
}
```

</div>
<div class="functional-mode">

```php{12}
<?php

$success = form()->validate($data, [
  'name' => 'text',
  'email' => 'email',
  'password' => 'min:8',
]);

if ($success) {
  // data is valid
} else {
  $errors = form()->errors();
  // data is invalid
}
```

</div>

## Request Validation

Leaf allows you to validate request data directly on the request object. Using this method, you will interface with Leaf's request object instead of Leaf form which means you can use it without manually installing Leaf Form. To get started, all you need to do is call `validate()` on the request object.

<div class="class-mode">

```php{8-12}
<?php

$app = new Leaf\App;

...

$app->post('/register', function() use($app) {
  $success = $app->request()->validate([
    'name' => 'text',
    'email' => 'email',
    'password' => 'min:8',
  ]);

  if (!$success) {
    $errors = $app->request()->errors();
  }
});
```

</div>
<div class="functional-mode">

```php{4-8}
<?php

app()->post('/register', function() {
  $success = request()->validate([
    'name' => 'text',
    'email' => 'email',
    'password' => 'min:8',
  ]);

  if (!$success) {
    $errors = request()->errors();
  }
});
```

</div>

Note that you don't need to pass in the data to validate. The request object will automatically get the data from the request.

## Available Rules

Leaf Form comes with a number of built-in rules that you can use to validate data. Here's a list of all the available rules:

| Rule | Description |
| --- | --- |
| `required` | The field under validation must be present in the input data and not empty. |
| `email` | The field under validation must be formatted as an e-mail address. |
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

## Passing Parameters To Rules

Some rules like `min`, `max`, `between`, `match`, `contains`, `in` and `regex` require additional parameters. You can pass these parameters to the rules by separating them with a colon (`:`).

<div class="class-mode">

```php{2}
Form::validate($data, [
  'bio' => 'min:10',
]);
```

</div>
<div class="functional-mode">

```php{2}
form()->validate($data, [
  'bio' => 'min:10',
]);
```

</div>

Some rules like `between` and `in` require multiple parameters. You can pass these parameters by using an array.

<div class="class-mode">

```php{2}
Form::validate($data, [
  'bio' => 'between:[18,30]',
]);
```

</div>
<div class="functional-mode">

```php{2}
form()->validate($data, [
  'bio' => 'between:[18,30]',
]);
```

</div>

## Custom Rules

You can create your own rules using the `addRule()` method or it's alias `rule()`. It takes in three arguments:

- The name of the rule
- The rule's handler
- The rule's error message

**Note:** The rule's handler must be either a regular expression or a callable that returns a boolean value.

<div class="class-mode">

```php{1,3-8}
Form::addRule('isEven', '/^\d*[02468]$/', 'The :attribute must be an even number.');

Form::rule('superTest', function ($value) {
  // in functions, you can also add the error messages like this
  Form::message('superTest', '{field} should be superTest!');

  return $value === 'superTest';
});

...


Form::validate($data, [
  'age' => 'isEven',
]);
```

</div>
<div class="functional-mode">

```php{1,3-8}
form()->rule('isEven', '/^\d*[02468]$/', 'The {field} must be an even number.');

form()->rule('superTest', function ($value) {
  // in functions, you can also add the error messages like this
  form()->message('superTest', '{field} should be superTest!');

  return $value === 'superTest';
});

...


form()->validate($data, [
  'age' => 'isEven',
]);
```

</div>

## Custom Error Messages

You can customize the error messages for each rule by passing in an array of the rules and their error messages to the `message()` method. The keys of the array should be the names of the rules and the values should be the error messages.

<div class="class-mode">

```php
Form::message([
  'required' => '{field} is required',
  'email' => '{field} must be a valid email address',
]);
```

</div>
<div class="functional-mode">

```php
form()->message([
  'required' => '{field} is required',
  'email' => '{field} must be a valid email address',
]);
```

</div>

You can also customize the error messages for any rule by passing in the rule's name and the error message to the `message()` method.

<div class="class-mode">

```php
Form::message('required', '{field} is required');
```

</div>
<div class="functional-mode">

```php
form()->message('required', '{field} is required');
```

</div>

Note the use of `{field}`. This is a mini template that tells leaf to replace `{field}` with the current field. So in this case:

<div class="class-mode">

```php
Form::message('required', '{field} is required');
Form::validate($data, [
  'name' => 'required',
]);
```

</div>
<div class="functional-mode">

```php
form()->message('required', '{field} is required');
form()->validate($data, [
  'name' => 'required',
]);
```

</div>

The error message will be `name is required`. You can also use `{Field}` instead of `{field}` to get the field name with the first letter capitalized. You can also use `{value}` to get the value of the field.
