<script setup>
import { onMounted, ref } from 'vue';

import SponsorCard from './SponsorCard.vue';

const sponsors = ref([]);
const { group } = defineProps({
  group: {
    type: String,
    default: 'sponsor',
  },
});

onMounted(async () => {
  const data = await (await fetch(`${window.location.origin}/sponsors.json`)).json();
  sponsors.value = data[group];
});
</script>

<template>
  <div class="flex flex-wrap justify-center items-center gap-8 md:gap-12">
    <SponsorCard v-for="sponsor in sponsors" :key="sponsor.name" v-bind="sponsor" />
  </div>
</template>
