# Auth Config

We understand that every application is different and may require a different level of control over the authentication system. Whether you want to use tokens, sessions, or your own custom setup, you can configure it without any hassle.

Leaf Auth is flexible enough to adapt to whatever system works best for you.

If you are using Leaf MVC, we have already created a config file available at `config/auth.php`. You can follow this documentation to update your config file.

## Specifying the table to use

Leaf assumes that you will save your users in a table named `users`. If you want to use a different table, you can configure Leaf Auth using `db.table`:

```php:no-line-numbers
auth()->config('db.table', 'admins');
```

## Specifying the primary key

Most databases use `id` as the primary key. If you are using a different field as the primary key, you can configure Leaf Auth using `id.key`:

```php:no-line-numbers
auth()->config('id.key', 'admin_id');
```

If you are using UUIDs as your primary key, you can configure Leaf Auth to use them:

```php:no-line-numbers
auth()->config('id.uuid', UUID::v4());
```

## Using timestamps

Leaf will always try to set the `created_at` and `updated_at` fields in your database. If you want to turn this off, you can set `timestamps` to `false`:

```php:no-line-numbers
auth()->config('timestamps', false);
```

Different databases have different ways of handling timestamps. If you get an error concerning the format of the timestamp, you can configure Leaf Auth to use a different format:

```php:no-line-numbers
auth()->config('timestamps.format', 'YYYY-MM-DD HH:MM:SS');
```

You can find the date format documentation [here](/docs/utils/date#formatting-dates).

## Create session on registration

Leaf will require a user to manually login after registration. If you want to automatically log in a user after registration, you can configure Leaf Auth to do that:

```php:no-line-numbers
auth()->config('session.register', true);
```

You can also set the redirect URL after registration:

```php:no-line-numbers
auth()->config('session.registerRedirect', '/dashboard');
```

## Auth with tokens

This is the default way Leaf handles authentication. There are a few things you can configure to make your token authentication more secure like the token lifetime:

```php:no-line-numbers
auth()->config('token.lifetime', 3600); // 1 hour
```

You can also set the secret key for your tokens:

```php:no-line-numbers
auth()->config('token.secret', 'your-secret-key');
```
