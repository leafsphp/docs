# Leaf 5: Auth Reference

## Installation

```bash
leaf install auth
```

## Configuration

### MVC: via `.env`

```env
AUTH_DB_TABLE=users
AUTH_DB_ID=id
AUTH_TIMESTAMPS=true
AUTH_TIMESTAMPS_FORMAT='YYYY-MM-DD HH:mm:ss'
AUTH_SESSION=true
AUTH_TOKEN_SECRET=your-secret
```

For full config:
```bash
leaf config:publish auth   # → config/auth.php
```

### Basic App: connect to DB

```php
// Direct connection
auth()->connect([
    'dbtype'   => 'mysql',
    'host'     => '...',
    'dbname'   => '...',
    'username' => '...',   // note: username, not user — same keys as db()->connect()
    'password' => '...',
    'charset'  => '...',
    'port'     => '...',
]);

// Existing PDO instance
$db = new PDO('mysql:dbname=test;host=127.0.0.1', 'root', '');
auth()->dbConnection($db);

// Existing Leaf DB connection — nothing needed, picked up automatically
```

Note that in MVC apps, auth, `db()`, and Eloquent models all share **one** database connection, Leaf DB lazily borrows Eloquent's PDO (leafs/db 5.1+), so an auth read can never lock out a model write. On SQLite the framework also defaults to WAL journal mode with a busy timeout (`config/database.php`) to keep concurrent PHP processes safe; leave those in place. To point auth at a *different* database entirely, pass a PDO explicitly with `auth()->dbConnection($pdo)`.

### Lite apps

Auth works in lite apps with one line of wiring: `db()->connect([...])`, auth picks up the connection automatically (or share explicitly with `auth()->dbConnection(db()->connection())`). In lite apps, know these realities: `.env` files are NOT loaded (there is no dotenv loader, export env vars in the real environment, or use `token.secret` config), `leaf scaffold:auth` and `leaf key:generate` are MVC-only commands, and session-only auth needs no signing secret at all (5.1.2+). Set `redirect.login`/`redirect.guest` to real routes, the defaults point at MVC scaffold paths.

### Runtime Config

```php
auth()->config('id.key', 'admin_id');       // custom primary key (default: 'id')
auth()->config('db.table', 'admins');        // custom table (default: 'users')
auth()->config('hidden', ['field.id', 'email_verified_at']); // hide fields from user output
auth()->config('unique', ['email', 'username']); // unique fields on register
auth()->config('password.key', 'pass');      // custom password field name
auth()->config('password.key', false);       // disable password auth entirely
auth()->config('redirect.login', '/signin'); // where auth.required sends guests (default: /auth/login)
auth()->config('redirect.guest', '/');       // where auth.guest sends signed-in users (default: /dashboard)
```

---

## Scaffold (MVC only)

```bash
leaf scaffold:auth
```

Generates a full auth system:
- User model + database schema
- Login, register, dashboard controllers
- Auth routes
- Route protection middleware
- Views (tailored to your frontend setup)
- Dashboard + account update example

Just update the UI to match the design.

---

## Login

```php
$success = auth()->login([
    'email'    => 'user@example.com',
    'password' => 'password',
]);

if ($success) {
    $data = auth()->data();
    // ['user' => [...], 'accessToken' => '...', 'refreshToken' => '...']
} else {
    $error = auth()->errors();
}
```

### Session Auth

Leaf uses JWT by default. Switch to sessions:

```php
auth()->config('session', true);
// or AUTH_SESSION=true in .env
```

Session-only apps need no token secret (5.1.2+): JWTs are minted lazily, so the signing secret is only required the moment something reads `tokens()` or `getAuthInfo()`. Two more session facts worth knowing: reading the authenticated user rotates the session id on each request (old ids stay valid, so this is safe but visible in Set-Cookie), and `register()`/`login()` validate nothing beyond credentials and uniqueness, run `request()->validate()` on the input first, or a one-character password creates an account.

With sessions, `login()` starts the session automatically:

```php
$success = auth()->login(['email' => '...', 'password' => '...']);

if ($success) {
    return response()->redirect('/dashboard');
} else {
    $error = auth()->errors();
}
```

Fine-tune session cookies:
```php
auth()->config('session.cookie', [
    'secure'   => true,
    'httponly' => true,
    'samesite' => 'lax',   // 'strict', 'lax', 'none', or null
]);
```

Token lifetime:
```php
auth()->config('token.lifetime', 60 * 60 * 24 * 7);  // 1 week
auth()->config('token.lifetime', 0);                   // never expire
auth()->config('session.lifetime', 60 * 60 * 24);      // session: 1 day
auth()->config('session.lifetime', 0);                  // session: never expire
```

---

## Current User

```php
auth()->user();     // current authenticated user object
auth()->id();       // current user's ID
auth()->data();     // full auth data: user + tokens
auth()->oauthToken(); // OAuth token (if signed in via OAuth)
```

---

## Logout

```php
auth()->logout();
// For session auth, also redirect after:
auth()->logout();
response()->redirect('/login');
```

---

## Registration

```php
$success = auth()->register([
    'username' => 'mychi',
    'email'    => 'mychi@leafphp.dev',
    'password' => 'password',
]);

if (!$success) {
    $errors = auth()->errors();
}
```

---

## What the users table needs

Auth works with any table (default `users`) that has:

- An id column (`id` by default, configurable with `id.key`), auto-increment or UUID both work
- An `email` column (lowercased automatically on register) and whatever you use as `password.key` (default `password`)
- Any other columns you pass to `register()`/`createUserFor()`, auth stores what you give it

You do not need a roles column, because roles are stored in a `leaf_auth_user_roles` column that auth **creates automatically on first `assign()`**, including on existing tables. Do not add it to your schema by hand.

## The user object

`auth()->user()` returns a `Leaf\Auth\User`. Know its shape before building API responses:

- `$user->get()` returns the user data **minus hidden fields**. The password column and `remember_token` are ALWAYS stripped (5.1.2+), whatever `hidden` says. The `hidden` config controls the rest, its default is `['field.id', 'field.password', 'remember_token']`, where `field.id`/`field.password` are sentinels resolving to your configured `id.key`/`password.key`; prefer them over literal column names when overriding. Everything not hidden (`email_verified_at`, timestamps, any custom column) IS included, and in Inertia apps ships to the browser in the shared `auth` prop, add columns to `hidden` before they reach the client
- `$user->id()` returns the id even though it is hidden from `get()`
- `$user->roles()` returns the assigned roles, combine with `get()` when your API response needs both: `[...$user->get(), 'roles' => $user->roles()]`
- After `assign()`, the database is updated but the in-memory user is not, read `roles()` (which reflects the assignment) rather than re-reading `get()`
- With bearer tokens, `auth()->user()` reconstructs the user from the JWT on every request (roles included from the database), so role checks like `auth()->user()->is('admin')` work statelessly across requests

## Finding a User

```php
$user = auth()->find(1);   // find by ID (user does NOT need to be logged in)

$user->assign('admin');
$user->transactions()->create([/* ... */]);
```

---

## OAuth

```php
// Register provider (in routes/index.php or index.php)
// Install a League OAuth2 provider package, then configure via .env:
// GOOGLE_AUTH_CLIENT_ID=...
// GOOGLE_AUTH_CLIENT_SECRET=...

$token  = auth()->client('google')->anyLeagueMethod();
$token  = auth()->client('github')->getAccessToken('authorization_code', ['code' => $_GET['code']]);
$user   = auth()->client('github')->getResourceOwner($token);

$success = auth()->fromOAuth([
    'token' => $token,
    'user'  => [
        'name'   => $user->getName(),
        'email'  => $user->getEmail(),
        'avatar' => $user->getAvatar() ?? null,
    ],
]);

if (!$success) {
    $error = auth()->errors();
}

// After success, user is authenticated normally
$currentUser = auth()->user();
$oauthToken  = auth()->oauthToken();  // retrieve saved OAuth token later
```

---

## Password

```php
// Custom password field
auth()->config('password.key', 'pass');

// Disable password auth (e.g. multi-step auth)
auth()->config('password.key', false);

// Custom hashing
auth()->config('password.encode', function ($password) {
    return Password::hash($password);
});

// Custom verification
auth()->config('password.verify', function ($password, $hash) {
    return Password::verify($password, $hash);
});
auth()->config('password.verify', false);  // disable verification
```

---

## Error Messages

```php
auth()->config('messages.loginParamsError', 'Username is incorrect!');
auth()->config('messages.loginPasswordError', 'Password is incorrect!');
```

---

## Checking Auth State

```php
$user = auth()->user();

if ($user) {
    // logged in
} else {
    $errors = auth()->errors();
}

// In routes
app()->get('/protected', function () {
    if (!auth()->user()) {
        response()->redirect('/login');        // web
        // or:
        response()->json(['error' => 'Unauthorized', 'data' => auth()->errors()], 401); // API
    }
    // ...
});

// By ID
$id = auth()->id();  // null if not logged in
```

---

## Built-in Auth Middleware

Use directly as route/group middleware, no setup needed:

```php
// Require login
app()->get('/protected', ['middleware' => 'auth.required', function () { /* ... */ }]);
app()->group('/dashboard', ['middleware' => 'auth.required', function () { /* ... */ }]);

// Guest only (redirect logged-in users)
app()->get('/login', ['middleware' => 'auth.guest', function () { /* ... */ }]);

// Verified users only
app()->group('/dashboard', ['middleware' => 'auth.verified', function () { /* ... */ }]);

// Unverified users only
app()->group('/verify', ['middleware' => 'auth.unverified', function () { /* ... */ }]);
```

### Customize middleware failure behavior

```php
auth()->middleware('auth.required', fn () => response()->exit('You need to be logged in', 401));

auth()->middleware('auth.guest', fn () => response()->exit('You are already logged in', 403));
```

---

## Roles & Permissions (RBAC)

Leaf Auth stores roles directly on the user (not in a separate DB table) for performance, fewer queries, no joins. Trade-off: querying all users with a role is slightly less performant.

### Define Roles

Call once near the top of your app (e.g. `app/routes/index.php` in MVC):

```php
auth()->createRoles([
    'admin' => ['view user', 'view users', 'create user', 'delete user'],
    'user'  => ['view user', 'view users'],
    'guest' => ['view user'],
]);
```

### Assign Roles

```php
// On register
$success = auth()->register([/* ... */]);
if ($success) { auth()->user()->assign('admin'); }

// On login
$success = auth()->login([/* ... */]);
if ($success) { auth()->user()->assign('user'); }

// Create user without login flow
$user = auth()->createUserFor([
    'name' => 'John', 'email' => 'john@example.com', 'password' => 'password'
]);
if ($user) { $user->assign('admin'); }

// By ID (user doesn't need to be logged in)
$user = auth()->find(1);
if ($user) { $user->assign('admin'); }

// Unassign
auth()->user()->unassign('admin');
```

### Check Roles

```php
auth()->user()->is('admin');
auth()->user()->is(['admin', 'user']);      // true if any match
auth()->user()->isNot('admin');
auth()->user()->isNot(['admin', 'user']);   // true if none match
```

### Check Permissions

```php
auth()->user()->can('view user');
auth()->user()->can(['view user', 'create user']);      // true if any match
auth()->user()->cannot('view user');
auth()->user()->cannot(['view user', 'create user']);   // true if none match
```

### Role/Permission Middleware

Pipe-separate multiple values with `|`:

```php
app()->get('/admin', ['middleware' => 'is:admin|user|organizer', function () { /* ... */ }]);
app()->get('/users', ['middleware' => 'can:view user|create user', function () { /* ... */ }]);
app()->get('/guest', ['middleware' => 'isNot:admin', function () { /* ... */ }]);
app()->get('/locked', ['middleware' => 'cannot:view user|create user', function () { /* ... */ }]);
```

Default behavior on failure: 404. Customize:

```php
auth()->middleware('is', fn () => response()->redirect('/login'));

auth()->middleware('can', fn () => response()->json(['error' => 'Forbidden'], 403));
```

### Inspect Roles & Permissions

```php
auth()->roles();                    // all defined roles
auth()->user()->roles();            // roles assigned to current user
auth()->user()->permissions();      // permissions of current user's roles
```

| Config Key | Default | Description |
|---|---|---|
| `db.table` | `'users'` | Database table |
| `id.key` | `'id'` | Primary key field |
| `timestamps` | `true` | Auto created_at/updated_at |
| `timestamps.format` | `'YYYY-MM-DD HH:mm:ss'` | Timestamp format |
| `password.key` | `'password'` | Password field name |
| `password.encode` | `Password::hash` | Hashing function |
| `password.verify` | `Password::verify` | Verification function |
| `unique` | `['email', 'username']` | Fields checked for uniqueness. Fields missing from the data are skipped, so a table without `username` is safe, but set `['email']` explicitly to save the wasted check |
| `hidden` | `['field.id', 'field.password', 'remember_token']` | Hidden from user output |
| `session` | `false` | Use sessions instead of JWT |
| `session.lifetime` | `86400` | Session TTL in seconds |
| `session.cookie` | `[secure, httponly, samesite]` | Cookie params |
| `token.lifetime` | `31536000` (1 year) | JWT TTL in seconds |
| `token.secret` | derived | Resolution order: `token.secret` config, then `AUTH_TOKEN_SECRET` env, then derived from `APP_KEY`. With none of the three, token operations throw a clear error, set one before going live |
| `token.secret` | env `AUTH_TOKEN_SECRET` | JWT signing secret |
