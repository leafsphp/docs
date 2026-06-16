<script setup>
import { ui } from './ui';

const steps = [
  {
    number: '01',
    title: 'Start with structure',
    description:
      'Spin up a full project with auth, db, and routing already in place, or generate your own custom setup with AI.',
    snippet: { prefix: '$', text: 'leaf create my-product' },
  },
  {
    number: '02',
    title: 'Write logic, not boilerplate',
    description:
      'From AI or your keyboard, write the logic that matters without getting bogged down in repetitive boilerplate.',
    snippet: {
      parts: [
        { text: 'auth', accent: true },
        { text: '()->' },
        { text: 'login', accent: true },
        { text: '([...]);' },
      ],
    },
  },
  {
    number: '03',
    title: 'Ship without friction',
    description:
      'Deploy anywhere PHP runs. No lock-in, no hidden layers, just your product running the way you built it.',
    snippet: { prefix: '$', text: 'leaf deploy' },
  },
];

const metrics = [
  { value: '~30s', label: 'to scaffold a project' },
  { value: '1', label: 'context map for AI' },
  { value: '0', label: 'extra config for AI context' },
  { value: '∞', label: 'hours saved per project' },
];
</script>

<template>
  <section id="speed" :class="[ui.section, ui.spacious]">
    <header :class="ui.header">
      <p :class="ui.eyebrow">Workflow</p>
      <h2 :class="ui.title">Real code. Less friction. Faster flow.</h2>
      <p :class="ui.subtitle">
        AI-first design meets battle-tested PHP code, giving you the power to ship real products faster and
        cheaper than ever before.
      </p>
    </header>

    <div :class="ui.panel" aria-label="Leaf workflow">
      <span :class="[ui.marker, ui.markerTL]" aria-hidden="true" />
      <span :class="[ui.marker, ui.markerTR]" aria-hidden="true" />
      <span :class="[ui.marker, ui.markerBL]" aria-hidden="true" />
      <span :class="[ui.marker, ui.markerBR]" aria-hidden="true" />

      <div class="grid grid-cols-1 md:grid-cols-3">
        <article
          v-for="step in steps"
          :key="step.number"
          class="flex min-h-full flex-col border-b border-black/[0.08] p-8 pb-7 transition-colors hover:bg-neutral-50 dark:border-white/[0.08] dark:hover:bg-white/[0.04] md:border-b-0 md:border-r md:p-10 md:pb-8 last:md:border-r-0"
        >
          <span class="mb-5 block font-mono text-[0.6875rem] font-medium tracking-[0.06em] text-neutral-500 dark:text-neutral-400">{{ step.number }}</span>
          <h3 class="!m-0 !mb-2.5 text-lg font-semibold leading-[1.35] tracking-[-0.02em] text-neutral-950 dark:text-neutral-50">{{ step.title }}</h3>
          <p class="!m-0 mb-6 flex-1 text-[0.9375rem] leading-[1.6] text-neutral-500 dark:text-neutral-400">{{ step.description }}</p>

          <div class="mt-auto rounded-lg border border-black/[0.08] bg-neutral-100 px-4 py-3 font-mono text-[0.8125rem] leading-normal text-neutral-900 dark:border-white/[0.08] dark:bg-black/40 dark:text-neutral-200" aria-hidden="true">
            <template v-if="step.snippet.parts">
              <span
                v-for="(part, i) in step.snippet.parts"
                :key="i"
                :class="{ 'text-[var(--vp-c-brand-1)]': part.accent }"
              >{{ part.text }}</span>
            </template>
            <template v-else>
              <span class="text-neutral-400 dark:text-neutral-500">{{ step.snippet.prefix }}</span>
              {{ ' ' }}{{ step.snippet.text }}
            </template>
          </div>
        </article>
      </div>

      <div class="grid grid-cols-2 border-t border-black/[0.08] bg-neutral-50 dark:border-white/[0.08] dark:bg-white/[0.04] sm:grid-cols-4" role="list">
        <div
          v-for="metric in metrics"
          :key="metric.label"
          class="flex flex-col items-center justify-center gap-1.5 border-b border-r border-black/[0.08] px-4 py-6 text-center even:border-r-0 dark:border-white/[0.08] sm:border-b-0 sm:even:border-r sm:last:border-r-0"
          role="listitem"
        >
          <span class="text-[clamp(1.5rem,3vw,1.875rem)] font-semibold leading-none tracking-[-0.03em] text-neutral-950 dark:text-neutral-50 tabular-nums">{{ metric.value }}</span>
          <span class="max-w-36 text-xs leading-[1.4] text-neutral-500 dark:text-neutral-400">{{ metric.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
