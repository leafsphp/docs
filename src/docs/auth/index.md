# Authentication

<!-- markdownlint-disable no-inline-html -->

<div class="not-prose mt-6 overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.02]">
  <div>
    <div class="border-b border-black/10 p-6 dark:border-white/10 md:p-8">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--vp-c-brand-1)]">Leaf Auth</p>
      <div class="text-2xl font-semibold tracking-[-0.03em] text-neutral-950 dark:text-neutral-50 md:text-3xl">Authentication without turning your app into a maze.</div>
      <p class="!m-0 !mt-4 max-w-2xl text-base leading-7 text-neutral-600 dark:text-neutral-400">Leaf Auth gives you login, registration, sessions, JWT, password hashing, user management, protected routes, and database-backed identity with a small API you can understand and extend.</p>
      <div class="mt-6 overflow-hidden rounded-lg border border-black/10 bg-neutral-950 dark:border-white/10">
        <div class="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div class="flex items-center gap-2">
            <span class="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]"></span>
            <span class="h-2.5 w-2.5 rounded-full bg-[#ffd166]"></span>
            <span class="h-2.5 w-2.5 rounded-full bg-[#2dd4bf]"></span>
          </div>
          <span class="font-mono text-xs text-neutral-500">install</span>
        </div>
        <div class="overflow-x-auto p-5 font-mono text-sm leading-7 text-neutral-100">
          <div><span class="text-neutral-500">$</span> leaf install auth</div>
          <div class="text-neutral-400">login, signup, sessions, JWT, middleware</div>
        </div>
      </div>
    </div>
    <div class="bg-neutral-50 p-6 dark:bg-white/[0.03] md:p-8">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">Auth covers</p>
      <div class="grid gap-3 md:grid-cols-3">
        <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">User identity</p>
          <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Register, login, logout, and access the authenticated user.</p>
        </div>
        <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">Route protection</p>
          <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Protect pages, dashboards, APIs, and role-aware workflows.</p>
        </div>
        <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">AI-friendly setup</p>
          <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Auth commands and config give assistants a clear path for secure user flows.</p>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="not-prose my-6 rounded-lg border border-black/10 bg-neutral-50 p-4 dark:border-white/10 dark:bg-white/[0.03]">
  <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">Using Leaf MVC?</p>
      <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Use the MVC auth guide when you want controllers, routes, config files, and app structure.</p>
    </div>
    <a href="/docs/auth/mvc" class="inline-flex h-9 items-center justify-center rounded-lg border border-black/10 bg-white px-3 text-sm font-semibold text-neutral-950 no-underline transition-colors hover:border-[var(--vp-c-brand-1)] dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-50">Open MVC auth</a>
  </div>
</div>

## Setting up

You can install Leaf Auth using the Leaf CLI:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install auth
```

```bash:no-line-numbers [Composer]
composer require leafs/auth
```

:::

The next step is to link your database and start signing users in.

## Connecting to a database

To do any kind of authentication, you need to connect to some kind of database which will store your users' data. If you are already using Leaf DB or Leaf MVC, then your database connection will automatically be used by Leaf Auth, so you don't need to connect to your database again.

If you are **NOT** using Leaf DB or Leaf MVC, you can connect to your database manually:

::: code-group

```php [Auth connect]
auth()->connect([
  'dbtype' => '...',
  'charset' => '...',
  'port' => '...',
  'host' => '...',
  'dbname' => '...',
  'username' => '...',
  'password' => '...'
]);
```

```php [Existing PDO instance]
$db = new PDO('mysql:dbname=test;host=127.0.0.1', 'root', '');

auth()->dbConnection($db);

// you can use leaf auth the same way you always have
```

:::

## Database Considerations

Leaf Auth doesn't give you any structure for your database, with that, you can structure your database in any way you prefer. However, there are some things you should note:

1. By default, Leaf Auth assumes that your database primary key is `id`. If you have a database where you are using another field, say `admin_id` as the primary key, you will need to tell Leaf the name of your primary key. You can do this using the `id.key` config:

    ::: code-group

    ```php:no-line-numbers [Leaf]
    auth()->config('id.key', 'admin_id');
    ```

    ```php:no-line-numbers [Leaf MVC - config/auth.php]
    'id.key' => 'admin_id'
    ```

2. Leaf Auth assumes that you will save your users in a database table named `users`, this might however not be the case for your application. If you want to use a different table, you can configure Leaf Auth using `db.table`:

    ::: code-group

    ```php:no-line-numbers [Leaf]
    auth()->config('db.table', 'admins');
    ```

    ```php:no-line-numbers [Leaf MVC - config/auth.php]
    'db.table' => 'admins'
    ```

    :::
