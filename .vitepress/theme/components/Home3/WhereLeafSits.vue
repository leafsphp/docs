<template>
  <section class="lf-grid lf-where">
    <div>
      <p class="lf-anno">micro</p>
      <h3>Micro-frameworks</h3>
      <p class="lf-where-p">Routing and a request object. Auth, db and billing become a package hunt and a weekend.</p>
    </div>
    <div>
      <p class="lf-anno" style="color: var(--lf-link)">product-sized</p>
      <h3>Leaf</h3>
      <p class="lf-where-p">
        Bigger than a router, smaller than your average framework. Starts with app() and grows with the product.
      </p>
    </div>
    <div>
      <p class="lf-anno">full-stack</p>
      <h3>Full-stack frameworks</h3>
      <p class="lf-where-p">Everything included, whether you use it or not. A lot to hold in mind before feature one.</p>
    </div>
  </section>
</template>

<style scoped>
.lf-where {
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
}
.lf-where > div {
  padding: 40px 32px;
}
.lf-where .lf-anno {
  margin-bottom: 12px !important;
}
.lf-where h3 {
  margin-bottom: 8px !important;
  font-size: 20px;
  font-weight: 600;
}
.lf-where-p {
  font-size: 15px;
  line-height: 1.6 !important;
  color: var(--lf-muted);
}

@media (max-width: 640px) {
  /* three cards in one swipeable row */
  .lf-where {
    display: flex;
    gap: 12px;
    padding: 24px 16px;
    background: none;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding: 16px;
    scrollbar-width: none;
  }
  .lf-where::-webkit-scrollbar {
    display: none;
  }
  .lf-where > div {
    flex: 0 0 78%;
    scroll-snap-align: start;
    padding: 22px 20px;
    border: 1px solid var(--lf-line);
    border-radius: 18px;
  }
}
</style>
