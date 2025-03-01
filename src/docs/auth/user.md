# User Operations

After successfully logging in or registering a user, Leaf Auth provides a bunch of functionality that you can use to manage your users. These range from updating user details to other CRUD operations.

## Getting user information

You can usually get the current user's information using the `data()` method, however, the output is an array of the user's data together with the tokens which is not very convenient for use within your application.

```php
$data = auth()->data();
// ['user' => [...], 'accessToken' => '...', 'refreshToken' => '...']
```

The `user()` method allows you to pick out exactly the information you need from the user's data. If you need all the user's data, you can use the `get()` method:

```php
$user = auth()->user()->get();

// or pick specific fields
$email = auth()->user()->email;
$username = auth()->user()->username;
```

Picking specific fields also gives you access to fields you may have hidden using the auth config. This is useful because it allows you to perform operations on the user's data without mistakenly exposing hidden fields.

```php
auth()->config('hidden', ['secret_field']);

$secretField = auth()->user()->secret_field;
```

While this may seem like a lot of work, it's a good way to ensure that your user's data is secure and only accessible where needed.

## Email verification <Badge>NEW</Badge>

Email verification is a very important feature in most applications. It allows you to verify that the email address provided by a user is valid and that they have access to it. Leaf Auth by default does not incorporate email verification into the authentication process, but you can easily add it to your application using handy functions added in Auth v3.4.0.

::: tip Database considerations
Leaf does not enforce any database schema on you, however, Leaf will automatically create a nullable `email_verified_at` column in your users table if you do not have this column. No setup is required on your part.
:::

### Generating a verification token

After you have registered a user, you can generate a verification token for the user using the `generateVerificationToken()` method. This method generates a JWT which you can send to the user's email address as part of a link.

```php
$token = auth()->user()->generateVerificationToken();

$verificationLink = "https://example.com/verify?token=$token";
```

You can also pass an expiration time to the `generateVerificationToken()` method. The default expiration time is 10 minutes.

```php:no-line-numbers
$token = auth()->user()->generateVerificationToken(time() + 3600); // 1 hour
```

### Verifying a user

When a user clicks on the verification link, you first need to verify the token. You can do this using the `verifyToken()` method. This method returns `true` if the token is valid and `false` if the token is invalid.

```php
$token = request()->get('token');
$isValid = auth()->verifyToken($token);

if ($isValid) {
  // Token is valid
} else {
  // Token is invalid
}
```

If the token is valid, you can then update the user's `email_verified_at` column to the current time. You can do this using the `verifyEmail()` method. This method returns `true` if the update is successful and `false` if the update is not successful.

```php
$token = request()->get('token');
$isValid = auth()->verifyToken($token);

if ($isValid && auth()->user()->verifyEmail()) {
  // Email is verified
} else {
  // Could not verify email, missing or invalid token
}
```

### Verification middleware

You can also add a middleware to your routes and route groups to ensure that only users of a certain verification status can access certain routes.

```php
app()->get('/some-route', [
  'middleware' => 'auth.verified',
  function () {
    // route will only be accessible to verified users
  }
]);

app()->get('/some-route', [
  'middleware' => 'auth.unverified',
  function () {
    // route will only be accessible to unverified users
  }
]);
```

You can view the full documentation on the [middleware page](/docs/auth/protected-routes.html#email-verification-middleware-new).

### Checking verification status

You can check if a user's email is verified using the `isVerified()` method. This method returns `true` if the user's email is verified and `false` if the user's email is not verified.

```php
if (auth()->user()->isVerified()) {
  // Email is verified
} else {
  // Email is not verified
}
```

## User relationships

Leaf auth comes with a very basic model system that allows you to get/set data related to the current user. For instance, you may want to get all posts by the current user or all transactions by the current user, or maybe add a new purchase to the current user. All these can be done using the user method.

```php
$posts = auth()->user()->posts()->get();
// will return a Leaf DB instance with posts by the current user
// SELECT * FROM posts WHERE user_id = $current_user_id
```

If you want to relate a user to a different table, you can do this by calling whatever table your user is related to as a method on the user object. For instance, if you want to grab all user posts from the `posts` table, you can call the `posts()` method on the user object. If you want to grab all user transactions from the `transactions` table, you can call the `transactions()` method on the user object. Once you call the method, it will return a Leaf DB instance which has already been filtered by the user's ID.

```php
$purchases = auth()->user()->purchases();
// will return a Leaf DB instance with purchases by the current user

$purchases->get();
$purchases->first();
...
```

### Filtering user relationships

Since a Leaf DB instance is returned, you can further filter the data by using any of the Leaf DB methods:

```php:no-line-numbers
$posts = auth()->user()->posts()->where('title', 'like', '%leaf%')->get();
```

Here are some common examples:

```php:no-line-numbers
$posts = auth()
  ->user()
  ->transactions()
  ->where('amount', '>', 1000)
  ->get();

$books = auth()
  ->user()
  ->readBooks()
  ->where('title', 'Building with Leaf')
  ->first();
```

### Creating related data

If you want to add new data to a database table which should be related to the current user, you can call the table name as a method on the user object and then call the `create()` method on the returned Leaf DB instance.

```php
auth()->user()->posts()->create([
  'title' => 'My first post',
  'content' => 'This is my first post'
]);
```

This will create a new post in the `posts` table with the `user_id` set to the current user's ID.

### Updating related data

If you want to update data related to the current user, you can call the table name as a method on the user object and then call the `update()` method on the returned Leaf DB instance.

```php
auth()
  ->user()
  ->purchases()
  ->update([
    'status' => 'completed',
  ])
  ->execute();
```

You can also further filter the data before updating it:

```php
auth()
  ->user()
  ->purchases()
  ->update([
    'status' => 'completed',
  ])
  ->where('status', 'pending')
  ->execute();
```

### Deleting related data

If you want to delete data related to the current user, you can call the table name as a method on the user object and then call the `delete()` method on the returned Leaf DB instance.

```php
auth()
  ->user()
  ->purchases()
  ->delete()
  ->where('status', 'cancelled')
  ->execute();
```

You can also delete all related data:

```php
auth()
  ->user()
  ->purchases()
  ->delete()
  ->execute();
```

## Updating a logged-in user

Updating user information means allowing users to change their details (like username, email, or password) in your application. It is a very common feature in most applications.

Leaf provides an `update()` method that allows you to update a user's information. It returns `true` if the user is successfully updated and `false` if the user is not updated. You can get the error message using the `errors()` method.

```php
$success = auth()->update($data);

if ($success) {
  // User is updated
} else {
  // User is not updated
  $error = auth()->errors();
}
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

## Password reset

Leaf Auth doesn't have a full built-in password reset flow which involves sending an email to the user with a link to reset their password. This may be added in the future, but for now, Leaf Auth comes with a simple `updatePassword()` method that allows you to change a user's password. It takes care of verifying the old password and hashing the new password.

```php
$success = auth()->updatePassword($oldPassword, $newPassword);

if ($success) {
  // Password is updated
} else {
  // Password is not updated
  $error = auth()->errors();
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

If you want to perform a custom operation when a user logs out, you can pass a function to the `logout()` method:

```php
auth()->logout(function () {
  // your logout handler
});
```
