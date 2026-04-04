<script setup lang="ts">
import Button from '../shared/Button.vue';
</script>

<template>
  <div class="flex justify-center item-center md:py-48 bg-[var(--vp-c-bg-alt)]">
    <section class="grid grid-cols-1 gap-y-8 md:grid-cols-2">
      <img src="/images/community.svg" class="mt-16 md:mt-0" />

      <div class="text-center px-0 md:px-[16%] flex flex-col items-center justify-center mb-4">
        <h1 class="!text-3xl mb-2">Join other people building real products</h1>

        <p>
          Build alongside developers shaping how modern products are made. Share what you're building, get help when
          you're stuck, and grow with people who move fast.
        </p>

        <Button as="a" href="https://discord.gg/Pkrm9NJPE3" class="!text-white fill-white">
          <span>Start building with us</span>
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24">
            <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
          </svg>
        </Button>
      </div>
    </section>
  </div>
</template>
