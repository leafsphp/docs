<script setup>
import Hero from './Hero.vue';
import Tooling from './Tooling.vue';
import Deploy from './Deploy.vue';
import TryIt from './TryIt.vue';
import Sponsors from './Sponsors.vue';
import Testimonials from './Testimonials.vue';
import Community from './Community.vue';
import Footer from './Footer.vue';
import NewsLetterSubstack from './../Community/NewsLetterSubstack.vue';
import Blog from '../Community/Blog.vue';
import Speak from '../Community/Speak.vue';
import WallOfFame from '../Community/WallOfFame.vue';
</script>

<template>
  <Hero />
  <Deploy />
  <Tooling />
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

.VPContent.is-home section {
  margin: auto;
  width: 100%;
  max-width: 1280px;
  padding: 0 24px;
}

.VPHome {
  margin-bottom: 0 !important;
}

@media (min-width: 640px) {
  .VPContent.is-home section {
    padding: 0 48px;
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .VPContent.is-home section {
    max-width: 768px;
  }
}

@media (min-width: 960px) {
  .VPContent.is-home section {
    width: 100%;
    padding: 0 64px;
  }
}

@media (min-width: 1024px) {
  .VPContent.is-home section {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .VPContent.is-home section {
    max-width: 1280px;
  }
}
</style>
