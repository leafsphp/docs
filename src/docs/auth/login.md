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

If you want to use a couple of fields from the user within your application, you can use the user method:

## The user object

The `user()` method gives you access to an object configured to the user's data. This object is a simple way to access the user's data without having to go through the data array. There are many things you can do with the user object:

- Getting user information (including hidden fields)
- Token/Session management
- Fetching related data from your database

```php
// return all user data without hidden fields
$user = auth()->user()->get();

// pick specific fields
$username = auth()->user()->username;
$email = auth()->user()->email;

// get the user's data + tokens
$data = auth()->user()->getAuthInfo();
```

If your user has one to many relationships with other models, you can fetch related data using the user object:

```php
$posts = auth()->user()->posts();
// will return a Leaf DB instance with posts by the current user
// SELECT * FROM posts WHERE user_id = $current_user_id
```

You can further filter the data by using any of the Leaf DB methods:

```php:no-line-numbers
$posts = auth()->user()->posts()->where('title', 'like', '%leaf%')->get();
```

Note that the method name should be the same as the table name in your database.

```php:no-line-numbers
$posts = auth()->user()->transactions()->where('amount', '>', 1000)->get();
```

## Switching to session auth

Leaf uses token based authentication by default which uses a JWT to authenticate your users. Sessions are a more common way to authenticate users in fullstack applications. To switch to session based authentication, you can update your auth config:

```php:no-line-numbers
auth()->config('session', true);
```

With the addition of session auth, `login()` will automatically start a session, but will behave in the same way, which means redirects and any other functionality you need will be left up to you to handle:

```php
auth()->config('session', true);

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

## Updating a logged-in user

Updating user information means allowing users to change their details (like username, email, or password) in your application. It is a very common feature in most applications.

Leaf provides an `update()` method that allows you to update a user's information.

```php
$user = auth()->update($data);
```

### Unique values

Leaf Auth allows you to set unique fields which should not be repeated for different users. For example, you wouldn't want two users to have the same email address. You can configure Leaf Auth to check for unique fields when a user is being updated:

```php:no-line-numbers
auth()->config('unique', ['email', 'username']);
```

Now if a user tries to update their profile with an email or username that already exists in the database, Leaf Auth will return an error. You can get the error message using the `errors()` method.

```php
$success = auth()->update([
  'username' => 'example',
  'email' => 'example@example.com'
]);

if (!$success) {
  $error = auth()->errors();
  // ['email' => 'email already exists']
}
```

## Signing a user out

When a user chooses to end their session, or their session expires, you can sign them out using the `logout()` method. This method will end the user's session or delete their token.

```php
auth()->logout();

// or redirect the user after logout
auth()->logout('/login');

// or redirect to a named route
auth()->logout(['homepage']);
```

If you want to perform a custom operation when a user logs out, you can set a handler for the logout operation:

```php
auth()->config('session.logout', function () {
  // your logout handler
});
```

This will ignore whatever route is passed into the `logout()` method and rely solely on the function passed into the session.logout config.
