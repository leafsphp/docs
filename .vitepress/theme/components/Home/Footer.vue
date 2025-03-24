<template>
  <footer class="relative w-full bg-[var(--vp-c-bg-alt)] py-16 -mb-4">
    <div class="flex flex-col w-full items-start justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="container">
        <a href="https://github.com/leafsphp/leaf/blob/v4.x/LICENSE"
          class="!no-underline transition-colors !text-[var(--vp-c-text-1)]">© 2019 - {{ (new Date()).getFullYear()
          }}</a>
      </div>
      <div class="mx-auto w-full container font-bold lg:text-5xl 2xl:text-[70px]">
        <a href="https://studio.leafphp.dev"
          class="flex items-center gap-2 !no-underline transition-colors !text-[var(--vp-c-text-1)]"><span
            class="lg:text-9xl 2xl:text-[180px] font-semibold">Leaf PHP</span><small class="italic ml-6">by Creative
            Leaf</small></a>
      </div>
    </div>
  </footer>
</template>
