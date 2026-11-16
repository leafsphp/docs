<template>
  <section class="lf-pad" style="padding-top: 32px; padding-bottom: 32px">
    <div class="lf-oc">
      <div aria-hidden="true" class="lf-oc-glow1" />
      <div aria-hidden="true" class="lf-oc-glow2" />
      <div class="lf-oc-body">
        <div style="flex: 1 1 360px; min-width: 0">
          <h2 class="lf-oc-title">One command. A working app.</h2>
          <p class="lf-oc-lede">
            Sign-in, a database and CORS are set up before you open your editor. No config files to learn first.
          </p>
        </div>
        <div class="lf-oc-term">
          <pre><span style="color: #8f867b">$ </span><span class="lf-typing">leaf create my-product</span>
<span class="lf-s1 lf-oc-ok">  ✓ Project scaffolded</span><span class="lf-s2 lf-oc-ok">  ✓ Auth, DB, CORS configured</span><span class="lf-s3 lf-oc-ok">  ✓ Shared agent context ready</span><span class="lf-s4" style="display: block; margin-top: 12px"><span style="color: #8f867b">$ </span>leaf serve</span><span class="lf-s5" style="display: block; color: #f5b731; font-weight: 600">  → http://localhost:5500</span></pre>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.lf-oc {
  position: relative;
  background: #e8753a;
  color: #120e0b;
  border-radius: 28px;
  overflow: hidden;
}
.lf-oc-glow1 {
  position: absolute;
  right: -120px;
  top: -140px;
  width: 520px;
  height: 520px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(245, 183, 49, 0.9), transparent 65%);
}
.lf-oc-glow2 {
  position: absolute;
  left: -100px;
  bottom: -220px;
  width: 480px;
  height: 480px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(212, 84, 43, 0.8), transparent 65%);
}
.lf-oc-body {
  position: relative;
  padding: 80px 48px;
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
  align-items: center;
}
.lf-oc-title {
  margin-bottom: 18px !important;
  font-size: clamp(44px, 6vw, 84px);
  line-height: 0.92 !important;
  letter-spacing: -0.05em;
  font-weight: 700;
}
.lf-oc-lede {
  font-size: 19px;
  line-height: 1.5 !important;
  color: #3a1a08;
  max-width: 440px;
}
.lf-oc-term {
  flex: 1.2 1 440px;
  min-width: 0;
  background: #120e0b;
  color: #e8e6e3;
  border-radius: 20px;
  padding: 32px 34px;
  box-shadow: 0 40px 80px -30px rgba(58, 26, 8, 0.7);
}
.lf-oc-term pre {
  font-family: ui-monospace, Menlo, monospace;
  font-size: clamp(14px, 1.7vw, 20px);
  line-height: 2;
  overflow: hidden;
  background: none;
}
.lf-oc-ok {
  display: block;
  color: #8fd3b6;
}
@media (max-width: 640px) {
  .lf-oc-body {
    padding: 48px 20px;
  }
  .lf-oc-term {
    padding: 22px 20px;
  }
}
</style>
