# General Security

Most PHP frameworks today come equipped with basic security features right out of the box, and Leaf is no exception. Leaf provides a "background" guard dog that we call Anchor. Anchor helps protect your apps against things like CSRF, XSS and SQL Injection attacks.

You would usually spend none of your time interacting with Anchor itself, but this page breaks down what it does and how it helps keep your apps safe.

## Protecting against XSS attacks

These attacks happen when attackers pass executable scripts into your application through form input fields, urls, and other input sources. These scripts are then executed and perform whatever action the attacker needs.

Anchor prevents this by automagically cleaning up all data that comes into your application. So even if a malicious script is passed into your app, your application will treat it like text instead of a script that should be executed. Pretty cool right?

Unfortunately, this only works with Leaf functions like `request()`, `response()`, `session()`, etc. If you're using PHP's `$_POST`, `$_GET`, `$_REQUEST`, etc., you will need to sanitize your data manually.

```php{7}
<?php

require __DIR__ . '/vendor/autoload.php';

$data = $_POST['data'];

$data = anchor()->sanitize($data);

echo $data;
```

Note that sanitizing is not a replacement for validating your data. Sanitizing only helps prevent XSS attacks, but you should still validate your data to ensure it's what you expect. You should always keep in mind that user input is evil and should never be trusted 😗

## Data Validation

Data validation is the process of ensuring that data coming into your app is both safe and correct. This is important because it helps prevent attackers from passing malicious data into your application and also helps ensure that your app doesn't break because of incorrect data.

Leaf provides a [form module](/docs/data/validation) that helps you easily validate your data. This module comes with a lot of built-in rules that you can use to validate your data. You can also create custom rules to suit your needs.

## Protecting against CSRF attacks

CSRF attacks happen when an attacker tricks a user into performing actions they didn't intend to. This is usually done by sending a malicious link to the user, which when clicked, performs an action on the user's behalf.

Anchor comes with a CSRF helper that handles all the CSRF protection for you. This helper generates a CSRF token for each request and validates it on the server side. This way, you can be sure that the request is coming from your app and not from an attacker. This is not enabled by default, so you will need to enable it in your app.

You can [read the CSRF docs](/docs/security/csrf) to learn more about how to use the CSRF helper.

## Protecting against SQL Injection attacks

SQL Injection attacks happen when an attacker passes SQL queries into your application through input fields. These queries are then executed and can perform any action the attacker needs. This is a very dangerous attack as it can lead to data loss, data theft, and even data corruption.

Anchor integrates with Leaf DB and automatically takes care of all the necessary escaping for you. This way, you can be sure that all data passed into your database is safe and secure. This is enabled by default, so you don't need to worry about it.

Just keep in mind that this only works with Leaf DB. If you're using another database library, you will need to handle parameter binding and escaping yourself.

## CORS Protection

Cross-Origin Resource Sharing (CORS) is a security feature that allows you to control which domains can access your app. This is important because it helps prevent attackers from accessing your app from other domains. It also allows you to control which headers and methods are allowed for each domain.

Leaf provides a [CORS module](/docs/http/cors) that helps you easily set up CORS protection for your app.

<!-- ## Content Security Policy

Content Security Policy (CSP) is a security feature that helps prevent XSS attacks by controlling which resources can be loaded on your app. This is important because it helps prevent attackers from loading malicious scripts on your app.

Anchor provides CSP headers that you can easily add to your app. This way, you can be sure that your app is protected against XSS attacks.

```php
anchor()
  ->setReferrerPolicy('no-referrer')
  ->setXFrameOptions('DENY')
  ->setXContentTypeOptions('nosniff')
  ->setXSSProtection('1; mode=block')
  ->setCSP([...]);
``` -->

<!-- ## Signed Routes

Signed routes are a security feature that helps prevent attackers from tampering with your routes and performing actions they shouldn't. This is done by adding a signature to each route that is validated on the server side.

Anchor comes with a handy helper that helps you easily generate signed routes. This way, you can be sure that the route is coming from your app and not from an attacker.

```php
// generate a signed route
$signedRoute = anchor()->signedRoute('/protected/{user}', [
  'expires' => '1 hour',
  'data' => [
    'user' => 1,
  ]
]);

// Handle route
app()->get('/protected/{user}', function ($user) {
  if (request()->isSigned()) {
    // route is valid
  } else {
    // route is invalid
  }
});
``` -->
