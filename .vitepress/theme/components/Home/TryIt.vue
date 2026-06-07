<template>
  <div class="home-band">
    <section class="home-band__inner home-section sm:!max-w-3xl lg:!max-w-5xl xl:!max-w-7xl w-full !px-2 sm:!px-10">
      <header class="home-section__header">
        <p class="home-section__eyebrow">Interactive</p>
        <h2 class="home-section__title !mt-0 !pt-0">Try it. It just works.</h2>
        <p class="home-section__subtitle">
          Write real code. Run it instantly. See how everything stays simple, structured, and easy to understand.
        </p>
        <div class="mt-8 flex justify-center">
          <a href="/tutorial/" class="home-btn home-btn--primary">
            <span>Try the tutorial</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor"
                d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
            </svg>
          </a>
        </div>
      </header>

      <div class="home-panel mt-4 overflow-hidden p-2">
        <span class="home-marker home-marker--tl" aria-hidden="true" />
        <span class="home-marker home-marker--tr" aria-hidden="true" />
        <span class="home-marker home-marker--bl" aria-hidden="true" />
        <span class="home-marker home-marker--br" aria-hidden="true" />
        <iframe src="https://sandbox.leafphp.dev/" title="Leaf sandbox"
          class="min-h-[70vh] w-full rounded-lg border-0 bg-[var(--home-surface-muted)]" />
      </div>
    </section>
  </div>
</template>
