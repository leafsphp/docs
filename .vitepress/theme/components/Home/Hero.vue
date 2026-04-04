<script setup>
import Button from '../shared/Button.vue';
import Particles from './Particles.vue';
import { ref, onMounted } from 'vue';

const terminalLines = ref([]);

const sequence = [
  { text: '$ leaf create my-product', type: 'cmd' },
  { text: '', type: 'blank' },
  { text: '  ✓ Project scaffolded', type: 'ok' },
  { text: '  ✓ Dependencies installed', type: 'ok' },
  { text: '  ✓ Auth, DB, CORS configured', type: 'ok' },
  { text: '', type: 'blank' },
  { text: '$ leaf serve', type: 'cmd' },
  { text: '', type: 'blank' },
  { text: '  🍁 http://localhost:5500', type: 'hl' },
  { text: '     Ready in 1.2s', type: 'dim' },
];

const delays = [400, 800, 1200, 1500, 1800, 2100, 2400, 2800, 3200, 3500];

onMounted(() => {
  sequence.forEach((item, i) => {
    setTimeout(() => {
      terminalLines.value = [...terminalLines.value, item];
    }, delays[i]);
  });
});
</script>

<template>
  <div class="flex flex-col min-h-[90vh] justify-center items-center relative overflow-hidden">
    <Particles :accelerate="false" class="absolute -top-20" />

    <!-- Decorative maple gradient glow -->
    <div class="maple-glow"></div>

    <div class="sm:max-w-3xl lg:max-w-5xl xl:max-w-7xl w-full py-20 px-2 sm:px-10 relative z-10">
      <div
        class="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-[var(--vp-c-brand-1)]/10 border border-brown-400/20 dark:border-gray-100/20 text-sm font-medium text-[var(--vp-c-brand-1)] max-sm:mx-4">
        <span class="inline-block w-2 h-2 rounded-full bg-[var(--vp-c-brand-1)] animate-pulse"></span>
        Leaf V — A new era
      </div>

      <h1
        class="!text-4xl tracking-tighter text-balance max-lg:font-medium max-sm:px-4 sm:!text-5xl lg:!text-6xl xl:!text-8xl">
        Build products at<br><span>the speed of thought</span>
      </h1>

      <p class="max-w-2xl text-lg/7 md:text-xl/7 font-medium text-gray-600 max-sm:px-4 dark:text-gray-300">
        <!-- Leaf 5 is the first PHP framework built to be an extension of your intelligence, eliminating AI hallucinations
        by design. Shipping logic that just works, and architecture that stays 100%
        human-readable. -->

        Leaf 5 is the first PHP framework built as an extension of your intelligence, designed so what you
        create just works without the usual guesswork, while your code stays clean, readable, and yours.
      </p>

      <div class="mt-4 sm:mt-10">
        <div class="flex gap-4 max-sm:px-4">
          <Button as="a" href="/docs/" class="!text-white">
            <span>Start building</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
            </svg>
          </Button>
          <Button as="a" href="/docs/why-leaf-v" variant="outline" class="!text-[var(--vp-c-brand-1)] rounded-full">
            <span>See why Leaf V</span>
          </Button>
        </div>
      </div>

      <div class="mt-16 sm:mt-24">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="rounded-2xl bg-black/5 p-2 outline outline-white/15 backdrop-blur-md dark:bg-white/5 h-full">
            <div
              class="terminal-window rounded-2xl overflow-hidden border border-gray-100/10 dark:border-[var(--vp-c-divider)] z-10">
              <div
                class="terminal-header flex items-center gap-2 px-4 py-3 bg-[#1E1714] dark:bg-[#0A0807] border-b border-gray-100/10 dark:border-[var(--vp-c-divider)]">
                <span class="w-3 h-3 rounded-full bg-[#E85D3A]"></span>
                <span class="w-3 h-3 rounded-full bg-[#F5B731]"></span>
                <span class="w-3 h-3 rounded-full bg-[#4CAF50]"></span>
                <span class="ml-2 text-xs text-gray-500 font-mono">Terminal</span>
              </div>
              <div class="terminal-body bg-[#1E1714] dark:bg-[#0A0807] p-5 min-h-[280px] font-mono text-sm">
                <div v-for="(line, i) in terminalLines" :key="i" class="terminal-line" :class="{
                  'text-gray-300': line.type === 'cmd',
                  'text-[#4CAF50]': line.type === 'ok',
                  'text-[#F5B731] font-semibold': line.type === 'hl',
                  'text-gray-500': line.type === 'dim',
                  'h-3': line.type === 'blank',
                }">
                  {{ line.text }}
                </div>
                <span class="inline-block w-2 h-4 bg-[var(--vp-c-brand-1)] animate-blink mt-1"></span>
              </div>
            </div>
          </div>

          <!-- Video -->
          <div class="max-lg:hidden">
            <div class="rounded-2xl bg-black/5 p-2 outline outline-white/15 backdrop-blur-md dark:bg-white/5 h-full">
              <iframe src="https://www.youtube.com/embed/wvDELSI7fHg?si=SJNoV_HMcjeRWoI8" title="YouTube video player"
                frameborder="0" class="rounded-xl w-full h-full min-h-[280px] bg-black/5 dark:bg-white/10"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 span {
  background: linear-gradient(135deg, #F5B731 0%, #E8753A 35%, #D4542B 65%, #C0392B 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.maple-glow {
  left: 20%;
  top: 15vh;
  width: 60%;
  opacity: 0.2;
  z-index: 0;
  height: 40vh;
  position: absolute;
  filter: blur(120px);
  background: radial-gradient(50% 50% at 50% 50%, #F5B731 0%, #D4652E 50%, transparent 100%);
  pointer-events: none;
}

.terminal-line {
  animation: fadeSlideIn 0.3s ease-out;
  line-height: 1.8;
}

@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blink {

  0%,
  49% {
    opacity: 1;
  }

  50%,
  100% {
    opacity: 0;
  }
}

.animate-blink {
  animation: blink 1s steps(1) infinite;
}
</style>
