<script setup>
import SponsorGroup from '../shared/SponsorGroup.vue';
import { ui } from './ui';
</script>

<template>
  <section :class="[ui.section, ui.spacious]">
    <header :class="ui.header">
      <p :class="ui.eyebrow">Open Source</p>
      <h2 :class="ui.title">Backed by the community</h2>
      <p :class="ui.subtitle">
        Leaf is fully community-backed. Your support keeps the momentum going as we make modern PHP faster, cleaner, and
        more AI-ready.
      </p>
    </header>

    <div :class="[ui.panel, 'p-6 md:p-8']">
      <span :class="[ui.marker, ui.markerTL]" aria-hidden="true" />
      <span :class="[ui.marker, ui.markerTR]" aria-hidden="true" />
      <SponsorGroup group="sponsor" class="w-full" />
    </div>

    <div class="mt-10 text-center">
      <a
        href="https://opencollective.com/leaf"
        target="_blank"
        rel="noopener noreferrer"
        :class="[ui.btn, ui.btnGhost]"
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
