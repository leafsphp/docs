<template>
  <div class="home-band">
    <div class="home-band__inner home-section">
      <div class="home-panel grid grid-cols-1 lg:grid-cols-12 items-center overflow-hidden">
        <span class="home-marker home-marker--tl" aria-hidden="true" />
        <span class="home-marker home-marker--tr" aria-hidden="true" />
        <span class="home-marker home-marker--bl" aria-hidden="true" />
        <span class="home-marker home-marker--br" aria-hidden="true" />

        <!-- Left: copy -->
        <div class="lg:col-span-7 flex flex-col gap-4 p-8 md:p-12 lg:p-16">
          <div class="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--home-border)] bg-[var(--home-surface-muted)] text-[var(--home-muted)]">
            <!-- Mic icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </div>

          <p class="home-section__eyebrow !mb-0">Speak at an event</p>
          <h2 class="home-section__title !mt-0 !pt-0 !mb-0">
            Invite us to your next event
          </h2>
          <p class="home-section__subtitle">
            Want a Leaf core team member to speak? We'd love to create a memorable and engaging experience for your attendees.
          </p>

          <div class="home-actions mt-2">
            <a
              href="mailto:mychi.darko@gmail.com?subject=Invitation to speak at our next event"
              rel="noopener"
              target="_blank"
              class="home-btn home-btn--primary"
            >
              Reach out to us
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor"
                  d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
              </svg>
            </a>
            <a
              href="https://discord.gg/Pkrm9NJPE3"
              target="_blank"
              rel="noopener noreferrer"
              class="home-btn home-btn--ghost"
            >
              Join the community
            </a>
          </div>
        </div>

        <!-- Right: info cards -->
        <div class="lg:col-span-5 flex flex-col gap-0 border-t border-[var(--home-border)] lg:border-t-0 lg:border-l h-full">
          <div
            v-for="(item, i) in perks"
            :key="i"
            class="flex items-start gap-4 p-6 md:p-8"
            :class="i < perks.length - 1 ? 'border-b border-[var(--home-border)]' : ''"
          >
            <div class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--home-border)] bg-[var(--home-surface-muted)] text-[var(--home-muted)]">
              <span class="text-sm" aria-hidden="true">{{ item.icon }}</span>
            </div>
            <div>
              <p class="!m-0 !mb-0.5 text-sm font-semibold text-[var(--home-fg)]">{{ item.title }}</p>
              <p class="!m-0 text-sm text-[var(--home-muted)]">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const perks = [
  {
    icon: '🌍',
    title: 'Any format',
    desc: 'Conferences, meetups, workshops, Twitter Spaces — we\'re flexible.',
  },
  {
    icon: '⚡',
    title: 'Live demos',
    desc: 'We bring real code, real speed, and Leaf V walkthroughs.',
  },
  {
    icon: '🤝',
    title: 'Free of charge',
    desc: 'We speak for free. Just cover travel if it\'s in-person.',
  },
];
</script>
