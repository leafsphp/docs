<script setup>
const steps = [
  {
    number: '01',
    title: 'Start with structure',
    description:
      'Spin up a full project with auth, db, and routing already in place, or generate your own custom setup with AI.',
    snippet: { prefix: '$', text: 'leaf create my-product' },
  },
  {
    number: '02',
    title: 'Write logic, not boilerplate',
    description:
      'From AI or your keyboard, write the logic that matters without getting bogged down in repetitive boilerplate.',
    snippet: {
      parts: [
        { text: 'auth', accent: true },
        { text: '()->' },
        { text: 'login', accent: true },
        { text: '([...]);' },
      ],
    },
  },
  {
    number: '03',
    title: 'Ship without friction',
    description:
      'Deploy anywhere PHP runs. No lock-in, no hidden layers, just your product running the way you built it.',
    snippet: { prefix: '$', text: 'leaf deploy' },
  },
];

const metrics = [
  { value: '~30s', label: 'to scaffold a project' },
  { value: '0', label: 'config files to write' },
  { value: '1.2s', label: 'server cold start' },
  { value: '∞', label: 'hours saved per project' },
];
</script>

<template>
  <section id="speed" class="home-section home-section--spacious">
    <header class="home-section__header">
      <p class="home-section__eyebrow">Workflow</p>
      <h2 class="home-section__title !mt-0 !pt-0">Real code. Less friction. Faster flow.</h2>
      <p class="home-section__subtitle">
        AI-first design meets battle-tested PHP code, giving you the power to ship real products faster and
        cheaper than ever before.
      </p>
    </header>

    <div class="home-panel" aria-label="Leaf workflow">
      <span class="home-marker home-marker--tl" aria-hidden="true" />
      <span class="home-marker home-marker--tr" aria-hidden="true" />
      <span class="home-marker home-marker--bl" aria-hidden="true" />
      <span class="home-marker home-marker--br" aria-hidden="true" />

      <div class="home-workflow-steps">
        <article v-for="step in steps" :key="step.number" class="home-workflow-step">
          <span class="home-workflow-step__num">{{ step.number }}</span>
          <h3 class="home-workflow-step__title !mt-0">{{ step.title }}</h3>
          <p class="home-workflow-step__desc">{{ step.description }}</p>

          <div class="home-workflow-code" aria-hidden="true">
            <template v-if="step.snippet.parts">
              <span
                v-for="(part, i) in step.snippet.parts"
                :key="i"
                :class="{ 'home-accent': part.accent }"
              >{{ part.text }}</span>
            </template>
            <template v-else>
              <span class="home-workflow-code__muted">{{ step.snippet.prefix }}</span>
              {{ ' ' }}{{ step.snippet.text }}
            </template>
          </div>
        </article>
      </div>

      <div class="home-workflow-metrics" role="list">
        <div
          v-for="metric in metrics"
          :key="metric.label"
          class="home-workflow-metric"
          role="listitem"
        >
          <span class="home-workflow-metric__value">{{ metric.value }}</span>
          <span class="home-workflow-metric__label">{{ metric.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
