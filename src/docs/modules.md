# Modules

<!-- markdownlint-disable no-inline-html -->

<div class="not-prose mt-6 overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.02]">
  <div class="grid 2xl:grid-cols-[1fr_320px]">
    <div class="border-b border-black/10 p-6 dark:border-white/10 md:p-8 2xl:border-b-0 2xl:border-r">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--vp-c-brand-1)]">Composable PHP</p>
      <div class="text-2xl font-semibold tracking-[-0.03em] text-neutral-950 dark:text-neutral-50 md:text-3xl">Add the parts your app needs, exactly when it needs them.</div>
      <p class="!m-0 !mt-4 max-w-2xl text-base leading-7 text-neutral-600 dark:text-neutral-400">Modules are independent pieces of Leaf functionality. They stay small, framework-agnostic, easy to install, and ready to use in Leaf apps, Leaf MVC projects, or even plain PHP projects.</p>
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
          <div><span class="text-neutral-500">$</span> leaf install auth db mail</div>
          <div><span class="text-neutral-500">$</span> leaf install cors cache queue</div>
          <div class="text-neutral-400">modules wire into the Leaf ecosystem</div>
        </div>
      </div>
    </div>
    <div class="bg-neutral-50 p-6 dark:bg-white/[0.03] md:p-8">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">Why modules</p>
      <div class="space-y-4 md:space-y-0 grid md:grid-cols-3 2xl:grid-cols-1 gap-3">
        <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">Start small</p>
          <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Use the core framework first, then add capabilities as your product grows.</p>
        </div>
        <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">Stay explicit</p>
          <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Installed modules make your app's capabilities obvious to people and AI tools.</p>
        </div>
        <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">Avoid lock-in</p>
          <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Most modules are regular Composer packages that fit normal PHP workflows.</p>
        </div>
      </div>
    </div>
  </div>
</div>

## Installing Modules

Modules are Composer packages, so you can install them with Composer:

```bash:no-line-numbers
composer require leafs/<module>
```

If you're using Leaf CLI, you can install official Leaf modules without the `leafs/` prefix:

```bash:no-line-numbers
leaf install <module>
```

You can also install multiple modules at once:

```bash:no-line-numbers
leaf install auth db mail
```

<div class="docs-paths docs-paths--two not-prose my-6">
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">01 / Leaf workflow</span>
    <strong class="docs-path-title">Leaf CLI</strong>
    <span class="docs-path-description">Best for Leaf projects. Short names work for first-party modules, and the command keeps the workflow consistent.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">02 / PHP workflow</span>
    <strong class="docs-path-title">Composer</strong>
    <span class="docs-path-description">Best when you want the raw PHP package manager flow or are installing modules outside a Leaf app.</span>
  </div>
</div>

## Using Modules

Most modules integrate directly into Leaf's functional style, so you can use focused helpers without building your own wiring layer.

```php:no-line-numbers
auth()->login($credentials);
db()->select('users')->where('id', 1)->first();
response()->json(['ok' => true]);
```

In Leaf MVC, modules can also work through config files, controllers, models, services, and other structured app pieces.

## Common Module Groups

<div class="docs-paths docs-paths--four not-prose my-6">
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">01 / Foundation</span>
    <strong class="docs-path-title">Product basics</strong>
    <span class="docs-path-description">Auth, sessions, cookies, validation, CSRF, CORS, request, and response helpers.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">02 / Storage</span>
    <strong class="docs-path-title">Data and state</strong>
    <span class="docs-path-description">Database, Redis, cache, queues, files, sitemaps, and storage integrations.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">03 / Interface</span>
    <strong class="docs-path-title">Frontend and views</strong>
    <span class="docs-path-description">Blade, BareUI, Inertia, Vite, frontend asset builds, and view rendering.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">04 / Operations</span>
    <strong class="docs-path-title">Production features</strong>
    <span class="docs-path-description">Mail, billing, testing, logging, devtools, encryption, and deployment helpers.</span>
  </div>
</div>

## Modules and AI Context <StatusBadge label="New" title="Installed modules stay visible to agents" description="Leaf keeps module capabilities in shared project context and can produce a compact handoff for external assistants." meta="Introduced in Leaf 5" />

Modules make your app easier for assistants to understand because installed packages and their configuration are recorded in `.leaf/context.md`. Agents inside the project read that shared memory alongside the filesystem and keep it aligned as the app changes.

If you are sharing the app with an external assistant that cannot access the folder, generate a compact handoff after adding modules:

```bash:no-line-numbers
leaf context
```

The command prints a minified view of the shared context, including installed modules, app structure, routes, and conventions. Paste that output into the external assistant so it can use what your app already has instead of inventing new patterns.

## List of Modules

*We update this list regularly. If you have a module you'd like to see here, feel free to [open an issue](https://github.com/leafsphp/docs/issues/new) or create a pull request on our documentation repository. Community-created modules are welcome too.*

| Project                | Status                                                                                                                                                                                                                                                         | Description                                                       |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| [alchemy](/docs/utils/testing)                | [![Latest Stable Version](https://poser.pugx.org/leafs/alchemy/v/stable)](https://packagist.org/packages/leafs/alchemy) [![Total Downloads](https://poser.pugx.org/leafs/alchemy/downloads)](https://packagist.org/packages/leafs/alchemy)                             | Setup testing/linting for your PHP apps                                                      |
| [aloe](/docs/mvc/console)     | [![Latest Stable Version](https://poser.pugx.org/leafs/aloe/v/stable)](https://packagist.org/packages/leafs/aloe) [![Total Downloads](https://poser.pugx.org/leafs/aloe/downloads)](https://packagist.org/packages/leafs/aloe) | Smart console helper for Leaf MVC |
| [anchor](/docs/security/anchor)               | [![Latest Stable Version](https://poser.pugx.org/leafs/anchor/v/stable)](https://packagist.org/packages/leafs/anchor) [![Total Downloads](https://poser.pugx.org/leafs/anchor/downloads)](https://packagist.org/packages/leafs/anchor)                         | Built-in protection for your Leaf apps                                              |
| [auth](/docs/auth/)                 | [![Latest Stable Version](https://poser.pugx.org/leafs/auth/v/stable)](https://packagist.org/packages/leafs/auth) [![Total Downloads](https://poser.pugx.org/leafs/auth/downloads)](https://packagist.org/packages/leafs/auth)                                 | Simple but powerful authentication system for your apps           |
| [bareui](/docs/frontend/bareui)               | [![Latest Stable Version](https://poser.pugx.org/leafs/bareui/v/stable)](https://packagist.org/packages/leafs/bareui) [![Total Downloads](https://poser.pugx.org/leafs/bareui/downloads)](https://packagist.org/packages/leafs/bareui)                         | Dead simple templating engine with no compilation |
| [blade](/docs/frontend/blade)                | [![Latest Stable Version](https://poser.pugx.org/leafs/blade/v/stable)](https://packagist.org/packages/leafs/blade) [![Total Downloads](https://poser.pugx.org/leafs/blade/downloads)](https://packagist.org/packages/leafs/blade)                             | Laravel blade port for leaf                            |
| [cache](/docs/utils/cache)               | [![Latest Stable Version](https://poser.pugx.org/leafs/cache/v/stable)](https://packagist.org/packages/leafs/cache) [![Total Downloads](https://poser.pugx.org/leafs/cache/downloads)](https://packagist.org/packages/leafs/cache)                         | Cache results of expensive operations                               |
| [cookie](/docs/http/cookies)               | [![Latest Stable Version](https://poser.pugx.org/leafs/cookie/v/stable)](https://packagist.org/packages/leafs/cookie) [![Total Downloads](https://poser.pugx.org/leafs/cookie/downloads)](https://packagist.org/packages/leafs/cookie)                         | Cookie management for your PHP apps                               |
| [cors](/docs/http/cors)                 | [![Latest Stable Version](https://poser.pugx.org/leafs/cors/v/stable)](https://packagist.org/packages/leafs/cors) [![Total Downloads](https://poser.pugx.org/leafs/cors/downloads)](https://packagist.org/packages/leafs/cors)                                 | CORS operations made simple          |
| [csrf](/docs/security/csrf)               | [![Latest Stable Version](https://poser.pugx.org/leafs/csrf/v/stable)](https://packagist.org/packages/leafs/csrf) [![Total Downloads](https://poser.pugx.org/leafs/csrf/downloads)](https://packagist.org/packages/leafs/csrf)                         | CSRF protection for your Leaf apps                                   |
| [date](/docs/utils/date)                 | [![Latest Stable Version](https://poser.pugx.org/leafs/date/v/stable)](https://packagist.org/packages/leafs/date) [![Total Downloads](https://poser.pugx.org/leafs/date/downloads)](https://packagist.org/packages/leafs/date)                         | Dead simple PHP dates                         |
| [db](/docs/database/)                   | [![Latest Stable Version](https://poser.pugx.org/leafs/db/v/stable)](https://packagist.org/packages/leafs/db) [![Total Downloads](https://poser.pugx.org/leafs/db/downloads)](https://packagist.org/packages/leafs/db)                                         | Lightweight query builder for your PHP apps            |
| [devtools](/docs/routing/error-handling)               | [![Latest Stable Version](https://poser.pugx.org/leafs/devtools/v/stable)](https://packagist.org/packages/leafs/devtools) [![Total Downloads](https://poser.pugx.org/leafs/devtools/downloads)](https://packagist.org/packages/leafs/devtools)                         | Developer tools for Leaf PHP                                |
| [eien](/docs/swoole)                 | [![Latest Stable Version](https://poser.pugx.org/leafs/eien/v/stable)](https://packagist.org/packages/leafs/eien) [![Total Downloads](https://poser.pugx.org/leafs/eien/downloads)](https://packagist.org/packages/leafs/eien)    | High-speed, high-performance server for leaf                           |
| [exception](https://github.com/leafsphp/exceptions)                 | [![Latest Stable Version](https://poser.pugx.org/leafs/exception/v/stable)](https://packagist.org/packages/leafs/exception) [![Total Downloads](https://poser.pugx.org/leafs/exception/downloads)](https://packagist.org/packages/leafs/exception)    | Leaf's exception wrapper (fork of whoops)                           |
| [fetch](/docs/utils/fetch)                | [![Latest Stable Version](https://poser.pugx.org/leafs/fetch/v/stable)](https://packagist.org/packages/leafs/fetch) [![Total Downloads](https://poser.pugx.org/leafs/fetch/downloads)](https://packagist.org/packages/leafs/fetch)                             | HTTP requests made simple                                         |
| [form](/docs/data/validation)                 | [![Latest Stable Version](https://poser.pugx.org/leafs/form/v/stable)](https://packagist.org/packages/leafs/form) [![Total Downloads](https://poser.pugx.org/leafs/form/downloads)](https://packagist.org/packages/leafs/form)                                 | Form processes and validation                                     |
| [fs](/docs/utils/fs)                   | [![Latest Stable Version](https://poser.pugx.org/leafs/fs/v/stable)](https://packagist.org/packages/leafs/fs) [![Total Downloads](https://poser.pugx.org/leafs/fs/downloads)](https://packagist.org/packages/leafs/fs)                                         | Awesome filesystem operations + file uploads                      |
| [http](/docs/http/request)                 | [![Latest Stable Version](https://poser.pugx.org/leafs/http/v/stable)](https://packagist.org/packages/leafs/http) [![Total Downloads](https://poser.pugx.org/leafs/http/downloads)](https://packagist.org/packages/leafs/http)                                 | Http operations made simple (request, response, ...)              |
| [inertia](/docs/frontend/inertia)                 | [![Latest Stable Version](https://poser.pugx.org/leafs/inertia/v/stable)](https://packagist.org/packages/leafs/inertia) [![Total Downloads](https://poser.pugx.org/leafs/inertia/downloads)](https://packagist.org/packages/leafs/inertia)                                 | Leaf adapter for inertia JS              |
| [lingo](/docs/utils/lingo)                   | [![Latest Stable Version](https://poser.pugx.org/leafs/lingo/v/stable)](https://packagist.org/packages/leafs/lingo) [![Total Downloads](https://poser.pugx.org/leafs/lingo/downloads)](https://packagist.org/packages/leafs/lingo)                                         | leaf logger module                     |
| [logger](/docs/routing/error-handling)                   | [![Latest Stable Version](https://poser.pugx.org/leafs/logger/v/stable)](https://packagist.org/packages/leafs/logger) [![Total Downloads](https://poser.pugx.org/leafs/logger/downloads)](https://packagist.org/packages/leafs/logger)                                         | leaf logger module                     |
| [mail](/docs/utils/mail/)                 | [![Latest Stable Version](https://poser.pugx.org/leafs/mail/v/stable)](https://packagist.org/packages/leafs/mail) [![Total Downloads](https://poser.pugx.org/leafs/mail/downloads)](https://packagist.org/packages/leafs/mail)                                 | Mailing made easy with leaf                                       |
| [mvc-core](/docs/mvc/)             | [![Latest Stable Version](https://poser.pugx.org/leafs/mvc-core/v/stable)](https://packagist.org/packages/leafs/mvc-core) [![Total Downloads](https://poser.pugx.org/leafs/mvc-core/downloads)](https://packagist.org/packages/leafs/mvc-core)                 | Brain of Leaf MVC                       |
| [password](/docs/data/encryption)             | [![Latest Stable Version](https://poser.pugx.org/leafs/password/v/stable)](https://packagist.org/packages/leafs/password) [![Total Downloads](https://poser.pugx.org/leafs/password/downloads)](https://packagist.org/packages/leafs/password)                 | Password encryption/validation/hashing in one box                 |
| [paystack](/docs/utils/billing)             | [![Latest Stable Version](https://poser.pugx.org/leafs/paystack/v/stable)](https://packagist.org/packages/leafs/paystack) [![Total Downloads](https://poser.pugx.org/leafs/paystack/downloads)](https://packagist.org/packages/leafs/paystack)                 | Billing with paystack                 |
| [queue](/docs/utils/queues)                | [![Latest Stable Version](https://poser.pugx.org/leafs/queue/v/stable)](https://packagist.org/packages/leafs/queue) [![Total Downloads](https://poser.pugx.org/leafs/queue/downloads)](https://packagist.org/packages/leafs/queue)                             | Queue integration for leaf                                                     |
| [redis](/docs/database/redis)                | [![Latest Stable Version](https://poser.pugx.org/leafs/redis/v/stable)](https://packagist.org/packages/leafs/redis) [![Total Downloads](https://poser.pugx.org/leafs/redis/downloads)](https://packagist.org/packages/leafs/redis)                             | Functionality for Redis                                                      |
| [router](/docs/routing/)     | [![Latest Stable Version](https://poser.pugx.org/leafs/router/v/stable)](https://packagist.org/packages/leafs/router) [![Total Downloads](https://poser.pugx.org/leafs/router/downloads)](https://packagist.org/packages/leafs/router) | Leaf Router copy for use outside of Leaf                                |
| [s3](/docs/utils/fs#using-s3-or-other-cloud-storage-services-new-wip)              | [![Latest Stable Version](https://poser.pugx.org/leafs/s3/v/stable)](https://packagist.org/packages/leafs/s3) [![Total Downloads](https://poser.pugx.org/leafs/s3/downloads)](https://packagist.org/packages/leafs/s3)                     | Drop-in aws s3 module for Leaf FS                                |
| [seedling](/docs/seedling/)              | [![Latest Stable Version](https://poser.pugx.org/leafs/seedling/v/stable)](https://packagist.org/packages/leafs/seedling) [![Total Downloads](https://poser.pugx.org/leafs/seedling/downloads)](https://packagist.org/packages/leafs/seedling)                     | Lightweight console application framework                                          |
| [session](/docs/http/session)              | [![Latest Stable Version](https://poser.pugx.org/leafs/session/v/stable)](https://packagist.org/packages/leafs/session) [![Total Downloads](https://poser.pugx.org/leafs/session/downloads)](https://packagist.org/packages/leafs/session)                     | PHP sessions made simple                                          |
| [sitemap](/docs/utils/sitemaps)              | [![Latest Stable Version](https://poser.pugx.org/leafs/sitemap/v/stable)](https://packagist.org/packages/leafs/sitemap) [![Total Downloads](https://poser.pugx.org/leafs/sitemap/downloads)](https://packagist.org/packages/leafs/sitemap)                     | PHP sitemaps made simple                                          |
| [sprout](/docs/mvc/commands)              | [![Latest Stable Version](https://poser.pugx.org/leafs/sprout/v/stable)](https://packagist.org/packages/leafs/sprout) [![Total Downloads](https://poser.pugx.org/leafs/sprout/downloads)](https://packagist.org/packages/leafs/sprout)                     | Fast, lightweight and minimal CLI framework for PHP                                         |
| [stripe](/docs/utils/billing)             | [![Latest Stable Version](https://poser.pugx.org/leafs/stripe/v/stable)](https://packagist.org/packages/leafs/stripe) [![Total Downloads](https://poser.pugx.org/leafs/stripe/downloads)](https://packagist.org/packages/leafs/stripe)                 | Billing with Stripe                 |
| [vite](/docs/frontend/vite)                | [![Latest Stable Version](https://poser.pugx.org/leafs/vite/v/stable)](https://packagist.org/packages/leafs/vite) [![Total Downloads](https://poser.pugx.org/leafs/vite/downloads)](https://packagist.org/packages/leafs/vite)                             | Leaf server component for Vite                                                      |
<!-- | [viewi](/modules/views/viewi/)                | [![Latest Stable Version](https://poser.pugx.org/leafs/viewi/v/stable)](https://packagist.org/packages/leafs/viewi) [![Total Downloads](https://poser.pugx.org/leafs/viewi/downloads)](https://packagist.org/packages/leafs/viewi)                             | Leaf integration with Viewi PHP                                                      | -->
<!-- | [tilly (WIP)](https://archive.leafphp.dev/#/tilly/)              | [![Latest Stable Version](https://poser.pugx.org/leafs/tilly/v/stable)](https://packagist.org/packages/leafs/tilly) [![Total Downloads](https://poser.pugx.org/leafs/tilly/downloads)](https://packagist.org/packages/leafs/tilly)                     | Simple utility 'toolkit' for PHP applications                                          | -->
<!-- | [veins](/modules/views/veins/)                | [![Latest Stable Version](https://poser.pugx.org/leafs/veins/v/stable)](https://packagist.org/packages/leafs/veins) [![Total Downloads](https://poser.pugx.org/leafs/veins/downloads)](https://packagist.org/packages/leafs/veins)                             | Leaf veins templating engine                                      | -->

## Community Modules

This is a list of modules created by the Leaf community. These modules are not officially maintained by the Leaf team, but they are welcome here. If you have a module you'd like to see here, feel free to [open an issue](https://github.com/leafsphp/docs/issues/new) or create a pull request on our documentation repository.

<!-- | Project                | Status                                                                                                                                                                                                                                                         | Description                                                       |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| [devcycle/devcycle-leaf-plugin](https://github.com/DevCycleHQ-Sandbox/devcycle-leaf-plugin)               | [![Latest Stable Version](https://poser.pugx.org/devcycle/devcycle-leaf-plugin/v/stable)](https://packagist.org/packages/devcycle/devcycle-leaf-plugin) [![Total Downloads](https://poser.pugx.org/devcycle/devcycle-leaf-plugin/downloads)](https://packagist.org/packages/devcycle/devcycle-leaf-plugin)                                 | Devcycle Leaf Module           | -->
