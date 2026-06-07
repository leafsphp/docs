<script setup>
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
  <div class="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden">
    <Particles :accelerate="false" class="absolute -top-20" />
    <div class="home-glow" aria-hidden="true" />

    <div class="home-section relative z-10 w-full py-20 sm:py-24">
      <div class="home-badge max-sm:mx-4 mb-8 w-fit">
        <span class="home-badge__dot" aria-hidden="true" />
        Leaf V — A new era
      </div>

      <h1
        class="!text-4xl tracking-tighter text-balance max-lg:font-medium max-sm:px-4 sm:!text-5xl lg:!text-6xl xl:!text-8xl">
        Build products at<br><span>the speed of thought</span>
      </h1>

      <p class="home-section__subtitle home-section__subtitle--hero max-sm:px-4 mb-8">
        Leaf 5 is the first PHP framework built as an extension of your intelligence, designed so what you
        create just works without the usual guesswork, while your code stays clean, readable, and yours.
      </p>

      <div class="home-actions max-sm:px-4">
        <a href="/docs/" class="home-btn home-btn--primary">
          <span>Start building</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor"
              d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
          </svg>
        </a>
        <a href="/docs/why-leaf-v" class="home-btn home-btn--ghost">
          <span>See why Leaf V</span>
        </a>
      </div>

      <div class="mt-16 sm:mt-20">
        <div class="home-panel grid grid-cols-1 gap-0 lg:grid-cols-2">
          <span class="home-marker home-marker--tl" aria-hidden="true" />
          <span class="home-marker home-marker--tr" aria-hidden="true" />
          <span class="home-marker home-marker--bl" aria-hidden="true" />
          <span class="home-marker home-marker--br" aria-hidden="true" />

          <div class="border-b border-[var(--home-border)] p-3 lg:border-b-0 lg:border-r">
            <div class="home-terminal">
              <div class="home-terminal__header">
                <span class="home-terminal__dot home-terminal__dot--close" />
                <span class="home-terminal__dot home-terminal__dot--min" />
                <span class="home-terminal__dot home-terminal__dot--max" />
                <span class="home-terminal__label">Terminal</span>
              </div>
              <div class="home-terminal__body !pb-3 !min-h-[254px]">
                <div
                  v-for="(line, i) in terminalLines"
                  :key="i"
                  class="terminal-line"
                  :class="{
                    'text-[var(--home-code-fg)]': line.type === 'cmd',
                    'text-emerald-600 dark:text-emerald-400': line.type === 'ok',
                    'home-accent font-medium': line.type === 'hl',
                    'text-[var(--home-muted)]': line.type === 'dim',
                    'h-3': line.type === 'blank',
                  }"
                >
                  {{ line.text }}
                </div>
                <span class="mt-1 inline-block h-4 w-0.5 animate-blink bg-[var(--home-fg)]" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div class="hidden p-3 lg:block">
            <iframe
              src="https://www.youtube.com/embed/wvDELSI7fHg?si=SJNoV_HMcjeRWoI8"
              title="YouTube video player"
              frameborder="0"
              class="aspect-video w-full rounded-lg border border-[var(--home-border)] bg-[var(--home-surface-muted)]"
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
