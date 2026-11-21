<script setup lang="ts">
// GitHub button with the star count, read at build time (lib/stats.data.ts).
// Replaces the plain GitHub icon in the desktop nav; mobile keeps the icon.
import { data as stats } from '../../lib/stats.data';

const stars = stats.stars
  ? stats.stars >= 1000
    ? (Math.floor(stats.stars / 100) / 10).toFixed(1).replace(/\.0$/, '') + 'k'
    : String(stats.stars)
  : null;
</script>

<template>
  <a href="https://github.com/leafsphp/leaf" target="_blank" rel="noopener" class="gh-stars"
    :aria-label="stars ? `Leaf on GitHub, ${stars} stars` : 'Leaf on GitHub'">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.7 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.7 18.3.5 12 .5z" />
    </svg>
    <span v-if="stars">{{ stars }}</span>
  </a>
</template>

<style scoped>
.gh-stars {
  display: none;
  align-items: center;
  gap: 7px;
  margin-left: 4px;
  padding: 6px 8px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1) !important;
  text-decoration: none !important;
  white-space: nowrap;
  transition: background 0.15s;
}
.gh-stars:hover {
  background: var(--vp-c-default-soft);
}
@media (min-width: 960px) {
  .gh-stars {
    display: inline-flex;
  }
}
</style>
