<script setup lang="ts">
const blogPosts = [
  {
    id: 2,
    title: 'What changed in how we build this month',
    excerpt: 'New patterns, better defaults, and the small decisions that compound into a faster workflow.',
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
  <section id="blog" class="home-section home-section--spacious">
    <header class="home-section__header">
      <p class="home-section__eyebrow">Building in public</p>
      <h2 class="home-section__title">Ideas behind the way we build</h2>
      <p class="home-section__subtitle">
        How we think about frameworks, AI, and shipping products that last.
      </p>
    </header>

    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <a
        v-for="post in blogPosts"
        :key="post.id"
        :href="post.url"
        target="_blank"
        rel="noopener noreferrer"
        class="home-card group overflow-hidden ![text-decoration:none] !text-inherit"
      >
        <div class="aspect-[2/1] overflow-hidden border-b border-[var(--home-border)]">
          <div
            class="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]"
            :style="{ backgroundImage: `url(${post.image})` }"
          />
        </div>
        <div class="p-6">
          <h3 class="!m-0 !mb-2 text-base font-semibold tracking-tight text-[var(--home-fg)] transition-colors group-hover:text-[var(--home-muted)]">
            {{ post.title }}
          </h3>
          <p class="!m-0 text-sm leading-relaxed text-[var(--home-muted)]">
            {{ post.excerpt }}
          </p>
        </div>
      </a>
    </div>

    <div class="mt-10 text-center">
      <a href="https://blog.leafphp.dev" target="_blank" rel="noopener noreferrer" class="home-btn home-btn--ghost">
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
