<script setup lang="ts">
// Placeholder wall until real showcase screenshots land. Tiles marked
// "template" are starters people can use; the rest stand in for sites built with Leaf.
const S: any[] = [
      { kind: 'hero', h: 360, brand: '[brand]', title: 'Stay somewhere worth the trip', sub: 'Cabins, lofts and farmhouses, bookable in two taps.', cta: 'Find a stay', bg: 'linear-gradient(160deg,#A7C4B5,#4E7A66 55%,#22382E)', ink: '#FFFFFF', accent: '#FFFFFF', accentInk: '#22382E' },
      { kind: 'dash', h: 230, brand: '[brand]', title: 'Revenue', accent: '#2F6FEB', block: '#C9D8FB', template: true },
      { kind: 'editorial', h: 420, brand: '[brand]', title: 'The quiet return of the corner shop', sub: 'How small sellers are winning back their high streets.', cta: '8 min read', bg: '#F4EFE6', ink: '#1A1712', block: 'linear-gradient(135deg,#D9C7A8,#A88B5E)' },
      { kind: 'form', h: 260, brand: 'SaaS starter', title: 'Create your account', sub: 'Start a 14-day trial. No card needed.', cta: 'Get started', bg: 'linear-gradient(160deg,#EEF4FE,#E9F7EF)', accent: '#2F6FEB', template: true },
      { kind: 'shop', h: 380, brand: '[BRAND]', title: 'THE SPRING EDIT', bg: 'linear-gradient(160deg,#F2D7C9,#C98E73)', ink: '#FFFFFF', block: '#F1ECE6' },
      { kind: 'hero', h: 300, brand: '[brand]', title: 'Invoices that get paid on time', sub: 'Send, track and chase invoices automatically.', cta: 'Try it free', bg: 'linear-gradient(160deg,#1E2A55,#3B5BD9)', ink: '#FFFFFF', accent: '#F5C542', accentInk: '#1E2A55' },
      { kind: 'form', h: 240, brand: '[brand]', title: 'Book a table', sub: 'Tonight, 4 guests, 19:30', cta: 'Confirm booking', bg: 'linear-gradient(160deg,#FFF6D8,#FDE7C7)', accent: '#C2561F' },
      { kind: 'editorial', h: 360, brand: 'Blog', title: 'Notes from building in public', sub: 'Posts, tags, newsletter sign-up and RSS.', cta: 'Subscribe →', bg: '#FFFFFF', ink: '#120E0B', block: 'linear-gradient(135deg,#FCE3CF,#F5B731)', template: true },
      { kind: 'dash', h: 280, brand: '[brand]', title: 'Course progress', accent: '#1F9D63', block: '#BFE8D1' },
      { kind: 'shop', h: 320, brand: 'STORE', title: 'NEW SEASON', bg: 'linear-gradient(160deg,#1B1B1B,#3A3A3A)', ink: '#FFFFFF', block: '#EEEEEE', template: true },
      { kind: 'hero', h: 420, brand: '[brand]', title: 'Tickets for every gig in town', sub: 'Sell tickets, scan at the door and get paid out nightly.', cta: 'Browse events', bg: 'linear-gradient(170deg,#2A1A55,#6A4BD6 60%,#E07A9B)', ink: '#FFFFFF', accent: '#FFFFFF', accentInk: '#2A1A55' },
      { kind: 'form', h: 250, brand: 'API', title: 'Create an API key', sub: 'Scoped tokens with rate limits.', cta: 'Generate key', bg: 'linear-gradient(160deg,#E9F7EF,#F7FBF6)', accent: '#1F9D63', template: true },
      { kind: 'editorial', h: 330, brand: '[brand]', title: 'Learn to cook, one recipe at a time', sub: 'Video lessons and progress tracking.', cta: 'Start learning', bg: '#FFF7DD', ink: '#3D2E05', block: 'linear-gradient(135deg,#F5C542,#E8753A)' },
      { kind: 'dash', h: 260, brand: '[brand]', title: 'Team leave', accent: '#C2561F', block: '#F7D4BE' },
      { kind: 'hero', h: 340, brand: 'Docs', title: 'Documentation people actually read', sub: 'Markdown pages, search and versions.', cta: 'Read the guide', bg: 'linear-gradient(160deg,#F5F3F0,#E6E0D7)', ink: '#120E0B', accent: '#120E0B', accentInk: '#FFFFFF', template: true }
    ];
const shots = S.map((t) => ({
  template: false,
  ...t,
  isHero: t.kind === 'hero',
  isShop: t.kind === 'shop',
  isDash: t.kind === 'dash',
  isEditorial: t.kind === 'editorial',
  isForm: t.kind === 'form',
  label: t.template ? t.brand + ' template' : '[Site built with Leaf]',
}));
</script>

<template>
  <section>
    <div class="lf-pad" style="padding-top: 96px; padding-bottom: 72px">
      <h2 class="lf-h2" style="margin-bottom: 18px; max-width: 900px">Build whatever you want, by hand or with your agent.</h2>
      <p class="lf-lede" style="max-width: 680px">
        Leaf stays small, so it never pushes you toward the same app twice. Here are some of the products people run on
        it, plus templates you can start from today.
      </p>
    </div>
    <div class="lf-wall-frame">
      <div class="lf-wall">
        <div class="lf-cols">
<template v-for="(t, idx) in shots" :key="idx">
<a href="#" class="lf-shot" :aria-label="`${t.label}`" :style="`display: block; position: relative; break-inside: avoid; margin: 0 0 8px; height: ${t.h}px; overflow: hidden; text-decoration: none; font-family: Inter, system-ui, sans-serif`">

<template v-if="t.isHero">
<div :style="`height: 100%; background: ${t.bg}; color: ${t.ink}; padding: 14px; box-sizing: border-box; display: flex; flex-direction: column`">
<div style="display: flex; justify-content: space-between; font-size: 9px; font-weight: 700"><span>{{ t.brand }}</span><span style="opacity: .75; font-weight: 500">Explore · Pricing · Sign in</span></div>
<p style="margin: auto 0 8px; font-family: 'Bricolage Grotesque', system-ui, sans-serif; font-size: 24px; line-height: 1; letter-spacing: -0.03em; font-weight: 600">{{ t.title }}</p>
<p style="margin: 0 0 10px; font-size: 9.5px; line-height: 1.4; opacity: .8">{{ t.sub }}</p>
<span :style="`align-self: flex-start; padding: 6px 10px; border-radius: 999px; background: ${t.accent}; color: ${t.accentInk}; font-size: 9px; font-weight: 700`">{{ t.cta }}</span>
</div>
</template>

<template v-if="t.isShop">
<div style="height: 100%; background: #FFFFFF; color: #111111; padding: 12px; box-sizing: border-box; display: flex; flex-direction: column; gap: 10px">
<div style="display: flex; justify-content: space-between; font-size: 9px; font-weight: 800; letter-spacing: .08em"><span>{{ t.brand }}</span><span style="font-weight: 500; letter-spacing: 0; color: #666666">Search · Bag (2)</span></div>
<div :style="`height: 46%; border-radius: 6px; background: ${t.bg}; display: flex; align-items: flex-end; padding: 10px; box-sizing: border-box`"><span :style="`font-size: 15px; font-weight: 800; letter-spacing: .02em; color: ${t.ink}`">{{ t.title }}</span></div>
<p style="margin: 0; font-size: 9px; font-weight: 700; letter-spacing: .1em">NEW ARRIVALS</p>
<div style="flex: 1; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px">
<span :style="`border-radius: 4px; background: ${t.block}`"></span><span :style="`border-radius: 4px; background: ${t.block}`"></span><span :style="`border-radius: 4px; background: ${t.block}`"></span>
</div>
</div>
</template>

<template v-if="t.isDash">
<div style="height: 100%; background: #F8FAFC; color: #0F172A; display: flex; box-sizing: border-box">
<div style="flex: 0 0 26%; background: #FFFFFF; border-right: 1px solid #E2E8F0; padding: 10px 8px; display: flex; flex-direction: column; gap: 7px; box-sizing: border-box">
<span style="font-size: 9px; font-weight: 700">{{ t.brand }}</span>
<span :style="`height: 6px; border-radius: 3px; background: ${t.accent}`"></span><span style="height: 6px; border-radius: 3px; background: #E2E8F0"></span><span style="height: 6px; border-radius: 3px; background: #E2E8F0"></span><span style="height: 6px; border-radius: 3px; background: #E2E8F0"></span><span style="height: 6px; width: 70%; border-radius: 3px; background: #E2E8F0"></span>
</div>
<div style="flex: 1; padding: 12px; display: flex; flex-direction: column; gap: 8px; min-width: 0">
<span style="font-size: 12px; font-weight: 700">{{ t.title }}</span>
<div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px">
<span style="padding: 7px; border-radius: 6px; background: #FFFFFF; border: 1px solid #E2E8F0; font-size: 8px; color: #64748B">MRR<b style="display: block; font-size: 11px; color: #0F172A">$12.4k</b></span>
<span style="padding: 7px; border-radius: 6px; background: #FFFFFF; border: 1px solid #E2E8F0; font-size: 8px; color: #64748B">Users<b style="display: block; font-size: 11px; color: #0F172A">3,208</b></span>
<span style="padding: 7px; border-radius: 6px; background: #FFFFFF; border: 1px solid #E2E8F0; font-size: 8px; color: #64748B">Churn<b style="display: block; font-size: 11px; color: #0F172A">1.8%</b></span>
</div>
<div style="flex: 1; display: flex; align-items: flex-end; gap: 4px; padding: 8px; border-radius: 6px; background: #FFFFFF; border: 1px solid #E2E8F0">
<span :style="`flex: 1; height: 35%; border-radius: 2px; background: ${t.block}`"></span><span :style="`flex: 1; height: 55%; border-radius: 2px; background: ${t.block}`"></span><span :style="`flex: 1; height: 42%; border-radius: 2px; background: ${t.block}`"></span><span :style="`flex: 1; height: 70%; border-radius: 2px; background: ${t.block}`"></span><span :style="`flex: 1; height: 60%; border-radius: 2px; background: ${t.block}`"></span><span :style="`flex: 1; height: 85%; border-radius: 2px; background: ${t.accent}`"></span>
</div>
</div>
</div>
</template>

<template v-if="t.isEditorial">
<div :style="`height: 100%; background: ${t.bg}; color: ${t.ink}; padding: 14px; box-sizing: border-box; display: flex; flex-direction: column; gap: 10px`">
<div style="display: flex; justify-content: space-between; font-size: 9px; border-bottom: 1px solid currentColor; padding-bottom: 6px; opacity: .8"><span style="font-weight: 800">{{ t.brand }}</span><span>Latest · Topics</span></div>
<p style="margin: 0; font-family: 'Bricolage Grotesque', system-ui, sans-serif; font-size: 27px; line-height: .98; letter-spacing: -0.035em; font-weight: 700">{{ t.title }}</p>
<p style="margin: 0; font-size: 9.5px; line-height: 1.45; opacity: .8">{{ t.sub }}</p>
<div :style="`flex: 1; border-radius: 4px; background: ${t.block}`"></div>
<span style="font-family: ui-monospace, Menlo, monospace; font-size: 8px; opacity: .7">{{ t.cta }}</span>
</div>
</template>

<template v-if="t.isForm">
<div :style="`height: 100%; background: ${t.bg}; padding: 16px; box-sizing: border-box; display: flex; align-items: center; justify-content: center`">
<div style="width: 100%; background: #FFFFFF; border-radius: 12px; padding: 14px; box-shadow: 0 10px 30px -14px rgba(15,23,42,.25); display: flex; flex-direction: column; gap: 8px; color: #0F172A">
<span :style="`font-size: 9px; font-weight: 700; color: ${t.accent}`">{{ t.brand }}</span>
<span style="font-size: 15px; font-weight: 700; letter-spacing: -0.02em">{{ t.title }}</span>
<span style="font-size: 9px; color: #64748B">{{ t.sub }}</span>
<span style="height: 22px; border-radius: 6px; border: 1px solid #E2E8F0"></span>
<span style="height: 22px; border-radius: 6px; border: 1px solid #E2E8F0"></span>
<span :style="`padding: 7px; border-radius: 6px; background: ${t.accent}; color: #FFFFFF; font-size: 9px; font-weight: 700; text-align: center`">{{ t.cta }}</span>
</div>
</div>
</template>

<template v-if="t.template">
<span style="position: absolute; top: 8px; right: 8px; padding: 3px 8px; border-radius: 999px; background: rgba(255,255,255,.92); color: #A9481A; font-size: 10px; font-weight: 700; box-shadow: 0 1px 3px rgba(0,0,0,.12)">Template</span>
</template>
</a>
</template>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.lf-wall-frame {
  background: rgba(18, 14, 11, 0.04);
  padding: 8px;
  border-top: 1px solid var(--lf-line);
}
.dark .lf-wall-frame {
  background: rgba(255, 255, 255, 0.03);
}
.lf-wall {
  position: relative;
  height: 1040px;
  overflow: hidden;
  background: #ffffff;
  border-radius: 16px;
  outline: 1px solid rgba(18, 14, 11, 0.06);
}
.dark .lf-wall {
  background: #0f0c0a;
}
.lf-wall::after {
  content: '';
  position: absolute;
  inset: auto 0 0 0;
  height: 160px;
  background: linear-gradient(transparent, var(--lf-bg));
  pointer-events: none;
}
.lf-cols {
  columns: 5 210px;
  column-gap: 8px;
}
.lf-shot {
  opacity: 0.85;
  transition: opacity 0.2s;
}
.lf-shot:hover {
  opacity: 1;
}
.lf-shot :deep(p) {
  line-height: inherit;
  color: inherit;
}
@media (max-width: 640px) {
  .lf-wall {
    height: 720px;
  }
}

@media (max-width: 640px) {
  .lf-cols {
    columns: 2;
  }
  .lf-wall {
    height: 620px !important;
  }
}
</style>
