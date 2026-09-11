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

app()->get('/', fn () => response()->json([
  'message' => 'Hello from Leaf'
]));

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
    <span class="docs-path-description">When your route matches, implement the necessary logic to handle the request.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">03 / Response</span>
    <strong class="docs-path-title">Return clean output</strong>
    <span class="docs-path-description">Send JSON, HTML, redirects, downloads, or any response the client expects.</span>
  </div>
</div>

## Working with an AI assistant

Leaf CLI creates a `.leaf/CONTEXT.md` file with context about your project. When using a coding assistant in your editor or terminal, ask it to read that file before making changes.

For example, if you tell your agent to implement a new messaging feature, it will automatically read the context from `.leaf/CONTEXT.md` and make changes that fit the existing project structure, and if your assistant cannot access the project folder, run:

```bash:no-line-numbers
leaf context
```

Paste the output into your conversation along with your request. See [AI in Leaf](/docs/ai) for more on project context.

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
