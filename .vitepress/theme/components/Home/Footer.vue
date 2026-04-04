<template>
  <footer class="relative w-full -mb-4">
    <!-- Big statement -->
    <div class="py-24 md:py-36 px-4 sm:px-6 lg:px-8">
      <div class="max-w-5xl mx-auto text-center">
        <h2 class="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight !border-none !mb-6">
          Ready to build<br class="hidden sm:block" /> <span class="text-[var(--vp-c-brand)]">at the speed of thought?</span>
        </h2>
        <p class="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl !mx-auto !mb-10">
          Clean code. Predictable structure. Easy for humans and AI to understand. Get started with Leaf V and experience a new era of PHP.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/docs/"
            class="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--vp-c-brand)] !text-white font-semibold text-base hover:opacity-90 transition-opacity ![text-decoration:none]">
            Get started
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>
          <a href="https://github.com/leafsphp/leaf" target="_blank"
            class="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-gray-300 dark:border-white/15 font-semibold text-base hover:border-[var(--vp-c-brand)] hover:text-[var(--vp-c-brand)] transition-colors ![text-decoration:none] !text-[var(--vp-c-text-1)]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            Star on GitHub
          </a>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="bg-[var(--vp-c-bg-alt)] border-t border-gray-200 dark:border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <!-- Left: brand + links -->
          <div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <a href="/" class="!no-underline !text-[var(--vp-c-text-1)] text-lg font-bold tracking-tight">Leaf<span class="text-[var(--vp-c-brand-1)]"> V</span></a>
            <nav class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <a href="/docs/" class="text-sm text-gray-500 dark:text-gray-400 hover:text-[var(--vp-c-brand)] transition-colors !no-underline">Docs</a>
              <a href="https://blog.leafphp.dev" target="_blank" class="text-sm text-gray-500 dark:text-gray-400 hover:text-[var(--vp-c-brand)] transition-colors !no-underline">Blog</a>
              <a href="/community/guide" class="text-sm text-gray-500 dark:text-gray-400 hover:text-[var(--vp-c-brand)] transition-colors !no-underline">Community</a>
              <a href="https://hanabira.dev" target="_blank" class="text-sm text-gray-500 dark:text-gray-400 hover:text-[var(--vp-c-brand)] transition-colors !no-underline">Hana JS</a>
              <a href="/support/" class="text-sm text-[var(--vp-c-brand)] font-medium hover:opacity-80 transition-opacity !no-underline">Support</a>
            </nav>
          </div>

          <div class="flex items-center gap-5">
            <a href="https://github.com/leafsphp/leaf" target="_blank" class="text-gray-400 hover:text-[var(--vp-c-brand)] transition-colors" aria-label="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://x.com/leafphp" target="_blank" class="text-gray-400 hover:text-[var(--vp-c-brand)] transition-colors" aria-label="X">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://discord.gg/Pkrm9NJPE3" target="_blank" class="text-gray-400 hover:text-[var(--vp-c-brand)] transition-colors" aria-label="Discord">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>
            </a>
            <span class="text-xs text-gray-400 dark:text-gray-500 ml-2">
              <a href="https://github.com/leafsphp/leaf/blob/v5.x/LICENSE" target="_blank"
                class="!no-underline !text-gray-400 dark:!text-gray-500 hover:!text-[var(--vp-c-brand)] transition-colors">&copy; 2019–{{ (new Date()).getFullYear() }}</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
