import { defineAsyncComponent, h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import { VueWriter } from 'vue-writer';
import { MotionPlugin } from '@vueuse/motion';
import StatusBadge from './components/shared/StatusBadge.vue';

import 'virtual:group-icons.css';
import './styles/index.css';
import './styles/home.css';

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }: any) {
    app.use(MotionPlugin);
    app.component('vue-writer', VueWriter);
    app.component('StatusBadge', StatusBadge);
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () =>
        h(defineAsyncComponent(() => import('./components/shared/Banner.vue'))),
      'doc-before': () =>
        h(
          defineAsyncComponent(
            () => import('./components/shared/DocAIMenu.vue'),
          ),
        ),
      'aside-ads-before': () =>
        h(defineAsyncComponent(() => import('./components/shared/Ad.vue'))),
      // h(defineAsyncComponent(() => import('./components/shared/GPTLink.vue'))),
      'sidebar-nav-before': () => [
        h(
          defineAsyncComponent(
            () => import('./components/shared/SidebarSearch.vue'),
          ),
        ),
        h(
          defineAsyncComponent(
            () => import('./components/shared/SidebarLinks.vue'),
          ),
        ),
      ],
    });
  },
};
