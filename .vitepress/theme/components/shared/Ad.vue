<template>
  <a href="https://thecreativeleaf.com" target="_blank"
    class="group block rounded-none overflow-visible mt-5 ![text-decoration:none] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--vp-c-brand)]/10"
    id="widget"
    :class="{ 'animate-border': showAnimation }">
    <div class="relative">
      <img src="https://github.com/user-attachments/assets/f9bc3cae-5c34-43df-b138-fcaf28d03cda"
        class="w-full object-cover" alt="Leaf Studio" width="457" height="336">
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      </div>
    </div>

    <div class="p-4 bg-[var(--vp-c-bg-alt)]">
      <div class="flex items-center gap-2 mb-2">
        <span
          class="text-[10px] font-bold uppercase tracking-wider text-[var(--vp-c-brand)] bg-[var(--vp-c-brand)]/10 py-0.5 rounded-full">CREATIVE LEAF</span>
      </div>
      <p class="text-sm font-medium !m-0 !mb-1.5 text-[var(--vp-c-text-1)]">We build products too.</p>
      <p class="text-xs text-gray-500 dark:text-gray-400 !m-0 !mb-3 leading-relaxed">
        From the creators of Leaf PHP — a studio that's shipped frameworks and products used by millions. Let's build yours.
      </p>
      <span
        class="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--vp-c-brand)] group-hover:gap-2.5 transition-all duration-300">
        Start your project
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </span>
    </div>
  </a>
</template>

<script>
export default {
  data() {
    return {
      showAnimation: false
    }
  },
  mounted() {
    const storageKey = 'leafAdAnimationCount';
    const count = parseInt(localStorage.getItem(storageKey) || '0', 10);

    if (count < 3) {
      this.showAnimation = true;
      localStorage.setItem(storageKey, String(count + 1));
    }
  }
}
</script>

<style scoped>
#widget {
  position: relative;
}

#widget.animate-border::before {
  content: '';
  position: absolute;
  inset: 0;
  border: 2px solid transparent;
  border-radius: 12px;
  background: linear-gradient(
    90deg,
    var(--vp-c-brand) 0%,
    var(--vp-c-brand) 25%,
    transparent 100%
  ) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: borderFlow 2s linear forwards;
  animation-iteration-count: 2;
  pointer-events: none;
  z-index: 10;
}

@keyframes borderFlow {
  0% {
    background: linear-gradient(
      90deg,
      var(--vp-c-brand) 0%,
      var(--vp-c-brand) 25%,
      transparent 100%
    ) border-box;
  }
  25% {
    background: linear-gradient(
      180deg,
      var(--vp-c-brand) 0%,
      var(--vp-c-brand) 25%,
      transparent 100%
    ) border-box;
  }
  50% {
    background: linear-gradient(
      270deg,
      var(--vp-c-brand) 0%,
      var(--vp-c-brand) 25%,
      transparent 100%
    ) border-box;
  }
  75% {
    background: linear-gradient(
      0deg,
      var(--vp-c-brand) 0%,
      var(--vp-c-brand) 25%,
      transparent 100%
    ) border-box;
  }
  100% {
    background: linear-gradient(
      0deg,
      var(--vp-c-brand) 0%,
      var(--vp-c-brand) 25%,
      transparent 100%
    ) border-box;
    opacity: 0;
  }
}
</style>
