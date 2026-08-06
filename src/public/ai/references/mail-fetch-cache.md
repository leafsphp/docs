# Leaf 5 — Mail, Fetch & HTTP Cache Reference

## Mail

```bash
leaf install mail
```

### Connecting — Basic App

```php
mailer()->connect([
    'host'      => 'smtp.mailtrap.io',
    'port'      => 2525,
    'security'  => 'STARTTLS',
    'auth'      => ['username' => '...', 'password' => '...'],
    'debug'     => 'SERVER',   // 'SERVER', false, or PHPMailer SMTPDebug value
    'keepAlive' => true,
    'defaults'  => [
        'senderName'    => 'My App',
        'senderEmail'   => 'no-reply@myapp.com',
        'replyToName'   => 'Support',
        'replyToEmail'  => 'support@myapp.com',
    ],
]);
```

### Connecting — MVC (via `.env`)

```env
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=xxx
MAIL_PASSWORD=xxx
MAIL_DEBUG=SERVER
MAIL_SENDER_NAME='Leaf MVC'
MAIL_SENDER_EMAIL=user@example.com
```

For advanced config (OAuth, etc.):
```bash
leaf config:publish mail   # → config/mail.php
```

### Creating & Sending Mail

```php
$mail = mailer()->create([
    'subject'        => 'Hello!',
    'body'           => 'This is the email body.',
    'recipientEmail' => 'user@example.com',
    'recipientName'  => 'John Doe',
    'senderName'     => 'My App',        // optional if set in defaults
    'senderEmail'    => 'app@myapp.com', // optional if set in defaults
    'replyToName'    => 'Support',
    'replyToEmail'   => 'support@myapp.com',
    'cc'             => 'cc@example.com',
    'bcc'            => 'bcc@example.com',
    'isHtml'         => true,
    'altBody'        => 'Plain text fallback for clients without HTML support.',
]);

$mail->send();

if (!$mail->send()) {
    $errors = $mail->errors();  // errors tied to this specific mail object
}
```

### Attachments

```php
mailer()
    ->create([/* ... */])
    ->attach('./invoice.pdf')
    ->attach(['./file1.txt', './file2.txt'])
    ->send();
```

### Blade Templates (MVC)

```php
mailer()->create([
    'subject' => 'Welcome!',
    'body'    => view('emails.welcome', ['user' => $user]),
]);
```

### MVC Mailers

Generate a mailer class:
```bash
leaf g:mailer welcome   # → app/mailers/WelcomeMailer.php
```

```php
namespace App\Mailers;

class WelcomeMailer
{
    public static function firstLogin($user)
    {
        return mailer()->create([
            'subject'        => 'Welcome to Leaf MVC!',
            'body'           => 'We are excited to have you on board.',
            'recipientEmail' => $user->email,
            'recipientName'  => $user->name,
        ]);
    }
}
```

Use from a controller, job, or anywhere:
```php
use App\Mailers\WelcomeMailer;

WelcomeMailer::firstLogin($user)->send();
```

---

## Fetch (HTTP Client)

```bash
leaf install fetch
```

Inspired by JavaScript's Fetch API and Axios.

### GET Requests

```php
$res = fetch('https://jsonplaceholder.typicode.com/todos/1');
$res = fetch()->get('https://jsonplaceholder.typicode.com/todos/1');

response()->json($res->data);  // data, status, headers, request
```

### Other Methods

```php
$res = fetch()->post('https://api.example.com/posts', [
    'title' => 'foo',
    'body'  => 'bar',
]);
fetch()->put($url, $data);
fetch()->patch($url, $data);
fetch()->delete($url);
fetch()->head($url);
fetch()->options($url);

response()->json($res->data);
```

### Full Options

```php
$res = fetch([
    'method' => 'PUT',
    'url'    => 'https://api.example.com/resource/1',
    'data'   => ['firstName' => 'Fred'],
]);
```

### Base URL

```php
fetch()->baseUrl('https://jsonplaceholder.typicode.com');

$res = fetch('/todos');               // → typicode.com/todos
$res = fetch()->post('/posts', [...]);
```

### All Request Options

| Option | Default | Description |
|---|---|---|
| `url` | — | Request URL |
| `method` | `'GET'` | HTTP method |
| `baseUrl` | `''` | Prepended to `url` unless `url` is absolute |
| `headers` | `[]` | Custom headers |
| `params` | `[]` | URL query parameters (appended for any method) |
| `data` | `[]` | Request body, JSON-encoded by default; form-encoded with a `application/x-www-form-urlencoded` Content-Type header; becomes query params on GET |
| `timeout` | `0` | Timeout in seconds (0 = no timeout) |
| `auth` | `[]` | HTTP Basic auth: `['username' => ..., 'password' => ...]` |
| `maxRedirects` | `5` | Max redirects (0 = none) |
| `rawResponse` | `false` | Skip JSON parsing |
| `verifyHost` | `true` | SSL host verification |
| `verifyPeer` | `true` | SSL peer verification |
| `curl` | `[]` | Additional curl options, applied last so they win |

Non-2xx statuses return normally (check `$res->status`); only network-level failures (unreachable host, timeout) throw `\Exception`. Response header names are lower cased. Non-JSON bodies are returned as the raw string. `Fetch::config([...])` updates defaults app-wide.

---

## HTTP Cache

```php
use Leaf\Http\Cache;
```

> Use either `etag()` OR `lastModified()` per route — never both together. Call them before other route code.

### ETag

```php
app()->get('/resource', function () {
    Cache::etag('unique-resource-tag');  // change tag when resource changes
    echo 'Cached after first request';
});
```

### Last Modified

```php
app()->get('/resource', function () {
    Cache::lastModified(1617383991);     // UNIX timestamp of last modification
    echo 'Cached after first request';
});
```

### Expires

Use with `etag()` or `lastModified()` to set client-side cache expiry:

```php
app()->get('/resource', function () {
    Cache::etag('unique-tag');
    Cache::expires('+1 week');    // string (strtotime) or UNIX timestamp
    echo 'Cached for one week';
});
```

### Custom Cache Headers

```php
use Leaf\Http\Headers;

app()->get('/resource', function () {
    Headers::set('Cache-Control', 'public, max-age=3600');
    echo 'Cached for 1 hour';
});
```
