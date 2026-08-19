<script setup>
import { ui } from './ui';
import EcosystemCards from '../shared/EcosystemCards.vue';
</script>

<template>
  <section :class="[ui.section, ui.spacious]">
    <header :class="ui.header">
      <p :class="ui.eyebrow">Ecosystem</p>
      <h2 :class="ui.title">One team. A whole toolchain.</h2>
      <p :class="ui.subtitle">
        Leaf is more than the framework. We're a family of focused tools that work anywhere PHP (or JavaScript) runs,
        each with its own home.
      </p>
    </header>

    <EcosystemCards wide />
  </section>
</template>
