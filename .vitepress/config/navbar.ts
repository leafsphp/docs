import { DefaultTheme } from 'vitepress';

// Desktop: the TopNav component (components/shared/TopNav.vue) renders the
// Framework / Products / Resources menus, and CSS hides every item here except
// the Support chip. Mobile: this list drives the nav screen as-is.
const nav: DefaultTheme.NavItem[] = [
  {
    text: 'Docs',
    activeMatch: `^/(docs|examples)/`,
    link: '/docs/',
  },
  {
    text: 'Framework',
    items: [
      { text: 'Routing', link: '/docs/routing/' },
      { text: 'Sign-in', link: '/docs/auth/' },
      { text: 'Database', link: '/docs/database/' },
      { text: 'Payments', link: '/docs/utils/billing' },
      { text: 'Background jobs', link: '/docs/utils/queues' },
      { text: 'Frontend', link: '/docs/frontend/' },
      { text: 'AI and agents', link: '/docs/ai' },
      { text: 'All 25+ modules', link: '/docs/modules' },
    ],
  },
  {
    text: 'Products',
    items: [
      { text: 'Alchemy: QA + CI', link: 'https://alchemy.leafphp.dev' },
      { text: 'Kata: design systems for AI', link: 'https://kata.leafphp.dev' },
      { text: 'Seedling: console apps', link: 'https://seedling.leafphp.dev' },
      { text: 'Fetch: HTTP client', link: 'https://fetch.leafphp.dev' },
      { text: 'Auth', link: 'https://auth.leafphp.dev' },
      { text: 'Db', link: 'https://db.leafphp.dev' },
      { text: 'Hana JS: frontend', link: 'https://hanabira.dev' },
    ],
  },
  {
    text: 'Resources',
    activeMatch: `^/(about|community)/`,
    items: [
      { text: 'Blog', link: 'https://blog.leafphp.dev' },
      { text: 'YouTube', link: 'https://www.youtube.com/channel/UCllE-GsYy10RkxBUK0HIffw' },
      { text: 'Discord', link: 'https://discord.gg/Pkrm9NJPE3' },
      { text: 'Contribute to Leaf', link: '/community/guide' },
      { text: 'Team', link: '/community/team' },
      { text: 'FAQ', link: '/community/faq' },
      { text: 'Generative AI policy', link: '/community/generative-ai' },
    ],
  },
  {
    text: 'Support Leaf',
    link: '/support/',
  },
];

export default nav;
