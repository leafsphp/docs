<template>
  <div class="ThemeHero">
    <div class="container flex-col flex:center-all">
      <img class="w:10 hero-logo" src="/logo-circle.png" />
      <h1 class="title">
        <slot name="title" />
      </h1>
      <p class="lead">
        <slot name="lead" />
      </p>
    </div>
  </div>
</template>

<style scoped>
.lead {
  text-align: center;
}

.ThemeHero {
  padding: 48px 24px;
}

@media (min-width: 768px) {
  .ThemeHero {
    padding: 72px 48px 96px;
  }
}

.container {
  margin: 0 auto;
  max-width: 960px;
}

.title,
.lead {
  transition: color 0.25s;
}

.title {
  line-height: 32px;
  font-size: 32px;
  font-weight: 500;
}

@media (min-width: 768px) {
  .title {
    font-weight: bold;
    margin-top: 50px;
    margin-bottom: 30px;
    font-size: 50px;
  }
}

.lead {
  padding-top: 8px;
  font-size: 16px;
  font-weight: 500;
  max-width: 512px;
  color: var(--vt-c-text-2);
}
</style>
