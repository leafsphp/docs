<script setup lang="ts">
import {
  Bot,
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  MessageCircle,
} from 'lucide-vue-next';
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vitepress';

const route = useRoute();
const root = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const copied = ref(false);
const currentUrl = ref('');

const isDocsPage = computed(
  () => route.path.startsWith('/docs') || route.path.startsWith('/learn'),
);
const prompt = computed(
  () => `Read ${currentUrl.value}. I want to ask questions about it.`,
);
const chatGptUrl = computed(
  () => `https://chatgpt.com/?q=${encodeURIComponent(prompt.value)}`,
);
const claudeUrl = computed(
  () => `https://claude.ai/new?q=${encodeURIComponent(prompt.value)}`,
);

const syncCurrentUrl = () => {
  currentUrl.value = window.location.href;
};

const closeMenu = () => {
  isOpen.value = false;
};

const handleOutsideClick = (event: PointerEvent) => {
  if (!root.value?.contains(event.target as Node)) {
    closeMenu();
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
};

const copyPrompt = async () => {
  await navigator.clipboard.writeText(prompt.value);
  copied.value = true;
  window.setTimeout(() => {
    copied.value = false;
    closeMenu();
  }, 1200);
};

watch(
  () => route.path,
  async () => {
    await nextTick();
    syncCurrentUrl();
    closeMenu();
  },
);

onMounted(() => {
  syncCurrentUrl();
  document.addEventListener('pointerdown', handleOutsideClick);
  document.addEventListener('keydown', handleKeydown);
  window.addEventListener('hashchange', syncCurrentUrl);
});

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', handleOutsideClick);
  document.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('hashchange', syncCurrentUrl);
});
</script>

<template>
  <div v-if="isDocsPage" ref="root" class="doc-ai-menu not-prose">
    <button
      type="button"
      class="doc-ai-trigger"
      :aria-expanded="isOpen"
      aria-haspopup="menu"
      @click="isOpen = !isOpen"
    >
      <Bot :size="15" aria-hidden="true" />
      Open with AI
      <ChevronDown
        :size="14"
        aria-hidden="true"
        :class="{ 'doc-ai-chevron--open': isOpen }"
      />
    </button>

    <div v-if="isOpen" class="doc-ai-popover" role="menu">
      <p class="doc-ai-label">Ask about this page</p>

      <a
        :href="chatGptUrl"
        target="_blank"
        rel="noreferrer"
        class="doc-ai-item"
        role="menuitem"
        @click="closeMenu"
      >
        <span class="doc-ai-icon"><MessageCircle :size="18" /></span>
        <span>Open in ChatGPT</span>
        <ExternalLink :size="15" class="doc-ai-external" />
      </a>

      <a
        :href="claudeUrl"
        target="_blank"
        rel="noreferrer"
        class="doc-ai-item"
        role="menuitem"
        @click="closeMenu"
      >
        <span class="doc-ai-icon doc-ai-icon--claude">AI</span>
        <span>Open in Claude</span>
        <ExternalLink :size="15" class="doc-ai-external" />
      </a>

      <button
        type="button"
        class="doc-ai-item"
        role="menuitem"
        @click="copyPrompt"
      >
        <span class="doc-ai-icon">
          <Check v-if="copied" :size="18" />
          <Copy v-else :size="18" />
        </span>
        <span>{{ copied ? 'Prompt copied' : 'Copy AI prompt' }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.doc-ai-menu {
  position: relative;
  z-index: 5;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 18px;
}

.doc-ai-trigger {
  display: inline-flex;
  min-height: 34px;
  align-items: center;
  gap: 7px;
  padding: 7px 11px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 0;
  background: #fff;
  color: #262626;
  font-family: inherit;
  font-size: 12px;
  font-weight: 650;
  line-height: 18px;
  cursor: pointer;
  transition:
    border-color 160ms ease,
    background-color 160ms ease;
}

.doc-ai-trigger:hover,
.doc-ai-trigger:focus-visible {
  border-color: rgba(224, 98, 26, 0.4);
  background: #fafafa;
}

.doc-ai-trigger svg:last-child {
  transition: transform 160ms ease;
}

.doc-ai-chevron--open {
  transform: rotate(180deg);
}

.doc-ai-popover {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: min(280px, calc(100vw - 32px));
  padding: 8px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 0;
  background: #fff;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.16);
}

.doc-ai-label {
  margin: 0 !important;
  padding: 7px 9px 8px;
  color: #8a8a8a;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 9px;
  font-weight: 650;
  letter-spacing: 0.06em;
  line-height: 14px;
  text-transform: uppercase;
}

.doc-ai-item {
  display: grid !important;
  width: 100%;
  min-height: 44px;
  grid-template-columns: 28px minmax(0, 1fr) auto;
  align-items: center;
  gap: 9px;
  padding: 7px 9px !important;
  border: 0 !important;
  border-radius: 0;
  background: transparent !important;
  color: #262626 !important;
  font-family: inherit;
  font-size: 13px !important;
  font-weight: 550 !important;
  line-height: 18px !important;
  text-align: left;
  text-decoration: none !important;
  cursor: pointer;
}

.doc-ai-item:hover,
.doc-ai-item:focus-visible {
  background: #f5f5f5 !important;
}

.doc-ai-icon {
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0;
  color: #525252;
}

.doc-ai-icon--claude {
  color: var(--vp-c-brand-1);
  font-size: 11px;
  font-weight: 750;
}

.doc-ai-external {
  color: #a3a3a3;
}

html.dark .doc-ai-trigger,
html.dark .doc-ai-popover {
  border-color: rgba(255, 255, 255, 0.12);
  background: #171614;
}

html.dark .doc-ai-trigger {
  color: #f5f5f4;
}

html.dark .doc-ai-trigger:hover,
html.dark .doc-ai-trigger:focus-visible {
  border-color: rgba(232, 135, 58, 0.45);
  background: #1d1b18;
}

html.dark .doc-ai-popover {
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.42);
}

html.dark .doc-ai-item {
  color: #f5f5f4 !important;
}

html.dark .doc-ai-item:hover,
html.dark .doc-ai-item:focus-visible {
  background: #24221f !important;
}

html.dark .doc-ai-icon {
  border-color: rgba(255, 255, 255, 0.1);
  color: #d4d4d4;
}

html.dark .doc-ai-icon--claude {
  color: #f09a55;
}

@media (min-width: 640px) {
  :global(.VPDoc .content-container) {
    position: relative;
  }

  .doc-ai-menu {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
  }

  :global(.VPDoc .main .vp-doc > div > h1:first-child) {
    min-height: 34px;
    padding-right: 170px;
  }
}
</style>
