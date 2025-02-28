<script setup>
import VideoModal from '../shared/VideoModal.vue';
import Button from '../shared/Button.vue';
import Particles from './Particles.vue';
</script>

<template>
  <div class="flex flex-col min-h-[90vh] justify-center items-center relative">
    <Particles :accelerate="false" class="absolute -top-20" />

    <div class="sm:max-w-3xl lg:max-w-5xl xl:max-w-7xl w-full py-20 px-2 sm:px-10">
      <h1
        class="!text-4xl tracking-tighter text-balance max-lg:font-medium max-sm:px-4 sm:!text-5xl lg:!text-6xl xl:!text-8xl">
        Elegant PHP <br><span>Built for Makers</span>
      </h1>

      <p class="max-w-2xl text-lg/7 md:text-xl/7 font-medium text-gray-600 max-sm:px-4 dark:text-gray-400">
        Go from idea to launch with clean and elegant PHP that grows with you. With a zero-config setup and an ecosystem
        of powerful tools, Leaf helps you build and ship scalable apps—<b class="italic">fast</b>
      </p>

      <div class="mt-4 sm:mt-10">
        <div class="flex gap-4 max-sm:px-4">
          <Button as="a" href="/docs/" class="!text-white">
            <span>Start shipping</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24">
              <path fill="currentColor" d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
            </svg>
          </Button>
        </div>
      </div>

      <div class="mt-24">
        <div class="grid grid-cols-1 lg:grid-cols-3">
          <div class="bg-gray-950/5 p-2 lg:col-span-2 lg:-mx-px dark:bg-white/10 max-lg:hidden z-10">
            <div class="rounded-xl bg-[var(--vp-c-bg-alt)]">
              <div class="rounded-xl p-1 text-sm scheme-dark dark:inset-ring dark:inset-ring-white/10">
                <div class="flex gap-2 p-2"><span class="size-3 rounded-full bg-gray-950/5 dark:bg-white/20"></span><span
                    class="size-3 rounded-full bg-gray-950/5 dark:bg-white/20"></span><span class="size-3 rounded-full bg-gray-950/5 dark:bg-white/20"></span>
                </div>
                <pre>
  <code>$ composer global require leafs/cli:v4.0-beta</code>
  <code>$ leaf create app</code>
  <code>$ cd app</code>
                </pre>
              </div>
            </div>
          </div>

          <div
            class="relative">
            <div
              class="lg:absolute max-md:px-2 right-1/2 md:right-16 lg:top-1/2 lg:-translate-y-1/2 2xl:right-1/2 2xl:translate-x-[calc(50%-3rem)] z-20">
              <div
                class="rounded-3xl bg-black/5 p-2 outline outline-white/15 backdrop-blur-md dark:bg-white/10 w-full lg:w-[584px]"
                style="transform: none; transform-origin: 50% 50% 0px;">
                <iframe src="https://www.youtube.com/embed/wvDELSI7fHg?si=SJNoV_HMcjeRWoI8" title="YouTube video player"
                  frameborder="0" class="rounded-2xl w-full h-[330px] bg-black/5 dark:bg-white/10"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
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
