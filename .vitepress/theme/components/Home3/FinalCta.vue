<script setup lang="ts">
import LeafMark from './LeafMark.vue';
</script>

<template>
  <section class="lf-pad" style="padding-top: 32px; padding-bottom: 32px">
    <div class="lf-cta">
      <div aria-hidden="true">
        <div class="lf-blob lf-cta-glow" />
      </div>
      <div class="lf-cta-body">
        <LeafMark :size="56" />
        <h2 class="lf-cta-title">So, what are you <span class="lf-grad">building?</span></h2>
        <p class="lf-cta-lede">Run one command to start a project, then build it by hand, with your agent, or both.</p>
        <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center">
          <a href="/docs/" class="lf-btn lf-btn-flame" style="padding: 15px 26px">Start building</a>
          <a href="/learn/" class="lf-btn lf-cta-ghost">Read the docs</a>
        </div>
        <figure style="margin-top: 48px; max-width: 600px">
          <blockquote class="lf-cta-quote">
            “I just want things to work, and still make sense to me and my tools when I come back later.”
          </blockquote>
          <figcaption style="margin-top: 12px; font-size: 14px; color: #8f867b">Michael Darko, creator of Leaf</figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.lf-cta {
  position: relative;
  background: #120e0b;
  color: #f7f2ea;
  border-radius: 28px;
  overflow: hidden;
  text-align: center;
}
.dark .lf-cta {
  outline: 1px solid rgba(255, 255, 255, 0.06);
}
.lf-cta-glow {
  width: 700px;
  height: 700px;
  left: 50%;
  margin-left: -350px;
  bottom: -440px;
  background: radial-gradient(circle, rgba(232, 117, 58, 0.75), transparent 62%);
  animation: lf-d1 16s ease-in-out infinite;
}
.lf-cta-body {
  position: relative;
  padding: 104px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
}
.lf-cta-title {
  font-size: clamp(44px, 7.4vw, 104px);
  line-height: 0.95 !important;
  letter-spacing: -0.05em;
  font-weight: 600;
}
.lf-cta-lede {
  font-size: 18px;
  line-height: 1.6 !important;
  color: #bdb4a8;
  max-width: 540px;
}
.lf-cta-ghost {
  padding: 15px 26px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-weight: 500 !important;
}
.lf-cta-quote {
  font-size: 19px !important;
  line-height: 1.5;
  color: #e5ded3 !important;
}
@media (max-width: 640px) {
  .lf-cta-body {
    padding: 72px 20px;
  }
}

@media (max-width: 640px) {
  .lf-cta-body > div {
    width: 100%;
    flex-direction: column;
  }
  .lf-cta-body > div > a {
    justify-content: center;
  }
  .lf-cta-quote {
    font-size: 16px !important;
  }
}
</style>
