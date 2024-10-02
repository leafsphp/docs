# Leaf CSRF <sup class="vt-badge warning">Beta</sup>

<div style="display:flex; gap:5px;">

[![Latest Stable Version](https://poser.pugx.org/leafs/csrf/v/stable)](https://packagist.org/packages/leafs/csrf)

[![Total Downloads](https://poser.pugx.org/leafs/csrf/downloads)](https://packagist.org/packages/leafs/csrf)

[![License](https://poser.pugx.org/leafs/csrf/license)](https://packagist.org/packages/leafs/csrf)

</div>

A CSRF (Cross-Site Request Forgery) attack tricks a user into performing unwanted actions on your website without their knowledge. This can be done by sending a request to your website from another website the user is logged into. To prevent this, Leaf provides a powerful CSRF protection module that handles all the funny business for you.

## Installation

You can easily install Leaf CSRF using [Composer](https://getcomposer.org/).

```bash
composer require leafs/csrf
```

or with leaf CLI

```bash
leaf install csrf
```

## Basic Usage

Once installed, you can enable CSRF protection in your app by passing CSRF config to your app instance. Since CSRF is a Leaf module, it comes with first-class support for Leaf apps.

```php
app()->csrf();

// ... your app
```

### Using CSRF outside of leaf

Most leaf modules can be used outside of leaf. This module is one of these global modules. If you decide to use the CSRF module outside of leaf, you will need to manually initialize the package.

```php
Leaf\Anchor\CSRF::init();
```

This function generates a token with a secret and a random hash and saves that in a session. If no session exists, the CSRF module will create a session for your app and save the token in that session,

### Config

Just like every other leaf module, this module also allows you to customize it to behave in any way you want it to behave. Also, since this module is built on the Anchor module, the config object is shared with Anchor. To set any configuration, simply call the `config` method.

**Available config:**

- **secretKey** - This is the key with which the token is saved and used in your leaf app. If this is not specified, leaf uses the name `_token` as done in other frameworks like Laravel.

- **secret** - This is the secret key used to encrypt the token. Leaf also has a default secret key set for you. Note that the secret key is attached to a set of unique numbers that not even leaf knows.

- **except** - This is an array of routes that you want to exclude from the CSRF protection.

- **methods** - This is an array of HTTP methods to apply CSRF protection to. By default, leaf uses `["POST", "PUT", "PATCH", "DELETE"]`

```php
use Leaf\Anchor\CSRF;

CSRF::config([
  'methods' => ['GET'],
  'except' => ['/'],
]);
```

## Token

A token is generated under the hood for your application, you can get this token to submit in forms using the `token` method.

```php
$csrfToken = Leaf\Anchor\CSRF::token();

>> "TOKEN VALUE"
```

## Form

You would usually want to append a hidden input field holding the token to a form so it doesn't fail the CSRF check. Although you can use the `token` method above to do just that, the `form` method makes it a lot easier as it renders the input field and populates it with the token.

```php
<form ...>
  <?php Leaf\Anchor\CSRF::form(); ?>
  ...
</form>
```

## Error Handling

By default, Leaf will output a built-in error page when a CSRF token is invalid. You can customize the messages shown on this page by updating your `config` object.

```php
app()->csrf([
  'messages.tokenNotFound' => 'Token not found',
  'messages.tokenInvalid' => 'Invalid token.',
]);
```

This will update the messages shown when a token is not found or invalid. If you want to handle the error yourself, you can pass an error handler to the `csrf` method.

```php
app()->csrf([
  'onError' => function($error) {
    if ($error === "tokenNotFound") {
      // handle token not found error
    } else {
      // handle invalid token error
    }
  }
]);
```

You can use this to handle the error in any way you want.
