<script setup lang="ts">
const blogPosts = [
  {
    id: 2,
    title: 'What changed in how we build this month',
    excerpt: 'New patterns, better defaults, and the small decisions that compound into a faster workflow.',
    image: 'https://github.com/user-attachments/assets/9e97bc87-0cdc-4bc1-95e3-aeba4ab7788e',
    url: 'https://blog.leafphp.dev/posts/sep-2025-recap.html'
  },
  {
    id: 1,
    title: "Building real products faster isn't about code anymore",
    excerpt: "It's about leverage. How Leaf rethinks the relationship between developers, AI, and the products they ship.",
    image: 'https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fba2wnotxn1952b8am43b.jpg',
    url: 'https://dev.to/mychi_darko/build-your-next-saas-with-php-in-hours-not-days-30if'
  },
];
</script>

<template>
  <div class="flex justify-center items-center my-20">
    <section id="blog" class="w-full sm:!max-w-3xl lg:!max-w-5xl xl:!max-w-7xl !px-4 sm:!px-10 py-16">
      <div class="flex flex-col justify-center items-center text-center mb-12">
        <p class="text-sm font-medium text-[var(--vp-c-brand)] !mb-0 tracking-wide uppercase">Building in public</p>
        <h2 class="text-3xl md:!text-5xl font-bold !border-none !mb-4 !mt-0">Ideas behind the way we build</h2>
        <p class="max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          How we think about frameworks, AI, and shipping products that last.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        <a v-for="post in blogPosts" :key="post.id" :href="post.url" target="_blank"
          class="group block rounded-2xl overflow-hidden ring-1 ring-gray-200 dark:ring-white/10 hover:ring-[var(--vp-c-brand)] hover:shadow-lg hover:shadow-[var(--vp-c-brand)]/10 hover:-translate-y-1 transition-all duration-300 ![text-decoration:none] !text-inherit">
          <div class="h-48 overflow-hidden">
            <div class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
              :style="{ backgroundImage: `url(${post.image})` }"></div>
          </div>
          <div class="p-6">
            <h3
              class="text-lg font-semibold !mt-0 !mb-2 text-[var(--vp-c-text-1)] group-hover:text-[var(--vp-c-brand)] transition-colors">
              {{ post.title }}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 !m-0 leading-relaxed">
              {{ post.excerpt }}
            </p>
          </div>
        </a>
      </div>

      <div class="text-center mt-12">
        <a href="https://blog.leafphp.dev" target="_blank"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 dark:border-white/15 font-medium text-sm hover:border-[var(--vp-c-brand)] hover:text-[var(--vp-c-brand)] transition-colors ![text-decoration:none] !text-[var(--vp-c-text-1)]">
          See how we're building
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </section>
  </div>
</template>
