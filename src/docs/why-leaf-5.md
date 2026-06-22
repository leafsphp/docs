---
title: "Why Leaf 5?"
next: false
prev: false
---

# Why Leaf 5?

<!-- markdownlint-disable no-inline-html -->

<div class="not-prose mt-6 overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.02]">
  <div class="grid 2xl:grid-cols-[1fr_320px]">
    <div class="border-b border-black/10 p-6 dark:border-white/10 md:p-8 2xl:border-b-0 2xl:border-r">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--vp-c-brand-1)]">AI-native PHP</p>
      <div class="text-2xl font-semibold tracking-[-0.03em] text-neutral-950 dark:text-neutral-50 md:text-3xl">
        Software development changed. Frameworks need to change with it.
      </div>
      <p class="!m-0 !mt-4 max-w-2xl text-base leading-7 text-neutral-600 dark:text-neutral-400">
        Leaf 5 gives people and AI tools the same clear map of an application: predictable structure, small APIs, explicit modules, and project context that stays readable as the product grows.
      </p>
      <div class="mt-6 overflow-hidden rounded-lg border border-black/10 bg-neutral-950 dark:border-white/10">
        <div class="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div class="flex items-center gap-2">
            <span class="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]"></span>
            <span class="h-2.5 w-2.5 rounded-full bg-[#ffd166]"></span>
            <span class="h-2.5 w-2.5 rounded-full bg-[#2dd4bf]"></span>
          </div>
          <span class="font-mono text-xs text-neutral-500">a Leaf 5 project</span>
        </div>
        <div class="overflow-x-auto p-5 font-mono text-sm leading-7 text-neutral-100">
          <div><span class="text-neutral-500">$</span> leaf create my-product</div>
          <div><span class="text-neutral-500">$</span> cd my-product</div>
          <div><span class="text-neutral-500">$</span> leaf serve</div>
        </div>
      </div>
    </div>
    <div class="bg-neutral-50 p-6 dark:bg-white/[0.03] md:p-8">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">The shift</p>
      <div class="grid gap-3 md:grid-cols-3 2xl:grid-cols-1">
        <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">From typing to directing</p>
          <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Developers increasingly describe, review, and refine features alongside writing code.</p>
        </div>
        <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">From hidden to explicit</p>
          <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Routes, modules, structure, and conventions should be easy to inspect.</p>
        </div>
        <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">From setup to product</p>
          <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Framework work should not consume the time meant for product work.</p>
        </div>
      </div>
    </div>
  </div>
</div>

## The bottleneck is no longer writing code

AI can produce a controller, authentication flow, dashboard, API, or billing integration quickly. The difficult part is making that code belong in your application.

Without a reliable map, an assistant has to guess:

- which packages are already installed;
- where routes, controllers, models, and views live;
- which frontend stack the project uses;
- how authentication and database access are configured;
- which conventions new code should follow.

That guesswork creates duplicate abstractions, misplaced files, inconsistent APIs, and code that works once but becomes difficult to maintain.

<div class="not-prose my-8 overflow-hidden rounded-xl border border-black/10 bg-white dark:border-white/10 dark:bg-white/[0.02]">
  <div class="grid md:grid-cols-2">
    <div class="border-b border-black/10 dark:border-white/10 md:border-b-0 md:border-r">
      <div class="border-b border-black/10 bg-neutral-50 px-5 py-4 dark:border-white/10 dark:bg-white/[0.03]">
        <p class="!m-0 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">Without a project map</p>
      </div>
      <div class="divide-y divide-black/5 px-5 dark:divide-white/5">
        <div class="flex gap-3 py-4 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
          <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-700"></span>
          <span>The assistant invents a project structure.</span>
        </div>
        <div class="flex gap-3 py-4 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
          <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-700"></span>
          <span>Generated features use different patterns.</span>
        </div>
        <div class="flex gap-3 py-4 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
          <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-700"></span>
          <span>Every prompt needs more explanation.</span>
        </div>
      </div>
    </div>
    <div>
      <div class="border-b border-black/10 bg-neutral-50 px-5 py-4 dark:border-white/10 dark:bg-white/[0.03]">
        <p class="!m-0 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--vp-c-brand-1)]">With Leaf 5</p>
      </div>
      <div class="divide-y divide-black/5 px-5 dark:divide-white/5">
        <div class="flex gap-3 py-4 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
          <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--vp-c-brand-1)]"></span>
          <span>The project exposes its structure and capabilities.</span>
        </div>
        <div class="flex gap-3 py-4 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
          <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--vp-c-brand-1)]"></span>
          <span>New features follow existing Leaf conventions.</span>
        </div>
        <div class="flex gap-3 py-4 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
          <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--vp-c-brand-1)]"></span>
          <span>Context can be regenerated as the app changes.</span>
        </div>
      </div>
    </div>
  </div>
</div>

## AI-native does not mean AI-dependent

Leaf 5 is still PHP. You can write every line yourself, use an assistant for individual tasks, or let an agent handle larger features.

AI-native means the framework is designed to remain understandable in all three cases.

### One map for people and agents

Leaf projects keep `.leaf/context.md` as shared working memory for agents. An agent inside the project reads that map alongside the filesystem, then writes useful structural changes back so later sessions inherit what it learned. Leaf MVC is AI-ready without extra setup, and projects created with Leaf CLI include this context from the start.

When an external assistant cannot access the project, generate a compact description of that shared context:

```bash:no-line-numbers
leaf context
```

The command prints a minified handoff describing the app entry point, installed modules, routes, configuration, structure, and conventions. Paste the output into the external assistant before it starts editing.

The same clarity helps a developer joining the codebase. There is less hidden framework behavior to memorize and less archaeology before making a change.

### Predictable APIs

Leaf modules follow familiar patterns. Requests, responses, authentication, databases, mail, queues, security, and other capabilities feel like parts of the same system.

```php
app()->post('/sessions', function () {
    $authenticated = auth()->login(request()->get([
        'email',
        'password',
    ]));

    return $authenticated
        ? response()->json(auth()->data())
        : response()->json(auth()->errors(), 422);
});
```

An assistant has fewer competing patterns to choose from, and a developer has fewer framework-specific layers to trace.

## Start small without choosing a dead end

A small idea should not require a full application skeleton. A growing product should not require a framework migration.

Leaf lets the project shape follow the product:

<div class="not-prose my-8 overflow-hidden rounded-xl border border-black/10 bg-white dark:border-white/10 dark:bg-white/[0.02]">
  <div class="grid border-b border-black/10 bg-neutral-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-neutral-400 md:grid-cols-[140px_1fr_180px]">
    <span>Shape</span>
    <span>Use it for</span>
    <span>Command</span>
  </div>
  <div class="grid gap-2 border-b border-black/5 px-4 py-4 text-sm dark:border-white/5 md:grid-cols-[140px_1fr_180px] md:items-center">
    <span class="font-semibold text-neutral-950 dark:text-neutral-50">Lite</span>
    <span class="text-neutral-600 dark:text-neutral-400">Small tools, prototypes, APIs, and focused services.</span>
    <code>leaf create --lite</code>
  </div>
  <div class="grid gap-2 border-b border-black/5 px-4 py-4 text-sm dark:border-white/5 md:grid-cols-[140px_1fr_180px] md:items-center">
    <span class="font-semibold text-neutral-950 dark:text-neutral-50">MVC</span>
    <span class="text-neutral-600 dark:text-neutral-400">Structured products with controllers, models, views, and teams.</span>
    <code>leaf create --mvc</code>
  </div>
  <div class="grid gap-2 px-4 py-4 text-sm md:grid-cols-[140px_1fr_180px] md:items-center">
    <span class="font-semibold text-neutral-950 dark:text-neutral-50">Growing</span>
    <span class="text-neutral-600 dark:text-neutral-400">Move an existing app toward MVC structure without restarting.</span>
    <code>leaf up</code>
  </div>
</div>

Install capabilities as the product needs them:

```bash:no-line-numbers
leaf install auth db mail queue
```

This keeps the initial surface area small while preserving a path to a structured application.

## Structure without ceremony

Leaf MVC gives larger applications predictable places for routes, controllers, models, views, jobs, mailers, middleware, and configuration.

It does not require every possible layer on day one.

<div class="docs-paths not-prose my-8">
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">01 / Ownership</span>
    <strong class="docs-path-title">Clear ownership</strong>
    <span class="docs-path-description">Application code has an obvious home, which makes features easier to locate and change.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">02 / Momentum</span>
    <strong class="docs-path-title">Feature scaffolds</strong>
    <span class="docs-path-description">Generate working feature shapes, then refine them around the actual product.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">03 / Control</span>
    <strong class="docs-path-title">On-demand config</strong>
    <span class="docs-path-description">Start with sensible defaults and publish configuration only when you need control.</span>
  </div>
</div>

## Your frontend stays yours

Leaf 5 does not turn an AI-friendly backend into a forced full-stack platform.

Use Blade or BareUI for server-rendered pages. Use Inertia with React, Vue, or Svelte. Build a JSON API for mobile apps, independent frontends, integrations, or agent workflows.

```bash:no-line-numbers
leaf view:install
```

The frontend choice becomes part of the project context, so generated UI work can follow the stack the application already uses.

## Different from both extremes

Leaf 5 is not trying to be the biggest PHP ecosystem or the smallest possible router.

<div class="not-prose my-8 overflow-hidden rounded-xl border border-black/10 bg-white dark:border-white/10 dark:bg-white/[0.02]">
  <div class="grid border-b border-black/10 bg-neutral-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-neutral-400 md:grid-cols-[160px_1fr_1fr]">
    <span>Approach</span>
    <span>Strength</span>
    <span>Trade-off</span>
  </div>
  <div class="grid gap-2 border-b border-black/5 px-4 py-4 text-sm dark:border-white/5 md:grid-cols-[160px_1fr_1fr]">
    <span class="font-semibold text-neutral-950 dark:text-neutral-50">Large framework</span>
    <span class="text-neutral-600 dark:text-neutral-400">Deep ecosystem and strong conventions.</span>
    <span class="text-neutral-600 dark:text-neutral-400">More framework surface area and ceremony to carry.</span>
  </div>
  <div class="grid gap-2 border-b border-black/5 px-4 py-4 text-sm dark:border-white/5 md:grid-cols-[160px_1fr_1fr]">
    <span class="font-semibold text-neutral-950 dark:text-neutral-50">Micro-framework</span>
    <span class="text-neutral-600 dark:text-neutral-400">A tiny core with maximum assembly freedom.</span>
    <span class="text-neutral-600 dark:text-neutral-400">You define more of the application map yourself.</span>
  </div>
  <div class="grid gap-2 px-4 py-4 text-sm md:grid-cols-[160px_1fr_1fr]">
    <span class="font-semibold text-[var(--vp-c-brand-1)]">Leaf 5</span>
    <span class="text-neutral-600 dark:text-neutral-400">Small core, first-party modules, predictable product structure.</span>
    <span class="text-neutral-600 dark:text-neutral-400">Opinionated about clarity, flexible about the stack around it.</span>
  </div>
</div>

## The Leaf 5 promise

Leaf 5 is built around four ideas:

1. **Give the project a readable map.** Humans and AI should understand what exists before changing it.
2. **Reduce the distance from idea to working software.** Commands, modules, and scaffolds should remove repetitive setup.
3. **Let structure grow with the product.** Start with a small app and add organization without switching ecosystems.
4. **Keep the result understandable.** Generated code should still look like code you would confidently maintain.

This is not AI added to a PHP framework as a separate feature.

It is a PHP framework reconsidered for how software is being built now.

<div class="not-prose my-10 overflow-hidden rounded-xl border border-black/10 bg-neutral-950 p-6 text-neutral-50 dark:border-white/10 sm:p-8">
  <p class="!m-0 text-xs font-semibold uppercase tracking-[0.08em] text-[#fb923c]">Build with Leaf 5</p>
  <div class="mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">Give your next product a framework you and your tools can reason about.</div>
  <p class="!m-0 !mt-3 max-w-2xl text-sm leading-6 text-neutral-400">Create an app, open your agent in the project, and start working on the product instead of assembling the framework underneath it.</p>
  <div class="mt-6 flex flex-wrap gap-3">
    <a class="inline-flex h-10 items-center justify-center rounded-lg bg-white px-4 text-sm font-semibold text-neutral-950 no-underline transition-colors hover:bg-neutral-200" href="/docs/">Get started</a>
    <a class="inline-flex h-10 items-center justify-center rounded-lg border border-white/15 px-4 text-sm font-semibold text-white no-underline transition-colors hover:bg-white/10" href="/docs/ai">Explore AI in Leaf</a>
  </div>
</div>
