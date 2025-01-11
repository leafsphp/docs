<script setup>
import VideoModal from '../shared/VideoModal.vue';
import Button from '../shared/Button.vue';
import Particles from './Particles.vue';
</script>

<template>
  <div class="flex flex-col min-h-[90vh] justify-center items-center">
    <Particles :accelerate="false" class="absolute top-0" />

    <h1 class="text-center !font-bold !text-4xl md:!text-7xl">
      Elegant PHP <br>
      <span>for Modern Developers</span>
    </h1>
    <p class="text-center max-w-[600px] p-2 md:p-0 text-sm md:text-base">
      Leaf is a lightweight and user-friendly framework designed for quick and efficient development. It features a
      zero-config setup and an ecosystem of tools, making it ideal for building scalable apps with ease.
    </p>
    <div class="gradient"></div>
    <div class="flex justify-center items-center mt-6 gap-4">
      <VideoModal videoUrl="https://www.youtube.com/embed/wvDELSI7fHg" buttonText="Intro to Leaf" />

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

.gradient {
  left: 0;
  top: 25vh;
  width: 100%;
  opacity: .4;
  z-index: -1;
  height: 30vh;
  position: absolute;
  filter: blur(180px);
  background: radial-gradient(50% 50% at 50% 50%, #42d392 50%, var(--vp-c-brand-2) 0, #000c2000);
}
</style>
