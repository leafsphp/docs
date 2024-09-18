<template>
  <Listbox v-model="selectedItem">
    <div class="relative w-full">
      <ListboxButton
        class="w-full flex items-center bg-[var(--vp-c-bg-alt)] cursor-default rounded-lg py-3 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
        <span class="pointer-events-none inset-y-0 right-0 flex items-center pr-2">
          <ChevronsUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
        <span class="block truncate text-lg">{{ selectedItem.text }} ({{ currentStepIndex }}/{{ totalSteps }})</span>
      </ListboxButton>

      <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <ListboxOptions
          class="absolute mt-1 max-h-60 w-full bg-[var(--vp-c-bg-alt)] overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
          <ListboxOption v-slot="{ active, selected }" v-for="item in items" :key="item.name" :value="item"
            @click.prevent="navigate(item)"
            class="flex items-center ui-active:bg-[var(--vp-c-brand)] ui-active:text-white px-4">
            <span :class="[
              selected ? 'font-medium' : 'font-normal',
              'block truncate relative cursor-default select-none py-2 ',
            ]">{{ item.text }}</span>
            <CheckIcon class="hidden ui-selected:block ml-auto" :size="16" />
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup>
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-vue-next';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import { ref, watch } from 'vue';

const { items, currentStepIndex, totalSteps } = defineProps({
  items: Array,
  currentStepIndex: Number,
  totalSteps: Number,
});

const selectedItem = ref(items[currentStepIndex ? currentStepIndex - 1 : 0]);

watch(() => currentStepIndex, () => {
  selectedItem.value = items[currentStepIndex - 1];
});

const navigate = (item) => {
  location.href = item.link;
};
</script>
