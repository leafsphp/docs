<script setup>
import SponsorGroup from '../shared/SponsorGroup.vue';
</script>

<template>
  <div class="flex justify-center item-center py-48">
    <section class="flex flex-col justify-center items-center">
      <div class="text-center mb-10">
        <h1 class="!text-5xl font-bold mb-8">Wall of Fame</h1>
        <p class="px-[22%]">
          These are the heroes who have made Leaf what it is today. We are grateful for their contributions and support ❤️
        </p>
      </div>

      <SponsorGroup group="code" class="w-full grid-cols-5" />
    </section>
  </div>
</template>
