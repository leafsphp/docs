<script setup>
import { ui } from './ui';
</script>

<template>
  <div :class="ui.band">
    <section :class="ui.bandInner">
      <div :class="[ui.panel, 'grid grid-cols-1 items-center lg:grid-cols-12']">
        <div :class="[ui.accentBar, 'absolute inset-x-0 top-0 z-[1]']" aria-hidden="true" />
        <span :class="[ui.marker, ui.markerTL]" aria-hidden="true" />
        <span :class="[ui.marker, ui.markerTR]" aria-hidden="true" />
        <span :class="[ui.marker, ui.markerBL]" aria-hidden="true" />
        <span :class="[ui.marker, ui.markerBR]" aria-hidden="true" />

        <div class="flex h-full min-h-[300px] items-center justify-center border-b border-black/[0.08] bg-orange-50/70 p-8 dark:border-white/[0.08] dark:bg-orange-500/5 lg:col-span-5 lg:border-b-0 lg:border-r">
          <img src="/images/community.svg" alt="Leaf Community" class="w-full max-w-[380px] opacity-90 transition-transform duration-500 hover:scale-[1.02]" />
        </div>

        <div class="lg:col-span-7 flex flex-col items-center justify-center p-8 text-center md:p-12 lg:p-16 lg:items-start lg:text-left">
          <p :class="[ui.eyebrow, '!mb-3']">Community</p>
          <h2 :class="[ui.title, 'text-center lg:text-left']">
            Join other people building real products
          </h2>
          <p :class="[ui.subtitle, 'text-center lg:text-left !pt-0 !mt-0']">
            Build alongside developers shaping how modern products are made. Share what you're building, get help when
            you're stuck, and compare the ways people are building with AI in real Leaf apps.
          </p>
          <a
            href="https://discord.gg/Pkrm9NJPE3"
            target="_blank"
            rel="noopener noreferrer"
            :class="[ui.btn, ui.btnPrimary, 'mt-8']"
          >
            <span>Start building with us</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor"
                d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
