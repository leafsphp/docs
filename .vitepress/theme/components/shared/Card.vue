<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'

interface Props {
  as?: string
}

withDefaults(defineProps<Props>(), {
  as: 'div',
})
</script>

<template>
  <component
    :is="as"
    style="transition: background-color 0.2s ease, border-color 0.2s ease"
    class="cursor-pointer rounded-xl border border-[var(--vp-c-border-alt)] bg-[var(--vp-c-bg-alt)] hover:border-[var(--vp-c-border-alt-hovered)]"
  >
    <slot />
  </component>
</template>
