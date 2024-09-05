<script setup>
const {
  title,
  description,
  image,
  link,
} = defineProps({
  link: String,
  title: String,
  description: String,
  image: String,
});

const handleNavigate = () => {
  if (link) {
    window.location.href = link;
  }
};
</script>

<template>
  <div style="transition: ease all .6s;"
    class="cursor-pointer border border-[#0b2a32] hover:border-[#2b4a52] rounded-xl bg-[var(--vp-c-bg-alt)]"
    :class="{ 'row-span-2': title === '30+ modules' }" @click="handleNavigate">
    <img v-if="!!image" :src="image" alt="Data Card" class="w-full h-[250px] object-cover"
      :class="{ 'h-[200px]': title === '30+ modules' }" />
    <div class="text-left p-6">
      <p class="font-bold !m-0">{{ title }}</p>
      <p class="text-xs text-[#bebebe] !m-0">{{ description }}</p>
    </div>
  </div>
</template>
