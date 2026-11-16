<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 30 });
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 114 114" aria-hidden="true">
    <circle cx="56.693" cy="56.693" r="56.693" fill="#381a0d" />
    <path
      d="M59.805,57.461l22.579,-12.091l-13.317,31.834l-18.994,7.882c-0,-0 -13.304,-10.548 -13.311,-18.061c-0.01,-10.824 13.253,-46.885 13.253,-46.885l9.79,37.321Z"
      fill="#d4652e" />
    <path
      d="M50.08,85.086l-0.065,-64.946l10.121,36.782l22.248,-11.57c-0,0 -8.012,25.322 -13.396,31.944c-4.37,5.375 -18.908,7.79 -18.908,7.79Z"
      fill="#f5b731" />
  </svg>
</template>
