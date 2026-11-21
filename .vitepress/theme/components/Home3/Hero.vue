<template>
  <section class="lf-pad" style="padding-top: 80px; padding-bottom: 48px">
    <h1 class="lf-hero-title">
      The easiest way to build a real web app, <span class="lf-grad">by hand or with AI</span>
    </h1>
    <p class="lf-hero-lede">
      Leaf is a lightweight web framework. Start a project in one command, add sign-in, payments and more as you need
      them, and keep code that stays clean whether you write it or your coding agent does.
    </p>
    <div class="lf-hero-actions">
      <a href="/docs/" class="lf-btn lf-btn-flame">Start building <span aria-hidden="true">→</span></a>
      <a href="/learn/" class="lf-btn lf-btn-ghost">Read the docs</a>
      <span class="lf-hero-cmd">or run <code>leaf create my-app</code></span>
    </div>
  </section>
</template>

<style scoped>
.lf-hero-title {
  font-size: clamp(44px, 7.4vw, 104px);
  line-height: 0.98 !important;
  letter-spacing: -0.05em;
  font-weight: 600;
  max-width: 1080px;
}
.lf-hero-lede {
  margin-top: 26px !important;
  font-size: 19px;
  line-height: 1.6 !important;
  color: var(--lf-muted);
  max-width: 660px;
}
.lf-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-top: 32px;
}
.lf-hero-cmd {
  margin-left: 8px;
  font-size: 14px;
  color: var(--lf-faint);
}
.lf-hero-cmd code {
  font-family: ui-monospace, Menlo, monospace;
  color: var(--lf-ink) !important;
  background: none !important;
  padding: 0 !important;
  font-size: 14px !important;
}

@media (max-width: 640px) {
  .lf-hero-actions > a {
    flex: 1 1 100%;
    justify-content: center;
  }
  .lf-hero-cmd {
    margin: 4px 0 0;
    width: 100%;
    text-align: center;
  }
}
</style>
