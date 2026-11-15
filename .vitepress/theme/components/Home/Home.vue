<script setup>
import Hero from '../Home2/Hero.vue';
import Readers from '../Home2/Readers.vue';
import FrameworkTabs from '../Home2/FrameworkTabs.vue';
import AgentCards from '../Home2/AgentCards.vue';
import Lab from '../Home2/Lab.vue';
import Testimonials from './Testimonials.vue';
import Sponsors from './Sponsors.vue';
import Footer from './Footer.vue';
</script>

<template>
  <div class="home-shell">
    <Hero />
    <Readers />
    <FrameworkTabs />
    <AgentCards />
    <Lab />
    <Testimonials />
    <Sponsors />
  </div>
  <Footer />
</template>

<style>
.VPContent.is-home .vp-doc.container {
  padding-left: 0 !important;
  padding-right: 0 !important;
  max-width: unset !important;
}

.VPHome {
  margin-bottom: 0 !important;
}

/* guide rails: a bordered container running the full page, sections divided
   by hairlines that meet the rails — sections themselves stay transparent */
.home-shell {
  margin: 0 auto;
  width: 100%;
  max-width: 82rem;
}

@media (min-width: 960px) {
  .home-shell {
    border-left: 1px solid rgba(0, 0, 0, 0.08);
    border-right: 1px solid rgba(0, 0, 0, 0.08);
  }

  .dark .home-shell {
    border-left-color: rgba(255, 255, 255, 0.08);
    border-right-color: rgba(255, 255, 255, 0.08);
  }
}

.home-shell > * + * {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.dark .home-shell > * + * {
  border-top-color: rgba(255, 255, 255, 0.08);
}
</style>
