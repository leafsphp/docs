<script setup lang="ts">
import { products } from '../shared/ecosystem';

// soft tint per product, used behind the logo and as the hover wash
const tints: Record<string, string> = {
  Alchemy: '#fff3c9',
  Seedling: '#eef2d6',
  Fetch: '#e2ebfd',
  Auth: '#fde6d6',
  Db: '#fff1cc',
  Kata: '#fbe2ee',
  'Hana JS': '#ebe4fb',
};

const items = products.map((p) => ({
  ...p,
  tint: tints[p.name] || '#f3eee7',
  domain: p.url.replace(/^https?:\/\//, '').replace(/\/$/, ''),
}));

// a taste of the first-party modules (names as published, see /docs/modules)
const modules = ['billing', 'queue', 'mail', 'cache', 'csrf', 'lingo', 'schema', 'sitemap', 'inertia', 'redis'];
</script>

<template>
  <section>
    <div class="lf-pad lf-eco-head">
      <div style="max-width: 720px">
        <h2 class="lf-h2" style="margin-bottom: 14px">One team. A whole toolchain.</h2>
        <p class="lf-lede">
          Tools from the people who make Leaf, for testing, design systems, the command line, HTTP and the frontend.
        </p>
      </div>
      <a href="/docs/modules" class="lf-eco-all">See every module →</a>
    </div>

    <div class="lf-grid lf-eco">
      <a v-for="p in items" :key="p.name" :href="p.url" target="_blank" rel="noopener" class="lf-eco-item"
        :style="{ '--tint': p.tint }">
        <span class="lf-eco-top">
          <span class="lf-eco-logo"><img :src="p.logo" alt="" width="26" height="26" loading="lazy" /></span>
          <svg class="lf-eco-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M7 17L17 7M8 7h9v9" />
          </svg>
        </span>
        <span class="lf-eco-name">{{ p.name }}</span>
        <span class="lf-eco-tag">{{ p.tagline }}</span>
        <span class="lf-eco-desc">{{ p.menuDescription || p.description }}</span>
        <span class="lf-eco-domain">{{ p.domain }}</span>
      </a>

      <a href="/docs/modules" class="lf-eco-item lf-eco-mods">
        <span class="lf-eco-name" style="margin-top: 0">Plus 25+ modules</span>
        <span class="lf-eco-desc">First-party pieces that plug into any Leaf app the day you need them.</span>
        <span class="lf-eco-chips">
          <span v-for="m in modules" :key="m">{{ m }}</span>
        </span>
        <span class="lf-eco-domain lf-eco-browse">Browse modules →</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.lf-eco-head {
  padding-top: 88px;
  padding-bottom: 48px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
}
.lf-eco-all {
  font-size: 15px;
  font-weight: 600 !important;
  color: var(--lf-link) !important;
  white-space: nowrap;
}
.lf-eco {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid var(--lf-line);
}
.lf-eco-item {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 26px 28px 24px;
  min-height: 250px;
  transition: background 0.2s;
}
.lf-eco-item:hover {
  background: color-mix(in srgb, var(--tint) 45%, var(--lf-bg)) !important;
}
.dark .lf-eco-item:hover {
  background: color-mix(in srgb, var(--tint) 7%, var(--lf-bg)) !important;
}
.lf-eco-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.lf-eco-logo {
  width: 46px;
  height: 46px;
  border-radius: 13px;
  background: var(--tint);
  display: grid;
  place-items: center;
}
.dark .lf-eco-logo {
  background: color-mix(in srgb, var(--tint) 14%, transparent);
}
.lf-eco-logo img {
  width: 26px;
  height: 26px;
  object-fit: contain;
}
.lf-eco-arrow {
  color: var(--lf-faint);
  opacity: 0.5;
  transition: opacity 0.2s, transform 0.2s, color 0.2s;
}
.lf-eco-item:hover .lf-eco-arrow {
  opacity: 1;
  color: var(--lf-link);
  transform: translate(2px, -2px);
}
.lf-eco-name {
  margin-top: 20px;
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-size: 21px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--lf-ink);
}
.lf-eco-tag {
  margin-top: 4px;
  font-family: ui-monospace, Menlo, monospace;
  font-size: 10.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--lf-faint);
}
.lf-eco-desc {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.55;
  color: var(--lf-muted);
}
.lf-eco-domain {
  margin-top: auto;
  padding-top: 18px;
  font-family: ui-monospace, Menlo, monospace;
  font-size: 12px;
  color: var(--lf-faint);
}

/* the modules tile: the one warm cell in the grid */
.lf-eco-mods {
  background: #fdf0e6 !important;
}
.dark .lf-eco-mods {
  background: #1d1510 !important;
}
.lf-eco-mods:hover {
  background: #fbe6d6 !important;
}
.dark .lf-eco-mods:hover {
  background: #24190f !important;
}
.lf-eco-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 16px;
}
.lf-eco-chips span {
  padding: 4px 9px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(232, 117, 58, 0.18);
  font-family: ui-monospace, Menlo, monospace;
  font-size: 11.5px;
  color: #8a4a22;
}
.dark .lf-eco-chips span {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(240, 149, 95, 0.2);
  color: #f0a77a;
}
.lf-eco-browse {
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  color: var(--lf-link);
}

@media (max-width: 1100px) {
  .lf-eco {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 640px) {
  .lf-eco-head {
    padding-top: 56px;
    padding-bottom: 28px;
  }
  .lf-eco-item {
    padding: 20px 16px;
    min-height: 0;
  }
  .lf-eco-logo {
    width: 38px;
    height: 38px;
    border-radius: 11px;
  }
  .lf-eco-logo img {
    width: 22px;
    height: 22px;
  }
  .lf-eco-arrow {
    display: none;
  }
  .lf-eco-name {
    margin-top: 14px;
    font-size: 17px;
  }
  .lf-eco-desc {
    font-size: 13px;
  }
  .lf-eco-domain {
    display: none;
  }
  .lf-eco-mods .lf-eco-browse {
    display: block;
  }
  .lf-eco-chips span:nth-child(n + 7) {
    display: none;
  }
}
</style>
