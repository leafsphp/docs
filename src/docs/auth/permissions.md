# Roles and Permissions <Badge type="warning" text="BETA" />

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoModal from '@theme/components/shared/VideoModal.vue'
</script>

Authorization and authentication usually come together, but are different. Authentication is the process of verifying who you are usually in the form of signing in or logging in, while authorization is the process of verifying what you can do in the application. Leaf Auth now comes with a built-in way to manage what users can do in your application using roles and permissions.

<!-- ::: details Roles vs Permissions

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

::: -->

## Setting up

To get started, you need to install the Leaf Auth package. You can do this by running the following command:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install auth
```

```bash:no-line-numbers [Composer]
composer require leafs/auth
```

:::

Once that's done, you can get started creating your roles and permissions, but first, let's understand how roles and permissions relate to your users.

Leaf's authorization system works strictly based on a user role system meaning that users can only have roles, while all the permissions you want to grant to users are attached to roles. Users cannot be assigned permissions directly, and those permissions cannot be revoked from users directly. To assign any permission to a user, you must attach that permission to a role and then assign that role to the user.

## Creating Roles

To create roles and assign permissions to them, you can use the `createRoles()` method on the `Auth` class. This method takes an array of roles and their permissions as an argument. Here's an example:

```php
auth()->createRoles([
  'admin' => ['view user', 'view users', 'create user', ...],
  'user' => ['view user', 'view users'],
  'guest' => ['view user']
]);
```

In the example above, we created three roles: `admin`, `user`, and `guest`. The `admin` role has all the permissions, while the `user` role has fewer permissions. The `guest` role has only one permission.

After creating roles, the next step is to assign roles to users when they are created.

::: details Database Considerations
Unlike traditional RBAC, Leaf Auth does not store the list of roles and permissions in the database, it only stores a quick reference directly on the user. This design decision was made after weighing the pros and cons of both approaches.

This approach was selected because it has less overhead and doesn't require a lot of database queries to check if a user has a role or permission which makes it more performant, also since we do not allow users to have permissions directly, it makes sense to store the roles directly on the user.

The only major downside to this approach is that querying all users with a specific role or permission is slightly less performant than if we stored the roles and permissions in the database. However, this is a trade-off we are willing to make for the upfront performance benefits.
:::

## Assigning Roles to Users

To assign roles to users, you can use the `assign()` method on the user, but this means you have to create the user first. Here's an example:

::: code-group

```php{8} [Create an account for another user]
$user = auth()->createUserFor([
  'name' => 'John Doe',
  'email' => 'john@example.com',
  'password' => 'password'
]);

if ($user) {
  $user->assign('admin');  // [!code focus]

  ...
}
```

```php{4} [Assign a role to an existing user]
$user = auth()->find(1);

if ($user) {
  $user->assign('admin');  // [!code focus]

  ...
}
```

:::

You can also assign roles to the currently authenticated user who signed in using the `login()` or `register()` method:

```php
$success = auth()->login([...]);

if ($success) {
  auth()->user()->assign('admin');
}

// or from the register method

$success = auth()->register([...]);

if ($success) {
  auth()->user()->assign('admin');
}
```

Once a user has been assigned a role, they can now perform actions that are allowed by that role. For instance, if a user has the `admin` role, they can perform all the actions that the `admin` role has permissions for.

## Checking a User's Role

To check if a user has a role, you can use the `is()` method on the user. Here's an example:

```php
if (auth()->user()->is('admin')) {
  // User is an admin
}
```

The `is()` method takes in either a string or an array of roles to check if the user has any of the roles in the array. So if an array is passed, the method will return `true` if the user has any of the roles in the array.

```php
if (auth()->user()->is(['admin', 'user'])) {
  // User is an admin or a user
}
```

Leaf Auth also comes with a little syntactic sugar to make this easier to check if a user doesn't have a role. You can use the `isNot()` method to check if a user doesn't have a role. Here's an example:

```php
if (auth()->user()->isNot('admin')) {
  // User is not an admin
}

if (auth()->user()->isNot(['admin', 'user'])) {
  // User is not an admin or a user
}
```

## Checking Permissions

Once you assign a role to a user, the user can perform all the actions that the role has permissions for. To check if a user has a permission, you can use the `can()` method on the user. Here's an example:

```php
if (auth()->user()->can('view user')) {
  // User can view a user
}
```

The `can()` method takes in either a string or an array of permissions to check if the user has any of the permissions in the array. So if an array is passed, the method will return `true` if the user has any of the permissions in the array.

```php
if (auth()->user()->can(['view user', 'create user'])) {
  // User can view a user or create a user
}
```

Just like the `is()` method, Leaf Auth also comes with a little syntactic sugar to make this easier to check if a user doesn't have a permission. You can use the `cannot()` method to check if a user doesn't have a permission. Here's an example:

```php
if (auth()->user()->cannot('view user')) {
  // User cannot view a user
}

if (auth()->user()->cannot(['view user', 'create user'])) {
  // User cannot view a user or create a user
}
```

## Middleware

In addition to the `is()` and `can()` methods, Leaf Auth also comes with middleware to protect routes based on roles and permissions. There are 4 middleware that come with Leaf Auth that are exactly the same as the functions above:

- `is` - Only allows access if the user has the specified role(s)
- `isNot` - Only allows access if the user does not have the specified role(s)
- `can` - Only allows access if the user has the specified permission(s)
- `cannot` - Only allows access if the user does not have the specified permission(s)

To use the middleware, you can pass the middleware as an array to the route. Here's an example:

```php
app()->get('/admin', [
  'middleware' => 'is:admin|user|organizer',
  function () {
    return 'Admin Page';
  }
]);

app()->get('/user/{user}', [
  'middleware' => 'can:view user|create user',
  function () {
    return 'User Page';
  }
]);

app()->get('/guest', [
  'middleware' => 'isNot:admin',
  function () {
    return 'Guest Page';
  }
]);

app()->get('/no-access', [
  'middleware' => 'cannot:view user|create user',
  function () {
    return 'No Access Page';
  }
]);
```

In the example above:

- The `/admin` route can only be accessed by users with the `admin`, `user`, or `organizer` roles.
- The `/user/{user}` route can only be accessed by users with the `view user` or `create user` permissions.
- The `/guest` route can only be accessed by users who do not have the `admin` role.
- The `/no-access` route can only be accessed by users who do not have the `view user` or `create user` permissions.

By default, Leaf Auth will show a 404 page if the user does not have the required role or permission to access the route. You can customize this behavior by manually telling Leaf Auth what to do when a user does not have the required role or permission using the `middleware()` method on the `Auth` class. Here's an example:

To use the your selected middleware, you need to tell Leaf Auth what should happen if the role or permission validation fails. You can do this using the `middleware()` method on the `Auth` class. Here's an example:

```php
auth()->middleware('is', function () {
  response()->redirect('/login');
});
```

Over here, we're telling Leaf Auth to redirect the user to the login page if the user does not have the required role to access the route. This will only work for the `is` middleware. You can also use the `isNot`, `can`, and `cannot` middleware in the same way.

## Unassigning Roles

To unassign a role from a user, you can use the `unassign()` method on the user. Here's an example:

```php:no-line-numbers
auth()->user()->unassign('admin');
```

## Listing Roles and Permissions

To list all the roles and permissions you registered using the `createRoles()` method, you can use the `roles()` method on the `Auth` class. Here's an example:

```php:no-line-numbers
$roles = auth()->roles();
```

The `roles()` method will return an array of all the roles and their permissions just like you registered them.

## Getting a User's Roles

To get a user's roles, you can use the `roles()` method on the user:

```php:no-line-numbers
$roles = auth()->user()->roles();
```

The `roles()` method will return an array of all the roles the user has without the permissions. It will also return an empty array if the user has no roles.

## Getting a User's Permissions

To get a user's permissions, you can use the `permissions()` method on the user:

```php:no-line-numbers
$permissions = auth()->user()->permissions();
```

The `permissions()` method will return an array of all the permissions the user has without the roles. It will also return an empty array if the user has no permissions.
