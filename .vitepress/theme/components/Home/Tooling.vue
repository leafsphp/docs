<script setup>
import { ref } from 'vue';
import { ui } from './ui';

const properties = [
  {
    title: 'Consistent by default',
    description: 'Every part of your app follows the same patterns, so nothing feels out of place.',
  },
  {
    title: 'Predictable structure',
    description: 'You always know where things live and how they connect.',
  },
  {
    title: 'Clean, readable code',
    description: 'What you build stays easy to understand and maintain.',
  },
  {
    title: 'Built to extend',
    description: 'Adding new features doesn\'t break the system or create chaos.',
  },
];

const tab = ref(properties[0].title);
</script>

<template>
  <section :class="[ui.section, ui.spacious]">
    <header :class="[ui.header, ui.headerWide]">
      <p :class="ui.eyebrow">Architecture</p>
      <h2 :class="ui.title">Your code stays structured. No matter how you build.</h2>
      <p :class="ui.subtitle">
        Leaf keeps your app consistent, readable, and easy for AI to reason about from day one, so every feature, change,
        and iteration fits naturally into your codebase.
      </p>
    </header>

    <div :class="[ui.panel, 'mt-10 grid lg:grid-cols-[320px_1fr]']">
      <span :class="[ui.marker, ui.markerTL]" aria-hidden="true" />
      <span :class="[ui.marker, ui.markerTR]" aria-hidden="true" />
      <span :class="[ui.marker, ui.markerBL]" aria-hidden="true" />
      <span :class="[ui.marker, ui.markerBR]" aria-hidden="true" />

      <aside class="border-b border-black/[0.08] bg-neutral-50/70 p-2 dark:border-white/[0.08] dark:bg-white/[0.025] lg:border-b-0 lg:border-r">
        <div class="flex gap-2 overflow-x-auto lg:block lg:space-y-1 lg:overflow-visible">
          <button
            v-for="item in properties"
            :key="item.title"
            :class="tab !== item.title
              ? 'border-transparent text-neutral-500 hover:bg-white hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-white/[0.04] dark:hover:text-neutral-50'
              : 'border-[var(--vp-c-brand-1)] bg-[color-mix(in_srgb,var(--vp-c-brand-1)_10%,white)] text-neutral-950 dark:bg-[color-mix(in_srgb,var(--vp-c-brand-1)_16%,transparent)] dark:text-neutral-50'"
            class="group flex min-w-[220px] flex-1 flex-col rounded-none px-4 py-4 text-left transition-colors duration-200 lg:min-w-0"
            @click.prevent="tab = item.title"
          >
            <span class="text-sm font-semibold tracking-[-0.01em]">{{ item.title }}</span>
            <span class="mt-1 hidden text-sm leading-6 text-neutral-500 dark:text-neutral-400 lg:block">{{ item.description }}</span>
          </button>
        </div>
      </aside>

      <div class="min-h-[540px] bg-white dark:bg-[#070707]">
          <!-- Consistent by default -->
          <div
            class="h-full w-full overflow-y-auto p-6 md:p-8 lg:p-12"
            v-show="tab === 'Consistent by default'">
            <p :class="ui.codeLabel">Pattern language</p>
            <h3 class="!m-0 !border-0 !p-0 text-2xl font-semibold tracking-[-0.03em] text-neutral-950 dark:text-neutral-50">{{ properties[0].title }}</h3>
            <div class="mt-5 space-y-5 leading-relaxed text-neutral-600 dark:text-neutral-300">
              <p>Every module in Leaf follows the same API patterns. Routes, controllers, models, and services all use
                familiar patterns, so you don't have to learn a different way for each part.</p>

              <div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span
                  class="lang">php</span>
                <pre
                  class="shiki shiki-themes github-light github-dark vp-code dark:!bg-[var(--vp-c-bg)] !bg-[var(--vp-c-bg-alt)]"
                  tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">auth</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">login</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([...]);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">db</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">select</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(...)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">where</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([...]);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cache</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">'key'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">response</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">json</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([...]);</span></span></code></pre>
              </div>

              <p>Same fluent, chainable pattern across everything. This predictability is what makes tools <span class="text-[var(--vp-c-brand)]">and AI</span> work
                better with your code.</p>
            </div>
          </div>

          <!-- Predictable structure -->
          <div
            class="h-full w-full overflow-y-auto p-6 md:p-8 lg:p-12"
            v-show="tab === 'Predictable structure'">
            <p :class="ui.codeLabel">Project map</p>
            <h3 class="!m-0 !border-0 !p-0 text-2xl font-semibold tracking-[-0.03em] text-neutral-950 dark:text-neutral-50">{{ properties[1].title }}</h3>
            <div class="mt-5 space-y-5 leading-relaxed text-neutral-600 dark:text-neutral-300">
              <p>Controllers handle requests. Models query data. Views render the UI. Everything lives where you'd
                expect it.</p>

              <div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span
                  class="lang">bash</span>
                <pre
                  class="shiki shiki-themes github-light github-dark vp-code dark:!bg-[var(--vp-c-bg)] !bg-[var(--vp-c-bg-alt)]"
                  tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">app/</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  controllers/  <span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// request handlers</span></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  models/       <span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// data queries</span></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  views/        <span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// views and UI</span></span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  routes/       <span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// all endpoints</span></span></span></code></pre>
              </div>

              <p>No hunting for files. No hidden conventions. Your entire structure is immediately obvious to anyone
                reading it, <span class="text-[var(--vp-c-brand-1)]">especially AI and new team members</span></p>
            </div>
          </div>

          <!-- Clean, readable code -->
          <div
            class="h-full w-full overflow-y-auto p-6 md:p-8 lg:p-12"
            v-show="tab === 'Clean, readable code'">
            <p :class="ui.codeLabel">Application logic</p>
            <h3 class="!m-0 !border-0 !p-0 text-2xl font-semibold tracking-[-0.03em] text-neutral-950 dark:text-neutral-50">{{ properties[2].title }}</h3>
            <div class="mt-5 space-y-5 leading-relaxed text-neutral-600 dark:text-neutral-300">
              <p>Leaf keeps boilerplate out of the way. You write what matters.</p>

              <div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span
                  class="lang">php</span>
                <pre
                  class="shiki shiki-themes github-light github-dark vp-code dark:!bg-[var(--vp-c-bg)] !bg-[var(--vp-c-bg-alt)]"
                  tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> storeUser</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  $data </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> request</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">validate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([...]); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// validated</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  User::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">($data);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> response</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">json</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([...]); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// sent</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre>
              </div>

              <p>No framework noise. Just your application logic, clearly expressed.</p>
            </div>
          </div>

          <!-- Built to extend -->
          <div
            class="h-full w-full overflow-y-auto p-6 md:p-8 lg:p-12"
            v-show="tab === 'Built to extend'">
            <p :class="ui.codeLabel">Agent-ready extension</p>
            <h3 class="!m-0 !border-0 !p-0 text-2xl font-semibold tracking-[-0.03em] text-neutral-950 dark:text-neutral-50">{{ properties[3].title }}</h3>
            <div class="mt-5 space-y-5 leading-relaxed text-neutral-600 dark:text-neutral-300">
              <p>Because everything follows the same patterns, <span class="font-semibold text-[var(--vp-c-brand)]">AI can generate code that fits perfectly</span>. Human code and generated code merge seamlessly. No friction. No cleanup.</p>

              <div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span
                  class="lang">bash</span>
                <pre
                  class="shiki shiki-themes github-light github-dark vp-code dark:!bg-[var(--vp-c-bg)] !bg-[var(--vp-c-bg-alt)]"
                  tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// You: "Build a payment module"</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// AI generates this:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">app/models/Payment.php</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">app/controllers/PaymentController.php</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">app/services/PaymentService.php</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// And it all just works, perfectly placed</span></span></code></pre>
              </div>

              <p><span class="text-[var(--vp-c-brand)]">This is leverage</span>. AI does the repetitive work. You refine, review, and direct. The code stays clean, readable, and under your control. No black boxes. No surprises. Just faster iteration.</p>
            </div>
          </div>
      </div>
    </div>
  </section>
</template>
