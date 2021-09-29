---
title: "Auth"
---

<!-- markdownlint-disable no-inline-html -->
# ✨ Leaf Simple Auth

Simple auth is a module which takes away the pain involved with anything authentication related: logins, signups, updating users, tokens, ... The main focus of simple auth is to allow you do all of the above in nothing more than one line of code (unless of course you include customizations for how these features work).

Auth in versions 2.4.2+ use static methods, so there's no need to initialize auth anymore. After connecting to your database, you can simply go ahead and use any method you want to.

To connect to your database, you can add your db credentials in `connect` or use `autoConnect` if you've already configured your database in your `.env` file.

```php
use Leaf\Auth;

Auth::connect("host", "user", "password", "dbname");
// or
Auth::autoConnect();
```

## Auth Config

Auth Config was added in v2.4.0-beta to give you more control over how leaf handles authentication in your apps. Auth has been configured perfectly for most apps, but not all use cases are the same, hence, this brilliant addition.

This also includes various configurations for doing things like:

- Setting custom token lifetime
- Hiding/Showing user fields
- Adding/removing default timestamps
- Changing the default password key
- Setting custom password encode methods
- Turning off password encoding totally
- Setting custom password verify methods
- Hiding/Showing password field
- Adding custom validation messages
- Turning off experimental feature warnings (NEW)

### config

To set a config variable, you can simply call the `config` method.

```php
Leaf\Auth::config("item", "value");
```

### Settings

- **USE_TIMESTAMPS:** This determines whether Leaf should add the default `created_at` and `updated_at` timestamps on register and update. Default is `true`.

- **PASSWORD_ENCODE** *This method has gone through a lot of changes since v2.4 beta, and may not work exactly the same way*. This setting is run when leaf wants to encode a password. It now uses `PASSWORD_DEFAULT` by defaullt for encryption.

```php
// This turns off password encoding
Leaf\Auth::config("PASSWORD_ENCODE", false);

// defult encoding (Leaf\Helpers\Password::hash)
Leaf\Auth::config("PASSWORD_ENCODE", null);

// use md5. We're still keeping support for md5 :-)
Leaf\Auth::config("PASSWORD_ENCODE", Password::MD5);

// use custom method
Leaf\Auth::config("PASSWORD_ENCODE", function($password) {
  return Password::hash($password);
});
```

- **PASSWORD_VERIFY** This setting is called when Leaf tries to verify a password. It works just like `PASSWORD_ENCODE` above.

```php
// This turns off password encoding
Leaf\Auth::config("PASSWORD_VERIFY", false);

// defult encoding (Leaf\Helpers\Password::hash)
Leaf\Auth::config("PASSWORD_VERIFY", null);

// use md5. We're still keeping support for md5 :-)
Leaf\Auth::config("PASSWORD_VERIFY", Password::MD5);

// use custom method
Leaf\Auth::config("PASSWORD_VERIFY", function($password) {
  return Password::verify($password);
});
```

- **PASSWORD_KEY** allows you to change the password field name, maybe yours is passcode? This tells leaf to look for a user's password in that field. The example below tells leaf to search for passwords in the `passcode` column. (the default field is password)

```php
Leaf\Auth::config("PASSWORD_KEY", "passcode");
```

- **HIDE_ID** takes in a boolean, and determines whether to hide the id in the user object. Default is `true`.

- **HIDE_PASSWORD** Just as the name implies, allows you to hide or show the password in the final results returned from auth. Default is `true`.

- **LOGIN_PARAMS_ERROR** This is the error to show if there's an error with any parameter which isn't the password eg: username:

```php
Leaf\Auth::config("LOGIN_PARAMS_ERROR", "Username is incorrect!");
```

Default is "Incorrect credntials!".

- **LOGIN_PASSWORD_ERROR** This is the error to show if there's an error with the password.

Default is "Password is incorrect!".

```php
Leaf\Auth::config("LOGIN_PASSWORD_ERROR", "Password is incorrect!");
```

- **USE_SESSION** Use session based authentication instead of the default JWT based auth. Without this setting enbled, you can't use any of the session methods below. Default is `false`.

- **SESSION_ON_REGISTER** If true, a session will be created on a successful registration, else you it'll be created on login rather. Default is `false`.

- **GUARD_LOGIN** The page route. Default is `/auth/login`.

- **GUARD_REGISTER** The register page route. Default is `/auth/register`.

<!-- - **GUARD_LOGOUT** Logout route handler. Default is `/auth/logout`. -->

- **GUARD_HOME** Home page route. Default is `/home`.

- **SAVE_SESSION_JWT** Add an auth token to the auth session? This allows you save a generated JWT to the session. You might want to use this if you want to extend your app into an API. Default is `false`.

- **<small class="new-tag-1">New</small> EXPERIMENTAL_WARNINGS** This option controls whether to show/hide experimental warnings from session components. Default is `true`. Turning this off allows you to use guards for JWT auth.

## tokenLifetime

This method allows you to get or set the token lifetime value. In previous versions, the lifetime value was set by leaf, here you can customize it the way you want to.

```php
// change token lifetime
Leaf\Auth::tokenLifetime(24 * 24 * 24);

// get token lifetime
$lifetime = Leaf\Auth::tokenLifetime();
```

## Token Secrets

Token Secrets are basically simple `strings` which are encoded into your Tokens to prevent others from logging into accounts with fake tokens. You simply need to set your own token secrets while encoding and decoding tokens.

```php
// set secret key
Leaf\Auth::setSecretKey('tH1$_iS_MY_$3¢Ret');

// get secret key
Leaf\Auth::getSecretKey();
```

## Session support

Leaf auth finally includes support for session based authentication in this version. Session based authentication as the name implies creates and manages a session during the authentication to manage the user's logged in state. And all of this is done in 1 or 2 lines of code to maintain the simplicity and flexibility Leaf auth has always given.

To get started with session support, just set the `USE_SESSION` setting to true.

```php
Leaf\Auth::config("USE_SESSION", true);
```

A much simpler way would be to simply call the `useSession` method.

```php
Leaf\Auth::useSession();
```

## Session methods

Enabling session support allows you to use some special methods and behaviours which are not available with the regular JWT authentication.

### guard

The guard method works sort of like authentication middleware. It takes in a single param, an array holding the authentication state or the type of guard to load up.

```php
Leaf\Auth::guard(["hasAuth" => true]);

// or

Leaf\Auth::guard("auth");

// guest route redirects to home
// route if you're logged in
Leaf\Auth::guard("guest");
```

### saveToSession

This method is used to save a variable to the auth session.

```php
Leaf\Auth::saveToSession("rememberLogin", false);

// You can add multiple vars
Leaf\Auth::saveToSession([
  "rememberLogin" => false,
  "sessionActivity" => "login"
]);
```

### sessionLength

With sessionLength, you can get how long a user has been logged in. You can save the session time logs to your database in order to track users' login logs. The available logs are `SESSION_STARTED_AT` and `SESSION_LAST_ACTIVITY` which are automatically tracked by Leaf.

```php
// LoginsDB is a user defined method to save a login log

// ...
LoginsDB::params(
  "logged_in_at",
  date("D, d M Y H:i:s", Leaf\Auth::sessionLength()),
);

LoginsDB::save();
```

### sessionActive

sessionActive allows you to get how much time has passed since the last session activity.

```php
$userLastSeen = Leaf\Auth::sessionActive();
```

### refresh

As the name implies, you can refresh the session with this method. Refreshing sort of restarts the session, but you can keep the user's old session data if you wish to.

```php
if ($newAccountAdded) {
  // will delete old session data
  Leaf\Auth::refresh();
} else {
  // will keep session data
  Leaf\Auth::refresh(false);
}
```

### session

session checks whether a user session is ongoing by looking for keys specific to Leaf session auth so it doesn't confuse a Leaf auth session with user defined sessions. Returns true if a session is found and false if there's no session found.

```php
if (Leaf\Auth::session()) {
  return "logged in";
} else {
  return "guest mode";
}
```

### endSession

Of course we'll need a method to logout/end our session. This is just the method for that.

```php
Leaf\Auth::endSession();
```

**login, register and the other methods used in auth now integrate with auth when they're used. So login will start a session instead of returning a JWT.**

Read the section below to learn more about the main authentication methods and what session support that has been added.

## Authentication methods

### login

Login is used to create a simple, secure user login. It takes in a table to search for users(so it's no longer limited to the users table) and a set of parameters for the login.

```php
$user = Leaf\Auth::login("users", [
  "username" => "mychi.darko",
  "password" => md5("test")
]);
```

If the user is successfully found, the user data is returned, if not, `null` is returned. You can get any error by calling the `errors` method.

```php
$user = Leaf\Auth::login("users", [
  "username" => "mychi.darko",
  "password" => md5("test")
]); // returns null if failed

if (!$user) {
  $response->throwErr(Leaf\Auth::errors());
}
```

example success response:
**Note that the password and id fields are removed**. In v2.4-beta, you can control whether fields should be hidden from the returned value in the Auth settings.

```php
[
  "user" => [
    "username" => "mychi.darko",
    "email" => "mickdd22@gmail.com",
    "created_at" => "2019-09-20 13:47:48"
  ],
  "token" => "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NzYxMzUzMjgsImlzcyI6ImxvY2FsaG9zdCIsImV4cCI6MTU3NjEzNjIyOCwidXNlcklkIjoxfQ.7FODXGGJKioGQVX4ic0DJLoMIQTVUlsd4zFAJA4DAkg"
]
```

#### session support

Login received session support which allows login to create a session instead of returning aa JWT as done by default. To get started with session, just set the `USE_SESSION` setting or call the `useSession` method.

```php
Leaf\Auth::useSession();

Leaf\Auth::login("users", [
  "username" => $username,
  "password" => $password
]);
```

When the login succeeds, you'll be redirected to GUARD_HOME. You can configure the GUARD_HOME route to match the needs of your app.

In case there's something wrong and Auth can't sign the user in, it returns a falsy value.

```php
$user = Leaf\Auth::login("users", [
  "username" => $username,
  "password" => $password
]);

if (!$user) {
  // you can pass the auth errors into a view
  return $blade->render("pages.auth.login", [
    "errors" => Leaf\Auth::errors(),
    "username" => $username,
    "password" => $password,
  ]);
}
```

#### Password Encoding

From v2.4-beta onwards, password encoding will no longer be available on the login method, you have to configure it among the Auth settings instead.

`login` has a 3rd parameter which is an array of validation rules for login data.

```php
// validation rules
$rules = ["username" => "ValidUsername"];

$user = Leaf\Auth::login("users", $loginData, $rules);
```

To get any errors, you need to call the `errors` method

```php
if (!$user) {
  $app->response->throwErr(Leaf\Auth::errors());
}
```

<hr>

### register()

Register is a simple method used to create simple, secure user registrations. This option was `basicRegister` in earlier versions. It takes in a table to save users, the params(array) to save.

```php
Leaf\Auth::register("users", [
  "username" => "mychi.darko",
  "email" => "mickdd22@gmail.com",
  "field" => "value"
]);
```

If the user is successfully saved, the user data is returned, if not, `false` is returned. You can get any error by calling the `errors` method.

```php
$user = Leaf\Auth::register("users", [
  "username" => "mychi.darko",
  "email" => "mickdd22@gmail.com",
  "field" => "value"
]); // returns false if failed

if ($user == false) {
  $response->throwErr(Leaf\Auth::errors());
}
```

#### Uniques

Let's say you want to check whether the username a user just entered has been taken, you'd have to write a bunch of conditional code, making the code count larger and more error prone, right?

Well, `register` solves this problem smoothly. `register` has a 3rd parameter: an array of unique values which makes sure that the same value can't be saved twice.

```php
$db->register("users", ["name" => "mychi", "email" => "m@m.com", "pass" => "1234"], ["name", "email"]);
```

So, we're telling `register` to alert us if someone has already registered with the name `mychi` or the email `m@m.com`. This is because we passed `["name", "email"]` as the 3rd param to `register`

**With uniques, you can cut down on your whole app:**
For instance, if you know the exact data you'll be receiving in your app, let's say a username, email and password from a register form, you can do something like this:

```php
$app->post("/register", function() use($app) {
  Leaf\Auth::register("users", $app->request()->body(), ["username", "email"]);
});
```

So, we pass in the entire request body, which contains the username, email and password. Simple right?

The password encode option here has also been removed. Use the auth config above instead. The final parameter is now the validate param which is an array of rules to test the params.

```php
$app->post("/register", function() use($app) {
  Leaf\Auth::register("users", $app->request()->body(), ["username", "email"], ["email" => "email"]);
});
```

#### register session support

Just as with login, register now integrates with session. To turn this feature on, just set the `USE_SESSION` setting or call the `useSession` method.

```php
Leaf\Auth::useSession();

Leaf\Auth::register("users", $credentials, [
  "username", "email"
]);
```

After a successful registration, you can redirect to GUARD_HOME or rather GUARD_LOGIN if you want the user to login after registration.

```php
// set your login route...default is /auth/login
Leaf\Auth::config("GUARD_LOGIN", "/login");

// Redirect to login after auth
Leaf\Auth::config("SESSION_ON_REGISTER", false);

// Login automatically after registration
Leaf\Auth::config("SESSION_ON_REGISTER", true);
```

In case there's something wrong and Auth can't register the user, it returns a falsy value.

```php
$user = Leaf\Auth::register("users", $credentials, [
  "username", "email"
]);

if (!$user) {
  // you can pass the auth errors into a view
  return $blade->render("pages.auth.register", [
    "errors" => Leaf\Auth::errors(),
    "username" => $username,
    "email" => $email,
    "password" => $password,
  ]);
}
```

<hr>

### update

There's a login method, a register method, so why not a user update method? This method takes the stress out of updating a user's information. Update takes in 5 parameters:

- The table to look for users
- The data to update
- Credentials to find user by
- Unique values (optional)
- Validation array (optional)

```php
// data to update
$data = $request->get(["username", "email"]);

// credentials to find user by
$where = ["id" => 2];

// unique data
$uniques = ["username", "email"];

// validation
$validation = ["username" => "ValidUsername", "email" => "email"];

$user = Leaf\Auth::update("users", $data, $where, $uniques, $validation);
```

**Something little:** Uniques in `update` work a bit different from `register`, in `update`, Leaf tries to find another user which isn't the current user that has the same credentials. So if there's no other user with that same param value, the unique test passes. In short, **the current user is excluded from the users to check for same credentials**

#### update session support

Update also reeived session support. When a user is updated, the user is updated in the session and the updated user is also returned.

```php
$user = $this->auth->update("users", $data, $where, $uniques);
```

<hr>

### user

When tokens are added inside requests, you generally have to decode the token and query your database with the id returned to get the current user. Although Leaf Auth makes it really simple, it can get even simpler; by calling a single method. It takes in one parameter, the table to look for users.

```php
$user = Leaf\Auth::user("users");
return $user["name"];
```

In v2.4 beta, the table is set to `users` by default. So you can simply do this:

```php
$user = Leaf\Auth::user();
```

We can catch any errors that occur, from fetching the user, working with the token...

```php
$user = Leaf\Auth::user() ?? $request->throwErr(Leaf\Auth::errors());
```

`user` also takes in a second parameter, which is an array of items to hide from the user array.

```php
$user = Leaf\Auth::user("users", ["id", "password"]);
```

<hr>

### id

This is a method that decodes a token and returns the `user_id` field encoded in it.

```php
$user_id = Leaf\Auth::id();
```

<hr>

### [Leaf Authentication Methods](leaf/v/2.5.0/core/authentication)

Leaf Auth now uses the `Leaf\Helpers\Authentication` package to provide solutions for token authentication. This provides a simple way to work with manual authentication and tokens. All methods here are now available in `Leaf\Auth`.

```php
$payload = Leaf\Auth::validate($token);
```

Read [authentication](leaf/v/2.5.0/core/authentication) for more info
