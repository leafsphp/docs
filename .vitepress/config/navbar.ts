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
      // {
      //   text: 'Changelog',
      //   link: '/community/releases',
      // },
      // {
      //   text: 'Project Showcase',
      //   link: '/community/showcase',
      // },
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
