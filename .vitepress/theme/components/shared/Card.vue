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
    class="cursor-pointer border border-[var(--vp-c-border-alt)] hover:border-[var(--vp-c-border-alt-hovered)] rounded-xl bg-[var(--vp-c-bg-alt)]">
    <slot></slot>
  </component>
</template>
