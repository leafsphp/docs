<script setup lang="ts">
// Desktop top-nav menus (Framework, Products, Resources, Docs). Sits in the
// VitePress nav bar so search, the theme toggle, socials and the mobile menu
// keep working. The mobile menu is still driven by config/navbar.ts.
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vitepress';
import { products } from './ecosystem';

type Menu = 'fw' | 'products' | 'res' | null;
const open = ref<Menu>(null);
const root = ref<HTMLElement | null>(null);
let closeTimer: ReturnType<typeof setTimeout> | undefined;

// hover opens a menu; a click right after (same menu) should keep it open
// rather than toggling it shut, so remember whether hover opened it
let openedByHover = false;
const enter = (m: Exclude<Menu, null>) => {
  clearTimeout(closeTimer);
  if (open.value !== m) openedByHover = true;
  open.value = m;
};
const leave = () => {
  closeTimer = setTimeout(() => (open.value = null), 140);
};
const toggle = (m: Exclude<Menu, null>) => {
  if (open.value === m && !openedByHover) {
    open.value = null;
  } else {
    open.value = m;
  }
  openedByHover = false;
};

const onClickOutside = (e: MouseEvent) => {
  if (root.value && !root.value.contains(e.target as Node)) open.value = null;
};
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') open.value = null;
};

onMounted(() => {
  document.addEventListener('click', onClickOutside);
  document.addEventListener('keydown', onKeydown);
});
onUnmounted(() => {
  document.removeEventListener('click', onClickOutside);
  document.removeEventListener('keydown', onKeydown);
  clearTimeout(closeTimer);
});

// close after navigating
const route = useRoute();
watch(
  () => route.path,
  () => (open.value = null),
);

const framework = [
  { title: 'Routing', text: 'Routes, groups and middleware', link: '/docs/routing/' },
  { title: 'Sign-in', text: 'Login, roles and permissions', link: '/docs/auth/' },
  { title: 'Database', text: 'Fluent queries and models', link: '/docs/database/' },
  { title: 'Payments', text: 'Charges and subscriptions', link: '/docs/utils/billing' },
  { title: 'Background jobs', text: 'Queues and scheduled work', link: '/docs/utils/queues' },
  { title: 'Frontend', text: 'React, Vue, Svelte or Blade', link: '/docs/frontend/' },
  { title: 'AI and agents', text: 'The project map, explained', link: '/docs/ai' },
];

const resources = [
  { title: 'Blog', text: 'Releases and building in public', link: 'https://blog.leafphp.dev' },
  { title: 'YouTube', text: 'Walkthroughs and launches', link: 'https://www.youtube.com/channel/UCllE-GsYy10RkxBUK0HIffw' },
  { title: 'Discord', text: 'Help and show-and-tell', link: 'https://discord.gg/Pkrm9NJPE3' },
  { title: 'Contribute', text: 'How to help build Leaf', link: '/community/guide' },
  { title: 'Team', text: 'The people behind Leaf', link: '/community/team' },
  { title: 'FAQ', text: 'Common questions', link: '/community/faq' },
  { title: 'Generative AI policy', text: 'How we use AI on Leaf', link: '/community/generative-ai' },
];

const featured = ['Alchemy', 'Kata', 'Seedling'];
const byName = (n: string) => products.find((p) => p.name === n)!;
const others = products.filter((p) => !featured.includes(p.name));
const ext = (l: string) => (l.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {});
</script>

<template>
  <nav ref="root" class="tn" aria-label="Main">
    <div v-for="m in ([['fw', 'Framework'], ['products', 'Products'], ['res', 'Resources']] as const)" :key="m[0]"
      class="tn-item" @mouseenter="enter(m[0])" @mouseleave="leave">
      <button type="button" class="tn-btn" :class="{ on: open === m[0] }" :aria-expanded="open === m[0]"
        @click="toggle(m[0])">
        {{ m[1] }}
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"
          stroke-linecap="round" aria-hidden="true" :style="{ transform: open === m[0] ? 'rotate(180deg)' : 'none' }">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </div>
    <a href="/docs/" class="tn-btn" :class="{ on: route.path.startsWith('/docs/') }">Docs</a>

    <transition name="tn-fade">
      <div v-if="open" class="tn-panel-wrap" @mouseenter="enter(open)" @mouseleave="leave">
        <!-- Framework -->
        <div v-if="open === 'fw'" class="tn-panel tn-list">
          <a v-for="l in framework" :key="l.title" :href="l.link" class="tn-link">
            <span class="tn-link-title">{{ l.title }}</span>
            <span class="tn-link-text">{{ l.text }}</span>
          </a>
          <a href="/docs/modules" class="tn-link tn-link-more">
            <span class="tn-link-title" style="color: var(--vp-c-brand-1)">All 25+ modules →</span>
            <span class="tn-link-text">Browse the full list</span>
          </a>
        </div>

        <!-- Products -->
        <div v-else-if="open === 'products'" class="tn-panel tn-products">
          <div class="tn-cards">
            <a :href="byName('Alchemy').url" target="_blank" rel="noopener" class="tn-card tn-card-dots">
              <span class="tn-card-name"><img :src="byName('Alchemy').logo" alt="" class="tn-logo" />Alchemy</span>
              <span class="tn-tag">{{ byName('Alchemy').tagline }}</span>
              <span class="tn-card-lede">Tests, code style and CI pipelines from one config file</span>
              <span class="tn-card-cta" style="color: #23704a">Set up QA →</span>
              <span class="tn-card-demo tn-mono">
                <span style="color: #8f867b">alchemy.yml</span>
                <span>tests: <span style="color: #23704a">✓ 148 passed</span></span>
                <span>lint: <span style="color: #23704a">✓ clean</span></span>
                <span>actions: <span style="color: #8a6410">ci.yml generated</span></span>
              </span>
            </a>
            <a :href="byName('Kata').url" target="_blank" rel="noopener" class="tn-card tn-card-hatch">
              <span class="tn-card-name"><img :src="byName('Kata').logo" alt="" class="tn-logo" />Kata</span>
              <span class="tn-tag">{{ byName('Kata').tagline }}</span>
              <span class="tn-card-lede">Your design system, compiled into a language AI can build with</span>
              <span class="tn-card-cta" style="color: #8e2f67">Compile your system →</span>
              <span class="tn-card-demo">
                <span class="tn-mono" style="color: #8f867b; font-size: 12px">tokens · color</span>
                <span class="tn-swatches"><i style="background: #120e0b" /><i style="background: #e8753a" /><i style="background: #f5b731" /><i style="background: #fbf8f3; box-shadow: inset 0 0 0 1px #ece6de" /></span>
              </span>
            </a>
            <a :href="byName('Seedling').url" target="_blank" rel="noopener" class="tn-card tn-card-dark">
              <span aria-hidden="true" class="tn-card-glow" />
              <span class="tn-card-name tn-mono" style="text-transform: uppercase; letter-spacing: 0.04em"><img :src="byName('Seedling').logo" alt="" class="tn-logo" />Seedling</span>
              <span class="tn-tag">{{ byName('Seedling').tagline }}</span>
              <span class="tn-card-lede">Command-line tools with the same Leaf feel</span>
              <span class="tn-card-cta" style="color: #f5b731">Build a CLI →</span>
              <span class="tn-card-demo tn-mono" style="background: rgba(255, 255, 255, 0.05); border-color: rgba(255, 255, 255, 0.09); color: #e8e6e3">
                <span style="color: #8f867b">$ my-cli list</span>
                <span>  greet      Say hello</span>
                <span>  deploy     Ship the app</span>
                <span>  report     Weekly numbers</span>
              </span>
            </a>
          </div>
          <div class="tn-others">
            <a v-for="p in others" :key="p.name" :href="p.url" target="_blank" rel="noopener" class="tn-other">
              <span class="tn-link-title tn-other-name"><img :src="p.logo" alt="" class="tn-logo tn-logo-sm" />{{ p.name }}</span>
              <span class="tn-tag">{{ p.tagline }}</span>
              <span class="tn-link-text">{{ p.menuDescription || p.description }}</span>
            </a>
          </div>
        </div>

        <!-- Resources -->
        <div v-else-if="open === 'res'" class="tn-panel tn-list">
          <a v-for="l in resources" :key="l.title" :href="l.link" v-bind="ext(l.link)" class="tn-link">
            <span class="tn-link-title">{{ l.title }}</span>
            <span class="tn-link-text">{{ l.text }}</span>
          </a>
        </div>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
.tn {
  display: none;
  align-items: center;
  gap: 2px;
  height: var(--vp-nav-height);
  margin-left: 18px;
  margin-right: auto;
}
@media (min-width: 960px) {
  .tn {
    display: flex;
  }
}
.tn-item {
  display: flex;
  align-items: center;
  height: 100%;
}
.tn-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 11px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1) !important;
  text-decoration: none !important;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.15s;
}
.tn-btn:hover {
  background: var(--vp-c-default-soft);
}
.tn-btn.on {
  background: color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent);
  color: var(--vp-c-brand-1) !important;
}
.tn-btn svg {
  transition: transform 0.2s;
}

.tn-panel-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: calc(var(--vp-layout-top-height, 0px) + var(--vp-nav-height) - 4px);
  padding: 0 16px;
  z-index: 60;
  white-space: normal;
  text-align: left;
}
.tn-panel {
  max-width: 1240px;
  margin: 8px auto 0;
  background: #ffffff;
  border: 1px solid var(--vp-c-divider);
  border-radius: 22px;
  box-shadow: 0 30px 80px -20px rgba(40, 25, 10, 0.25);
}
.dark .tn-panel {
  background: #14110e;
  border-color: rgba(255, 255, 255, 0.09);
}
.tn-list {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 4px;
}
.tn-link,
.tn-other {
  display: block;
  padding: 14px 16px;
  border-radius: 12px;
  text-decoration: none !important;
  transition: background 0.15s;
}
.tn-link:hover,
.tn-other:hover {
  background: var(--vp-c-default-soft);
}
.tn-link-more {
  background: color-mix(in srgb, var(--vp-c-brand-1) 7%, transparent);
}
.tn-link-title {
  display: block;
  margin-bottom: 3px;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.tn-link-text {
  display: block;
  font-size: 13.5px;
  line-height: 1.45;
  color: var(--vp-c-text-2);
}

.tn-products {
  padding: 10px;
}
.tn-cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
.tn-card {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 330px;
  padding: 26px 26px 0;
  border: 1px solid #f0ebe4;
  border-radius: 16px;
  color: #120e0b !important;
  text-decoration: none !important;
  transition: transform 0.2s;
}
.tn-card:hover {
  transform: translateY(-2px);
}
.tn-card-dots {
  background-color: #fffbf6;
  background-image: radial-gradient(rgba(18, 14, 11, 0.09) 1px, transparent 1px);
  background-size: 18px 18px;
}
.tn-card-hatch {
  background-color: #f7fbf6;
  background-image: repeating-linear-gradient(45deg, rgba(35, 112, 74, 0.06) 0 1px, transparent 1px 22px),
    repeating-linear-gradient(-45deg, rgba(35, 112, 74, 0.06) 0 1px, transparent 1px 22px);
}
.tn-card-dark {
  background: #14110e;
  border-color: #14110e;
  color: #f7f2ea !important;
}
.dark .tn-card:not(.tn-card-dark) {
  border-color: transparent;
}
.dark .tn-card-dark {
  border-color: rgba(255, 255, 255, 0.08);
}
.tn-card-glow {
  position: absolute;
  right: -80px;
  bottom: -120px;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(232, 117, 58, 0.35), transparent 65%);
}
.tn-card-name {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-size: 22px;
  font-weight: 700;
}
.tn-logo {
  width: 26px;
  height: 26px;
  object-fit: contain;
}
.tn-logo-sm {
  width: 20px;
  height: 20px;
}
.tn-tag {
  position: relative;
  display: block;
  margin-top: -6px;
  font-family: ui-monospace, Menlo, monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.6;
}
.tn-other .tn-tag {
  margin: 4px 0 6px;
  color: var(--vp-c-text-3);
  opacity: 1;
}
.tn-other-name {
  display: flex;
  align-items: center;
  gap: 8px;
}
.tn-card-lede {
  position: relative;
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-size: 25px;
  line-height: 1.15;
  letter-spacing: -0.03em;
  font-weight: 500;
}
.tn-card-cta {
  position: relative;
  font-size: 15px;
  font-weight: 600;
}
.tn-card-demo {
  position: relative;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 18px;
  background: #ffffff;
  border: 1px solid #ece6de;
  border-bottom: 0;
  border-radius: 14px 14px 0 0;
  color: #3d3630;
}
.tn-mono {
  font-family: ui-monospace, Menlo, monospace;
  font-size: 12.5px;
  line-height: 1.5;
  white-space: pre;
}
.tn-card-demo.tn-mono {
  gap: 2px;
}
.tn-swatches {
  display: flex;
  gap: 8px;
}
.tn-swatches i {
  flex: 1;
  height: 32px;
  border-radius: 8px;
}
.tn-others {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 4px;
  padding: 10px 6px 4px;
}

.tn-fade-enter-active,
.tn-fade-leave-active {
  transition: opacity 0.15s, transform 0.15s;
}
.tn-fade-enter-from,
.tn-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (max-width: 1180px) {
  .tn-card-lede {
    font-size: 21px;
  }
  .tn-list,
  .tn-others {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
