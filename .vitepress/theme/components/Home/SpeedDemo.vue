<script setup>
import { ui } from './ui';

const modules = [
  { name: 'auth', accent: true },
  { name: 'db', accent: true },
  { name: 'billing', accent: true },
  { name: 'queue' },
  { name: 'mail' },
  { name: 'cache' },
  { name: 'cors' },
  { name: 'session' },
  { name: 'form' },
  { name: 'fetch' },
  { name: 'redis' },
  { name: 'storage' },
  { name: '+13' },
];

</script>

<template>
  <section id="speed" :class="[ui.section, ui.spacious, 'max-w-6xl']">
    <header class="mb-12 grid items-start gap-6 md:grid-cols-2 md:gap-14">
      <div>
        <p :class="ui.eyebrow">Where Leaf sits</p>
        <h2 :class="[ui.title, '!mb-0 text-balance']">Bigger than a router. Smaller than your average framework.</h2>
      </div>
      <p class="!m-0 text-[1.05rem] leading-[1.7] text-neutral-500 dark:text-neutral-400 md:mt-9">
        You start with routing and a request object. Everything else is a module you install when the product
        needs it, not a layer you inherit on day one. That's what keeps the app small enough to hold in your
        head, and in a context window.
      </p>
    </header>

    <div class="mb-12" aria-hidden="true">
      <div class="relative mb-4 font-mono text-[0.72rem] uppercase tracking-[0.06em] text-neutral-500 dark:text-neutral-400">
        <span>micro</span>
        <span class="absolute left-[51%] -translate-x-1/2 font-medium text-neutral-950 dark:text-neutral-50">product-sized</span>
        <span class="absolute right-0 top-0">full-stack</span>
      </div>
      <div class="relative h-1.5 rounded-full bg-black/[0.08] dark:bg-white/[0.1]">
        <div class="absolute inset-y-0 left-[40%] w-[27.5%] rounded-full bg-[var(--vp-c-brand-1)]/60" />
        <div class="absolute left-[51%] top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[var(--vp-c-brand-1)] bg-white dark:bg-[#161616]" />
      </div>
    </div>

    <div :class="ui.panel" aria-label="Where Leaf sits, and how you work in it">
      <span :class="[ui.marker, ui.markerTL]" aria-hidden="true" />
      <span :class="[ui.marker, ui.markerTR]" aria-hidden="true" />
      <span :class="[ui.marker, ui.markerBL]" aria-hidden="true" />
      <span :class="[ui.marker, ui.markerBR]" aria-hidden="true" />

      <div class="grid md:grid-cols-[1fr_1.2fr_1fr]">
        <article class="border-b border-black/[0.08] p-8 dark:border-white/[0.08] md:self-center md:border-b-0 md:border-r">
          <h3 class="!m-0 text-[1.05rem] font-semibold text-neutral-700 dark:text-neutral-300">Micro-frameworks</h3>
          <p class="!m-0 !mt-2.5 text-[0.92rem] leading-[1.65] text-neutral-500 dark:text-neutral-400">
            Routing and a request object. Auth, db and billing become a package hunt and a weekend.
          </p>

        </article>

        <article class="relative border-b border-black/[0.08] bg-orange-50/40 p-8 dark:border-white/[0.08] dark:bg-white/[0.03] md:border-b-0 md:border-r">
          <div class="absolute inset-x-0 top-0 h-0.5 bg-[var(--vp-c-brand-1)]" aria-hidden="true" />
          <h3 class="!m-0 text-[1.05rem] font-semibold text-neutral-950 dark:text-neutral-50">Leaf</h3>
          <p class="!m-0 !mt-2.5 text-[0.92rem] leading-[1.65] text-neutral-600 dark:text-neutral-300">
            Start with <code class="font-mono text-[0.85em] text-[var(--vp-c-brand-1)]">app()</code>. Add
            <code class="font-mono text-[0.85em] text-[var(--vp-c-brand-1)]">auth()</code>,
            <code class="font-mono text-[0.85em] text-[var(--vp-c-brand-1)]">db()</code>,
            <code class="font-mono text-[0.85em] text-[var(--vp-c-brand-1)]">billing()</code> as the product
            grows. Same fluent shape on every module, so there's one pattern to learn.
          </p>
          <div class="mt-5 flex flex-wrap gap-px overflow-hidden border border-black/[0.08] bg-black/[0.08] dark:border-white/[0.08] dark:bg-white/[0.08]">
            <span
              v-for="mod in modules"
              :key="mod.name"
              class="px-3.5 py-2 font-mono text-[0.78rem]"
              :class="mod.accent
                ? 'bg-orange-100/70 text-[var(--vp-c-brand-1)] dark:bg-orange-500/15'
                : 'bg-white text-neutral-500 dark:bg-[#141414] dark:text-neutral-400'"
            >{{ mod.name }}</span>
          </div>

        </article>

        <article class="p-8 md:self-center">
          <h3 class="!m-0 text-[1.05rem] font-semibold text-neutral-700 dark:text-neutral-300">Full-stack frameworks</h3>
          <p class="!m-0 !mt-2.5 text-[0.92rem] leading-[1.65] text-neutral-500 dark:text-neutral-400">
            Everything included, whether you use it or not. Powerful, and a lot to hold in mind before feature one.
          </p>

        </article>
      </div>
    </div>
  </section>
</template>
