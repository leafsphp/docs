<template>
  <div class="docs-start not-prose mt-6 overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.02]">
    <div class="grid lg:grid-cols-[1fr_320px]">
      <div class="border-b border-black/10 p-6 dark:border-white/10 md:p-8 lg:border-b-0 lg:border-r">
        <p class="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--vp-c-brand-1)]">Get started</p>
        <h2 class="m-0 border-0 p-0 text-2xl font-semibold tracking-[-0.03em] text-neutral-950 dark:text-neutral-50 md:text-3xl">
          A full PHP app in about a minute.
        </h2>
        <p class="mt-4 max-w-2xl text-base leading-7 text-neutral-600 dark:text-neutral-400">
          Leaf gives you the clean starting point first: routing, structure, helpers, and a project shape that stays readable for you, your team, and your AI tools.
        </p>

        <div class="mt-6 overflow-hidden rounded-lg border border-black/10 bg-neutral-950 dark:border-white/10">
          <div class="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div class="flex items-center gap-2">
              <span class="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
              <span class="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
              <span class="h-2.5 w-2.5 rounded-full bg-[#2dd4bf]" />
            </div>
            <span class="font-mono text-xs text-neutral-500">terminal</span>
          </div>
          <div class="overflow-x-auto p-5 font-mono text-sm leading-7 text-neutral-100">
            <div><span class="text-neutral-500">$</span> composer global require leafs/cli -W</div>
            <div><span class="text-neutral-500">$</span> leaf create my-app</div>
            <div><span class="text-neutral-500">$</span> cd my-app</div>
            <div><span class="text-neutral-500">$</span> leaf serve</div>
          </div>
        </div>

        <p class="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
          Open <code>http://localhost:5500</code> and you have a running app. No setup maze, no ceremony.
        </p>
      </div>

      <div class="bg-neutral-50 p-6 dark:bg-white/[0.03] md:p-8">
        <p class="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">Why it matters</p>
        <div class="space-y-5">
          <div>
            <h3 class="m-0 border-0 p-0 text-base font-semibold text-neutral-950 dark:text-neutral-50">Small surface area</h3>
            <p class="mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Start with the parts you need. Add auth, database, queues, mail, and more when the app asks for them.</p>
          </div>
          <div>
            <h3 class="m-0 border-0 p-0 text-base font-semibold text-neutral-950 dark:text-neutral-50">AI-readable by default</h3>
            <p class="mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Routes, modules, and app conventions stay obvious, so assistants can generate code that fits your project.</p>
          </div>
          <div>
            <h3 class="m-0 border-0 p-0 text-base font-semibold text-neutral-950 dark:text-neutral-50">Still just PHP</h3>
            <p class="mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">No hidden runtime or lock-in. Deploy anywhere PHP runs.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <h2>Everything you need, nothing you don't</h2>

  <p>Leaf is designed to stay light while giving you production-ready pieces as soon as you need them.</p>

  <div class="docs-start docs-paths docs-paths--four not-prose my-6">
    <div v-for="(item, index) in features" :key="item.title" class="docs-path-card docs-path-card--static">
      <span class="docs-path-index">0{{ index + 1 }} / {{ item.kicker }}</span>
      <strong class="docs-path-title">{{ item.title }}</strong>
      <span class="docs-path-description">{{ item.description }}</span>
    </div>
  </div>

  <p>Here is the smallest possible Leaf app:</p>

  <div class="language-php vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span
      class="lang">php</span>
    <pre class="shiki shiki-themes one-dark-pro one-dark-pro vp-code"
      tabindex="0"><code><span class="line"><span style="--shiki-light:#56B6C2;--shiki-dark:#56B6C2;">&lt;</span><span style="--shiki-light:#C678DD;--shiki-dark:#C678DD;">?</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">php</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#C678DD;--shiki-dark:#C678DD;">require</span><span style="--shiki-light:#D19A66;--shiki-dark:#D19A66;"> __DIR__</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;"> .</span><span style="--shiki-light:#98C379;--shiki-dark:#98C379;"> '/vendor/autoload.php'</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">app</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">()-&gt;</span><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">get</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#98C379;--shiki-dark:#98C379;">'/'</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#C678DD;--shiki-dark:#C678DD;">function</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;"> () {</span></span>
<span class="line"><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">  response</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">()-&gt;</span><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">json</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">([</span><span style="--shiki-light:#98C379;--shiki-dark:#98C379;">'message'</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;"> =&gt; </span><span style="--shiki-light:#98C379;--shiki-dark:#98C379;">'Hello World!'</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">]);</span></span>
<span class="line"><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">app</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">()-&gt;</span><span style="--shiki-light:#61AFEF;--shiki-dark:#61AFEF;">run</span><span style="--shiki-light:#ABB2BF;--shiki-dark:#ABB2BF;">();</span></span></code></pre>
    <div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span
        class="line-number">2</span><br><span class="line-number">3</span><br><span
        class="line-number">4</span><br><span class="line-number">5</span><br><span
        class="line-number">6</span><br><span class="line-number">7</span><br><span
        class="line-number">8</span><br><span class="line-number">9</span><br></div>
  </div>

  <p>And when you need more, install only what the project needs:</p>

  <div class="docs-start not-prose my-6 grid gap-3 sm:grid-cols-2">
    <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
      <p class="m-0 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">Leaf CLI</p>
      <code class="mt-3 block rounded-md bg-neutral-950 px-3 py-2 font-mono text-sm text-neutral-100">leaf install &lt;package-name&gt;</code>
    </div>
    <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
      <p class="m-0 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">Composer</p>
      <code class="mt-3 block rounded-md bg-neutral-950 px-3 py-2 font-mono text-sm text-neutral-100">composer require leafs/&lt;package-name&gt;</code>
    </div>
  </div>

  <p>Tell your AI assistant to "build out authentication" and it can follow Leaf's structure instead of inventing one.</p>

  <details class="details custom-block">
    <summary>Technical Requirements</summary>
    <p>Before you start with Leaf, verify that your system has the following installed:</p>
    <ul>
      <li>PHP v7.4 or higher</li>
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
