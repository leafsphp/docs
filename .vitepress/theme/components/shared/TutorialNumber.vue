<script setup>
const { number } = defineProps(['number'])
</script>

<template>
  <span
    class="bg-gray-900 dark:bg-[var(--vp-c-bg-alt)] outline outline-gray-100/10 inline-flex items-center justify-center rounded-full text-white dark:text-gray-300 text-lg h-10 w-10 mr-1 flex-none font-normal">
    {{ number }}
  </span>
</template>
