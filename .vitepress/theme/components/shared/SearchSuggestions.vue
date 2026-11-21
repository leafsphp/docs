<script setup lang="ts">
// Suggestions for the local search modal. Search is still plain keyword
// matching: a chip only types its word into the box, and the quick links are
// ordinary links. Shown while the box is empty.
import { onBeforeUnmount, onMounted, ref } from 'vue';

const popular = ['Routing', 'Database', 'Auth', 'Validation', 'Middleware', 'Inertia', 'Queues', 'Deployment'];

const quick = [
  { title: 'Install Leaf', text: 'Get a project running', link: '/docs/' },
  { title: 'Leaf CLI', text: 'leaf create, leaf up, leaf install', link: '/docs/cli/' },
  { title: 'Agent skill', text: 'Teach your coding agent Leaf', link: '/docs/agent-skill' },
  { title: 'Modules', text: '25+ pieces that plug in', link: '/docs/modules' },
];

const target = ref<HTMLElement | null>(null);
const empty = ref(true);
let input: HTMLInputElement | null = null;
let observer: MutationObserver | null = null;

const syncEmpty = () => {
  empty.value = !input?.value;
};

const attach = () => {
  const shell = document.querySelector<HTMLElement>('.VPLocalSearchBox .shell');
  if (shell === target.value) return;

  input?.removeEventListener('input', syncEmpty);
  target.value = shell;
  input = shell?.querySelector<HTMLInputElement>('.search-input') ?? null;

  if (input) {
    input.placeholder = 'Search the docs';
    input.addEventListener('input', syncEmpty);
  }

  syncEmpty();
};

const fill = (word: string) => {
  if (!input) return;

  input.value = word;
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.focus();
};

const close = () => {
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
};

onMounted(() => {
  observer = new MutationObserver(attach);
  observer.observe(document.body, { childList: true });
  attach();
});

onBeforeUnmount(() => {
  observer?.disconnect();
  input?.removeEventListener('input', syncEmpty);
});
</script>

<template>
  <Teleport v-if="target" :to="target">
    <div v-show="empty" class="ss">
      <p class="ss-label">Popular</p>
      <div class="ss-chips">
        <button v-for="word in popular" :key="word" type="button" class="ss-chip" @click="fill(word)">
          {{ word }}
        </button>
      </div>

      <p class="ss-label">Jump to</p>
      <div class="ss-links">
        <a v-for="item in quick" :key="item.link" :href="item.link" class="ss-link" @click="close">
          <span class="ss-link-title">{{ item.title }}</span>
          <span class="ss-link-text">{{ item.text }}</span>
          <svg class="ss-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.ss {
  order: 1;
  padding: 4px 6px 2px;
}
.ss-label {
  margin: 0 0 10px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}
.ss-label::before {
  content: '// ';
  opacity: 0.6;
}
.ss-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 22px;
}
.ss-chip {
  padding: 7px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  font-size: 13.5px;
  color: var(--vp-c-text-2);
  background: transparent;
  transition: border-color 160ms ease, color 160ms ease, background-color 160ms ease;
}
.ss-chip:hover {
  border-color: rgba(212, 101, 46, 0.45);
  color: var(--vp-c-text-1);
  background: rgba(212, 101, 46, 0.06);
}
.ss-links {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.ss-link {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 12px 36px 12px 14px;
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
  text-decoration: none;
  transition: background-color 160ms ease;
}
.ss-link:hover {
  background: var(--vp-c-default-soft);
}
.ss-link-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.ss-link-text {
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}
.ss-arrow {
  position: absolute;
  right: 14px;
  top: 50%;
  width: 15px;
  height: 15px;
  margin-top: -7.5px;
  color: var(--vp-c-text-3);
  transition: transform 160ms ease, color 160ms ease;
}
.ss-link:hover .ss-arrow {
  color: #e8753a;
  transform: translateX(2px);
}
@media (max-width: 640px) {
  .ss-links {
    grid-template-columns: 1fr;
  }
}
</style>
