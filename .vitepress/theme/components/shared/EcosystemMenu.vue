<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { products } from './ecosystem';

const open = ref(false);
const root = ref(null);
let closeTimer = null;

const enter = () => {
  clearTimeout(closeTimer);
  open.value = true;
};

const leave = () => {
  closeTimer = setTimeout(() => (open.value = false), 120);
};

const onClickOutside = (e) => {
  if (root.value && !root.value.contains(e.target)) open.value = false;
};

const onKeydown = (e) => {
  if (e.key === 'Escape') open.value = false;
};

onMounted(() => {
  document.addEventListener('click', onClickOutside);
  document.addEventListener('keydown', onKeydown);
});

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside);
  document.removeEventListener('keydown', onKeydown);
  clearTimeout(closeTimer);
});


</script>

<template>
  <div ref="root" class="eco-menu" @mouseenter="enter" @mouseleave="leave">
    <button
      type="button"
      class="eco-button"
      :aria-expanded="open"
      aria-label="Ecosystem menu"
      @click="open = !open"
    >
      Ecosystem
      <svg class="eco-chevron" :class="{ 'eco-chevron-open': open }" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>

    <transition name="eco-fade">
      <div v-if="open" class="eco-panel">
        <div class="grid grid-cols-2 gap-px border-b border-black/[0.08] bg-black/[0.08] dark:border-white/[0.08] dark:bg-white/[0.08]">
          <a
            v-for="product in products"
            :key="product.name"
            :href="product.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex flex-col bg-white p-5 !no-underline transition-colors hover:bg-neutral-50 dark:bg-[var(--vp-c-bg-elv,var(--vp-c-bg))] dark:hover:bg-white/[0.04]"
            :class="{ 'col-span-2': products.length % 2 === 1 && product === products[products.length - 1] }"
          >
            <div class="flex items-center gap-2.5">
              <img v-if="product.logo" :src="product.logo" :alt="`${product.name} logo`"
                class="h-5 w-5 object-contain" loading="lazy" />
              <span v-else class="flex h-5 w-5 items-center justify-center text-[15px] leading-none" aria-hidden="true">{{ product.emoji }}</span>
              <span class="text-[14px] font-semibold text-neutral-950 dark:text-neutral-50">{{ product.name }}</span>
              <svg class="ml-auto h-3 w-3 text-neutral-400 opacity-0 transition-opacity group-hover:opacity-100"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" aria-hidden="true">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </div>
            <span class="mt-1.5 font-mono text-[0.625rem] uppercase tracking-[0.08em] text-neutral-400 dark:text-neutral-500">
              {{ product.tagline }}</span>
            <span class="mt-1.5 text-[12.5px] leading-relaxed text-neutral-500 dark:text-neutral-400">
              {{ product.menuDescription || product.description }}</span>
          </a>
        </div>

        <a
          href="/docs/modules"
          class="flex items-center justify-between gap-4 bg-white px-5 py-4 !no-underline transition-colors hover:bg-neutral-50 dark:bg-[var(--vp-c-bg-elv,var(--vp-c-bg))] dark:hover:bg-white/[0.04]"
        >
          <span class="text-[13px] font-medium text-neutral-950 dark:text-neutral-50">
            25+ modules: auth, databases, queues, mail &amp; more
          </span>
          <span class="inline-flex items-center gap-1 font-mono text-[11px] font-medium text-[var(--vp-c-brand-1)]">
            Browse
            <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
            </svg>
          </span>
        </a>
      </div>
    </transition>
  </div>
</template>

<style>
/* the Ecosystem entry in the nav config exists for the mobile nav screen;
   on desktop this mega menu replaces it, so hide the default flyout */
@media (min-width: 960px) {
  .VPNavBarMenu .VPFlyout:last-of-type {
    display: none;
  }
}
</style>

<style scoped>
.eco-menu {
  position: relative;
  display: none;
  align-items: center;
  height: var(--vp-nav-height);
}

@media (min-width: 960px) {
  .eco-menu {
    display: flex;
  }
}

.eco-button {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 12px;
  font-size: 13px;
  font-weight: 500;
  line-height: var(--vp-nav-height);
  color: var(--vp-c-text-1);
  transition: color 0.25s;
  white-space: nowrap;
}

.eco-button:hover {
  color: var(--vp-c-brand-1);
}

.eco-chevron {
  width: 12px;
  height: 12px;
  opacity: 0.6;
  transition: transform 0.2s;
}

.eco-chevron-open {
  transform: rotate(180deg);
}

.eco-panel {
  white-space: normal;
  text-align: left;
  position: absolute;
  top: calc(var(--vp-nav-height) - 8px);
  left: 50%;
  transform: translateX(-50%);
  width: 560px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0;
  background-color: var(--vp-c-bg-elv, var(--vp-c-bg));
  box-shadow: var(--vp-shadow-3);
  z-index: 100;
}

.eco-fade-enter-active,
.eco-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.eco-fade-enter-from,
.eco-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-4px);
}
</style>
