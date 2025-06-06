import { defineAsyncComponent, h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import { VueWriter } from 'vue-writer';
import { MotionPlugin } from '@vueuse/motion';

import 'virtual:group-icons.css';
import './styles/index.css';

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }: any) {
    app.use(MotionPlugin);
    app.component('vue-writer', VueWriter);
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 'layout-top': () =>
      //   h(defineAsyncComponent(() => import('./components/shared/Banner.vue'))),
      // 'aside-ads-before' : () =>
      //   h(defineAsyncComponent(() => import('./components/shared/Ad.vue'))),
        // h(defineAsyncComponent(() => import('./components/shared/GPTLink.vue'))),
      'sidebar-nav-before': () =>
        h(defineAsyncComponent(() => import('./components/shared/SidebarLinks.vue'))),
    });
  },
};
