<script setup>
import { onMounted, ref } from 'vue';

import SponsorCard from '../SponsorCard.vue';

const sponsors = ref([]);

onMounted(async () => {
  const data = await (await fetch(`${window.location.origin}/sponsors.json`)).json();
  sponsors.value = data.sponsor;
});
</script>

<template>
  <div class="flex justify-center item-center py-48">
    <section class="flex flex-col justify-center items-center">
      <div class="text-center mb-24">
        <h1 class="!text-5xl mb-8">Leaf is all of us</h1>
        <p class="px-[22%]">
          Leaf is fully community backed. Your donations go a long way to help us keep Leaf running and keep up with the
          demand associated with the growth of our tools. Here are our top sponsors ❤️
        </p>
      </div>

      <div class="grid grid-cols-4 gap-1 w-2/3">
        <SponsorCard v-for="sponsor in sponsors" :key="sponsor.name" v-bind="sponsor" />
      </div>
    </section>
  </div>
</template>
