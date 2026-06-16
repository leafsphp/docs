<script setup lang="ts">
import { ui } from '../Home/ui';

const blogPosts = [
  {
    id: 2,
    title: 'What changed in how we build this month',
    excerpt: 'New patterns, better defaults, AI-readable structure, and the small decisions that compound into a faster workflow.',
    image: 'https://github.com/user-attachments/assets/9e97bc87-0cdc-4bc1-95e3-aeba4ab7788e',
    url: 'https://blog.leafphp.dev/posts/sep-2025-recap.html',
  },
  {
    id: 1,
    title: "Building real products faster isn't about code anymore",
    excerpt: "It's about leverage. How Leaf rethinks the relationship between developers, AI, and the products they ship.",
    image: 'https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fba2wnotxn1952b8am43b.jpg',
    url: 'https://dev.to/mychi_darko/build-your-next-saas-with-php-in-hours-not-days-30if',
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
