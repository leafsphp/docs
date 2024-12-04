# CSRF Protection

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoModal from '@theme/components/shared/VideoModal.vue'
</script>

A CSRF (Cross-Site Request Forgery) attack tricks a user into performing unwanted actions on your website without their knowledge. This can be done by sending a request to your website from another website the user is logged into. To prevent this, Leaf provides a powerful CSRF protection module that handles all the funny business for you.

::: details How does CSRF work?

If you're not familiar with CSRF attacks, this amazing explanation from the Laravel documentation will help you understand how they work.

> Imagine your application has a /user/email route that accepts a POST request to change the authenticated user's email address. Most likely, this route expects an email input field to contain the email address the user would like to begin using.
>
> Without CSRF protection, a malicious website could create an HTML form that points to your application's /user/email route and submits the malicious user's own email address:

```html
<form action="https://your-application.com/user/email" method="POST">
    <input type="email" value="malicious-email@example.com">
</form>
 
<script>
    document.forms[0].submit();
</script>
```

> If the malicious website automatically submits the form when the page is loaded, the malicious user only needs to lure an unsuspecting user of your application to visit their website and their email address will be changed in your application.
>
> To prevent this vulnerability, we need to inspect every incoming `POST`, `PUT`, `PATCH`, or `DELETE` request for a secret session value that the malicious application is unable to access.

:::

## Setting Up

You can install the CSRF module through the Leaf CLI or with composer.

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install csrf
```

```bash:no-line-numbers [Composer]
composer require leafs/csrf
```

:::

## Preventing CSRF Requests

Once installed, you can enable CSRF protection in your app by passing CSRF config to your app instance. Since CSRF is a Leaf module, it comes with first-class support for Leaf apps.

```php
app()->csrf();

// ... your app
```

This will automatically generate a CSRF token using a default secret key and a random hash. The token is saved in a session, and if no session exists, the CSRF module will create a session for your app and save the token in that session. This token is then used to verify that all incoming requests are from your app.

If the CSRF token is missing or invalid, the CSRF module will throw an exception, which you can catch and handle as you see fit.

::: info Leaf MVC + CSRF

Once you install the CSRF module, Leaf will automatically pick up the `config/csrf.php` file and use it to set up CSRF protection for your app, so you don't need to manually call `app()->csrf()` or worry about passing any configuration to the CSRF module.

:::

## Protecting your forms

To protect your forms from CSRF attacks, you can add the CSRF token to your forms. The CSRF module provides a beautiful `form()` method that generates a hidden input field with the CSRF token.

::: code-group

```blade{2} [Leaf Blade]
<form action="/submit" method="POST">
    {{ csrf()->form() }}

    <!-- your form information -->
    <input type="text" name="name">
    <button type="submit">Submit</button>
</form>
```

```blade{2} [BareUI]
<form action="/submit" method="POST">
    <?php csrf()->form(); ?>

    <!-- your form information -->
    <input type="text" name="name">
    <button type="submit">Submit</button>
</form>
```

:::

Once this form is submitted, the CSRF module will verify the token and allow the request to go through if the token is valid. Note that you don't need to do anything else to verify the token; the CSRF module handles everything for you.

## X-CSRF-Token Header

In addition to forms, Leaf will also automatically check for the `X-CSRF-Token` header in your requests. If it finds the header, it will use the token in the header to verify the request. This is great for APIs or single-page applications that don't use PHP forms.

```javascript
fetch('/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': 'YOUR_CSRF_TOKEN',
  },
  body: JSON.stringify({ name: 'John Doe' }),
});
```

This will send a POST request to `/submit` with the CSRF token in the `X-CSRF-Token` header. The CSRF module will automatically verify the token and allow the request to go through if the token is valid.

## Displaying the generated token

The CSRF module also provides a `token()` method that returns the CSRF token. You can use this method to display the token in your views or to send the token to your frontend. Be careful not to expose the token to the public, as it can be used to bypass CSRF protection.

```php:no-line-numbers
$csrfToken = csrf()->token();
```

## Changing default Methods

By default, the CSRF module protects all `POST`, `PUT`, `PATCH`, and `DELETE` requests. If you want to exclude certain methods or add more methods to the list, you can pass an array of methods to the `csrf()` method.

```php
app()->csrf([
  'methods' => ['GET', 'POST'],
]);
```

This will tell the CSRF module to only protect `GET` and `POST` requests.

## Excluding Routes from CSRF Protection

There are many situations where you would want to exclude certain routes from CSRF protection. For example, you might want to exclude your homepage or a webhook route from CSRF protection since the third-party service sending requests to your webhook will have no way of knowing your CSRF token.

You can exclude routes from CSRF protection by passing an array of routes to the `csrf()` method.

```php
app()->csrf([
  'except' => ['/my-route', '/my-other-route'],
]);
```

::: tip Test Mode
Leaf automatically disables CSRF protection in test mode. This is to make it easier to test your app without having to worry about CSRF tokens. If you want to test CSRF protection, you can disable test mode by setting the `APP_ENV` environment variable to `production`.
:::

## Updating the Encryption Secret

Leaf uses a default secret key to encrypt the CSRF token. It is paired together with a random hash to create a unique token for your app. If you want to change the secret key, you can do so by passing a `secret` key to the `csrf()` method.

```php
app()->csrf([
  'secret' => 'my-new-secret-key',
]);
```

It is not required to change the secret key, but it is recommended to do so if you want to add an extra layer of security to your app.

If you have an environment file, you can set the secret key there.

```txt:no-line-numbers
X_CSRF_SECRET=my-new-secret-key
```

<!-- Leaf will automatically pick up the secret key from your environment file and use it to encrypt the CSRF token, so you don't have to pass the secret key to the `csrf()` method every time. -->

## Handling CSRF Failures

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

You can use this to handle the error in any way you want, including redirecting the user to a custom error page or logging the error.

## I keep getting a `Token not found` error

If you keep getting a `Token not found` error or any error you set in `messages.tokenNotFound`, it means the CSRF token is not being received by the CSRF module. This can happen if you're using a form that doesn't have the CSRF token or if the CSRF token is being removed by a middleware or some other part of your app.

If you are submitting a form, make sure the form has the CSRF token. You can find an example [here](#protecting-your-forms).

If you are sending a request via JavaScript, make sure the `X-CSRF-Token` header is being sent with the request. You can find an example [here](#x-csrf-token-header).
