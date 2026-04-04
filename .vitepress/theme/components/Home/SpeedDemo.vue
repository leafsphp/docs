<template>
  <section id="speed"
    class="flex flex-col justify-center items-center sm:!max-w-3xl lg:!max-w-5xl xl:!max-w-7xl w-full !px-2 sm:!px-10 !py-28 !my-24">
    <div class="text-center mb-16 max-w-3xl">
      <h2 class="!text-3xl md:!text-5xl font-bold !mb-4 !border-none">Real code. Less friction. Faster flow.</h2>
      <p class="text-lg text-gray-600 dark:text-gray-400">
        AI-first design meets battle-tested PHP code, giving you the power to ship real products faster and cheaper than ever
        before.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
      <div
        class="step-card group relative rounded-2xl border border-[var(--vp-c-border-alt)] dark:border-[var(--vp-c-divider)] bg-[var(--vp-c-card-bg)] p-8 transition-all duration-300 hover:border-[var(--vp-c-brand-1)]/40 hover:shadow-lg hover:shadow-[var(--vp-c-brand-1)]/5">
        <div class="flex items-center gap-3 mb-4">
          <span
            class="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-500/10 text-[var(--vp-c-brand-1)] font-bold text-lg">1</span>
          <h3 class="!text-xl font-bold !m-0">Start with structure</h3>
        </div>
        <p class="text-gray-600 dark:text-gray-400 mb-4">Spin up a full project with auth, db, and routing already
          in place, or generate your own custom setup with AI.</p>
        <div class="rounded-lg bg-[var(--vp-code-block-bg)] px-4 py-3 font-mono text-sm text-gray-300">
          <span class="text-gray-500">$</span> leaf create my-product
        </div>
      </div>

      <div
        class="step-card group relative rounded-2xl border border-[var(--vp-c-border-alt)] dark:border-[var(--vp-c-divider)] bg-[var(--vp-c-card-bg)] p-8 transition-all duration-300 hover:border-[var(--vp-c-brand-1)]/40 hover:shadow-lg hover:shadow-[var(--vp-c-brand-1)]/5">
        <div class="flex items-center gap-3 mb-4">
          <span
            class="flex items-center justify-center w-10 h-10 rounded-xl bg-yellow-300/10 text-[var(--vp-c-brand-3)] font-bold text-lg">2</span>
          <h3 class="!text-xl font-bold !m-0">Write logic, not boilerplate</h3>
        </div>
        <p class="text-gray-600 dark:text-gray-400 mb-4">From AI or your keyboard, write the logic that matters without getting bogged down in repetitive boilerplate.</p>
        <div class="rounded-lg bg-[var(--vp-code-block-bg)] px-4 py-3 font-mono text-sm text-gray-300">
          <span class="text-[#E8873A]">auth</span>()-><span class="text-[#E8873A]">login</span>([...]);
        </div>
      </div>

      <div
        class="step-card group relative rounded-2xl border border-[var(--vp-c-border-alt)] dark:border-[var(--vp-c-divider)] bg-[var(--vp-c-card-bg)] p-8 transition-all duration-300 hover:border-[var(--vp-c-brand-1)]/40 hover:shadow-lg hover:shadow-[var(--vp-c-brand-1)]/5">
        <div class="flex items-center gap-3 mb-4">
          <span
            class="flex items-center justify-center w-10 h-10 rounded-xl bg-[#C0392B]/10 text-[#C0392B] font-bold text-lg">3</span>
          <h3 class="!text-xl font-bold !m-0">Ship without friction</h3>
        </div>
        <p class="text-gray-600 dark:text-gray-400 mb-4">Deploy anywhere PHP runs. No lock-in, no hidden layers, just
          your product running the way you built it.</p>
        <div class="rounded-lg bg-[var(--vp-code-block-bg)] px-4 py-3 font-mono text-sm text-gray-300">
          <span class="text-gray-500">$</span> leaf deploy
        </div>
      </div>
    </div>

    <!-- Speed metrics strip -->
    <div class="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 text-center">
      <div>
        <div class="text-3xl md:text-4xl font-bold text-[var(--vp-c-brand-1)]">~30s</div>
        <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">to scaffold a project</div>
      </div>
      <div>
        <div class="text-3xl md:text-4xl font-bold text-[var(--vp-c-brand-1)]">0</div>
        <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">config files to write</div>
      </div>
      <div>
        <div class="text-3xl md:text-4xl font-bold text-[var(--vp-c-brand-1)]">1.2s</div>
        <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">server cold start</div>
      </div>
      <div>
        <div class="text-3xl md:text-4xl font-bold text-[var(--vp-c-brand-1)]">∞</div>
        <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">hours saved per project</div>
      </div>
    </div>
  </section>
</template>
