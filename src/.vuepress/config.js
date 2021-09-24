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
        '/v3.x/docs/installation',
        '/v3.x/docs/introduction',
        '/v3.x/docs/instance',
        '/v3.x/docs/template-syntax',
        '/v3.x/docs/data-methods',
        '/v3.x/docs/computed',
        '/v3.x/docs/class-and-style',
        '/v3.x/docs/conditional',
        '/v3.x/docs/list',
        '/v3.x/docs/events',
        '/v3.x/docs/forms',
        '/v3.x/docs/component-basics'
      ]
    },
    {
      title: 'Components In-Depth',
      collapsable: false,
      children: [
        '/v3.x/docs/component-registration',
        '/v3.x/docs/component-props',
        '/v3.x/docs/component-attrs',
        '/v3.x/docs/component-custom-events',
        '/v3.x/docs/component-slots',
        '/v3.x/docs/component-provide-inject',
        '/v3.x/docs/component-dynamic-async',
        '/v3.x/docs/component-template-refs',
        '/v3.x/docs/component-edge-cases'
      ]
    },
    {
      title: 'Transitions & Animation',
      collapsable: false,
      children: [
        '/v3.x/docs/transitions-overview',
        '/v3.x/docs/transitions-enterleave',
        '/v3.x/docs/transitions-list',
        '/v3.x/docs/transitions-state'
      ]
    },
    {
      title: 'Reusability & Composition',
      collapsable: false,
      children: [
        {
          title: 'Composition API',
          children: [
            '/v3.x/docs/composition-api-introduction',
            '/v3.x/docs/composition-api-setup',
            '/v3.x/docs/composition-api-lifecycle-hooks',
            '/v3.x/docs/composition-api-provide-inject',
            '/v3.x/docs/composition-api-template-refs'
          ]
        },
        '/v3.x/docs/mixins',
        '/v3.x/docs/custom-directive',
        '/v3.x/docs/teleport',
        '/v3.x/docs/render-function',
        '/v3.x/docs/plugins'
      ]
    },
    {
      title: 'Advanced Guides',
      collapsable: false,
      children: [
        '/v3.x/docs/web-components',
        {
          title: 'Reactivity',
          children: [
            '/v3.x/docs/reactivity',
            '/v3.x/docs/reactivity-fundamentals',
            '/v3.x/docs/reactivity-computed-watchers'
          ]
        },
        '/v3.x/docs/optimizations',
        '/v3.x/docs/change-detection'
      ]
    },
    {
      title: 'Tooling',
      collapsable: false,
      children: [
        '/v3.x/docs/single-file-component',
        '/v3.x/docs/testing',
        '/v3.x/docs/typescript-support',
        '/v3.x/docs/mobile',
        '/v3.x/docs/tooling/deployment'
      ]
    },
    {
      title: 'Scaling Up',
      collapsable: false,
      children: [
        '/v3.x/docs/routing',
        '/v3.x/docs/state-management',
        '/v3.x/docs/ssr',
        '/v3.x/docs/security'
      ]
    },
    {
      title: 'Accessibility',
      collapsable: false,
      children: [
        '/v3.x/docs/a11y-basics',
        '/v3.x/docs/a11y-semantics',
        '/v3.x/docs/a11y-standards',
        '/v3.x/docs/a11y-resources'
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
    '/v3.x/docs/migration/introduction',
    '/v3.x/docs/migration/migration-build',
    {
      title: 'Details',
      collapsable: false,
      children: [
        '/v3.x/docs/migration/array-refs',
        '/v3.x/docs/migration/async-components',
        '/v3.x/docs/migration/attribute-coercion',
        '/v3.x/docs/migration/attrs-includes-class-style',
        '/v3.x/docs/migration/children',
        '/v3.x/docs/migration/custom-directives',
        '/v3.x/docs/migration/custom-elements-interop',
        '/v3.x/docs/migration/data-option',
        '/v3.x/docs/migration/emits-option',
        '/v3.x/docs/migration/events-api',
        '/v3.x/docs/migration/filters',
        '/v3.x/docs/migration/fragments',
        '/v3.x/docs/migration/functional-components',
        '/v3.x/docs/migration/global-api',
        '/v3.x/docs/migration/global-api-treeshaking',
        '/v3.x/docs/migration/inline-template-attribute',
        '/v3.x/docs/migration/key-attribute',
        '/v3.x/docs/migration/keycode-modifiers',
        '/v3.x/docs/migration/listeners-removed',
        '/v3.x/docs/migration/mount-changes',
        '/v3.x/docs/migration/props-data',
        '/v3.x/docs/migration/props-default-this',
        '/v3.x/docs/migration/render-function-api',
        '/v3.x/docs/migration/slots-unification',
        '/v3.x/docs/migration/suspense',
        '/v3.x/docs/migration/transition',
        '/v3.x/docs/migration/transition-as-root',
        '/v3.x/docs/migration/transition-group',
        '/v3.x/docs/migration/v-on-native-modifier-removed',
        '/v3.x/docs/migration/v-model',
        '/v3.x/docs/migration/v-if-v-for',
        '/v3.x/docs/migration/v-bind',
        '/v3.x/docs/migration/vnode-lifecycle-events',
        '/v3.x/docs/migration/watch'
      ]
    }
  ],
  ssr: [
    ['/v3.x/docs/ssr/introduction', 'Introduction'],
    '/v3.x/docs/ssr/getting-started',
    '/v3.x/docs/ssr/universal',
    '/v3.x/docs/ssr/structure',
    '/v3.x/docs/ssr/build-config',
    '/v3.x/docs/ssr/server',
    '/v3.x/docs/ssr/routing',
    '/v3.x/docs/ssr/hydration'
  ],
  contributing: [
    {
      title: 'Contribute to the Docs',
      collapsable: false,
      children: [
        '/v3.x/docs/contributing/writing-guide',
        '/v3.x/docs/contributing/doc-style-guide',
        '/v3.x/docs/contributing/translations'
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
            link: '/v3.x/docs/introduction'
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
            link: '/v3.x/docs/contributing/writing-guide'
          },
          {
            text: 'Migration from Leaf 2',
            link: '/v3.x/docs/migration/introduction'
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
        link: 'https://opencollective.com/leaf',
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
      //       link: '/v3.x/docs/contributing/translations#community-translations'
      //     }
      //   ]
      // }
    ],
    repo: 'leafsphp/v3.x/docs',
    editLinks: true,
    editLinkText: 'Edit this on GitHub!',
    lastUpdated: 'Last updated',
    docsDir: 'src',
    sidebarDepth: 2,
    sidebar: {
      collapsable: false,
      '/v3.x/docs/migration/': sidebar.migration,
      '/v3.x/docs/contributing/': sidebar.contributing,
      '/v3.x/docs/ssr/': sidebar.ssr,
      '/v3.x/docs/': sidebar.guide,
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
