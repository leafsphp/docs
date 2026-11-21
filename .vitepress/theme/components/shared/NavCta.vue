<template>
  <a href="/docs/" class="nav-cta">Start building</a>
</template>

<style scoped>
.nav-cta {
  display: none;
  margin-left: 14px;
  padding: 8px 14px;
  border-radius: 11px;
  background: #120e0b;
  color: #ffffff !important;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none !important;
  white-space: nowrap;
}
.dark .nav-cta {
  background: #f3eee8;
  color: #120e0b !important;
}
@media (min-width: 960px) {
  .nav-cta {
    display: inline-flex;
    align-items: center;
  }
}
</style>
