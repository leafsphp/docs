<script setup>
import { ui } from '../Home/ui';
</script>

<template>
  <section id="newsletter" :class="ui.band">
    <div :class="[ui.bandInner, '!max-w-xl']">
      <div :class="[ui.panel, 'mb-8 overflow-hidden p-1']">
        <span :class="[ui.marker, ui.markerTL]" aria-hidden="true" />
        <span :class="[ui.marker, ui.markerTR]" aria-hidden="true" />
        <iframe
          src="https://leafphp.substack.com/embed"
          width="100%"
          height="320"
          frameborder="0"
          scrolling="no"
          title="Leaf newsletter"
          class="block w-full rounded-none border-0 bg-neutral-100 dark:bg-white/[0.03]"
        />
      </div>

      <p :class="[ui.subtitle, '!mt-8 !text-center !text-sm']">
        Get notes on Leaf 5, AI-native PHP, and product-building in your inbox. You can also read our blog posts at
        <a :class="[ui.link, '!inline-flex']" href="https://blog.leafphp.dev/" target="_blank" rel="noopener">blog.leafphp.dev</a>.
        You may also go social at
        <a :class="[ui.link, '!inline-flex']" href="https://twitter.com/leafphp" target="_blank" rel="noopener">Twitter</a>,
        join our
        <a :class="[ui.link, '!inline-flex']" href="https://github.com/leafsphp/leaf/discussions/37" target="_blank" rel="noopener">discussions</a>,
        or watch our
        <a :class="[ui.link, '!inline-flex']" href="https://www.youtube.com/channel/UCllE-GsYy10RkxBUK0HIffw" target="_blank" rel="noopener">videos on YouTube</a>.
      </p>
    </div>
  </section>
</template>
