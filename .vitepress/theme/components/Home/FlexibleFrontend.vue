<template>
  <section
    class="flex flex-col justify-center items-center sm:!max-w-3xl lg:!max-w-5xl xl:!max-w-7xl w-full !px-2 sm:!px-10 !py-28 !my-48 rounded-3xl">
    <div class="text-center mb-4 max-w-4xl mx-auto">
      <h2 class="!text-3xl md:!text-4xl font-bold !mb-4 text-gray-800 dark:text-gray-100 !border-none">Worried about
        frontend lock-in? Don't be.</h2>
      <p class="text-lg text-gray-600 dark:text-gray-300 mb-4 max-w-3xl mx-auto">
        If you're tired of frameworks that dictate your frontend choices, Leaf is different. Use any frontend framework
        you prefer — Vue, React, Svelte, Blade or bring your own view engine.
      </p>
      <a href="/docs/frontend/" class="inline-flex items-center text-blue-500 font-medium hover:text-blue-600">
        Learn more
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1">
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </a>
    </div>

    <div class="mt-10 max-w-4xl w-full">
      <div class="code-preview-container rounded-lg overflow-hidden shadow-lg">
        <!-- Code Window -->
        <div class="bg-[var(--vp-code-block-bg)] p-8 text-white">
          <!-- <div class="flex items-center mb-3">
            <div class="flex space-x-2">
              <div class="w-3 h-3 rounded-full bg-red-500"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div class="ml-4 text-gray-400 text-xs">file.php</div>
          </div> -->
          <pre class="shiki shiki-themes one-dark-pro one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">app</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">()-&gt;</span><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">get</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#98C379;--shiki-dark:#98C379;">'/menu/items'</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#C678DD;--shiki-dark:#C678DD;">function</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">() {</span></span>
<span class="line"><span style="--shiki-light:#C678DD;--shiki-dark:#C678DD;">  return</span><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;"> response</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">()-&gt;</span><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">inertia</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#98C379;--shiki-dark:#98C379;">'menu'</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">, [</span></span>
<span class="line"><span style="--shiki-light:#98C379;--shiki-dark:#98C379;">    'items'</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;"> =&gt; </span><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">db</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">()-&gt;</span><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">select</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#98C379;--shiki-dark:#98C379;">'menu_items'</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">)-&gt;</span><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">all</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">  ]);</span></span>
<span class="line"><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">});</span></span></code></pre>
        </div>

        <!-- Preview Tabs -->
        <div class="bg-white dark:bg-gray-800">

          <!-- Preview Content -->
          <div class="p-4">
            <div class="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg mb-3">
              <div class="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-md mr-3 flex items-center justify-center">
                <span class="text-orange-600 dark:text-orange-300">🍔</span>
              </div>
              <div class="flex-1">
                <h4 class="text-sm font-semibold text-gray-800 dark:text-gray-200">Veggie Loaded Burger</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400">Vegan • 4 stars</p>
                <div class="text-sm font-semibold text-blue-500">$8.99</div>
              </div>
            </div>
            <div class="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg mb-3">
              <div class="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-md mr-3 flex items-center justify-center">
                <span class="text-red-600 dark:text-red-300">🍗</span>
              </div>
              <div class="flex-1">
                <h4 class="text-sm font-semibold text-gray-800 dark:text-gray-200">Southern Fried Chicken</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400">Spicy • 5 stars</p>
                <div class="text-sm font-semibold text-blue-500">$9.49</div>
              </div>
            </div>
            <div class="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="w-10 h-10 bg-amber-100 dark:bg-amber-900 rounded-md mr-3 flex items-center justify-center">
                <span class="text-amber-600 dark:text-amber-300">🥩</span>
              </div>
              <div class="flex-1">
                <h4 class="text-sm font-semibold text-gray-800 dark:text-gray-200">Healthy Beef Burger</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400">Low-carb • 4 stars</p>
                <div class="text-sm font-semibold text-blue-500">$8.99</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Framework Icons -->
      <div class="flex justify-center mt-8 gap-10">
        <div class="flex flex-col items-center">
          <div class="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="text-blue-500">
              <path d="M16 18l6-6-6-6"></path>
              <path d="M8 6l-6 6 6 6"></path>
            </svg>
          </div>
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">React</span>
        </div>
        <div class="flex flex-col items-center">
          <div class="w-12 h-12 flex items-center justify-center bg-green-100 dark:bg-green-900 rounded-full mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="text-green-500">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="4"></circle>
            </svg>
          </div>
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Vue</span>
        </div>
        <div class="flex flex-col items-center">
          <div class="w-12 h-12 flex items-center justify-center bg-orange-100 dark:bg-orange-900 rounded-full mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="text-orange-500">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
          </div>
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Svelte</span>
        </div>
        <div class="flex flex-col items-center">
          <div class="w-12 h-12 flex items-center justify-center bg-purple-100 dark:bg-purple-900 rounded-full mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="text-purple-500">
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
              <polyline points="13 2 13 9 20 9"></polyline>
            </svg>
          </div>
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Blade</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.text-blue-500 {
  color: var(--vt-c-brand);
}

.text-blue-600 {
  color: var(--vt-c-brand-dark);
}

.border-blue-500 {
  border-color: var(--vt-c-brand);
}

.bg-blue-100 {
  background-color: rgba(var(--vt-c-brand-rgb), 0.1);
}

.bg-blue-900 {
  background-color: rgba(var(--vt-c-brand-rgb), 0.2);
}

.text-green-500 {
  color: #10b981;
}

.bg-green-100 {
  background-color: rgba(16, 185, 129, 0.1);
}

.bg-green-900 {
  background-color: rgba(16, 185, 129, 0.2);
}

.text-orange-500 {
  color: #f97316;
}

.bg-orange-100 {
  background-color: rgba(249, 115, 22, 0.1);
}

.bg-orange-900 {
  background-color: rgba(249, 115, 22, 0.2);
}

.text-purple-500 {
  color: #8b5cf6;
}

.bg-purple-100 {
  background-color: rgba(139, 92, 246, 0.1);
}

.bg-purple-900 {
  background-color: rgba(139, 92, 246, 0.2);
}

.bg-red-100 {
  background-color: rgba(239, 68, 68, 0.1);
}

.bg-red-900 {
  background-color: rgba(239, 68, 68, 0.2);
}

.bg-amber-100 {
  background-color: rgba(245, 158, 11, 0.1);
}

.bg-amber-900 {
  background-color: rgba(245, 158, 11, 0.2);
}
</style>
