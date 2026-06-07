<script setup lang="ts">
import { computed } from 'vue';
import { Event } from './event';

const { data } = defineProps<{
  data: Event;
}>();

const { name, intro, location, region, flyer, topics, date, website } = data;

const formattedDate = computed(() => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});

const locationLabel = computed(() =>
  [...location, ...region].filter(Boolean).join(' · ')
);
</script>

<template>
  <a
    :href="website.url"
    target="_blank"
    rel="noopener noreferrer"
    class="home-card group flex flex-col overflow-hidden ![text-decoration:none] !text-inherit"
  >
    <!-- Flyer -->
    <div class="aspect-[16/9] overflow-hidden border-b border-[var(--home-border)]">
      <div
        class="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]"
        :style="{ backgroundImage: `url(${flyer})` }"
      />
    </div>

    <!-- Content -->
    <div class="flex flex-1 flex-col gap-3 p-5">
      <!-- Topics -->
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="topic in topics"
          :key="topic"
          class="inline-flex items-center rounded-full border border-[var(--home-border)] bg-[var(--home-surface-muted)] px-2.5 py-0.5 text-[0.6875rem] font-medium text-[var(--home-muted)]"
        >
          {{ topic }}
        </span>
      </div>

      <!-- Title -->
      <h3 class="!m-0 text-[0.9375rem] font-semibold leading-snug tracking-tight text-[var(--home-fg)] transition-colors group-hover:text-[var(--home-muted)]">
        {{ name }}
      </h3>

      <!-- Intro -->
      <p class="!m-0 flex-1 text-sm leading-relaxed text-[var(--home-muted)] line-clamp-3">
        {{ intro }}
      </p>

      <!-- Meta -->
      <div class="mt-auto flex flex-col gap-1.5 border-t border-[var(--home-border)] pt-4 text-xs text-[var(--home-muted)]">
        <span class="flex items-center gap-1.5">
          <!-- Calendar icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {{ formattedDate }}
        </span>
        <span class="flex items-center gap-1.5">
          <!-- Location icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {{ locationLabel }}
        </span>
      </div>
    </div>
  </a>
</template>
