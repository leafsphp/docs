---
next: false
prev: false
---

# Leaf CLI

<!-- markdownlint-disable no-inline-html -->

<div class="not-prose mt-6 overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.02]">
  <div class="grid 2xl:grid-cols-[1fr_320px]">
    <div class="border-b border-black/10 p-6 dark:border-white/10 md:p-8 2xl:border-b-0 2xl:border-r">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--vp-c-brand-1)]">Command center</p>
      <div class="text-2xl font-semibold tracking-[-0.03em] text-neutral-950 dark:text-neutral-50 md:text-3xl">
        Create, run, extend, and explain your Leaf app from one CLI.
      </div>
      <p class="!m-0 !mt-4 max-w-2xl text-base leading-7 text-neutral-600 dark:text-neutral-400">
        Leaf CLI is the fastest way to start an AI-ready Leaf project, run it locally, install first-party modules, scaffold frontend tooling, and share compact context with external assistants.
      </p>
      <div class="mt-6 overflow-hidden rounded-lg border border-black/10 bg-neutral-950 dark:border-white/10">
        <div class="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div class="flex items-center gap-2">
            <span class="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]"></span>
            <span class="h-2.5 w-2.5 rounded-full bg-[#ffd166]"></span>
            <span class="h-2.5 w-2.5 rounded-full bg-[#2dd4bf]"></span>
          </div>
          <span class="font-mono text-xs text-neutral-500">terminal</span>
        </div>
        <div class="overflow-x-auto p-5 font-mono text-sm leading-7 text-neutral-100">
          <div><span class="text-neutral-500">$</span> composer global require leafs/cli -W</div>
          <div><span class="text-neutral-500">$</span> leaf create my-app</div>
          <div><span class="text-neutral-500">$</span> cd my-app</div>
          <div><span class="text-neutral-500">$</span> leaf serve</div>
        </div>
      </div>
    </div>
    <div class="bg-neutral-50 p-6 dark:bg-white/[0.03] md:p-8">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">What it handles</p>
      <div class="space-y-4 md:space-y-0 grid md:grid-cols-3 2xl:grid-cols-1 gap-3">
        <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">Project shape</p>
          <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Start with lite or MVC without changing ecosystems later.</p>
        </div>
        <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">Modules</p>
          <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Install auth, db, mail, queues, billing, and other Leaf packages quickly.</p>
        </div>
        <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">AI workflow</p>
          <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Start AI-ready, with portable context export when an assistant cannot access the project.</p>
        </div>
      </div>
    </div>
  </div>
</div>

## Installation

Make sure Composer is available on your machine:

```bash:no-line-numbers
composer --version
```

Install Leaf CLI globally:

```bash:no-line-numbers
composer global require leafs/cli -W
```

::: details Getting a conflict about leafs/sprout?
If your global composer.json directly requires an older `leafs/sprout`, composer refuses the update — `-W` can bump dependencies, but it never overrides a version you pinned yourself. Update both constraints together:

```bash:no-line-numbers
composer global require leafs/cli:^5.0 leafs/sprout:^5.0 -W
```

Or, if you never use sprout on its own, drop the pin and let Leaf CLI manage it:

```bash:no-line-numbers
composer global remove leafs/sprout && composer global require leafs/cli:^5.0 -W
```
:::

Verify the install by running:

```bash:no-line-numbers
leaf
```

<div class="docs-paths docs-paths--two not-prose my-6">
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">01 / Availability</span>
    <strong class="docs-path-title">Global command</strong>
    <span class="docs-path-description">The <code>leaf</code> command becomes available anywhere on your machine.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">02 / Ecosystem</span>
    <strong class="docs-path-title">Composer-powered</strong>
    <span class="docs-path-description">Leaf CLI uses Composer underneath, so it fits naturally into PHP workflows.</span>
  </div>
</div>

::: details [Error] command not found: leaf

If you get an error saying `leaf: command not found`, add Composer's global bin directory to your system's PATH. You can find the directory with:

```bash:no-line-numbers
composer global config bin-dir --absolute
```

Common locations:

- Windows: `%USERPROFILE%\AppData\Roaming\Composer\vendor\bin`
- macOS: `$HOME/.composer/vendor/bin`
- GNU/Linux: `$HOME/.config/composer/vendor/bin` or `$HOME/.composer/vendor/bin`

On Bash:

```bash:no-line-numbers
echo 'export PATH="$PATH:$HOME/.composer/vendor/bin"' >> ~/.bashrc
source ~/.bashrc
```

On Zsh:

```bash:no-line-numbers
echo 'export PATH="$PATH:$HOME/.composer/vendor/bin"' >> ~/.zshrc
source ~/.zshrc
```

:::

## Creating apps

Use `leaf create` to start a new project. You can choose the app shape interactively, or pass a flag when you already know what you want.

```bash:no-line-numbers
leaf create my-app
```

<div class="not-prose my-6 overflow-hidden rounded-xl border border-black/10 bg-white dark:border-white/10 dark:bg-white/[0.02]">
  <div class="grid border-b border-black/10 bg-neutral-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-neutral-400 sm:grid-cols-[160px_120px_1fr]">
    <span>Entry point</span>
    <span>Flag</span>
    <span>Best for</span>
  </div>
  <div class="grid border-b border-black/5 px-4 py-3 text-sm dark:border-white/5 sm:grid-cols-[160px_120px_1fr]">
    <span class="font-semibold text-neutral-950 dark:text-neutral-50">Basic app</span>
    <code>--lite</code>
    <span class="text-neutral-600 dark:text-neutral-400">Prototypes, scripts, small tools, single-file starts.</span>
  </div>
  <div class="grid border-b border-black/5 px-4 py-3 text-sm dark:border-white/5 sm:grid-cols-[160px_120px_1fr]">
    <span class="font-semibold text-neutral-950 dark:text-neutral-50">MVC app</span>
    <code>--mvc</code>
    <span class="text-neutral-600 dark:text-neutral-400">Full-stack products, teams, views, controllers, and structure.</span>
  </div>
  <div class="grid border-b border-black/5 px-4 py-3 text-sm dark:border-white/5 sm:grid-cols-[160px_120px_1fr]">
    <span class="font-semibold text-neutral-950 dark:text-neutral-50">API app</span>
    <code>--api</code>
    <span class="text-neutral-600 dark:text-neutral-400">Backends, mobile apps, headless products, and frontend clients.</span>
  </div>
  <div class="grid px-4 py-3 text-sm sm:grid-cols-[160px_120px_1fr]">
    <span class="font-semibold text-neutral-950 dark:text-neutral-50">Console app</span>
    <code>--console</code>
    <span class="text-neutral-600 dark:text-neutral-400">CLI tools built with Seedling.</span>
  </div>
</div>

You can skip the prompt:

```bash:no-line-numbers
leaf create my-app --lite
leaf create my-app --mvc
leaf create my-app --api
leaf create my-app --console
```

## Running your app

Move into your project directory and run the development server:

```bash:no-line-numbers
cd my-app
leaf serve
```

By default, Leaf serves your app on `localhost:5500`.

```bash:no-line-numbers
leaf serve --port=8080
leaf serve -p 8080
```

You can also serve a project from another directory:

```bash:no-line-numbers
leaf serve /path/to/your/app
```

Use `--port` when you need the server on a specific port:

```bash:no-line-numbers
leaf serve --port=8080
```

::: info Automatic dependency installation
When running your app, Leaf will automatically try to install missing dependencies if no `vendor` directory is found in the project.
:::

## Sharing AI context <StatusBadge label="Beta" tone="beta" title="Portable project context is new in Leaf 5" description="The leaf context command scans real projects of every shape, so its output format and detection rules may still change while it settles." meta="Introduced in Leaf 5" />

Agents running inside your project use `.leaf/CONTEXT.md` as shared project memory. They read it alongside the filesystem and sync useful changes back when they finish, so the next agent starts with the latest map. Leaf MVC and projects created through Leaf CLI need no extra AI configuration.

Use `leaf context` only when an external assistant cannot access the project:

```bash:no-line-numbers
leaf context
```

This scans your project and prints a compact handoff: your actual routes with their handlers and middleware, installed modules, models, schema files, and environment key names (names only, never values), with the shared context appended at the end. Paste that output into the external assistant before asking for larger changes. The output is a portable snapshot, not a replacement for the two-way `.leaf/CONTEXT.md` used inside the project. The two are opposite halves: the file holds goals and decisions, the command generates the mechanical map.

::: warning leaf context is in beta
The scan covers the common project shapes, but real projects always find new ones. If `leaf context` misses your routes or trips on your setup, [open an issue](https://github.com/leafsphp/cli/issues/new) and we'll patch it quickly.
:::

<div class="not-prose my-6 grid gap-4 md:grid-cols-[1fr_260px]">
  <div class="rounded-xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-white/[0.02]">
    <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">Prompt with context</p>
    <div class="rounded-lg border border-black/10 bg-neutral-50 p-4 text-sm font-medium leading-6 text-neutral-800 dark:border-white/10 dark:bg-white/[0.03] dark:text-neutral-200">
      Add billing, protect the dashboard, and create the webhook route.
    </div>
  </div>
  <div class="rounded-xl border border-black/10 bg-neutral-50 p-5 dark:border-white/10 dark:bg-white/[0.03]">
    <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">AI sees</p>
    <div class="space-y-2 font-mono text-sm text-neutral-600 dark:text-neutral-400">
      <div>routes</div>
      <div>modules</div>
      <div>entry point</div>
      <div>structure</div>
    </div>
  </div>
</div>

## Scaling a project <StatusBadge label="Beta" tone="beta" title="The app upgrade workflow is still evolving" description="The leaf up command can organize a small Leaf app into MVC structure, but its migration rules and generated output may change while the workflow is tested across more real projects." meta="Command version: 0.1" />

Not all apps require a full structure from the start. With Leaf, you can start as small as a single index.php file hosting your application. This is great for prototypes, scripts, and small tools, but as your app grows, you may want to organize it into a more structured MVC format. 

We added the `leaf up` command to help you scale your app without switching frameworks or rewriting everything by hand. It can move assets, organize controller-like code, and prepare MVC conventions around the app you already started.

```bash:no-line-numbers
leaf up
```

The first time you run `leaf up`, it will generate a `.leaf/migration.yml` file that describes the changes it will make to your project. You can edit this file to point to different directories or change the structure before running the migration. Once you're ready, run `leaf up` again to apply the changes.

::: warning leaf up is in beta
The migration rules are still being tested against more real projects. Review the generated `.leaf/migration.yml` before applying, commit your work first, and if `leaf up` gets your project wrong, [open an issue](https://github.com/leafsphp/cli/issues/new) so we can fix it for everyone.
:::

## Running commands

Use `leaf run` to execute scripts from your app's `composer.json`.

```bash:no-line-numbers
leaf run my-command
```

This keeps project-specific commands close to the app while still giving you one consistent CLI entry point.

## Dependency management

Leaf CLI adds a friendlier layer on top of Composer for Leaf modules and regular Composer packages.

### Installing packages

Install a Leaf module:

```bash:no-line-numbers
leaf install auth
```

You can also include the full Composer package name:

```bash:no-line-numbers
leaf install leafs/auth
```

Install multiple packages at once:

```bash:no-line-numbers
leaf install auth db mail
leaf install auth db illuminate/support
```

Install a specific version with `@`:

```bash:no-line-numbers
leaf install auth@4.0 illuminate/support@9.0.2
```

### Uninstalling packages

Use `uninstall` to remove packages:

```bash:no-line-numbers
leaf uninstall auth
leaf uninstall auth db illuminate/support
```

## View commands

Leaf CLI also includes commands for frontend and view tooling.

```bash:no-line-numbers
leaf view:install
leaf view:build
```

Use `view:install` to set up a view engine or frontend integration, and `view:build` to build frontend assets for production.

## Command reference

<div class="not-prose my-6 overflow-hidden rounded-xl border border-black/10 bg-white dark:border-white/10 dark:bg-white/[0.02]">
  <div class="grid grid-cols-[160px_1fr] border-b border-black/10 bg-neutral-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-neutral-400">
    <span>Command</span>
    <span>Use</span>
  </div>
  <div class="grid grid-cols-[160px_1fr] border-b border-black/5 px-4 py-3 text-sm dark:border-white/5">
    <code>leaf create</code>
    <span class="text-neutral-600 dark:text-neutral-400">Create a new Leaf project.</span>
  </div>
  <div class="grid grid-cols-[160px_1fr] border-b border-black/5 px-4 py-3 text-sm dark:border-white/5">
    <code>leaf serve</code>
    <span class="text-neutral-600 dark:text-neutral-400">Run a local development server.</span>
  </div>
  <div class="grid grid-cols-[160px_1fr] border-b border-black/5 px-4 py-3 text-sm dark:border-white/5">
    <code>leaf context</code>
    <span class="text-neutral-600 dark:text-neutral-400">Print compact context for an external assistant.</span>
  </div>
  <div class="grid grid-cols-[160px_1fr] border-b border-black/5 px-4 py-3 text-sm dark:border-white/5">
    <code>leaf up</code>
    <span class="text-neutral-600 dark:text-neutral-400">Scale a basic app into MVC structure.</span>
  </div>
  <div class="grid grid-cols-[160px_1fr] border-b border-black/5 px-4 py-3 text-sm dark:border-white/5">
    <code>leaf install</code>
    <span class="text-neutral-600 dark:text-neutral-400">Install Leaf modules or Composer packages.</span>
  </div>
  <div class="grid grid-cols-[160px_1fr] border-b border-black/5 px-4 py-3 text-sm dark:border-white/5">
    <code>leaf uninstall</code>
    <span class="text-neutral-600 dark:text-neutral-400">Remove modules or packages.</span>
  </div>
  <div class="grid grid-cols-[160px_1fr] border-b border-black/5 px-4 py-3 text-sm dark:border-white/5">
    <code>leaf run</code>
    <span class="text-neutral-600 dark:text-neutral-400">Run a script from composer.json.</span>
  </div>
  <div class="grid grid-cols-[160px_1fr] px-4 py-3 text-sm">
    <code>leaf view:build</code>
    <span class="text-neutral-600 dark:text-neutral-400">Build frontend assets.</span>
  </div>
</div>
