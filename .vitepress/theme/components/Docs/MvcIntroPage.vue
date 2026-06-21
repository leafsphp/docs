<template>
  <div v-if="section === 'hero'"
    class="mvc-intro not-prose mt-6 overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.02]">
    <div class="grid lg:grid-cols-[1fr_320px]">
      <div class="border-b border-black/10 p-6 dark:border-white/10 md:p-8 lg:border-b-0 lg:border-r">
        <p class="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--vp-c-brand-1)]">Leaf MVC</p>
        <h2 class="text-2xl font-semibold tracking-[-0.03em] text-neutral-950 dark:text-neutral-50 md:text-3xl">
          Structure for real apps, without the framework weight.
        </h2>
        <p class="!mt-5 max-w-2xl text-base leading-7 text-neutral-600 dark:text-neutral-400">
          Leaf MVC gives your project controllers, models, routes, views, services, and environment conventions from day
          one, while keeping the codebase small enough for humans and AI assistants to understand.
        </p>

        <div class="mt-10 grid gap-3 sm:grid-cols-2">
          <div v-for="item in heroStats" :key="item.label"
            class="rounded-lg border border-black/10 bg-neutral-50 p-4 dark:border-white/10 dark:bg-white/[0.03]">
            <p class="text-xl font-semibold text-neutral-950 dark:text-neutral-50">{{ item.value }}</p>
            <p class="mt-1 text-xs font-medium uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">{{
              item.label }}</p>
          </div>
        </div>
      </div>

      <div class="bg-neutral-50 p-6 dark:bg-white/[0.03] md:p-8">
        <p class="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">Best
          for</p>
        <div class="space-y-4">
          <div v-for="item in bestFor" :key="item.title"
            class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
            <p class="text-sm font-semibold text-neutral-950 dark:text-neutral-50">{{ item.title }}</p>
            <p class="mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="section === 'parts'" class="mvc-intro docs-paths not-prose my-6">
    <div v-for="(item, index) in mvcParts" :key="item.title" class="docs-path-card docs-path-card--static">
      <span class="docs-path-index">0{{ index + 1 }} / {{ item.kicker }}</span>
      <strong class="docs-path-title">{{ item.title }}</strong>
      <span class="docs-path-description">{{ item.description }}</span>
    </div>
  </div>

  <div v-else-if="section === 'flow'"
    class="mvc-intro not-prose my-6 overflow-hidden rounded-xl border border-black/10 bg-white dark:border-white/10 dark:bg-white/[0.02]">
    <div class="p-5 md:p-6">
      <p data-v-6ed0dfc5=""
        class="text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">Request flow
      </p>
      <p class="text-sm leading-7 text-neutral-600 dark:text-neutral-400 !mb-4">
        A route receives the request, a controller decides what should happen, models and services handle the work,
        and a view or JSON response returns the result. That predictable flow is why Leaf MVC works well for teams and
        AI-assisted changes.
      </p>

      <div data-v-6ed0dfc5=""
        class="rounded-md border border-black/10 bg-white px-3 py-2 text-sm font-medium text-neutral-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-neutral-300">
        Route receives request</div>

      <div class="vp-code-block-title">
        <div class="vp-code-block-title-bar"><span class="vp-code-block-title-text"
            data-title="app/routes/index.php">app/routes/index.php</span></div>
        <div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span
            class="lang">php</span>
          <pre class="shiki shiki-themes one-dark-pro one-dark-pro vp-code"
            tabindex="0"><code><span class="line"><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">app</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">()-&gt;</span><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">get</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#98C379;--shiki-dark:#98C379;">'/dashboard'</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#98C379;--shiki-dark:#98C379;">'DashboardController@index'</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">);</span></span></code></pre>
        </div>
      </div>

      <div data-v-6ed0dfc5=""
        class="rounded-md border border-black/10 bg-white px-3 py-2 text-sm font-medium text-neutral-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-neutral-300">
        Controller coordinates work</div>
      <div data-v-6ed0dfc5=""
        class="rounded-md border border-black/10 bg-white px-3 py-2 text-sm font-medium text-neutral-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-neutral-300">
        Model or service handles logic</div>

      <div class="vp-code-block-title">
        <div class="vp-code-block-title-bar"><span class="vp-code-block-title-text"
            data-title="app/controllers/DashboardController.php">app/controllers/DashboardController.php</span></div>
        <div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span
            class="lang">php</span>
          <pre class="shiki shiki-themes one-dark-pro one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#C678DD;--shiki-dark:#C678DD;">return</span><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;"> response</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">()-&gt;</span><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">view</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#98C379;--shiki-dark:#98C379;">'dashboard'</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">, [</span></span>
<span class="line"><span style="--shiki-light:#98C379;--shiki-dark:#98C379;">  'data'</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;"> =&gt; </span><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">db</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">()-&gt;</span><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">select</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#98C379;--shiki-dark:#98C379;">'frames'</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">)-&gt;</span><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">get</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">]);</span></span></code></pre>
        </div>
      </div>

      <div data-v-6ed0dfc5=""
        class="rounded-md border border-black/10 bg-white px-3 py-2 text-sm font-medium text-neutral-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-neutral-300">
        View or JSON returns result</div>

      <div class="vp-code-block-title">
        <div class="vp-code-block-title-bar"><span class="vp-code-block-title-text"
            data-title="app/views/dashboard.blade.php">app/views/dashboard.blade.php</span></div>
        <div class="language-blade vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span
            class="lang">blade</span>
          <pre class="shiki shiki-themes one-dark-pro one-dark-pro vp-code"
            tabindex="0"><code><span class="line"><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#E06C75;--shiki-dark:#E06C75;">h1</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">&gt;Dashboard&lt;/</span><span style="--shiki-light:#E06C75;--shiki-dark:#E06C75;">h1</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#E06C75;--shiki-dark:#E06C75;">ul</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#C678DD;--shiki-dark:#C678DD;">  @foreach </span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#E06C75;--shiki-dark:#E06C75;">$data</span><span style="--shiki-light:#56B6C2;--shiki-dark:#56B6C2;"> as</span><span style="--shiki-light:#E06C75;--shiki-dark:#E06C75;"> $frame</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#E06C75;--shiki-dark:#E06C75;">li</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#56B6C2;--shiki-dark:#56B6C2;" v-pre>{{ </span><span style="--shiki-light:#E06C75;--shiki-dark:#E06C75;">$frame</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">-></span><span style="--shiki-light:#E06C75;--shiki-dark:#E06C75;">name</span > <span style="--shiki-light:#56B6C2;--shiki-dark:#56B6C2;" > }}</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">&lt;/</span><span style="--shiki-light:#E06C75;--shiki-dark:#E06C75;">li</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#C678DD;--shiki-dark:#C678DD;">  @endforeach</span></span>
<span class="line"><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">&lt;/</span><span style="--shiki-light:#E06C75;--shiki-dark:#E06C75;">ul</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">&gt;</span></span></code></pre>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="section === 'tree'" class="mvc-intro not-prose my-6 grid gap-4 md:grid-cols-[1fr_280px]">
    <div class="overflow-hidden rounded-xl border border-black/10 bg-white dark:border-white/10 dark:bg-white/[0.02]">
      <div class="border-b border-black/10 bg-neutral-50 px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]">
        <p class="text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">Default
          starter</p>
      </div>
      <div class="overflow-x-auto p-5 font-mono text-sm leading-7 text-neutral-700 dark:text-neutral-300">
        <div>app/</div>
        <div class="pl-4 text-neutral-500">controllers/</div>
        <div class="pl-4 text-neutral-500">database/</div>
        <div class="pl-4 text-neutral-500">models/</div>
        <div class="pl-4 text-neutral-500">routes/</div>
        <div class="pl-4 text-neutral-500">views/</div>
        <div>public/</div>
      </div>
    </div>

    <div class="space-y-3">
      <div v-for="item in folders" :key="item.title"
        class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
        <p class="text-sm font-semibold text-neutral-950 dark:text-neutral-50">{{ item.title }}</p>
        <p class="mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">{{ item.description }}</p>
      </div>
    </div>
  </div>

  <div v-else-if="section === 'config'" class="mvc-intro not-prose my-6 grid gap-4 md:grid-cols-[280px_1fr]">
    <div
      class="rounded-xl border border-black/10 bg-neutral-950 p-5 font-mono text-sm leading-7 text-neutral-100 dark:border-white/10">
      <div><span class="text-neutral-500">$</span> leaf config:publish</div>
      <div><span class="text-neutral-500">$</span> leaf config:publish &lt;config-file&gt;</div>
    </div>
    <div class="overflow-hidden rounded-xl border border-black/10 bg-white dark:border-white/10 dark:bg-white/[0.02]">
      <div
        class="grid grid-cols-2 border-b border-black/10 bg-neutral-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-neutral-400">
        <span>Config</span>
        <span>Use case</span>
      </div>
      <div v-for="item in configs" :key="item.name"
        class="grid grid-cols-2 border-b border-black/5 px-4 py-3 text-sm last:border-0 dark:border-white/5">
        <code class="text-neutral-950 dark:text-neutral-50">{{ item.name }}</code>
        <span class="text-neutral-600 dark:text-neutral-400">{{ item.use }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  section: {
    type: String,
    required: true,
  },
});

const heroStats = [
  { value: '1 map', label: 'for humans and AI' },
  { value: '0 lock-in', label: 'just PHP' },
];

const bestFor = [
  {
    title: 'Products with real users',
    description: 'Dashboards, portals, CMS projects, admin tools, and apps that need room to grow.',
  },
  {
    title: 'Teams and AI assistants',
    description: 'A predictable code map makes changes easier to review, extend, and generate.',
  },
  {
    title: 'APIs and full-stack apps',
    description: 'Keep backend logic organized while using the frontend stack you already like.',
  },
];

const mvcParts = [
  {
    kicker: 'Model',
    title: 'Data and rules',
    description: 'Models represent your data, query storage, and keep business rules close to the records they affect.',
  },
  {
    kicker: 'View',
    title: 'The interface',
    description: 'Views render HTML, Blade, BareUI, Inertia, React, Vue, or any frontend your product needs.',
  },
  {
    kicker: 'Controller',
    title: 'Request handling',
    description: 'Controllers receive requests, call the right logic, and return responses without burying intent.',
  },
];

const flow = ['Route receives request', 'Controller coordinates work', 'Model or service handles logic', 'View or JSON returns result'];

const folders = [
  {
    title: 'app/',
    description: 'Your controllers, models, views, routes, database files, and application logic.',
  },
  {
    title: 'public/',
    description: 'The only browser-exposed directory, usually for bundled CSS, JavaScript, and images.',
  },
];

const configs = [
  { name: 'app', use: 'core app behavior' },
  { name: 'auth', use: 'authentication' },
  { name: 'database', use: 'database connections' },
  { name: 'view', use: 'view rendering' },
  { name: 'mail', use: 'mail delivery' },
  { name: 'queue', use: 'queued jobs' },
  { name: 'cors', use: 'cross-origin requests' },
  { name: 'csrf', use: 'CSRF protection' },
];

const paths = [
  {
    eyebrow: 'Full-stack',
    title: 'Build with MVC',
    description: 'Use controllers, views, models, services, and frontend tooling to ship a complete product.',
    cta: 'Open the MVC guide',
    href: '/learn/mvc',
  },
  {
    eyebrow: 'API',
    title: 'Structure your backend',
    description: 'Use Leaf MVC as a clean backend map for React, Vue, Svelte, mobile apps, and AI interfaces.',
    cta: 'Create an API',
    href: '/learn/api',
  },
];
</script>

<style scoped>
.mvc-intro :where(p, h2, h3) {
  margin: 0;
  border: 0;
  padding: 0;
}

.mvc-intro :where(a, code) {
  font-size: inherit;
}
</style>
