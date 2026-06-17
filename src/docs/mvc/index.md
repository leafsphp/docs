---
next: false
prev: false
---

# Leaf + MVC

<!-- markdownlint-disable no-inline-html -->

<script setup>
import MvcIntroPage from '@theme/components/Docs/MvcIntroPage.vue';
</script>

<MvcIntroPage section="hero" />

## What is MVC?

MVC stands for Model-View-Controller. It separates your application into the parts that hold data, display interfaces, and respond to requests.

<MvcIntroPage section="parts" />

::: details New to MVC?
MVC is a simple way to keep application code organized. Models talk to data, views present the interface, and controllers coordinate requests. Traversy Media has a useful overview if you want a broader introduction before building with Leaf.

[Watch the MVC overview](https://www.youtube.com/watch?v=pCvZtjoRq1I)
:::

## MVC in Leaf

Leaf MVC is a minimal setup for building structured applications. It adds the folders and commands most projects need, but avoids forcing your app into a heavy framework model.

<MvcIntroPage section="flow" />

## Directory Structure

Leaf MVC's directory structure is inspired by Rails and Laravel, but it stays lightweight and flexible. A fresh app starts with the places most product code naturally belongs.

<MvcIntroPage section="tree" />

Modules may also generate folders like `storage` for logs, cache, and temporary files.

## Configuring Leaf MVC

Leaf MVC works out of the box. Most projects only need a few environment variables, so there is no config directory until you publish one.

<MvcIntroPage section="config" />

## Application Environment

Leaf MVC ships with a `.env.example` file that is copied to `.env` during installation. Values are automatically loaded and available through the `_env()` helper.

```php
$database = _env('DB_DATABASE');
$databaseWithDefault = _env('DB_DATABASE', 'leaf');
```

Do not commit your `.env` file. Leaf MVC already adds it to `.gitignore` because it can contain database credentials, API keys, and other secrets.

## Building with Leaf MVC

Leaf MVC gives you structure without taking away your choices. Build a full-stack app, serve a frontend with Inertia or Blade, or expose a clean JSON API for any client.

<div class="not-prose my-8 grid gap-4 md:grid-cols-2">
  <a class="group rounded-xl border border-neutral-200 bg-white p-5 no-underline transition hover:border-[var(--vp-c-brand-1)] dark:border-neutral-800 dark:bg-neutral-950" href="/learn/mvc">
    <p class="!m-0 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">Full-stack apps</p>
    <h3 class="mt-3 text-lg font-semibold text-neutral-950 dark:text-neutral-50">Build product screens, auth flows, dashboards, and admin tools.</h3>
    <p class="!m-0 !mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Use controllers, models, views, and AI-readable project structure without buying into a heavy framework.</p>
    <span class="mt-4 inline-flex text-sm font-semibold text-[var(--vp-c-brand-1)]">Start building -&gt;</span>
  </a>
  <a class="group rounded-xl border border-neutral-200 bg-white p-5 no-underline transition hover:border-[var(--vp-c-brand-1)] dark:border-neutral-800 dark:bg-neutral-950" href="/learn/api">
    <p class="!m-0 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">APIs</p>
    <h3 class="mt-3 text-lg font-semibold text-neutral-950 dark:text-neutral-50">Expose structured JSON endpoints for any frontend or client.</h3>
    <p class="!m-0 !mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Keep routing, controllers, middleware, and database code predictable enough for humans and agents to extend.</p>
    <span class="mt-4 inline-flex text-sm font-semibold text-[var(--vp-c-brand-1)]">Build an API -&gt;</span>
  </a>
</div>
