# Leaf Mail

<!-- markdownlint-disable no-inline-html -->

Mailing in PHP apps has always been seen as a daunting task. Leaf Mail provides a simple, straightforward and efficient email API that is built on the widely used [PHPMailer Library](https://github.com/PHPMailer/PHPMailer) component.

With Leaf Mail, you can easily send emails using various drivers and services such as SMTP, Mailgun, SendGrid, Amazon SES, and sendmail. This flexibility enables you to swiftly begin sending emails through a preferred local or cloud-based service.

## Setting Up

You can install leaf mail using the leaf cli:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install mail
```

```bash:no-line-numbers [Composer]
composer require leafs/mail
```

:::

## Connecting to your mail server

Once you've installed Leaf Mail, you need to connect to your mail server. Every email you send will be sent through this connection. You can do this using the `mailer()->connect()` method. It takes in an array of configuration options that you can use to configure your mail server connection:

| Param    | Use case                                     | Required |
| -------- | -------------------------------------------- | -------- |
| host     | Hostname for your mail server                | Yes      |
| port     | Port for your mail server                    | Yes      |
| security | Any encryption supported by PHPMailer        | No       |
| auth     | Auth for your mail server                    | Based on mail server |
| charSet  | The character set to use for the email       | No       |
| debug    | Enable or disable debug mode. Supported values are 'SERVER', `false` or any value supported by PHPMailer's `SMTPDebug` config                                       | No       |
| defaults | This config is used to set default values for the `recipientEmail`, `recipientName`, `senderEmail`, `senderName`, `replyToName`, and `replyToEmail` of your emails. | No       |
| keepAlive | This config is used to keep the connection to your mail server alive. This is useful if you are sending multiple emails. It takes in a boolean.                    | No       |

Since every mail server is different, you'll need to check your mail server's documentation for the correct configuration options.

::: details Example connections

## Example SMTP connection

Below is an example of connecting to an SMTP server.

```php
use PHPMailer\PHPMailer\PHPMailer;

...

mailer()->connect([
  'host' => 'smtp.mailtrap.io',
  'port' => 2525,
  'security' => PHPMailer::ENCRYPTION_STARTTLS,
  'auth' => [
    'username' => 'MAILTRAP_USERNAME',
    'password' => 'MAILTRAP_PASSWORD'
  ]
]);
```

## Example Gmail connection

Below is an example of connecting to a Gmail server. This example uses OAuth, which is the only way to connect to Gmail servers:

```bash:no-line-numbers [Leaf CLI]
leaf install league/oauth2-google
```

```bash:no-line-numbers [Composer]
composer require league/oauth2-google
```

We install the `league/oauth2-google` package to handle the OAuth connection to Gmail. This is how the connection to Gmail would look:

```php
use League\OAuth2\Client\Provider\Google;
use PHPMailer\PHPMailer\OAuth;
use PHPMailer\PHPMailer\PHPMailer;

mailer()->connect([
  'host' => 'smtp.gmail.com',
  'port' => 465,
  'security' => PHPMailer::ENCRYPTION_SMTPS,
  'auth' => new OAuth(
    [
      'userName' => 'mail@gmail.com',
      'clientSecret' => 'CLIENT_SECRET',
      'clientId' => 'CLIENT_ID',
      'refreshToken' => 'GMAIL_REFRESH_TOKEN',
      'provider' => new Google(
        [
          'clientId' => 'CLIENT_ID',
          'clientSecret' => 'CLIENT_SECRET',
        ]
      ),
    ]
  )
]);
```

:::

## Connection in Leaf MVC

If you're using Leaf MVC, the simplest way to connect to your mail server is to use your .env file. You can update the following configuration options in your .env file:

```txt
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=xxx
MAIL_PASSWORD=xxx
MAIL_DEBUG=SERVER
MAIL_SENDER_NAME='Leaf MVC'
MAIL_SENDER_EMAIL=user@example.com
```

That's it! Leaf Mail will automatically connect to your mail server when you send an email.

While this is a simple and straightforward way to connect to your mail server, you may need finer control over your mail server connection, for example, you may want to connect to a server that only supports OAuth. In this case, you can publish the mail configuration file from Leaf MVC using the following command:

```bash:no-line-numbers
php leaf config:publish mail
```

This command will create a `config/mail.php` file which contains all the configuration options for your mail server. The configuration options are the same as the ones we listed above and will still be linked to the correct environment variables, so you can still use your .env file to configure your mail server.

You can refer to the examples above for how to connect to different mail servers. Just remember to exclude the `mailer()->connect()` section as that is already done for you.

## Writing mails

Once we have all the annoying stuff out of the way, we can now write our emails. This involves creating a new mail and then sending it when you're ready. At it's core, a mail is just a class call to the `mail()->create()` method. This method takes in the name of the mail you want to create and returns a new mail object.

```php
mailer()->create([
  'subject' => 'Leaf Mail Test',
  'body' => 'This is a test mail from Leaf Mail using gmail',
  'recipientEmail' => 'example@example.com',
  'recipientName' => 'Example'
]);
```

This is a simple example of a mail object.

The `create()` method takes in an array of options that you can use to configure your mail. Here are the available options:

| Param           | Use case                                                                                      | Required |
| :-------------- | :--------------------------------------------------------------------------------------------- | :------- |
| subject         | The subject of your email                                                                    | Yes      |
| body            | The body of your email                                                                       | Yes      |
| recipientEmail  | The email of the person you're sending the mail to                                           | Yes      |
| recipientName   | The name of the person you're sending the mail to                                            | No       |
| senderName      | The name of the person sending the mail                                                      | No       |
| senderEmail     | The email of the person sending the mail                                                     | No       |
| replyToName     | Add a name for your "Reply-To" address                                                       | No       |
| replyToEmail    | Add a "Reply-To" address                                                                      | No       |
| cc              | The email of the person you want to carbon copy                                               | No       |
| bcc             | The email of the person you want to blank carbon copy                                         | No       |
| isHTML          | A boolean value that determines if your mail is HTML or not                                   | No       |
| altBody         | This body can be read by mail clients that do not have HTML email capability such as mutt & Eudora. Clients that can read HTML will view the normal Body                       | No       |

If you're using Leaf MVC, you can turn to the terminal to create a new mail:

```bash:no-line-numbers
php leaf g:mail user
```

This will create a `UserMailer` class in the `app/mailers` directory. Leaf MVC mailers are just a collection of methods that return a new mail object. You can then call these methods in your controllers to send mails.

```php
<?php

namespace App\Mailers;

class UserMailer
{
    public static function welcome()
    {
        return mailer()->create([
            'subject' => 'Welcome to my app',
            'body' => 'This is a test mail from action',
            'recipientEmail' => 'example@example.com',
            'recipientName' => 'Example',
        ]);
    }
}
```

This example shows a UserMailer class with a `welcome()` method that returns a new mail object. With this structure, you can create multiple mail methods to handle different types of emails. For example, your UserMailer class could have a `passwordReset()` method that sends a password reset email.

## Sending mails

Once you've created your mail, you can send it using the `send()` method. This method sends the mail and returns a boolean value indicating whether the mail was sent successfully. For Leaf MVC, you can call the mailer method directly in your controller:

::: code-group

```php [Leaf]
$mail = mailer()->create([
  'subject' => 'Leaf Mail Test',
  'body' => 'This is a test mail from Leaf Mail using gmail',
  'recipientEmail' => 'example@example.com',
  'recipientName' => 'Example'
]);

$mail->send();
```

```php [Leaf MVC]
use App\Mailers\UserMailer;

...

UserMailer::welcome()->send();
```

:::

## Adding Attachments

You can add attachments to your mail using the `attach()` method. This method takes in the path to the file you want to attach or an array of paths to multiple files.

```php
mailer()
  ->create([
    'subject' => 'Leaf Mail Test',
    'body' => 'This is a test mail from Leaf Mail using gmail',
  ])
  ->attach('./attachment.txt')
  ->attach([
    './file1.txt',
    './file2.txt'
  ]);
```

## Setting default values

Some values like the sender email, and other values are common across all your mails so repeating them in every mail can be a bit annoying. To solve this, you can set default values for your mails. This can be done using the `defaults` option in the mailer config:

```php
[
  ...

  'defaults' => [
    'recipientEmail' => '...',
    'recipientName' => '...',
    'senderEmail' => '...',
    'senderName' => '...',
    'replyToName' => '...',
    'replyToEmail' => '...'
  ],
]
```

This allows you to focus on only the necessary values when creating your mails.

```php
mailer()->create([
  'subject' => 'Leaf Mail Test',
  'body' => 'This is a test mail from Leaf Mail using gmail',
]);
```

## Mail Debugging

You can enable debugging for your mails using the `debug` option in the mailer config. This option takes in a boolean value or any value supported by PHPMailer's `SMTPDebug` config. This option is useful for debugging your mails and can be set to `SERVER` to enable debugging.

```php
[
  ...

  'debug' => 'SERVER',
]
```

## Error Handling

In order not to flood your application with logs and errors, Leaf Mail gathers all errors thrown by the mail server, and saves them internally. You can return all errors with `$mail->errors()`

```php
if (!$mail->send(...)) {
  return $mail->errors();
}
```

Note that these errors are tied to the specific mail object and are only available after the mail has been sent.
