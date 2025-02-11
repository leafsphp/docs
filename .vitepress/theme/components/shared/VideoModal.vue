<script setup>
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from '@headlessui/vue';

import Button from './Button.vue';

const isOpen = ref(false);

function closeModal() {
  isOpen.value = false;
}

function openModal() {
  isOpen.value = true;
}

const {
  buttonText,
  showIcon,
} = defineProps({
  videoUrl: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    default: 'Watch video',
  },
  showIcon: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <Button type="button" @click="openModal"
    class="pr-4 py-2 text-sm text-white">
    <svg v-if="showIcon" class="icon-play w-[25px] h-[25px]" aria-labelledby="simpleicons-play-icon" role="img" viewBox="0 0 100 100"
      fill="#FFFFFF">
      <title id="simpleicons-play-icon" lang="en">Play icon</title>
      <path
        d="M50,3.8C24.5,3.8,3.8,24.5,3.8,50S24.5,96.2,50,96.2S96.2,75.5,96.2,50S75.5,3.8,50,3.8z M71.2,53.3l-30.8,18  c-0.6,0.4-1.3,0.5-1.9,0.5c-0.6,0-1.3-0.1-1.9-0.5c-1.2-0.6-1.9-1.9-1.9-3.3V32c0-1.4,0.8-2.7,1.9-3.3c1.2-0.6,2.7-0.6,3.8,0  l30.8,18c1.2,0.6,1.9,1.9,1.9,3.3S72.3,52.7,71.2,53.3z">
      </path>
    </svg>

    {{ buttonText }}
  </Button>

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-[9999999]">
      <div class="fixed inset-0 bg-black/70" aria-hidden="true" />

      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="w-[90vw] max-w-[1280px] p-2 h-[90vh] transform overflow-hidden rounded-2xl bg-[var(--vp-c-bg)] text-left align-middle shadow-xl transition-all">
              <iframe :src="videoUrl" class="w-full h-full rounded-xl" frameborder="0" webkitallowfullscreen
                mozallowfullscreen allowfullscreen allow="autoplay"></iframe>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
