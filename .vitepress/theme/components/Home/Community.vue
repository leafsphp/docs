<script setup>
import { ui } from './ui';
</script>

<template>
  <div :class="ui.band">
    <section :class="ui.bandInner">
      <header :class="ui.header">
        <p :class="ui.eyebrow">Community</p>
        <h2 :class="ui.title">Join other people building real products</h2>
        <p :class="ui.subtitle">
          Build alongside developers shaping how modern products are made. Share what you're building, get help when
          you're stuck, and compare the ways people are building with AI in real Leaf apps.
        </p>
      </header>

      <div :class="[ui.panel, 'grid grid-cols-1 items-center lg:grid-cols-12']">
        <span :class="[ui.marker, ui.markerTL]" aria-hidden="true" />
        <span :class="[ui.marker, ui.markerTR]" aria-hidden="true" />
        <span :class="[ui.marker, ui.markerBL]" aria-hidden="true" />
        <span :class="[ui.marker, ui.markerBR]" aria-hidden="true" />

        <div class="flex flex-col items-start gap-6 p-8 md:p-12 lg:col-span-7 lg:p-14">
          <p class="!m-0 text-[1.0625rem] leading-[1.65] text-neutral-600 dark:text-neutral-300">
            The Leaf Discord is where releases drop first, questions get answered, and builders show off what they're
            shipping — from weekend projects to production apps.
          </p>
          <a
            href="https://discord.gg/Pkrm9NJPE3"
            target="_blank"
            rel="noopener noreferrer"
            :class="[ui.btn, ui.btnPrimary]"
          >
            <span>Start building with us</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor"
                d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
            </svg>
          </a>
        </div>

        <div class="flex h-full min-h-[260px] items-center justify-center border-t border-black/[0.08] bg-orange-50/70 p-8 dark:border-white/[0.08] dark:bg-orange-500/5 lg:col-span-5 lg:border-l lg:border-t-0">
          <img src="/images/community.svg" alt="Leaf Community" class="w-full max-w-[380px] opacity-90 transition-transform duration-500 hover:scale-[1.02]" />
        </div>
      </div>
    </section>
  </div>
</template>
