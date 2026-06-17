# Leaf Mail

<!-- markdownlint-disable no-inline-html -->

<section class="not-prose my-10 overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
  <div class="grid gap-0 2xl:grid-cols-[1fr_0.9fr]">
    <div class="border-b border-neutral-200 p-6 sm:p-8 2xl:border-b-0 2xl:border-r dark:border-neutral-800">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">Product email</p>
      <h1 class="m-0 text-3xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-4xl">Send transactional email without fighting PHP mail setup.</h1>
      <p class="!m-0 !mt-4 text-base leading-7 text-neutral-600 dark:text-neutral-400">Leaf Mail wraps PHPMailer with a Leaf-friendly API for SMTP, Gmail, Mailgun, SendGrid, Amazon SES, sendmail, and MVC mailers.</p>
    </div>
    <div class="bg-neutral-50 p-6 dark:bg-neutral-900/60 sm:p-8">
      <div class="rounded-lg border border-neutral-200 bg-white p-4 font-mono text-sm text-neutral-700 dark:border-neutral-800 dark:bg-black dark:text-neutral-300">
        <div><span class="text-neutral-400">$</span> leaf install mail</div>
        <div class="mt-4 text-[var(--vp-c-brand-1)]">mailer()-&gt;create([</div>
        <div class="pl-4 text-sky-600 dark:text-sky-400">'subject' =&gt; 'Welcome to Leaf'</div>
        <div>])-&gt;send();</div>
      </div>
      <div class="mt-4 rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
        <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">Using Leaf MVC?</p>
        <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Use the MVC mail guide for mailer classes, environment config, and app-ready examples.</p>
        <a class="mt-3 inline-flex text-sm font-semibold text-[var(--vp-c-brand-1)] no-underline" href="/docs/utils/mail/mvc">Open MVC mail -&gt;</a>
      </div>
    </div>
  </div>
</section>

Mailing in PHP apps has always been seen as a daunting task. Leaf Mail provides a simple, straightforward and efficient email API that is built on the widely used [PHPMailer Library](https://github.com/PHPMailer/PHPMailer) component.

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
