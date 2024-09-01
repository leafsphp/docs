import { DefaultTheme } from 'vitepress';

const nav: DefaultTheme.NavItem[] = [
  {
    text: 'Docs',
    activeMatch: `^/(docs|style-guide|examples|tutorial)/`,
    items: [
      { text: 'Guide', link: '/docs/' },
      {
        text: 'Leaf + MVC',
        link: '/docs/mvc/',
      },
      { text: 'Tutorial', link: '/tutorial/' },
      { text: 'Online Playground', link: 'https://sandbox.leafphp.dev/' },
      {
        text: 'Leaf Modules',
        link: '/modules/',
      },
      {
        text: 'Changelog',
        link: '/community/releases/',
      },
    ],
  },

  {
    text: 'Ecosystem',
    activeMatch: `^/ecosystem/`,
    items: [
      {
        text: 'Tooling',
        items: [
          {
            text: 'Leaf CLI',
            link: '/docs/cli/',
          },
          {
            text: 'MVC Console',
            link: '/docs/mvc/console/',
          },
          {
            text: 'Leaf UI',
            link: 'https://ui.leafphp.dev/',
          },
        ],
      },
      {
        text: 'Resources',
        items: [
          {
            text: 'Project Showcase',
            link: '/ecosystem/showcase',
          },
          {
            text: 'Codelabs',
            link: '/codelabs/',
          },
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
    ],
  },

  {
    text: 'Community',
    activeMatch: `^/(about|community)/`,
    items: [
      {
        text: 'Community',
        items: [
          {
            text: 'Leaf Community',
            link: '/community/',
          },
          {
            text: 'Contribute to Leaf',
            link: '/community/contributing/',
          },
          {
            text: 'Contribute to docs',
            link: '/community/contributing/writing-guide',
          },
          {
            text: 'Blog',
            link: 'https://blog.leafphp.dev',
          },
          {
            text: 'Events',
            link: '/events/',
          },
          {
            text: 'Team',
            link: '/community/team',
          },
          {
            text: 'FAQ',
            link: '/community/faq',
          }
        ],
      },
      {
        text: 'Help',
        items: [
          {
            text: 'Leaf Forum',
            link: 'https://github.com/leafsphp/leaf/discussions/37',
          },
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
    text: 'Support Leaf',
    link: '/support/',
  },
];

export default nav;
