<script setup lang="ts">
import { products } from '../shared/ecosystem';

// one tint per product so the list doesn't read as a wall of identical tiles
const tints: Record<string, string> = {
  Auth: 'linear-gradient(135deg,#F5B731,#E8753A)',
  Db: 'linear-gradient(135deg,#FFE18A,#F5B731)',
  Alchemy: 'linear-gradient(135deg,#B9EBC9,#6FCF97)',
  Kata: 'linear-gradient(135deg,#F9C9E0,#E7A6C9)',
  Fetch: 'linear-gradient(135deg,#C9DDFB,#8DB4F2)',
  Seedling: 'linear-gradient(135deg,#E2E8BC,#B8C46A)',
  'Hana JS': 'linear-gradient(135deg,#DCD2F6,#AE9AE8)',
};
</script>

<template>
  <section>
    <div class="lf-pad lf-eco-head">
      <h2 class="lf-h2">One team. A whole toolchain.</h2>
      <a href="/docs/modules" style="font-size: 15px; font-weight: 600; color: var(--lf-link)">See every module →</a>
    </div>
    <div class="lf-grid lf-eco">
      <a v-for="p in products" :key="p.name" :href="p.url" target="_blank" rel="noopener" class="lf-eco-item">
        <span class="lf-eco-mark" :style="{ background: tints[p.name] || '#F0EBE4' }">{{ p.name.slice(0, 2) }}</span>
        <span>
          <span class="lf-eco-name">{{ p.name }}</span>
          <span class="lf-eco-desc">{{ p.menuDescription || p.description }}</span>
        </span>
      </a>
      <a href="https://blog.leafphp.dev" target="_blank" rel="noopener" class="lf-eco-item" style="flex-direction: column; justify-content: center; gap: 4px">
        <span style="font-size: 17px; font-weight: 600">Building in public</span>
        <span class="lf-eco-desc">Blog, YouTube, talks, Wall of Fame</span>
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
.lf-eco {
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  border-top: 1px solid var(--lf-line);
}
.lf-eco-item {
  padding: 28px 32px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  transition: background 0.15s;
}
.lf-eco-item:hover {
  background: var(--lf-soft) !important;
}
.lf-eco-mark {
  flex: 0 0 40px;
  height: 40px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 14px;
  color: #120e0b;
}
.lf-eco-name {
  display: block;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}
.lf-eco-desc {
  display: block;
  font-size: 14px;
  line-height: 1.55;
  color: var(--lf-muted);
}
</style>
