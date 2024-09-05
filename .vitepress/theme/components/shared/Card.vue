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
  <component :is="as" style="transition: ease all .6s;"
    class="cursor-pointer border border-[#0b2a32] hover:border-[#2b4a52] rounded-xl bg-[var(--vp-c-bg-alt)]">
    <slot></slot>
  </component>
</template>
