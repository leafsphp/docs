<script setup>
const { number } = defineProps(['number'])
</script>

<template>
  <span
    class="bg-[var(--vp-c-bg-alt)] inline-flex items-center justify-center rounded-full text-gray-700 dark:text-gray-300 text-lg h-10 w-10 mr-1 flex-none font-normal">
    {{ number }}
  </span>
</template>
