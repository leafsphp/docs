<script setup>
import { ref, computed } from 'vue';
import { ui } from './ui';

const frameworks = {
  react: {
    name: 'React',
    file: 'js/menu.jsx',
    dark: '#61DAFB',
    light: '#087EA4',
    icon: 'M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z',
    route: `app()-&gt;get(<span class="tok-b">'/menu/items'</span>, <span class="tok-m">function</span>() {
  $items = db()-&gt;select(<span class="tok-b">'menu_items'</span>)
    -&gt;all();

  <span class="tok-m">return</span> response()-&gt;inertia(<span class="tok-b">'menu'</span>, [
    <span class="tok-b">'items'</span> =&gt; $items
  ]);
});`,
    view: `<span class="tok-m">const</span> Menu = ({ items }) =&gt; (
  &lt;div className=<span class="tok-a">"menu-grid"</span>&gt;
    {items.map((item) =&gt; (
      &lt;MenuCard key={item.id}
        item={item} /&gt;
    ))}
  &lt;/div&gt;
);

<span class="tok-m">export default</span> Menu;`,
  },
  vue: {
    name: 'Vue',
    file: 'js/menu.vue',
    dark: '#42B883',
    light: '#2F855A',
    icon: 'M24,1.61H14.06L12,5.16,9.94,1.61H0L12,22.39ZM12,14.08,5.16,2.23H9.59L12,6.41l2.41-4.18h4.43Z',
    route: `app()-&gt;get(<span class="tok-b">'/menu/items'</span>, <span class="tok-m">function</span>() {
  $items = db()-&gt;select(<span class="tok-b">'menu_items'</span>)
    -&gt;all();

  <span class="tok-m">return</span> response()-&gt;inertia(<span class="tok-b">'menu'</span>, [
    <span class="tok-b">'items'</span> =&gt; $items
  ]);
});`,
    view: `<span class="tok-m">&lt;script setup&gt;</span>
defineProps({ items: Array })
<span class="tok-m">&lt;/script&gt;</span>

<span class="tok-m">&lt;template&gt;</span>
  &lt;div class=<span class="tok-a">"menu-grid"</span>&gt;
    &lt;MenuCard v-for=<span class="tok-a">"item in items"</span>
      :key=<span class="tok-a">"item.id"</span> :item=<span class="tok-a">"item"</span> /&gt;
  &lt;/div&gt;
<span class="tok-m">&lt;/template&gt;</span>`,
  },
  svelte: {
    name: 'Svelte',
    file: 'js/menu.svelte',
    dark: '#FF3E00',
    light: '#E63900',
    icon: 'M10.354 21.125a4.44 4.44 0 0 1-4.765-1.767 4.109 4.109 0 0 1-.703-3.107 3.898 3.898 0 0 1 .134-.522l.105-.321.287.21a7.21 7.21 0 0 0 2.186 1.092l.208.063-.02.208a1.253 1.253 0 0 0 .226.83 1.337 1.337 0 0 0 1.435.533 1.231 1.231 0 0 0 .343-.15l5.59-3.562a1.164 1.164 0 0 0 .524-.778 1.242 1.242 0 0 0-.211-.937 1.338 1.338 0 0 0-1.435-.533 1.23 1.23 0 0 0-.343.15l-2.133 1.36a4.078 4.078 0 0 1-1.135.499 4.44 4.44 0 0 1-4.765-1.766 4.108 4.108 0 0 1-.702-3.108 3.855 3.855 0 0 1 1.742-2.582l5.589-3.563a4.072 4.072 0 0 1 1.135-.499 4.44 4.44 0 0 1 4.765 1.767 4.109 4.109 0 0 1 .703 3.107 3.943 3.943 0 0 1-.134.522l-.105.321-.286-.21a7.204 7.204 0 0 0-2.187-1.093l-.208-.063.02-.207a1.255 1.255 0 0 0-.226-.831 1.337 1.337 0 0 0-1.435-.532 1.231 1.231 0 0 0-.343.15L8.62 9.368a1.162 1.162 0 0 0-.524.778 1.24 1.24 0 0 0 .211.937 1.338 1.338 0 0 0 1.435.533 1.235 1.235 0 0 0 .344-.151l2.132-1.36a4.067 4.067 0 0 1 1.135-.498 4.44 4.44 0 0 1 4.765 1.766 4.108 4.108 0 0 1 .702 3.108 3.857 3.857 0 0 1-1.742 2.583l-5.589 3.562a4.072 4.072 0 0 1-1.135.499m10.358-17.95C18.484-.015 14.082-.96 10.9 1.068L5.31 4.63a6.412 6.412 0 0 0-2.896 4.295 6.753 6.753 0 0 0 .666 4.336 6.43 6.43 0 0 0-.96 2.396 6.833 6.833 0 0 0 1.168 5.167c2.229 3.19 6.63 4.135 9.812 2.108l5.59-3.562a6.41 6.41 0 0 0 2.896-4.295 6.756 6.756 0 0 0-.665-4.336 6.429 6.429 0 0 0 .958-2.396 6.831 6.831 0 0 0-1.167-5.168Z',
    route: `app()-&gt;get(<span class="tok-b">'/menu/items'</span>, <span class="tok-m">function</span>() {
  $items = db()-&gt;select(<span class="tok-b">'menu_items'</span>)
    -&gt;all();

  <span class="tok-m">return</span> response()-&gt;inertia(<span class="tok-b">'menu'</span>, [
    <span class="tok-b">'items'</span> =&gt; $items
  ]);
});`,
    view: `<span class="tok-m">&lt;script&gt;</span>
  <span class="tok-m">export let</span> items;
<span class="tok-m">&lt;/script&gt;</span>

&lt;div class=<span class="tok-a">"menu-grid"</span>&gt;
  <span class="tok-m">{#each</span> items <span class="tok-m">as</span> item (item.id)<span class="tok-m">}</span>
    &lt;MenuCard {item} /&gt;
  <span class="tok-m">{/each}</span>
&lt;/div&gt;`,
  },
  blade: {
    name: 'Blade',
    file: 'menu.blade.php',
    dark: '#FF2D20',
    light: '#E02617',
    icon: 'M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.027c-.008.002-.016.008-.024.01a.348.348 0 01-.192 0c-.011-.002-.02-.008-.03-.012-.02-.008-.042-.014-.062-.025L.533 18.755a.376.376 0 01-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 01.023-.058c.004-.013.015-.022.023-.033l.033-.045c.012-.01.025-.018.037-.027.014-.012.027-.024.041-.034H.53L5.043.05a.375.375 0 01.375 0L9.93 2.647h.002c.015.01.027.021.04.033l.038.027c.013.014.02.03.033.045.008.011.02.021.025.033.01.02.017.038.024.058.003.011.01.021.013.032.01.031.014.064.014.098v9.652l3.76-2.164V5.527c0-.033.004-.066.013-.098.003-.01.01-.02.013-.032a.487.487 0 01.024-.059c.007-.012.018-.02.025-.033.012-.015.021-.03.033-.043.012-.012.025-.02.037-.028.014-.01.026-.023.041-.032h.001l4.513-2.598a.375.375 0 01.375 0l4.513 2.598c.016.01.027.021.042.031.012.01.025.018.036.028.013.014.022.03.034.044.008.012.019.021.024.033.011.02.018.04.024.06.006.01.012.021.015.032zm-.74 5.032V6.179l-1.578.908-2.182 1.256v4.283zm-4.51 7.75v-4.287l-2.147 1.225-6.126 3.498v4.325zM1.093 3.624v14.588l8.273 4.761v-4.325l-4.322-2.445-.002-.003H5.04c-.014-.01-.025-.021-.04-.031-.011-.01-.024-.018-.035-.027l-.001-.002c-.013-.012-.021-.025-.031-.04-.01-.011-.021-.022-.028-.036h-.002c-.008-.014-.013-.031-.02-.047-.006-.016-.014-.027-.018-.043a.49.49 0 01-.008-.057c-.002-.014-.006-.027-.006-.041V5.789l-2.18-1.257zM5.23.81L1.47 2.974l3.76 2.164 3.758-2.164zm1.956 13.505l2.182-1.256V3.624l-1.58.91-2.182 1.255v9.435zm11.581-10.95l-3.76 2.163 3.76 2.163 3.759-2.164zm-.376 4.978L16.21 7.087 14.63 6.18v4.283l2.182 1.256 1.58.908zm-8.65 9.654l5.514-3.148 2.756-1.572-3.757-2.163-4.323 2.489-3.941 2.27z',
    route: `app()-&gt;get(<span class="tok-b">'/menu/items'</span>, <span class="tok-m">function</span>() {
  $items = db()-&gt;select(<span class="tok-b">'menu_items'</span>)
    -&gt;all();

  <span class="tok-m">return</span> response()-&gt;render(<span class="tok-b">'menu'</span>, [
    <span class="tok-b">'items'</span> =&gt; $items
  ]);
});`,
    view: `&lt;div class=<span class="tok-a">"menu-grid"</span>&gt;
  <span class="tok-m">@foreach</span> ($items <span class="tok-m">as</span> $item)
    &lt;x-menu-card :item=<span class="tok-a">"$item"</span> /&gt;
  <span class="tok-m">@endforeach</span>
&lt;/div&gt;`,
  },
};

const active = ref('react');
const fw = computed(() => frameworks[active.value]);

const dishes = [
  { name: 'Veggie Loaded Burger', meta: 'Vegan · 4 stars', price: '$8.99' },
  { name: 'Southern Fried Chicken', meta: 'Spicy · 5 stars', price: '$9.49' },
  { name: 'Healthy Beef Burger', meta: 'Low-carb · 4 stars', price: '$8.99' },
];
</script>

<template>
  <section
    id="frontend"
    :class="[ui.section, ui.spacious, 'max-w-6xl']"
    :style="{ '--fwd': fw.dark, '--fwl': fw.light }"
  >
    <header class="mb-10">
      <p :class="ui.eyebrow">Frontend</p>
      <h2 :class="[ui.title, 'text-balance']">Your stack stays yours</h2>
      <div class="flex flex-wrap items-end justify-between gap-6">
        <p class="!m-0 max-w-xl text-[1.05rem] leading-[1.7] text-neutral-500 dark:text-neutral-400">
          Use any frontend you want. Your AI assistant still gets the same backend map. Your tools follow your
          stack. <a href="/docs/frontend/" class="font-semibold text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-[var(--vp-c-brand-1)] dark:text-neutral-50 dark:decoration-neutral-600">Learn more ↗</a>
        </p>
        <div class="flex border border-black/[0.08] dark:border-white/[0.08]" role="tablist" aria-label="Frontend framework">
          <button
            v-for="(f, key) in frameworks"
            :key="key"
            type="button"
            role="tab"
            :aria-selected="active === key"
            class="flex items-center gap-2.5 border-r border-black/[0.08] px-5 py-3 text-[0.9rem] font-medium transition-colors last:border-r-0 dark:border-white/[0.08]"
            :class="active === key
              ? 'bg-neutral-50 text-neutral-950 shadow-[inset_0_-2px_0_var(--fwl)] dark:bg-white/[0.05] dark:text-neutral-50 dark:shadow-[inset_0_-2px_0_var(--fwd)]'
              : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'"
            @click="active = key"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              aria-hidden="true"
              :style="active === key ? undefined : { opacity: 0.55 }"
            >
              <path :d="f.icon" :fill="active === key ? 'var(--fwd)' : 'currentColor'" />
            </svg>
            {{ f.name }}
          </button>
        </div>
      </div>
    </header>

    <div :class="ui.panel" aria-label="The same Leaf route rendered by each frontend">
      <span :class="[ui.marker, ui.markerTL]" aria-hidden="true" />
      <span :class="[ui.marker, ui.markerTR]" aria-hidden="true" />
      <span :class="[ui.marker, ui.markerBL]" aria-hidden="true" />
      <span :class="[ui.marker, ui.markerBR]" aria-hidden="true" />

      <div class="grid lg:grid-cols-[1.05fr_1.05fr_0.9fr]">
        <div class="min-w-0 border-b border-black/[0.08] dark:border-white/[0.08] lg:border-b-0 lg:border-r">
          <div class="flex items-center justify-between gap-4 border-b border-black/[0.08] px-5 py-3 dark:border-white/[0.08]">
            <span class="font-mono text-[0.7rem] font-medium uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">Leaf route</span>
            <span class="font-mono text-[0.7rem] text-neutral-400 dark:text-neutral-500">app/routes/menu.php</span>
          </div>
          <pre class="code-pane" v-html="fw.route" />
        </div>

        <div class="min-w-0 border-b border-black/[0.08] dark:border-white/[0.08] lg:border-b-0 lg:border-r">
          <div class="flex items-center justify-between gap-4 border-b border-black/[0.08] px-5 py-3 dark:border-white/[0.08]">
            <span class="fw-accent font-mono text-[0.7rem] font-medium uppercase tracking-[0.08em]">{{ fw.name }} view</span>
            <span class="font-mono text-[0.7rem] text-neutral-400 dark:text-neutral-500">app/views/{{ fw.file }}</span>
          </div>
          <pre class="code-pane" v-html="fw.view" />
        </div>

        <div class="min-w-0">
          <div class="flex items-center justify-between gap-4 border-b border-black/[0.08] px-5 py-3 dark:border-white/[0.08]">
            <span class="font-mono text-[0.7rem] font-medium uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">Rendered by {{ fw.name }}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true"><path :d="fw.icon" fill="var(--fwd)" /></svg>
          </div>
          <div class="grid gap-3 p-5">
            <div
              v-for="dish in dishes"
              :key="dish.name"
              class="flex items-start justify-between gap-4 border border-black/[0.08] bg-white p-4 dark:border-white/[0.08] dark:bg-white/[0.03]"
            >
              <div>
                <p class="!m-0 text-[0.95rem] font-semibold text-neutral-950 dark:text-neutral-50">{{ dish.name }}</p>
                <p class="!m-0 !mt-1 font-mono text-[0.78rem] text-neutral-500 dark:text-neutral-400">{{ dish.meta }}</p>
              </div>
              <span class="fw-accent font-mono text-[0.95rem] font-semibold">{{ dish.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.code-pane {
  margin: 0;
  overflow-x: auto;
  white-space: pre;
  padding: 1.25rem;
  font-family: var(--vp-font-family-mono, ui-monospace, monospace);
  font-size: 0.8rem;
  line-height: 1.75;
  color: #262626;
}
.dark .code-pane { color: #e5e5e5; }
.code-pane :deep(.tok-m) { color: #a3a3a3; }
.dark .code-pane :deep(.tok-m) { color: #737373; }
.code-pane :deep(.tok-b) { color: var(--vp-c-brand-1); }
.code-pane :deep(.tok-a) { color: var(--fwl); }
.dark .code-pane :deep(.tok-a) { color: var(--fwd); }
.fw-accent { color: var(--fwl); }
.dark .fw-accent { color: var(--fwd); }
</style>
