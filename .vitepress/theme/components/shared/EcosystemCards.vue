<script setup>
import { ui } from '../Home/ui';

// wide: 4-up grid for full-width contexts (homepage); default 2-up
// fits the narrower doc-page content column
const props = defineProps({ wide: Boolean });

const products = [
  {
    name: 'Alchemy',
    url: 'https://alchemy.leafphp.dev',
    tagline: 'QA from one config',
    description: 'Tests, code style, refactors, static analysis + CI pipelines for any PHP app — described in one alchemy.yml.',
    logo: 'https://alchemy.leafphp.dev/images/logo-yellow.png',
  },
  {
    name: 'Seedling',
    url: 'https://seedling.leafphp.dev',
    tagline: 'Console applications',
    description: 'A tiny framework for building CLI tools with the Leaf MVC experience — commands, prompts, and packaging.',
    logo: 'https://seedling.leafphp.dev/images/seedling.png',
  },
  {
    name: 'Fetch',
    url: 'https://fetch.leafphp.dev',
    tagline: 'HTTP client',
    description: 'fetch() for PHP. The request API you already know from JavaScript, in any PHP app — Leaf or not.',
    logo: 'https://fetch.leafphp.dev/images/fetch.png',
  },
  {
    name: 'Hana JS',
    url: 'https://hanabira.dev',
    tagline: 'Frontend framework',
    description: 'Simple, lightweight React alternative for building user interfaces — from the same team.',
    logo: 'https://docs.hana.leafphp.dev/favicon.png',
  },
];
</script>

<template>
  <div :class="[ui.tilebed, 'not-prose grid-cols-1 sm:grid-cols-2', props.wide ? 'lg:grid-cols-4' : '']">
    <a
      v-for="product in products"
      :key="product.name"
      :href="product.url"
      target="_blank"
      rel="noopener noreferrer"
      :class="[ui.tile, 'group flex flex-col !no-underline transition-colors hover:bg-neutral-50 dark:hover:bg-white/[0.03]']"
    >
      <img v-if="product.logo" :src="product.logo" :alt="`${product.name} logo`"
        class="h-8 w-8 object-contain" loading="lazy" />
      <span v-else class="flex h-8 w-8 items-center justify-center text-[22px] leading-none" aria-hidden="true">{{ product.emoji }}</span>
      <p class="!m-0 mt-4 flex items-center gap-1.5 text-[15px] font-semibold text-neutral-950 dark:text-neutral-50">
        {{ product.name }}
        <svg class="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-60" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M7 17L17 7M7 7h10v10" />
        </svg>
      </p>
      <p class="!m-0 mt-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-neutral-400 dark:text-neutral-500">
        {{ product.tagline }}</p>
      <p class="!m-0 mt-3 text-[13.5px] leading-relaxed text-neutral-500 dark:text-neutral-400">
        {{ product.description }}</p>
    </a>

    <a
      href="/docs/modules"
      :class="[ui.tile, ui.stripes, 'group flex items-center justify-between gap-4 !no-underline sm:col-span-2', props.wide ? 'lg:col-span-4' : '']"
    >
      <div>
        <p class="!m-0 text-[15px] font-semibold text-neutral-950 dark:text-neutral-50">25+ modules, one install away</p>
        <p class="!m-0 mt-1 text-[13.5px] leading-relaxed text-neutral-500 dark:text-neutral-400">
          Auth, databases, queues, mail, billing and more — grab exactly what you need, nothing else.
        </p>
      </div>
      <span
        class="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs font-medium text-[var(--vp-c-brand-1)] transition-transform group-hover:translate-x-0.5">
        Browse modules
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
        </svg>
      </span>
    </a>
  </div>
</template>
