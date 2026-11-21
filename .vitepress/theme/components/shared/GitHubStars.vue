<script setup lang="ts">
// Right-hand nav utilities on desktop: GitHub (with the build-time star count
// from lib/stats.data.ts) and a sun/moon theme button in the same icon style.
// Replaces VitePress's GitHub social icon and appearance switch on desktop;
// the mobile nav screen keeps both.
import { inject } from 'vue';
import { useData } from 'vitepress';
import { data as stats } from '../../lib/stats.data';

const { isDark } = useData();
const toggleAppearance = inject('toggle-appearance', () => {
  isDark.value = !isDark.value;
});

const stars = stats.stars
  ? stats.stars >= 1000
    ? (Math.floor(stats.stars / 100) / 10).toFixed(1).replace(/\.0$/, '') + 'k'
    : String(stats.stars)
  : null;
</script>

<template>
  <div class="nav-utils">
    <a href="https://github.com/leafsphp/leaf" target="_blank" rel="noopener" class="nav-icon gh"
      :aria-label="stars ? `Leaf on GitHub, ${stars} stars` : 'Leaf on GitHub'">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path
          d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.7 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.7 18.3.5 12 .5z" />
      </svg>
      <span v-if="stars">{{ stars }}</span>
    </a>
    <button type="button" class="nav-icon" :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
      @click="toggleAppearance">
      <svg v-if="isDark" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg v-else width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.nav-utils {
  display: none;
  align-items: center;
  gap: 0;
  margin-left: 8px;
}
@media (min-width: 960px) {
  .nav-utils {
    display: flex;
  }
}
.nav-icon {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 34px;
  min-width: 34px;
  justify-content: center;
  padding: 0 8px;
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 500;
  color: var(--vp-c-text-2) !important;
  text-decoration: none !important;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.nav-icon:hover {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-1) !important;
}
</style>
