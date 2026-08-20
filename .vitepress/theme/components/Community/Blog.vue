<script setup lang="ts">
import { ui } from '../Home/ui';

const blogPosts = [
  {
    id: 3,
    title: 'The weekend Alchemy earned its keep',
    excerpt: 'Ten releases in two days, a Windows bug we could not reproduce, and the boring config file that held it all together.',
    image: 'https://leafphp.dev/leaf5-banner.png',
    url: 'https://blog.leafphp.dev/posts/alchemy-earned-its-keep.html',
  },
  {
    id: 2,
    title: 'Leaf 5: Build products at the speed of thought',
    excerpt: 'The biggest release in our history: a new routing engine, Leaf Crash, AI-native projects, and a family of stable modules.',
    image: 'https://blog.leafphp.dev/leaf5-bg-mountains.png',
    url: 'https://blog.leafphp.dev/posts/leaf-5.html',
  },
];
</script>

<template>
  <section id="blog" :class="[ui.section, ui.spacious]">
    <header :class="ui.header">
      <p :class="ui.eyebrow">Building in public</p>
      <h2 :class="ui.title">Ideas behind the way we build</h2>
      <p :class="ui.subtitle">
        How we think about frameworks, AI-assisted development, and shipping products that last.
      </p>
    </header>

    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <a
        v-for="post in blogPosts"
        :key="post.id"
        :href="post.url"
        target="_blank"
        rel="noopener noreferrer"
        :class="[ui.card, 'group overflow-hidden ![text-decoration:none] !text-inherit']"
      >
        <div class="aspect-[2/1] overflow-hidden border-b border-black/[0.08] dark:border-white/[0.08]">
          <div
            class="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]"
            :style="{ backgroundImage: `url(${post.image})` }"
          />
        </div>
        <div class="p-6">
          <div class="mb-4 h-1 w-12 rounded-full bg-[var(--vp-c-brand-1)] transition-all duration-300 group-hover:w-20" aria-hidden="true" />
          <h3 class="!m-0 !mb-2 text-base font-semibold tracking-tight text-neutral-950 transition-colors group-hover:text-neutral-500 dark:text-neutral-50 dark:group-hover:text-neutral-400">
            {{ post.title }}
          </h3>
          <p class="!m-0 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            {{ post.excerpt }}
          </p>
        </div>
      </a>
    </div>

    <div class="mt-10 text-center">
      <a href="https://blog.leafphp.dev" target="_blank" rel="noopener noreferrer" :class="[ui.btn, ui.btnGhost]">
        See how we're building
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </a>
    </div>
  </section>
</template>
