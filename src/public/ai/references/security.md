# Leaf V — Sessions, Cookies, Flash & Security Reference

## Sessions

```bash
leaf install session
```

### Set

```php
session()->set('firstName', 'John');
session()->set('user', ['name' => 'John Doe', 'email' => 'john@example.com']);
session()->set(['firstName' => 'John', 'lastName' => 'Doe']);

// Dot notation — set nested value
session()->set('user.location', 'Everywhere');
```

### Get

```php
$name = session()->get('firstName');
$name = session()->get('firstName', 'default');       // with default
$name = session()->get('firstName', 'default', false); // sanitization off
$name = session()->get(param: 'firstName', sanitize: false); // PHP 8+

// Multiple
$names = session()->get(['firstName', 'lastName']);

// Dot notation
$location = session()->get('user.location');
```

### `retrieve()` — get and delete (flash behavior)

```php
$name = session()->retrieve('firstName');   // returns value, then removes it
$name = session()->retrieve('firstName');   // now null
$name = session()->retrieve('firstName', 'John');  // with default
```

### Check & Delete

```php
session()->has('firstName');
session()->has('user.username');    // dot notation

session()->delete('firstName');
session()->delete(['firstName', 'lastName']);
session()->clear();                 // delete everything

$all = session()->all();
```

---

## Flash Messages

Set via response (chainable):
```php
response()->withFlash('message', 'Saved!')->redirect('/dashboard');
response()->withFlash('user', $userObject)->json('...');
```

Read via request:
```php
$message = request()->flash();          // all flash data
$info    = request()->flash('info');    // specific key
$obj     = request()->flash('user');
```

Remove:
```php
flash()->remove('info');
```

### Toast Notifications (Blade + Tailwind + Alpine)

```php
return response()
    ->withFlash('leaf.toast', [
        'title'       => 'Email verified. Sign in to continue.',
        'description' => 'You can now sign in to your account.',
        'type'        => 'success',  // success, danger, warning, info, default
    ])
    ->redirect('/dashboard');
```

In your Blade layout:
```html
<body>
  ...
  @toastContainer
</body>
```

---

## Cookies

```bash
leaf install cookie
```

### Set

```php
// Simple — via response (chainable)
response()->withCookie('name', 'Fullname');
response()->withCookie('name', 'Fullname')->withCookie('age', 20)->json(['message' => 'Set']);

// Full options
cookie()->set('name', 'Fullname', [
    'expire'   => time() + 3600,
    'path'     => '/',
    'domain'   => 'example.com',
    'secure'   => true,
    'httponly' => true,
    'samesite' => 'None',
]);
```

### Get

```php
$name    = request()->cookies('name');
$cookies = request()->cookies(['name', 'age']);  // ['name' => ..., 'age' => ...]
$all     = request()->cookies();
```

### Delete

```php
response()->withoutCookie('name')->json(['message' => 'Deleted']);
cookie()->delete('name');
cookie()->deleteAll();
```

---

## Validation

```bash
leaf install form
```

### Basic Usage

```php
$data = request()->validate([
    'title'       => 'string|min:5',
    'email'       => 'email',
    'description' => 'optional|string|min:8',
]);

if (!$data) {
    $errors = request()->errors();
}
```

### Rules with Parameters

```php
request()->validate([
    'bio'  => 'min:10',
    'age'  => 'between:[18,30]',
    'role' => 'in:[admin,user,guest]',
]);
```

### Indexed Arrays

```php
request()->validate([
    'tags'      => 'array<string>',
    'prices'    => 'array<float>',
    'emails'    => 'array<email>',
    'passwords' => 'array<string|min:8>',
]);
```

### Associative Arrays / Nested Objects

```php
request()->validate([
    'user.name' => 'string',
    'user.age'  => ['number', 'optional'],
]);

// Escape dot if key literally contains a dot
request()->validate(['user\.name' => 'string']);
```

### Validate Non-Request Data

```php
$data = form()->validate(['name' => 'John', 'age' => 25], [
    'name' => 'string',
    'age'  => 'number',
]);

if (!$data) { $errors = form()->errors(); }
```

### Custom Error Messages

```php
request()->validator()->message([
    'required' => '{Field} is required',      // {Field} capitalizes first letter
    'email'    => '{field} must be a valid email',
]);
```

### Custom Rules

```php
// Regex
request()->validator()->rule('isEven', '/^\d*[02468]$/', '{field} must be even.');

// Function
request()->validator()->rule('isEven', function ($value) {
    return $value % 2 === 0;
}, '{field} must be even.');

request()->validate(['number' => 'isEven']);
```

### Available Rules

| Rule | Description |
|---|---|
| `email` | Valid email address |
| `text` | Alphabetic + spaces |
| `textOnly` | Alphabetic only (no spaces) |
| `alpha` | Alphabetic characters |
| `alphaNum` | Alpha-numeric |
| `alphaDash` | Alpha-numeric + underscores + dashes |
| `username` | Alpha-numeric + underscores |
| `number` | Numeric only |
| `float` | Float values |
| `date` | Valid date |
| `min:n` | Minimum value/length |
| `max:n` | Maximum value/length |
| `between:[a,b]` | Between two values |
| `match:value` | Must match value |
| `contains:value` | Must contain value |
| `in:[a,b,c]` | Must be in list |
| `ip` / `ipv4` / `ipv6` | Valid IP address |
| `url` | Valid URL |
| `domain` | Valid domain |
| `creditCard` | Valid credit card number |
| `phone` | Valid phone number |
| `uuid` | Valid UUID |
| `slug` | Valid slug |
| `json` | Valid JSON string |
| `regex:pattern` | Must match regex |
| `optional` | Field not required |
| `array<rule>` | Indexed array of type |

---

## CSRF Protection

```bash
leaf install csrf
```

**MVC:** auto-configured after install.
**Basic:** initialize before routes:

```php
app()->csrf();
// ... routes
```

### Protecting Forms (Blade)

```blade
<form action="/submit" method="POST">
    @csrf
    <input type="text" name="name">
    <button type="submit">Submit</button>
</form>
```

### API / SPA — X-CSRF-Token Header

```js
fetch('/submit', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': 'YOUR_CSRF_TOKEN',
    },
    body: JSON.stringify({ name: 'John Doe' }),
});
```

Get the token:
```php
$token = csrf()->token();
```

### Configuration

```php
// Basic app — inline
app()->csrf([
    'secret'                 => 'my-secret-key',
    'methods'                => ['POST', 'PUT', 'PATCH', 'DELETE'],
    'except'                 => ['/webhook', '/api/public'],
    'messages.tokenNotFound' => 'Token not found.',
    'messages.tokenInvalid'  => 'Invalid token.',
    'onError'                => function ($error) {
        if ($error === 'tokenNotFound') {
            response()->json(['error' => 'No CSRF token'], 403);
        } else {
            response()->json(['error' => 'Invalid CSRF token'], 403);
        }
    },
]);

// MVC — publish config
// leaf config:publish csrf  →  config/csrf.php
// X_CSRF_SECRET=my-secret-key  in .env
```

> CSRF is automatically disabled in test mode (`APP_ENV != production`).

---

## Password Hashing

Included in Leaf Auth. Install standalone if needed:

```bash
leaf install password
```

```php
use Leaf\Helpers\Password;

// Add a pepper/spice to all passwords
Password::spice('#@%7g0!&');
$spice = Password::spice();  // retrieve current spice

// Hash
$hash = Password::hash($password);                       // default algorithm
$hash = Password::hash($password, Password::BCRYPT);
$hash = Password::hash($password, Password::ARGON2);
$hash = Password::bcrypt($password, $options);
$hash = Password::argon2($password, $options);

// Verify
if (Password::verify($password, $hash)) { /* authenticated */ }
if (Password::bcryptVerify($password, $hash)) { /* bcrypt match */ }
if (Password::argon2Verify($password, $hash)) { /* argon2 match */ }
```
