<script setup>
import VideoModal from '../shared/VideoModal.vue';
import Button from '../shared/Button.vue';
</script>

<template>
  <div class="flex flex-col min-h-[90vh] justify-center items-center">
    <h1 class="text-center !font-bold !text-4xl md:!text-7xl">
      Elegant PHP <br>
      <span>for Modern Developers</span>
    </h1>
    <p class="text-center max-w-[600px]">
      Leaf is a lightweight and user-friendly framework designed for quick and efficient development. It features a
      zero-config setup and an ecosystem of tools, making it ideal for building scalable apps with ease.
    </p>
    <div class="flex justify-center items-center mt-6 gap-4">
      <VideoModal videoUrl="https://www.youtube.com/embed/KfClnH-fQz8" buttonText="Intro to Leaf" />

      <Button as="a" href="/docs/" variant="ghost">
        <span>Get Started</span>
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24">
          <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
        </svg>
      </Button>
    </div>
  </div>
</template>

<style scoped>
h1 span {
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  border-radius: 0.5rem;
  background-color: var(--vp-c-text-code);
  color: #fff;
  text-decoration: none;
  transition: background-color 0.2s;
}
</style>
