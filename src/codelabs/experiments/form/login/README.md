# Form Validation

## Base Example

Form validation is natively supported by the browser, but sometimes different browsers will handle things in a manner which makes relying on it a bit tricky. Even when validation is supported perfectly, there may be times when custom validations are needed and a more manual, Leaf-based solution may be more appropriate. Let’s begin with a simple example.

Given a form of two fields, make two required. Let’s look at the HTML first:

```html
<form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">
	<?php if (count($errors) > 0): ?>
		<div class="error-message">
			<b>Please correct the following error(s):</b>
			<ul>
				<?php foreach ($errors as $error): ?>
					<li><?php echo $error; ?></li>
				<?php endforeach; ?>
			</ul>
		</div>
	<?php endif; ?>
	<div>
		<label for="username">Username</label>
		<input id="username" type="text" name="username">
	</div>
	<div>
		<label for="password">Password</label>
		<input id="password" type="password" name="password">
	</div>
	<div>
		<button type="submit" name="login_btn">Submit</button>
	</div>
</form>
```

Let’s cover it from the top. The `<form>` tag that holds fields for a `username` and `password` field. There’s a submit handler that you’ll see in a bit, and the action which makes the form submit a POST request back to this file.

Beneath that there is a `div` that shows or hides itself based on an error state. This will render a simple list of errors on top of the form.

The final thing to note is that each of the fields has a corresponding `name` which we use to select the fields during validation. Now let’s look at that.

At the top of our file, we can have something like this.

```php
<?php
require "vendor/autoload.php";

$form = new Leaf\Form;

$errors = [];

if (isset($_POST["login_btn"])) {
	$validation = $form->validate([
		"username" => ["ValidUsername", "NoSpaces"],
		"password" => "required"
	]);

	if ($validation == false) $errors = $form->errors();
}
?>
```

Fairly short and simple. We `require` composer's autoloader, we can use installed packages. We then initialise the Leaf Form package and define an array to hold errors. 

Remember, our validation only happens when the form is submitted, to know if the form is sumitted, we simply test if the submit button is in our [`$_POST`](https://www.w3schools.com/php/php_superglobals_post.asp) array. If It's found, that means our form has been submitted and we can jump into validation.

Leaf has provided the [Leaf Form](2.0/core/forms) package to make our validation as simple as possible. So, we write validation rules for our `username` and `password`. We make sure that our `username` is a valid username and has no spaces and our `password` is present. If the validation fails, `$form->validate([...` which we saw before returns `false`. 

To retrieve the validation errors, we simply have to call `$form->errors()` and load our empty `$errors` array with the validation errors. It's that simple.

Dont forget to check [Leaf Form's documentation](2.0/core/forms)

<hr>

## Dynamic Login Credentials

A lot of mobile and even web apps allow users to sign in with either the email or username and their password. Things here can get a little tricky because one field can hold different information based on the user's preference. With our username/email example, one field can hold either a username or an email based on the user's preference.

As a developer, you'll have to actually make provisions for this. Not to worry, it sounds more complex than it actually is, let's see how we can implement this feature with Leaf.

For an API/AJAX example, check out [Ajax Request Validation](codelabs/v2.x/form-validation/ajax/)

### Our Form (Frontend)

We first have to let the user know that he/she can enter either a username or email, also, although it's not compulsory, our variable names should match the field values. So instead of using `username` as our field name, you can use something more expressive based on your preference of course. I'll go with `login_key`

```html
<form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">
	<?php if (count($errors) > 0): ?>
		<div class="error-message">
			<b>Please correct the following error(s):</b>
			<ul>
				<?php foreach ($errors as $error): ?>
					<li><?php echo $error; ?></li>
				<?php endforeach; ?>
			</ul>
		</div>
	<?php endif; ?>
	<div>
		<label for="login_key">Username or Email</label>
		<input id="login_key" type="text" name="login_key">
	</div>
	<div>
		<label for="password">Password</label>
		<input id="password" type="password" name="password">
	</div>
	<div>
		<button type="submit" name="login_btn">Submit</button>
	</div>
</form>
```

The `<form>` tag that holds fields for a `login_key` and `password` field. There’s a submit handler that you’ll see in a bit, and the action which makes the form submit a POST request back to this file.

Beneath that there is a `div` that shows or hides itself based on an error state. This will render a simple list of errors on top of the form.

The final thing to note is that each of the fields has a corresponding `name` which we use to select the fields during validation. Now let’s look at that.

At the top of our file, we can have something like this.

### Our "Backend"

```php
<?php
require "vendor/autoload.php";

$form = new Leaf\Form;

$errors = [];

if (isset($_POST["login_btn"])) {
	// validation happens here
```

I cut short because I'll like to explain something small here. Once our form is submitted we check for the form submission and begin out validation.

In this case, our `login_key` holds either a username or email, but we don't know which it is since it's dictated by the user's preference. As such we'll have to go through a process here. First of all, we'll have to identify whether the `login_key` value is an email or password. Leaf Form holds a simple method for this `$form->isEmail($login_key)`. If this returns true, that means it's an email, else it's a username. With this, we can write dynamic validations.

```php
if ($form->isEmail($login_key)) {
	$validation = $form->validate([
		"login_key" => "email",
		"password" => "required"
	]);

	if ($validation == false) $errors = $form->errors();
} else {
	$validation = $form->validate([
		"login_key" => ["ValidUsername", "NoSpaces"],
		"password" => "required"
	]);

	if ($validation == false) $errors = $form->errors();
}
```

With this, we have successfully written our validations for both username and password, but you notice that this very repititive. Let's try to shorten this.

```php
$validation = $form->validate([
	"login_key" => $form->isEmail($login_key) ? "email" : ["ValidUsername", "NoSpaces"],
	"password" => "required"
]);

if ($validation == false) $errors = $form->errors();
```

So at the end of the day, we have this:

```php
<?php
require "vendor/autoload.php";

$form = new Leaf\Form;

$errors = [];

if (isset($_POST["login_btn"])) {
	$validation = $form->validate([
		"login_key" => $form->isEmail($login_key) ? "email" : ["ValidUsername", "NoSpaces"],
		"password" => "required"
	]);

	if ($validation == false) $errors = $form->errors();
}
?>
```

If the validation fails, `$form->validate([...` which we saw before returns `false`. 

To retrieve the validation errors, we simply have to call `$form->errors()` and load our empty `$errors` array with the validation errors. It's that simple.

Dont forget to check [Leaf Form's documentation](2.0/core/forms)

## When To Avoid This Pattern

Let's make this as simple as possible. Do not use `$form->validate()` on values which aren't part of a request data. This only works for data passed in through forms, url get params and AJAX requests.

[Back to Codelab Experiments](codelabs/?id=code-lab-experiments)

<br>

Experiment by <a href="https://mychi.netlify.app" style="font-size: 20px; color: #111;" target="_blank">Mychi Darko</a>