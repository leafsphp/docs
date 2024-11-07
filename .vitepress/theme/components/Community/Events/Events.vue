<script setup lang="ts">
import { computed, ref } from 'vue';
import { Search } from 'lucide-vue-next';

import { Event } from './event';
import events from './events.json';
// import events from './previous-events.json';
import EventCard from './EventCard.vue';

let query = ref('');

function filter(p: Event): boolean {
  return (
    includes(p.name, query.value) || p.region.some((r) => includes(r, query.value)) || p.location.some((r) => includes(r, query.value))
  );
}

function includes(a: string, b: string) {
  return a.toLowerCase().includes(b.toLowerCase());
}

const filtered = computed(() =>
  filter ? (events as Event[]).filter(filter) : (events as Event[])
)
</script>

<template>
  <div class="my-40" v-if="events.length">
    <div class="container">
      <div class="flex items-center border-b border-[var(--vp-c-brand)] mb-10 pb-4">
        <Search class="icon" />
        <input placeholder="Search events by name or location" v-model="query" />
      </div>

      <div class="grid grid-cols-3 gap-2" v-if="filtered?.length">
        <EventCard v-for="p in filtered" :key="p.name" :data="p" />
      </div>
    </div>
  </div>
</template>
