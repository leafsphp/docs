<script setup>
// Homepage direction F (Nov 2026): builders and agents, framework first.
import Hero from '../Home3/Hero.vue';
import Demo from '../Home3/Demo.vue';
import Sponsors from '../Home3/Sponsors.vue';
import OneCommand from '../Home3/OneCommand.vue';
import WhyLeaf from '../Home3/WhyLeaf.vue';
import WhereLeafSits from '../Home3/WhereLeafSits.vue';
import Testimonials from '../Home3/Testimonials.vue';
import Ecosystem from '../Home3/Ecosystem.vue';
import Showcase from '../Home3/Showcase.vue';
import FinalCta from '../Home3/FinalCta.vue';
import SiteFooter from '../Home3/SiteFooter.vue';
import '../Home3/home3.css';
</script>

<template>
  <div class="lf">
    <div class="home-shell">
      <Hero />
      <Demo />
      <Sponsors />
      <OneCommand />
      <WhyLeaf />
      <WhereLeafSits />
      <Testimonials />
      <Ecosystem />
      <Showcase />
      <FinalCta />
      <SiteFooter />
    </div>
  </div>
</template>

<style>
.VPContent.is-home .vp-doc.container {
  padding-left: 0 !important;
  padding-right: 0 !important;
  max-width: unset !important;
}

.VPHome {
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}

/* guide rails: a bordered container running the full page, sections divided
   by hairlines that meet the rails */
.home-shell {
  margin: 0 auto;
  width: 100%;
  max-width: 82rem;
}

@media (min-width: 960px) {
  .home-shell {
    border-left: 1px solid var(--lf-line);
    border-right: 1px solid var(--lf-line);
  }
}

.home-shell > * + * {
  border-top: 1px solid var(--lf-line);
}
</style>
