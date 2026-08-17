# Lite Apps — The Setup Contract

Leaf modules are configured automatically in MVC apps: mvc-core knows where views, storage, and the database live, so it wires every module at boot. A lite app has no imposed structure, so there is nowhere for Leaf to safely assume paths — **you write that wiring yourself, once, at the top of `index.php`**. This is by design, not a gap. This file is the complete contract: what MVC would have configured for you, in copy-paste form.

A lite app that uses the database, views, and Vite starts like this:

```php
<?php

require __DIR__ . '/vendor/autoload.php';

db()->connect([
    'dbtype' => 'sqlite',
    'dbname' => __DIR__ . '/db.sqlite',
]);

// Lite views live in `views/`, not the MVC default of `app/views/`.
// Without `views.cache`, compiled blade files land in the project root.
app()->config('views.path', 'views');
app()->config('views.cache', __DIR__ . '/storage/cache');

// ... routes ...

app()->run();
```

Newly scaffolded apps (cli 5.0.6+) get the views config written into `index.php` by `leaf view:install`. Everything below is per-module detail.

## Database

`db()->connect([...])` once, before any query. Every module that needs the database (auth, session-on-db, etc.) picks up this connection automatically — connect is the only wiring auth needs in a lite app.

## Auth

Session-only auth needs no signing secret (auth 5.1.2+) — tokens are only minted if you read them, and reading them without a secret tells you exactly what to set. Remember that lite apps do NOT load `.env` files (no dotenv loader ships), so `AUTH_TOKEN_SECRET=...` in a file does nothing: export it in the real environment or set `token.secret` in config. Point the middleware redirects at routes you actually have: `auth()->config(['redirect.login' => '/login', 'redirect.guest' => '/'])` — the defaults are MVC scaffold paths. And validate registration input yourself with `request()->validate()` before calling `auth()->register()`; auth only checks credentials and uniqueness.

## Views (Blade / BareUI / Inertia)

`views.path` tells every engine where templates live; `views.cache` is where compiled blade goes (inertia 5.0.1+ defaults it to `storage/cache` and creates it, but setting it explicitly keeps the path intentional). Inertia's root shell is `views/_inertia.blade.php`, written by `leaf view:install`.

## Vite

leafs/vite 5.0.1+ defaults match a root-served lite app: the `hot` file and `build/` directory in the project root, assets served from `/build`. If your layout differs (or you are on 5.0), configure it explicitly:

```php
\Leaf\Vite::config([
    'hotFile' => __DIR__ . '/hot',  // written by the dev server when running
    'build' => 'build',             // filesystem path, relative to cwd — never absolute
    'assets' => '/build',           // the URL prefix browsers request
]);
```

## Schema files (recommended over raw DDL)

`leaf install schema` works in lite apps — it brings its own database layer. Wire it with an Illuminate connection and you get the same YAML schema files MVC uses, instead of hand-writing `CREATE TABLE`:

```php
$capsule = new \Illuminate\Database\Capsule\Manager();
$capsule->addConnection(['driver' => 'sqlite', 'database' => __DIR__ . '/db.sqlite']);
$capsule->setAsGlobal();
$capsule->bootEloquent();

\Leaf\Schema::setDbConnection($capsule);
\Leaf\Schema::migrate(__DIR__ . '/database/users.yml');   // one call per schema file
```

Run that from a small `migrate.php` script (or a guarded route in dev). Schema file format, column types, and seeds are documented in `mvc.md` — the format is identical in lite apps.

## What stays MVC-only

`g:*`, `scaffold:*`, and `db:*` console commands need the MVC console and do not exist in lite apps (`leaf up` migrates you to MVC when you want them). Everything else — auth, session, cookies, mail, cors, cache, date, fs — works in lite apps with no wiring beyond the database connection above.
