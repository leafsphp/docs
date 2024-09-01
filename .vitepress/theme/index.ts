import DefaultTheme from 'vitepress/theme';

// import MyCustomComponent from './components/MyCustomComponent.vue';

import './styles/index.css';

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  // enhanceApp({ app }) {
  //   app.component('MyCustomComponent', MyCustomComponent)
  //   app.component('AnotherCustomComponent', AnotherCustomComponent)
  // }
};
