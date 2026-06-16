<script setup>
import { ui } from './ui';
</script>

<template>
  <section :class="[ui.section, ui.spacious]">
    <header :class="[ui.header, ui.headerWide]">
      <p :class="ui.eyebrow">Frontend</p>
      <h2 :class="ui.title">Your stack stays yours</h2>
      <p :class="ui.subtitle">
        Use any frontend you want. React, Vue, Svelte, Blade, PHP. Your AI assistant still gets the same backend map.
        <span :class="ui.accent">Your tools follow your stack.</span>
      </p>
      <a href="/docs/frontend/" :class="[ui.link, 'mt-6']">
        Learn more
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </a>
    </header>

    <div :class="ui.panel">
      <span :class="[ui.marker, ui.markerTL]" aria-hidden="true" />
      <span :class="[ui.marker, ui.markerTR]" aria-hidden="true" />
      <span :class="[ui.marker, ui.markerBL]" aria-hidden="true" />
      <span :class="[ui.marker, ui.markerBR]" aria-hidden="true" />

      <div class="grid border-b border-black/[0.08] bg-neutral-100 dark:border-white/[0.08] dark:bg-black/40 lg:grid-cols-2">
        <div class="border-b border-black/[0.08] p-6 dark:border-white/[0.08] md:p-8 lg:border-b-0 lg:border-r">
          <p :class="ui.codeLabel">Leaf route</p>
          <pre class="shiki shiki-themes one-dark-pro one-dark-pro vp-code !m-0 !bg-transparent !p-0" tabindex="0"><code><span class="line"><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">app</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">()-&gt;</span><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">get</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#98C379;--shiki-dark:#98C379;">'/menu/items'</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#C678DD;--shiki-dark:#C678DD;">function</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">() {</span></span>
<span class="line"><span style="--shiki-light:#C678DD;--shiki-dark:#C678DD;">  return</span><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;"> response</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">()-&gt;</span><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">inertia</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#98C379;--shiki-dark:#98C379;">'menu'</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">, [</span></span>
<span class="line"><span style="--shiki-light:#98C379;--shiki-dark:#98C379;">    'items'</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;"> =&gt; </span><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">db</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">()-&gt;</span><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">select</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#98C379;--shiki-dark:#98C379;">'menu_items'</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">)-&gt;</span><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">all</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">  ]);</span></span>
<span class="line"><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">});</span></span></code></pre>
        </div>
        <div class="p-6 md:p-8">
          <p :class="ui.codeLabel">React view</p>
          <pre class="shiki shiki-themes one-dark-pro one-dark-pro vp-code !m-0 !bg-transparent !p-0" tabindex="0"><code><span class="line"><span style="--shiki-light:#C678DD;--shiki-dark:#C678DD;">export default function</span><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;"> Menu</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">({ items }) {</span></span>
<span class="line"><span style="--shiki-light:#C678DD;--shiki-dark:#C678DD;">  return</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;"> (</span></span>
<span class="line"><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#E06C75;--shiki-dark:#E06C75;">div</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;"> className=</span><span style="--shiki-light:#98C379;--shiki-dark:#98C379;">"menu-grid"</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">      {items.</span><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">map</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">((item) =&gt; (</span></span>
<span class="line"><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">        &lt;</span><span style="--shiki-light:#E06C75;--shiki-dark:#E06C75;">MenuCard</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;"> key={item.id} item={item} /&gt;</span></span>
<span class="line"><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">      ))}</span></span>
<span class="line"><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">    &lt;/</span><span style="--shiki-light:#E06C75;--shiki-dark:#E06C75;">div</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">  );</span></span>
<span class="line"><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">}</span></span></code></pre>
        </div>
      </div>

        <!-- Preview Tabs -->
        <div class="bg-white dark:bg-orange-900/10">
          <div class="px-4 pt-6 pb-2 text-gray-500 dark:text-gray-400 text-sm font-medium">Rendered by React from Leaf data</div>
          <!-- Preview Content -->
          <div class="p-4 grid grid-cols-2 gap-4 md:grid-cols-3">
            <div class="flex items-start p-6 bg-gray-50 dark:bg-orange-900/5 rounded-lg border border-orange-700/10">
              <div class="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-md mr-3 flex items-center justify-center">
                <span class="text-orange-600 dark:text-orange-300">🍔</span>
              </div>
              <div class="flex-1">
                <h4 class="text-sm font-semibold text-gray-800 dark:text-gray-200 !m-0">Veggie Loaded Burger</h4>
                <p class="text-xs !m-0 text-gray-500 dark:text-gray-400">Vegan • 4 stars</p>
                <div class="text-sm font-semibold text-blue-500">$8.99</div>
              </div>
            </div>
            <div class="flex items-start p-6 bg-gray-50 dark:bg-orange-900/5 rounded-lg border border-orange-700/10">
              <div class="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-md mr-3 flex items-center justify-center">
                <span class="text-red-600 dark:text-red-300">🍗</span>
              </div>
              <div class="flex-1">
                <h4 class="text-sm font-semibold text-gray-800 dark:text-gray-200 !m-0">Southern Fried Chicken</h4>
                <p class="text-xs !m-0 text-gray-500 dark:text-gray-400">Spicy • 5 stars</p>
                <div class="text-sm font-semibold text-blue-500">$9.49</div>
              </div>
            </div>
            <div class="items-start p-6 bg-gray-50 dark:bg-orange-900/5 rounded-lg hidden md:flex border border-orange-700/10">
              <div class="w-10 h-10 bg-amber-100 dark:bg-amber-900 rounded-md mr-3 flex items-center justify-center">
                <span class="text-amber-600 dark:text-amber-300">🥩</span>
              </div>
              <div class="flex-1">
                <h4 class="text-sm font-semibold text-gray-800 dark:text-gray-200 !m-0">Healthy Beef Burger</h4>
                <p class="text-xs !m-0 text-gray-500 dark:text-gray-400">Low-carb • 4 stars</p>
                <div class="text-sm font-semibold text-blue-500">$8.99</div>
              </div>
            </div>
          </div>

        <div class="!mt-0 flex flex-wrap justify-center gap-10 border-t border-black/[0.08] pb-8 pt-8 dark:border-white/[0.08]">
          <div class="flex flex-col items-center gap-1.5">
            <div class="flex h-10 w-10 items-center justify-center text-neutral-500 dark:text-neutral-400">
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <path
                  d="M30.685 27.536c-5.353 9.182-12.462 15.042-15.878 13.089-3.416-1.953-1.846-10.98 3.508-20.161 5.353-9.182 12.462-15.042 15.878-13.089 3.416 1.953 1.846 10.98-3.508 20.161Z"
                  fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-width="2" />
                <ellipse cx="24" cy="24" rx="7" ry="19" transform="rotate(90 24 24)" fill="currentColor"
                  fill-opacity="0" stroke="currentColor" stroke-width="2" />
                <path
                  d="M17.315 27.536c5.353 9.182 12.462 15.042 15.878 13.089 3.416-1.953 1.846-10.98-3.508-20.161-5.353-9.182-12.462-15.042-15.878-13.089-3.416 1.953-1.846 10.98 3.508 20.161Z"
                  fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-width="2" />
                <path d="M24 27a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" fill="none" stroke="currentColor" stroke-width="2" />
              </svg>
            </div>
            <span class="text-[0.8125rem] font-medium text-neutral-950 dark:text-neutral-50">React</span>
            <span class="text-[0.6875rem] text-neutral-500 dark:text-neutral-400">or anything</span>
          </div>
          <div class="flex flex-col items-center gap-1.5">
            <div class="flex h-10 w-10 items-center justify-center text-neutral-500 dark:text-neutral-400">
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <path d="M24 12.814 20.474 7H15l9 15 9-15h-5.476l-3.525 5.814Z" fill="currentColor" fill-opacity="0"
                  stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
                <path d="M37.408 7 24 28.982 10.592 7H3l21 34L45 7h-7.592Z" fill="currentColor" fill-opacity="0"
                  stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
              </svg>
            </div>
            <span class="text-[0.8125rem] font-medium text-neutral-950 dark:text-neutral-50">Vue</span>
            <span class="text-[0.6875rem] text-neutral-500 dark:text-neutral-400">or anything</span>
          </div>
          <div class="flex flex-col items-center gap-1.5">
            <div class="flex h-10 w-10 items-center justify-center text-neutral-500 dark:text-neutral-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 98.1 118" aria-hidden="true">
                <path fill="currentColor"
                  d="M91.8,15.6C80.9-0.1,59.2-4.7,43.6,5.2L16.1,22.8C8.6,27.5,3.4,35.2,1.9,43.9c-1.3,7.3-0.2,14.8,3.3,21.3  c-2.4,3.6-4,7.6-4.7,11.8c-1.6,8.9,0.5,18.1,5.7,25.4c11,15.7,32.6,20.3,48.2,10.4l27.5-17.5c7.5-4.7,12.7-12.4,14.2-21.1  c1.3-7.3,0.2-14.8-3.3-21.3c2.4-3.6,4-7.6,4.7-11.8C99.2,32.1,97.1,22.9,91.8,15.6" />
                <path fill="var(--vp-c-bg)"
                  d="M40.9,103.9c-8.9,2.3-18.2-1.2-23.4-8.7c-3.2-4.4-4.4-9.9-3.5-15.3c0.2-0.9,0.4-1.7,0.6-2.6l0.5-1.6l1.4,1  c3.3,2.4,6.9,4.2,10.8,5.4l1,0.3l-0.1,1c-0.1,1.4,0.3,2.9,1.1,4.1c1.6,2.3,4.4,3.4,7.1,2.7c0.6-0.2,1.2-0.4,1.7-0.7L65.5,72  c1.4-0.9,2.3-2.2,2.6-3.8c0.3-1.6-0.1-3.3-1-4.6c-1.6-2.3-4.4-3.3-7.1-2.6c-0.6,0.2-1.2,0.4-1.7,0.7l-10.5,6.7  c-1.7,1.1-3.6,1.9-5.6,2.4c-8.9,2.3-18.2-1.2-23.4-8.7c-3.1-4.4-4.4-9.9-3.4-15.3c0.9-5.2,4.1-9.9,8.6-12.7l27.5-17.5  c1.7-1.1,3.6-1.9,5.6-2.5c8.9-2.3,18.2,1.2,23.4,8.7c3.2,4.4,4.4,9.9,3.5,15.3c-0.2,0.9-0.4,1.7-0.7,2.6l-0.5,1.6l-1.4-1  c-3.3-2.4-6.9-4.2-10.8-5.4l-1-0.3l0.1-1c0.1-1.4-0.3-2.9-1.1-4.1c-1.6-2.3-4.4-3.3-7.1-2.6c-0.6,0.2-1.2,0.4-1.7,0.7L32.4,46.1  c-1.4,0.9-2.3,2.2-2.6,3.8s0.1,3.3,1,4.6c1.6,2.3,4.4,3.3,7.1,2.6c0.6-0.2,1.2-0.4,1.7-0.7l10.5-6.7c1.7-1.1,3.6-1.9,5.6-2.5  c8.9-2.3,18.2,1.2,23.4,8.7c3.2,4.4,4.4,9.9,3.5,15.3c-0.9,5.2-4.1,9.9-8.6,12.7l-27.5,17.5C44.8,102.5,42.9,103.3,40.9,103.9" />
              </svg>
            </div>
            <span class="text-[0.8125rem] font-medium text-neutral-950 dark:text-neutral-50">Svelte</span>
            <span class="text-[0.6875rem] text-neutral-500 dark:text-neutral-400">or anything</span>
          </div>
          <div class="flex flex-col items-center gap-1.5">
            <div class="flex h-10 w-10 items-center justify-center text-neutral-500 dark:text-neutral-400">
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <path d="m7.5 10.5 6.5-3 7 3.5v16l7-4v-8l7-4 7 4v8l-7 3.5V34l-14 7.5L7.5 34V10.5Z"
                  fill="currentColor" fill-opacity="0" />
                <path d="m7 11 7-4 7 4-7 4-7-4ZM21 11v16M21 35v7" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" />
                <path d="M7 11v23l14 8 14-8V19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M14 15v16l7 4 21-12v-8" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="m28 15 7-4 7 4-7 4-7-4ZM28 15v8l7 4M14 31l14-8" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <span class="text-[0.8125rem] font-medium text-neutral-950 dark:text-neutral-50">Blade</span>
            <span class="text-[0.6875rem] text-neutral-500 dark:text-neutral-400">or anything</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
