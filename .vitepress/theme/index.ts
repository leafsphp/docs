import DefaultTheme from 'vitepress/theme';
import { VueWriter } from 'vue-writer';
import { MotionPlugin } from '@vueuse/motion';

import 'virtual:group-icons.css';
import './styles/index.css';
import { defineAsyncComponent, h } from 'vue';

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }: any) {
    app.use(MotionPlugin);
    app.component('vue-writer', VueWriter);
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () =>
        h(defineAsyncComponent(() => import('./components/shared/Banner.vue'))),
    });
  },
};
