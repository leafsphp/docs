import { DefaultTheme } from 'vitepress';

const nav: DefaultTheme.NavItem[] = [
  {
    text: 'Docs',
    activeMatch: `^/(docs|examples)/`,
    link: '/docs/',
  },
  {
    text: 'Blog',
    link: 'https://blog.leafphp.dev',
  },
  {
    text: 'Community',
    activeMatch: `^/(about|community)/`,
    items: [
      {
        text: 'Contribute to Leaf',
        link: '/community/guide',
      },
      {
        text: 'Hana JS',
        link: 'https://hanabira.dev',
      },
      {
        text: 'Seedling Framework',
        link: 'https://seedling.leafphp.dev',
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
    text: '🧡 SUPPORT LEAF',
    link: '/support/',
  },
];

export default nav;
