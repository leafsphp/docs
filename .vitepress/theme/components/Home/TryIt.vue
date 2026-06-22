<script setup>
import { ui } from './ui';

const prompts = [
  'Add billing and teams to this app',
  'Create a CMS module for pages',
  'Wire auth, roles, and an admin view',
];

const generatedFiles = [
  'app/routes/billing.php',
  'app/controllers/BillingController.php',
  'app/models/Subscription.php',
  'app/views/admin/billing.blade.php',
];
</script>

<template>
  <div :class="ui.band">
    <section :class="[ui.bandInner, 'w-full sm:!max-w-3xl lg:!max-w-5xl xl:!max-w-7xl !px-2 sm:!px-10']">
      <header :class="ui.header">
        <p :class="ui.eyebrow">Agent-ready</p>
        <h2 :class="ui.title">Start from a prompt. Keep the code yours.</h2>
        <p :class="ui.subtitle">
          Leaf gives AI enough structure to help without taking over. Ask for a feature, review familiar PHP files, and
          keep shaping the app by hand or with your agent.
        </p>
        <div class="mt-8 flex justify-center">
          <a href="/docs/ai" :class="[ui.btn, ui.btnPrimary]">
            <span>Read the AI guide</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor"
                d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
            </svg>
          </a>
        </div>
      </header>

      <div :class="[ui.panel, 'mt-4 grid overflow-hidden lg:grid-cols-[0.9fr_1.1fr]']">
        <div :class="[ui.accentBar, 'absolute inset-x-0 top-0 z-[1]']" aria-hidden="true" />
        <span :class="[ui.marker, ui.markerTL]" aria-hidden="true" />
        <span :class="[ui.marker, ui.markerTR]" aria-hidden="true" />
        <span :class="[ui.marker, ui.markerBL]" aria-hidden="true" />
        <span :class="[ui.marker, ui.markerBR]" aria-hidden="true" />

        <div class="border-b border-black/[0.08] p-6 dark:border-white/[0.08] lg:border-b-0 lg:border-r lg:p-8">
          <p :class="[ui.codeLabel, '!mb-0']">Prompt starters</p>
          <div class="mt-5 grid gap-3">
            <button
              v-for="prompt in prompts"
              :key="prompt"
              type="button"
              class="group flex items-center justify-between rounded-lg border border-black/[0.08] bg-white px-4 py-3 text-left text-sm font-medium text-neutral-950 transition-colors duration-300 hover:border-[var(--vp-c-brand-1)]/40 hover:bg-orange-50/70 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-neutral-50 dark:hover:bg-white/[0.06]"
              tabindex="-1"
            >
              <span>{{ prompt }}</span>
              <span class="font-mono text-xs text-neutral-400 transition-transform group-hover:translate-x-0.5">↵</span>
            </button>
          </div>
          <p class="!m-0 mt-5 text-sm leading-6 text-neutral-500 dark:text-neutral-400">
            With the agent inside your project, each prompt starts from shared context plus the live codebase. Useful
            structural changes sync back when the work is done.
          </p>
        </div>

        <div class="bg-orange-50/60 p-6 dark:bg-orange-500/5 lg:p-8">
          <div class="mb-4 flex items-center justify-between">
            <p :class="[ui.codeLabel, '!mb-0']">Agent output</p>
            <span class="rounded-full border border-black/[0.08] px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.06em] text-neutral-500 dark:border-white/[0.08] dark:text-neutral-400">reviewable PHP</span>
          </div>
          <div class="overflow-hidden rounded-xl border border-black/[0.08] bg-white dark:border-white/[0.08] dark:bg-[#0d0d0d]">
            <div class="flex items-center gap-2 border-b border-black/[0.08] px-4 py-3 dark:border-white/[0.08]">
              <span class="h-2.5 w-2.5 rounded-full bg-[#e85d3a]" />
              <span class="h-2.5 w-2.5 rounded-full bg-[#f5b731]" />
              <span class="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span class="ml-auto font-mono text-[0.7rem] text-neutral-400">leaf agent plan</span>
            </div>
            <div class="grid divide-y divide-black/[0.08] dark:divide-white/[0.08]">
              <div
                v-for="file in generatedFiles"
                :key="file"
                class="flex items-center gap-3 px-4 py-3 font-mono text-[0.82rem] text-neutral-600 transition-colors hover:bg-orange-50/70 dark:text-neutral-300 dark:hover:bg-white/[0.04]"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-[var(--vp-c-brand-1)]" aria-hidden="true" />
                {{ file }}
              </div>
            </div>
          </div>
          <div class="mt-4 grid grid-cols-2 gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            <span class="rounded-lg border border-black/[0.08] px-3 py-2 dark:border-white/[0.08]">human-readable diffs</span>
            <span class="rounded-lg border border-black/[0.08] px-3 py-2 dark:border-white/[0.08]">no hidden runtime</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
