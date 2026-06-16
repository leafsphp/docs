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

    <!-- <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <DataCard v-for="item in tooling" :key="item.title" v-bind="item" />
    </div> -->

    <div
      class="max-w-xl px-4 mx-auto mt-10 lg:max-w-7xl rounded-3xl bg-black/5 p-4 outline outline-white/15 backdrop-blur-md dark:bg-white/10 w-full">
      <div class="space-y-4 lg:grid grid-cols-3 gap-4 lg:space-y-0">
        <div class="w-full">
          <div class="flex space-x-2 sm:space-y-4 sm:space-x-0 sm:block overflow-y-auto max-h-[600px]">
            <button v-for="item in properties" :key="item.title" :class="tab !== item.title ?
              'hover:bg-white border-neutral-300/60 dark:border-neutral-800 hover:border-neutral-200 dark:hover:bg-[var(--vp-c-bg-alt)] dark:hover:border-neutral-800' :
              'dark:bg-[var(--vp-c-bg-alt)] bg-white border-neutral-200 dark:border-neutral-800'"
              class="flex flex-col items-center flex-1 w-full py-5 space-y-2 text-left duration-200 ease-out border rounded-lg sm:px-6 sm:space-y-0 sm:items-start sm:flex-row sm:rounded-2xl group hover:bg-white border-neutral-300/60 dark:border-neutral-800 hover:border-neutral-200 dark:hover:bg-[var(--vp-c-bg-alt)] dark:hover:border-neutral-800"
              @click.prevent="tab = item.title">
              <div :class="tab !== item.title ? 'opacity-80 group-hover:opacity-100' : 'opacity-100'"
                class="opacity-80 group-hover:opacity-100 ml-3">
                <div
                  class="mb-0 text-sm font-medium sm:text-lg sm:font-semibold md:mb-1 text-neutral-700 font-inter-tight dark:text-neutral-200">
                  {{ item.title }}
                </div>
                <div class="hidden text-gray-600 dark:text-gray-400 md:block text-sm">{{ item.description }}</div>
              </div>
            </button>
          </div>
        </div>

        <div class="col-span-2">
          <!-- Consistent by default -->
          <div
            class="w-full bg-white dark:bg-[var(--vp-c-bg-alt)] rounded-2xl p-6 md:p-8 lg:p-14 overflow-y-auto max-h-[600px] h-full"
            v-show="tab === 'Consistent by default'">
            <h3 class="font-bold text-2xl !mt-0">{{ properties[0].title }}</h3>
            <div class="mt-4 leading-relaxed space-y-4">
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
            class="w-full bg-white dark:bg-[var(--vp-c-bg-alt)] rounded-2xl p-6 md:p-8 lg:p-14 overflow-y-auto max-h-[600px] h-full"
            v-show="tab === 'Predictable structure'">
            <h3 class="font-bold text-2xl !mt-0">{{ properties[1].title }}</h3>
            <div class="mt-4 leading-relaxed space-y-4">
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
            class="w-full bg-white dark:bg-[var(--vp-c-bg-alt)] rounded-2xl p-6 md:p-8 lg:p-14 overflow-y-auto max-h-[600px] h-full"
            v-show="tab === 'Clean, readable code'">
            <h3 class="font-bold text-2xl !mt-0">{{ properties[2].title }}</h3>
            <div class="mt-4 leading-relaxed space-y-4">
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
            class="w-full bg-white dark:bg-[var(--vp-c-bg-alt)] rounded-2xl p-6 md:p-8 lg:p-14 overflow-y-auto max-h-[600px] h-full"
            v-show="tab === 'Built to extend'">
            <h3 class="font-bold text-2xl !mt-0">{{ properties[3].title }}</h3>
            <div class="mt-4 leading-relaxed space-y-4">
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
    </div>
  </section>
</template>
