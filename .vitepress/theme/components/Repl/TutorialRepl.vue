<script setup lang="ts">
import axios from 'axios';
import { watch, version, ref, computed, nextTick, onBeforeUnmount, onMounted } from 'vue';

import Button from '../shared/Button.vue';
import { ArrowLeft, ArrowRight } from 'lucide-vue-next';
import { Repl, ReplStore } from './repl';
import { data } from './tutorial.data';
import {
  resolveSFCExample,
  onHashChange
} from './utils';

import './style.css';
import Select from '../shared/Select.vue';

const output = ref(
  '<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;"><img src="https://user-images.githubusercontent.com/26604242/178155909-362f06e6-9da9-473b-b47f-1219b4e65ae2.png"><div style="margin-top:10px;">🚀 Click the run button to compile your code</div></div>'
);

const store = new ReplStore({
  defaultVueRuntimeURL: `https://unpkg.com/vue@${version}/dist/vue.esm-browser.js`
});

onMounted(() => {
  document.body.classList.add('-is-tutorial');
});

onBeforeUnmount(() => {
  document.body.classList.remove('-is-tutorial');
});

const run = async (files: Record<string, any>) => {
  output.value = '<div style="display:flex;justify-content:center;align-items:center;height:100%;">🚀 Compiling your code...</div>';

  const form = new FormData();
  const rawFiles: any = {};

  Object.keys(files).forEach((filename) => {
    form.set(filename, files[filename].code);
    rawFiles[filename] = files[filename].code;
  });

  let { data: folder } = await axios.post('https://leafphp-sandbox-server.fly.dev/compile', form);

  if (!folder) {
    return store.state.errors.push('Internal system error, please try again' as never);
  } else {
    store.state.errors = [];
  }

  output.value = '<div style="display:flex;justify-content:center;align-items:center;height:100%;">🏃‍♂️ Running your code...</div>';

  try {
    let config = JSON.parse(files['request.json'].code || '');

    config = config?.path ? config : null;

    let { data: res, headers } = await axios({
      url: `https://leafphp-sandbox-server.fly.dev${folder.folder}${config?.path ?? '/'}`,
      method: config?.method ?? 'GET',
      headers: config?.headers ?? {},
      data: config?.data ?? {},
      params: config?.method?.toUpperCase() === "GET" ? config.data : {},
    });

    if (headers['content-type'] === 'application/json' && typeof res === 'string') {
      return output.value = res.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
    }

    if (typeof res !== 'string') {
      res = `<html><body style="overflow:scroll">${JSON.stringify(res)}</body></html>`;
      // return output.value = JSON.stringify(res);
    }

    output.value = `<iframe srcdoc='${res}'></iframe>`;
  } catch (error: any) {
    console.log(error, 'error');

    if (error?.response?.data) {
      output.value = `<iframe srcdoc='${error.response.data.replace(/'/g, '"')}'></iframe>`;
    } else {
      output.value = '<div style="display:flex;justify-content:center;align-items:center;height:100%;">❌ Could not compile</div>'
    }

    store.state.errors.push((error?.response?.data ?? error) as never);
  }
}

const currentStep = ref('');
const instruction = ref<HTMLElement>();

const keys = Object.keys(data).sort((a, b) => {
  return Number(a.replace(/^step-/, '')) - Number(b.replace(/^step-/, ''));
});

const totalSteps = keys.length;

const titleRE = /<h1.*?>(.+?)<a class="header-anchor/;
const allSteps = keys.map((key, i) => {
  const desc = data[key]['description.md'] as string;

  return {
    text: `${desc.match(titleRE)?.[1]}`,
    link: `#${key}`
  };
});

const currentDescription = computed(() => {
  return data[currentStep.value]?.['description.md'];
});

const currentStepIndex = computed(() => {
  return keys.indexOf(currentStep.value) + 1;
});

const prevStep = computed(() => {
  const match = currentStep.value.match(/\d+/);
  const prev = match && `step-${+match[0] - 1}`;

  if (prev && data.hasOwnProperty(prev)) {
    return prev
  }
});

const nextStep = computed(() => {
  const match = currentStep.value.match(/\d+/);
  const next = match && `step-${+match[0] + 1}`;

  if (next && data.hasOwnProperty(next)) {
    return next
  }
});

const showingHint = ref(false);

function updateExample(scroll = false) {
  let hash = location.hash.slice(1);

  if (!data.hasOwnProperty(hash)) {
    hash = 'step-1';
    location.replace(`/tutorial/#${hash}`);
  }

  currentStep.value = hash;

  const content = showingHint.value ? data[hash]._hint! : data[hash];

  store.setFiles(
    resolveSFCExample(content, true),
    'index.php'
  );

  if (scroll) {
    nextTick(() => {
      instruction.value!.scrollTop = 0
    });
  }
}

function toggleResult() {
  showingHint.value = !showingHint.value;
  updateExample();
}

watch([], () => updateExample());

onHashChange(() => {
  showingHint.value = false;
  updateExample(true);
})

updateExample();
</script>

<template>
  <section class="container tutorial">
    <article class="instruction py-8" ref="instruction">
      <div class="sticky flex items-center gap-2 mt-4 top-0 bg-[var(--vp-c-bg)] py-4 z-10">
        <Select :items="allSteps" :currentStepIndex="currentStepIndex" :totalSteps="totalSteps" />
        <div class="flex items-center gap-1">
          <Button as="a" class="!h-[50px] rounded-xl" v-if="prevStep" :href="`#${prevStep}`">
            <ArrowLeft :size="16" />
            <!-- <span>Prev</span> -->
          </Button>
          <Button as="a" class="!h-[50px] rounded-xl" v-if="nextStep" :href="`#${nextStep}`">
            <!-- <span>Next</span> -->
            <ArrowRight :size="16" />
          </Button>
        </div>
      </div>

      <div class="mt-5 vp-doc" v-html="currentDescription"></div>

      <div class="hint">
        <Button @click="toggleResult" v-if="data[currentStep]?._hint">
          {{ showingHint ? 'Reset' : 'Reveal Answer!' }}
        </Button>
      </div>
    </article>

    <Repl layout="vertical" :store="store" :showCompileOutput="false" :clearConsole="false" :showImportMap="false"
      @keyup="showingHint = false" :output="output" :run="run" />
  </section>
</template>

<style>
.dark .CodeMirror {
  color: var(--symbols);
  --symbols: #89ddff;
  --base: #a6accd;
  --comment: #6d6d6d;
  --keyword: #89ddff;
  --string: #c3e88d;
  --variable: #e879f9;
  --number: #f78c6c;
  --tags: #f07178;
  --brackets: var(--symbols);
  --property: #f07178;
  --attribute: #c792ea;
  --cursor: #fff;
  --selected-bg: rgba(255, 255, 255, 0.1);
  --selected-bg-non-focus: rgba(255, 255, 255, 0.15);
}

.dark .vue-repl[data-v-760f3496] {
  --bg: #001318 !important;
  --bg-soft: #002028 !important;
  --border: #383838;
  --text-light: #aaa;
  --color-branding: #42d392;
  --color-branding-dark: #89ddff;
}

.dark .CodeMirror {
  color: var(--symbols);
  --symbols: #89ddff;
  --base: #a6accd;
  --comment: #6d6d6d;
  --keyword: #e879f9 !important;
  --string: #bef264 !important;
  --variable: #22d3ee !important;
  --number: #f78c6c;
  --tags: #f07178;
  --brackets: #9299a6 !important;
  --property: #f07178;
  --attribute: #c792ea;
  --cursor: #fff;
  --selected-bg: rgba(255, 255, 255, 0.1);
  --selected-bg-non-focus: rgba(255, 255, 255, 0.15);
}

.-is-tutorial .VPNavBar {
  border-bottom: 1px solid var(--vt-c-divider-light) !important;
}

.tutorial h1 {
  display: none;
}
</style>

<style scoped>
.tutorial {
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
  --height: calc(100vh - var(--vt-nav-height) - var(--vt-banner-height, 0px));
}

.tutorial * {
  transition: ease all .3s;
}

.preference-switch {
  position: relative;
}

.instruction {
  width: 45%;
  max-height: calc(100vh - var(--vt-nav-height) - var(--vt-banner-height, 0px) - 24px);
  padding: 0 32px 24px;
  font-size: 15px;
  overflow-y: auto;
  position: relative;
  --vt-nav-height: 40px;
}

.vue-repl {
  width: 55%;
  height: var(--height);
}

.vt-flyout {
  z-index: 9;
  position: absolute;
  right: 20px;
}

.vt-menu-link.active {
  font-weight: 500;
  color: var(--vt-c-brand);
}

footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--vt-c-divider);
  margin-top: 1.5em;
  padding-top: 1em;
}

footer a {
  font-weight: 500;
  color: var(--vt-c-brand);
}

.next-step {
  margin-left: auto;
}

.vt-doc :deep(h1) {
  font-size: 1.4em;
  margin: 1em 0;
}

.vt-doc :deep(h2) {
  font-size: 1.1em;
  margin: 1.2em 0 0.5em;
  padding: 0;
  border-top: none;
}

.vt-doc :deep(.header-anchor) {
  display: none;
}

.vt-doc :deep(summary) {
  cursor: pointer;
}

.hint {
  padding-top: 1em;
}

button {
  background-color: var(--vt-c-brand);
  color: var(--vt-c-bg);
  padding: 4px 12px 3px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
}

@media (min-width: 1377px) {
  .vue-repl {
    border-right: 1px solid var(--vt-c-divider-light);
  }
}

@media (min-width: 1441px) {
  .tutorial {
    padding-right: 32px;
  }
}

:deep(.narrow) {
  display: none;
}

@media (max-width: 720px) {
  .tutorial {
    display: block;
  }

  .instruction {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--vt-c-divider-light);
    height: 30vh;
    padding: 0 24px 24px;
  }

  .vue-repl {
    width: 100%;
    height: calc(70vh - var(--vt-nav-height) - var(--vt-banner-height, 0px));
  }

  :deep(.wide) {
    display: none;
  }

  :deep(.narrow) {
    display: inline;
  }
}
</style>
