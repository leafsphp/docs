<script setup>
import { ui } from './ui';

const layers = [
  {
    label: '01',
    eyebrow: 'Context',
    title: 'Agents get the map',
    description:
      'Routes, modules and conventions are written down where a model looks first.',
  },
  {
    label: '02',
    eyebrow: 'Patterns',
    title: 'One pattern to learn',
    description:
      "Every module shares the same fluent shape, so generated code lands where you'd put it.",
  },
  {
    label: '03',
    eyebrow: 'Sync',
    title: 'Context moves both ways',
    description:
      'Useful changes get written back, so the next session starts informed.',
  },
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

      <div class="grid grid-cols-2 border-b border-black/[0.08] dark:border-white/[0.08] max-[900px]:grid-cols-1">
        <div class="border-r border-black/[0.08] dark:border-white/[0.08] max-[900px]:border-b max-[900px]:border-r-0">
          <div class="flex items-center justify-between gap-4 border-b border-black/[0.08] px-5 py-3 dark:border-white/[0.08]">
            <span class="font-mono text-[0.7rem] font-medium uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">You read</span>
            <span class="font-mono text-[0.7rem] text-neutral-400 dark:text-neutral-500">app/controllers/OrdersController.php</span>
          </div>
          <pre class="!m-0 overflow-x-auto whitespace-pre p-5 font-mono text-[0.8rem] leading-[1.75] text-neutral-800 dark:text-neutral-200"><span class="text-neutral-400 dark:text-neutral-500">public function</span> <span class="font-semibold">store</span>() {
  $data = request()->validate([
    <span class="text-[var(--vp-c-brand-1)]">'items'</span>  => <span class="text-[var(--vp-c-brand-1)]">'array|required'</span>,
    <span class="text-[var(--vp-c-brand-1)]">'coupon'</span> => <span class="text-[var(--vp-c-brand-1)]">'optional|string'</span>,
  ]);

  $order = Order::create($data);
  billing()->charge($order);

  <span class="text-neutral-400 dark:text-neutral-500">return</span> response()->json($order);
}</pre>
        </div>

        <div>
          <div class="flex items-center justify-between gap-4 border-b border-black/[0.08] px-5 py-3 dark:border-white/[0.08]">
            <span class="font-mono text-[0.7rem] font-medium uppercase tracking-[0.08em] text-[var(--vp-c-brand-1)]">Your agent reads</span>
            <span class="font-mono text-[0.7rem] text-[var(--vp-c-brand-1)]/70">.leaf/context.md</span>
          </div>
          <pre class="!m-0 overflow-x-auto whitespace-pre p-5 font-mono text-[0.8rem] leading-[1.75] text-neutral-800 dark:text-neutral-200"><span class="text-neutral-400 dark:text-neutral-500"># my-product</span>
stack     leaf 5 · mvc · sqlite · react/inertia
modules   auth, db, billing, queue

<span class="text-neutral-400 dark:text-neutral-500">## conventions</span>
routes       <span class="text-neutral-400 dark:text-neutral-500">→</span> app/routes/*.php
controllers  <span class="text-neutral-400 dark:text-neutral-500">→</span> app/controllers, one per resource
validation   <span class="text-neutral-400 dark:text-neutral-500">→</span> request()->validate() first

<span class="text-neutral-400 dark:text-neutral-500">## recent</span>
<span class="text-emerald-500 dark:text-emerald-400">+</span> OrdersController::store  charges on create</pre>
        </div>
      </div>

      <div class="grid grid-cols-3 max-[900px]:grid-cols-1">
        <article
          v-for="layer in layers"
          :key="layer.label"
          class="group border-r border-black/[0.08] p-6 transition-colors hover:bg-white/70 last:border-r-0 dark:border-white/[0.08] dark:hover:bg-white/[0.04] max-[900px]:border-b max-[900px]:border-r-0 max-[900px]:border-black/[0.08] max-[900px]:last:border-b-0 max-[900px]:dark:border-white/[0.08]"
        >
          <p class="!m-0 font-mono text-[0.72rem] font-medium uppercase tracking-[0.04em] text-neutral-500 dark:text-neutral-400">{{ layer.label }} · {{ layer.eyebrow }}</p>
          <h3 class="!m-0 !border-0 !p-0 !mt-4 text-[1.15rem] text-balance font-semibold leading-[1.2] tracking-[-0.02em] text-neutral-950 dark:text-neutral-50">{{ layer.title }}</h3>
          <p class="!m-0 !mt-2.5 text-[0.92rem] leading-[1.6] text-neutral-500 dark:text-neutral-400">{{ layer.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
