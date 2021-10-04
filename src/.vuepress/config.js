const sidebar = {
  codelabs: [
    {
      title: 'codelabs',
      collapsable: false,
      children: [
        '/codelabs/',
        '/codelabs/editable-svg-icons',
        '/codelabs/debugging-in-vscode',
        '/codelabs/automatic-global-registration-of-base-components'
      ]
    }
  ],
  guide: [
    {
      title: 'Essentials',
      collapsable: false,
      children: [
        '/docs/introduction/',
        '/docs/introduction/installation',
        '/docs/introduction/url-rewriting',
        '/docs/migration/introduction'
      ]
    },
    {
      title: 'Config',
      collapsable: false,
      children: ['/docs/config/', '/docs/config/nsm', '/docs/config/settings']
    },
    {
      title: 'Core',
      collapsable: false,
      children: [
        '/docs/tooling/container',
        '/docs/tooling/logging',
        '/docs/view',
        '/docs/tooling/functions'
      ]
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
        '/docs/routing/controller'
      ]
    },
    {
      title: 'Modules',
      collapsable: false,
      children: [
        '/docs/modules/',
        {
          title: 'Core',
          collapsable: true,
          children: [
            '/docs/modules/db/',
            '/docs/modules/db-old/',
            '/docs/modules/auth',
            '/docs/modules/date',
            '/docs/modules/forms',
            '/docs/modules/fs',
            '/docs/modules/logger',
            '/docs/modules/passwords'
          ]
        },
        {
          title: 'Http',
          collapsable: true,
          children: [
            '/docs/modules/http/',
            '/docs/modules/session/',
            '/docs/modules/cookies'
          ]
        },
        {
          title: 'Views',
          collapsable: true,
          children: [
            '/docs/modules/views/bareui',
            '/docs/modules/views/blade',
            '/docs/modules/views/veins'
          ]
        },
        {
          title: 'Extras',
          collapsable: true,
          children: ['/docs/modules/mvc-core/', '/docs/modules/mail']
        }
      ]
    }
  ],
  cli: [
    {
      title: 'Leaf CLI',
      collapsable: false,
      children: [
        '/cli/',
        '/cli/v/1.0/',
        '/cli/v/2.0/'
      ]
    }
  ],
  contributing: [
    {
      title: 'Contribute to the Docs',
      collapsable: false,
      children: [
        '/docs/contributing/writing-guide',
        '/docs/contributing/doc-style-guide'
      ]
    }
  ]
}

module.exports = {
  title: 'Leaf PHP',
  description: 'Leaf PHP - Simple and Elegant PHP',
  head: [
    [
      'link',
      {
        href:
          'https://fonts.googleapis.com/css?family=Inter:300,400,500,600|Open+Sans:400,600;display=swap',
        rel: 'stylesheet'
      }
    ],
    [
      'link',
      {
        href:
          'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
        rel: 'stylesheet'
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        href: '/logo-circle.png',
      }
    ],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }
    ],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        href: '/images/icons/apple-icon-152x152.png'
      }
    ],
    [
      'meta',
      {
        name: 'msapplication-TileImage',
        content: '/images/icons/ms-icon-144x144.png'
      }
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
    [
      'script',
      {
        src: 'https://player.vimeo.com/api/player.js'
      }
    ],
    [
      'script',
      {
        src: 'https://extend.vimeocdn.com/ga/72160148.js',
        defer: 'defer'
      }
    ]
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
            link: '/docs/introduction/'
          },
          {
            text: 'Codelabs',
            link: '/codelabs/'
          },
          {
            text: 'Contribute',
            link: '/docs/contributing/writing-guide'
          },
          {
            text: 'Migration from Leaf 2',
            link: '/docs/migration/introduction'
          }
        ]
      },
      {
        text: 'Ecosystem',
        items: [
          {
            text: 'Community',
            ariaLabel: 'Community Menu',
            items: [
              {
                text: 'Team',
                link: '/community/team/'
              },
              {
                text: 'Join',
                link: '/community/join/'
              },
            ]
          },
          {
            text: 'Official Projects',
            items: [
              {
                text: 'Leaf CLI',
                link: '/cli/'
              },
              {
                text: 'Leaf Modules',
                link: '/modules/'
              },
            ]
          }
        ]
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
      '/docs/': sidebar.guide,
      '/community/': sidebar.guide,
      '/codelabs/': sidebar.codelabs,
      '/cli/': sidebar.cli,
    },
    smoothScroll: true,
    algolia: {
      indexName: 'leafphp-v3',
      appId: '',
      apiKey: ''
    },
    topBanner: true,
  },
  plugins: [
    [
      '@vuepress/last-updated',
      {
        transformer(timestamp) {
          const date = new Date(timestamp)

          const digits = [
            date.getUTCFullYear(),
            date.getUTCMonth() + 1,
            date.getUTCDate(),
            date.getUTCHours(),
            date.getUTCMinutes(),
            date.getUTCSeconds()
          ].map(num => String(num).padStart(2, '0'))

          return '{0}-{1}-{2}, {3}:{4}:{5} UTC'.replace(
            /{(\d)}/g,
            (_, num) => digits[num]
          )
        }
      }
    ],
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: {
          '/': {
            message: 'New content is available.',
            buttonText: 'Refresh'
          }
        }
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'info',
        before: info =>
          `<div class="custom-block info"><p class="custom-block-title">${info}</p>`,
        after: '</div>'
      }
    ]
  ],
  markdown: {
    lineNumbers: true,
    /** @param {import('markdown-it')} md */
    extendMarkdown: md => {
      md.options.highlight = require('./markdown/highlight')(
        md.options.highlight
      )
    }
  }
}
