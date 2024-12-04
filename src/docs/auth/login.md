# User Login

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoModal from '@theme/components/shared/VideoModal.vue'
</script>

Leaf Auth provides a flexible and secure login system that works for both token based and session based authentication. It provides a unified way to authenticate users in your web apps and APIs.

::: details Token vs Session Authentication

- Token based authentication is a system where a user is given a token upon login which is then used to authenticate the user on every request. It is the most common authentication system for APIs. This video by Hamy Labs explains how token authentication works

  <VideoModal
    subject="How Token Authentication Works"
    description="Many websites use token authentication to secure access to their services. This video explains what tokens are and how token authentication works."
    videoUrl="https://www.youtube.com/embed/giKeegmeaKw"
  />

  <br />
  <br />

- Session-based authentication is a method where, after a user logs in, the server creates a session to remember them. Every time the user makes a request, their session ID is sent back to the server to verify their identity, allowing them to stay logged in while using the app.

  <VideoModal
    subject="Session Based Authentication | Authentication Series"
    description="Session-based authentication is a stateful authentication technique where we use sessions to keep track of the authenticated user. In this video, we learn what session-based authentication is, what session is and how session-based authentication is implemented."
    videoUrl="https://www.youtube.com/embed/gKkBEOq_shs"
  />

:::

## Signing a user in

To sign a user in, you can use the `login()` method. This method takes in an array of data you want to use to authenticate the user. This data is usually the user's email and password, but can be anything as long as the password field is present.

```php
auth()->login([
  'email' => 'm@example.com',
  'password' => 'password'
]);
```

The `login()` method returns `true` if the user is successfully authenticated and `false` if the user is not authenticated. You can then use the `errors()` method to get the error message.

```php
$success = auth()->login([
  'email' => 'user@example.com',
  'password' => 'password'
]);

if ($success) {
  // User is authenticated
} else {
  // User is not authenticated
  $error = auth()->errors();
}
```

You can get the data and tokens needed for authentication using the `data()` method:

```php
$data = auth()->data();
// ['user' => [...], 'accessToken' => '...', 'refreshToken' => '...']
```

If you want to use a couple of fields from the user within your application, you can use the user method. You can find the documentation for the Auth user method [here](/docs/auth/user).

## Switching to session auth

Leaf uses token based authentication by default which uses a JWT to authenticate your users. Sessions are a more common way to authenticate users in fullstack applications. To switch to session based authentication, you can update your auth config:

::: code-group

```php [Leaf]
auth()->config('session', true);

...

// auth login
```

```php:no-line-numbers [Leaf MVC - config/auth.php]
  'session' => true,
```

:::

With the addition of session auth, `login()` will automatically start a session, but will behave in the same way, which means redirects and any other functionality you need will be left up to you to handle:

```php
...

// session is automatically started
$success = auth()->login([
  'email' => 'user@example.com',
  'password' => 'password'
]);

if ($success) {
  // User is authenticated
  $user = auth()->user();

  response()->redirect('/dashboard');
} else {
  // User is not authenticated
  $error = auth()->errors();
}
```

This lets you handle complex control flows...or the simple redirect ones in a manner you prefer.

If you need finer control over how PHP creates your session, you can add your own config to the `session.cookie` config:

```php
auth()->config('session.cookie', [
  'secure' => true,
  'httponly' => true,
  'samesite' => 'lax'
]);
```

## Signing up from OAuth

Some applications only allow users to sign in using OAuth which means there's no need for users to add emails or passwords. Leaf Auth provides the `fromOAuth()` function which allows you to create a session or token for a user without needing a password.

```php
$user = Github()->getResourceOwner($token)->toArray();

$success = auth()->fromOAuth([
    'token' => $token,
    'user' => [
        'name' => $user['name'],
        'email' => $user['email'],
        'avatar' => $user['avatar_url']
    ]
]);
```

If the user is successfully saved in the database, a session or token is created for them and the rest of the process is the same as signing up a user normally. If Leaf Auth fails to save the user, the method returns `false`. You can then use the `errors()` method to get the error message.

```php
$success = auth()->fromOAuth([
    'token' => $token,
    'user' => [
        'name' => $user['name'],
        'email' => $user['email'],
        'avatar' => $user['avatar_url']
    ]
]);

if (!$success) {
    $error = auth()->errors();
}

// user is authenticated
$user = auth()->user();
```

Everything after this point is the same as signing up a user normally.

## Auth with no password

Leaf Auth usually expects a password field to authenticate users. This is necessary because most applications require a password to authenticate users. The field is usually named `password`, however, you can configure Leaf Auth to expect a different field:

```php:no-line-numbers
auth()->config('password.key', 'pass');
```

Better still, you can turn off password authentication completely. This is useful in multi-step authentication systems, where you might authenticate a set of parameters before authenticating the password. To turn off password authentication, you can configure Leaf Auth like this:

```php:no-line-numbers
auth()->config('password.key', false);
```

Once this is done, Leaf will no longer expect a password field to authenticate users and will also turn off password hashing and verification.

## Password verification

Password verification is done to check if a password matches the hashed password in the database. By default, Leaf uses the `Leaf\Helpers\Password::verify` method which has support for `bcrypt` and `argon2`. If you however want to use a different method or turn off password verification, you can do that directly in the config:

```php
auth()->config('password.verify', false); // turn off verification

auth()->config('password.verify', function ($password, $hash) {
  return Password::verify($password, $hash);
});
```

These are the available options you can pass to `password.verify`:

- `false` - This turns off password verification
- `null`/`true` - This uses the default verification method (Leaf\Helpers\Password::verify)
- `function` - This uses a custom method. The method should accept a password and a hash and return a boolean.

## Custom error messages

Leaf Auth provides default error messages for different operations. If you want to customize these messages, you can configure Leaf Auth to use your custom messages:

```php:no-line-numbers
auth()->config('messages.loginParamsError', 'Username is incorrect!');
auth()->config('messages.loginPasswordError', 'Password is incorrect!');
```

## Hiding sensitive information

The output of Leaf's authentication methods is an object with the user's data and the token or session. By default, the password field is hidden from the user data. This is a security measure to prevent the password from being exposed.

```json
{
  "user": {
    "username": "mychidd22",
    "email": "mychidd22@gmail.com",
    "created_at": "2024-10-26 19:29:37.000000",
    "updated_at": "2024-10-26 19:29:37.000000"
  },
  "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyLmlkIjo5MjQsImlhdCI6MTczMDAyOTAwNywiZXhwIjo4NjQwMCwiaXNzIjoibG9jYWxob3N0OjU1MDAifQ.yLldIhOkUxn54-3RWLD7PJONoWwqpZ5mmP8fEZ4nNfs",
  "refreshToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyLmlkIjo5MjQsImlhdCI6MTczMDAyOTAwNywiZXhwIjozNDU2MDAsImlzcyI6ImxvY2FsaG9zdDo1NTAwIn0.tqfp5Co4vLtq3_J0r5Fp-XwuDSB1i6uC4AcogQ3vnc8"
}
```

If you want to customize what items are hidden from the user data, you can configure Leaf Auth to hide them:

```php:no-line-numbers
auth()->config('hidden', ['password', 'id', 'email', ...]);
```

## Controlling session lifetime

Whether you are using token or session based auth, you might want to control how long a user's session or token lasts. You can set the lifetime of a user's session or token config like this:

::: code-group

```php [Token Lifetime]
auth()->config('token.lifetime', '1 hour'); // 1 hour'
auth()->config('token.lifetime', 60 * 60 * 24 * 7); // 1 week
auth()->config('token.lifetime', 0); // never expire
```

```php [Session Lifetime]
auth()->config('session.lifetime', '1 hour'); // 1 hour
auth()->config('session.lifetime', 60 * 60 * 24 * 7); // 1 week
auth()->config('session.lifetime', 0); // never expire
```

:::
