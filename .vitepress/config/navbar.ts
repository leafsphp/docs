import { DefaultTheme } from 'vitepress';

const nav: DefaultTheme.NavItem[] = [
  {
    text: 'Docs',
    activeMatch: `^/(docs|examples)/`,
    items: [
      { text: 'Guide', link: '/docs/' },
      { text: 'Tutorial', link: '/tutorial/' },
      {
        text: 'Leaf + MVC',
        link: '/docs/mvc/',
      },
      {
        text: 'Leaf Modules',
        link: '/docs/modules',
      },
      {
        text: 'Leaf CLI',
        link: '/docs/cli/',
      },
      {
        text: 'MVC Console',
        link: '/docs/mvc/console/',
      },
    ],
  },

  {
    text: 'Ecosystem',
    activeMatch: `^/ecosystem/`,
    items: [
      {
        text: 'Resources',
        items: [
          { text: 'Online Playground', link: 'https://sandbox.leafphp.dev/' },
          {
            text: 'Codelabs',
            link: '/codelabs/',
          },
          // {
          //   text: 'Leaf UI',
          //   link: 'https://ui.leafphp.dev/',
          // },
        ],
      },
      {
        text: 'Other',
        items: [
          {
            text: 'Hana JS',
            link: 'https://hanajs.dev',
          },
          {
            text: 'Naytive',
            link: 'https://naytive.netlify.app',
          },
        ],
      },
      {
        text: 'Help',
        items: [
          // {
          //   text: 'Leaf Forum',
          //   link: 'https://github.com/leafsphp/leaf/discussions/37',
          // },
          {
            text: 'YouTube',
            link: 'https://www.youtube.com/channel/UCllE-GsYy10RkxBUK0HIffw',
          },
          {
            text: 'Discord',
            link: 'https://discord.gg/Pkrm9NJPE3',
          },
          {
            text: 'GitHub',
            link: 'https://github.com/leafsphp/leaf',
          },
        ],
      },
    ],
  },

  {
    text: 'Community',
    activeMatch: `^/(about|community)/`,
    items: [
      {
        text: 'Leaf Community',
        link: '/community/',
      },
      {
        text: 'Contribute to Leaf',
        link: '/community/guide',
      },
      {
        text: 'Changelog',
        link: '/community/releases',
      },
      // {
      //   text: 'Project Showcase',
      //   link: '/community/showcase',
      // },
      {
        text: 'Blog',
        link: 'https://blog.leafphp.dev',
      },
      {
        text: 'Team',
        link: '/community/team',
      },
      {
        text: 'FAQ',
        link: '/community/faq',
      },
    ],
  },
  {
    text: 'Support Leaf',
    link: '/support/',
  },
];

export default nav;
