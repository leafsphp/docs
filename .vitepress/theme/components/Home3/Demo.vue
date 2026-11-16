<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { highlight } from '../../lib/highlight';
import { ideas } from './demo-ideas';
import DemoApps from './DemoApps.vue';
import LeafMark from './LeafMark.vue';

const TICK = 14; // timer ticks per agent step

const i = ref(0);
const file = ref(1);
const typed = ref(0);
const ticks = ref(0);
const split = ref(41);
const root = ref<HTMLElement | null>(null);
const mounted = ref(false);

let timer: ReturnType<typeof setInterval> | undefined;

const idea = computed(() => ideas[i.value]);
const typedDone = computed(() => typed.value >= idea.value.prompt.length);
const step = computed(() => (typedDone.value ? Math.floor(ticks.value / TICK) : -1));
const allDone = computed(() => step.value > idea.value.files.length);
const fi = computed(() => Math.min(file.value, idea.value.files.length - 1));
const lines = computed(() => (allDone.value ? highlight(idea.value.files[fi.value][1]) : []));

// The timer runs from mount; the demo only advances while it is on screen.
function inView() {
  const r = root.value?.getBoundingClientRect();
  return !!r && r.top < window.innerHeight * 0.75 && r.bottom > window.innerHeight * 0.25;
}

function tick() {
  if (!inView()) return;
  const it = idea.value;
  if (typed.value < it.prompt.length) typed.value = Math.min(it.prompt.length, typed.value + 2);
  else if (ticks.value < (it.files.length + 2) * TICK) ticks.value++;
}

function reset() {
  typed.value = 0;
  ticks.value = 0;
  file.value = 1;
}

function pick(k: number) {
  i.value = k;
  reset();
}

onMounted(() => {
  mounted.value = true;
  if (window.innerWidth < 900) split.value = 8;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typed.value = idea.value.prompt.length;
    ticks.value = (idea.value.files.length + 2) * TICK;
  }
  timer = setInterval(tick, 35);
});

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<template>
  <section ref="root" class="lf-pad lf-demo">
    <div class="lf-demo-head">
      <h2 class="lf-demo-title">What working in a Leaf project looks like</h2>
      <p class="lf-lede" style="font-size: 17px">
        Ask your coding agent for a feature. Leaf is the framework underneath, so the files land where they belong and
        still read cleanly next month. Works with Claude Code, Cursor, Copilot and the rest.
      </p>
    </div>

    <!-- client-only: the demo is driven by timers and its state never matches the
         server-rendered HTML, which broke hydration in production builds -->
    <ClientOnly>
    <div class="lf-seg-wrap">
      <div class="lf-seg" role="group" aria-label="Example prompts">
        <button
          v-for="(x, k) in ideas"
          :key="x.key"
          type="button"
          :aria-pressed="k === i"
          :class="['lf-seg-btn', { on: k === i }]"
          @click="pick(k)"
        >
          {{ x.label }}
        </button>
      </div>
    </div>

    <div class="lf-stage-wrap">
      <!-- composer -->
      <div class="lf-composer">
        <p class="lf-composer-text">
          {{ idea.prompt.slice(0, typed) }}<span v-if="!typedDone" class="lf-caret" />
        </p>
        <div class="lf-composer-row">
          <span class="lf-pill"><LeafMark :size="16" />my-app</span>
          <span v-if="typedDone && !allDone" class="lf-status">
            <span class="lf-dot" />Reading the project map and writing files
          </span>
          <span v-if="allDone" class="lf-status lf-status-done lf-rise">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1F9D63" stroke-width="2.6"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12l5 5 9-10" />
            </svg>
            {{ idea.summary }}
          </span>
          <button type="button" class="lf-send" aria-label="Replay the demo" @click="reset()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"
              stroke-linecap="round" aria-hidden="true">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- slider -->
      <div class="lf-stage">
        <pre class="lite lf-editor"><span v-for="ln in lines" :key="ln.n" class="lf-ed-line"><span class="lf-ed-n">{{ ln.n }}</span><span v-for="(sg, j) in ln.segs" :key="j" :class="sg.k">{{ sg.t }}</span></span></pre>

        <div class="lf-app-layer" :style="{ clipPath: `inset(0 0 0 ${split}%)` }">
          <div v-show="allDone" style="height: 100%"><DemoApps :app="idea.key" /></div>
        </div>

        <div v-if="!allDone" class="lf-working">
          <span><span class="lf-dot" />Your agent is working</span>
        </div>

        <div class="lf-handle" :style="{ left: split + '%' }">
          <span class="lf-knob">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#120E0B" stroke-width="2.4"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
            </svg>
          </span>
        </div>
        <input v-model.number="split" type="range" min="0" max="100" class="lf-range"
          aria-label="Compare the code with the finished app" />

        <div class="lf-files">
          <button
            v-for="(f, k) in idea.files"
            :key="f[0]"
            type="button"
            :aria-pressed="k === fi"
            :class="['lf-file', { on: k === fi }]"
            @click="file = k"
          >
            {{ f[0].split('/').pop() }}
          </button>
        </div>
      </div>
    </div>
    </ClientOnly>
    <div v-if="!mounted" class="lf-demo-placeholder" aria-hidden="true" />
    <p class="lf-demo-cap">Drag the handle. Coders read the code, everyone else sees the app it makes.</p>
  </section>
</template>

<style scoped>
.lf-demo {
  padding-top: 96px;
  padding-bottom: 104px;
}
.lf-demo-head {
  max-width: 760px;
  margin: 0 auto 28px;
  text-align: center;
}
.lf-demo-title {
  margin-bottom: 14px !important;
  font-size: clamp(34px, 4vw, 48px);
  line-height: 1.04 !important;
  letter-spacing: -0.04em;
  font-weight: 600;
}
.lf-demo-placeholder {
  height: 860px;
}
.lf-seg-wrap {
  display: flex;
  justify-content: center;
}
.lf-seg {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2px;
  padding: 4px;
  border-radius: 999px;
  background: #f3eee7;
}
.dark .lf-seg {
  background: #1f1a16;
}
.lf-seg-btn {
  font-size: 14px;
  font-weight: 500;
  padding: 8px 18px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #6b6158;
  cursor: pointer;
}
.lf-seg-btn.on {
  font-weight: 600;
  background: #ffffff;
  color: #120e0b;
  box-shadow: 0 1px 3px rgba(60, 40, 20, 0.14);
}
.dark .lf-seg-btn {
  color: #b5aba0;
}
.dark .lf-seg-btn.on {
  background: #f3eee8;
  color: #120e0b;
}

.lf-stage-wrap {
  position: relative;
  margin-top: 92px;
}
.lf-composer {
  position: absolute;
  left: 50%;
  top: -60px;
  z-index: 4;
  width: min(720px, calc(100% - 32px));
  transform: translateX(-50%);
  box-sizing: border-box;
  background: #ffffff;
  color: #120e0b;
  border: 1px solid #e4ddd3;
  border-radius: 22px;
  padding: 16px 12px 12px 20px;
  box-shadow: 0 1px 2px rgba(60, 40, 20, 0.05), 0 24px 60px -24px rgba(60, 40, 20, 0.35);
}
.lf-composer-text {
  color: #120e0b !important;
  margin-bottom: 12px !important;
  font-size: 17px;
  line-height: 1.5 !important;
  min-height: 1.5em;
}
.lf-composer-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.lf-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 32px;
  padding: 0 12px 0 8px;
  border-radius: 999px;
  background: #f5f0e9;
  font-size: 13px;
  font-weight: 500;
  color: #3a332d;
  flex: 0 0 auto;
}
.lf-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #6b6158;
  min-width: 0;
}
.lf-status-done {
  color: #3a332d;
}
.lf-send {
  margin-left: auto;
  width: 36px;
  height: 36px;
  flex: 0 0 36px;
  border: 0;
  border-radius: 50%;
  background: #120e0b;
  color: #ffffff;
  display: grid;
  place-items: center;
  cursor: pointer;
}

.lf-stage {
  --lf-app-left: calc(41% + 24px);
  position: relative;
  height: 680px;
  border-radius: 26px;
  overflow: hidden;
  border: 1px solid #e9e2d8;
  box-shadow: 0 40px 100px -50px rgba(60, 30, 10, 0.4);
}
.dark .lf-stage {
  border-color: rgba(255, 255, 255, 0.1);
}
.lf-editor {
  position: absolute;
  inset: 0;
  margin: 0;
  padding: 100px 16px 20px !important;
  background: #fbf9f6;
  font-family: ui-monospace, Menlo, monospace;
  font-size: 12.5px;
  line-height: 1.8;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: 0;
}
.lf-ed-line {
  display: block;
  min-height: 1.8em;
  white-space: pre;
}
.lf-ed-n {
  display: inline-block;
  width: 28px;
  color: #c9c0b4;
  user-select: none;
}
.lf-app-layer {
  position: absolute;
  inset: 0;
  background: #f4f7fb;
  color: #0f172a;
  font-family: Inter, system-ui, sans-serif;
}
.lf-app-layer :deep(p) {
  color: inherit;
  line-height: normal;
}
.lf-working {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  pointer-events: none;
}
.lf-working > span {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  color: #5a524a;
  font-size: 13px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}
.lf-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  margin-left: -1px;
  background: var(--lf-flame);
  pointer-events: none;
  z-index: 2;
}
.lf-knob {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  margin: -20px 0 0 -20px;
  border-radius: 50%;
  background: var(--lf-flame);
  display: grid;
  place-items: center;
  box-shadow: 0 0 0 6px rgba(232, 117, 58, 0.2), 0 8px 20px rgba(0, 0, 0, 0.25);
}
.lf-range {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: ew-resize;
}
.lf-stage:has(.lf-range:focus-visible) .lf-knob {
  outline: 3px solid #120e0b;
  outline-offset: 3px;
}
.lf-files {
  position: absolute;
  left: 16px;
  bottom: 16px;
  z-index: 3;
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  padding: 4px;
  border-radius: 12px;
  background: rgba(18, 14, 11, 0.05);
}
.lf-file {
  font-family: ui-monospace, Menlo, monospace;
  font-size: 12px;
  padding: 6px 10px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #6b6158;
  cursor: pointer;
}
.lf-file.on {
  background: #ffffff;
  color: #120e0b;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
}
.lf-demo-cap {
  margin-top: 18px !important;
  text-align: center;
  font-size: 14px;
  color: var(--lf-faint);
}

@media (max-width: 900px) {
  .lf-stage {
    --lf-app-left: 16px;
    height: 640px;
  }
  .lf-status {
    display: none;
  }
  .lf-stage :deep(.lf-app) {
    padding-top: 150px !important;
  }
}
@media (max-width: 640px) {
  .lf-seg-btn {
    font-size: 13px;
    padding: 7px 11px;
  }
  .lf-composer-text {
    font-size: 15px;
  }
}
</style>
