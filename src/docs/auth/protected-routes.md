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
      "error" => "Unauthorized",
      "data" => auth()->errors(),
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

Leaf Auth also provides a middleware that you can use to protect your routes. The `auth` middleware checks if a user is logged in and allows you to set a callback function to run if a user is not logged in.

```php
auth()->middleware('auth.required', function () {
  response()->redirect('/login');
});
```

Once you have defined a callback for the middleware, you can use it in your routes like this:

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

If you use this method, the middleware will run before the route is executed. If the user is not logged in, the callback function you defined will be executed. This means you can remove the check for a logged in user from your route handler.

```php
app()->get('/protected', ['auth.required', function () {
  $user = auth()->user();

  // no need to check if user is logged in
}]);
```

## Protected Guest Routes

You can also protect routes that should only be accessible to guest users. This is useful for routes like the login and register routes. You can use the `auth.guest` middleware to protect these routes.

```php
auth()->middleware('auth.guest', function () {
  response()->redirect('/dashboard');
});
```

You can then use this middleware on your guest routes like this:

```php
app()->get('/login', ['middleware' => 'auth.guest', function () {
  // this route is only accessible to guest users
}]);
```

This middleware will run before the route is executed. If a user is logged in, the callback function you defined will be executed. This means you can remove the check for a guest user from your route handler.

```php
app()->get('/login', ['auth.guest', function () {
  // no need to check if the user is a guest
}]);
```

## Session Guards <Badge type="danger" text="DEPRECATED" />

The previous version of Leaf Auth had a feature called session guards. This feature has been deprecated in the latest version of Leaf Auth. If you were using session guards in your app, you can switch to the new middleware system to protect your routes.

The middleware system is more flexible and allows you to define more complex authentication logic using the middleware callback functions. 

You can also use the middleware system to protect routes for both logged in and guest users, which is essentially what session guards were used for.
