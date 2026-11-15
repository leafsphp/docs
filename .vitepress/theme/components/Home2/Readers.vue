<script setup>
import { ref } from 'vue';
import { ui } from '../Home/ui';

const reader = ref('people');
const file = ref('index.php');

const peopleFiles = {
  'index.php': `<?php
require __DIR__ . '/vendor/autoload.php';

app()->get('/plans', function () {
  $plans = db()
    ->select('plans', 'name, price')
    ->orderBy('price', 'asc')
    ->all();

  response()->json($plans);
});

app()->get('/plans/{id}', 'PlansController@show');

app()->run();`,
  'PlansController.php': `<?php

namespace App\\Controllers;

class PlansController extends Controller
{
    public function show($id)
    {
        $plan = db()->select('plans')->where('id', $id)->first();

        if (!$plan) {
            response()->json(['error' => 'Plan not found'], 404);
            return;
        }

        response()->json($plan);
    }
}`,
};

const agentCode = `// app/Controllers/UpgradeController.php
public function store()
{
    $data = request()->validate([
        'plan_id' => 'text',
    ]);

    if (!$data) {
        return response()->json(request()->errors(), 422);
    }

    db()->update('users')
        ->params(['plan_id' => $data['plan_id']])
        ->where('id', auth()->user()->id)
        ->execute();

    response()->json(['upgraded' => true]);
}`;
</script>

<template>
  <section :class="[ui.section, 'pb-24 lg:pb-32']">
    <div class="mb-8 flex justify-center">
      <div role="tablist" aria-label="Choose your reader" class="inline-flex border border-black/[0.08] p-1 dark:border-white/[0.08]">
        <button
          v-for="r in [{ id: 'people', label: 'For people' }, { id: 'agents', label: 'For agents' }]"
          :key="r.id"
          role="tab"
          :aria-selected="reader === r.id"
          class="h-9 cursor-pointer px-5 text-sm font-medium transition-colors"
          :class="reader === r.id ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950' : 'text-neutral-500 hover:text-neutral-950 dark:hover:text-white'"
          @click="reader = r.id"
        >{{ r.label }}</button>
      </div>
    </div>

    <div class="overflow-hidden border border-black/[0.08] bg-white dark:border-white/[0.08] dark:bg-neutral-950">
      <div v-if="reader === 'people'" data-reader="people">
        <div class="flex gap-px border-b border-black/[0.08] px-2 dark:border-white/[0.08]">
          <button
            v-for="(_, name) in peopleFiles"
            :key="name"
            class="cursor-pointer px-3 py-3 font-mono text-[0.75rem]"
            :class="file === name ? 'text-neutral-950 dark:text-white' : 'text-neutral-400'"
            @click="file = name"
          >{{ name }}</button>
        </div>
        <pre class="!m-0 overflow-x-auto p-6 font-mono text-[0.8125rem] leading-[1.7] text-neutral-800 dark:text-neutral-200"><code>{{ peopleFiles[file] }}</code></pre>
        <p class="!m-0 border-t border-black/[0.08] px-6 py-4 text-sm text-neutral-500 dark:border-white/[0.08]">
          Clean code with no ceremony. Routing, DB, auth and validation ship as modules you add when you need them.
        </p>
      </div>

      <div v-else data-reader="agents">
        <div class="grid md:grid-cols-[2fr_3fr]">
          <div class="border-b border-black/[0.08] p-6 dark:border-white/[0.08] md:border-b-0 md:border-r">
            <p class="!m-0 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-neutral-400">Prompt</p>
            <p class="!m-0 !mt-4 text-[1.0625rem] leading-[1.6] text-neutral-950 dark:text-neutral-50">
              Add a paid plans table and an endpoint to upgrade a user
            </p>
          </div>
          <div>
            <div class="flex items-center justify-between border-b border-black/[0.08] px-6 py-3 dark:border-white/[0.08]">
              <span class="font-mono text-[0.75rem] text-neutral-400">Agent output</span>
              <span :class="ui.badge">Produced with the Leaf skill</span>
            </div>
            <pre class="!m-0 overflow-x-auto p-6 font-mono text-[0.8125rem] leading-[1.7] text-neutral-800 dark:text-neutral-200"><code>{{ agentCode }}</code></pre>
          </div>
        </div>
        <p class="!m-0 border-t border-black/[0.08] px-6 py-4 text-sm text-neutral-500 dark:border-white/[0.08]">
          Leaf 5 ships its own skill and keeps routes, modules and project state readable, so agents stop guessing. Save the skill, and the agent knows Leaf.
        </p>
      </div>
    </div>
  </section>
</template>
