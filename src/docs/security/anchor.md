# General Security

Most PHP frameworks today come equipped with basic security features right out of the box, and Leaf is no exception. Leaf provides a "background" guard dog that we call Anchor. Anchor helps protect your apps against things like CSRF, XSS and SQL Injection attacks.

You would usually spend none of your time interacting with Anchor itself, but this page breaks down what it does and how it helps keep your apps safe.

## Protecting against XSS attacks

These attacks happen when attackers pass executable scripts into your application through form input fields, urls, and other input sources. These scripts are then executed and perform whatever action the attacker needs.

Anchor prevents this by automagically cleaning up all data that comes into your application. So even if a malicious script is passed into your app, your application will treat it like text instead of a script that should be executed. Pretty cool right?

Unfortunately, this only works with Leaf functions like `request()` and `session()`. If you're using PHP's `$_POST`, `$_GET`, `$_REQUEST`, etc., you will need to sanitize your data manually with `Leaf\Anchor::sanitize()`:

```php{7}
<?php

require __DIR__ . '/vendor/autoload.php';

$data = $_POST['data'];

$data = Leaf\Anchor::sanitize($data);

echo $data;
```

Both `request()` and `session()` let you opt out per call when you need the raw value, for example when you're storing markdown that will be escaped at render time:

```php:no-line-numbers
request()->get('bio', false);   // second argument: sanitize?
session()->get('draft', null, false);  // third argument: sanitize?
```

Note that sanitizing is not a replacement for validating your data. Sanitizing only helps prevent XSS attacks, but you should still validate your data to ensure it's what you expect. You should always keep in mind that user input is evil and should never be trusted 😗

## Data Validation

Data validation is the process of ensuring that data coming into your app is both safe and correct. This is important because it helps prevent attackers from passing malicious data into your application and also helps ensure that your app doesn't break because of incorrect data.

Leaf provides a [form module](/docs/data/validation) that helps you easily validate your data. This module comes with a lot of built-in rules that you can use to validate your data. You can also create custom rules to suit your needs.

## Protecting against CSRF attacks

CSRF attacks happen when an attacker tricks a user into performing actions they didn't intend to. This is usually done by sending a malicious link to the user, which when clicked, performs an action on the user's behalf.

Anchor comes with a CSRF helper that handles all the CSRF protection for you. It issues a token for the session and validates it on every state-changing request, so you can be sure the request came from your app and not from somewhere else. Tokens can also be rotated on every request if you want them single-use. This is not enabled by default, so you will need to enable it in your app.

You can [read the CSRF docs](/docs/security/csrf) to learn more about how to use the CSRF helper.

## Protecting against SQL Injection attacks

SQL Injection attacks happen when an attacker passes SQL queries into your application through input fields. These queries are then executed and can perform any action the attacker needs. This is a very dangerous attack as it can lead to data loss, data theft, and even data corruption.

[Leaf DB](/docs/database/) runs your queries as prepared statements: the values you pass are sent to the database separately from the SQL, so they are never parsed as part of the query. That covers the query builder and models, and it's on by default with nothing to configure.

Just keep in mind that this only applies to queries you build through Leaf DB. Raw SQL you assemble yourself, and any other database library, still need their own parameter binding.

## CORS Protection

Cross-Origin Resource Sharing (CORS) is a security feature that allows you to control which domains can access your app. This is important because it helps prevent attackers from accessing your app from other domains. It also allows you to control which headers and methods are allowed for each domain.

Leaf provides a [CORS module](/docs/http/cors) that helps you easily set up CORS protection for your app.

## Passwords

Never store passwords as plain text or as a plain hash of the password. Leaf's [password helpers](/docs/data/encryption) hash with bcrypt or Argon2id, verify in constant time, and support a pepper that lives in your app rather than your database, so a leaked database alone isn't enough to crack them. [Leaf Auth](/docs/auth/) uses these by default, so you get this without doing anything.

## What Leaf does in production

A few protections switch on by themselves once your app runs with `APP_ENV=production`:

- **Error output is hidden.** Visitors get a clean error page instead of a stack trace with your file paths and variables in it. The full report still reaches your logs and any reporting service you attach. See [error handling](/docs/routing/error-handling#disabling-error-reporting).
- **Session cookies are marked secure over HTTPS.** Leaf checks the connection at boot and sets the flag for you, so session cookies aren't sent over plain HTTP. Set `session.cookie.secure` yourself if you need to override that.
- **Secrets are stripped from crash reports.** Passwords, tokens, cookies, card numbers and similar values are masked when the report is built, before anything renders or gets sent anywhere.

Two things Leaf can't do for you: serve your app over HTTPS, and keep your `.env` out of your web root. Both are worth checking before launch.

## Security Headers <Badge type="tip" text="NEW" />

Browsers enforce a lot of protection for you, but only if your responses ask for it. `response()->security()` sets the headers that matter in one call:

```php:no-line-numbers
response()->security();
```

That gives you `X-Frame-Options: DENY` so your pages can't be framed for clickjacking, `X-Content-Type-Options: nosniff` so browsers don't guess at content types, and a `Referrer-Policy` that stops full URLs leaking to other sites.

### A real example

Say you run a small forum. Users write posts, you escape them on the way out, and everything is fine until one template forgets to escape, or a markdown renderer lets an `onerror` attribute through. That's the day a stored XSS runs in every reader's browser.

Escaping is your first line of defence. A content security policy is the one that holds when escaping slips, because the browser refuses to run any script your policy didn't allow:

```php
app()->use(function () {
  response()
    ->security([
      'csp' => [
        'default-src' => "'self'",
        'script-src' => "'self'",       // no inline scripts, no third-party js
        'img-src' => ["'self'", 'data:', 'https://avatars.example.com'],
        'frame-ancestors' => "'none'",  // nobody frames your forum
      ],
    ]);
});

app()->get('/posts/{id}', function ($id) {
  $post = db()->select('posts')->find($id);

  if (!$post) {
    response()->json(['error' => 'Post not found'], 404);
    return;
  }

  response()->render('posts.show', ['post' => $post]);
});
```

The middleware runs before every route, so each response carries the policy without the route knowing about it. If a malicious `<script>` ever makes it into `$post['body']` and out through the template, the browser blocks it: the policy allows scripts from your own origin only, and an inline `<script>` isn't that.

The payment page in the same app might embed Stripe, which needs its own exception:

```php
app()->get('/checkout', function () {
  response()
    ->security([
      'csp' => [
        'default-src' => "'self'",
        'script-src' => ["'self'", 'https://js.stripe.com'],
        'frame-src' => 'https://js.stripe.com',
      ],
    ])
    ->render('checkout');
});
```

Calling `security()` again on that route replaces the header for that response only, so one route gets a looser policy without weakening the rest of the app.

### Chaining

`security()` returns the response, so it sits anywhere in a chain:

```php
response()->security()->json(['ok' => true]);
response()->security()->withHeader('X-Request-Id', $id)->render('dashboard');
```

It only writes headers, so it never changes your status code or body. One thing to know about status codes in general: `json()`, `view()` and `render()` each take the status as an argument, and that argument wins over an earlier `status()` call. So set the code where you send the body:

```php
response()->security()->json(['error' => 'Not found'], 404);   // 404 ✅
response()->status(404)->security()->json(['error' => 'Not found']);  // 200 ❌
```

You can pick your own values, and set any header to `false` to skip it:

```php
response()->security([
  'frameOptions' => 'SAMEORIGIN',
  'referrerPolicy' => 'strict-origin-when-cross-origin',
]);
```

### Content Security Policy

CSP controls which scripts, styles and images a browser will load on your page, which makes it the strongest defence against XSS. It needs values specific to your app, so it's off until you set it. Pass directives as an array and Leaf builds the header:

```php
response()->security([
  'csp' => [
    'default-src' => "'self'",
    'img-src' => ["'self'", 'data:', 'https://cdn.example.com'],
    'frame-ancestors' => "'none'",
  ],
]);
```

That becomes `default-src 'self'; img-src 'self' data: https://cdn.example.com; frame-ancestors 'none'`. A plain string works too if you'd rather write the policy yourself.

::: tip Start in report-only mode
A strict CSP usually breaks something on the first try. Roll it out by building the policy, watching what your browser console complains about, then tightening.
:::

### HSTS and permissions

`hsts` tells browsers to only ever reach your site over HTTPS, and `permissionsPolicy` turns off browser features your app doesn't use:

```php
response()->security([
  'hsts' => true,                          // max-age=31536000; includeSubDomains
  'permissionsPolicy' => 'geolocation=(), camera=()',
]);
```

HSTS is only sent over HTTPS connections. Sending it over plain HTTP does nothing useful and can lock you out of a domain you aren't ready to serve securely, so Leaf skips it there.

::: details Setting headers globally
Most apps want these on every response. Set them once in a middleware rather than per route:

```php
app()->use(function () {
  response()->security(['csp' => ['default-src' => "'self'"]]);
});
```
:::

### All options

Every option takes a string to use as the header value, or `false` to skip that header entirely. `security()` with no arguments applies the defaults below.

| Option | Header | Default | What it does |
| :-- | :-- | :-- | :-- |
| `frameOptions` | `X-Frame-Options` | `DENY` | Controls who may embed your pages in a frame. Use `SAMEORIGIN` if you frame your own pages. |
| `contentTypeOptions` | `X-Content-Type-Options` | `nosniff` | Stops browsers guessing a file's type, so an uploaded image can't be executed as a script. |
| `referrerPolicy` | `Referrer-Policy` | `no-referrer-when-downgrade` | How much of the current URL is sent when a visitor follows a link away. |
| `csp` | `Content-Security-Policy` | `false` | Which scripts, styles, images and frames the browser may load. Accepts a directive array. |
| `permissionsPolicy` | `Permissions-Policy` | `false` | Turns off browser features your app doesn't use, like camera or geolocation. |
| `hsts` | `Strict-Transport-Security` | `false` | Tells browsers to only reach your site over HTTPS. `true` uses `max-age=31536000; includeSubDomains`, or pass your own string. Only sent over HTTPS. |

CSP and `permissionsPolicy` are off by default because a wrong value there breaks working pages, and the right value depends entirely on your app.

::: details Writing csp directives
`csp` takes a string if you want to write the policy yourself, or an array that Leaf assembles for you. In array form, the key is the directive and the value is a single source or a list:

```php
response()->security([
  'csp' => [
    'default-src' => "'self'",
    'script-src' => ["'self'", 'https://js.stripe.com'],
    'style-src' => ["'self'", "'unsafe-inline'"],
    'img-src' => ["'self'", 'data:'],
    'connect-src' => "'self'",
    'frame-ancestors' => "'none'",
    'upgrade-insecure-requests',
  ],
]);
```

Directives with no value, like `upgrade-insecure-requests`, go in as plain list entries. Keywords such as `'self'`, `'none'` and `'unsafe-inline'` need their quotes inside the PHP string, which is why these examples use double-quoted PHP strings around single-quoted CSP keywords.
:::
