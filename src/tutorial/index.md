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

<script>
import { defineAsyncComponent, h } from 'vue';

export default {
  components: {
    TutorialRepl: defineAsyncComponent({
      loader: () => import('@theme/components/Repl/TutorialRepl.vue'),
      loadingComponent: h('div', { class: 'loading' }, [
        h('span', { class: 'loading-text' }, 'Loading...'),
      ]),
    })
  }
}
</script>

<ClientOnly>
  <TutorialRepl />
</ClientOnly>
