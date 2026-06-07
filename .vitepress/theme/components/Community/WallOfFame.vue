<script setup>
import SponsorGroup from '../shared/SponsorGroup.vue';
</script>

<template>
  <section class="home-section home-section--spacious">
    <header class="home-section__header">
      <p class="home-section__eyebrow">Contributors</p>
      <h2 class="home-section__title">Wall of Fame</h2>
      <p class="home-section__subtitle">
        These are the heroes who have made Leaf what it is today. We are grateful for their contributions and support
        ❤️
      </p>
    </header>

    <div class="home-panel p-4 md:p-6">
      <span class="home-marker home-marker--tl" aria-hidden="true" />
      <span class="home-marker home-marker--tr" aria-hidden="true" />
      <SponsorGroup group="code" class="w-full sm:!grid-cols-4 md:!grid-cols-6 lg:!grid-cols-8 xl:!grid-cols-10" />
    </div>

    <a href="https://www.netlify.com" class="mx-auto mt-16 block w-fit opacity-60 transition-opacity hover:opacity-100">
      <img src="https://www.netlify.com/v3/img/components/netlify-dark.svg" class="w-20 dark:invert" alt="Deploys by Netlify" />
    </a>
  </section>
</template>
