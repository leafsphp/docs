const sidebar = {
  codelabs: [
    {
      title: 'codelabs',
      collapsable: false,
      children: ['/codelabs/', '/codelabs/template'],
    },
  ],
  guide: [
    {
      title: 'Essentials',
      collapsable: false,
      children: ['/docs/introduction/', '/docs/introduction/features'],
    },
    {
      title: 'Quick Start',
      collapsable: false,
      children: [
        '/docs/introduction/installation',
        '/docs/migration/introduction',
        '/docs/introduction/url-rewriting',
        '/docs/introduction/first-app',
      ],
    },
    {
      title: 'Config',
      collapsable: false,
      children: ['/docs/config/', '/docs/config/nsm', '/docs/config/settings'],
    },
    {
      title: 'Core',
      collapsable: false,
      children: [
        '/modules/cors/',
        { title: 'HTTP', path: '/modules/http/' },
        '/docs/tooling/container',
        '/docs/tooling/logging',
        '/docs/tooling/view',
        '/docs/tooling/functions',
      ],
    },
    {
      title: 'Routing',
      collapsable: true,
      children: [
        '/docs/routing/',
        '/docs/routing/errors',
        '/docs/routing/sub-routing',
        '/docs/routing/dynamic',
        '/docs/routing/middleware',
        '/docs/routing/sub-patterns',
        '/docs/routing/sub-folder',
        '/docs/routing/controller',
      ],
    },
    {
      title: 'Modules',
      path: '/modules/',
    },
  ],
  aloe: [
    {
      title: 'Aloe CLI',
      collapsable: false,
      children: [
        { title: 'Home', path: '/aloe-cli/' },
        {
          title: 'Getting Started',
          path: '/aloe-cli/v/1.2.3/getting-started/',
        },
      ],
    },
    {
      title: 'Default Commands',
      collapsable: false,
      children: [
        {
          title: 'Misc Commands',
          path: '/aloe-cli/v/1.2.3/commands/misc-commands',
        },
        {
          title: '"Generate" Commands',
          path: '/aloe-cli/v/1.2.3/commands/g-commands',
        },
        {
          title: '"Delete" Commands',
          path: '/aloe-cli/v/1.2.3/commands/d-commands',
        },
        {
          title: '"DB" Commands',
          path: '/aloe-cli/v/1.2.3/commands/db-commands',
        },
      ],
    },
    {
      title: 'Aloe CLI',
      collapsable: false,
      children: [
        {
          title: 'Custom Commands',
          path: '/aloe-cli/v/1.2.3/commands/custom',
        },
        {
          title: 'Command IO',
          path: '/aloe-cli/v/1.2.3/commands/io',
        },
      ],
    },
    {
      title: 'Aloe Misc',
      collapsable: false,
      children: [
        { title: 'Aloe Libraries', path: '/aloe-cli/v/1.2.3/libraries' },
        '/aloe-cli/v/1.2.3/installer',
      ],
    },
  ],
  modules: [
    {
      title: 'Quick links',
      collapsable: false,
      children: [
        { title: 'Leaf Docs', path: '/docs/introduction/' },
        { title: 'Leaf API', path: 'https://api.leafphp.dev' },
        { title: 'Leaf MVC', path: 'https://mvc.leafphp.dev/' },
        { title: 'Skeleton', path: 'https://skeleton.leafphp.dev/' },
      ],
    },
    {
      title: 'Core',
      collapsable: true,
      children: [
        '/modules/',
        '/modules/anchor/',
        '/modules/anchor/csrf/',
        '/modules/forms/',
        {
          title: 'Leaf Forms',
          collapsable: true,
          children: [
            '/modules/forms/',
            '/modules/forms/v/1/',
            '/modules/forms/v/1.2/',
          ],
        },
        {
          title: 'Leaf Db',
          collapsable: true,
          children: [
            '/modules/db/',
            '/modules/db/v/1/',
            '/modules/db/v/2/new',
            '/modules/db/v/2/',
            '/modules/db/v/2/builder',
          ],
        },
        {
          title: 'Leaf Auth',
          collapsable: true,
          children: [
            '/modules/auth/',
            '/modules/auth/v/1/',
            '/modules/auth/v/2/',
            // '/modules/auth/v/2.1/v2.0-new',
            '/modules/auth/v/2.1/',
            '/modules/auth/v/2.1/config',
            '/modules/auth/v/2.1/methods',
            '/modules/auth/v/2.1/session',
          ],
        },
        {
          title: 'Http',
          collapsable: true,
          children: [
            '/modules/http/',
            '/modules/http/request',
            '/modules/http/response',
            '/modules/http/headers',
            '/modules/http/cache',
            '/modules/cors/',
            '/modules/session/',
            '/modules/session/flash',
            '/modules/cookies/',
          ],
        },
        {
          title: 'Router',
          collapsable: true,
          children: [
            '/modules/router/',
            '/modules/router/errors',
            '/modules/router/sub-routing',
            '/modules/router/dynamic',
            '/modules/router/middleware',
            '/modules/router/sub-patterns',
            '/modules/router/sub-folder',
            '/modules/router/controller',
          ],
        },
      ],
    },
    {
      title: 'Helpers',
      collapsable: true,
      children: [
        '/modules/date/',
        '/modules/fs/',
        '/aloe-cli/',
        '/modules/fetch/',
        '/modules/passwords/',
      ],
    },
    {
      title: 'Views',
      collapsable: true,
      children: [
        '/modules/views/',
        '/modules/views/bareui/',
        '/modules/views/blade/',
        '/modules/views/veins/',
      ],
    },
    {
      title: 'Extras',
      collapsable: true,
      children: [
        '/modules/mvc-core/',
        '/modules/mail/',
        '/modules/db-old/',
        '/modules/redis/',
      ],
    },
  ],
  contributing: [
    {
      title: 'Contribute to the Docs',
      collapsable: false,
      children: [
        '/community/contributing',
        '/docs/contributing/writing-guide',
        '/docs/contributing/doc-style-guide',
      ],
    },
  ],
  community: [
    {
      title: 'Community',
      collapsable: false,
      children: [
        '/community/history',
        '/community/faq',
        { title: 'Blog', path: 'https://blog.leafphp.dev' },
        '/community/team',
        '/community/join',
        '/coc/',
        '/community/contributing',
        '/support/',
        { title: 'Twitter', path: 'https://twitter.com/leafphp' },
        { title: 'Discord', path: 'https://discord.gg/Pkrm9NJPE3' },
        {
          title: 'YouTube',
          path: 'https://www.youtube.com/channel/UCllE-GsYy10RkxBUK0HIffw',
        },
      ],
    },
  ],
}

module.exports = {
  title: 'Leaf PHP',
  description: 'Leaf PHP - Simple and Elegant PHP',
  head: [
    [
      'link',
      {
        href: 'https://fonts.googleapis.com/css?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500|DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700|Inter:300,400,500,600|Open+Sans:400,600;display=swap',
        rel: 'stylesheet',
      },
    ],
    [
      'link',
      {
        href: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
        rel: 'stylesheet',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        href: '/logo-circle.png',
      },
    ],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    ],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        href: '/images/icons/apple-icon-152x152.png',
      },
    ],
    [
      'meta',
      {
        name: 'msapplication-TileImage',
        content: '/images/icons/ms-icon-144x144.png',
      },
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
    [
      'script',
      {
        src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js',
        type: 'module',
      },
    ],
    [
      'script',
      {
        src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js',
        nomodule: 'nomodule',
      },
    ],
    // [
    //   'script',
    //   {
    //     src: 'https://www.googletagmanager.com/gtag/js?id=UA-150463804-1',
    //     async: 'true'
    //   }
    // ]
  ],
  themeConfig: {
    logo: '/logo-circle.png',
    nav: [
      {
        text: 'Docs',
        ariaLabel: 'Documentation Menu',
        items: [
          {
            text: 'Guide',
            link: '/docs/introduction/',
          },
          {
            text: 'Contribute to Leaf',
            link: '/community/contributing',
          },
          {
            text: 'Contribute to docs',
            link: '/docs/contributing/writing-guide',
          },
          {
            text: 'Migration from Leaf 2',
            link: '/docs/migration/introduction',
          },
          {
            text: 'Codelabs',
            link: 'https://codelabs.leafphp.dev',
          },
        ],
      },
      {
        text: 'Ecosystem',
        items: [
          {
            text: 'Core Projects',
            items: [
              {
                text: 'Leaf Modules',
                link: '/modules/',
              },
              {
                text: 'Leaf MVC',
                link: 'https://mvc.leafphp.dev/',
              },
              {
                text: 'Leaf API',
                link: 'https://api.leafphp.dev/',
              },
              {
                text: 'Leaf Skeleton',
                link: 'https://skeleton.leafphp.dev/',
              },
            ],
          },
          {
            text: 'Tooling',
            ariaLabel: 'Tooling Menu',
            items: [
              {
                text: 'Aloe CLI',
                link: '/aloe-cli/',
              },
              {
                text: 'Leaf CLI',
                link: 'https://cli.leafphp.dev',
              },
              {
                text: 'Leaf UI',
                link: 'https://ui.leafphp.dev/',
              },
            ],
          },
        ],
      },
      {
        text: 'Community',
        items: [
          {
            text: 'Community',
            ariaLabel: 'Community Menu',
            items: [
              {
                text: 'Blog',
                link: 'https://blog.leafphp.dev',
              },
              {
                text: 'Team',
                link: '/community/team/',
              },
              {
                text: 'Join',
                link: '/community/join/',
              },
              {
                text: 'FAQ',
                link: '/community/faq/',
              },
            ],
          },
          {
            text: 'Help',
            ariaLabel: 'Help Menu',
            items: [
              {
                text: 'Leaf Forum',
                link: 'https://github.com/leafsphp/leaf/discussions/57',
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
    ],
    repo: 'leafsphp/docs',
    editLinks: true,
    editLinkText: 'Edit this on GitHub!',
    lastUpdated: 'Last updated',
    docsDir: 'src',
    sidebarDepth: 2,
    sidebar: {
      collapsable: true,
      '/docs/contributing/': sidebar.contributing,
      '/modules/': sidebar.modules,
      '/docs/': sidebar.guide,
      '/community/': sidebar.guide,
      '/codelabs/': sidebar.codelabs,
      '/aloe-cli/': sidebar.aloe,
      '/community/': sidebar.community,
      '/coc/': sidebar.community,
      '/blog/': sidebar.community,
    },
    smoothScroll: true,
    algolia: {
      indexName: 'leafphp-v3',
      appId: '',
      apiKey: '',
    },
    topBanner: true,
  },
  plugins: {
    '@vuepress/google-analytics': {
      ga: 'UA-150463804-1',
    },
    '@vuepress/last-updated': {
      transformer(timestamp) {
        const date = new Date(timestamp)

        const digits = [
          date.getUTCFullYear(),
          date.getUTCMonth() + 1,
          date.getUTCDate(),
          date.getUTCHours(),
          date.getUTCMinutes(),
          date.getUTCSeconds(),
        ].map((num) => String(num).padStart(2, '0'))

        return '{0}-{1}-{2}, {3}:{4}:{5} UTC'.replace(
          /{(\d)}/g,
          (_, num) => digits[num]
        )
      },
    },
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: {
        '/': {
          message: 'New content is available.',
          buttonText: 'Refresh',
        },
      },
    },
    'vuepress-plugin-container': {
      type: 'info',
      before: (info) =>
        `<div class="custom-block info"><p class="custom-block-title">${info}</p>`,
      after: '</div>',
    },
    markdown: {
      lineNumbers: true,
      /** @param {import('markdown-it')} md */
      extendMarkdown: (md) => {
        md.options.highlight = require('./markdown/highlight')(
          md.options.highlight
        )
      },
    },
  },
}
