<script setup>
import SponsorGroup from '../shared/SponsorGroup.vue';
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

      <SponsorGroup class="w-2/3" />
    </section>
  </div>
</template>
