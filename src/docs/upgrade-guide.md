---
title: "Upgrading to Leaf 5"
next: false
prev: false
---

# Upgrading to Leaf 5

This guide covers moving an existing Leaf 4 app to Leaf 5, including Leaf MVC. Most apps upgrade with little or no code changes: Leaf 5 keeps the same core API and functional idiom, and the biggest rewrites happened under the hood. The sections below cover everything that changed, so you can skim the ones that touch your app.

Items marked <Badge type="danger" text="BREAKING" /> stop existing code from working. Items marked <Badge type="warning" text="BEHAVIOR CHANGE" /> keep working but produce different results. Everything else is a fix or an addition.

If you are coming from Leaf 3, read the [Leaf 4 notes](#coming-from-leaf-3) at the end first.

## Updating your dependencies

Leaf 5 requires **PHP 8.2 or newer**, the same floor as Laravel 11+ and Symfony 7, and the oldest PHP still receiving security fixes. Check with `php -v` before upgrading.

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

Leaf 5 compiles your routes when they are registered instead of interpreting them with regex on every request. Exact routes are matched instantly from an index, and dynamic routes are bucketed so only relevant candidates are checked. For most apps this is purely a speed upgrade with no code changes: your `{param}` routes work exactly as before.

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

Exact routes now always win over dynamic ones, regardless of registration order, so `/users/new` matches its own route even if `/users/{id}` was registered first:

```php
app()->get('/users/{id}', $userHandler);  // order no longer matters here
app()->get('/users/new', $newHandler);    // exact match still wins
```

When two *dynamic* routes overlap, the one registered first wins, so declare more specific dynamic routes before broader ones.

## Custom error handlers receive a crash report <Badge type="danger" text="BREAKING" />

Leaf 5 replaces the whoops-based error page with a new engine, [Leaf Crash](/docs/routing/error-handling). The old `Leaf\Exception\*` classes still ship and still power 404 and maintenance pages, so `app()->set404()` and `app()->setDown()` are unaffected.

What changed is `app()->setErrorHandler()`. Your callback used to be invoked with three whoops arguments; it now receives a single `Leaf\Crash\Report`:

```php
// Leaf 4
app()->setErrorHandler(function ($exception, $inspector, $run) { ... });

// Leaf 5
app()->setErrorHandler(function (\Leaf\Crash\Report $report) {
    // $report->message, ->exception, ->frames, ->breadcrumbs, ->toArray()
});
```

Handlers are also registered once per process now, so calling `app()->config(...)` later no longer silently replaces the handler you set.

::: tip Your error handler may start running
`setErrorHandler()` only fires when debug output is off. Because debug now follows `APP_ENV` (below), a production app that never reached your handler in v4 will start using it.
:::

## Debug output follows your environment <Badge type="warning" text="BEHAVIOR CHANGE" />

In Leaf 5, detailed error pages are tied to your app environment. When `APP_ENV=production`, debug output is off by default and users see a clean error page instead of a stack trace. In development you get the full debug experience with no configuration.

Prefer logging over re-enabling debug output in production. See [Application Env](/docs/config/environment) and [Error Handling](/docs/routing/error-handling) for details.

## Async support is paused while Eien is rebuilt <Badge type="danger" text="BREAKING" />

`$app->ws()`, the `eien.enabled` config key, and the automatic Eien detection inside `app()->run()` are all removed from the core. Eien is being rewritten from the ground up to cover Swoole *and* other async PHP runtimes like ReactPHP behind one contract, and it is not ready yet.

If your v4 app used Eien or `$app->ws()`, there is no drop-in v5 replacement today. Your options are to stay on Leaf 4 until the new Eien lands, or run Leaf inside your own Swoole/ReactPHP worker and handle WebSockets separately. See [Async PHP with Leaf](/docs/swoole) for what that involves and what's coming.

Related: Leaf 5 adds `Leaf\Router::reset()`, which clears all routes, hooks, middleware, and cached request state. Call it between requests if you run Leaf in a long-running process, and between tests if your suite boots the app more than once.

## Leaf UI is sunset

Leaf UI (reactive PHP components) is retired in Leaf 5. Published packages stay on Packagist so existing apps keep running, but the project is archived and receives no updates. See [Sunsetting Leaf UI](https://ui.leafphp.dev) for the reasoning and migration paths (Blade, scaffolds, Inertia + React/Vue/Svelte).

## Schema history moved into your database <Badge type="warning" text="BEHAVIOR CHANGE" />

Leaf 4 tracked schema file history as snapshots in `storage/database`. Leaf 5 tracks it in a `leaf_schema_history` table inside the database being migrated, so each environment knows what was actually applied to it rather than trusting local files.

The migration is automatic. Your first `leaf db:migrate` imports any existing `storage/database` snapshots into the new table and removes the old directory. Tables with no history at all are adopted from their current schema file instead of being recreated.

Two things to know:

- **Rollbacks no longer rewrite your schema files.** Leaf 4 swapped your `.yml` file for the older snapshot; Leaf 5 changes only the database and history, leaving your files as you wrote them. After a rollback your file is ahead of the database, so run `db:migrate` to re-apply it or edit it to match.
- **Deploys need to run migrations per environment.** This was already true in practice, but the history is now per-database, so staging and production each build their own record the first time they migrate.

See [Schema files](/docs/database/files) for the full picture.

## Environment reads are cached

`_env()` now parses your environment once and caches it for the rest of the request (this is part of why env reads are dramatically faster in v5). If your code changes environment values at runtime with `putenv()` and expects `_env()` to pick them up, that no longer happens. For that one case, use `_envUncached()` — same signature and value casting as `_env()`, but it reads the environment live on every call (and pays the full cost of doing so every time).

```php
putenv('FEATURE_FLAG=true');

_env('FEATURE_FLAG'); // null — cache was built before putenv()
_envUncached('FEATURE_FLAG'); // true
```

## Timezones in `tick()` now parse instead of convert <Badge type="danger" text="BREAKING" />

`tick('2026-01-15 12:00:00', 'Asia/Tokyo')` now means "noon *as experienced in Tokyo*" (day.js semantics) instead of "parse noon in the server timezone, then convert to Tokyo". If you relied on the old conversion behavior, move the timezone to a `tz()` call:

```php
tick($date, $timezone);       // Leaf 4: converted — Leaf 5: parses IN the timezone
tick($date)->tz($timezone);   // Leaf 5: converts, same as the old behavior
```

Single-argument `tick()` calls are unaffected. See [working with timezones](/docs/utils/date#working-with-timezones) for the new API (`tz()`, `utc()`, `utcOffset()`).

## Password spice is now a real pepper <Badge type="warning" text="BEHAVIOR CHANGE" />

`Password::spice()` now keys passwords through HMAC-SHA256 instead of concatenating the spice as text. New hashes use the stronger scheme automatically; hashes created on Leaf 4 still verify through a fallback, and [`Password::needsRehash()`](/docs/data/encryption#password-needsrehash) migrates them forward on login. `Password::ARGON2` now maps to Argon2id (was Argon2i), and the broken `Password::MD5` constant is removed.

## Requests and responses

Most of the work in `leafs/http` fixed things that were quietly wrong. Two are worth checking your code against:

- **Bodies sent without a `Content-Type` header are now parsed as JSON.** In v4 they fell through to a raw one-element array. Clients that post untyped bodies will start receiving parsed, sanitized data.
- **`Headers::set()` no longer forces a 200 status.** Its fourth argument defaults to `null` instead of `200`, so setting a header no longer resets the response code. If you leaned on that side effect, set the status explicitly. Note `response()->withHeader()` still sets a status (200 by default), so `response()->status(404)->withHeader(...)` remains a 200.

::: details Bugs fixed in requests and responses
None of these need changes on your side, but behavior differs from v4:

- `request()->params()` with no key returns the whole body instead of fatally erroring
- Content-type matching handles `; charset=utf-8` and mixed case
- Form-encoded bodies are parsed with `parse_str()`, so valueless flags, values containing `=`, and nested `a[b]=1` all work
- `getContentLength()` returns the real length (was always 0), `getPort()` falls back to 80 (was 0)
- `getFullUrl()` no longer repeats the query string
- `getIp()` returns the first entry of a forwarded list rather than the whole list
- `Headers::has()` and `hasHeader()` check header *names*; in v4 they compared against values
- `response()->download()` without a name emits a valid filename, streams in chunks instead of loading the file into memory, and returns early for missing files
- `response()->status(null)` is a no-op instead of nulling the status
- `withFlash([...])` no longer makes a junk extra flash call
:::

New, non-breaking: `request()->object()` returns the body as objects, `response()->view()`/`render()` take a status code, and downloads support HTTP Range requests for resumable and parallel downloads.

## Database

- **`db()->config('key', $falsyValue)` now sets instead of gets.** v4 gated on `!$value`, so `config('password', '')` or `config('port', 0)` silently returned the current value and stored nothing.
- **Transactions work on every PDO driver.** v4 issued MySQL-only `START TRANSACTION` text, so `transaction()` on SQLite, Postgres, or SQL Server failed before your callback ever ran.
- **`unique()` and eager loading run as prepared statements.** Alongside the safety win, values containing quotes and string or UUID foreign keys now work where v4 produced syntax errors.
- Transaction failures land in `errors()['transaction']` as a string. v4 assigned the exception object to a property that `errors()` never read.
- `beginTransaction()` no longer clears a half-built query, and `debug()` reports connections under `connections`.

## Validation

`leafs/form` changed in ways that can flip a validation result:

- **Falsy values are values.** `false`, `0`, and `'0'` no longer fail as "required"; only `null`, `''`, and `[]` count as missing. In v4 a `boolean` rule could never validate a false value.
- **`email`, `url`, `ip`, `ipv4`, `ipv6` and `json` are real validators now**, not regexes. Addresses with modern TLDs (`.photography`, `.info`) start passing, and values like `999.999.999.999` or malformed JSON start failing.
- **Rule parameters keep their case.** `contains<Foo>` matches `Foo`; v4 lowercased it. Rule *names* are still case-insensitive.
- `matchesvalueof<field>` compares against the data being validated rather than the global request, which only changes results for `form()->validate($yourArray, ...)`.
- `form()->submit()` is deprecated and will be removed next major.

New: custom rule callables receive the full data set as a fourth argument (so cross-field rules are possible), and messages can target one field with `addMessage('password.min', ...)`.

## Security and sessions

- **CSRF tokens use a new format.** Tokens minted before the upgrade won't validate on Leaf 5, so a session holding one needs a single page refresh. There's nothing to configure.
- **CSRF now requires a real secret.** <Badge type="danger" text="BREAKING" /> Leaf 5 resolves the CSRF secret in order: a `secret` passed to `csrf()`, then `X_CSRF_SECRET` from your `.env`, then a secret derived automatically from your `APP_KEY`. If none of the three exist, the app throws at startup instead of running CSRF protection without one. Most apps need to do nothing — any project with an `APP_KEY` is covered. If you hit the error, run `php leaf key:generate` or set `X_CSRF_SECRET` in your `.env`. The derived secret is mixed with a fixed context string, so it is never your raw app key, and changing your `APP_KEY` invalidates in-flight CSRF tokens (a page refresh mints new ones).
- **CORS origins are matched exactly, or by regex.** An origin you allow must be written in full, scheme included, and it matches that origin only. For a family of subdomains, pass a regex string instead:

  ```php
  app()->cors(['origin' => 'https://example.com']);
  app()->cors(['origin' => '/^https:\/\/(.*\.)?example\.com$/']);
  ```

  Review your `origin` config while upgrading and make sure each entry is a full origin or a regex.
- **Flash data is no longer HTML-escaped on the way out.** v4 re-sanitized the flash store on every write and escaped again on read, so flashed form input came back as `Tom &amp; Jerry`. If you compensated with `html_entity_decode()`, remove it.
- **Cookie deletion uses your configured path and domain.** `unset()` and `delete()` now send the same scope the cookie was set with, so set your defaults once with `Cookie::setDefaults(['path' => '/'])` and both writing and clearing stay consistent.
- Dot notation works at any depth. v4 truncated `a.b.c` to two levels and warned that nested config could not go deeper.

New: CSRF gains opt-in single-use tokens (`rotate`), `regenerate()`, an automatic `XSRF-TOKEN` cookie plus `X-XSRF-TOKEN` header so SPA clients need no manual plumbing, and a per-app secret derived from your `APP_KEY` with zero configuration.

## Other modules

::: details Mail, cache, storage, localisation, sitemap
**Mail.** The mailer resets between sends, so recipients, attachments and reply-tos no longer accumulate. In a queue worker, v4 delivered each mail to every previous recipient as well. `cc`/`bcc` accept arrays, `replyTo` works from the mail or from your `connect()` defaults, and sending without `connect()` throws a clear exception instead of a null fatal.

**Cache.** The configured default store is honored; v4 built a file store directly and ignored the rest of your config. Outside Leaf MVC the default path is `storage/framework/cache` under your working directory rather than `/cache` at the filesystem root. Only closures are evaluated lazily, so `cache('key', 600, 'strtolower')` caches the string instead of running the function.

**S3 storage.** The `visibility` option you pass is what gets applied, so private uploads stay private. Worth re-checking the visibility on anything you uploaded through Leaf 4 while you upgrade. `createFile('docs/note.txt')` now writes to that exact path instead of creating a directory named after the file, and URL generation uses the connection's `endpoint`, which fixes URLs for R2, Minio and Spaces. Bucket paths from `withBucket()` also work with `read()`, `write()`, `exists()`, `delete()`, `size()`, `lastModified()` and `mimeType()` now, where Leaf 4 only supported creating and uploading.

**Lingo.** The session strategy remembers the chosen locale (v4 reset it to the default on every request), the header strategy parses `Accept-Language` properly instead of comparing the raw header to filenames, and the router strategy validates the first URL segment against your locales so `/about` is no longer read as a locale. Custom strategies and nested YAML files are new.

**Sitemap.** `lastmod` only appears when you provide one, instead of stamping every URL with the generation time, and dynamic routes are left out unless you map them to real URLs.
:::

## Frontend packages

`leafs/blade`, `leafs/inertia` and `leafs/vite` now require PHP 8.2 and Illuminate `^11|^12|^13`. An app pinned to Laravel 8 or 10 components cannot install them. Blade and Vite have no behavior changes of their own.

Inertia changed more:

- Asset-version mismatches return 409 with `X-Inertia-Location`, so stale clients reload. Apps that never set a version can see forced reloads when the computed version changes.
- Page props now win over shared props of the same name. v4 merged the other way around.
- `setOmittedProps()` works properly now, which means props you believed were shared may genuinely disappear.
- `Inertia::share()` only resolves closures, so sharing `'time'` or `[$obj, 'method']` passes the value through unresolved.
- SSR needs both `head` and `body` in the response, and no longer depends on `leafs/fetch`.

New: `optional()`, `defer()`, `always()`, `merge()`, `deepMerge()`, `encryptHistory()`, `clearHistory()`, and `location()`. `Inertia::lazy()` still works but is deprecated.

If you use `@leafphp/vite-plugin`, it is now ESM-only and needs Vite 5+ and Node 18+.

## Leaf MVC

Leaf MVC 5 keeps the same app structure: `app/`, the `leaf` console file, `public/index.php`, `AppPaths()`, `MvcConfig()`, `StoragePath()`, and every published config file are unchanged. Upgrading is mostly bumping versions.

- Update `leafs/mvc-core`, `leafs/leaf`, `leafs/blade`, `leafs/logger` and `leafs/schema` together. The schema jump is the large one, from the `0.1.x` line.
- **`leaf serve` no longer needs Node.** It runs Vite, Redis and the queue worker as child processes with prefixed output instead of shelling out to `npx concurrently`, and it watches `.env` itself. Vite only starts when a `package.json` exists, and `--clean` now skips Redis and the queue worker too.
- `lib/` is autoloaded in console commands as well as web requests, and the console boots without a view engine installed, which matters for API-only apps.
- `route()` accepts named parameter arrays properly. v4 tried a `str_replace` with an array and produced an array-to-string error.
- `scaffold:shadcn` now fails with a clear message outside React apps, and `scaffold:auth` / `scaffold:mail` fail loudly when a composer install fails rather than continuing silently.

If you use `leafs/auth` subscriptions, four behavior changes matter:

- `subscription()` returns the newest subscription rather than the oldest, so a resubscribed user no longer sees their cancelled row.
- `hasActiveSubscription()` returns true during the cancellation grace period, so access gating that assumed "cancelled means no access" changes meaning.
- `cancelSubscription()` cancels at period end by default. Pass `false` for the old immediate behavior.
- Custom `BillingProvider` implementations must add `resumeSubscription()` and accept the new `$atPeriodEnd` argument on `cancelSubscription()`.

[Roles and permissions](/docs/auth/permissions) are out of beta. One behavior change: `$user->assign()` returns `false` and raises an error when given a role that was never registered with `createRoles()`, where it previously returned `true` without granting anything.

## Console commands and tooling

**Aloe is gone.** Sprout replaces it, and Symfony Console is no longer in the stack, so custom commands need rewriting:

```php
// Leaf 4 (Aloe)
use Aloe\Command;

class GreetCommand extends Command
{
    protected static $defaultName = 'greet';

    protected function config()
    {
        $this->setArgument('name', 'required');
    }
}

// Leaf 5 (Sprout)
use Leaf\Sprout\Command;

class GreetCommand extends Command
{
    protected $signature = 'greet {name} {--loud}';

    protected function handle(): int
    {
        $this->writeln("Hello {$this->argument('name')}");

        return 0;
    }
}
```

`handle()` must return an int. The Aloe I/O helpers (`ask()`, `choice()`, `confirm()`, `secret()`, `table()` and friends) are replaced by `sprout()->prompt([...])` and `sprout()->confirm()`, and only the `error`, `info`, `comment`, `question`, `b`, `u`, `i` and `reset` style tags are supported, so `<fg=green>` prints literally.

**Alchemy uses verbs instead of flags**, and `lint` changed meaning:

| Leaf 4 | Leaf 5 |
| :-- | :-- |
| `alchemy setup --test` | `alchemy test` |
| `alchemy setup --lint` (rewrote files) | `alchemy lint` (checks, fails on violations) or `alchemy fmt` (rewrites) |
| `alchemy setup --actions` | `alchemy ci` |

The old flags still work, and `alchemy setup` prints a deprecation notice. Generated config now lives in `.alchemy/` instead of your project root, and CI workflow files carrying alchemy's generated header are refreshed rather than skipped. Run `alchemy init` to regenerate your composer scripts.

**Exit codes are real now** across the CLI and alchemy. Several v4 commands returned `(int) $bool`, which meant 1 on success and 0 on failure, so pipelines that looked green may legitimately start failing.

CLI changes worth knowing: `leaf create --basic` is now `--lite` (the old flag still works), `leaf view:install --tailwind|--vite|--vue` were broken in v4 MVC apps and now install what you asked for, and `leaf deploy` actually deploys rather than only writing config files.

## New in Leaf 5

Not required for upgrading, but worth adopting once you're on v5:

- **[AI-ready projects](/docs/ai)**: `.leaf/CONTEXT.md` gives agents shared project memory, and `leaf context` prints a handoff for external assistants.
- **[`leaf up`](/docs/cli/)**: scale a lite app into a full Leaf MVC structure when your product needs it.
- **[Multiple database connections](/docs/database/)**: `db()->addConnections([...])` and `db('analytics')->select(...)`.
- **[Scaffolds](/docs/mvc/scaffolds)**: auth, landing pages, subscriptions, waitlists, AI chat, blogs, contact forms and legal pages as editable starting points, each with Blade, React, Vue and Svelte variants.
- **[Real faker support in seeds](/docs/database/files#seeding-your-database)**: schema file seeds now take full faker expressions (`'@faker.unique.safeEmail'`, `'@faker.numberBetween(1, 5)'`) instead of the handful of primitive tokens v4 understood. The old tokens still work.
- **[Console apps with Seedling](/docs/seedling/)**: the Leaf MVC experience for CLI applications.
- **[Named route groups](/docs/routing/route-groups#named-groups)**: group names cascade (`admin.users.index`), and resource routes name themselves.
- **Group middleware runs on dynamic routes**: a long-standing bug where middleware (including `auth.required`) was silently skipped for `/{id}`-style routes inside groups whenever a global middleware existed is fixed. If routes suddenly enforce auth they previously skipped, that's the fix working.
- **Smarter base path detection**: subfolder detection only strips URL prefixes when requests actually live under your script's folder, so `php -S` and CLI runs no longer 404 or lose URI segments.

## Coming from Leaf 3

If you are jumping from Leaf 3 straight to Leaf 5, the changes above still apply, plus the Leaf 4-era changes you skipped:

- Functional mode (`app()`, `request()`, `response()`, `auth()`, `db()`) is the default idiom throughout the docs.
- Sessions are opt-in in the core; enable them when you need them.
- Session guards were deprecated in Leaf 4 (and removed in v5), so move to auth middleware as shown above.
- The Leaf MVC console and directory structure were streamlined; if you have a Leaf 3 MVC app, the smoothest path is creating a fresh Leaf 5 MVC app and moving your controllers, models, and views over.

If you hit something this guide doesn't cover, [open an issue](https://github.com/leafsphp/leaf/issues). We're actively filling in migration gaps.
