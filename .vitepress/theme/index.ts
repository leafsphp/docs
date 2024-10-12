import DefaultTheme from 'vitepress/theme';
import { VueWriter } from 'vue-writer';

import 'virtual:group-icons.css';
import './styles/index.css';

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }: any) {
    app.component('vue-writer', VueWriter);
  },
};
