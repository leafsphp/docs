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
  // shown on the mobile nav screen only — on desktop this is replaced by the
  // EcosystemMenu mega dropdown (the default flyout is hidden via CSS)
  {
    text: 'Ecosystem',
    items: [
      {
        text: 'Alchemy — QA + CI',
        link: 'https://alchemy.leafphp.dev',
      },
      {
        text: 'Seedling — console apps',
        link: 'https://seedling.leafphp.dev',
      },
      {
        text: 'Fetch — HTTP client',
        link: 'https://fetch.leafphp.dev',
      },
      {
        text: 'Hana JS — frontend',
        link: 'https://hanabira.dev',
      },
      {
        text: '25+ modules',
        link: '/docs/modules',
      },
    ],
  },
];

export default nav;
