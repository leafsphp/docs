# Leaf Mail

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoModal from '@theme/components/shared/VideoModal.vue';
import Button from '@theme/components/shared/Button.vue';
</script>

Mailing in PHP apps has always been seen as a daunting task. Leaf Mail provides a simple, straightforward and efficient email API that is built on the widely used [PHPMailer Library](https://github.com/PHPMailer/PHPMailer) component.

With Leaf Mail, you can easily send emails using various drivers and services such as SMTP, Mailgun, SendGrid, Amazon SES, and sendmail. This flexibility enables you to swiftly begin sending emails through a preferred local or cloud-based service.

<div
    class="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg sm:max-w-[50%]"
>
    <div
        class="w-full flex md:flex-col bg-gradient-to-br from-pink-500 to-rose-500"
    >
        <div
            class="sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6"
        >
            <h3 class="text-xl font-semibold mb-2 text-shadow !mt-0">
                Using Leaf MVC?
            </h3>
            <p class="font-medium text-rose-100 text-shadow mb-4">
                We've crafted a specialized guide for routing in Leaf MVC. While it's similar to the mailing in Leaf, it's more detailed and tailored for Leaf MVC.
            </p>
            <Button
                as="a"
                href="/docs/utils/mail/mvc"
                class="mt-auto bg-rose-900 hover:!bg-rose-900 !text-white bg-opacity-50 hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-bold py-2 px-4 inline-flex"
                >Start mailing now</Button
            >
        </div>
        <!-- <div
            class="relative md:pl-6 xl:pl-8 hidden sm:block"
        >
            Hello
        </div> -->
    </div>
    <div
        class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-rose-500 hidden sm:block"
    ></div>
</div>

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

## Sending mails

Once you've created your mail, you can send it using the `send()` method. This method sends the mail and returns a boolean value indicating whether the mail was sent successfully:

```php
$mail = mailer()->create([
  'subject' => 'Leaf Mail Test',
  'body' => 'This is a test mail from Leaf Mail using gmail',
  'recipientEmail' => 'example@example.com',
  'recipientName' => 'Example'
]);

$mail->send();
```

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
