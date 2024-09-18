---
sidebar: false
footer: false
# aside: false
title: Tutorial
ads: false
editLink: false
prev: false
next: false
lastUpdated: false
returnToTop: false
layout: page
---

<!-- markdownlint-disable no-inline-html -->

<script>
import { defineAsyncComponent, h } from 'vue';

export default {
  components: {
    TutorialRepl: defineAsyncComponent({
      loader: () => import('@theme/components/Repl/TutorialRepl.vue'),
      loadingComponent: h('div', { class: 'loading container flex justify-center items-center h-[calc(100vh-200px)]' }, [
        h('span', { class: 'loading-text text-2xl' }, 'Loading...'),
      ]),
    })
  }
}
</script>

<ClientOnly>
  <TutorialRepl />
</ClientOnly>
