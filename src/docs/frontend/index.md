# Frontend

<!-- markdownlint-disable no-inline-html -->

<div class="not-prose mt-6 overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.02]">
  <div>
    <div class="border-b border-black/10 p-6 dark:border-white/10 md:p-8">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--vp-c-brand-1)]">Frontend freedom</p>
      <div class="text-2xl font-semibold tracking-[-0.03em] text-neutral-950 dark:text-neutral-50 md:text-3xl">Use the frontend that fits your product, not the one your backend forces on you.</div>
      <p class="!m-0 !mt-4 max-w-2xl text-base leading-7 text-neutral-600 dark:text-neutral-400">Leaf works with simple PHP views, Blade, BareUI, Vite, Tailwind, Inertia, React, Vue, Svelte, and third-party engines. Your backend stays readable while your UI stack stays yours.</p>
      <div class="mt-6 overflow-hidden rounded-lg border border-black/10 bg-neutral-950 dark:border-white/10">
        <div class="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div class="flex items-center gap-2">
            <span class="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]"></span>
            <span class="h-2.5 w-2.5 rounded-full bg-[#ffd166]"></span>
            <span class="h-2.5 w-2.5 rounded-full bg-[#2dd4bf]"></span>
          </div>
          <span class="font-mono text-xs text-neutral-500">views</span>
        </div>
        <div class="overflow-x-auto p-5 font-mono text-sm leading-7 text-neutral-100">
          <div>leaf view:install</div>
          <div class="text-neutral-400">blade, bareui, inertia, vite, tailwind</div>
        </div>
      </div>
    </div>
    <div class="bg-neutral-50 p-6 dark:bg-white/[0.03] md:p-8">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">Choose by workflow</p>
      <div class="grid gap-3 md:grid-cols-3">
        <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">Templates</p>
          <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Blade or BareUI when server-rendered pages are enough.</p>
        </div>
        <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">Modern assets</p>
          <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Vite and Tailwind when you want fast local builds and utility styling.</p>
        </div>
        <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">App UIs</p>
          <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Inertia when React, Vue, or Svelte should talk to Leaf directly.</p>
        </div>
      </div>
    </div>
  </div>
</div>

## Templating Engines

Leaf is modular and lets you use any templating engine you want. It includes first-class support for two common options:

- Leaf's [BareUI](/docs/frontend/bareui) engine
- Laravel's [Blade](/docs/frontend/blade) engine

BareUI relies on PHP's native templating capabilities, so its syntax is just PHP. Blade has its own directive syntax and a larger feature set. Both are valid choices; pick based on how much template power you want.

<div class="not-prose my-6 overflow-hidden rounded-xl border border-black/10 bg-white dark:border-white/10 dark:bg-white/[0.02]">
  <div class="grid grid-cols-[1fr_1fr_1fr] border-b border-black/10 bg-neutral-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-neutral-400">
    <span>Engine</span>
    <span>Best for</span>
    <span>Tradeoff</span>
  </div>
  <div class="grid grid-cols-[1fr_1fr_1fr] border-b border-black/5 px-4 py-3 text-sm dark:border-white/5">
    <a href="/docs/frontend/bareui" class="font-semibold text-neutral-950 no-underline dark:text-neutral-50">BareUI</a>
    <span class="text-neutral-600 dark:text-neutral-400">Tiny PHP-first views</span>
    <span class="text-neutral-600 dark:text-neutral-400">Fewer template features</span>
  </div>
  <div class="grid grid-cols-[1fr_1fr_1fr] px-4 py-3 text-sm">
    <a href="/docs/frontend/blade" class="font-semibold text-neutral-950 no-underline dark:text-neutral-50">Blade</a>
    <span class="text-neutral-600 dark:text-neutral-400">Feature-rich templates</span>
    <span class="text-neutral-600 dark:text-neutral-400">More compilation overhead</span>
  </div>
</div>

## Asset Bundling

Leaf provides first-class support for asset bundling using [Vite](https://vite.dev/). Vite gives modern frontend projects fast development, ES modules, JSX, TypeScript support, and production builds.

The Vite + Leaf stack works well when you want Leaf to own the backend while your frontend code stays modular and easy to build. You can find the full documentation on the [Vite module page](/docs/frontend/vite).

## Frontend Frameworks

Modern app interfaces often use React, Vue, or Svelte. Leaf integrates with these through [Inertia.js](https://inertiajs.com/), giving your frontend direct access to Leaf-powered pages without building a separate API for every screen.

<div class="docs-paths not-prose my-6">
  <a href="/docs/frontend/inertia" class="docs-path-card">
    <span class="docs-path-index">01 / App bridge</span>
    <strong class="docs-path-title">Inertia</strong>
    <span class="docs-path-description">Bridge Leaf with React, Vue, Svelte, or another application UI library.</span>
    <span class="docs-path-action">Open Inertia docs <span aria-hidden="true">&rarr;</span></span>
  </a>
  <a href="/docs/frontend/vite" class="docs-path-card">
    <span class="docs-path-index">02 / Tooling</span>
    <strong class="docs-path-title">Vite</strong>
    <span class="docs-path-description">Build and bundle modern frontend assets for development and production.</span>
    <span class="docs-path-action">Open Vite docs <span aria-hidden="true">&rarr;</span></span>
  </a>
  <a href="/docs/frontend/tailwind" class="docs-path-card">
    <span class="docs-path-index">03 / Styling</span>
    <strong class="docs-path-title">Tailwind</strong>
    <span class="docs-path-description">Add utility-first styling to Blade, Inertia, or any Leaf frontend setup.</span>
    <span class="docs-path-action">Open Tailwind docs <span aria-hidden="true">&rarr;</span></span>
  </a>
</div>

## AI context

Frontend choices are part of Leaf's shared project context. Agents inside the project read `.leaf/CONTEXT.md` alongside the filesystem, then keep that map aligned when Blade, BareUI, Vite, Tailwind, or Inertia changes. Run `leaf context` only to print a compact handoff for an external assistant without project access.
