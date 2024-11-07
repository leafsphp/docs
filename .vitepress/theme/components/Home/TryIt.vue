<script setup lang="ts">
import Button from '../shared/Button.vue';
</script>

<template>
  <div class="flex justify-center item-center py-48 bg-[var(--vp-c-bg-alt)]">
    <section class="flex flex-col justify-center items-center">
      <div class="text-center mb-24">
        <h1 class="!text-3xl md:!text-5xl mb-8">Try it out️</h1>
        <p class="md:px-[22%]">
          We’ve said enough about Leaf and what it can do. Why don’t you try changing the code below and see what you
          can
          create. If you want to follow a guided tutorial in our sandbox, you can check out the interactive tutorial
          🏄‍♀
        </p>

        <Button as="a" href="/tutorial/" class="!text-white fill-white">
          <span>Go to tutorial</span>
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24">
            <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
          </svg>
        </Button>
      </div>

      <iframe src="https://sandbox.leafphp.dev/"
        class="w-full min-h-[70vh] border border-[var(--vp-c-brand-1)] rounded-lg" />
    </section>
  </div>
</template>
