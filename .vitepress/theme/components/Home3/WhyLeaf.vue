<script setup lang="ts">
import { computed, ref } from 'vue';
import { highlight } from '../../lib/highlight';

const auth = ref<'session' | 'jwt'>('session');
const authCode = computed(() =>
  auth.value === 'session'
    ? "auth()->login([\n    'email' => $email,\n    'password' => $password,\n]);\n\n// signed in with a session cookie"
    : "auth()->config('session', false);\n\n$data = auth()->login([\n    'email' => $email,\n    'password' => $password,\n]);\n\nresponse()->json($data);",
);
const authLines = computed(() => highlight(authCode.value));
const authResult = computed(() =>
  auth.value === 'session' ? 'session cookie set · expires in 7 days' : 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9…',
);

const dbLines = highlight(
  "$orders = db()\n    ->select('orders')\n    ->where('status', 'paid')\n    ->orderBy('created_at', 'desc')\n    ->limit(3)\n    ->all();",
);
const payLines = highlight("$order = Order::find($id);\n\nbilling()->charge($order);");

const modDefs: [string, string, string][] = [
  ['auth', 'Sign-in', '$user = auth()->user();'],
  ['db', 'Database', "$orders = db()->select('orders')->all();"],
  ['billing', 'Payments', 'billing()->charge($order);'],
  ['session', 'Sessions', "session()->set('cart', $cart);"],
  ['cache', 'Cache', "$menu = cache()->get('menu');"],
  ['cors', 'CORS', 'app()->cors();'],
];
const mods = ref<string[]>(['auth', 'db']);
function toggleMod(key: string) {
  mods.value = mods.value.includes(key) ? mods.value.filter((m) => m !== key) : [...mods.value, key];
}
const modLines = computed(() => {
  const on = modDefs.filter((d) => mods.value.includes(d[0]));
  const body = [
    '// ' + (on.length ? 'leaf install ' + on.map((d) => d[0]).join(' ') : 'no modules yet, the core runs fine'),
    '',
    "app()->get('/', function () {",
  ];
  on.forEach((d) => body.push('    ' + d[2], ''));
  body.push("    response()->json(['ok' => true]);", '});');
  return highlight(body.join('\n'));
});

const mapLines = [
  [{ t: '# my-product', k: 'k' }],
  [{ t: 'modules      auth, db, billing, queue', k: 'p' }],
  [],
  [{ t: '## conventions', k: 'k' }],
  [{ t: 'routes       → app/routes/*.php', k: 'p' }],
  [{ t: 'controllers  → one per resource', k: 'p' }],
  [],
  [{ t: '## recent', k: 'k' }],
  [{ t: '+', k: 'f' }, { t: ' OrdersController::store charges on create', k: 'p' }],
];
</script>

<template>
  <section>
    <div class="lf-pad" style="padding-top: 88px; padding-bottom: 40px">
      <h2 class="lf-h2" style="margin-bottom: 14px">Everything a product needs, nothing it doesn't</h2>
      <p class="lf-lede" style="max-width: 660px">
        Every module has the same shape, so the whole app stays small enough to hold in your head, and in a context
        window.
      </p>
    </div>

    <div class="lf-pad lf-bento">
      <!-- Sign-in -->
      <div class="lf-tile">
        <div class="lf-tile-head">
          <svg width="64" height="56" viewBox="0 0 64 56" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M32 4 58 18 32 32 6 18Z" fill="var(--lf-surface)" /><path d="M6 18v14l26 14 26-14V18" /><path d="M32 32v14" /><circle cx="32" cy="16" r="4" fill="#E8753A" stroke="none" /><path d="M24 22c2-4 14-4 16 0" /></svg>
          <div>
            <h3>Sign-in</h3>
            <p>Login, sign-up, roles and permissions. Pick sessions or tokens and the code barely changes.</p>
          </div>
        </div>
        <div class="lf-tile-body">
          <div role="tablist" aria-label="Sign-in mode" class="lf-toggle">
            <button type="button" role="tab" :aria-selected="auth === 'session'" :class="{ on: auth === 'session' }" @click="auth = 'session'">Sessions</button>
            <button type="button" role="tab" :aria-selected="auth === 'jwt'" :class="{ on: auth === 'jwt' }" @click="auth = 'jwt'">Tokens (JWT)</button>
          </div>
          <pre class="lf-code"><span v-for="ln in authLines" :key="ln.n" class="lf-line"><span v-for="(sg, j) in ln.segs" :key="j" :class="sg.k">{{ sg.t }}</span></span></pre>
          <div class="lf-row-card">
            <span class="lf-avatar">EC</span>
            <span style="flex: 1; min-width: 0">
              <span style="display: block; font-size: 14px; font-weight: 600">Signed in as emma@example.com</span>
              <span class="lf-mono-small">{{ authResult }}</span>
            </span>
          </div>
        </div>
      </div>

      <!-- Database -->
      <div class="lf-tile">
        <div class="lf-tile-head">
          <svg width="64" height="56" viewBox="0 0 64 56" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><ellipse cx="32" cy="12" rx="22" ry="8" fill="var(--lf-surface)" /><path d="M10 12v12c0 4.4 9.8 8 22 8s22-3.6 22-8V12" /><path d="M10 24v12c0 4.4 9.8 8 22 8s22-3.6 22-8V24" /><path d="M10 36v8c0 4.4 9.8 8 22 8s22-3.6 22-8v-8" /><circle cx="46" cy="22" r="2.5" fill="#E8753A" stroke="none" /></svg>
          <div>
            <h3>Database</h3>
            <p>Fluent queries that read like sentences. MySQL, Postgres, SQLite and more.</p>
          </div>
        </div>
        <div class="lf-tile-body">
          <pre class="lf-code"><span v-for="ln in dbLines" :key="ln.n" class="lf-line"><span v-for="(sg, j) in ln.segs" :key="j" :class="sg.k">{{ sg.t }}</span></span></pre>
          <div class="lf-table">
            <div class="lf-tr lf-th"><span>id</span><span>customer</span><span>total</span><span>status</span></div>
            <div class="lf-tr"><span class="lf-dim">104</span><span>Emma Carter</span><span>$18.98</span><span class="lf-ok">paid</span></div>
            <div class="lf-tr"><span class="lf-dim">107</span><span>Kenji Sato</span><span>$9.49</span><span class="lf-ok">paid</span></div>
            <div class="lf-tr"><span class="lf-dim">112</span><span>Sofia Rossi</span><span>$26.97</span><span class="lf-ok">paid</span></div>
          </div>
        </div>
      </div>

      <!-- Payments -->
      <div class="lf-tile">
        <div class="lf-tile-head">
          <svg width="64" height="56" viewBox="0 0 64 56" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M8 22 40 6l16 8-32 16Z" fill="var(--lf-surface)" /><path d="M8 22v10l16 8V30" /><path d="M24 40l32-16V14" /><path d="M14 25l20-10" /><circle cx="44" cy="14" r="3" fill="#E8753A" stroke="none" /></svg>
          <div>
            <h3>Payments</h3>
            <p>One-off charges and subscriptions, with the checkout wired up for you.</p>
          </div>
        </div>
        <div class="lf-tile-body">
          <pre class="lf-code"><span v-for="ln in payLines" :key="ln.n" class="lf-line"><span v-for="(sg, j) in ln.segs" :key="j" :class="sg.k">{{ sg.t }}</span></span></pre>
          <div class="lf-row-card" style="position: relative; flex-wrap: wrap; gap: 20px; padding: 20px 22px">
            <div style="flex: 1 1 160px">
              <p style="margin-bottom: 4px; font-size: 13px; color: var(--lf-muted)">Studio Nala · deposit</p>
              <p class="lf-price">$20.00</p>
            </div>
            <span class="lf-press lf-paybtn">Pay deposit</span>
            <span class="lf-paid lf-paid-badge"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg></span>
          </div>
        </div>
      </div>

      <!-- Background jobs -->
      <div class="lf-tile">
        <div class="lf-tile-head">
          <svg width="64" height="56" viewBox="0 0 64 56" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M6 30 22 22l16 8-16 8Z" fill="var(--lf-surface)" /><path d="M18 20 34 12l16 8-16 8Z" fill="var(--lf-surface)" /><path d="M30 10 46 2l16 8-16 8Z" fill="#E8753A" stroke="#E8753A" /><path d="M6 30v6l16 8 16-8v-6" /></svg>
          <div>
            <h3>Background jobs</h3>
            <p>Send receipts, resize images or sync data without making anyone wait.</p>
          </div>
        </div>
        <div class="lf-tile-body" style="gap: 10px">
          <div class="lf-job"><span>SendReceipt · order 104</span><span class="lf-j1">done</span></div>
          <div class="lf-job"><span>ResizePhotos · 12 images</span><span class="lf-j2">done</span></div>
          <div class="lf-job"><span>SyncInventory · nightly</span><span class="lf-j3">done</span></div>
          <p style="margin: 6px 2px 0; font-size: 13px; color: var(--lf-faint)">Jobs move from queued, to running, to done while your app keeps responding.</p>
        </div>
      </div>

      <!-- Module picker -->
      <div class="lf-tile lf-wide">
        <div class="lf-tile-body lf-picker">
          <div style="flex: 1 1 380px; min-width: 0">
            <h3 class="lf-picker-title">Start small. Add the rest when you need it.</h3>
            <p style="margin-bottom: 24px; font-size: 17px; line-height: 1.55; color: var(--lf-muted)">
              25+ first-party modules plug in the day your product asks for them. Pick a few:
            </p>
            <div style="display: flex; flex-wrap: wrap; gap: 8px">
              <button v-for="d in modDefs" :key="d[0]" type="button" :aria-pressed="mods.includes(d[0])"
                :class="['lf-mod', { on: mods.includes(d[0]) }]" @click="toggleMod(d[0])">
                <svg v-if="mods.includes(d[0])" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg>
                <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                {{ d[1] }}
              </button>
            </div>
          </div>
          <pre class="lf-code" style="flex: 1 1 460px; min-width: 0; min-height: 300px; box-sizing: border-box"><span v-for="ln in modLines" :key="ln.n" class="lf-line"><span v-for="(sg, j) in ln.segs" :key="j" :class="sg.k">{{ sg.t }}</span></span></pre>
        </div>
      </div>

      <!-- Agent map -->
      <div class="lf-tile lf-dark">
        <div aria-hidden="true" class="lf-dark-glow" />
        <div class="lf-tile-head" style="position: relative; display: block">
          <h3>A map for your agent</h3>
          <p style="color: #bdb4a8">Every project keeps a short map your agent reads first, so its code lands where you'd have put it.</p>
        </div>
        <div class="lf-map">
          <span class="lf-scan" aria-hidden="true" />
          <pre><span v-for="(segs, n) in mapLines" :key="n" class="lf-line"><span v-for="(sg, j) in segs" :key="j" :class="sg.k">{{ sg.t }}</span></span></pre>
        </div>
      </div>

      <!-- Speed + frontends -->
      <div style="display: grid; grid-template-rows: auto auto; gap: 16px">
        <div class="lf-tile" style="padding: 30px; gap: 16px">
          <h3 class="lf-h3">Fast and light</h3>
          <div>
            <div class="lf-bar-head"><span style="font-weight: 600">Leaf</span><span class="lf-mono" style="color: var(--lf-link)">[x ms]</span></div>
            <div class="lf-bar"><div class="lf-r1" style="background: linear-gradient(90deg, #f5b731, #e8753a)" /></div>
          </div>
          <div>
            <div class="lf-bar-head lf-dim"><span>[Framework A]</span><span class="lf-mono">[x ms]</span></div>
            <div class="lf-bar"><div class="lf-r2" style="background: #b9afa3" /></div>
          </div>
          <div>
            <div class="lf-bar-head lf-dim"><span>[Framework B]</span><span class="lf-mono">[x ms]</span></div>
            <div class="lf-bar"><div class="lf-r3" style="background: #b9afa3" /></div>
          </div>
          <p style="font-size: 12.5px; color: var(--lf-faint)">[Benchmark source: Why Leaf 5]</p>
        </div>
        <div class="lf-tile lf-fe">
          <div>
            <h3 class="lf-h3" style="margin-bottom: 4px">Any frontend</h3>
            <p style="font-size: 14px; color: #5a3a26">Same backend, same agent map.</p>
          </div>
          <div style="height: 56px; overflow: hidden">
            <div class="lf-cyc lf-fe-words">
              <span style="color: #087ea4">React</span><span style="color: #2f8a5f">Vue</span><span style="color: #e0400a">Svelte</span><span style="color: #c2362b">Blade</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.lf-bento {
  padding-bottom: 32px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(440px, 100%), 1fr));
  gap: 16px;
}
.lf-tile {
  background: var(--lf-card);
  border-radius: 24px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.lf-wide {
  grid-column: 1 / -1;
}
.lf-tile-head {
  padding: 26px 26px 22px;
  display: flex;
  gap: 18px;
  align-items: flex-start;
  color: var(--lf-ink);
}
.lf-tile-head svg {
  flex: 0 0 auto;
  opacity: 0.85;
}
.lf-tile-head h3,
.lf-h3 {
  margin-bottom: 6px !important;
  font-size: 22px;
  letter-spacing: -0.02em;
  font-weight: 600;
}
.lf-tile-head p {
  font-size: 15px;
  line-height: 1.55 !important;
  color: var(--lf-muted);
}
.lf-tile-body {
  background: var(--lf-surface);
  border-radius: 18px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  min-width: 0;
}
.lf-toggle {
  display: inline-flex;
  align-self: flex-start;
  padding: 3px;
  background: #f5f2ee;
  border-radius: 999px;
}
.dark .lf-toggle {
  background: #221d19;
}
.lf-toggle button {
  font-size: 13px;
  padding: 6px 14px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #6b6158;
  cursor: pointer;
}
.dark .lf-toggle button {
  color: #b5aba0;
}
.lf-toggle button.on,
.dark .lf-toggle button.on {
  background: #ffffff;
  color: #120e0b;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.lf-row-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid var(--lf-line);
  border-radius: 14px;
}
.lf-avatar {
  width: 36px;
  height: 36px;
  flex: 0 0 36px;
  border-radius: 50%;
  background: #fde9d9;
  color: #b4471a;
  display: grid;
  place-items: center;
  font-size: 13px;
  font-weight: 700;
}
.lf-mono-small {
  display: block;
  font-size: 12.5px;
  color: var(--lf-muted);
  font-family: ui-monospace, Menlo, monospace;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.lf-table {
  border: 1px solid var(--lf-line);
  border-radius: 14px;
  overflow: hidden;
  font-size: 14px;
}
.lf-tr {
  display: grid;
  grid-template-columns: 56px 1fr 90px 64px;
  padding: 12px 16px;
  border-top: 1px solid var(--lf-line);
}
.lf-th {
  border-top: 0;
  padding: 11px 16px;
  background: var(--lf-soft);
  color: var(--lf-muted);
  font-family: ui-monospace, Menlo, monospace;
  font-size: 11.5px;
}
.lf-dim {
  color: var(--lf-muted);
}
.lf-ok {
  color: #23704a;
  font-weight: 600;
}
.dark .lf-ok {
  color: #6fcf97;
}
.lf-price {
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-size: 32px;
  line-height: 1 !important;
  font-weight: 600;
  letter-spacing: -0.03em;
}
.lf-paybtn {
  flex: 1 1 180px;
  display: block;
  padding: 13px;
  border-radius: 999px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
}
.lf-paid-badge {
  position: absolute;
  top: -12px;
  right: -12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #23704a;
  display: grid;
  place-items: center;
  box-shadow: 0 0 0 4px var(--lf-surface);
}
.lf-job {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid var(--lf-line);
  border-radius: 14px;
  font-family: ui-monospace, Menlo, monospace;
  font-size: 13.5px;
}
.lf-job span:last-child {
  padding: 4px 10px;
  border-radius: 999px;
  font-family: Inter, system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
}
.lf-picker {
  padding: 36px;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 40px;
  align-items: center;
}
.lf-picker-title {
  margin-bottom: 12px !important;
  font-size: clamp(30px, 3.4vw, 44px);
  line-height: 1.02 !important;
  letter-spacing: -0.04em;
  font-weight: 600;
}
.lf-mod {
  font-size: 14.5px;
  font-weight: 500;
  padding: 10px 16px 10px 12px;
  border-radius: 999px;
  border: 1px solid var(--lf-chip-line);
  background: var(--lf-surface);
  color: var(--lf-ink);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.lf-mod.on {
  font-weight: 600;
  border-color: #120e0b;
  background: #120e0b;
  color: #ffffff;
}
.dark .lf-mod.on {
  border-color: #f3eee8;
  background: #f3eee8;
  color: #120e0b;
}
.lf-dark {
  position: relative;
  overflow: hidden;
  background: #120e0b;
  color: #f7f2ea;
}
.dark .lf-dark {
  background: #0b0907;
  outline: 1px solid rgba(255, 255, 255, 0.06);
}
.lf-dark .lf-tile-head {
  color: #f7f2ea;
}
.lf-dark-glow {
  position: absolute;
  right: -100px;
  top: -100px;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(232, 117, 58, 0.35), transparent 65%);
}
.lf-map {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 24px 28px;
  flex: 1;
}
.lf-map pre {
  position: relative;
  font-family: ui-monospace, Menlo, monospace;
  font-size: 14px;
  line-height: 1.9;
  color: #e8e6e3;
  overflow: hidden;
  background: none;
}
.lf-bar-head {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-bottom: 6px;
}
.lf-mono {
  font-family: ui-monospace, Menlo, monospace;
}
.lf-bar {
  height: 8px;
  background: #eae4db;
  border-radius: 99px;
  overflow: hidden;
}
.dark .lf-bar {
  background: #2a241f;
}
.lf-bar > div {
  height: 100%;
  border-radius: 99px;
}
.lf-fe {
  background: #fde9d9;
  color: #120e0b;
  padding: 30px;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
}
.lf-fe-words {
  display: flex;
  flex-direction: column;
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-size: 48px;
  line-height: 56px;
  letter-spacing: -0.04em;
  font-weight: 700;
}
.lf-fe-words span {
  height: 56px;
}
@media (max-width: 640px) {
  .lf-tile-head {
    padding: 20px 16px 16px;
  }
  .lf-tile-body,
  .lf-picker {
    padding: 16px;
  }
  .lf-code {
    padding: 20px 18px;
    font-size: 12.5px;
  }
}

@media (max-width: 640px) {
  .lf-bento {
    gap: 12px;
  }
  .lf-tile {
    border-radius: 20px;
    padding: 6px;
  }
  .lf-tile-head svg {
    display: none;
  }
  .lf-tile-head {
    padding: 18px 14px 14px;
  }
  .lf-tile-head h3,
  .lf-h3 {
    font-size: 20px;
  }
  .lf-tile-body {
    border-radius: 15px;
  }
  .lf-tr {
    grid-template-columns: 40px 1fr 64px 44px;
    padding: 10px 12px;
    font-size: 13px;
  }
  .lf-th {
    padding: 9px 12px;
  }
  .lf-picker-title {
    font-size: 28px;
  }
  .lf-mod {
    font-size: 13.5px;
    padding: 8px 13px 8px 10px;
  }
  .lf-fe-words {
    font-size: 40px;
  }
  .lf-picker .lf-code {
    min-height: 0 !important;
  }
  .lf-map {
    padding: 18px 16px;
  }
  .lf-map pre {
    font-size: 12px;
    overflow-x: auto;
  }
}
</style>
