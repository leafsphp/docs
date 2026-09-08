<template>
  <p>Leaf is a PHP framework designed to stay light, while giving you production-ready pieces to handle all the heavy-lifting as soon as you need them. We rebuilt the Leaf experience with AI in mind, so you and your agents can build at the speed of thought hehe</p>

  <p>Here is the smallest possible Leaf app:</p>

  <div class="language-php vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span
      class="lang">php</span>
    <pre class="shiki shiki-themes one-dark-pro one-dark-pro vp-code"
      tabindex="0"><code><span class="line"><span style="--shiki-light:#56B6C2;--shiki-dark:#56B6C2;">&lt;</span><span style="--shiki-light:#C678DD;--shiki-dark:#C678DD;">?</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">php</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#C678DD;--shiki-dark:#C678DD;">require</span><span style="--shiki-light:#D19A66;--shiki-dark:#D19A66;"> __DIR__</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;"> .</span><span style="--shiki-light:#98C379;--shiki-dark:#98C379;"> '/vendor/autoload.php'</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">app</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">()-&gt;</span><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">get</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#98C379;--shiki-dark:#98C379;">'/'</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#C678DD;--shiki-dark:#C678DD;">fn</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;"> () => </span></span><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">response</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">()-&gt;</span><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">json</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">([</span>
<span class="line"><span style="--shiki-light:#98C379;--shiki-dark:#98C379;">  'message'</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;"> =&gt; </span><span style="--shiki-light:#98C379;--shiki-dark:#98C379;">'Hello World!'</span></span>
<span class="line"><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">]));</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">app</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">()-&gt;</span><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">run</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">();</span></span></code></pre>
    <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span
        class="line-number">2</span><br><span class="line-number">3</span><br><span
        class="line-number">4</span><br><span class="line-number">5</span><br><span
        class="line-number">6</span><br><span class="line-number">7</span><br><span
        class="line-number">8</span><br><span class="line-number">9</span><br></div>
  </div>

  <p>And when you need more, install only what the project needs:</p>

  <div class="docs-start not-prose my-6 overflow-hidden rounded-none border border-black/10 bg-white dark:border-white/10 dark:bg-white/[0.02]">
    <div class="grid sm:grid-cols-2">
      <div
        v-for="(method, i) in installMethods"
        :key="method.label"
        class="border-b border-black/10 last:border-b-0 dark:border-white/10 sm:border-b-0"
        :class="i === 0 ? 'sm:border-r sm:border-black/10 sm:dark:border-white/10' : ''"
      >
        <div class="flex items-center justify-between gap-4 border-b border-black/10 px-4 py-2.5 dark:border-white/10">
          <span class="font-mono text-[0.68rem] font-medium uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">{{ method.label }}</span>
          <span class="font-mono text-[0.65rem] text-neutral-400 dark:text-neutral-500">{{ method.hint }}</span>
        </div>
        <button
          type="button"
          class="group flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-neutral-50 dark:hover:bg-white/[0.03]"
          :aria-label="`Copy ${method.cmd}`"
          @click="copyInstall(i)"
        >
          <span class="font-mono text-[0.85rem] text-neutral-900 dark:text-neutral-100">
            <span class="select-none text-neutral-400 dark:text-neutral-500">$ </span>{{ method.lead }}<span class="text-[var(--vp-c-brand-1)]">&lt;package-name&gt;</span>
          </span>
          <span class="shrink-0 font-mono text-[0.7rem]" :class="copied === i ? 'text-emerald-500' : 'text-neutral-400 opacity-0 transition-opacity group-hover:opacity-100 dark:text-neutral-500'">
            {{ copied === i ? 'copied ✓' : 'copy' }}
          </span>
        </button>
      </div>
    </div>
  </div>

  <p>In short, Leaf provides a streamlined development experience with all the essential tools ready to go.</p>

  <div class="docs-start docs-paths docs-paths--four not-prose my-6">
    <div v-for="(item, index) in features" :key="item.title" class="docs-path-card docs-path-card--static">
      <span class="docs-path-index">0{{ index + 1 }} / {{ item.kicker }}</span>
      <strong class="docs-path-title">{{ item.title }}</strong>
      <span class="docs-path-description">{{ item.description }}</span>
    </div>
  </div>

  <details class="details custom-block">
    <summary>Technical Requirements</summary>
    <p>Before you start with Leaf, verify that your system has the following installed:</p>
    <ul>
      <li>PHP v8.2 or higher</li>
      <li>Composer for package management</li>
      <li><a href="/docs/cli/">Leaf CLI</a> optional, but recommended for easier app management</li>
    </ul>
    <p>If you don't have PHP and Composer installed, here are some easy options to get you set up:</p>
    <ul>
      <li><a href="https://herd.laravel.com/">Laravel Herd</a> gives Mac and Windows developers a quick local PHP environment.</li>
      <li><a href="https://php.new/">php.new</a> installs PHP and Composer on Windows, Linux, and Mac with one command.</li>
      <li><a href="https://www.apachefriends.org/">Xampp</a> is the traditional cross-platform web server package.</li>
    </ul>
  </details>
</template>

<script setup>
import { ref } from 'vue';

const installMethods = [
  { label: 'Leaf CLI', hint: 'recommended', lead: 'leaf install ', cmd: 'leaf install <package-name>' },
  { label: 'Composer', hint: 'plain PHP workflow', lead: 'composer require leafs/', cmd: 'composer require leafs/<package-name>' },
];

const copied = ref(null);
let copyTimer;

function copyInstall(i) {
  navigator.clipboard?.writeText(installMethods[i].cmd).catch(() => {});
  copied.value = i;
  clearTimeout(copyTimer);
  copyTimer = setTimeout(() => (copied.value = null), 1600);
}

const features = [
  {
    kicker: 'Request flow',
    title: 'Routing and middleware',
    description: 'Clean endpoints, groups, dynamic routes, and request flow without framework noise.',
  },
  {
    kicker: 'Protection',
    title: 'Auth, sessions, and security',
    description: 'Login, signup, JWT, CSRF, headers, encryption, and protected routes are ready when you are.',
  },
  {
    kicker: 'Data',
    title: 'Database tools',
    description: 'Use the query builder, models, Redis, files, validation, and migrations around your own app shape.',
  },
  {
    kicker: 'AI context',
    title: 'Agent-friendly context',
    description: 'Leaf keeps conventions visible so prompts become implementation, not a guessing game.',
  },
];
</script>

<style scoped>
.docs-start :where(p, h2, h3) {
  margin: 0;
  border: 0;
  padding: 0;
}

.docs-start :where(a, code) {
  font-size: inherit;
}
</style>
