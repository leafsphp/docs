---
next: false
prev: false
---

<!-- markdownlint-disable no-inline-html -->

# AI in Leaf <StatusBadge label="New" title="AI-native project context arrived in Leaf 5" description="Leaf 5 gives assistants an explicit map of your app instead of making them infer routes, modules, configuration, and structure from scratch." meta="Introduced in Leaf 5" href="#instant-project-understanding" link-text="See how it works" />

<div class="not-prose mt-6 overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.02]">
  <div>
    <div class="border-b border-black/10 p-6 dark:border-white/10 md:p-8">
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
      <div class="grid gap-3 md:grid-cols-3">
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
          <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Use AI for app features like auth and dashboards, along with billing and APIs.</p>
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

Without a map, the assistant guesses, and you end up debugging the guesses.

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

## The shared context format <Badge type="tip" text="NEW" />

`.leaf/CONTEXT.md` follows a small official format, **leaf.context v1**, so that edits from different assistants compose instead of colliding. What Claude writes today, Cursor can extend tomorrow, and Codex can clean up next week. Every project created through Leaf CLI ships with the template (lite, MVC, API and console apps alike), and `leaf up` carries it forward when scaling a lite app.

The format is plain markdown with a handful of rules:

- **The first line is a marker**, `<!-- leaf.context v1 -->`, so tools and agents can recognize the file. It is invisible when rendered and never edited.
- **Sections are `##` headings** in a stable order: Working With This File, Project Summary, Current Goal, Architecture, External Providers, Coding Conventions, Recent Changes, Known Decisions, Future Ideas. Agents preserve sections they don't recognize and may add project-specific ones at the end.
- **Placeholders are underscore-wrapped lines.** When one contains `agent:`, it is an instruction to the next assistant: ask the user something, make a choice, then replace the line with the answer. This is how a fresh template bootstraps itself into real project memory.
- **Entries are single lines** wherever possible, so concurrent edits merge cleanly in git. Recent Changes entries are dated (`* 2026-08-06 — what changed`), capped at five, newest first. Known Decisions always carry their reasoning, because a decision without its why gets relitigated by the next agent.
- **The file never duplicates the codebase.** Routes and models, along with modules and structure, live in code and in `leaf context`; the shared memory holds only what code cannot say: the goals and decisions, and the reasoning behind them. This is what keeps it from rotting.
- **No secrets, ever.** Environment keys are referenced by name only.

The file also opens with a short "Working With This File" section carrying these same rules, so an assistant that has never seen Leaf before still edits it correctly.

## When to use `leaf context`

You do not need this command to make AI features work. Use it when the assistant cannot access your project folder, such as a web chat or another external tool.

```bash:no-line-numbers
leaf context
```

The command is deliberately the opposite half of `.leaf/CONTEXT.md`. The shared file holds what code cannot say (goals, decisions, reasoning) and never duplicates the codebase. `leaf context` scans the codebase and generates the mechanical map the file leaves out: app type, installed modules, actual route registrations with their handlers and middleware, models, schema files, and environment key names (names only, values never leave your machine). It then appends the shared memory, so one paste gives an external assistant both halves. It does not replace the two-way context used by agents working inside the project.

## Teaching your assistant Leaf

Leaf ships two documents built for AI, and they do different jobs:

**[llms.txt](https://leafphp.dev/llms.txt) is knowledge.** A compressed reference of Leaf's APIs, conventions and config, written for models instead of people. Assistants fetch it when they need Leaf facts, the way you'd check the docs. If your AI tool supports doc URLs (most do), point it here and it can answer "how do I do X in Leaf" correctly.

**The [Leaf skill](https://leafphp.dev/ai/SKILL.md) is behavior.** It teaches an agent how to *work* in a Leaf project: which entry point to scaffold, how to read and write `.leaf/CONTEXT.md` without breaking the format, when to run `leaf context`, what the scaffolds give you, and where to send bug reports for the beta commands. It comes with [reference files](https://leafphp.dev/ai/references/routing.md) the agent loads per topic, so it stays accurate without stuffing everything into one prompt.

How to use them:

- **Claude Code**: save the skill as `.claude/skills/leaf/SKILL.md` in your project (or `~/.claude/skills/leaf/SKILL.md` for every project), and Claude loads it automatically whenever Leaf work comes up.
- **Cursor, Codex and any agent that reads `AGENTS.md`**: new Leaf MVC apps already ship an `AGENTS.md` pointing at the skill and llms.txt, so there's no setup at all.
- **Anything else**: paste the skill's URL into your assistant's custom instructions, or just tell it to fetch `https://leafphp.dev/ai/SKILL.md` before working.

The short version: llms.txt makes your assistant *know* Leaf, the skill makes it *behave* like a Leaf developer, and `.leaf/CONTEXT.md` makes it know *your project*. The three stack.

## Errors that carry their own fix

When something breaks, the error message is the first thing your assistant reads, and usually the only thing. So Leaf writes error messages the way a maintainer would answer a support ticket: what went wrong, what to do about it, and how the fix differs depending on how your app is set up.

<img src="/images/crash-ai-error.png" style="width:100%; border-radius: 8px; margin: 15px 0;" alt="A Leaf crash report where the error message itself explains the three ways to fix it" />

That's a real crash screen. No googling, no source diving, no guessing which of five Stack Overflow answers applies to your setup. The remediation is the message, and it's honest about context: what works in Leaf MVC, what a lite app needs instead. Your assistant reads it once and fixes the problem, and so do you.

The crash screen itself is built for handoff too: **Copy as Markdown** turns the whole report (message, stack, request context, breadcrumbs) into something you can paste straight into a chat, and **Open with AI** sends it there directly.

## Built to burn fewer tokens

Tokens are money and context is scarce, so Leaf's AI documentation is engineered like an API, not a book:

- **One hop to any answer.** Every reference file lives at a stable URL (`leafphp.dev/ai/references/<topic>.md`), covers one concern, and fits comfortably in context. No navigation, no pagination, no reading three pages to extract one fact.
- **Footguns over prose.** The skill's Known Footguns section is a list of the exact mistakes agents actually make, in one screen. Correcting a wrong assumption up front is hundreds of times cheaper than debugging it after.
- **Errors skip the loop.** The most expensive thing an assistant does is the try-fail-search-retry cycle. An error that names its own fix collapses that loop to one step, which is why we treat error strings as documentation and field-test them with real agents.
- **Context lives in the project.** `.leaf/CONTEXT.md` means your assistant doesn't re-derive your architecture every session. Reading one small file beats re-exploring a codebase, every time.

We measure this the direct way: AI agents build real apps on Leaf, we count every file they had to open and every retry they burned, and whatever cost them tokens becomes a fix. The error message in the screenshot above exists because an agent hit the unclear version of it and told us exactly what it needed to hear instead.

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

This gives assistants a stable path for new controllers, models, routes, views, services, modules.

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
    <span class="docs-path-description">Generate controllers, models, views, or API responses around your existing app structure.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">03 / Payments</span>
    <strong class="docs-path-title">Billing flows</strong>
    <span class="docs-path-description">Add Stripe and Paystack payments, plus webhooks and database records, without losing project conventions.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">04 / Integrations</span>
    <strong class="docs-path-title">APIs</strong>
    <span class="docs-path-description">Create routes, validation, response helpers, middleware, clean JSON endpoints.</span>
  </div>
</div>

## From idea to feature

The Leaf AI workflow is simple:

1. Open an agent in your Leaf project.
2. Describe the feature you want.
3. Let the agent read the shared context and verify it against the current project.
4. Review and run the changes while the agent syncs useful project knowledge back.

For an external assistant without project access, run `leaf context` and paste the compact output into your conversation first.

With project memory in the loop, the assistant works more like a teammate than autocomplete.

## Where this is going

AI in Leaf is not a bolt-on. Leaf 5 shapes the framework and CLI, along with the docs and project structure, around a future where humans and AI build software together.
