<script setup>
import { ui } from './ui';

const layers = [
  {
    label: '01',
    eyebrow: 'Context',
    title: 'Agents get the map',
    accent: 'bg-[linear-gradient(90deg,#f5b731,#e8753a)]',
    description:
      'Leaf keeps routes, modules, structure, conventions, and project state readable so AI can work inside your app instead of guessing around it.',
  },
  {
    label: '02',
    eyebrow: 'Patterns',
    title: 'Agents follow your conventions',
    accent: 'bg-[linear-gradient(90deg,#e8753a,#34d399)]',
    description:
      'Routes, controllers, models, services, config, and views stay predictable, so generated code lands where it belongs.',
  },
  {
    label: '03',
    eyebrow: 'Sync',
    title: 'Context moves both ways',
    accent: 'bg-[linear-gradient(90deg,#34d399,#60a5fa)]',
    description:
      'Agents read shared project memory alongside the code, then write useful changes back so the next session starts informed.',
  },
];

const agentLoop = [
  'reads .leaf/context.md before writing code',
  'finds the right routes, modules, and services',
  'generates code that matches local patterns',
  'syncs useful project changes back into context',
];
</script>

<template>
  <section id="ai-native" :class="[ui.section, ui.spacious, 'max-w-6xl']">
    <header :class="[ui.header, ui.headerWide]">
      <p :class="ui.eyebrow">AI-native framework</p>
      <h2 :class="ui.title">
        Give your agent the context your PHP app deserves.
      </h2>
      <p :class="ui.subtitle">
        Leaf makes your routes, modules, structure, conventions, and project state readable to AI, so assistants can
        build inside your app instead of guessing around it.
      </p>
    </header>

    <div :class="[ui.panel, 'bg-[linear-gradient(180deg,rgba(245,183,49,0.07),transparent_34%),#fff] dark:bg-[linear-gradient(180deg,rgba(245,183,49,0.08),transparent_34%),rgba(255,255,255,0.02)]']">
      <div :class="[ui.accentBar, 'absolute inset-x-0 top-0 z-[1]']" aria-hidden="true" />
      <span :class="[ui.marker, ui.markerTL]" aria-hidden="true" />
      <span :class="[ui.marker, ui.markerTR]" aria-hidden="true" />
      <span :class="[ui.marker, ui.markerBL]" aria-hidden="true" />
      <span :class="[ui.marker, ui.markerBR]" aria-hidden="true" />

      <div class="grid grid-cols-3 border-b border-black/[0.08] dark:border-white/[0.08] max-[900px]:grid-cols-1">
        <article
          v-for="layer in layers"
          :key="layer.label"
          class="group min-h-70 border-r border-black/[0.08] p-6 transition-colors hover:bg-white/70 last:border-r-0 dark:border-white/[0.08] dark:hover:bg-white/[0.04] max-[900px]:min-h-0 max-[900px]:border-b max-[900px]:border-r-0 max-[900px]:border-black/[0.08] max-[900px]:last:border-b-0 max-[900px]:dark:border-white/[0.08]"
        >
          <div class="mb-8 flex items-center justify-between gap-4 max-[900px]:mb-8">
            <span class="font-mono text-[0.72rem] font-medium uppercase tracking-[0.04em] text-neutral-500 dark:text-neutral-400">{{ layer.label }}</span>
            <small class="font-mono text-[0.72rem] font-medium uppercase tracking-[0.04em] text-neutral-500 dark:text-neutral-400">{{ layer.eyebrow }}</small>
          </div>
          <div class="mb-5 h-1 w-10 rounded-full bg-[var(--vp-c-brand-1)] opacity-80" aria-hidden="true" />
          <h3 class="!m-0 !border-0 !p-0 text-[clamp(1.35rem,2vw,1.75rem)] font-semibold leading-[1.12] tracking-[-0.035em] text-neutral-950 dark:text-neutral-50 !mt-0">{{ layer.title }}</h3>
          <p class="!m-0 !mt-3.5 text-[0.95rem] leading-[1.62] text-neutral-500 dark:text-neutral-400">{{ layer.description }}</p>
        </article>
      </div>

      <div class="grid grid-cols-2 max-[900px]:grid-cols-1">
        <div class="border-r border-black/[0.08] p-6 dark:border-white/[0.08] max-[900px]:border-b max-[900px]:border-r-0">
          <p :class="ui.codeLabel">AI composer</p>
          <div class="mt-4 grid gap-2.5">
            <span class="font-mono text-xs text-neutral-500 dark:text-neutral-400">Ask your agent</span>
            <div class="rounded-none border border-black/[0.08] bg-neutral-50 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-white/[0.08] dark:bg-black/20 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <div class="flex cursor-pointer items-start gap-3 rounded-none bg-white px-3 py-3 ring-1 ring-transparent transition duration-300 hover:ring-[var(--vp-c-brand-1)]/30 dark:bg-white/[0.03]">
                <div class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-black/[0.08] bg-white text-[var(--vp-c-brand-1)] dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3l1.45 4.55L18 9l-4.55 1.45L12 15l-1.45-4.55L6 9l4.55-1.45L12 3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
                    <path d="M18.5 14l.82 2.18L21.5 17l-2.18.82L18.5 20l-.82-2.18L15.5 17l2.18-.82L18.5 14Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                  </svg>
                </div>
                <p class="!m-0 flex-1 text-[0.95rem] font-medium leading-[1.55] text-neutral-950 dark:text-neutral-50">
                  Build a customer portal with billing and a CMS view<span class="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 animate-blink bg-[var(--vp-c-brand-1)]" aria-hidden="true" />
                </p>
                <button
                  type="button"
                  class="!cursor-auto mt-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[var(--vp-c-brand-1)] text-white"
                  aria-label="Send prompt"
                  tabindex="-1"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
              </div>
              <div class="mt-2 flex items-center justify-between px-1 text-[0.7rem] text-neutral-400 dark:text-neutral-500">
                <span>Shared context connected</span>
                <span>two-way sync</span>
              </div>
            </div>
          </div>
          <div class="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-none border border-black/[0.08] bg-black/[0.08] dark:border-white/[0.08] dark:bg-white/[0.08] max-[900px]:grid-cols-1" aria-label="What Leaf gives AI">
            <span class="bg-white px-3.5 py-3 text-[0.84rem] leading-[1.4] text-neutral-500 dark:bg-[#111] dark:text-neutral-400">reads shared project memory</span>
            <span class="bg-white px-3.5 py-3 text-[0.84rem] leading-[1.4] text-neutral-500 dark:bg-[#111] dark:text-neutral-400">finds routes and modules</span>
            <span class="bg-white px-3.5 py-3 text-[0.84rem] leading-[1.4] text-neutral-500 dark:bg-[#111] dark:text-neutral-400">uses app conventions</span>
            <span class="bg-white px-3.5 py-3 text-[0.84rem] leading-[1.4] text-neutral-500 dark:bg-[#111] dark:text-neutral-400">writes project knowledge back</span>
          </div>
        </div>

        <div class="p-6">
          <p :class="ui.codeLabel">Agent workflow</p>
          <ol class="m-0 mt-4 grid list-none gap-0 p-0">
            <li
              v-for="item in agentLoop"
              :key="item"
              class="grid grid-cols-[0.65rem_1fr] items-baseline gap-3 border-t border-black/[0.08] py-3.5 text-[0.92rem] leading-[1.5] text-neutral-500 first:border-t-0 dark:border-white/[0.08] dark:text-neutral-400"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-[var(--vp-c-brand-1)]" aria-hidden="true" />
              {{ item }}
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>
