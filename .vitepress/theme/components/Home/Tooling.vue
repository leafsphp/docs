<script setup>
import { ref } from 'vue';

const tooling = [
  // {
  //   icon: '🚦',
  //   title: 'Powerful Routing',
  //   description: 'Leaf comes with a super lightweight but powerful router that handles all the heavy lifting for you.',
  //   // image: '/images/illustrations/routing.svg',
  //   link: '/docs/routing/'
  // },
  {
    icon: '🔐',
    title: 'Dead-simple Authentication',
    description: 'Create full-fledged authentication systems for your API or with a full UI in seconds with Leaf Auth.',
    // image: '/images/illustrations/auth.svg',
    link: '/docs/auth/'
  },
  {
    icon: '💾',
    title: 'Powerful DB Layer',
    description: 'Leaf provides a highly performant database layer for all your queries with support for ORMs like Eloquent.',
    // image: '/images/illustrations/db.svg',
    link: '/docs/database/'
  },
  // {
  //   icon: '🍱',
  //   title: 'Multiple Flavours',
  //   description: 'No application is the same, why should every framework be the same? Customize your Leaf installation with our powerful CLI.',
  //   link: '/docs/cli/',
  // },
  {
    icon: '📡',
    title: 'Simplified Http API',
    description: 'Leaf provides user-friendly APIs for handling requests, CORS, sessions, cookies and everything in-between.',
    link: '/docs/http/request',
  },
  {
    icon: '📦',
    title: 'Useful App Utils',
    description: 'From data fetching to dates, validation, caching, mailing, logging, everyday functions and all those goodies, Leaf has got you covered.',
    link: '/docs/modules',
  },
  // {
  //   icon: '🔍',
  //   title: 'Graceful Erroring',
  //   description: 'There are no “Oh no!” moments with Leaf. We\'ve got all the tools you need to fail-in-style: from devtools to debug modes and custom errors.',
  //   link: '/docs/routing/error-handling',
  // },
  {
    icon: '🎨',
    title: 'Dynamic View Layer',
    description: 'Leaf supports multiple template engines and even frameworks like React, Vue and Svelte.',
    link: '/docs/frontend/',
  },
  // {
  //   icon: '🔧',
  //   title: 'Friendly system utilities',
  //   description: 'Access/modify system info securely without dealing with the complex functions taken directly from C.',
  //   link: '/docs/modules',
  // },
  // {
  //   icon: '🏎️',
  //   title: 'Swoole Support',
  //   description: 'Leaf + Swoole = Rocket + Gravity assist. Leaf offers a clean way to use Swoole with the same API.',
  //   link: '/docs/swoole',
  // },
];

const tab = ref(tooling[0].title);
</script>

<template>
  <section
    class="flex flex-col justify-center items-center mb-24  sm:!max-w-3xl lg:!max-w-5xl xl:!max-w-7xl w-full !px-2 sm:!px-10 !pt-28 !my-48">
    <div class="text-center mb-4">
      <h1 class="md:!text-4xl">Everything you need to build and grow a SaaS</h1>
      <p class="max-w-[700px] md:text-xl">
        Leaf provides lightweight, customizable tools designed to help you to build, ship, and scale—without
        unnecessary complexity. Now, you can quickly go from idea to profitable product.
      </p>
    </div>

    <!-- <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <DataCard v-for="item in tooling" :key="item.title" v-bind="item" />
    </div> -->

    <div
      class="max-w-xl px-4 mx-auto mt-10 lg:max-w-7xl rounded-3xl bg-black/5 p-4 outline outline-white/15 backdrop-blur-md dark:bg-white/10 w-full">
      <div class="space-y-4 lg:grid grid-cols-3 gap-4 lg:space-y-0">
        <div class="w-full">
          <div class="flex space-x-2 sm:space-y-4 sm:space-x-0 sm:block overflow-y-auto max-h-[600px]">
            <button v-for="item in tooling" :key="item.title" :class="tab !== item.title ?
              'hover:bg-white border-neutral-300/60 dark:border-neutral-800 hover:border-neutral-200 dark:hover:bg-[var(--vp-c-bg-alt)] dark:hover:border-neutral-800' :
              'dark:bg-[var(--vp-c-bg-alt)] bg-white border-neutral-200 dark:border-neutral-800'"
              class="flex flex-col items-center flex-1 w-full py-5 space-y-2 text-left duration-200 ease-out border rounded-lg sm:px-6 sm:space-y-0 sm:items-start sm:flex-row sm:rounded-2xl group hover:bg-white border-neutral-300/60 dark:border-neutral-800 hover:border-neutral-200 dark:hover:bg-[var(--vp-c-bg-alt)] dark:hover:border-neutral-800"
              @click.prevent="tab = item.title">
              {{ item.icon }}
              <div :class="tab !== item.title ? 'opacity-80 group-hover:opacity-100' : 'opacity-100'"
                class="opacity-80 group-hover:opacity-100 ml-3">
                <div
                  class="mb-0 text-sm font-medium sm:text-lg sm:font-semibold md:mb-1 text-neutral-700 font-inter-tight dark:text-neutral-200">
                  {{ item.title }}
                </div>
                <div class="hidden text-gray-800 dark:text-gray-300 md:block">{{ item.description }}</div>
              </div>
            </button>
          </div>
        </div>

        <div class="col-span-2">
          <div
            class="w-full bg-white dark:bg-[var(--vp-c-bg-alt)] rounded-2xl p-6 md:p-8 lg:p-14 overflow-y-auto max-h-[600px] h-full"
            v-show="tab === 'Powerful DB Layer'">
            <h3 class="font-bold text-2xl !mt-0">Powerful DB Layer</h3>
            <div class="mt-4 leading-relaxed space-y-4">
              <p>Leaf's DB module takes all the complexity out of data fetching, relationships and saving data in your
                database.</p>

              <div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span
                  class="lang">php</span>
                <pre
                  class="shiki shiki-themes github-light github-dark vp-code dark:!bg-[var(--vp-c-bg)] !bg-[var(--vp-c-bg-alt)]"
                  tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">db</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  -&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">select</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">'users'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  -&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">where</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">'name'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">'John Doe'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  -&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">with</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">'transactions'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  -&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">fetchObj</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre>
              </div>

              <p>
                For more complicated applications, Leaf MVC comes built-in with Eloquent ORM, a powerful and expressive
                ORM that allows you to interact with your database using a simple and expressive syntax.
              </p>

              <div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span
                  class="lang">php</span>
                <pre
                  class="shiki shiki-themes github-light github-dark vp-code dark:!bg-[var(--vp-c-bg)] !bg-[var(--vp-c-bg-alt)]"
                  tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$flight </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Flight</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">where</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">'number'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">'FR 900'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">first</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$flight</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">number </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 'FR 456'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$flight</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">save</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre>
              </div>

              <p><a href="/docs/database/">DB documentation</a>.</p>
            </div>
          </div>

          <div
            class="w-full bg-white dark:bg-[var(--vp-c-bg-alt)] rounded-2xl p-6 md:p-8 lg:p-14 overflow-y-auto max-h-[600px] h-full"
            v-show="tab === 'Dead-simple Authentication'">
            <h3 class="font-bold text-2xl !mt-0">Authentication</h3>
            <div class="mt-4 leading-relaxed space-y-4">
              <p>Sign users in or create accounts using Leaf's Auth module:</p>

              <div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span
                  class="lang">php</span>
                <pre
                  class="shiki shiki-themes github-light github-dark vp-code dark:!bg-[var(--vp-c-bg)] !bg-[var(--vp-c-bg-alt)]"
                  tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">auth</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">login</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">...]);</span></span></code></pre>
              </div>

              <p>
                Leaf will automatically handle the authentication process, including hashing passwords and storing user
                + sessions and JWTs. You can also protect your routes with Leaf's middleware.
              </p>

              <div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span
                  class="lang">php</span>
                <pre
                  class="shiki shiki-themes github-light github-dark vp-code dark:!bg-[var(--vp-c-bg)] !bg-[var(--vp-c-bg-alt)]"
                  tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">app</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">'/login'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">'middleware'</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 'auth.required'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // this route is only accessible to logged in users</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}]);</span></span></code></pre>
              </div>

              <p>From account verification to roles and permissions, Leaf Auth gives you a ton of features right out of
                the box. Check out the <a href="/docs/auth/">authentication documentation</a>.</p>
            </div>
          </div>

          <div
            class="w-full bg-white dark:bg-[var(--vp-c-bg-alt)] rounded-2xl p-6 md:p-8 lg:p-14 overflow-y-auto max-h-[600px] h-full"
            v-show="tab === 'Simplified Http API'">
            <h3 class="font-bold text-2xl !mt-0">Simplified HTTP</h3>
            <div class="mt-4 leading-relaxed space-y-4">
              <p>Leaf abstracts all the annoying little HTTP details and provides a simple API for handling requests,
                CORS, sessions, cookies and everything in-between.</p>

              <div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span
                  class="lang">php</span>
                <pre
                  class="shiki shiki-themes github-light github-dark vp-code dark:!bg-[var(--vp-c-bg)] !bg-[var(--vp-c-bg-alt)]"
                  tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">app</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cors</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">app</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">csrf</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">...);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">session</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">...);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cookies</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">...);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">response</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">json</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">...);</span></span></code></pre>
              </div>

              <p>You can also quickly validate any request that hits your application</p>

              <div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span
                  class="lang">php</span>
                <pre
                  class="shiki shiki-themes github-light github-dark vp-code dark:!bg-[var(--vp-c-bg)] !bg-[var(--vp-c-bg-alt)]"
                  tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$validatedData </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> request</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">validate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  'title'</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 'string|min:5'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  'body'</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 'email'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  'description'</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 'optional|string|min:8'</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$validatedData) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  $errors </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> request</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">errors</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre>
              </div>

              <p>You also have access to flash messages, downloads, redirects, and more.
                Check out the <a href="/docs/http/request.html">HTTP documentation</a>.</p>
            </div>
          </div>

          <div
            class="w-full bg-white dark:bg-[var(--vp-c-bg-alt)] rounded-2xl p-6 md:p-8 lg:p-14 overflow-y-auto max-h-[600px] h-full"
            v-show="tab === 'Useful App Utils'">
            <h3 class="font-bold text-2xl !mt-0">Useful App Utils</h3>
            <div class="mt-4 leading-relaxed space-y-4">
              <p>Leaf provides all the utilities you need to handle all the tiny repetitive tasks that come with
                building
                a web application. Want to send an email? No problem.</p>

              <div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span
                  class="lang">php</span>
                <pre
                  class="shiki shiki-themes github-light github-dark vp-code dark:!bg-[var(--vp-c-bg)] !bg-[var(--vp-c-bg-alt)]"
                  tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mailer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  'subject'</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 'Leaf Mail Test'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  'body'</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 'This is a test mail from Leaf Mail using gmail'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  'recipientEmail'</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 'example@example.com'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  'recipientName'</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 'Example'</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]);</span></span></code></pre>
              </div>

              <p>Need to integrate with an external API? Fetch has you covered.</p>

              <div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span
                  class="lang">php</span>
                <pre
                  class="shiki shiki-themes github-light github-dark vp-code dark:!bg-[var(--vp-c-bg)] !bg-[var(--vp-c-bg-alt)]"
                  tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$response </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fetch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(<span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">'https://example.com/api/something'</span>);</span></span></code></pre>
              </div>

              <p>Saving an uploaded file?</p>

              <div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span
                  class="lang">php</span>
                <pre
                  class="shiki shiki-themes github-light github-dark vp-code dark:!bg-[var(--vp-c-bg)] !bg-[var(--vp-c-bg-alt)]"
                  tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$uploaded </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> storage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">upload</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">'fileToUpload'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">'path/to/uploads'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre>
              </div>

              <p>Date and time formatting?</p>

              <div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span
                  class="lang">php</span>
                <pre
                  class="shiki shiki-themes github-light github-dark vp-code dark:!bg-[var(--vp-c-bg)] !bg-[var(--vp-c-bg-alt)]"
                  tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">tick</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">now</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// get the current timestamp</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">tick</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">format</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">'YYYY-MM-DD'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// format the current timestamp</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">tick</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  -&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">startOf</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">'month'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  -&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">'day'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  -&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">'year'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2018</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  -&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">format</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">'YYYY-MM-DD HH:mm:ss'</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre>
              </div>

              <p>In addition to these, Leaf also provides HTTP Caching, built-in request parsing and more.</p>
            </div>
          </div>

          <div
            class="w-full bg-white dark:bg-[var(--vp-c-bg-alt)] rounded-2xl p-6 md:p-8 lg:p-14 overflow-y-auto max-h-[600px] h-full"
            v-show="tab === 'Dynamic View Layer'">
            <h3 class="font-bold text-2xl !mt-0">Dynamic View Layer</h3>
            <div class="mt-4 leading-relaxed space-y-4">
              <p>Leaf has support for some of the most popular frontend technologies, from templating engines like Blade
                and BareUI, to frontend frameworks like React, Vue and Svelte, bundling with Vite and styling with
                TailwindCSS.</p>

              <p>The choice of frontend technology is yours, and Leaf makes it even easier with commands to scaffold
                your frontend tooling.</p>

              <div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span
                  class="lang">bash</span>
                <pre
                  class="shiki shiki-themes github-light github-dark vp-code dark:!bg-[var(--vp-c-bg)] !bg-[var(--vp-c-bg-alt)]"
                  tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">leaf view:install --react</span></span></code></pre>
              </div>

              <p>Leaf auto-detects your frontend files and bundles them whenever you run the leaf serve command. This
                means you don't really have to do anything to get your frontend working correctly.</p>

              <p>Find out more on the <a href="/docs/frontend/">Frontend documentation</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
