<script setup>
import { ref } from 'vue';
import { ui } from '../Home/ui';

const tabs = [
  { id: 'Routing', link: '/docs/routing/', text: 'Declare a route in one line. Dynamic segments, groups, middleware and named routes are built in.', code: `app()->get('/users/{id}', function ($id) {\n  response()->json(['id' => $id]);\n});` },
  { id: 'Database', link: '/docs/database/', text: 'A query builder that reads like the SQL you meant, with Eloquent-style models when you want them.', code: `$users = db()\n  ->select('users')\n  ->orderBy('created_at', 'DESC')\n  ->all();` },
  { id: 'Auth', link: '/docs/auth/', text: 'Login, signup, sessions and tokens from one module. Add it when you need it.', code: `$user = auth()->user();` },
  { id: 'Validation', link: '/docs/http/', text: 'Validate a request in a single call and read the errors when it fails.', code: `$data = request()->validate([\n  'name' => 'text',\n  'email' => 'email',\n  'password' => 'min:8',\n]);` },
  { id: 'Modules', link: '/docs/modules', text: 'Leaf starts small. Add database, auth, mail or billing as modules, nothing you do not use.', code: `leaf install auth` },
  { id: 'MVC', link: '/docs/mvc/', text: 'Controllers handle requests, models query data, views render the UI. Scaffolds give you the rest.', code: `leaf create my-product --mvc` },
  { id: 'Testing', link: '/docs/utils/testing', text: 'Tests, lint and static analysis run through one command with Alchemy.', code: `leaf install alchemy --dev\nleaf run alchemy` },
  { id: 'Deploy', link: '/docs/docker', text: 'Ship the same app to a shared host, a container or a Swoole server.', code: `leaf deploy` },
];
const active = ref(tabs[0].id);
</script>

<template>
  <section :class="[ui.section, ui.spacious]">
    <header :class="ui.header">
      <p :class="ui.eyebrow">For people</p>
      <h2 :class="ui.title">Everything a product needs, nothing it does not</h2>
    </header>
    <div class="mb-6 flex flex-wrap gap-2">
      <button v-for="t in tabs" :key="t.id" class="h-9 cursor-pointer border px-4 text-sm font-medium"
        :class="active === t.id ? 'border-neutral-950 bg-neutral-950 text-white dark:border-white dark:bg-white dark:text-neutral-950' : 'border-black/[0.08] text-neutral-500 dark:border-white/[0.08]'"
        @click="active = t.id">{{ t.id }}</button>
    </div>
    <template v-for="t in tabs" :key="t.id">
      <div v-if="active === t.id" class="grid gap-8 border border-black/[0.08] p-6 dark:border-white/[0.08] md:grid-cols-2">
        <div>
          <p :class="ui.subtitle">{{ t.text }}</p>
          <a :href="t.link" :class="[ui.link, 'mt-6 inline-flex']">Read the docs</a>
        </div>
        <pre class="!m-0 overflow-x-auto bg-neutral-50 p-5 font-mono text-[0.8125rem] leading-[1.7] dark:bg-white/[0.03]"><code>{{ t.code }}</code></pre>
      </div>
    </template>
  </section>
</template>
