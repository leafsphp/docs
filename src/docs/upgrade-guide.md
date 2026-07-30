---
title: "Upgrading to Leaf 5"
next: false
prev: false
---

# Upgrading to Leaf 5

This guide covers moving an existing Leaf 4 app to Leaf 5. Most apps will upgrade with little or no code changes — Leaf 5 keeps the same core API and functional idiom, and the biggest changes happen under the hood in the routing engine. If you are coming from Leaf 3, read the [Leaf 4 notes](#coming-from-leaf-3) at the end first.

## Updating your dependencies

Leaf 5 requires **PHP 8.2 or newer** — the same floor as Laravel 11+ and Symfony 7, and the oldest PHP still receiving security fixes. Check with `php -v` before upgrading.

Then update your Leaf packages to their v5 versions:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install leaf@5.0
```

```bash:no-line-numbers [Composer]
composer require leafs/leaf:^5.0
```

:::

If you are using Leaf MVC, update `leafs/mvc-core` and your other Leaf modules to their v5-compatible versions as well.

## The new routing engine

Leaf 5 compiles your routes when they are registered instead of interpreting them with regex on every request. Exact routes are matched instantly from an index, and dynamic routes are bucketed so only relevant candidates are checked. For most apps this is purely a speed upgrade with no code changes — your `{param}` routes work exactly as before.

It also unlocks two new pattern features:

```php
// optional parameters
app()->get('/posts/{id?}', function ($id = null) { ... });

// inline constraints
app()->get('/users/{id:[0-9]+}', function ($id) { ... });
```

### Raw regex routes are no longer supported <Badge type="danger" text="BREAKING" />

Routes written as raw regular expressions no longer match, because patterns without `{}` placeholders are now treated as literal paths:

```php
// ❌ no longer works in Leaf 5
app()->get('/posts(/edit)?', $handler);
app()->get('/(\d+)', $handler);

// ✅ use named patterns instead
app()->get('/posts/{action?}', $handler);
app()->get('/{id:[0-9]+}', $handler);
```

If any of your routes contain regex syntax like `(...)`, `\d`, or `?` outside of a `{...}` placeholder, rewrite them using named parameters, optional parameters, or inline constraints.

### Route matching order

Exact routes now always win over dynamic ones, regardless of registration order — so `/users/new` matches its own route even if `/users/{id}` was registered first:

```php
app()->get('/users/{id}', $userHandler);  // order no longer matters here
app()->get('/users/new', $newHandler);    // exact match still wins
```

When two *dynamic* routes overlap, the one registered first wins — declare more specific dynamic routes before broader ones.

## Debug output follows your environment <Badge type="warning" text="BEHAVIOR CHANGE" />

In Leaf 5, detailed error pages are tied to your app environment. When `APP_ENV=production`, debug output is off by default and users see a clean error page instead of a stack trace. In development you get the full debug experience with no configuration.

Prefer logging over re-enabling debug output in production. See [Application Env](/docs/config/environment) and [Error Handling](/docs/routing/error-handling) for details.

## Swoole integration is now standalone

`$app->ws()` and the built-in Eien integration have been removed from the core. Long-running server setups are now handled outside the core — see [Using Swoole](/docs/swoole) for the current state of Swoole support.

Related: Leaf 5 adds `Leaf\Router::reset()`, which clears all router state. If you run Leaf inside a long-running worker or your test suite boots the app multiple times, call it between requests/tests.

## Environment reads are cached

`_env()` now parses your environment once and caches it for the rest of the request (this is part of why env reads are dramatically faster in v5). If your code changes environment values at runtime with `putenv()` and expects `_env()` to pick them up, that no longer happens — read runtime values with `getenv()` directly instead.

## New in Leaf 5

Not required for upgrading, but worth adopting once you're on v5:

- **[AI-ready projects](/docs/ai)** — `.leaf/CONTEXT.md` gives agents shared project memory, and `leaf context` prints a handoff for external assistants.
- **[`leaf up`](/docs/cli/)** — scale a lite app into a full Leaf MVC structure when your product needs it.
- **[Multiple database connections](/docs/database/)** — `db()->addConnections([...])` and `db('analytics')->select(...)`.
- **[Scaffolds](/docs/mvc/scaffolds)** — auth, landing pages, subscriptions, and waitlists as editable starting points.
- **[Console apps with Seedling](/docs/seedling/)** — the Leaf MVC experience for CLI applications.
- **[Named route groups](/docs/routing/route-groups#named-groups)** — group names cascade (`admin.users.index`), and resource routes name themselves.
- **Group middleware runs on dynamic routes** — a long-standing bug where middleware (including `auth.required`) was silently skipped for `/{id}`-style routes inside groups whenever a global middleware existed is fixed. If routes suddenly enforce auth they previously skipped, that's the fix working.
- **Smarter base path detection** — subfolder detection only strips URL prefixes when requests actually live under your script's folder, so `php -S` and CLI runs no longer 404 or lose URI segments.

## Coming from Leaf 3

If you are jumping from Leaf 3 straight to Leaf 5, the changes above still apply, plus the Leaf 4-era changes you skipped:

- Functional mode (`app()`, `request()`, `response()`, `auth()`, `db()`) is the default idiom throughout the docs.
- Sessions are opt-in in the core — enable them when you need them.
- Session guards were deprecated in Leaf 4 (and removed in v5) — move to auth middleware as shown above.
- The Leaf MVC console and directory structure were streamlined; if you have a Leaf 3 MVC app, the smoothest path is creating a fresh Leaf 5 MVC app and moving your controllers, models, and views over.

If you hit something this guide doesn't cover, [open an issue](https://github.com/leafsphp/leaf/issues) — we're actively filling in migration gaps.
