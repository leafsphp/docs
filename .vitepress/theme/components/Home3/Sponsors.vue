<script setup lang="ts">
// Supporters (services and credits, not cash). Same list the rest of the site uses (src/public/sponsors.json), read at build time.
import { data } from '../../lib/sponsors.data';

const sponsors: { name: string; url: string; img: string }[] = data.sponsor || [];

// sponsors plus the "Your logo here" tile: one row on wide screens,
// two even rows on tablets and small laptops
const tiles = sponsors.length + 1;
const gridVars = { '--sp-one': tiles, '--sp-two': Math.ceil(tiles / 2) };
</script>

<template>
  <section>
    <div class="lf-pad lf-sp-head">
      <div style="max-width: 640px">
        <h2 class="lf-sp-title">Free, open source, and backed by the community</h2>
        <p class="lf-lede" style="font-size: 17px">
          These companies give Leaf free hosting, tools and credits. Support from people like you funds new modules, better docs, and help when you're stuck.
        </p>
      </div>
      <a href="/support/" class="lf-btn lf-btn-ink"
        style="padding: 12px 18px; border-radius: 12px; font-size: 15px">Support Leaf →</a>
    </div>
    <div class="lf-grid lf-sp-grid" :style="gridVars">
      <a v-for="s in sponsors" :key="s.name" :href="s.url" target="_blank" rel="noopener" class="lf-sp">
        <img :src="s.img" alt="" width="40" height="40" loading="lazy" />{{ s.name }}
      </a>
      <a href="/support/" class="lf-sp lf-sp-cta" :class="{ 'lf-sp-cta-half': sponsors.length % 2 === 1 }">Your logo here →</a>
    </div>
  </section>
</template>

<style scoped>
.lf-sp-head {
  padding-top: 72px;
  padding-bottom: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
}
.lf-sp-title {
  margin-bottom: 12px !important;
  font-size: clamp(32px, 3.6vw, 44px);
  line-height: 1.05 !important;
  letter-spacing: -0.035em;
  font-weight: 600;
}
.lf-sp-grid {
  grid-template-columns: repeat(var(--sp-two), 1fr);
  border-top: 1px solid var(--lf-line);
}
.lf-sp {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-size: 26px;
  font-weight: 700 !important;
  letter-spacing: -0.02em;
}
.lf-sp img {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  object-fit: cover;
  filter: grayscale(1);
  opacity: 0.7;
  transition: filter 0.2s, opacity 0.2s;
}
.lf-sp:hover img {
  filter: none;
  opacity: 1;
}
.lf-sp-cta {
  font-family: inherit;
  font-size: 15px;
  font-weight: 600 !important;
  letter-spacing: 0;
  color: var(--lf-link) !important;
}

@media (min-width: 1280px) {
  .lf-sp-grid {
    grid-template-columns: repeat(var(--sp-one), 1fr);
  }
}

@media (max-width: 640px) {
  .lf-sp-head {
    padding-top: 56px;
    padding-bottom: 28px;
  }
  .lf-sp-grid {
    grid-template-columns: 1fr 1fr;
  }
  .lf-sp {
    height: 84px;
    gap: 9px;
    font-size: 19px;
  }
  .lf-sp img {
    width: 28px;
    height: 28px;
    border-radius: 7px;
  }
  .lf-sp-cta {
    grid-column: 1 / -1;
    height: 56px;
  }
  /* odd sponsor count: the CTA fills the empty half of the last row */
  .lf-sp-cta.lf-sp-cta-half {
    grid-column: auto;
    height: 84px;
  }
}
</style>
