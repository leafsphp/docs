<script setup>
import Card from './Card.vue';

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
  <Card style="transition: ease all .8s;"
    class="cursor-pointer rounded-xl bg-[var(--vp-c-card-bg)]"
    :class="{ 'row-span-2': title === '30+ modules' }" @click="handleNavigate">
    <img v-if="!!image" :src="image" alt="Data Card" class="w-full h-[250px] object-cover"
      :class="{ 'h-[180px] hidden md:block': title === '30+ modules' }" />
    <div class="text-left p-6">
      <p class="font-bold !m-0">{{ title }}</p>
      <p class="text-xs text-[var(--vp-c-card-text-2)] !m-0">{{ description }}</p>
    </div>
  </Card>
</template>
