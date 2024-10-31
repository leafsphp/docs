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

## User relationships

Relationships are a way to connect different models in your application. For instance, a user may have many posts, or a user may have many transactions. Using relationships, you can fetch related data from your database. If you have a user model with a one-to-many relationship with a posts model, you can fetch the user's posts using the user object:

```php
$posts = auth()->user()->posts();
// will return a Leaf DB instance with posts by the current user
// SELECT * FROM posts WHERE user_id = $current_user_id
```

You can further filter the data by using any of the Leaf DB methods:

```php:no-line-numbers
$posts = auth()->user()->posts()->where('title', 'like', '%leaf%')->get();
```

You can do this by calling whatever table your user is related to as a method on the user object. For instance, if you want to grab all user transactions from the `transactions` table, you can call the `transactions()` method on the user object. If you want to grab all books your user has read from the `read_books` table, you can call the `readBooks()` method on the user object.

It will return a Leaf DB instance with the related data. You can further filter the data by using any of the Leaf DB methods:

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
