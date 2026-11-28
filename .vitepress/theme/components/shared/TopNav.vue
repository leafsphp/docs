<script setup lang="ts">
// Desktop top-nav mega menus (Docs, Ecosystem, Resources), laid out like
// laravel.com's: labelled columns, icon tiles, a visual panel on the right.
// Sits inside the VitePress nav bar so search, theme, socials and the mobile
// menu keep working; the mobile menu itself is driven by config/navbar.ts.
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vitepress';
import { products } from './ecosystem';
import { data as sponsorData } from '../../lib/sponsors.data';

type Menu = 'docs' | 'eco' | 'res' | null;
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

const route = useRoute();
watch(
  () => route.path,
  () => (open.value = null),
);

const menus = [
  ['docs', 'Docs'],
  ['eco', 'Ecosystem'],
  ['res', 'Resources'],
] as const;

// Docs: tiles are drawn here (no third-party art); each gets its own colour
const explore = [
  { title: 'Start building', text: 'Install Leaf and ship your first route', link: '/docs/', art: 'start' },
  { title: 'API Reference', text: 'Every function, class and helper', link: '/api-reference', art: 'api' },
  { title: 'Leaf Learn', text: 'Guides that start from zero', link: '/learn/', art: 'learn' },
];
const agents = [
  { title: 'AI in Leaf', text: 'The project map your agent reads', link: '/docs/ai', art: 'map' },
  { title: 'Agent skill', text: 'A drop-in skill for coding agents', link: '/docs/agent-skill', art: 'skill' },
  { title: 'Modules', text: '25+ pieces that plug in', link: '/docs/modules', art: 'modules' },
];
const docLinks = [
  { title: 'Installation', link: '/docs/', icon: 'download' },
  { title: 'Routing', link: '/docs/routing/', icon: 'route' },
  { title: 'Database', link: '/docs/database/', icon: 'db' },
  { title: 'Sign-in', link: '/docs/auth/', icon: 'lock' },
  { title: 'Leaf CLI', link: '/docs/cli/', icon: 'term' },
];

// Resources
const community = [
  { title: 'Blog', link: 'https://blog.leafphp.dev', icon: 'news' },
  { title: 'Contribute', link: '/community/guide', icon: 'heart' },
  { title: 'Team', link: '/community/team', icon: 'users' },
  { title: 'FAQ', link: '/community/faq', icon: 'help' },
];
const sponsors: { name: string; url: string }[] = sponsorData.sponsor || [];

const icons: Record<string, string> = {
  download: `<path d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16"/>`,
  route: `<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H15a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6.5"/>`,
  db: `<ellipse cx="12" cy="5.5" rx="7.5" ry="3"/><path d="M4.5 5.5v13c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-13"/><path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3"/>`,
  lock: `<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>`,
  term: `<path d="M5 7l5 5-5 5M12 18h7"/>`,
  layers: `<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>`,
  news: `<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M7.5 9h9M7.5 12.5h9M7.5 16h5"/>`,
  play: `<rect x="2.5" y="5" width="19" height="14" rx="3.5"/><path d="M10 9.5v5l4.5-2.5z"/>`,
  chat: `<path d="M20.5 12a8 8 0 0 1-11.8 7L4 20l1.1-4.2A8 8 0 1 1 20.5 12z"/>`,
  heart: `<path d="M12 20s-7-4.4-9-8.8C1.6 8 3.6 4.5 7 4.5c2 0 3.4 1 5 2.9 1.6-1.9 3-2.9 5-2.9 3.4 0 5.4 3.5 4 6.7-2 4.4-9 8.8-9 8.8z"/>`,
  users: `<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18.5 20a6.5 6.5 0 0 0-3-5.5"/>`,
  help: `<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01"/>`,
};

const featured = ['Alchemy', 'Kata', 'Seedling'];
const byName = (n: string) => products.find((p) => p.name === n)!;
const others = products.filter((p) => !featured.includes(p.name));
// Drawn in the Leaf line style (see DESIGN.md): thin ink strokes on a white
// face, one flame accent. viewBox 0 0 48 48.
const art: Record<string, string> = {
  start: `<path d="M8 22 24 30 40 22 24 14Z" fill="var(--face)"/><path d="M8 22v12l16 8 16-8V22M24 30v12"/><path d="M24 3v11M19.5 9.5 24 14l4.5-4.5" stroke="#E8753A" stroke-width="2"/>`,
  news: `<path d="M8 30 24 38 40 30 24 22Z"/><path d="M8 24 24 32 40 24 24 16Z" fill="var(--face)"/><path d="M8 18 24 26 40 18 24 10Z" fill="var(--face)"/><circle cx="31" cy="15.5" r="3.5" fill="#E8753A" stroke="none"/>`,
  learn: `<path d="M24 14c-6-4-13-4-18-2v24c5-2 12-2 18 2 6-4 13-4 18-2V12c-5-2-12-2-18 2Z" fill="var(--face)"/><path d="M24 14v24"/><path d="M31 11.5v9l2.5-1.8 2.5 1.8v-9" fill="#E8753A" stroke="#E8753A"/>`,
  map: `<path d="M6 14l11-4 14 4 11-4v26l-11 4-14-4-11 4Z" fill="var(--face)"/><path d="M17 10v26M31 14v26"/><path d="M24 31s-6-5.5-6-10a6 6 0 0 1 12 0c0 4.5-6 10-6 10z" fill="#E8753A" stroke="#E8753A"/><circle cx="24" cy="21" r="2" fill="var(--face)" stroke="none"/>`,
  api: `<rect x="7" y="8" width="34" height="32" rx="2" fill="var(--face)"/><path d="M18 18l-6 6 6 6M30 18l6 6-6 6"/><path d="M26.5 15l-5 18" stroke="#E8753A" stroke-width="2"/>`,
  skill: `<rect x="6" y="10" width="36" height="28" fill="var(--face)"/><path d="M6 17h36M22 32h10"/><path d="M13 24l5 4-5 4" stroke="#E8753A" stroke-width="2"/>`,
  modules: `<path d="M6 30 24 39 42 30 24 21Z"/><path d="M6 24 24 33 42 24 24 15Z" fill="var(--face)"/><path d="M6 18 24 27 42 18 24 9Z" fill="#E8753A" stroke="#E8753A"/>`,
};

// keep the dropdown flush under the nav bar wherever the bar actually ends
// (the announcement banner above it can be dismissed or scrolled away)
// The nav bar's backdrop blur makes it the containing block for fixed
// children, so measure where the panel actually lands and correct by the
// difference rather than assuming viewport coordinates.
const panelTop = ref(0);
const panelWrap = ref<HTMLElement | null>(null);
const placePanel = async () => {
  await nextTick();
  const bar = root.value?.closest('.VPNavBar') as HTMLElement | null;
  const wrap = panelWrap.value;
  if (!bar || !wrap) return;
  const delta = bar.getBoundingClientRect().bottom - wrap.getBoundingClientRect().top;
  if (Math.abs(delta) > 0.5) panelTop.value = Math.round(panelTop.value + delta);
};
watch(open, (m) => {
  if (m) placePanel();
});
onMounted(() => window.addEventListener('scroll', placePanel, { passive: true }));
onUnmounted(() => window.removeEventListener('scroll', placePanel));

const ext = (l: string) => (l.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {});
</script>

<template>
  <nav ref="root" class="tn" aria-label="Main">
    <div v-for="m in menus" :key="m[0]" class="tn-item" @mouseenter="enter(m[0])" @mouseleave="leave">
      <button type="button" class="tn-btn"
        :class="{ on: open === m[0] || (m[0] === 'docs' && !open && route.path.startsWith('/docs/')) }"
        :aria-expanded="open === m[0]" @click="toggle(m[0])">
        {{ m[1] }}
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"
          stroke-linecap="round" aria-hidden="true" :style="{ transform: open === m[0] ? 'rotate(180deg)' : 'none' }">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </div>

    <transition name="tn-fade">
      <div v-if="open" ref="panelWrap" class="tn-panel-wrap" :style="{ top: panelTop + 'px' }" @mouseenter="enter(open)" @mouseleave="leave">
        <!-- Docs -->
        <div v-if="open === 'docs'" class="tn-panel tn-cols tn-docs">
          <div class="tn-col">
            <p class="tn-h">Explore Leaf</p>
            <a v-for="l in explore" :key="l.title" :href="l.link" v-bind="ext(l.link)" class="tn-tilelink">
              <span class="tn-tile"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-html="art[l.art]" /></span>
              <span><span class="tn-t">{{ l.title }}</span><span class="tn-d">{{ l.text }}</span></span>
            </a>
          </div>
          <div class="tn-col">
            <p class="tn-h">Built for agents</p>
            <a v-for="l in agents" :key="l.title" :href="l.link" v-bind="ext(l.link)" class="tn-tilelink">
              <span class="tn-tile"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-html="art[l.art]" /></span>
              <span><span class="tn-t">{{ l.title }}</span><span class="tn-d">{{ l.text }}</span></span>
            </a>
          </div>
          <div class="tn-col">
            <p class="tn-h">Documentation</p>
            <a v-for="l in docLinks" :key="l.title" :href="l.link" class="tn-iconlink">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-html="icons[l.icon]" />
              {{ l.title }}
            </a>
            <a href="/docs/" class="tn-more">View all <span aria-hidden="true">→</span></a>
          </div>
          <a href="https://desktop.leafphp.dev" target="_blank" rel="noopener" class="tn-col tn-visual">
            <p class="tn-h">Leaf for Mac <span aria-hidden="true">→</span></p>
            <span class="tn-d tn-app-lede">Give your AI a head start on your app</span>
            <span class="tn-app" aria-hidden="true">
              <span class="tn-app-side">
                <img src="/logo-circle.png" alt="" class="tn-app-logo" />
                <b class="on" /><b /><b />
              </span>
              <span class="tn-app-main">
                <span class="tn-app-you">Add a cart page</span>
                <span class="tn-app-ai"><b /><b /><b /></span>
                <span class="tn-app-run"><i />php serve · :5500</span>
              </span>
            </span>
          </a>
        </div>

        <!-- Products -->
        <div v-else-if="open === 'eco'" class="tn-panel tn-products">
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
        <div v-else-if="open === 'res'" class="tn-panel tn-cols tn-res">
          <div class="tn-col tn-col-foot">
            <p class="tn-h">Community</p>
            <a v-for="l in community" :key="l.title" :href="l.link" v-bind="ext(l.link)" class="tn-iconlink">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-html="icons[l.icon]" />
              {{ l.title }}
            </a>
            <span class="tn-socials">
              <a href="https://github.com/leafsphp/leaf" target="_blank" rel="noopener" aria-label="GitHub"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.7 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.7 18.3.5 12 .5z" /></svg></a>
              <a href="https://www.youtube.com/channel/UCllE-GsYy10RkxBUK0HIffw" target="_blank" rel="noopener" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15.1V8.9l5.8 3.1-5.8 3.1z" /></svg></a>
              <a href="https://x.com/leafphp" target="_blank" rel="noopener" aria-label="X"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.2 2.5h3.4l-7.4 8.5 8.7 11.5h-6.8l-5.3-7-6.1 7H1.3l7.9-9.1L.8 2.5h7l4.8 6.4 5.6-6.4zm-1.2 18h1.9L7.1 4.4H5.1l11.9 16.1z" /></svg></a>
              <a href="https://discord.gg/Pkrm9NJPE3" target="_blank" rel="noopener" aria-label="Discord"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.6 1.3a18.3 18.3 0 0 0-5.6 0L8.6 3a19.7 19.7 0 0 0-4.9 1.5C.6 9.1-.3 13.6.1 18.1a19.9 19.9 0 0 0 6 3l1.3-2.1a12.9 12.9 0 0 1-2-1l.5-.4a14.2 14.2 0 0 0 12.2 0l.5.4c-.6.4-1.3.7-2 1l1.3 2.1a19.8 19.8 0 0 0 6-3c.5-5.2-.9-9.7-3.6-13.7zM8 15.4c-1.2 0-2.2-1.1-2.2-2.4S6.8 10.6 8 10.6s2.2 1.1 2.2 2.4-1 2.4-2.2 2.4zm8 0c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4z" /></svg></a>
            </span>
          </div>
          <div class="tn-col">
            <p class="tn-h">Supported by</p>
            <a v-for="sp in sponsors" :key="sp.name" :href="sp.url" target="_blank" rel="noopener" class="tn-plain">{{ sp.name }}</a>
            <a href="/support/" class="tn-more">Support Leaf <span aria-hidden="true">→</span></a>
          </div>
          <a href="https://blog.leafphp.dev/posts/leaf-5" target="_blank" rel="noopener" class="tn-col tn-article">
            <p class="tn-h">Featured article</p>
            <span class="tn-article-body">
              <span class="tn-article-img" aria-hidden="true">
                <span class="tn-article-glow" />
                <svg width="54" height="54" viewBox="0 0 114 114"><circle cx="56.693" cy="56.693" r="56.693" fill="#381a0d" /><path d="M59.805,57.461l22.579,-12.091l-13.317,31.834l-18.994,7.882c-0,-0 -13.304,-10.548 -13.311,-18.061c-0.01,-10.824 13.253,-46.885 13.253,-46.885l9.79,37.321Z" fill="#d4652e" /><path d="M50.08,85.086l-0.065,-64.946l10.121,36.782l22.248,-11.57c-0,0 -8.012,25.322 -13.396,31.944c-4.37,5.375 -18.908,7.79 -18.908,7.79Z" fill="#f5b731" /></svg>
                <span class="tn-article-five">5</span>
              </span>
              <span class="tn-article-text">
                <span class="tn-article-date">August 13, 2026</span>
                <span class="tn-article-title">Leaf 5: Build products at the speed of thought</span>
                <span class="tn-d">Our biggest release yet: a product-first framework with project context built in.</span>
                <span class="tn-more" style="margin-top: auto">Read more <span aria-hidden="true">→</span></span>
              </span>
            </span>
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
  top: 0;
  padding: 0 16px;
  z-index: 60;
  white-space: normal;
  text-align: left;
}
.tn-panel {
  max-width: 1240px;
  margin: 0 auto;
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

/* --- Laravel-style columns (Docs, Resources) --- */
.tn-cols {
  display: grid;
  overflow: hidden;
  padding: 0;
}
.tn-docs {
  grid-template-columns: 1fr 1fr 0.85fr 1fr;
}
.tn-res {
  grid-template-columns: 0.8fr 0.8fr 2fr;
}
.tn-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 26px 22px 22px;
  min-width: 0;
  text-decoration: none !important;
}
.tn-col + .tn-col {
  border-left: 1px solid var(--vp-c-divider);
}
.tn-h {
  margin: 0 0 10px 8px !important;
  font-size: 14px !important;
  font-weight: 600;
  line-height: 1.3 !important;
  color: var(--vp-c-brand-1);
}
.tn-tilelink {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 8px;
  border-radius: 14px;
  text-decoration: none !important;
  transition: background 0.15s;
}
.tn-tilelink:hover,
.tn-iconlink:hover,
.tn-plain:hover {
  background: var(--vp-c-default-soft);
}
/* drawn tiles: Leaf line illustrations on a quiet square, no gloss */
.tn-tile {
  --face: #ffffff;
  flex: 0 0 52px;
  width: 52px;
  height: 52px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  color: #2b2520;
  background: #faf7f2;
  border: 1px solid var(--vp-c-divider);
  transition: border-color 0.15s;
}
.dark .tn-tile {
  --face: #1d1814;
  color: #e8e1d8;
  background: rgba(255, 255, 255, 0.03);
}
.tn-tile svg {
  width: 38px;
  height: 38px;
}
.tn-tilelink:hover .tn-tile {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 40%, var(--vp-c-divider));
}
.tn-t {
  display: block;
  font-size: 15.5px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.tn-d {
  display: block;
  margin-top: 2px;
  font-size: 13.5px;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}
.tn-iconlink,
.tn-plain {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 8px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  color: var(--vp-c-text-1) !important;
  text-decoration: none !important;
  transition: background 0.15s;
}
.tn-iconlink svg {
  flex: 0 0 19px;
  width: 19px;
  height: 19px;
  color: var(--vp-c-text-3);
  transition: color 0.15s;
}
.tn-iconlink:hover svg {
  color: var(--vp-c-brand-1);
}
.tn-more {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  padding: 6px 8px;
  font-size: 14.5px;
  font-weight: 600;
  color: var(--vp-c-brand-1) !important;
  text-decoration: none !important;
}

/* Docs: frontend visual */
.tn-visual {
  position: relative;
  background-color: color-mix(in srgb, var(--vp-c-text-1) 2%, transparent);
  background-image: radial-gradient(color-mix(in srgb, var(--vp-c-text-1) 12%, transparent) 1px, transparent 1px);
  background-size: 16px 16px;
  padding-right: 0;
  padding-bottom: 0;
  overflow: hidden;
  border-radius: 0 21px 21px 0;
}
.tn-visual .tn-h {
  transition: transform 0.2s;
}
.tn-visual:hover .tn-h {
  transform: translateX(3px);
}
.tn-app-lede {
  margin: -4px 22px 0 8px;
}
.tn-app {
  position: relative;
  display: flex;
  flex: 1;
  min-height: 200px;
  margin: 18px -1px -1px 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px 0 0 0;
  box-shadow: 0 14px 30px -16px rgba(40, 25, 10, 0.3);
  overflow: hidden;
  transition: transform 0.3s;
}
.tn-app-side {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 30%;
  padding: 12px 10px;
  background: color-mix(in srgb, var(--vp-c-text-1) 4%, transparent);
  border-right: 1px solid var(--vp-c-divider);
}
.tn-app-logo {
  width: 18px;
  height: 18px;
  margin-bottom: 4px;
  border-radius: 5px;
}
.tn-app-side b {
  height: 8px;
  border-radius: 99px;
  background: color-mix(in srgb, var(--vp-c-text-1) 11%, transparent);
}
.tn-app-side b.on {
  background: color-mix(in srgb, #e8753a 45%, transparent);
}
.tn-app-side b:nth-of-type(3) { width: 70%; }
.tn-app-main {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
  padding: 14px 12px;
  min-width: 0;
}
.tn-app-you {
  align-self: flex-end;
  padding: 6px 10px;
  border-radius: 10px 10px 3px 10px;
  background: color-mix(in srgb, #e8753a 14%, transparent);
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  color: var(--vp-c-text-1);
}
.tn-app-ai {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 4px;
}
.tn-app-ai b {
  height: 7px;
  border-radius: 99px;
  background: color-mix(in srgb, var(--vp-c-text-1) 11%, transparent);
  transition: width 0.5s ease;
}
.tn-app-ai b:nth-child(1) { width: 90%; }
.tn-app-ai b:nth-child(2) { width: 70%; }
.tn-app-ai b:nth-child(3) { width: 30%; }
.tn-visual:hover .tn-app-ai b:nth-child(3) { width: 80%; }
.tn-app-run {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  align-self: flex-start;
  margin-top: auto;
  padding: 5px 9px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 99px;
  font-family: ui-monospace, Menlo, monospace;
  font-size: 11px;
  white-space: nowrap;
  color: var(--vp-c-text-2);
}
.tn-app-run i {
  width: 7px;
  height: 7px;
  border-radius: 99px;
  background: #2f8a5f;
  box-shadow: 0 0 0 3px color-mix(in srgb, #2f8a5f 25%, transparent);
}
@media (prefers-reduced-motion: reduce) {
  .tn-app-ai b { transition: none; }
}

/* Resources */
.tn-col-foot {
  padding-bottom: 0;
}
.tn-socials {
  display: flex;
  justify-content: space-between;
  margin: auto -22px 0;
  padding: 14px 26px;
  border-top: 1px solid var(--vp-c-divider);
  background: color-mix(in srgb, var(--vp-c-text-1) 3%, transparent);
}
.tn-socials a {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  color: var(--vp-c-text-2) !important;
}
.tn-socials a:hover {
  color: var(--vp-c-text-1) !important;
  background: var(--vp-c-default-soft);
}
.tn-socials svg {
  width: 18px;
  height: 18px;
}
.tn-article .tn-article-body {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 24px;
  flex: 1;
}
.tn-article-img {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 210px;
  border-radius: 14px;
  border: 1px solid var(--vp-c-divider);
  /* Leaf filler stripes (DESIGN.md: 315deg, 1px, 9px period) */
  background-color: #faf7f2;
  background-image: repeating-linear-gradient(315deg, rgba(0, 0, 0, 0.05) 0 1px, transparent 1px 9px);
  transition: border-color 0.2s;
}
.dark .tn-article-img {
  background-color: #0a0807;
  background-image: repeating-linear-gradient(315deg, rgba(255, 255, 255, 0.055) 0 1px, transparent 1px 9px);
}
.tn-article:hover .tn-article-img {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 45%, var(--vp-c-divider));
}
.tn-article-glow {
  position: absolute;
  inset: auto -30% -70% -30%;
  height: 120%;
  background: radial-gradient(circle at 50% 50%, rgba(232, 117, 58, 0.28), transparent 60%);
}
.dark .tn-article-glow {
  background: radial-gradient(circle at 50% 50%, rgba(232, 117, 58, 0.45), transparent 60%);
}
.tn-article-img svg {
  position: relative;
}
.tn-article-five {
  position: relative;
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-size: 76px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -0.05em;
  background: linear-gradient(120deg, #f5b731, #e8753a 50%, #d4542b);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.tn-article-text {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 4px 0;
}
.tn-article-date {
  font-size: 13.5px;
  color: var(--vp-c-text-2);
}
.tn-article-title {
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-size: 24px;
  line-height: 1.15;
  letter-spacing: -0.025em;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.tn-article .tn-more {
  padding-left: 0;
}
@media (max-width: 1180px) {
  .tn-docs {
    grid-template-columns: 1fr 1fr 0.9fr;
  }
  .tn-docs .tn-visual {
    display: none;
  }
  .tn-res {
    grid-template-columns: 0.8fr 0.8fr 1.6fr;
  }
  .tn-article .tn-article-body {
    grid-template-columns: 1fr;
  }
  .tn-article-img {
    min-height: 120px;
  }
}
</style>
