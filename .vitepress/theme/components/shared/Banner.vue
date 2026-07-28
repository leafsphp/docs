<script setup lang="ts">
import { useElementSize } from '@vueuse/core';
import { ArrowRight } from 'lucide-vue-next';
import { ref, watchEffect } from 'vue';

defineProps<{
  version: string;
}>();

const el = ref<HTMLElement>();
// border-box: the layout offset must match the banner's full rendered height,
// padding included — content-box height leaves a see-through gap above the nav
const { height } = useElementSize(el, undefined, { box: 'border-box' });

watchEffect(() => {
  if (height.value) {
    document.documentElement.style.setProperty(
      '--vp-layout-top-height',
      `${height.value}px`
    );
  }
});

const dismiss = () => {
  localStorage.setItem(
    'leaf-version-banner',
    (Date.now() + 8.64e7 * 1).toString() // current time + 1 day
  );

  document.documentElement.classList.add('banner-dismissed');
};
</script>

<template>
  <div ref="el" class="banner">
    <div class="banner-inner">
      <p class="banner-copy">
        <span class="banner-kicker">Leaf 5 is here</span>
        <span class="banner-divider" aria-hidden="true">/</span>
        <span class="banner-detail">A product-first PHP framework for the AI era.</span>
      </p>

      <a href="/docs/why-leaf-5" class="banner-link">
        <span class="banner-link-full">Explore what's new</span>
        <span class="banner-link-short">What's new</span>
        <ArrowRight />
      </a>
    </div>

    <button type="button" class="banner-close" aria-label="Dismiss announcement" @click="dismiss">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path
          d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
      </svg>
    </button>
  </div>
</template>

<style>
.banner-dismissed {
  --vp-layout-top-height: 0px !important;
}

html {
  --vp-layout-top-height: 52px;
}

@media (min-width: 768px) {
  html {
    --vp-layout-top-height: 40px;
  }
}
</style>

<style scoped>
.banner-dismissed .banner {
  display: none;
}

.banner {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: var(--vp-z-index-layout-top);
  min-height: 40px;
  padding: 6px 48px;
  background: var(--vp-c-bg-alt);
  background-image: repeating-linear-gradient(
    315deg,
    rgba(232, 117, 58, 0.05) 0,
    rgba(232, 117, 58, 0.05) 1px,
    transparent 0,
    transparent 50%
  );
  background-size: 9px 9px;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-inner {
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: center;
  gap: 14px;
  font-size: 14px;
  line-height: 1.2;
}

.banner-copy {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-weight: 500;
  white-space: nowrap;
}

.banner-kicker {
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--vp-c-brand-1);
}

.banner-kicker::before {
  content: '// ';
  color: var(--vp-c-text-3);
}

.banner-detail {
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.banner-divider {
  color: var(--vp-c-text-3);
}

.banner-link {
  display: inline-flex;
  height: 26px;
  flex-shrink: 0;
  align-items: center;
  gap: 6px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 32%, transparent);
  background: color-mix(in srgb, var(--vp-c-brand-1) 10%, transparent);
  padding: 0 10px 0 12px;
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.banner-link:hover {
  background: color-mix(in srgb, var(--vp-c-brand-1) 18%, transparent);
  text-decoration: none;
}

.banner-link svg {
  width: 16px;
  height: 16px;
  margin: 0;
}

.banner-link-short {
  display: none;
}

.banner-close {
  position: absolute;
  top: 50%;
  right: 10px;
  display: inline-flex;
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  color: var(--vp-c-text-2);
  transform: translateY(-50%);
  transition: background-color 0.2s ease, color 0.2s ease;
}

.banner-close:hover {
  background: color-mix(in srgb, var(--vp-c-text-1) 8%, transparent);
  color: var(--vp-c-text-1);
}

.banner-close svg {
  width: 20px;
  height: 20px;
}

@media (max-width: 720px) {
  .banner {
    padding-right: 42px;
    padding-left: 10px;
  }

  .banner-inner {
    width: 100%;
    justify-content: space-between;
    gap: 10px;
  }

  .banner-detail,
  .banner-divider,
  .banner-link-full {
    display: none;
  }

  .banner-link-short {
    display: inline;
  }
}

@media (max-width: 360px) {
  .banner-link {
    padding-inline: 9px;
  }
}
</style>
