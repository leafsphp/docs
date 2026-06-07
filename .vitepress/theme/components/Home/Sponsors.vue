<script setup>
import SponsorGroup from '../shared/SponsorGroup.vue';
</script>

<template>
  <section class="home-section home-section--spacious">
    <header class="home-section__header">
      <p class="home-section__eyebrow">Open Source</p>
      <h2 class="home-section__title !mt-0 !pt-0">Backed by the community</h2>
      <p class="home-section__subtitle">
        Leaf is fully community-backed. Your support keeps the momentum going and helps us build faster.
      </p>
    </header>

    <div class="home-panel p-6 md:p-8">
      <span class="home-marker home-marker--tl" aria-hidden="true" />
      <span class="home-marker home-marker--tr" aria-hidden="true" />
      <SponsorGroup group="sponsor" class="w-full" />
    </div>

    <div class="mt-10 text-center">
      <a
        href="https://opencollective.com/leaf"
        target="_blank"
        rel="noopener noreferrer"
        class="home-btn home-btn--ghost"
      >
        Become a sponsor
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </a>
    </div>
  </section>
</template>
