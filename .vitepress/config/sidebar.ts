const sidebar = [
  {
    text: 'Quick Start',
    collapsible: true,
    collapsed: true,
    items: [
      { text: 'Introduction', link: '/docs/' },
      { text: 'Why Leaf?', link: '/docs/why' },
      { text: 'Installation', link: '/docs/installation' },
      { text: 'Using Docker', link: '/docs/docker' },
      { text: 'Migration Guide', link: '/docs/migrating' },
      { text: 'Leaf CLI', link: '/docs/cli/' },
    ],
  },
  {
    text: 'Introduction',
    collapsible: true,
    collapsed: true,
    items: [
      { text: 'Modules', link: '/docs/modules' },
      // { text: 'Functional Mode', link: '/docs/tooling/functions' },
      // { text: 'Leaf tutorial', link: '/tutorial/' },
      // { text: 'Your first app', link: '/docs/introduction/first-app' },
      // { text: 'Leaf Devtools', link: '/docs/devtools' },
      // { text: 'Testing', link: '/docs/tooling/testing' },
      // { text: 'Deployment', link: '/docs/deployment/' },
    ],
  },
];

export default sidebar;
