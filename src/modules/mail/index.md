---
title: "Leaf Mail"
---

<!-- markdownlint-disable no-inline-html -->
# 📮 Leaf Mail

Leaf mail is a cool feature added in Leaf v2 after the main beta test. Leaf Mail quickly let's you send emails both text and HTML, with attachments and a whole lot of various customizations quickly and efficiently. It is built on the [PHPMailer Library](https://github.com/PHPMailer/PHPMailer) as such, all it's methods also work in Leaf Mail. Leaf mail is now shipped as a leaf 3 module which can be installed in any project.

## Installation

You can install leaf mail with composer or the leaf cli.

```sh
composer require leafs/mail
```

or

```sh
leaf install mail
```

## Basic Usage

To get started, simply initialisation Leaf Mail.

```php
$mail = new Leaf\Mail();
```

This will allow you to use all Leaf Mail methods on the `$mail` variable.

If you plan to use `SMTP` for handling your mailing, you can pass in your connection values on initialisation:

```php
$mail = new Leaf\Mail('smtp host', PORT: int);
```

This initialises an smtp connection without authentication. To use authentication, you simply pass in an array of holding the smtp username and password

```php
$mail = new Leaf\Mail('smtp host', 0000, ['username' => 'user', 'password' => '***']);
```

There's also a fourth parameter which accepts `boolean` values. It determines whether to run in debug mode. If this is set to `true`,  it allows you to run other types of debug modes on Leaf Mail eg: server debug mode.

```php
$mail = new Leaf\Mail('smtp host', 0000, [...], true);
```

There's finally a fifth parameter which accepts `boolean` values. It determines whether to run in server debug mode. If this is set to `true`,  it shows logs from the SMTP host, making it easy to debug if the need arises.

```php
$mail = new Leaf\Mail('smtp host', 0000, [...], true, true);
```

**Note**: You must set the 4th param to `true` in order to use this feature.

Although you can initialise your SMTP connection on initialisation, you may also not want to do so due to personal preference or maybe the use of a Dependency Injection Container. For such cases, a special `smtp_connect` method has been prepared.

## smtp_connect

`smtp_connect` let's you quickly connect to your smtp server. It takes in 5 parameters

- The SMTP Host
- SMTP Port Number (Int value)
- Boolean: Whether to use authentication, the default is false (Optional)
- Authentication Username (Required if authentication is true)
- Authentication Password  (Required if authentication is true)
- The type of SMTP security (encryption) to use - default is 'STARTTLS' (Optional)

```php
// no auth example
$mail->smtp_connect('localhost', 25);

// example gmail connection
$mail->smtp_connect('smtp.gmail.com', 587, true, 'user@gmail.com', 'password', 'STARTTLS');
// or
$mail->smtp_connect('smtp.gmail.com', 587, true, 'user@gmail.com', 'password');
```

After this, you can now use all Leaf Mail's features.

## Leaf Mail Features

We'll take a look at the features Leaf Mail brings to the table.

### Basic Mail

This allows you to quickly create a simple mail. It takes in 8 parameters:

- the email subject
- the email content
- the recepient's email
- the sender's name
- the sender's email (optional)
- carbon copy (optional)
- blank carbon copy (optional)

**SYNTAX:**

```php
$mail->basic($subject, $body, $recepient_email, $sender_name, $sender_email, $cc, $bcc);
```

**Example:**

```php
// Only required fields
$email->basic("Subject", "Body", "user@mail.com", "sender name");
```

This will create the email, but in order to actually send the email, we must call the `send` method.

```php
$mail->basic(...);
$mail->send();
```

For simplicity's sake, we can also call the `send` method on the `basic` method:

```php
$mail->basic(...)->send();
```

You can catch errors with `$mail->errors()`

```php
if (!$mail->basic(...)) {
  $mail->errors();
} else {
  $mail->send();
}
```

**Note**: if the `sender_email` isn't provided, the `connection username` is used.

<hr>

### Write

Write is a more customisable way of creating emails. It has a more readable and understandable syntax as it's in key value form.

Write takes in only one parameter which is an array containing key - value pairs of the email details

Only specific values are accepted, any other values entered will be ignored. The supported values are:

- subject (required)
- body | template (optional)
- recepient_email (required)
- sender_name (required)
- sender_email (optional)
- attachment (optional)
- cc (optional)
- bcc (optional)

```php
$email->write([
  "subject" => "This is a full Write Test",
  "template" => "./template.html",
  "recepient_email" => "mychi.darko@gmail.com",
  "sender_name" => "Leaf PHP Framework",
  "attachment" => "./../attachment.txt"
]);
```

Like before, don't forget to call `send`.

```php
$email->write([...])->send();
// or
$email->write([...]);
$email->send();
```

<hr>

### loadTemplate

Load Template is a method that allows you to use a prepared template as the email body. It takes in 2 parameters:

- The name and/or PATH of the template
- Boolean: Whether or not to return the template as a string - default is false (optional)

```php
$mail->loadTemplate("./template.html");
```

```php
$template = $mail->loadTemplate("./template.txt", true);
```

<hr>

### attach

This is a method that allows you to add attachments to the email

```php
$mail->attach('./attachment');
```

<hr>

## Debugging

As with any other script, something might go wrong, not with Leaf Mail per sey, maybe with your program or with the server, as such, debugging gives you information about what went wrong and how to solve the issue.

### Mail::errors

This method gives you a simple way to track errors caused by either the developer or the user. Let's look at this example.

```php
$email->write([
  "subject" => "This is a full Write Test",
  "template" => "./template.html",
  "sender_name" => "Leaf PHP Framework",
  "attachment" => "./../attachment.txt"
]);
```

You notice that the `recepient_email` field is absent. Running this code will result in Leaf Mail catching the error and returning `false`. With this we can say that the request has failed, and to get back the error which was caught by Leaf Mail, we need to call the `errors()` method

```php
$email = $mail->write([
  "subject" => "This is a full Write Test",
  "template" => "./template.html",
  "sender_name" => "Leaf PHP Framework",
  "attachment" => "./../attachment.txt"
]);

if (!$email) {
  $app->response->exit($mail->errors());
}

$email->send();
```

### Server Debug Mode (SMTP)

We saw `Server Debug Mode` at the begining of this document. This simply allows us to view logs from our smtp server. This allows us to catch relevant information like incorect authentication credentials, server restrictions...

To get `SDM` working, you can set it on Leaf Mail initialisation like we saw before

```php
$mail = new Leaf\Mail('smtp host', PORT, [...], true, true);
```

But this is sometimes not the 'preffered' way of doing things, so we have the `smtp_debug` method which simply set's `SMTPDebug` to `SMTP::DEBUG_SERVER`(PHPMailer). This is the default configuration for this method, however, you can pass in your own configuration too

```php
$mail = new Leaf\Mail;
$mail->smtp_debug();

$email->basic("Learn Leaf PHP #2", "", "mychi.darko@gmail.com", "Leaf PHP");
$email->loadTemplate("./template.html");
$email->attach("./docs.md");

try {
  $email->send();
} catch (\Throwable $th) {
  throw $email->errors();
}
```

## Other Methods

Since Leaf Mail is built on [PHPMailer](https://github.com/PHPMailer/PHPMailer), all PHPMailer methods and variables are also valid on the `Leaf\Mail` object.

```php
$mail = new Leaf\Mail;

$mail->Subject = "...";
$mail->Body = "...";
$mail->addAttachment("...");
$mail->send();
```

```php
use Leaf\Mail\SMTP;
use Leaf\Mail\Exception;
```

For all other methods, check out [PHPMailer](https://github.com/PHPMailer/PHPMailer)

For more examples, check out [PHP Mailer's examples](https://github.com/leafsphp/leaf-mailer/tree/master/examples)
