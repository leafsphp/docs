<script setup>
import { data as stats } from '../../lib/stats.data';
import { ui } from '../Home/ui';

const fmt = (n) => (n ? new Intl.NumberFormat('en-US').format(n) : null);
const installs = stats.installs ? Math.floor(stats.installs / 10000) * 10000 : null;
</script>

<template>
  <section :class="[ui.section, 'pb-20 pt-24 lg:pb-28 lg:pt-32']">
    <div class="mx-auto max-w-3xl text-center">
      <a href="https://blog.leafphp.dev/posts/leaf-5" :class="[ui.badge, '!no-underline']">
        Leaf 5 is out
      </a>
      <h1 class="!m-0 !mt-6 !border-0 !p-0 text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-neutral-950 dark:text-neutral-50">
        The fastest way to build, for people and their agents
      </h1>
      <p :class="[ui.subtitle, '!mx-auto !mt-6 max-w-2xl !text-lg']">
        Leaf is small enough to learn in an afternoon and complete enough to run a business on. Leaf 5 adds the context an agent needs, so the code it writes is code you would have written yourself.
      </p>
      <div class="mt-9 flex flex-wrap items-center justify-center gap-3">
        <a href="/docs/" :class="[ui.btn, ui.btnPrimary]">Get started</a>
        <a href="/docs/ai" :class="[ui.btn, ui.btnGhost]">Give your agent Leaf</a>
      </div>
      <p class="!m-0 !mt-8 font-mono text-[0.75rem] text-neutral-500 dark:text-neutral-400">
        <template v-if="installs">{{ fmt(installs) }}+ ecosystem installs · </template>
        <template v-if="stats.stars">{{ fmt(stats.stars) }} GitHub stars · </template>
        MIT, since 2019
      </p>
    </div>
  </section>
</template>
