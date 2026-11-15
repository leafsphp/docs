<script setup>
import { ui } from '../Home/ui';

const cards = [
  { title: 'The Leaf skill', text: 'Teaches an agent how to work in a Leaf project: which entry point to scaffold, how to read project context, what the scaffolds give you.', code: 'curl -o .claude/skills/leaf/SKILL.md https://leafphp.dev/ai/SKILL.md' },
  { title: 'Readable project state', text: 'One command prints the routes, modules and conventions an agent needs, so it uses what already exists.', code: 'leaf context' },
  { title: 'Alchemy for the QA floor', text: 'One alchemy.yml. Tests and static analysis run on every commit, so agent output is checked.', code: 'leaf run alchemy' },
];
</script>

<template>
  <section :class="[ui.band]">
    <div :class="ui.bandInner">
      <header :class="ui.header">
        <p :class="ui.eyebrow">For agents</p>
        <h2 :class="ui.title">Built so agents stop guessing</h2>
      </header>
      <div class="grid gap-px border border-black/[0.08] bg-black/[0.08] dark:border-white/[0.08] dark:bg-white/[0.08] md:grid-cols-3">
        <div v-for="c in cards" :key="c.title" class="flex flex-col bg-white p-6 dark:bg-neutral-950">
          <h3 class="!m-0 !mb-3 !border-0 !p-0 text-base font-semibold">{{ c.title }}</h3>
          <p :class="[ui.subtitle, '!text-[0.9375rem]']">{{ c.text }}</p>
          <code class="mt-auto block overflow-x-auto pt-6 font-mono text-[0.75rem] text-neutral-500">{{ c.code }}</code>
        </div>
      </div>
      <a href="https://blog.leafphp.dev" :class="[ui.link, 'mt-8 inline-flex']">How we think about agents</a>
    </div>
  </section>
</template>
