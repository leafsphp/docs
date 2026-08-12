# Password Encryption

Password encoding and verification are one of the most important parts of any application. This usually involves a lot of security concerns and can be a pain to implement. Leaf makes this process a lot easier with the password helper.

Before you go on, Leaf already has a [full authentication system](/docs/auth/) that comes with simple authentication, session/token management and so much more. Your use case may already be covered by Leaf Auth, so be sure to check that first.

## Setting up

You can install the password helper using the Leaf CLI:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install password
```

```bash:no-line-numbers [Composer]
composer require leafs/password
```

:::

From there, you can use any of the Password methods.

## spice

Spice is Leaf's name for a [password pepper](https://en.wikipedia.org/wiki/Pepper_(cryptography)): a secret that lives in your application (not your database) and is mixed into every password before hashing. If an attacker dumps your database through SQL injection, a stolen backup, or an exposed server, the hashes are useless for offline cracking without the spice, because it was never stored next to them.

Set it once, from an environment variable, when your app boots:

```php
use Leaf\Helpers\Password;

Password::spice(_env('PASSWORD_SPICE'));
```

Once set, every `hash()` and `verify()` call applies it automatically, and you don't need to think about it again. Under the hood the password is keyed through HMAC-SHA256 with the spice as the secret before hashing, which is the standard construction for a pepper.

**The next examples will assume you've added `use Leaf\Helpers\Password`**

You can read the current spice back with `Password::spice()` (no arguments).

::: warning Set it once, never change it
Changing the spice invalidates every stored password hash, so users would no longer be able to log in. Treat it like an encryption key: generate a long random value, keep it in your `.env` (never commit it), and leave it alone.
:::

::: details Upgrading from Leaf 4
Older versions of this module chained the spice onto the password as plain text instead of HMAC-ing it. Hashes created that way still verify, since `verify()` falls back to the old scheme automatically, and you can migrate them forward with [`needsRehash()`](#password-needsrehash) whenever a user logs in.
:::

## `Password::hash()`

This method basically creates a password hash. It takes in 3 parameters:

- The password to encrypt
- The encryption hash (optional)
- An array of options for the password hash (optional)

```php
$hash = Password::hash('USER_PASSWORD', Password::BCRYPT);
```

The default encryption hash used if none is provided is `Password::DEFAULT` which is `PASSWORD_DEFAULT`.

Also, the most commonly used hashes, BCRYPT and Argon2 are accessible on the Password Helper object as `Password::BCRYPT` and `Password::ARGON2` (which maps to Argon2**id**, the recommended variant).

The final options array differs based on the hash you're using. See the [password algorithm constants](https://secure.php.net/manual/en/password.constants.php) for documentation on the supported options for each algorithm.

## `Password::verify()`

Verifying a user’s password has been made really simple thanks to the `verify()` method. Simply pass the plaintext password supplied by the user and compare it to the stored hash, like so:

```php
if (Password::verify($password, $hashedPassword)) {
    // handle user login here
}
```

verify returns true on success and false on failure.

`$hashedPassword` in the following examples refers to the stored hashed password.

## `Password::needsRehash()`

Password hashes go stale: PHP's default algorithm changes over time, you might raise your bcrypt cost, or a hash may still use the legacy spice scheme from Leaf 4. `needsRehash()` tells you when a stored hash should be recreated. The one moment you can do that is right after a successful login, while you're holding the plain password:

```php
if (Password::verify($password, $user['password'])) {
    if (Password::needsRehash($password, $user['password'])) {
        // store a fresh hash for the user
        $newHash = Password::hash($password);
        // ... save $newHash to the database
    }

    // handle user login here
}
```

With this in place, your whole user base migrates itself to the newest hashing setup one login at a time. No reset emails, no downtime.

## argon 2

Argon2 is one encryption method heavily used by a lot of developers. Although creating and verifying passwords with argon2 is nothing difficult, Leaf makes it even simpler with methods targetting only argon.

### `argon2()`

This is a simply method used to create an Argon2 hash for your password. It takes in 2 parameters, the password to encrypt and the options for the hashing.

```php
$hash = Password::argon2($password, $options);
```

The options parameter is optional, but in case you want to set your own options, see the [password algorithm constants](https://secure.php.net/manual/en/password.constants.php) for documentation on the supported options for Argon2.

### `argon2Verify()`

This method simply checks the validity of an Argon2 hash.

```php
if (Password::argon2Verify($password, $hashedPassword)) {
    // handle user login here
}
```

## BCRYPT

BCRYPT is another hash used widely by a lot of developers, especially since support with BCRYPT has been on longer than other hashes like Argon 2. We just make hashing with BCRYPT even easier than it currently is.

### `bcrypt()`

This is a simply method used to create an BCRYPT hash for your password. It takes in 2 parameters, the password to encrypt and the options for the hashing.

```php
$hash = Password::bcrypt($password, $options);
```

The options parameter is optional, but in case you want to set your own options, see the [password algorithm constants](https://secure.php.net/manual/en/password.constants.php) for documentation on the supported options for BCRYPT.

### `bcryptVerify()`

This method simply checks the validity of an BCRYPT hash.

```php
if (Password::bcryptVerify($password, $hashedPassword)) {
    // handle user login here
}
```
