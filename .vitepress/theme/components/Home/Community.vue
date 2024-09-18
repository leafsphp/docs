<script setup lang="ts">
import Button from '../shared/Button.vue';
</script>

<template>
  <div class="flex justify-center item-center md:py-48 bg-[var(--vp-c-bg-alt)]">
    <section class="grid grid-cols-1 gap-y-8 md:grid-cols-2">
      <img src="/images/community.svg" class="mt-16 md:mt-0" />

      <div class="text-center mb-24 px-0 md:px-[16%]">
        <h1 class="!text-3xl mb-2 md:mb-8">Dig into our vibrant
          community with us.</h1>
        <p>
          Our first community meet up was in 2023 which we held together with SeevCash. Since then our community has
          gotten bigger, growing together with Leaf and all the tools in the ecosystem. Join our young but vibrant
          community and the Leaf team as we discuss our insights from the past year and what’s to come in the next
          couple of years 🚀
        </p>
        <Button as="a" href="/community/" class="!text-white fill-white">
          <span>Join the community</span>
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24">
            <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
          </svg>
        </Button>
      </div>
    </section>
  </div>
</template>
