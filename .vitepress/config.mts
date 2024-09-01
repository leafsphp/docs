import { defineConfig } from 'vitepress';

import head from './config/head';
import nav from './config/navbar';
import sidebar from './config/sidebar';

export default defineConfig({
  head,
  lang: 'en-US',
  srcDir: 'src',
  scrollOffset: 'header',
  srcExclude: ['tutorial/**/description.md'],

  title: 'Leaf PHP',
  description: 'Simple and elegant PHP',

  themeConfig: {
    nav,
    sidebar,

    logo: '/logo-circle.png',
    siteTitle: 'Leaf 3',

    search: {
      provider: 'local',
      // provider: 'algolia',
      // options: {
      //   appId: 'Q38TT8XUN9',
      //   indexName: 'leafphp',
      //   apiKey: '87b4b8d90960f7a326dfd4c8781a5a74',
      // },
    },

    socialLinks: [
      // { icon: 'languages', link: '/translations/' },
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
      { icon: 'twitter', link: 'https://x.com/leafphp' },
      { icon: 'discord', link: 'https://discord.gg/Pkrm9NJPE3' },
      // {
      //   icon: 'youtube',
      //   link: 'https://www.youtube.com/channel/UCllE-GsYy10RkxBUK0HIffw'
      // }
    ],

    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium',
      },
    },

    editLink: {
      text: 'Edit this page on GitHub',
      // pattern: 'https://github.com/leafsphp/docs/edit/next/src/:path',
      pattern: ({ filePath }) => {
        if (filePath.startsWith('packages/')) {
          return `https://github.com/leafsphp/docs/edit/next/src/${filePath}`;
        } else {
          return `https://github.com/leafsphp/docs/edit/next/src/${filePath}`;
        }
      },
    },

    footer: {
      message: `Released under the <a href="https://github.com/leafsphp/leaf/blob/v3.x/LICENSE">MIT License</a>.`,
      copyright: `Copyright © 2019-${new Date().getFullYear()} Michael Darko-Duodu`,
    },
  },
});
