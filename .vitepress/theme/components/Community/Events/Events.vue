<script setup lang="ts">
import { computed, ref } from 'vue';
import { Event } from './event';
import events from './events.json';
import previousEvents from './previous-events.json';
import EventCard from './EventCard.vue';

const query = ref('');

function includes(a: string, b: string) {
  return a.toLowerCase().includes(b.toLowerCase());
}

function filter(p: Event): boolean {
  if (!query.value) return true;
  return (
    includes(p.name, query.value) ||
    p.region.some((r) => includes(r, query.value)) ||
    p.location.some((r) => includes(r, query.value))
  );
}

const allEvents = [...(events as Event[]), ...(previousEvents as Event[])];
const filtered = computed(() => allEvents.filter(filter));
const hasUpcoming = (events as Event[]).length > 0;
</script>

<template>
  <section id="events" class="home-section home-section--spacious">
    <header class="home-section__header">
      <p class="home-section__eyebrow">Events</p>
      <h2 class="home-section__title !mt-0 !pt-0">Where the community meets</h2>
      <p class="home-section__subtitle">
        Leaf events, conferences, and meetups happening around the world.
      </p>
    </header>

    <!-- Empty state — no upcoming events -->
    <template v-if="!hasUpcoming">
      <div class="home-panel p-8 text-center md:p-12">
        <span class="home-marker home-marker--tl" aria-hidden="true" />
        <span class="home-marker home-marker--tr" aria-hidden="true" />
        <span class="home-marker home-marker--bl" aria-hidden="true" />
        <span class="home-marker home-marker--br" aria-hidden="true" />

        <div class="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--home-border)] bg-[var(--home-surface-muted)] text-[var(--home-muted)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>

        <p class="home-section__title !text-lg !mb-2">No upcoming events</p>
        <p class="home-section__subtitle !text-sm">
          Check back soon — or look through past events below.
        </p>
      </div>

      <!-- Past events -->
      <div class="mt-12" v-if="(previousEvents as Event[]).length">
        <p class="home-section__eyebrow mb-6">Past events</p>

        <!-- Search -->
        <div class="home-panel mb-6 flex items-center gap-3 overflow-hidden px-4 py-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="shrink-0 text-[var(--home-muted)]" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            v-model="query"
            placeholder="Search by name or location…"
            class="w-full bg-transparent text-sm text-[var(--home-fg)] placeholder:text-[var(--home-muted)] outline-none"
          />
        </div>

        <div v-if="filtered.length" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <EventCard v-for="event in filtered" :key="event.name" :data="event" />
        </div>

        <p v-else class="text-center text-sm text-[var(--home-muted)] py-8">
          No events match "{{ query }}".
        </p>
      </div>
    </template>

    <!-- Upcoming events -->
    <template v-else>
      <!-- Search -->
      <div class="home-panel mb-8 flex items-center gap-3 overflow-hidden px-4 py-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="shrink-0 text-[var(--home-muted)]" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          v-model="query"
          placeholder="Search by name or location…"
          class="w-full bg-transparent text-sm text-[var(--home-fg)] placeholder:text-[var(--home-muted)] outline-none"
        />
      </div>

      <div v-if="filtered.length" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <EventCard v-for="event in filtered" :key="event.name" :data="event" />
      </div>

      <p v-else class="text-center text-sm text-[var(--home-muted)] py-8">
        No events match "{{ query }}".
      </p>
    </template>
  </section>
</template>
