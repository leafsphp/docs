# User Login

<!-- markdownlint-disable no-inline-html -->

<section class="not-prose my-10 overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
  <div class="grid gap-0 2xl:grid-cols-[1fr_0.9fr]">
    <div class="border-b border-neutral-200 p-6 sm:p-8 2xl:border-b-0 2xl:border-r dark:border-neutral-800">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">Authentication flow</p>
      <h1 class="m-0 text-3xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-4xl">Sign users in with tokens or sessions from the same API.</h1>
      <p class="!m-0 !mt-4 text-base leading-7 text-neutral-600 dark:text-neutral-400">Leaf Auth gives web apps and APIs one login method, then lets your app decide whether the result should power JWT tokens, sessions, redirects, or JSON responses.</p>
    </div>
    <div class="bg-neutral-50 p-6 dark:bg-neutral-900/60 sm:p-8">
      <div class="rounded-lg border border-neutral-200 bg-white p-4 font-mono text-sm text-neutral-700 dark:border-neutral-800 dark:bg-black dark:text-neutral-300">
        <div>$success = auth()-&gt;login([</div>
        <div class="pl-4 text-[var(--vp-c-brand-1)]">'email' =&gt; 'm@example.com',</div>
        <div class="pl-4 text-sky-600 dark:text-sky-400">'password' =&gt; 'password'</div>
        <div>]);</div>
      </div>
      <div class="mt-4 grid gap-3 md:grid-cols-2 2xl:grid-cols-1">
        <div class="rounded-lg border border-neutral-200 bg-white p-3 text-sm dark:border-neutral-800 dark:bg-neutral-950">Token auth for APIs</div>
        <div class="rounded-lg border border-neutral-200 bg-white p-3 text-sm dark:border-neutral-800 dark:bg-neutral-950">Session auth for full-stack apps</div>
      </div>
    </div>
  </div>
</section>

Leaf Auth handles login the same way whether you're using tokens or sessions, so your web apps and APIs can share one authentication flow.

## Signing a user in

To sign a user in, you can use the `login()` method. This method takes in an array of data you want to use to authenticate the user. This data is usually the user's email and password, but can be anything as long as the password field is present.

```php
auth()->login([
  'email' => 'm@example.com',
  'password' => 'password'
]);
```

The `login()` method returns `true` if the user is successfully authenticated and `false` if the user is not authenticated. You can then use the `errors()` method to get the error message.

Note that `login()` only checks the credentials against your database, it does not validate the shape of the incoming data. Run [`request()->validate()`](/docs/http/request#validating-request-data) on the input before passing it to `login()`.

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

  return response()->redirect('/dashboard');
} else {
  // User is not authenticated
  $error = auth()->errors();
}
```

This lets you handle complex control flows...or the simple redirect ones in a manner you prefer.

One nice side-effect of session auth: you don't need to set up a token signing secret. Tokens are only minted lazily when you first read them through `tokens()` or `getAuthInfo()`, so a session-based app that never touches tokens never needs an `APP_KEY` or `AUTH_TOKEN_SECRET`.

If you need finer control over how PHP creates your session, you can add your own config to the `session.cookie` config:

```php
auth()->config('session.cookie', [
  'secure' => true,
  'httponly' => true,
  'samesite' => 'lax'
]);
```

## Signing in from OAuth

Some applications allow users to sign in using OAuth which means there's no need for users to add emails or passwords, usually because the OAuth provider handles that for you. The most common OAuth providers are Google, Facebook, Twitter, GitHub, etc. To make it even easier to sign in users from OAuth, you can use one of the League OAuth2 client providers to get the user's data from the OAuth provider and then use that data to sign in the user using Leaf Auth.

::: info Registering OAuth Providers <Badge text="New" />

Although you can use any OAuth provider you want, using one of the League OAuth2 client providers makes it easier to work within the context of Leaf Auth. You can find a list of all the available providers [on the League Website](https://oauth2-client.thephpleague.com/providers/league/). For instance, to use Google/GitHub as providers, you simply need to install the required packages and them add them to Leaf Auth in your `app/routes/index.php` file or just `index.php` if you are not using Leaf MVC:

::: code-group

```php:no-line-numbers [Google]
// .env
GOOGLE_AUTH_CLIENT_ID={google-client-id}
GOOGLE_AUTH_CLIENT_SECRET={google-client-secret}

// anywhere in your app
$token = auth()->client('google')->anyLeagueMethod();
```

```php:no-line-numbers [Any Provider]
$provider = new League\OAuth2\Client\Provider\Github([
    'clientId'     => '{github-client-id}',
    'clientSecret' => '{github-client-secret}',
    'redirectUri'  => 'https://example.com/callback-url',
]);

auth()->withProvider('github', $provider);

// anywhere in your app
$token = auth()->client('github')->anyLeagueMethod();
```

:::

Leaf Auth provides the `fromOAuth()` function which allows you to create a session or token for a user without needing a password.

```php
$user = auth()->client('github')->getResourceOwner($token);

$success = auth()->fromOAuth([
    'token' => $token,
    'user' => [
        'name' => $user->getName(),
        'email' => $user->getEmail(),
        'avatar' => $user->getAvatar() ?? null,
    ]
]);
```

::: details Password Required in DB <Badge type="tip" text="New" />

It is common for applications to start of with email/password authentication and later add OAuth as an alternative way to sign in. In such cases, the users table will most likely have a password field which is required. In such cases, you can fill the password field with a random string when creating a user from OAuth:

```php:no-line-numbers
$user = auth()->client('google')->getResourceOwner($token);

$success = auth()->fromOAuth([
    'token' => $token,
    'user' => [
        'name' => $user->getName(),
        'email' => $user->getEmail(),
        'password' => 'GOOGLE_AUTH_PLACEHOLDER', // [!code ++]
        'email_verified_at' => tick()->format('Y-M-D H:i:s'),
        'avatar' => $user->getAvatar() ?? null,
    ]
]);
```

:::

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

::: info OAuth Token
The `fromOAuth()` method expects an OAuth token to be passed in. This token is usually gotten from the OAuth provider you are using. You can later use this token to make requests to the OAuth provider on behalf of the user. Leaf Auth saves this token so you can retrieve it later using the `auth()->oauthToken()` method.

```php:no-line-numbers
$token = auth()->oauthToken();
```

:::

## Finding a user by id <Badge text="New" />

There are times when you might want to find a user by their id to perform some operations on them while they are NOT logged in. For instance, finding a user by their id to assign a role to them. Leaf Auth provides the `find()` method to do this:

```php
$user = auth()->find(1);

...

$user->assign('admin');

...

$user->transactions()->create([...]);
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

auth()->config('password.verify', fn ($password, $hash) => Password::verify($password, $hash));
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

By default, Leaf Auth hides `['field.id', 'field.password', 'remember_token']`. The `field.id` and `field.password` entries are sentinels that resolve to whatever you configured as `id.key` and `password.key`, so they keep working even if your columns have custom names. If you want to customize what items are hidden from the user data, you can configure Leaf Auth to hide them:

```php:no-line-numbers
auth()->config('hidden', ['field.id', 'field.password', 'remember_token', 'email', ...]);
```

The password hash and `remember_token` are always stripped from the user output, even if you set a custom `hidden` config that leaves them out, and even with a custom `password.key`. The `hidden` config controls everything else.

Keep in mind that every column you don't hide is included in the user output, and in Inertia apps that output ships to the browser in the shared `auth` prop. If you add custom sensitive columns like API keys or 2FA secrets, be sure to add them to `hidden`.

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
