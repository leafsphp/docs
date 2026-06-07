<template>
  <div class="home-band">
    <section class="home-band__inner home-section">
      <div class="home-panel grid grid-cols-1 lg:grid-cols-12 items-center">
        <span class="home-marker home-marker--tl" aria-hidden="true" />
        <span class="home-marker home-marker--tr" aria-hidden="true" />
        <span class="home-marker home-marker--bl" aria-hidden="true" />
        <span class="home-marker home-marker--br" aria-hidden="true" />

        <div class="lg:col-span-5 flex items-center justify-center border-b border-[var(--home-border)] p-8 lg:border-b-0 lg:border-r h-full min-h-[300px]">
          <img src="/images/community.svg" alt="Leaf Community" class="w-full max-w-[380px] opacity-90 transition-transform duration-500 hover:scale-[1.02]" />
        </div>

        <div class="lg:col-span-7 flex flex-col items-center justify-center p-8 text-center md:p-12 lg:p-16 lg:items-start lg:text-left">
          <p class="home-section__eyebrow !mb-3">Community</p>
          <h2 class="home-section__title text-center lg:text-left !mt-0 !pt-0">
            Join other people building real products
          </h2>
          <p class="home-section__subtitle text-center lg:text-left !pt-0 !mt-0">
            Build alongside developers shaping how modern products are made. Share what you're building, get help when
            you're stuck, and grow with people who move fast.
          </p>
          <a
            href="https://discord.gg/Pkrm9NJPE3"
            target="_blank"
            rel="noopener noreferrer"
            class="home-btn home-btn--primary mt-8"
          >
            <span>Start building with us</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor"
                d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
