<script setup lang="ts">
// Section eyebrow above a docs page title, in the Leaf eyebrow style
// (mono, uppercase, accent, muted "// " prefix). The label is the sidebar
// group the current page lives in, so it never drifts from the sidebar.
import { computed } from 'vue';
import { useData, useRoute } from 'vitepress';
import { useSidebar } from 'vitepress/theme';

const route = useRoute();
const { frontmatter } = useData();
const { sidebarGroups } = useSidebar();

const clean = (p: string) => p.replace(/(index)?\.html$/, '').replace(/\/$/, '');
const strip = (t: string) => t.replace(/<[^>]*>/g, '').trim();

const label = computed(() => {
  if (frontmatter.value.eyebrow === false) return null;
  if (typeof frontmatter.value.eyebrow === 'string') return frontmatter.value.eyebrow;
  const here = clean(route.path);
  const has = (items: any[] = []): boolean =>
    items.some((i) => (i.link && clean(i.link) === here) || has(i.items));
  const group = (sidebarGroups.value as any[]).find((g) => has(g.items));
  return group?.text ? strip(group.text) : null;
});
</script>

<template>
  <p v-if="label" class="doc-eyebrow"><span aria-hidden="true">// </span>{{ label }}</p>
</template>

<style scoped>
.doc-eyebrow {
  margin: 0 0 12px;
  font-family: var(--vp-font-family-mono);
  font-size: 11.5px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
}
.doc-eyebrow span {
  color: var(--vp-c-text-3);
}
</style>
