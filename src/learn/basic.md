---
next: false
prev: false
---

# Start simple. Ship fast.

<!-- markdownlint-disable no-inline-html -->

Some projects are just a few pages, a webhook, or a small API. Leaf is designed to let you start with the simplest structure that works and grow as the product needs it.

<script setup>
import Quickstart from '@theme/components/Docs/Quickstart.vue';
</script>

<Quickstart />

Need more structure? `leaf create my-app --mvc` gives you controllers, views and models up front. Everything else stays optional.

## The smallest useful Leaf app

A lite project starts with enough structure to handle real requests without putting a framework ceremony between you and the product.

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', fn () => response()->json(['message' => 'Hello from Leaf']));

app()->run();
```

<div class="docs-paths not-prose my-6">
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">01 / Route</span>
    <strong class="docs-path-title">Match the request</strong>
    <span class="docs-path-description">Connect an HTTP method and URL to the behavior your application needs.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">02 / Logic</span>
    <strong class="docs-path-title">Write the useful part</strong>
    <span class="docs-path-description">Keep the first version close to the request, then extract structure as complexity earns it.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">03 / Response</span>
    <strong class="docs-path-title">Return clean output</strong>
    <span class="docs-path-description">Send JSON, HTML, redirects, downloads, or any response the client expects.</span>
  </div>
</div>

## Build with an assistant that knows the app

This app was created with Leaf CLI, so `.leaf/CONTEXT.md` is already available as shared project memory. A local agent reads it alongside the filesystem and syncs useful changes back when it finishes. No context command is required.

If you are using an external assistant that cannot access the folder, print a compact project handoff:

```bash:no-line-numbers
leaf context
```

<div class="not-prose my-6 overflow-hidden rounded-xl border border-black/10 bg-white dark:border-white/10 dark:bg-white/[0.02]">
  <div class="grid md:grid-cols-[1fr_240px]">
    <div class="border-b border-black/10 p-5 dark:border-white/10 md:border-b-0 md:border-r">
      <p class="!m-0 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">Your prompt</p>
      <div class="mt-4 rounded-lg border border-black/10 bg-neutral-50 p-4 text-sm font-medium leading-6 text-neutral-800 dark:border-white/10 dark:bg-white/[0.03] dark:text-neutral-200">Add a Stripe webhook, validate the event, and store successful payments.</div>
      <p class="!m-0 !mt-4 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Local agent: shared context and filesystem access stay in sync. External assistant: paste the output of <code>leaf context</code> so it receives the compact project map.</p>
    </div>
    <div class="bg-neutral-50 p-5 dark:bg-white/[0.03]">
      <p class="!m-0 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">AI sees</p>
      <div class="mt-4 space-y-2 font-mono text-sm leading-6 text-neutral-600 dark:text-neutral-400"><div>entry: lite</div><div>routes: known</div><div>modules: known</div><div>patterns: Leaf</div></div>
    </div>
  </div>
</div>

The goal is not more generated code. It is fewer invented patterns and changes that fit the application you already have.

## Add capabilities when the product asks

Leaf modules add focused features without replacing your starting point.

```bash:no-line-numbers
leaf install auth db mail
```

<div class="docs-paths not-prose my-6">
  <a class="docs-path-card" href="/docs/auth/">
    <span class="docs-path-index">01 / Users</span>
    <strong class="docs-path-title">Authentication</strong>
    <span class="docs-path-description">Login, registration, sessions, JWT, user records, and protected routes.</span>
    <span class="docs-path-action">Explore auth <span aria-hidden="true">&rarr;</span></span>
  </a>
  <a class="docs-path-card" href="/docs/database/">
    <span class="docs-path-index">02 / Data</span>
    <strong class="docs-path-title">Database</strong>
    <span class="docs-path-description">Fluent queries, models, schema files, Redis, application state.</span>
    <span class="docs-path-action">Explore data <span aria-hidden="true">&rarr;</span></span>
  </a>
  <a class="docs-path-card" href="/docs/utils/mail/">
    <span class="docs-path-index">03 / Communication</span>
    <strong class="docs-path-title">Mail</strong>
    <span class="docs-path-description">Send transactional messages through a small API with provider flexibility.</span>
    <span class="docs-path-action">Explore mail <span aria-hidden="true">&rarr;</span></span>
  </a>
</div>

Once installed, modules use the same concise Leaf style:

```php
auth()->login($credentials);

$user = db()
    ->select('users')
    ->where('email', $email)
    ->first();

mailer()
    ->to($user->email)
    ->send('welcome');
```

## Grow at your own pace

You do not need to predict the final architecture on day one. Choose the amount of structure the product needs now.

<div class="docs-paths not-prose my-6">
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">01 / Lite</span>
    <strong class="docs-path-title">Prove the idea</strong>
    <span class="docs-path-description">Use a small entry point for scripts, experiments, webhooks, APIs, and focused tools.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">02 / Modules</span>
    <strong class="docs-path-title">Add capabilities</strong>
    <span class="docs-path-description">Bring in authentication, data, mail, billing, queues, or caching as requirements appear.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">03 / MVC</span>
    <strong class="docs-path-title">Organize the product</strong>
    <span class="docs-path-description">Move into controllers, models, views, services, and conventions when the team or app needs them.</span>
  </div>
</div>

All three stages stay inside Leaf, so growth does not require a framework rewrite.

## Deploy anywhere PHP runs

Leaf has no private runtime or hosting lock-in. Deploy to a VPS, shared hosting, containers, or a managed PHP platform using the same application you built locally.

<div class="not-prose my-6 flex flex-col gap-4 rounded-xl border border-black/10 bg-neutral-50 p-5 dark:border-white/10 dark:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between">
  <div>
    <p class="!m-0 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">When structure becomes useful</p>
    <strong class="mt-2 block text-base font-semibold text-neutral-950 dark:text-neutral-50">The same project can grow into Leaf MVC.</strong>
    <span class="mt-1 block text-sm leading-6 text-neutral-600 dark:text-neutral-400">Keep the ecosystem, add the application map.</span>
  </div>
  <a href="/learn/mvc" class="!m-0 inline-flex shrink-0 items-center gap-2 text-sm font-semibold !text-[var(--vp-c-brand-1)] !no-underline">Continue to MVC <span aria-hidden="true">&rarr;</span></a>
</div>

## What to read next

Choose the part of the stack your next feature needs.

<div class="docs-paths docs-paths--four not-prose my-6">
  <a class="docs-path-card" href="/docs/routing/">
    <span class="docs-path-index">01 / Request map</span>
    <strong class="docs-path-title">Routing</strong>
    <span class="docs-path-description">Methods, groups, dynamic routes, middleware, redirects, named routes.</span>
    <span class="docs-path-action">Open routing <span aria-hidden="true">&rarr;</span></span>
  </a>
  <a class="docs-path-card" href="/docs/http/request">
    <span class="docs-path-index">02 / Input</span>
    <strong class="docs-path-title">Requests</strong>
    <span class="docs-path-description">Read input, validate payloads, process forms, files, headers, request data.</span>
    <span class="docs-path-action">Open requests <span aria-hidden="true">&rarr;</span></span>
  </a>
  <a class="docs-path-card" href="/docs/database/">
    <span class="docs-path-index">03 / Persistence</span>
    <strong class="docs-path-title">Database</strong>
    <span class="docs-path-description">Build queries, model records, define schemas, and manage application data.</span>
    <span class="docs-path-action">Open database <span aria-hidden="true">&rarr;</span></span>
  </a>
  <a class="docs-path-card" href="/docs/frontend/">
    <span class="docs-path-index">04 / Interface</span>
    <strong class="docs-path-title">Frontend</strong>
    <span class="docs-path-description">Use Blade, BareUI, Inertia, Vite, Tailwind, React, Vue, or Svelte.</span>
    <span class="docs-path-action">Open frontend <span aria-hidden="true">&rarr;</span></span>
  </a>
</div>
