<script setup>
import DataCard from '../shared/DataCard.vue';

const tooling = [
  {
    icon: '🚦',
    title: 'Powerful Routing',
    description: 'Leaf comes with a super lightweight but powerful router that handles all the heavy lifting for you.',
    // image: '/images/illustrations/routing.svg',
    link: '/docs/routing/'
  },
  {
    icon: '🔐',
    title: 'Dead-simple Authentication',
    description: 'Create full-fledged authentication systems for your API or with a full UI in seconds with Leaf Auth.',
    // image: '/images/illustrations/auth.svg',
    link: '/docs/auth/'
  },
  {
    icon: '💾',
    title: 'Powerful DB Layer',
    description: 'Leaf provides a highly performant database layer for all your queries with support for ORMs like Eloquent.',
    // image: '/images/illustrations/db.svg',
    link: '/docs/database/'
  },
  {
    icon: '🍱',
    title: 'Multiple Flavours',
    description: 'No application is the same, why should every framework be the same? Customize your Leaf installation with our powerful CLI.',
    link: '/docs/cli/',
  },
  {
    icon: '📦',
    title: 'Useful App Utils',
    description: 'From data fetching to dates, validation, caching, mailing, logging, everyday functions and all those goodies, Leaf has got you covered.',
  link: '/docs/modules',
  },
  {
    icon: '🔍',
    title: 'Graceful Erroring',
    description: 'There are no “Oh no!” moments with Leaf. We\'ve got all the tools you need to fail-in-style: from devtools to debug modes and custom errors.',
    link: '/docs/routing/error-handling',
  },
  {
    icon: '🎨',
    title: 'Dynamic View Layer',
    description: 'Leaf supports multiple template engines and even frameworks like React, Vue and Svelte.',
    link: '/docs/frontend/',
  },
  {
    icon: '🔧',
    title: 'Friendly system utilities',
    description: 'Access/modify system info securely without dealing with the complex functions taken directly from C.',
  link: '/docs/modules',
  },
  {
    title: '30+ modules',
    description: 'Full list of Leaf modules',
    image: '/images/illustrations/modules.svg',
    link: '/docs/modules',
  },
  {
    icon: '📡',
    title: 'Simplified Http API',
    description: 'Leaf provides user-friendly APIs for handling requests, CORS, sessions, cookies and everything in-between.',
    link: '/docs/http/request',
  },
  {
    icon: '🏎️',
    title: 'Swoole Support',
    description: 'Leaf + Swoole = Rocket + Gravity assist. Leaf offers a clean way to use Swoole with the same API.',
    link: '/docs/swoole',
  },
];
</script>

<template>
  <section class="flex flex-col justify-center items-center mb-24">
    <div class="text-center mb-8">
      <h1>Powerful tooling that grows with you</h1>
      <p class="max-w-[700px]">Leaf offers lightweight, customizable tools, allowing you to tailor your application with
        only the necessary features. It supports a vast ecosystem of modules and millions of PHP packages, eliminating
        the need to reinvent the wheel 🚀</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <DataCard v-for="item in tooling" :key="item.title" v-bind="item" />
    </div>
  </section>
</template>
