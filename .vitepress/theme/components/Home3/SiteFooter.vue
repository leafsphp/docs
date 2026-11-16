<script setup lang="ts">
import LeafMark from './LeafMark.vue';

const cols = [
  {
    title: 'Product',
    links: [
      ['Docs', '/docs/'],
      ['Why Leaf 5', 'https://blog.leafphp.dev/posts/leaf-5'],
      ['Modules', '/docs/modules'],
      ['Agents and AI', '/docs/ai'],
    ],
  },
  {
    title: 'Community',
    links: [
      ['Discord', 'https://discord.gg/Pkrm9NJPE3'],
      ['Blog', 'https://blog.leafphp.dev'],
      ['X', 'https://x.com/leafphp'],
      ['Team', '/community/team'],
    ],
  },
  {
    title: 'Support',
    links: [
      ['Sponsor Leaf', 'https://opencollective.com/leaf'],
      ['Premium sponsorship', '/support/premium-sponsorship'],
      ['GitHub', 'https://github.com/leafsphp/leaf'],
    ],
  },
];
</script>

<template>
  <footer class="lf-pad lf-foot">
    <div style="flex: 1 1 260px">
      <span class="lf-foot-brand"><LeafMark :size="26" />Leaf</span>
      <p style="margin-top: 10px; line-height: 1.6">Free, open source and community backed.</p>
    </div>
    <div v-for="c in cols" :key="c.title" class="lf-foot-col">
      <span style="color: var(--lf-ink); font-weight: 600">{{ c.title }}</span>
      <a v-for="l in c.links" :key="l[0]" :href="l[1]" :target="l[1].startsWith('http') ? '_blank' : undefined"
        :rel="l[1].startsWith('http') ? 'noopener' : undefined">{{ l[0] }}</a>
    </div>
  </footer>
</template>

<style scoped>
.lf-foot {
  padding-top: 48px;
  padding-bottom: 48px;
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
  font-size: 14px;
  color: var(--lf-muted);
}
.lf-foot-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: var(--lf-ink);
}
.lf-foot-col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.lf-foot-col a:hover {
  color: var(--lf-link) !important;
}
</style>
