---
next: false
prev: false
---

<!-- markdownlint-disable no-inline-html -->

# AI in Leaf <StatusBadge label="New" title="AI-native project context arrived in Leaf 5" description="Leaf 5 gives assistants an explicit map of your app instead of making them infer routes, modules, configuration, and structure from scratch." meta="Introduced in Leaf 5" href="#instant-project-understanding" link-text="See how it works" />

<div class="not-prose mt-6 overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.02]">
  <div class="grid 2xl:grid-cols-[1fr_320px]">
    <div class="border-b border-black/10 p-6 dark:border-white/10 md:p-8 2xl:border-b-0 2xl:border-r">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--vp-c-brand-1)]">AI-native PHP</p>
      <div class="text-2xl font-semibold tracking-[-0.03em] text-neutral-950 dark:text-neutral-50 md:text-3xl">
        Give assistants the map, not just the prompt.
      </div>
      <p class="!m-0 !mt-4 max-w-2xl text-base leading-7 text-neutral-600 dark:text-neutral-400">
        Leaf 5 is designed so AI tools can understand your app before they edit it. Routes, modules, config, entry point, and project structure become explicit context instead of hidden assumptions.
      </p>
      <div class="mt-6 overflow-hidden rounded-lg border border-black/10 bg-neutral-950 dark:border-white/10">
        <div class="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div class="flex items-center gap-2">
            <span class="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]"></span>
            <span class="h-2.5 w-2.5 rounded-full bg-[#ffd166]"></span>
            <span class="h-2.5 w-2.5 rounded-full bg-[#2dd4bf]"></span>
          </div>
          <span class="font-mono text-xs text-neutral-500">agent in project</span>
        </div>
        <div class="overflow-x-auto p-5 font-mono text-sm leading-7 text-neutral-100">
          <div><span class="text-neutral-500">$</span> codex .</div>
          <div class="text-neutral-400">reads .leaf/CONTEXT.md + the project</div>
          <div class="text-neutral-400">syncs new project knowledge back when done</div>
        </div>
      </div>
    </div>
    <div class="bg-neutral-50 p-6 dark:bg-white/[0.03] md:p-8">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">The goal</p>
      <div class="space-y-4 md:space-y-0 grid md:grid-cols-3 2xl:grid-cols-1 gap-3">
        <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">Less guessing</p>
          <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">AI sees the app shape before it writes code.</p>
        </div>
        <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">Cleaner changes</p>
          <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Generated code follows Leaf conventions instead of inventing new ones.</p>
        </div>
        <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">Real products</p>
          <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Use AI for auth, dashboards, billing, APIs, and app features.</p>
        </div>
      </div>
    </div>
  </div>
</div>

## Why AI struggles with most frameworks

AI does not usually fail because it cannot write code. It fails because the app gives it poor context.

<div class="docs-paths docs-paths--two not-prose my-6">
  <div class="docs-path-card docs-path-card--static docs-path-card--without-context">
    <span class="docs-path-index">01 / Without context</span>
    <strong class="docs-path-title">AI has to guess</strong>
    <ul class="docs-path-list">
      <li>Unclear file locations</li>
      <li>Scattered configuration</li>
      <li>Missing module information</li>
      <li>Hallucinated framework patterns</li>
    </ul>
  </div>
  <div class="docs-path-card docs-path-card--static docs-path-card--with-leaf">
    <span class="docs-path-index">02 / With Leaf</span>
    <strong class="docs-path-title">AI gets the map</strong>
    <ul class="docs-path-list">
      <li>Readable app structure</li>
      <li>Known entry point</li>
      <li>Installed modules and references</li>
      <li>A project map AI can follow</li>
    </ul>
  </div>
</div>

When the assistant has no map, it guesses. When it guesses, you debug.

## How Leaf fixes this

Leaf 5 gives AI tools a reliable, shared map of your app. Projects created with Leaf CLI are AI-ready immediately, and Leaf MVC needs no extra AI configuration. An agent working inside the project reads `.leaf/CONTEXT.md` alongside the filesystem, then updates that shared context as the app changes.

<div class="docs-paths docs-paths--four not-prose my-6">
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">01 / App shape</span>
    <strong class="docs-path-title">Entry point</strong>
    <span class="docs-path-description">Basic app, MVC app, API app, or console app. AI knows what kind of Leaf project it is editing.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">02 / Code map</span>
    <strong class="docs-path-title">Routes and structure</strong>
    <span class="docs-path-description">Routes, controllers, models, views, public assets, and app folders are easy to inspect.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">03 / Capabilities</span>
    <strong class="docs-path-title">Modules and config</strong>
    <span class="docs-path-description">Installed packages and configuration are part of the context, so AI uses what already exists.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">04 / Freshness</span>
    <strong class="docs-path-title">Two-way context sync</strong>
    <span class="docs-path-description">Agents start from shared project memory and write useful changes back for the next session.</span>
  </div>
</div>

## Instant project understanding

Open an agent in the project and ask for the feature you want. It starts with Leaf's shared context, verifies that map against the live codebase, and keeps the context useful as it works.

<div class="not-prose my-6 overflow-hidden rounded-xl border border-black/10 bg-white dark:border-white/10 dark:bg-white/[0.02]">
  <div class="grid md:grid-cols-[1fr_260px]">
    <div class="border-b border-black/10 p-5 dark:border-white/10 md:border-b-0 md:border-r">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">Prompt</p>
      <div class="rounded-lg border border-black/10 bg-neutral-50 p-4 text-sm font-medium leading-6 text-neutral-800 dark:border-white/10 dark:bg-white/[0.03] dark:text-neutral-200">
        Add a Stripe webhook, validate the payload, store the event, and return the correct response.
      </div>
      <p class="!m-0 !mt-4 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
        The agent reads the shared context and the project itself before writing the webhook, then records useful structural changes for the next agent.
      </p>
    </div>
    <div class="bg-neutral-50 p-5 dark:bg-white/[0.03]">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">Shared project memory</p>
      <div class="space-y-2 font-mono text-sm text-neutral-600 dark:text-neutral-400">
        <div>context: .leaf/CONTEXT.md</div>
        <div>sync: read + write</div>
        <div>routes: known</div>
        <div>modules: known</div>
        <div>filesystem: available</div>
      </div>
    </div>
  </div>
</div>

That means fewer invented files, fewer mismatched APIs, and less cleanup after generation.

## When to use `leaf context`

You do not need this command to make AI features work. Use it when the assistant cannot access your project folder, such as a web chat or another external tool.

```bash:no-line-numbers
leaf context
```

The command prints a compact, minified handoff derived from `.leaf/CONTEXT.md`. Copy that output into the external assistant so it receives the important project map without direct access to the shared file. It does not replace the two-way context used by agents working inside the project.

## Predictable structure means better output

Leaf's structure is intentionally obvious. AI works better when the project has clear places for code to live.

```txt:no-line-numbers
my-app/
├── app/
│   ├── controllers/
│   ├── database/
│   ├── models/
│   ├── routes/
│   └── views/
└── public/
```

This gives assistants a stable path for new controllers, models, routes, views, services, and modules.

## Real features, not toy examples

AI-assisted Leaf work is meant for actual product features.

<div class="docs-paths docs-paths--four not-prose my-6">
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">01 / Access</span>
    <strong class="docs-path-title">Authentication</strong>
    <span class="docs-path-description">Install auth, add protected routes, scaffold login, and wire sessions or JWT.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">02 / Product UI</span>
    <strong class="docs-path-title">Dashboards</strong>
    <span class="docs-path-description">Generate controllers, models, views, and API responses around your existing app structure.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">03 / Payments</span>
    <strong class="docs-path-title">Billing flows</strong>
    <span class="docs-path-description">Add Stripe, Paystack, webhooks, and database records without losing project conventions.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">04 / Integrations</span>
    <strong class="docs-path-title">APIs</strong>
    <span class="docs-path-description">Create routes, validation, response helpers, middleware, and clean JSON endpoints.</span>
  </div>
</div>

## From idea to feature

The Leaf AI workflow is simple:

1. Open an agent in your Leaf project.
2. Describe the feature you want.
3. Let the agent read the shared context and verify it against the current project.
4. Review and run the changes while the agent syncs useful project knowledge back.

For an external assistant without project access, run `leaf context` and paste the compact output into your conversation first.

The assistant stops acting like autocomplete and starts acting like a teammate with project memory.

## This is just the beginning

Leaf is not adding AI as a decoration. Leaf 5 is shaping the framework, CLI, docs, and project structure around a future where humans and AI build software together.
