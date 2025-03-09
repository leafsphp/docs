# Mailing with Leaf MVC

Leaf MVC provides a simple and easy-to-use interface for sending emails in PHP. You create mailers, write your email content, and send your emails. To get started with mailing in Leaf MVC, you need to install the Leaf Mail package. You can do this using the Leaf CLI:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install mail
```

```bash:no-line-numbers [Composer]
composer require leafs/mail
```

:::

After that, you can start using Leaf Mail in your Leaf application.

## Connecting to a Mail Server

Just like any other mailer, you need to connect to a mail server to send emails. You can quickly do this using your environment variables. Leaf Mail uses the following environment variables to connect to your mail server:

```txt [.env]
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=xxx
MAIL_PASSWORD=xxx
MAIL_DEBUG=SERVER
MAIL_SENDER_NAME='Leaf MVC'
MAIL_SENDER_EMAIL=user@example.com
```

That's it! Leaf Mail will automatically connect to your mail server when you send an email.

*Some mail servers may require additional configuration. For such cases, you will need to use the full configuration method. Check out the [mailer config](#configuring-mailer)*

## Writing Emails

In Leaf MVC, emails are handled through **mailers**—dedicated classes that keep your email logic clean and structured. Instead of mixing email-sending code throughout your app, mailers centralize everything in one place. For example, a `WelcomeMailer` can manage all welcome emails, with separate methods for different messages. With the MVC console, you can generate mailers instantly, making it easy to manage and scale email functionality while keeping your code simple and maintainable..

```bash:no-line-numbers
php leaf g:mailer welcome
```

This will generate a mailer at `app/mailers/WelcomeMailer.php` which looks like this:

```php
<?php

namespace App\Mailers;

class WelcomeMailer
{
    public static function action($user)
    {
        return mailer()->create([
            'subject' => 'WelcomeMailer Test',
            'body' => 'This is a test mail from action',
            'recipientEmail' => $user->email,
            'recipientName' => $user->name,

            // these have been set as defaults in .env file
            // you can override them here, otherwise, just remove them
            'senderName' => _env('MAIL_SENDER_NAME'),
            'senderEmail' => _env('MAIL_SENDER_EMAIL'),
        ]);
    }
}
```

The `action` method would usually be named something more descriptive, like `firstLogin`. This method is where you write your email content and send your email. You can use the `mailer()` helper function to create a new email instance and send it.

```php
public static function firstLogin($user)
{
    return mailer()->create([
        'subject' => 'Welcome to Leaf MVC',
        'body' => 'Welcome to Leaf MVC! We are excited to have you on board.',
        'recipientEmail' => $user->email,
        'recipientName' => $user->name,
    ]);
}
```

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

## Sending Emails

Once you have your first mailer set up, you can send your email using the `send` method. You can do this in your controllers, helpers, jobs, or anywhere in your app.

```php:no-line-numbers{8} [SendWelcomeMailJob.php]
use App\Mailers\WelcomeMailer;

...

public function handle($userId)
{
    $user = auth()->find($userId);
    WelcomeMailer::firstLogin($user)->send();
}
```

That's it! Your email will be sent to the recipient.

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

## Mail Templates

Templates are a great way to keep your email content clean and structured. Leaf Mail supports Blade templates, which means you can use Blade syntax in your email templates. To use a template, you can pass the path to the template file as the `body` option.

```php
mailer()
  ->create([
    'subject' => 'Leaf Mail Test',
    'body' => view('emails.welcome', ['user' => $user]),
  ]);
```

Be careful when writing your templates, as some email clients may not support all HTML and CSS features. You can use a service like [Litmus](https://litmus.com/) to test your emails across different email clients.

## Setting default values

Some values like the sender email, and other values are common across all your mails so repeating them in every mail can be a bit annoying. To solve this, you can set default values for your mails. This can be done using your `.env` file or the `defaults` option in the mailer config:

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

## Configuring Mailer

While you can configure Leaf Mail through your environment variables, some mailers may require additional configuration or connection using other methods like OAuth. For those methods, you need to publish Leaf MVC's default mail config using the MVC console:

```bash:no-line-numbers
php leaf config:publish mail
```

This will create a `mail.php` file in your `config` folder, which will look something like this:

```php
<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Mailer hostname
    |--------------------------------------------------------------------------
    |
    | This is the hostname for your mailer
    |
    */
    'host' => _env('MAIL_HOST', 'smtp.mailtrap.io'),

    /*
    |--------------------------------------------------------------------------
    | Mailer port
    |--------------------------------------------------------------------------
    |
    | Port to use for mailer connection
    |
    */
    'port' => _env('MAIL_PORT', 2525),

    /*
    |--------------------------------------------------------------------------
    | Keep Alive
    |--------------------------------------------------------------------------
    |
    | This config is used to keep the connection to your mail server alive.
    | This is useful if you are sending multiple emails. It takes in a boolean.
    |
    */
    'keepAlive' => true,

    /*
    |--------------------------------------------------------------------------
    | Mailer Debug
    |--------------------------------------------------------------------------
    |
    | Enable or disable debug mode. Supported values are:
    | 'SERVER', false or any value supported by PHPMailer's
    | SMTPDebug config
    |
    */
    'debug' => _env('MAIL_DEBUG', 'SERVER'),

    /*
    |--------------------------------------------------------------------------
    | Mailer Encryption
    |--------------------------------------------------------------------------
    |
    | This is the encryption used for your mailer. Supported values are:
    | 'STARTTLS' or any value supported by PHPMailer's SMTPSecure config
    |
    */
    'security' => _env('MAIL_ENCRYPTION', 'STARTTLS'),

    /*
    |--------------------------------------------------------------------------
    | Auth
    |--------------------------------------------------------------------------
    |
    | This config handles the authentication details for your mailer.
    | It supports authentication with username and password and also
    | OAuth authentication.
    |
    | For OAuth authentication, you will need to add an OAuth
    | provider like league/oauth2-google to your project.
    |
    | An example OAuth config is shown below:
    |
    | use League\OAuth2\Client\Provider\Google;
    | use PHPMailer\PHPMailer\OAuth;
    |
    | 'auth' => new OAuth(
    |   [
    |     'userName' => 'mail@gmail.com',
    |     'clientSecret' => 'CLIENT_SECRET',
    |     'clientId' => 'CLIENT_ID',
    |     'refreshToken' => 'GMAIL_REFRESH_TOKEN',
    |     'provider' => new Google(
    |       [
    |         'clientId' => 'CLIENT_ID',
    |         'clientSecret' => 'CLIENT_SECRET',
    |       ]
    |    ),
    |  ]
    |)
    */
    'auth' => [
        'username' => _env('MAIL_USERNAME'),
        'password' => _env('MAIL_PASSWORD'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Default addresses
    |--------------------------------------------------------------------------
    |
    | This config is used to set default values for the
    | `recipientEmail`, `recipientName`,
    | `senderEmail`, `senderName`,
    | `replyToName`, and `replyToEmail` of your emails.
    |
    */
    'defaults' => [
        'senderName' => _env('MAIL_SENDER_NAME'),
        'senderEmail' => _env('MAIL_SENDER_EMAIL'),
        'replyToName' => _env('MAIL_REPLY_TO_NAME'),
        'replyToEmail' => _env('MAIL_REPLY_TO_EMAIL'),
    ],
];
```

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
