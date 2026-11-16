<script setup lang="ts">
// Same list the rest of the site uses (src/public/sponsors.json), read at build time.
import { data } from '../../lib/sponsors.data';

const sponsors: { name: string; url: string; img: string }[] = data.sponsor || [];
</script>

<template>
  <section>
    <div class="lf-pad lf-sp-head">
      <div style="max-width: 640px">
        <h2 class="lf-sp-title">Free, open source, and backed by the community</h2>
        <p class="lf-lede" style="font-size: 17px">
          Sponsors keep Leaf moving: new modules, better docs, and people who answer your questions.
        </p>
      </div>
      <a href="https://opencollective.com/leaf" target="_blank" rel="noopener" class="lf-btn lf-btn-ink"
        style="padding: 12px 18px; border-radius: 12px; font-size: 15px">Become a sponsor →</a>
    </div>
    <div class="lf-grid lf-sp-grid">
      <a v-for="s in sponsors" :key="s.name" :href="s.url" target="_blank" rel="noopener" class="lf-sp">
        <img :src="s.img" alt="" width="40" height="40" loading="lazy" />{{ s.name }}
      </a>
      <a href="https://opencollective.com/leaf" target="_blank" rel="noopener" class="lf-sp lf-sp-cta">Your logo here →</a>
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
</style>
