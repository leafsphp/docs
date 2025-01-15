# Protected Routes

<!-- markdownlint-disable no-inline-html -->

There are usually parts of your application that you want to be available to only logged in users or guest users. That's where protected routes come in. Protected routes are setup to allow users with a certain authentication status to access them.

## The `user` method

The `user()` method is a way to check if a user is logged in. It returns the currently logged in user if an authenticated user is found and `null` if a user is not logged in.

This works for both session and token based authentication. In case of token based authentication, Leaf Auth will also check if the token is valid. If it is, the user is returned, if not, `null` is returned. You can get the reason for the authentication failure by calling the `errors()` method.

```php{1,7}
$user = auth()->user();

if ($user) {
  // user is logged in
} else {
  // user is not logged in
  $errors = auth()->errors();
}
```

Using this method, you can easily protect your routes by checking if a user is logged in. If a user is not logged in, you can redirect them to the login page or return a 401 error. Here's an example:

```php
app()->get('/protected', function () {
  $user = auth()->user();

  if ($user) {
    // user is logged in
  } else {
    // user is not logged in
    response()->redirect('/login');
  }
});
```

For API routes, you can return a 401 error if a user is not logged in.

```php
app()->get('/protected', function () {
  $user = auth()->user();

  if ($user) {
    // user is logged in
  } else {
    // user is not logged in
    response()->json([
      'error' => 'Unauthorized',
      'data' => auth()->errors(),
    ], 401);
  }
});
```

## The `id` method

The id() method lets you get the ID of the user who is currently logged in. This is helpful when you need to work with the user's ID in your app. If no user is logged in, the method returns `null` instead.

```php
app()->get('/protected', function () {
  $id = auth()->id();

  if ($id) {
    // user is logged in
  } else {
    // user is not logged in
    response()->redirect('/login');
  }
});
```

## Using Middleware

Leaf Auth provides middleware to keep guest users out and logged in users in. This is a more flexible way to protect your routes and allows you to define more complex authentication logic. The `auth:required` middleware checks if a user is logged in and redirects to `/auth/login` if a user is not logged in.

```php
app()->get('/protected', ['middleware' => 'auth.required', function () {
  // this route is protected
}]);

// or on a route group
app()->group('/protected', ['middleware' => 'auth.required', function () {
  app()->get('/route', function () {
    // this route is protected
  });
}]);
```

The route or group of routes will only be accessible to logged in users, so you don't need to check if a user is logged in inside the route handler.

## Protected Guest Routes

Just like the `auth.required` middleware, Leaf Auth provides a `auth.guest` middleware to protect routes that should only be accessible to guest users. This is useful for routes like the login and register routes.

```php
app()->get('/login', ['middleware' => 'auth.guest', function () {
  // this route is only accessible to guest users
}]);
```

If a logged in user tries to access a route protected by the `auth.guest` middleware, they will be redirected to the `/dashboard` route by default.

## Email verification middleware <Badge>NEW</Badge>

Leaf Auth provides middleware to protect routes that should only be accessible to only users with a certain email verification status. The `auth.verified` middleware ensures that only verified users can access certain routes.

```php
app()->group('/dashboard', [
  'middleware' => 'auth.verified',
  function () {
    // dashboard routes will only be accessible to verified users
  }
]);

app()->get('/some-route', [
  'middleware' => 'auth.verified',
  function () {
    // route will only be accessible to verified users
  }
]);
```

While the `auth.unverified` middleware which ensures that only unverified users can access certain routes.

```php
app()->group('/verify', [
  'middleware' => 'auth.unverified',
  function () {
    // verify routes will only be accessible to unverified users
  }
]);

app()->get('/some-route', [
  'middleware' => 'auth.verified',
  function () {
    // route will only be accessible to unverified users
  }
]);
```

By default, the `auth.verified` middleware will redirect unverified users to the `/auth/verify` route if they are not verified, and the `auth.unverified` middleware will redirect verified users to the `/dashboard` route if they are verified. You can customize this behaviour by defining your own function that should be called when the middleware fails. You can follow the instructions in the next section to learn how to customize the auth middleware.

## Customizing auth middleware

Your application may need you to return different responses for the `auth.required` and `auth.guest` middleware. You can customize the middleware by defining your own function that should be called when the middleware fails.

```php
auth()->middleware('auth.required', function () {
  response()->exit('You need to be logged in to access this route');
});

auth()->middleware('auth.guest', function () {
  response()->exit('You are already logged in');
});
```

After defining the custom middleware, you can use it in your routes.

```php
app()->get('/protected', ['middleware' => 'auth.required', function () {
  // this route is protected
}]);

app()->get('/login', ['middleware' => 'auth.guest', function () {
  // this route is only accessible to guest users
}]);
```

You only need to define the custom middleware if the default behavior of the `auth.required` and `auth.guest` middleware does not meet your requirements.

## Session Guards <Badge type="danger" text="DEPRECATED" />

The previous version of Leaf Auth had a feature called session guards. This feature has been deprecated in the latest version of Leaf Auth. If you were using session guards in your app, you can switch to the new middleware system to protect your routes.

The middleware system is more flexible and allows you to define more complex authentication logic using the middleware callback functions.

You can also use the middleware system to protect routes for both logged in and guest users, which is essentially what session guards were used for.
