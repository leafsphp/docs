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
  <a :href="url" target="_blank" style="transition: ease all .6s;"
    class="cursor-pointer border border-[#0b2a32] hover:border-[#2b4a52] rounded-xl bg-[var(--vp-c-bg-alt)] flex flex-col justify-center items-center text-center !text-inherit p-4 ![text-decoration:none]">
    <img v-if="!!img" :src="img" alt="User Image" class="h-[75px] w-[75px] object-cover rounded-[999px] mb-2" />
    <p class="text-sm !m-0">{{ name }}</p>
  </a>
</template>
