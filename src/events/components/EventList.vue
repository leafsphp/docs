<script setup lang="ts">
import { computed } from 'vue'
import PartnerCard from './PartnerCard.vue'
import { Partner } from './type'

const { filter, partners } = defineProps<{
  filter?: (p: Partner) => boolean | undefined;
  partners: Partner[];
}>()

const filtered = computed(() =>
  filter ? (partners as Partner[]).filter(filter) : (partners as Partner[])
)
</script>

<template>
  <div class="event-list pb:_5">
    <PartnerCard v-for="p in filtered" :key="p.name" :data="p" />
  </div>
</template>

<style scoped>
.event-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
