<script setup>
import SponsorGroup from '../shared/SponsorGroup.vue';
import { ui } from '../Home/ui';
</script>

<template>
  <section :class="[ui.section, ui.spacious]">
    <header :class="ui.header">
      <p :class="ui.eyebrow">Contributors</p>
      <h2 :class="ui.title">Wall of Fame</h2>
      <p :class="ui.subtitle">
        These contributors make Leaf cleaner, faster, and easier for humans and AI tools to understand.
      </p>
    </header>

    <div :class="[ui.panel, 'p-4 md:p-12']">
      <span :class="[ui.marker, ui.markerTL]" aria-hidden="true" />
      <span :class="[ui.marker, ui.markerTR]" aria-hidden="true" />
      <SponsorGroup group="code" class="w-full sm:!grid-cols-4 md:!grid-cols-6 lg:!grid-cols-8 xl:!grid-cols-10" />
    </div>

    <a href="https://www.netlify.com" class="mx-auto mt-16 block w-fit opacity-60 transition-opacity hover:opacity-100">
      <img src="https://www.netlify.com/v3/img/components/netlify-dark.svg" class="w-20 dark:invert" alt="Deploys by Netlify" />
    </a>
  </section>
</template>
