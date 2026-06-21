<script setup lang="ts">
import { computed, useId } from 'vue';

type StatusTone = 'new' | 'beta' | 'wip' | 'deprecated';

const props = withDefaults(defineProps<{
  label: string;
  title: string;
  description: string;
  tone?: StatusTone;
  meta?: string;
  href?: string;
  linkText?: string;
}>(), {
  tone: 'new',
  meta: '',
  href: '',
  linkText: 'Learn more',
});

const toneClass = computed(() => `status-badge--${props.tone}`);
const disclosureId = `status-badge-${useId()}`;
</script>

<template>
  <span class="status-badge-root" :data-tone="tone">
    <input :id="disclosureId" class="status-badge-toggle" type="checkbox">
    <label
      :for="disclosureId"
      class="status-badge-trigger"
      :class="toneClass"
    >
      <span class="status-badge-dot" aria-hidden="true" />
      {{ label }}
    </label>
    <span class="status-badge-popover" role="status">
      <span class="status-badge-popover-head">
        <span class="status-badge-popover-kicker">{{ label }}</span>
      </span>
      <strong class="status-badge-title pb-2">{{ title }}</strong>
      <span class="status-badge-description pb-4">{{ description }}</span>
      <span v-if="meta || href" class="status-badge-footer !flex-row items-center justify-between">
        <span v-if="meta" class="status-badge-meta">{{ meta }}</span>
        <a v-if="href" :href="href" class="status-badge-link">{{ linkText }} →</a>
      </span>
    </span>
  </span>
</template>
