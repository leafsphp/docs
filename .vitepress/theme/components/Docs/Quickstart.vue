<script setup>
import { ref } from 'vue';
import { ui } from '../Home/ui';

const steps = [
  {
    number: '01',
    title: 'Install the CLI, create a project',
    commands: [
      [{ t: 'composer', c: 'cmd' }, { t: ' global require ' }, { t: 'leafs/cli', c: 'arg' }],
      [{ t: 'leaf', c: 'cmd' }, { t: ' create ' }, { t: 'my-app', c: 'arg' }],
    ],
    copy: 'composer global require leafs/cli\nleaf create my-app',
  },
  {
    number: '02',
    title: 'Run it',
    commands: [
      [{ t: 'cd', c: 'cmd' }, { t: ' ' }, { t: 'my-app', c: 'arg' }, { t: ' && ' }, { t: 'leaf', c: 'cmd' }, { t: ' serve' }],
    ],
    copy: 'cd my-app && leaf serve',
  },
];

const copyAll = 'composer global require leafs/cli\nleaf create my-app\ncd my-app\nleaf serve';

const copied = ref(null);
let timer;

function copy(text, key) {
  navigator.clipboard?.writeText(text).catch(() => {});
  copied.value = key;
  clearTimeout(timer);
  timer = setTimeout(() => (copied.value = null), 1600);
}
</script>

<template>
  <div class="not-prose my-8 font-mono">
  <div class="relative border border-black/10 bg-white dark:border-white/10 dark:bg-white/[0.02]">
    <span :class="[ui.marker, ui.markerTL]" aria-hidden="true" />
    <span :class="[ui.marker, ui.markerTR]" aria-hidden="true" />
    <span :class="[ui.marker, ui.markerBL]" aria-hidden="true" />
    <span :class="[ui.marker, ui.markerBR]" aria-hidden="true" />
    <div class="flex items-center justify-between gap-4 border-b border-black/10 px-6 py-4 dark:border-white/10">
      <span class="text-[0.72rem] font-medium uppercase tracking-[0.1em] text-neutral-500 dark:text-neutral-400"><span class="text-[var(--vp-c-brand-1)]">//</span> Quickstart</span>
      <span class="flex items-center gap-4 text-[0.7rem] uppercase tracking-[0.08em]">
        <span class="text-neutral-400 dark:text-neutral-500">bash</span>
        <button type="button" class="font-medium text-[var(--vp-c-brand-1)] hover:opacity-80" @click="copy(copyAll, 'all')">
          {{ copied === 'all' ? 'copied ✓' : 'copy all' }}
        </button>
      </span>
    </div>

    <div
      v-for="step in steps"
      :key="step.number"
      class="grid grid-cols-[3.5rem_1fr_auto] items-start gap-3 border-b border-black/10 px-6 py-8 dark:border-white/10"
    >
      <span class="pt-0.5 text-[0.78rem] text-neutral-400 dark:text-neutral-500">{{ step.number }}</span>
      <div class="min-w-0">
        <p class="!m-0 font-sans text-[1.02rem] font-medium text-neutral-950 dark:text-neutral-50">{{ step.title }}</p>
        <div class="mt-4 grid gap-2 overflow-x-auto text-[0.95rem] leading-relaxed">
          <div v-for="(line, i) in step.commands" :key="i" class="whitespace-nowrap">
            <span class="select-none text-neutral-400 dark:text-neutral-500">$ </span><span
              v-for="(part, j) in line"
              :key="j"
              :class="{
                'text-[#2b7de0] dark:text-[#61AFEF]': part.c === 'cmd',
                'text-[#3e9e54] dark:text-[#98C379]': part.c === 'arg',
                'text-neutral-800 dark:text-neutral-200': !part.c,
              }"
            >{{ part.t }}</span>
          </div>
        </div>
      </div>
      <button
        type="button"
        class="pt-0.5 text-[0.72rem] transition-colors"
        :class="copied === step.number ? 'text-emerald-500' : 'text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300'"
        @click="copy(step.copy, step.number)"
      >{{ copied === step.number ? 'copied ✓' : 'copy' }}</button>
    </div>

    <div class="grid grid-cols-[3.5rem_1fr_auto] items-center gap-3 border-b-0 px-6 py-6">
      <span class="text-[0.78rem] text-[var(--vp-c-brand-1)]">03</span>
      <p class="!m-0 flex flex-wrap items-center gap-2.5 font-sans text-[1.02rem] font-medium text-neutral-950 dark:text-neutral-50">
        <span class="h-2 w-2 bg-emerald-500" aria-hidden="true" />
        Your app is live at
        <code class="rounded-none bg-orange-100/70 px-2 py-0.5 font-mono text-[0.82rem] text-[var(--vp-c-brand-1)] dark:bg-orange-500/15">http://localhost:5500</code>
      </p>
      <span class="text-[0.72rem] text-neutral-400 dark:text-neutral-500">~30s</span>
    </div>

  </div>

  <div class="grid border border-t-0 border-black/10 dark:border-white/10 sm:grid-cols-[4rem_1fr_1fr]">
      <span class="hidden items-center px-5 py-5 text-[0.72rem] uppercase tracking-[0.1em] text-neutral-400 dark:text-neutral-500 sm:flex">Then</span>
      <a href="/docs/routing/" class="group border-b border-black/10 px-5 py-5 !no-underline transition-colors hover:bg-neutral-50 dark:border-white/10 dark:hover:bg-white/[0.03] sm:border-b-0 sm:border-l">
        <span class="flex items-center gap-2 font-sans text-[0.95rem] font-semibold text-neutral-950 dark:text-neutral-50">Add your first route <span aria-hidden="true" class="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span></span>
        <span class="mt-1.5 block text-[0.8rem] text-neutral-500 dark:text-neutral-400">app()->get('/', fn() => 'hi')</span>
      </a>
      <a href="/docs/modules" class="group px-5 py-5 !no-underline transition-colors hover:bg-neutral-50 dark:hover:bg-white/[0.03] sm:border-l sm:border-black/10 sm:dark:border-white/10">
        <span class="flex items-center gap-2 font-sans text-[0.95rem] font-semibold text-neutral-950 dark:text-neutral-50">Pull in a module <span aria-hidden="true" class="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span></span>
        <span class="mt-1.5 block text-[0.8rem] text-neutral-500 dark:text-neutral-400">leaf install auth</span>
      </a>
  </div>
  </div>
</template>
