# Ajax Request Validation

## Version support

This experiment supports all 2.x versions of Leaf, however, from `v2.4-beta` upwards, Leaf methods return `null` instead of `false` when there's an error or an operation couldn't be completed.

## Base Example

Modern web app conventions have led to a lot of web apps relying on AJAX requests to a backend (API) using libraries like [axios](https://github.com/axios/axios). These backend APIs take in json encoded data from the frontend, perform some operations and send back a response.

In this experiment, we'll be looking at how to validate a AJAX requests and send back responses depending on the validation outcome.

For this section, we'll be working at a request holding JSON encoded data of an email and a password.

```php
{
  "email": "mychi.darko@gmail.com",
  "passowrd": "@mY047dhj7"
}
```

With this type of system, we don't have to interact with any markup, so we can just jump right into validation.

## Realworld Example: Building The System

In a "realworld app", such data is usually submitted to an [API endpoint](https://smartbear.com/learn/performance-monitoring/api-endpoints/) or route, so of course, we'll have to setup a handler.

We'll use leaf's core router for this.

```php
require "vendor/autoload.php";

$app = new Leaf\App;
$form = new Leaf\Form;

$app->post("/validate", function() use($app, $form) {
	// validation happens here
});

$app->run();
```

This basic example sets up a POST route to "AppUrl/validate", read [routing docs](2.0/routing/) for more info.

For our validation, we'll simply want to make sure that our email is a valid email and our password is present

```php
$app->post("/validate", function() use($app, $form) {
  $validation = $form->validate([
    "email" => "email",
    "password" => "required"
  ]);

  if ($validation == false) $app->response->throwErr($form->errors());
});
```

If the validation fails, `$form->validate([...` which we saw before returns `false`.

To retrieve the validation errors, we simply have to call `$form->errors()` and use the leaf response `throwErr` method to send back the errors to the client side app in json format. It's that simple.

Dont forget to check [Leaf Form's documentation](2.0/core/forms)

So at the end, we have an app looking like this.

```php
require "vendor/autoload.php";

$app = new Leaf\App;
$form = new Leaf\Form;

$app->post("/validate", function() use($app, $form) {
  $validation = $form->validate([
    "email" => "email",
    "password" => "required"
  ]);

  if ($validation == false) $app->response->throwErr($form->errors());
});

$app->run();
```

Experiment by <a href="https://mychi.netlify.app" style="font-size: 20px; color: #111;" target="_blank">Mychi Darko</a>
