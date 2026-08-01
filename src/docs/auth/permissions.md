# Roles and Permissions

<!-- markdownlint-disable no-inline-html -->

<section class="not-prose my-10 overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
  <div class="grid gap-0 2xl:grid-cols-[1fr_0.9fr]">
    <div class="border-b border-neutral-200 p-6 sm:p-8 2xl:border-b-0 2xl:border-r dark:border-neutral-800">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">Authorization</p>
      <h1 class="m-0 text-3xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-4xl">Give users roles, then let roles carry permissions.</h1>
      <p class="!m-0 !mt-4 text-base leading-7 text-neutral-600 dark:text-neutral-400">Leaf Auth keeps authorization simple: users receive roles, roles contain permissions, and your app can check access without extra database ceremony.</p>
    </div>
    <div class="bg-neutral-50 p-6 dark:bg-neutral-900/60 sm:p-8">
      <div class="rounded-lg border border-neutral-200 bg-white p-4 font-mono text-sm text-neutral-700 dark:border-neutral-800 dark:bg-black dark:text-neutral-300">
        <div>auth()-&gt;createRoles([</div>
        <div class="pl-4 text-[var(--vp-c-brand-1)]">'admin' =&gt; ['create user', 'delete user'],</div>
        <div class="pl-4 text-sky-600 dark:text-sky-400">'user' =&gt; ['view user']</div>
        <div>]);</div>
      </div>
    </div>
  </div>
</section>

Authorization and authentication usually come together, but are different. Authentication verifies who you are, while authorization verifies what you can do in the application. Leaf Auth now comes with a built-in way to manage user access with roles and permissions.

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

`assign()` returns `true` once the role is saved. Roles have to exist before they can be given out, so assigning one you never registered with `createRoles()` returns `false` and raises an error telling you which role it was, rather than reporting success and leaving the user with nothing:

```php
$user->assign('admin');   // true
$user->assign('adminn');  // false, "Cannot assign unknown role(s): adminn"
```

The same applies to an array: if any role in it is unregistered, nothing is assigned.

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
  fn () => 'Admin Page'
]);

app()->get('/user/{user}', [
  'middleware' => 'can:view user|create user',
  fn () => 'User Page'
]);

app()->get('/guest', [
  'middleware' => 'isNot:admin',
  fn () => 'Guest Page'
]);

app()->get('/no-access', [
  'middleware' => 'cannot:view user|create user',
  fn () => 'No Access Page'
]);
```

In the example above:

- The `/admin` route can only be accessed by users with the `admin`, `user`, or `organizer` roles.
- The `/user/{user}` route can only be accessed by users with the `view user` or `create user` permissions.
- The `/guest` route can only be accessed by users who do not have the `admin` role.
- The `/no-access` route can only be accessed by users who do not have the `view user` or `create user` permissions.

By default, Leaf Auth will show a 404 page if the user does not have the required role or permission to access the route. You can customize this behavior by telling Leaf Auth what to do when the role or permission validation fails, using the `middleware()` method on the `Auth` class. Here's an example:

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
