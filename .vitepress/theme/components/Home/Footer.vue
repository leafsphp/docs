<script setup>
import { ui } from './ui';
</script>

<template>
  <footer class="relative w-full -mb-4">
    <div class="relative overflow-hidden px-4 py-28 text-center">
      <div
        class="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div class="h-[36rem] w-[64rem] rounded-full opacity-[0.07] blur-[120px]"
          style="background: radial-gradient(50% 50% at 50% 50%, var(--vp-c-brand-1) 0%, transparent 100%);" />
      </div>

      <div :class="[ui.section, '!max-w-4xl relative z-10 text-center']">
        <div :class="[ui.badge, 'mx-auto mb-8 w-fit']">
          <span :class="ui.badgeDot" aria-hidden="true" />
          Leaf 5 · Available now
        </div>

        <h2 class="!m-0 !mb-5 !border-0 !p-0 !pt-10 !text-[clamp(2.5rem,6vw,4.5rem)] font-semibold !leading-[1.08] !tracking-[-0.04em] text-balance text-neutral-950 dark:text-neutral-50">
          Ready to build<br />
          <span class="bg-[linear-gradient(135deg,#0a0a0a_0%,color-mix(in_srgb,var(--vp-c-brand-1)_55%,#0a0a0a)_100%)] bg-clip-text text-transparent dark:bg-[linear-gradient(135deg,#fafafa_0%,color-mix(in_srgb,var(--vp-c-brand-1)_70%,#fafafa)_100%)]">at the speed of thought?</span>
        </h2>

        <p :class="[ui.subtitle, '!mx-auto !mb-10 max-w-xl']">
          Clean code. Predictable structure. Easy for humans and AI to understand.
          Get started with Leaf 5 and experience a new era of PHP.
        </p>

        <div :class="[ui.actions, 'justify-center']">
          <a href="/docs/" :class="[ui.btn, ui.btnPrimary]">
            Get started
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
          <a
            href="https://github.com/leafsphp/leaf"
            target="_blank"
            rel="noopener noreferrer"
            :class="[ui.btn, ui.btnGhost]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Star on GitHub
          </a>
        </div>

        <!-- Social proof metrics -->
        <div class="mt-12 flex flex-wrap items-center justify-center gap-8 border-t border-black/[0.08] pt-10 dark:border-white/[0.08]">
          <div class="flex flex-col items-center gap-0.5">
            <span class="text-2xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">1.3k+</span>
            <span class="text-xs text-neutral-500 dark:text-neutral-400">GitHub stars</span>
          </div>
          <div class="h-6 w-px bg-black/[0.08] dark:bg-white/[0.08]" aria-hidden="true" />
          <div class="flex flex-col items-center gap-0.5">
            <span class="text-2xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">500k+</span>
            <span class="text-xs text-neutral-500 dark:text-neutral-400">Downloads</span>
          </div>
          <div class="h-6 w-px bg-black/[0.08] dark:bg-white/[0.08]" aria-hidden="true" />
          <div class="flex flex-col items-center gap-0.5">
            <span class="text-2xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">MIT</span>
            <span class="text-xs text-neutral-500 dark:text-neutral-400">Open source</span>
          </div>
          <div class="h-6 w-px bg-black/[0.08] dark:bg-white/[0.08]" aria-hidden="true" />
          <div class="flex flex-col items-center gap-0.5">
            <span class="text-2xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">AI-ready</span>
            <span class="text-xs text-neutral-500 dark:text-neutral-400">Project context</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer bar -->
    <div class="border-t border-black/[0.08] bg-neutral-100 dark:border-white/[0.08] dark:bg-white/[0.03]">
      <div class="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-8 md:flex-row md:justify-between">
        <div class="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
          <a href="/" class="text-lg font-semibold tracking-[-0.02em] text-neutral-950 !no-underline dark:text-neutral-50">Leaf<span :class="ui.accent"> V</span></a>
          <nav class="flex flex-wrap justify-center gap-6 [&_a]:text-[0.8125rem] [&_a]:text-neutral-500 [&_a]:!no-underline [&_a]:transition-colors hover:[&_a]:text-neutral-950 dark:[&_a]:text-neutral-400 dark:hover:[&_a]:text-neutral-50" aria-label="Footer navigation">
            <a href="/docs/">Docs</a>
            <a href="https://blog.leafphp.dev" target="_blank" rel="noopener">Blog</a>
            <a href="/community/guide">Community</a>
            <a href="https://hanabira.dev" target="_blank" rel="noopener">Hana JS</a>
            <a href="/support/" class="!text-[var(--vp-c-brand-1)]">Support</a>
            <a href="https://www.netlify.com" target="_blank" rel="noopener">Deploys by Netlify</a>
          </nav>
        </div>

        <div class="flex items-center gap-4 text-neutral-500 dark:text-neutral-400 [&_a]:text-inherit [&_a]:transition-colors hover:[&_a]:text-neutral-950 dark:hover:[&_a]:text-neutral-50">
          <a href="https://github.com/leafsphp/leaf" target="_blank" rel="noopener" aria-label="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a href="https://x.com/leafphp" target="_blank" rel="noopener" aria-label="X / Twitter">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a href="https://discord.gg/Pkrm9NJPE3" target="_blank" rel="noopener" aria-label="Discord">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
            </svg>
          </a>
          <span class="text-xs text-neutral-500 dark:text-neutral-400">
            <a
              href="https://github.com/leafsphp/leaf/blob/v5.x/LICENSE"
              target="_blank"
              rel="noopener"
              class="!text-neutral-500 transition-colors hover:!text-neutral-950 dark:!text-neutral-400 dark:hover:!text-neutral-50"
            >&copy; 2019–{{ (new Date()).getFullYear() }}</a>
          </span>
        </div>
      </div>
    </div>

  </footer>
</template>
