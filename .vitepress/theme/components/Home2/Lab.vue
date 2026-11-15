<script setup>
import { ui } from '../Home/ui';

// First-pass copy; Asa owns the final lines. Links go to the Leaf AI Labs post until each product site is confirmed.
const post = 'https://blog.leafphp.dev/posts/leaf-ai-labs';
const products = [
  { name: 'Friday', img: '/labs/friday.jpg', text: 'TODO(Asa): one sentence from the Labs post.' },
  { name: 'Kata', img: '/labs/kata.jpg', text: 'TODO(Asa): one sentence from the Labs post.' },
  { name: 'Alchemy', img: '/labs/alchemy.jpg', text: 'Connect your repo and test runs stream into one dashboard, with failures traced back to the commit.' },
  { name: 'Craftly', img: '/labs/craftly.jpg', text: 'TODO(Asa): one sentence from the Labs post.' },
  { name: 'Hana', img: '/labs/hana.jpg', text: 'TODO(Asa): one sentence from the Labs post.' },
];
</script>

<template>
  <section :class="[ui.section, ui.spacious]">
    <header :class="ui.header">
      <p :class="ui.eyebrow">From the Lab</p>
      <h2 :class="ui.title">Products from Leaf AI Labs</h2>
    </header>
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <a v-for="p in products" :key="p.name" :href="post" class="block border border-black/[0.08] !no-underline dark:border-white/[0.08]">
        <img :src="p.img" :alt="p.name + ' website'" loading="lazy" class="aspect-video w-full object-cover" />
        <div class="p-4">
          <h3 class="!m-0 !border-0 !p-0 text-base font-semibold">{{ p.name }}</h3>
          <p class="!m-0 !mt-2 text-[0.8125rem] leading-[1.55] text-neutral-500">{{ p.text }}</p>
        </div>
      </a>
    </div>
  </section>
</template>
