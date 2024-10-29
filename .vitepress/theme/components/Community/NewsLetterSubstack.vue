<script setup lang="ts">
// old component. will refactor later
</script>

<template>
  <section id="newsletter" class="NewsLetter">
    <div class="container">
      <iframe src="https://leafphp.substack.com/embed" style="display: #041D24;" width="100%" height="320" frameborder="0" scrolling="no"></iframe>

      <p class="help">
        You can read our blog posts at
        <a class="link" href="https://blog.leafphp.dev/" no-icon>blog.leafphp.dev</a>. You may also go social
        at
        <a class="link" href="https://twitter.com/leafphp" no-icon>Twitter</a>, or join our
        <a class="link" href="https://github.com/leafsphp/leaf/discussions/37" no-icon>discussions</a> or
        watch our <a class="link" href="https://www.youtube.com/channel/UCllE-GsYy10RkxBUK0HIffw" no-icon>videos on
          YouTube.</a>
      </p>
    </div>
  </section>
</template>

<style scoped>
.NewsLetter {
  color: white;
  border-top: 1px solid var(--vt-c-divider-light);
  border-bottom: 1px solid var(--vt-c-divider-light);
  border: none !important;
  padding: 72px 24px;
  background: #041D24;
  transition: border-color 0.5s, background-color 0.5s;
}

.container {
  margin: 0 auto;
  max-width: 512px;
}

.subscribe-form {
  position: relative;
  max-width: 550px;
  margin: 0 auto;
  box-sizing: border-box;
}

input[type=text] {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 80px 10px 20px;
  height: 50px;
  border-radius: 50px;
  border: 1px solid var(--vt-c-divider-light);
  font-size: 16px;
}

button {
  position: absolute;
  padding: 4px 20px;
  margin: 0;
  height: calc(100% - 8px);
  right: 4px;
  top: 4px;
  cursor: pointer;
  background-color: var(--vt-c-green);
  width: 30%;
  border-radius: 2em;
}

@media (min-width: 375px) {
  .title {
    font-size: 16px;
  }
}

.form {
  padding-top: 8px;
}

@media (min-width: 375px) {
  .form {
    padding-top: 16px;
  }
}

.box {
  position: relative;
  width: 100%;
}

.action {
  position: absolute;
  top: 6px;
  right: 6px;
}

.help {
  margin: 0 auto;
  padding: 8px;
  max-width: 480px;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  transition: color 0.5s;
}

@media (min-width: 375px) {
  .help {
    padding-top: 16px;
  }
}

.link {
  color: var(--vp-c-brand);
  transition: color 0.25s;
}

.link:hover {
  color: var(--vp-c-brand-dark);
}
</style>
