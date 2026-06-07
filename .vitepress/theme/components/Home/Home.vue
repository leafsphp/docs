<script setup>
import Hero from './Hero.vue';
import Tooling from './Tooling.vue';
import SpeedDemo from './SpeedDemo.vue';
import TryIt from './TryIt.vue';
import Sponsors from './Sponsors.vue';
import Testimonials from './Testimonials.vue';
import Community from './Community.vue';
import Footer from './Footer.vue';
import FlexibleFrontend from './FlexibleFrontend.vue';
import NewsLetterSubstack from '../Community/NewsLetterSubstack.vue';
import Blog from '../Community/Blog.vue';
import Speak from '../Community/Speak.vue';
import WallOfFame from '../Community/WallOfFame.vue';
</script>

<template>
  <Hero />
  <SpeedDemo />
  <Tooling />
  <FlexibleFrontend />
  <Testimonials />
  <TryIt />
  <Sponsors />
  <Community />
  <Blog />
  <Speak />
  <WallOfFame />
  <NewsLetterSubstack />
  <Footer />
</template>

<style>
/* .VPContent.is-home {
  background-image: url(/images/hero-stripe.png);
  background-position: center -50px;
  background-repeat: no-repeat;
  background-size: 145vw;
} */

.VPContent.is-home .vp-doc.container {
  padding-left: 0 !important;
  padding-right: 0 !important;
  max-width: unset !important;
}

.VPContent.is-home > * > section,
.VPContent.is-home section.home-section {
  margin-left: auto;
  margin-right: auto;
}

.VPHome {
  margin-bottom: 0 !important;
}

.VPContent.is-home .home-section,
.VPContent.is-home .home-band__inner {
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .VPContent.is-home .home-section,
  .VPContent.is-home .home-band__inner {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
</style>
