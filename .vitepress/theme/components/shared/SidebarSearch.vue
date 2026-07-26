<script setup lang="ts">
// Proxy button: forwards to VitePress' real (hidden-on-desktop) navbar search,
// so the search modal + ⌘K flow stay stock.
const openSearch = () => {
  const button = document.querySelector(
    '.VPNavBarSearch button',
  ) as HTMLElement | null;

  button?.click();
};
</script>

<template>
  <button type="button" class="sidebar-search" @click="openSearch">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
    <span>Search</span>
    <kbd>⌘K</kbd>
  </button>
</template>
