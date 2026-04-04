<script setup>
import SponsorGroup from '../shared/SponsorGroup.vue';
</script>

<template>
  <div class="flex justify-center item-center py-28 md:py-48 !px-4 sm:!px-10">
    <section class="flex flex-col justify-center items-center max-w-5xl w-full">
      <div class="text-center mb-12 md:mb-16">
        <p class="text-sm font-medium text-[var(--vp-c-brand)] mb-3 tracking-wide uppercase">Open Source</p>
        <h1 class="md:!text-5xl mb-4 md:mb-6">Backed by the community</h1>
        <p class="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          Leaf is fully community-backed. Your support keeps the momentum going and helps us build faster.
        </p>
      </div>

      <SponsorGroup group="sponsor" class="w-full mb-16" />

      <div class="text-center">
        <a href="https://opencollective.com/leaf"
          target="_blank"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--vp-c-brand)] !text-white font-medium text-sm hover:opacity-90 transition-opacity ![text-decoration:none]">
          Become a sponsor
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </section>
  </div>
</template>
