<script setup lang="ts">
// Top-level switch at the head of the docs sidebar. Plain text on the same
// rail as the rest of the sidebar (no coloured icon tiles), active page in
// the soft flame pill.
import { computed } from 'vue';
import { useRoute } from 'vitepress';

const route = useRoute();

const links = [
  { name: 'Documentation', href: '/docs/' },
  { name: 'Learn', href: '/learn/' },
  { name: 'API Reference', href: '/api-reference' },
  { name: 'Screencasts', href: 'https://www.youtube.com/@leafphp', external: true },
];

const active = computed(() => links.find((l) => !l.external && route.path.startsWith(l.href))?.href);
</script>

<template>
  <ul class="sb-top">
    <li v-for="link in links" :key="link.name">
      <a :href="link.href" :class="{ on: active === link.href }"
        v-bind="link.external ? { target: '_blank', rel: 'noopener' } : {}">
        {{ link.name }}
        <svg v-if="link.external" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M7 17L17 7M8 7h9v9" />
        </svg>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.sb-top {
  list-style: none;
  margin: 0 0 22px;
  padding: 0;
}
.sb-top a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1px -8px;
  padding: 7px 8px;
  border-radius: var(--leaf-r-sm, 10px);
  font-size: 14.5px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: background-color 0.14s, color 0.14s;
}
.sb-top a:hover {
  background: var(--leaf-tint);
}
.sb-top a.on {
  background: color-mix(in srgb, var(--vp-c-brand-1) 11%, transparent);
  color: var(--vp-c-brand-1);
}
.sb-top svg {
  color: var(--vp-c-text-3);
}
</style>
