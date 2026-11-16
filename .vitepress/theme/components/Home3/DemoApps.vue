<script setup lang="ts">
import { apps } from './demo-apps';

defineProps<{ app: string }>();
</script>

<!-- Finished-app mocks revealed by the demo slider. Each has its own palette. -->
<template>
  <div v-for="(a, key) in apps" v-show="app === key" :key="key" class="lf-app" :style="a.style" v-html="a.html" />
</template>
