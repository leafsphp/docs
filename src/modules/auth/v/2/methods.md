# Authentication methods

## login

Login is used to create a simple, secure user login. It takes in a table to search for users and a set of parameters for the login.

```php
$user = Leaf\Auth::login("users", [
  "username" => "mychi.darko",
  "password" => md5("test")
]);
```

::: tip LOGIN CLASS
Leaf auth now allows you to use logins with the new `Leaf\Auth\Login` class. This will allows you to import only the login functionality without actually going through the whole auth class.

```php
$user = Leaf\Auth\Login::user("users", [
  "username" => "mychi.darko",
  "password" => md5("test")
]);
```

:::

You can also use functional mode:

```php
$user = auth()->login("users", [
  "username" => "mychi.darko",
  "password" => md5("test")
]);
```

If the user is successfully found, the user data is returned, if not, `null` is returned. You can get any error by calling the `errors` method.

```php
$user = auth()->login("users", [
  "username" => "mychi.darko",
  "password" => md5("test")
]); // returns null if failed

if (!$user) {
  response()->throwErr(Leaf\Auth::errors());
}
```

example success response:
**Note that the password and id fields are removed**. You can control whether fields should be hidden from the returned value in the Auth settings.

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

### session support

Login received session support which allows login to create a session instead of returning aa JWT as done by default. To get started with session, just set the `USE_SESSION` setting or call the `init` method on auth session.

```php
Leaf\Auth\Session::init();

Leaf\Auth::login("users", [
  "username" => $username,
  "password" => $password
]);
```

Or with functional mode:

```php
auth()->useSession();

auth()->login("users", [
  "username" => $username,
  "password" => $password
]);
```

When the login succeeds, you'll be redirected to GUARD_HOME. You can configure the GUARD_HOME route to match the needs of your app.

In case there's something wrong and Auth can't sign the user in, it returns a falsy value.

```php
$user = auth()->login("users", [
  "username" => $username,
  "password" => $password
]);

if (!$user) {
  // you can pass the auth errors into a view
  return $blade->render("pages.auth.login", [
    "errors" => auth()->errors(),
    "username" => $username,
    "password" => $password,
  ]);
}
```

### Password Encoding

From v2.4-beta onwards, password encoding will no longer be available on the login method, you have to configure it among the Auth settings instead.

`login` has a 3rd parameter which is an array of validation rules for login data. You can checkout the form module for all the validation rules.

```php{1}
$rules = ["username" => "ValidUsername"];

$user = auth()->login("users", $loginData, $rules);
```

To get any errors, you need to call the `errors` method

```php
if (!$user) {
  response()->throwErr(auth()->errors());
}
```

<hr>

## register

Register is a simple method used to create simple, secure user registrations. This option was `basicRegister` in earlier versions. It takes in a table to save users, the params(array) to save.

```php
auth()->register("users", [
  "username" => "mychi.darko",
  "email" => "mickdd22@gmail.com",
  "field" => "value"
]);
```

::: tip REGISTER CLASS
Leaf auth now allows you to register users with the new `Leaf\Auth\Register` class. This will allows you to import only the register functionality without actually going through the whole auth class.

```php
$user = auth()->register("users", [
  "username" => "mychi.darko",
  "email" => "mickdd22@gmail.com",
  "field" => "value"
]);
```

:::

If the user is successfully saved, the user data is returned, if not, `false` is returned. You can get any error by calling the `errors` method.

```php
$user = auth()->register("users", [
  "username" => "mychi.darko",
  "email" => "mickdd22@gmail.com",
  "field" => "value"
]); // returns false if failed

if ($user == false) {
  response()->throwErr(auth()->errors());
}
```

### Uniques

Let's say you want to check whether the username a user just entered has been taken, you'd have to write a bunch of conditional code, making the code count larger and more error prone, right?

Well, `register` solves this problem smoothly. `register` has a 3rd parameter: an array of unique values which makes sure that the same value can't be saved twice.

```php
$db->register("users",
  ["name" => "mychi", "email" => "m@m.com", "pass" => "1234"],
  ["name", "email"]
);
```

So, we're telling `register` to alert us if someone has already registered with the name `mychi` or the email `m@m.com`. This is because we passed `["name", "email"]` as the 3rd param to `register`

**With uniques, you can cut down on your whole app:**
For instance, if you know the exact data you'll be receiving in your app, let's say a username, email and password from a register form, you can do something like this:

```php
app()->post("/register", function() {
  auth()->register(
    "users",
    request()->body(),
    ["username", "email"]
  );
});
```

So, we pass in the entire request body, which contains the username, email and password. Simple right?

For an even better way, you can make sure that only the data you need is going into the database. You can do this to retrieve only the fields you need.

```php
// select only the username, email and password from the request body
$data = request()->get(["username", "email", "password"]);

auth()->register("users", $data);
```

The password encode option here has also been removed. Use the auth config above instead. The final parameter is now the validate param which is an array of rules to test the params.

```php
app()->post("/register", function() use($app) {
  auth()->register(
    "users",
    request()->body(),
    ["username", "email"],
    ["email" => "email"]
  );
});
```

### register session support

Just as with login, register now integrates with session. To turn this feature on, just set the `USE_SESSION` setting or call the `useSession` method.

```php
auth()->useSession();

auth()->register("users", $credentials, [
  "username", "email"
]);
```

After a successful registration, you can redirect to GUARD_HOME or rather GUARD_LOGIN if you want the user to login after registration.

```php
// set your login route...default is /auth/login
auth()->config("GUARD_LOGIN", "/login");

// Redirect to login after auth
auth()->config("SESSION_ON_REGISTER", false);

// Login automatically after registration
auth()->config("SESSION_ON_REGISTER", true);
```

In case there's something wrong and Auth can't register the user, it returns a falsy value.

```php
$user = auth()->register("users", $credentials, [
  "username", "email"
]);

if (!$user) {
  // you can pass the auth errors into a view
  return $blade->render("pages.auth.register", [
    "errors" => auth()->errors(),
    "username" => $username,
    "email" => $email,
    "password" => $password,
  ]);
}
```

<hr>

## update

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

$user = auth()->update("users", $data, $where, $uniques, $validation);
```

::: tip USER CLASS
Leaf auth now allows you to register users with the new `Leaf\Auth\USER` class. This will allows you to import only the update functionality without actually going through the whole auth class.

```php
$user = Leaf\Auth\User::update("users", [
  "username" => "mychi.darko",
  "email" => "mickdd22@gmail.com",
  "field" => "value"
], ["id" => "1"]);
```

:::

**Something little:** Uniques in `update` work a bit different from `register`, in `update`, Leaf tries to find another user which isn't the current user that has the same credentials. So if there's no other user with that same param value, the unique test passes. In short, **the current user is excluded from the users to check for same credentials**

### update session support

Update also reeived session support. When a user is updated, the user is updated in the session and the updated user is also returned.

```php
$user = auth()->update("users", $data, $where, $uniques);
```

<hr>

<!-- ::: details Detailed Explanation
If you are developing a large project, working with other developers, or sometimes include 3rd-party HTML/CSS (e.g. from Auth0), consistent scoping will ensure that your styles only apply to the components they are meant for.

Beyond the `scoped` attribute, using unique class names can help ensure that 3rd-party CSS does not apply to your own HTML. For example, many projects use the `button`, `btn`, or `icon` class names, so even if not using a strategy such as BEM, adding an app-specific and/or component-specific prefix (e.g. `ButtonClose-icon`) can provide some protection.
::: -->

## user

When tokens are added inside requests, you generally have to decode the token and query your database with the id returned to get the current user. Although Leaf Auth makes it really simple, it can get even simpler; by calling a single method. It takes in one parameter, the table to look for users.

```php
$user = auth()->user("users");
return $user["name"];
```

In v2.4 beta, the table is set to `users` by default. So you can simply do this:

```php
$user = auth()->user();
```

We can catch any errors that occur, from fetching the user, working with the token...

```php
$user = auth()->user() ?? $request->throwErr(auth()->errors());
```

`user` also takes in a second parameter, which is an array of items to hide from the user array.

```php
$user = auth()->user("users", ["id", "password"]);
```

<hr>

## id

This is a method that decodes a token and returns the `user_id` field encoded in it.

```php
$user_id = auth()->id();
```

<hr>

<!-- ### [Leaf Authentication Methods](leaf/v/2.5.0/core/authentication) -->

Leaf Auth now uses the `Leaf\Helpers\Authentication` package to provide solutions for token authentication. This provides a simple way to work with manual authentication and tokens. All methods here are now available in `Leaf\Auth`.

```php
$payload = auth()->validate($token);
```
