<script setup>
import Hero from './Hero.vue';
import AIWorkflow from './AIWorkflow.vue';
import Tooling from './Tooling.vue';
import SpeedDemo from './SpeedDemo.vue';
import Sponsors from './Sponsors.vue';
import Testimonials from './Testimonials.vue';
import Community from './Community.vue';
import Ecosystem from './Ecosystem.vue';
import Footer from './Footer.vue';
import FlexibleFrontend from './FlexibleFrontend.vue';
import NewsLetterSubstack from '../Community/NewsLetterSubstack.vue';
import Blog from '../Community/Blog.vue';
import Speak from '../Community/Speak.vue';
import WallOfFame from '../Community/WallOfFame.vue';
</script>

<template>
  <div class="home-shell">
    <Hero />
    <Sponsors />
    <AIWorkflow />
    <SpeedDemo />
    <Tooling />
    <FlexibleFrontend />
    <Ecosystem />
    <Testimonials />
    <Community />
    <Blog />
    <Speak />
    <WallOfFame />
    <NewsLetterSubstack />
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
