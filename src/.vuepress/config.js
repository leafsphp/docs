const sidebar = {
  cookbook: [
    {
      title: 'Cookbook',
      collapsable: false,
      children: [
        '/cookbook/',
        '/cookbook/editable-svg-icons',
        '/cookbook/debugging-in-vscode',
        '/cookbook/automatic-global-registration-of-base-components'
      ]
    }
  ],
  guide: [
    {
      title: 'Essentials',
      collapsable: false,
      children: [
        '/docs/installation',
        '/docs/introduction',
        '/docs/instance',
        '/docs/template-syntax',
        '/docs/data-methods',
        '/docs/computed',
        '/docs/class-and-style',
        '/docs/conditional',
        '/docs/list',
        '/docs/events',
        '/docs/forms',
        '/docs/component-basics'
      ]
    },
    {
      title: 'Components In-Depth',
      collapsable: false,
      children: [
        '/docs/component-registration',
        '/docs/component-props',
        '/docs/component-attrs',
        '/docs/component-custom-events',
        '/docs/component-slots',
        '/docs/component-provide-inject',
        '/docs/component-dynamic-async',
        '/docs/component-template-refs',
        '/docs/component-edge-cases'
      ]
    },
    {
      title: 'Transitions & Animation',
      collapsable: false,
      children: [
        '/docs/transitions-overview',
        '/docs/transitions-enterleave',
        '/docs/transitions-list',
        '/docs/transitions-state'
      ]
    },
    {
      title: 'Reusability & Composition',
      collapsable: false,
      children: [
        {
          title: 'Composition API',
          children: [
            '/docs/composition-api-introduction',
            '/docs/composition-api-setup',
            '/docs/composition-api-lifecycle-hooks',
            '/docs/composition-api-provide-inject',
            '/docs/composition-api-template-refs'
          ]
        },
        '/docs/mixins',
        '/docs/custom-directive',
        '/docs/teleport',
        '/docs/render-function',
        '/docs/plugins'
      ]
    },
    {
      title: 'Advanced Guides',
      collapsable: false,
      children: [
        '/docs/web-components',
        {
          title: 'Reactivity',
          children: [
            '/docs/reactivity',
            '/docs/reactivity-fundamentals',
            '/docs/reactivity-computed-watchers'
          ]
        },
        '/docs/optimizations',
        '/docs/change-detection'
      ]
    },
    {
      title: 'Tooling',
      collapsable: false,
      children: [
        '/docs/single-file-component',
        '/docs/testing',
        '/docs/typescript-support',
        '/docs/mobile',
        '/docs/tooling/deployment'
      ]
    },
    {
      title: 'Scaling Up',
      collapsable: false,
      children: [
        '/docs/routing',
        '/docs/state-management',
        '/docs/ssr',
        '/docs/security'
      ]
    },
    {
      title: 'Accessibility',
      collapsable: false,
      children: [
        '/docs/a11y-basics',
        '/docs/a11y-semantics',
        '/docs/a11y-standards',
        '/docs/a11y-resources'
      ]
    }
  ],
  api: [
    '/api/application-config',
    '/api/application-api',
    '/api/global-api',
    {
      title: 'Options',
      path: '/api/options-api',
      collapsable: false,
      children: [
        '/api/options-data',
        '/api/options-dom',
        '/api/options-lifecycle-hooks',
        '/api/options-assets',
        '/api/options-composition',
        '/api/options-misc'
      ]
    },
    '/api/instance-properties',
    '/api/instance-methods',
    '/api/directives',
    '/api/special-attributes',
    '/api/built-in-components.md',
    {
      title: 'Reactivity API',
      path: '/api/reactivity-api',
      collapsable: false,
      children: [
        '/api/basic-reactivity',
        '/api/refs-api',
        '/api/computed-watch-api',
        '/api/effect-scope',
      ]
    },
    '/api/composition-api',
    {
      title: 'Single File Components',
      collapsable: false,
      children: [
        {
          title: 'Spec',
          path: '/api/sfc-spec'
        },
        {
          title: 'Tooling',
          path: '/api/sfc-tooling'
        },
        {
          title: '<script setup>',
          path: '/api/sfc-script-setup'
        },
        {
          title: '<style> Features',
          path: '/api/sfc-style'
        }
      ]
    }
  ],
  examples: [
    {
      title: 'Examples',
      collapsable: false,
      children: [
        '/examples/markdown',
        '/examples/commits',
        '/examples/grid-component',
        '/examples/tree-view',
        '/examples/svg',
        '/examples/modal',
        '/examples/elastic-header',
        '/examples/select2',
        '/examples/todomvc'
      ]
    }
  ],
  migration: [
    '/docs/migration/introduction',
    '/docs/migration/migration-build',
    {
      title: 'Details',
      collapsable: false,
      children: [
        '/docs/migration/array-refs',
        '/docs/migration/async-components',
        '/docs/migration/attribute-coercion',
        '/docs/migration/attrs-includes-class-style',
        '/docs/migration/children',
        '/docs/migration/custom-directives',
        '/docs/migration/custom-elements-interop',
        '/docs/migration/data-option',
        '/docs/migration/emits-option',
        '/docs/migration/events-api',
        '/docs/migration/filters',
        '/docs/migration/fragments',
        '/docs/migration/functional-components',
        '/docs/migration/global-api',
        '/docs/migration/global-api-treeshaking',
        '/docs/migration/inline-template-attribute',
        '/docs/migration/key-attribute',
        '/docs/migration/keycode-modifiers',
        '/docs/migration/listeners-removed',
        '/docs/migration/mount-changes',
        '/docs/migration/props-data',
        '/docs/migration/props-default-this',
        '/docs/migration/render-function-api',
        '/docs/migration/slots-unification',
        '/docs/migration/suspense',
        '/docs/migration/transition',
        '/docs/migration/transition-as-root',
        '/docs/migration/transition-group',
        '/docs/migration/v-on-native-modifier-removed',
        '/docs/migration/v-model',
        '/docs/migration/v-if-v-for',
        '/docs/migration/v-bind',
        '/docs/migration/vnode-lifecycle-events',
        '/docs/migration/watch'
      ]
    }
  ],
  ssr: [
    ['/docs/ssr/introduction', 'Introduction'],
    '/docs/ssr/getting-started',
    '/docs/ssr/universal',
    '/docs/ssr/structure',
    '/docs/ssr/build-config',
    '/docs/ssr/server',
    '/docs/ssr/routing',
    '/docs/ssr/hydration'
  ],
  contributing: [
    {
      title: 'Contribute to the Docs',
      collapsable: false,
      children: [
        '/docs/contributing/writing-guide',
        '/docs/contributing/doc-style-guide',
        '/docs/contributing/translations'
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
            link: '/docs/introduction'
          },
          {
            text: 'Style Guide',
            link: '/style-guide/'
          },
          {
            text: 'Cookbook',
            link: '/cookbook/'
          },
          {
            text: 'Examples',
            link: '/examples/markdown'
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
                text: 'Partners',
                link: '/community/partners'
              },
              {
                text: 'Join',
                link: '/community/join/'
              },
              {
                text: 'Themes',
                link: '/community/themes/'
              }
            ]
          },
          {
            text: 'Official Projects',
            items: [
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
      // {
      //   text: 'Translations',
      //   link: '#',
      //   items: [
      //     // Translation maintainers: Please include the link below to the English documentation
      //     // {
      //     //   text: 'English',
      //     //   link: 'https://v3.leafphp.org/',
      //     //   isTranslation: true
      //     // },
      //     {
      //       text: '中文',
      //       link: 'https://v3.cn.leafphp.org/',
      //       isTranslation: true
      //     },
      //     {
      //       text: '한국어',
      //       link: 'https://v3.ko.leafphp.org/',
      //       isTranslation: true
      //     },
      //     {
      //       text: '日本語',
      //       link: 'https://v3.ja.leafphp.org/',
      //       isTranslation: true
      //     },
      //     {
      //       text: 'Русский',
      //       link: 'https://v3.ru.leafphp.org/ru/',
      //       isTranslation: true
      //     },
      //     {
      //       text: 'More Translations',
      //       link: '/docs/contributing/translations#community-translations'
      //     }
      //   ]
      // }
    ],
    repo: 'leafsphp/docs',
    editLinks: true,
    editLinkText: 'Edit this on GitHub!',
    lastUpdated: 'Last updated',
    docsDir: 'src',
    sidebarDepth: 2,
    sidebar: {
      collapsable: false,
      '/docs/migration/': sidebar.migration,
      '/docs/contributing/': sidebar.contributing,
      '/docs/ssr/': sidebar.ssr,
      '/docs/': sidebar.guide,
      '/community/': sidebar.guide,
      '/cookbook/': sidebar.cookbook,
      '/api/': sidebar.api,
      '/examples/': sidebar.examples
    },
    smoothScroll: false,
    algolia: {
      indexName: 'leafphp-v3',
      appId: '',
      apiKey: ''
    },
    topBanner: false
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
