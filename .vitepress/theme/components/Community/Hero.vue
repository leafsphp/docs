<script setup>
</script>

<template>
  <div class="flex flex-col min-h-[500px] justify-center items-center bg-[var(--vp-c-bg-alt)]">
    <h1 class="text-center !font-bold !text-5xl md:!text-7xl">
      <span>#Leaf</span> <vue-writer
        :array="['#Community', '#Comunidad', '#Communauté', '#コミュニティ', '#社区', '#Comunidade']" />
    </h1>
    <p class="text-center max-w-[600px] mt-4 text-sm md:text-base p-2 sm:p-0">
      Our community is the heart of Leaf. Our community drives what we build, how we build it, and why we build it.
      Whether you are new to programming or a seasoned developer, you can join the community to hang out with other
      like-minded developers. 🌱
    </p>
  </div>
</template>

<style scoped>
h1 span {
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

h1 * {
  display: inline !important;
}
</style>
