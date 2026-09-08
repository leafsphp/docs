<template>
  <div :class="ui.band">
    <div :class="ui.bandInner">
      <div :class="[ui.panel, 'grid grid-cols-1 items-center overflow-hidden lg:grid-cols-12']">
        <span :class="[ui.marker, ui.markerTL]" aria-hidden="true" />
        <span :class="[ui.marker, ui.markerTR]" aria-hidden="true" />
        <span :class="[ui.marker, ui.markerBL]" aria-hidden="true" />
        <span :class="[ui.marker, ui.markerBR]" aria-hidden="true" />

        <!-- Left: copy -->
        <div class="lg:col-span-7 flex flex-col gap-6 p-8 md:p-12 lg:p-16">
          <div class="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-neutral-100 text-neutral-500 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-neutral-400">
            <!-- Mic icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </div>

          <div>
            <p :class="[ui.eyebrow, '!mb-0']">Speak at an event</p>
            <h2 :class="[ui.title, '!mb-0']">
              Invite us to your next event
            </h2>
          </div>
          <p :class="ui.subtitle">
            Want a Leaf core team member to speak? We'd love to bring practical Leaf 5 and AI-native PHP demos to your
            attendees.
          </p>

          <div :class="[ui.actions, 'mt-2']">
            <a
              href="mailto:mychi.darko@gmail.com?subject=Invitation to speak at our next event"
              rel="noopener"
              target="_blank"
              :class="[ui.btn, ui.btnPrimary]"
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
              :class="[ui.btn, ui.btnGhost]"
            >
              Join the community
            </a>
          </div>
        </div>

        <!-- Right: info cards -->
        <div class="flex h-full flex-col gap-0 border-t border-black/[0.08] dark:border-white/[0.08] lg:col-span-5 lg:border-l lg:border-t-0">
          <div
            v-for="(item, i) in perks"
            :key="i"
            class="flex items-start gap-4 p-6 md:p-8"
            :class="i < perks.length - 1 ? 'border-b border-black/[0.08] dark:border-white/[0.08]' : ''"
          >
            <div class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-none border border-black/[0.08] bg-neutral-100 text-[var(--vp-c-brand-1)] dark:border-white/[0.08] dark:bg-white/[0.03]">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-html="item.icon" />
            </div>
            <div>
              <p class="!m-0 !mb-0.5 text-sm font-semibold text-neutral-950 dark:text-neutral-50">{{ item.title }}</p>
              <p class="!m-0 text-sm text-neutral-500 dark:text-neutral-400">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ui } from '../Home/ui';

const perks = [
  {
    // globe
    icon: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z"/>',
    title: 'Any format',
    desc: 'Conferences, meetups, workshops, Twitter Spaces. We\'re flexible.',
  },
  {
    // terminal prompt
    icon: '<path d="M5 7l5 5-5 5M12 17h7"/>',
    title: 'AI-native demos',
    desc: 'Live coding on real Leaf 5 apps, including the agent workflow people keep asking about.',
  },
  {
    // ticket
    icon: '<path d="M4 9a2 2 0 0 0 0 6v3h16v-3a2 2 0 0 1 0-6V6H4v3Z"/><path d="M14 6v12" stroke-dasharray="2 2.5"/>',
    title: 'Free of charge',
    desc: 'We speak for free. Just cover travel if it\'s in-person.',
  },
];
</script>
