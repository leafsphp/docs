<template>
  <section id="newsletter" class="home-band">
    <div class="home-band__inner home-section !max-w-xl">
      <div class="home-panel overflow-hidden p-1 mb-8">
        <span class="home-marker home-marker--tl" aria-hidden="true" />
        <span class="home-marker home-marker--tr" aria-hidden="true" />
        <iframe
          src="https://leafphp.substack.com/embed"
          width="100%"
          height="320"
          frameborder="0"
          scrolling="no"
          title="Leaf newsletter"
          class="block w-full rounded-lg border-0 bg-[var(--home-surface-muted)]"
        />
      </div>

      <p class="home-section__subtitle !mt-8 !text-center !text-sm">
        You can read our blog posts at
        <a class="home-link !inline-flex" href="https://blog.leafphp.dev/" target="_blank" rel="noopener">blog.leafphp.dev</a>.
        You may also go social at
        <a class="home-link !inline-flex" href="https://twitter.com/leafphp" target="_blank" rel="noopener">Twitter</a>,
        join our
        <a class="home-link !inline-flex" href="https://github.com/leafsphp/leaf/discussions/37" target="_blank" rel="noopener">discussions</a>,
        or watch our
        <a class="home-link !inline-flex" href="https://www.youtube.com/channel/UCllE-GsYy10RkxBUK0HIffw" target="_blank" rel="noopener">videos on YouTube</a>.
      </p>
    </div>
  </section>
</template>
