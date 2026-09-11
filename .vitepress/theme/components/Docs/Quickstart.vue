<script setup>
import { onBeforeUnmount, ref } from 'vue';

const steps = [
  {
    number: '01',
    title: 'Install the CLI, create a project',
    commands: [
      [{ t: 'composer', c: 'cmd' }, { t: ' global require ' }, { t: 'leafs/cli' }],
      [{ t: 'leaf', c: 'cmd' }, { t: ' create ' }, { t: 'my-app', c: 'arg' }],
    ],
    copy: 'composer global require leafs/cli\nleaf create my-app',
  },
  {
    number: '02',
    title: 'Run it',
    commands: [
      [{ t: 'cd', c: 'cmd' }, { t: ' ' }, { t: 'my-app', c: 'arg' }, { t: ' && ' }, { t: 'leaf', c: 'cmd' }, { t: ' serve' }],
    ],
    copy: 'cd my-app && leaf serve',
  },
];

const copyAll = steps.map((step) => step.copy).join('\n');
const copied = ref(null);
const copyError = ref('');
let timer;

async function copy(text, key) {
  try {
    await navigator.clipboard.writeText(text);
    copied.value = key;
    copyError.value = '';
    clearTimeout(timer);
    timer = setTimeout(() => (copied.value = null), 1600);
  } catch {
    copyError.value = 'Unable to copy. Select and copy the commands manually.';
  }
}

onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <section class="quickstart not-prose" aria-label="Leaf quickstart">
    <div class="quickstart-terminal">
      <span v-for="corner in ['tl', 'tr', 'bl', 'br']" :key="corner" :class="['quickstart-marker', corner]" aria-hidden="true" />
      <header class="quickstart-header">
        <span class="quickstart-label"><span class="quickstart-slashes">//</span> Quickstart</span>
        <div class="quickstart-tools">
          <span class="quickstart-language">Bash</span>
          <button type="button" class="quickstart-copy-all" @click="copy(copyAll, 'all')">
            {{ copied === 'all' ? 'copied ✓' : 'copy all' }}
          </button>
        </div>
      </header>

      <div v-for="step in steps" :key="step.number" class="quickstart-step">
        <span class="quickstart-number">{{ step.number }}</span>
        <div class="quickstart-content">
          <p class="quickstart-title">{{ step.title }}</p>
          <div class="quickstart-commands">
            <div v-for="(line, i) in step.commands" :key="i" class="quickstart-command">
              <span class="quickstart-prompt" aria-hidden="true">$ </span><span
                v-for="(part, j) in line" :key="j" :class="part.c"
              >{{ part.t }}</span>
            </div>
          </div>
        </div>
        <button type="button" class="quickstart-copy" :aria-label="`Copy step ${step.number} commands`" @click="copy(step.copy, step.number)">
          {{ copied === step.number ? 'copied ✓' : 'copy' }}
        </button>
      </div>

      <div class="quickstart-live">
        <span class="quickstart-number">03</span>
        <p class="quickstart-status">
          <span class="quickstart-dot" aria-hidden="true" />
          <span>Your app is live at</span>
          <code>http://localhost:5500</code>
        </p>
        <span class="quickstart-time">~30s</span>
      </div>
    </div>

    <nav class="quickstart-next" aria-label="Next steps">
      <span class="quickstart-then">Then</span>
      <a href="/docs/routing/" class="quickstart-link">
        <span class="quickstart-link-title">Add your first route <span aria-hidden="true">↗</span></span>
        <span class="quickstart-link-code">app()->get('/', fn() => ...)</span>
      </a>
      <a href="/docs/modules" class="quickstart-link">
        <span class="quickstart-link-title">Pull in a module <span aria-hidden="true">↗</span></span>
        <span class="quickstart-link-code">leaf install auth</span>
      </a>
    </nav>
    <span class="quickstart-feedback" role="status">{{ copyError || (copied ? 'Commands copied to clipboard.' : '') }}</span>
  </section>
</template>

<style scoped>
.quickstart {
  --qs-panel: #fff;
  --qs-band: #faf8f5;
  --qs-border: #e3dfda;
  --qs-text: #292524;
  --qs-title: #6b6660;
  --qs-muted: #827b73;
  --qs-subtle: #8a8177;
  --qs-accent: #c65a17;
  --qs-command: #2872a5;
  --qs-argument: #57813c;
  margin: 2rem 0;
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  line-height: 1.6;
  color: var(--qs-text);
}
:global(.dark .quickstart) {
  --qs-panel: #0b0908;
  --qs-band: #120f0b;
  --qs-border: #292623;
  --qs-text: #e2e0df;
  --qs-title: #a3a2a1;
  --qs-muted: #777674;
  --qs-subtle: #595855;
  --qs-accent: #f68629;
  --qs-command: #7bbbe3;
  --qs-argument: #a4ce88;
}
.quickstart-terminal { position: relative; border: 1px solid var(--qs-border); background: var(--qs-panel); }
.quickstart-marker { position: absolute; z-index: 1; width: 5px; height: 5px; background: #d4682d; pointer-events: none; }
.tl { top: -3px; left: -3px; }
.tr { top: -3px; right: -3px; }
.bl { bottom: -3px; left: -3px; }
.br { bottom: -3px; right: -3px; }
.quickstart-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 10px 18px; border-bottom: 1px solid var(--qs-border); font-size: 12px; font-weight: 500; }
.quickstart-label, .quickstart-language, .quickstart-then { text-transform: uppercase; letter-spacing: .12em; }
.quickstart-label { color: var(--qs-title); }
.quickstart-slashes { margin-right: 8px; color: var(--qs-subtle); }
.quickstart-tools { display: flex; align-items: center; gap: 18px; }
.quickstart-language, .quickstart-time { color: var(--qs-muted); }
.quickstart button { font: inherit; cursor: pointer; transition: color .15s; }
.quickstart-copy-all { color: var(--qs-accent); }
.quickstart-step { display: grid; grid-template-columns: 28px minmax(0, 1fr) auto; align-items: start; gap: 12px; padding: 22px 20px 25px 26px; border-bottom: 1px solid var(--qs-border); }
.quickstart-number { padding-top: 2px; color: var(--qs-muted); font-size: 12px; font-weight: 500; }
.quickstart .quickstart-title { margin: 0; font-family: var(--vp-font-family-base); font-size: 15px; font-weight: 500; line-height: 1.5; color: var(--qs-title); }
.quickstart-content { min-width: 0; }
.quickstart-commands { margin-top: 10px; overflow-x: auto; font-size: 15px; line-height: 1.8; }
.quickstart-command { white-space: pre; }
.quickstart-prompt { color: var(--qs-subtle); user-select: none; }
.cmd { color: var(--qs-command); }
.arg { color: var(--qs-argument); }
.quickstart-copy { padding-top: 2px; color: var(--qs-subtle); font-size: 12px !important; }
.quickstart button:hover { color: var(--qs-accent); }
.quickstart button:focus-visible, .quickstart-link:focus-visible { outline: 2px solid var(--qs-accent); outline-offset: 4px; }
.quickstart-live { display: grid; grid-template-columns: 28px minmax(0, 1fr) auto; align-items: center; gap: 12px; padding: 19px 20px 19px 26px; background: var(--qs-band); }
.quickstart-live .quickstart-number { color: var(--qs-accent); }
.quickstart .quickstart-status { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; margin: 0; font-family: var(--vp-font-family-base); font-size: 15px; font-weight: 600; line-height: 1.6; }
.quickstart-dot { width: 8px; height: 8px; background: #34c99b; flex-shrink: 0; }
.quickstart .quickstart-status code { border-radius: 0; padding: 2px 8px; background: color-mix(in srgb, var(--qs-accent) 12%, transparent); color: var(--qs-accent); font-family: var(--vp-font-family-mono); font-size: 14px; font-weight: 400; white-space: nowrap; }
.quickstart-time { font-size: 12px; }
.quickstart-next { display: grid; grid-template-columns: 66px minmax(0, 1fr) minmax(0, 1fr); border: 1px solid var(--qs-border); border-top: 0; background: var(--qs-band); }
.quickstart-then { display: flex; align-items: center; justify-content: center; color: var(--qs-muted); font-size: 12px; }
.quickstart .quickstart-link { min-width: 0; border-left: 1px solid var(--qs-border); padding: 17px 20px; text-decoration: none; color: var(--qs-text); transition: background .15s; }
.quickstart-link:hover { background: color-mix(in srgb, var(--qs-accent) 5%, var(--qs-band)); }
.quickstart-link-title { display: flex; align-items: center; gap: 5px; font-family: var(--vp-font-family-base); font-size: 15px; font-weight: 650; line-height: 1.5; }
.quickstart-link-title > span { font-size: 21px; font-weight: 400; line-height: 1; }
.quickstart-link-code { display: block; margin-top: 3px; color: var(--qs-muted); font-size: 13px; overflow-wrap: anywhere; }
.quickstart-feedback { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@media (max-width: 640px) {
  .quickstart-header { padding: 10px 14px; gap: 8px; font-size: 10px; }
  .quickstart-label, .quickstart-tools { white-space: nowrap; }
  .quickstart-tools { gap: 10px; }
  .quickstart-step, .quickstart-live { grid-template-columns: 22px minmax(0, 1fr) auto; gap: 8px; padding: 20px 14px; }
  .quickstart-commands { font-size: 13px; }
  .quickstart-status { gap: 8px !important; }
  .quickstart-status code { max-width: 100%; font-size: 12px !important; }
  .quickstart-next { grid-template-columns: 44px minmax(0, 1fr); }
  .quickstart-then { grid-row: span 2; font-size: 10px; }
  .quickstart .quickstart-link { padding: 14px; }
  .quickstart-link + .quickstart-link { border-top: 1px solid var(--qs-border); }
  .quickstart-time { align-self: start; padding-top: 3px; font-size: 10px; }
}
</style>
