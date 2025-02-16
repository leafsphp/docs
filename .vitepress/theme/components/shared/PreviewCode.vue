<script setup>
import { computed, ref, useTemplateRef } from 'vue';

const tab = ref('preview');
const props = defineProps(['title']);
const marker = useTemplateRef('marker');
const preview = computed(() => tab.value === 'preview');

const repositionTabMarker = (el) => {
  marker.value.style.width = el.offsetWidth + 'px';
  marker.value.style.height = el.offsetHeight + 'px';
  marker.value.style.left = el.offsetLeft + 'px';
};

</script>

<template>
  <div class="relative z-30 w-full mb-5 rounded-lg">
    <div class="flex items-center justify-between mb-3">
      <h4 class="!m-0 !p-0">{{ props.title }}</h4>
      <div
        class="relative inline-grid items-center justify-center w-auto h-10 grid-cols-2 p-1 bg-[var(--vp-c-bg-alt)] rounded-xl select-none">
        <button type="button" @click="repositionTabMarker($event.target); tab = 'preview';"
          class="relative z-20 inline-flex items-center justify-center h-8 px-3 text-sm font-medium transition-all rounded-lg cursor-pointer whitespace-nowrap ring-offset-background">Preview</button>
        <button type="button" @click="repositionTabMarker($event.target); tab = 'code';"
          class="relative z-20 inline-flex items-center justify-center h-8 px-3 text-sm font-medium transition-all rounded-lg cursor-pointer whitespace-nowrap ring-offset-background">Code</button>
        <div ref="marker" class="absolute left-0 z-10 w-1/2 h-full duration-300 ease-out"
          style="width: 76px; height: 32px; left: 4px;">
          <div class="w-full h-full bg-[var(--vp-c-bg)] rounded-lg shadow-sm"></div>
        </div>
      </div>
    </div>

    <div class="relative">
      <div v-show="preview"
        class="relative border rounded-lg border-neutral-200 dark:border-gray-800 bg-[var(--vp-c-bg-alt)]">
        <slot name="preview"></slot>
      </div>

      <div v-show="!preview" :class="{ 'opacity-0 z-10': preview, 'z-30': !preview }"
        class="relative not-prose cursor-text z-10">
        <slot name="code"></slot>
      </div>
    </div>
  </div>
</template>
