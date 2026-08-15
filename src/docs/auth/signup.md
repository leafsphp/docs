# User Sign Up

<!-- markdownlint-disable no-inline-html -->

<section class="not-prose my-10 overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
  <div class="grid gap-0 2xl:grid-cols-[1fr_0.9fr]">
    <div class="border-b border-neutral-200 p-6 sm:p-8 2xl:border-b-0 2xl:border-r dark:border-neutral-800">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">Account creation</p>
      <h1 class="m-0 text-3xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-4xl">Create users, validate data, and authenticate them in one pass.</h1>
      <p class="!m-0 !mt-4 text-base leading-7 text-neutral-600 dark:text-neutral-400">Leaf Auth handles the signup path for standard email/password flows and OAuth-backed accounts while keeping the database shape configurable.</p>
    </div>
    <div class="bg-neutral-50 p-6 dark:bg-neutral-900/60 sm:p-8">
      <div class="rounded-lg border border-neutral-200 bg-white p-4 font-mono text-sm text-neutral-700 dark:border-neutral-800 dark:bg-black dark:text-neutral-300">
        <div>auth()-&gt;register([</div>
        <div class="pl-4 text-[var(--vp-c-brand-1)]">'email' =&gt; 'm@example.com',</div>
        <div class="pl-4 text-sky-600 dark:text-sky-400">'password' =&gt; 'password'</div>
        <div>]);</div>
      </div>
      <p class="!m-0 !mt-4 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Your AI assistant can follow the same auth map for registration, OAuth, tokens, sessions, and user data.</p>
    </div>
  </div>
</section>

Leaf Auth lets you create and authenticate users in one step, and it works the same whether you're using token-based or session-based authentication.

## Database Pre-requisites

Leaf Auth doesn't force you to use any specific structure for your database, so you’re free to organize it however you like. But, there are a few important things to keep in mind to make sure everything works smoothly.

### Specifying the table to use

Leaf assumes that you will save your users in a table named `users`. If you want to use a different table, you can configure Leaf Auth using `db.table`:

```php:no-line-numbers
auth()->config('db.table', 'admins');
```

### Specifying the primary key

Most databases use `id` as the primary key. If you are using a different field as the primary key, you can configure Leaf Auth using `id.key`:

```php:no-line-numbers
auth()->config('id.key', 'admin_id');
```

If you are using UUIDs as your primary key, you just need to pass in your primary key instead of leaving it up to Leaf to generate it:

```php{2}
auth()->register([
  'id' => 'your-uuid',
  ...
]);
```

Once Leaf detects a field with the same name as your primary key, it will use that field as the primary key.

## Signing a user up

To sign a user up is to create a new user account on your application. This is usually done by collecting the user's details and storing them in your database. You also need to validate the user's details to ensure they are correct and that they don't conflict with existing data.

Leaf allows you to do all this using the `register()` method. This method takes in an array of data you want to use to create the user.

```php
auth()->register([
  'username' => 'example',
  'email' => 'm@example.com',
  'password' => 'password'
]);
```

If the user is successfully saved in the database, a session or token is created for them and the user is returned. If Leaf Auth fails to save the user, the method returns `false`. You can then use the `errors()` method to get the error message.

```php
$success = auth()->register([
  'username' => 'example',
  'email' => 'user@example.com',
  'password' => 'password'
]);

if ($success) {
  // User is authenticated
  $token = auth()->data();
  // ['user' => [...], 'accessToken' => '...', 'refreshToken' => '...']


  $username = auth()->user()->username;
} else {
  // User is not authenticated
  $error = auth()->errors();
}
```

## Signing up from OAuth

Some applications only allow users to sign up using OAuth which means there's no need for users to add emails or passwords. Leaf Auth provides the `fromOAuth()` function which allows you to save users to your database and immediately authenticate them.

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

`fromOAuth()` automatically turns off password encoding, so you don't need to worry doing it manually. If you want to turn off password encoding for normal signups, you can find the documentation [here](#password-hashing).

## Signing up another user <Badge type="tip" text="New" />

When building applications that may require you to sign up users on their behalf, for example, an admin signing up a user, you can use the `createUserFor()` method. This method allows you to create a user without needing to log in as the user. It takes in the user's data and returns the auth user instance if the user is saved successfully.

```php
$user = auth()->createUserFor([
  'username' => 'example',
  'email' => 'example@example.com',
  'password' => 'password'
]);

if ($user) {
  // user is saved
} else {
  // user is not saved
  $error = auth()->errors();
}
```

It behaves the same way as the `register()` method, except that it doesn't create a session when the user is saved. The user instance returned can be used to perform operations on the user like assigning roles and more.

## Unique fields

There are some fields in your database that should not be repeated for different users. For example, you wouldn't want two users to have the same email address. You can configure Leaf Auth to check for unique fields when a user is being registered:

::: code-group

```php:no-line-numbers [Leaf]
auth()->config('unique', ['email', 'username']);
```

```php:no-line-numbers [Leaf MVC - config/auth.php]
'unique' => ['email', 'username']
```

:::

Now if a user tries to register with an email or username that already exists in the database, Leaf Auth will return an error. You can get the error message using the `errors()` method.

```php
$data = auth()->register([
  'username' => 'example',
  'email' => 'example@example.com',
  'password' => 'password'
]);

if (!$data) {
  $error = auth()->errors();
  // ['email' => 'The email already exists']
}
```

## Using timestamps

Leaf will always try to set the `created_at` and `updated_at` fields in your database. If you want to turn this off, you can set `timestamps` to `false`:

```php:no-line-numbers
auth()->config('timestamps', false);
```

One thing to watch out for is the format of the timestamp. Different databases have different accepted timestamp formats. If you get an error concerning the format of the timestamp, you can configure Leaf Auth to use a different format:

```php:no-line-numbers
auth()->config('timestamps.format', 'YYYY-MM-DD HH:MM:SS');
```

You can find the date format documentation [here](/docs/utils/date#formatting-dates).

## Password hashing

Leaf allows you to customize how user passwords should be encoded before they are stored in your database. By default, Leaf uses the `Leaf\Helpers\Password::hash` method which has support for `bcrypt` and `argon2`. If you however want to use a different method or turn off password encoding, you can do that directly in the config:

```php
auth()->config('password.encode', false); // turn off encoding

auth()->config('password.encode', fn ($password) => Password::hash($password));
```

These are the available options you can pass to `password.encode`:

- `false` - This turns off password encoding
- `null`/`true` - This uses the default encoding method (Leaf\Helpers\Password::hash)
- `function` - This uses a custom method. The method should accept a password and return the encoded password.

::: info Watch out
Turning off password encoding does not mean that Leaf will not expect a password field when authenticating users. You will need to turn off password verification as well. If you want to turn off password authentication completely, you can configure Leaf Auth like this:

```php:no-line-numbers
auth()->config('password.key', false);
```

:::

## Hiding sensitive information

The output of Leaf's authentication methods is an object with the user's data and the token or session. By default, the password field is hidden from the user data. This is a security measure to prevent the password from being exposed.

```php
[
  'user' => [
    'username' => 'mychidarko',
    'email' => 'user@example.com',
    'created_at' => '2019-09-20 13:47:48'
  ],
  'token' => 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NzYxMzUzMjgsImlzcyI6ImxvY2FsaG9zdCIsImV4cCI6MTU3NjEzNjIyOCwidXNlcklkIjoxfQ.7FODXGGJKioGQVX4ic0DJLoMIQTVUlsd4zFAJA4DAkg'
]
```

If you want to customize what items are hidden from the user data, you can configure Leaf Auth to hide them:

```php:no-line-numbers
auth()->config('hidden', ['password', 'id', 'email', ...]);
```

## Switching to session auth

Leaf uses token based authentication by default which uses a JWT to authenticate your users. Sessions are a more common way to authenticate users in fullstack applications. To switch to session based authentication, you can update your auth config:

```php:no-line-numbers
auth()->config('session', true);
```

Switching to session auth does not change the default behaviour of the `register()` method. It does everything the same way it would if you were using token based authentication except that it creates a new session when a user is registered.

```php:no-line-numbers
auth()->config('session', true);

...

// will create a session
$success = auth()->register([
  'username' => 'example',
  'email' => 'example@example.com',
  'password' => 'password'
]);

if ($success) {
  return response()->redirect('/dashboard');
} else {
  $error = auth()->errors();
  // ['email' => 'The email already exists']
}
```

You can also control things like the cookie settings and more:

```php
auth()->config('session.cookie', [
  'secure' => true,
  'httponly' => true,
  'samesite' => 'lax'
]);
```
