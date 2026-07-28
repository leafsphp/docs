<script setup>
const {
  name,
  img,
  url,
} = defineProps({
  url: String,
  name: String,
  img: String,
  page: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <a :href="url" target="_blank"
    class="group flex flex-col items-center gap-3 ![text-decoration:none] !text-inherit transition-all duration-300 hover:-translate-y-1">
    <div
      class="w-16 h-16 md:w-20 md:h-20 rounded-none overflow-hidden bg-white dark:bg-white/10 p-2.5 ring-1 ring-gray-200 dark:ring-white/10 group-hover:ring-[var(--vp-c-brand)] group-hover:shadow-lg group-hover:shadow-[var(--vp-c-brand)]/10 transition-all duration-300">
      <img v-if="!!img" :src="img" :alt="name" class="w-full h-full object-contain rounded-none" loading="lazy" />
    </div>
    <span
      class="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-[var(--vp-c-brand)] transition-colors">{{
        name }}</span>
  </a>
</template>
