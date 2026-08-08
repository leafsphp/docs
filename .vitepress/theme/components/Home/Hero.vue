<script setup>
import Particles from './Particles.vue';
import { ref, onMounted } from 'vue';
import { ui } from './ui';

const terminalLines = ref([]);

const sequence = [
  { text: '$ leaf create my-product', type: 'cmd' },
  // { text: '', type: 'blank' },
  { text: '  ✓ Project scaffolded', type: 'ok' },
  // { text: '  ✓ Dependencies installed', type: 'ok' },
  { text: '  ✓ Auth, DB, CORS configured', type: 'ok' },
  { text: '  ✓ Shared agent context ready', type: 'ok' },
  { text: '', type: 'blank' },
  { text: '$ leaf serve', type: 'cmd' },
  // { text: '', type: 'blank' },
  { text: '  🍁 http://localhost:5500', type: 'hl' },
  { text: '     Ready in 1.2s', type: 'dim' },
];

const delays = [400, 800, 1200, 1500, 1800, 2100, 2400, 2700, 3000, 3300, 3700, 4100, 4400];

onMounted(() => {
  sequence.forEach((item, i) => {
    setTimeout(() => {
      terminalLines.value = [...terminalLines.value, item];
    }, delays[i]);
  });
});
</script>

<template>
  <div class="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden">
    <Particles :accelerate="false" class="absolute -top-20" />
    <div class="pointer-events-none absolute left-[20%] top-[12vh] z-0 h-[36vh] w-3/5 bg-[radial-gradient(50%_50%_at_50%_50%,var(--vp-c-brand-1)_0%,transparent_100%)] opacity-10 blur-[120px]" aria-hidden="true" />

    <div :class="[ui.section, 'relative z-10 w-full py-20 sm:py-24']">
      <div :class="[ui.badge, 'max-sm:mx-4 mb-8 w-fit']">
        <span :class="ui.badgeDot" aria-hidden="true" />
        Leaf 5 — A new era
      </div>

      <h1
        class="!text-4xl tracking-tighter text-balance max-lg:font-medium max-sm:px-4 sm:!text-5xl lg:!text-6xl xl:!text-8xl">
        Build products at<br><span class="bg-[linear-gradient(135deg,#F5B731_0%,#E8753A_35%,#D4542B_65%,#C0392B_100%)] bg-clip-text text-transparent">the speed of thought</span>
      </h1>

      <p :class="[ui.heroSubtitle, 'max-sm:px-4 mb-8']">
        Leaf 5 is an AI-native PHP framework with project context built in, so assistants understand your app,
        Craftly can turn patterns into product, and your code stays clean, readable, and yours.
      </p>

      <div :class="[ui.actions, 'max-sm:px-4']">
        <a href="/docs/" :class="[ui.btn, ui.btnPrimary, '!text-white']">
          <span>Start building</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor"
              d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
          </svg>
        </a>
        <a href="https://blog.leafphp.dev/posts/leaf-5" :class="[ui.btn, ui.btnGhost]">
          <span>See why Leaf 5</span>
        </a>
      </div>

      <div class="mt-16 sm:mt-20">
        <div :class="[ui.panel, 'grid grid-cols-1 gap-0 lg:grid-cols-2']">
          <div :class="[ui.accentBar, 'absolute inset-x-0 top-0 z-[1]']" aria-hidden="true" />
          <span :class="[ui.marker, ui.markerTL]" aria-hidden="true" />
          <span :class="[ui.marker, ui.markerTR]" aria-hidden="true" />
          <span :class="[ui.marker, ui.markerBL]" aria-hidden="true" />
          <span :class="[ui.marker, ui.markerBR]" aria-hidden="true" />

          <div class="border-b border-black/[0.08] p-3 dark:border-white/[0.08] lg:border-b-0 lg:border-r">
            <div :class="ui.terminal">
              <div :class="ui.terminalHeader">
                <span class="h-2.5 w-2.5 rounded-full bg-[#e85d3a] shadow-[0_0_14px_rgba(232,93,58,0.55)]" />
                <span class="h-2.5 w-2.5 rounded-full bg-[#f5b731] shadow-[0_0_14px_rgba(245,183,49,0.45)]" />
                <span class="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.4)]" />
                <span :class="ui.terminalLabel">Terminal</span>
              </div>
              <div :class="[ui.terminalBody, '!pb-3 !min-h-[254px]']">
                <div
                  v-for="(line, i) in terminalLines"
                  :key="i"
                  class="animate-fade-slide-in !text-sm"
                  :class="{
                    'text-neutral-900 dark:text-neutral-200': line.type === 'cmd',
                    'text-emerald-600 dark:text-emerald-400': line.type === 'ok',
                    'text-[var(--vp-c-brand-1)] font-medium': line.type === 'hl',
                    'text-neutral-500 dark:text-neutral-400': line.type === 'dim',
                    'h-3': line.type === 'blank',
                  }"
                >
                  {{ line.text }}
                </div>
                <span class="mt-1 inline-block h-4 w-0.5 animate-blink bg-neutral-950 dark:bg-neutral-50" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div class="hidden p-3 lg:block">
            <iframe
              src="https://www.youtube.com/embed/wvDELSI7fHg?si=SJNoV_HMcjeRWoI8"
              title="YouTube video player"
              frameborder="0"
              class="aspect-video w-full rounded-none border border-black/[0.08] bg-neutral-100 dark:border-white/[0.08] dark:bg-white/[0.03]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
