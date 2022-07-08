import fs from 'fs'
import path from 'path'
import { defineConfigWithTheme } from 'vitepress'
import type { Config as ThemeConfig } from '@mychi/leaf-theme'
import baseConfig from '@mychi/leaf-theme/config'
import { headerPlugin } from './headerMdPlugin'

const nav = [
  {
    text: 'Docs',
    activeMatch: `^/(docs|style-guide|examples)/`,
    items: [
      { text: 'Guide', link: '/docs/introduction/' },
      // { text: 'Tutorial', link: '/tutorial/' },
      // { text: 'Examples', link: '/examples/' },
      // { text: 'Quick Start', link: '/guide/quick-start' },
      // { text: 'Style Guide', link: '/style-guide/' },
      {
        text: 'Contribute to Leaf',
        link: '/community/contributing'
      },
      {
        text: 'Contribute to docs',
        link: '/docs/contributing/writing-guide'
      },
      {
        text: 'Migration from Leaf 2',
        link: '/docs/migration/introduction'
      },
      {
        text: 'Codelabs',
        link: 'https://codelabs.leafphp.dev'
      },
      {
        text: 'Vue 2 Docs',
        link: 'https://v2.vuejs.org'
      },
      {
        text: 'Migration from Vue 2',
        link: 'https://v3-migration.vuejs.org/'
      }
    ]
  },
  // {
  //   text: 'API',
  //   activeMatch: `^/api/`,
  //   link: '/api/'
  // },
  // {
  //   text: 'Playground',
  //   link: 'https://sfc.vuejs.org'
  // },
  {
    text: 'Ecosystem',
    activeMatch: `^/ecosystem/`,
    items: [
      {
        text: 'Core Projects',
        items: [
          {
            text: 'Leaf Modules',
            link: '/modules/'
          },
          {
            text: 'Leaf MVC',
            link: 'https://mvc.leafphp.dev/'
          },
          {
            text: 'Leaf API',
            link: 'https://api.leafphp.dev/'
          },
          {
            text: 'Leaf Skeleton',
            link: 'https://skeleton.leafphp.dev/'
          }
        ]
      },
      {
        text: 'Tooling',
        ariaLabel: 'Tooling Menu',
        items: [
          {
            text: 'Aloe CLI',
            link: '/aloe-cli/'
          },
          {
            text: 'Leaf CLI',
            link: 'https://cli.leafphp.dev'
          },
          {
            text: 'Leaf UI',
            link: 'https://ui.leafphp.dev/'
          }
        ]
      }
    ]
  },
  {
    text: 'Community',
    activeMatch: `^/(about|community)/`,
    items: [
      {
        text: 'Community',
        ariaLabel: 'Community Menu',
        items: [
          {
            text: 'Blog',
            link: 'https://blog.leafphp.dev'
          },
          {
            text: 'Team',
            link: '/community/team'
          },
          {
            text: 'Join',
            link: '/community/join'
          },
          {
            text: 'FAQ',
            link: '/community/faq'
          }
        ]
      },
      {
        text: 'Help',
        ariaLabel: 'Help Menu',
        items: [
          {
            text: 'Leaf Forum',
            link: 'https://github.com/leafsphp/leaf/discussions/57'
          },
          {
            text: 'YouTube',
            link: 'https://www.youtube.com/channel/UCllE-GsYy10RkxBUK0HIffw'
          },
          {
            text: 'Discord',
            link: 'https://discord.gg/Pkrm9NJPE3'
          },
          {
            text: 'GitHub',
            link: 'https://github.com/leafsphp/leaf'
          }
        ]
      }
    ]
  },
  {
    text: 'Support Leaf',
    link: '/support/'
  }
  // {
  //   text: 'Partners',
  //   link: '/partners/',
  //   activeMatch: `^/partners/`
  // }
]

const mainSidebar = [
  {
    text: 'Essentials',
    items: [
      { text: 'Introduction', link: '/docs/introduction/' },
      { text: 'Features', link: '/docs/introduction/features' }
    ]
  },
  {
    text: 'Quick Start',
    items: [
      { text: 'Installation', link: '/docs/introduction/installation' },
      { text: 'Migration Guide', link: '/docs/migration/introduction' },
      { text: 'URL Rewriting', link: '/docs/introduction/url-rewriting' },
      { text: 'Your first app', link: '/docs/introduction/first-app' },
      { text: 'Functional Mode', link: '/docs/tooling/functions' }
    ]
  },
  {
    text: 'Config',
    items: [
      { text: 'Overview', link: '/docs/config/' },
      { text: 'Instance and Mode', link: '/docs/config/nsm' },
      { text: 'App settings', link: '/docs/config/settings' }
    ]
  },
  {
    text: 'Core',
    items: [
      { text: 'Request', link: '/modules/http/v/2/request' },
      { text: 'Response', link: '/modules/http/v/2/response' },
      { text: 'Headers', link: '/modules/http/v/2/headers' },
      { text: 'CORS', link: '/modules/cors/' },
      { text: 'Session', link: '/modules/session/' },
      { text: 'Container', link: '/docs/tooling/container' },
      { text: 'Logging', link: '/docs/tooling/logging' },
      { text: 'Leaf View', link: '/docs/tooling/view' },
      { text: 'Middleware', link: '/docs/routing/middleware' },
    ]
  },
  {
    text: 'Routing',
    items: [
      { text: 'Basic Routing', link: '/docs/routing/' },
      { text: 'Error Handling', link: '/docs/routing/errors' },
      { text: 'Sub routing', link: '/docs/routing/sub-routing' },
      { text: 'Dynamic routing', link: '/docs/routing/dynamic' },
      {
        text: 'Optional Route sub-patterns',
        link: '/docs/routing/sub-patterns'
      },
      { text: 'Subfolder support', link: '/docs/routing/sub-folder' },
      { text: 'Using controllers', link: '/docs/routing/controller' }
    ]
  },
  {
    text: 'Extras',
    items: [
      { text: 'Database', link: '/modules/cors/' },
      { text: 'Cookies', link: '/modules/http/v/2/request' },
      { text: 'Session Flash', link: '/modules/http/v/2/response' },
      { text: 'HTTP Cache', link: '/modules/http/v/2/cache' },
      { text: 'Leaf Forms', link: '/modules/forms/' },
      { text: 'Container', link: '/docs/tooling/container' },
      { text: 'Logging', link: '/docs/tooling/logging' },
      { text: 'Leaf View', link: '/docs/tooling/view' },
      { text: 'Functional Mode', link: '/docs/tooling/functions' }
    ]
  },
  {
    text: 'Modules',
    collapsible: true,
    collapsed: true,
    items: [
      { text: 'Introduction', link: '/modules/' },
      {
        text: 'Leaf Forms',
        link: '/modules/forms/'
      },
      {
        text: 'Leaf Db',
        link: '/modules/db/'
      },
      {
        text: 'Leaf Auth',
        link: '/modules/auth/'
      },
      {
        text: 'Leaf Http',
        link: '/modules/http/'
      },
      {
        text: 'Leaf Session',
        link: '/modules/session/'
      },
      {
        text: 'Leaf Flash',
        link: '/modules/session/flash'
      },
      {
        text: 'Leaf Cookies',
        link: '/modules/cookies/'
      },
      {
        text: 'Leaf Router',
        link: '/modules/router/'
      }
    ]
  }
]

export const sidebar = {
  '/docs/': mainSidebar,
  '/modules/': mainSidebar,
  '/api/': [
    {
      text: 'Global API',
      items: [
        { text: 'Application', link: '/api/application' },
        {
          text: 'General',
          link: '/api/general'
        }
      ]
    },
    {
      text: 'Composition API',
      items: [
        { text: 'setup()', link: '/api/composition-api-setup' },
        {
          text: 'Reactivity: Core',
          link: '/api/reactivity-core'
        },
        {
          text: 'Reactivity: Utilities',
          link: '/api/reactivity-utilities'
        },
        {
          text: 'Reactivity: Advanced',
          link: '/api/reactivity-advanced'
        },
        {
          text: 'Lifecycle Hooks',
          link: '/api/composition-api-lifecycle'
        },
        {
          text: 'Dependency Injection',
          link: '/api/composition-api-dependency-injection'
        }
      ]
    },
    {
      text: 'Options API',
      items: [
        { text: 'Options: State', link: '/api/options-state' },
        { text: 'Options: Rendering', link: '/api/options-rendering' },
        {
          text: 'Options: Lifecycle',
          link: '/api/options-lifecycle'
        },
        {
          text: 'Options: Composition',
          link: '/api/options-composition'
        },
        { text: 'Options: Misc', link: '/api/options-misc' },
        {
          text: 'Component Instance',
          link: '/api/component-instance'
        }
      ]
    },
    {
      text: 'Built-ins',
      items: [
        { text: 'Directives', link: '/api/built-in-directives' },
        { text: 'Components', link: '/api/built-in-components' },
        {
          text: 'Special Elements',
          link: '/api/built-in-special-elements'
        },
        {
          text: 'Special Attributes',
          link: '/api/built-in-special-attributes'
        }
      ]
    },
    {
      text: 'Single File Component',
      items: [
        { text: 'Syntax Specification', link: '/api/sfc-spec' },
        { text: '<script setup>', link: '/api/sfc-script-setup' },
        { text: 'CSS Features', link: '/api/sfc-css-features' }
      ]
    },
    {
      text: 'Advanced APIs',
      items: [
        { text: 'Render Function', link: '/api/render-function' },
        { text: 'Server-Side Rendering', link: '/api/ssr' },
        { text: 'TypeScript Utility Types', link: '/api/utility-types' },
        { text: 'Custom Renderer', link: '/api/custom-renderer' }
      ]
    }
  ],
  '/examples/': [
    {
      text: 'Basic',
      items: [
        {
          text: 'Hello World',
          link: '/examples/#hello-world'
        },
        {
          text: 'Handling User Input',
          link: '/examples/#handling-input'
        },
        {
          text: 'Attribute Bindings',
          link: '/examples/#attribute-bindings'
        },
        {
          text: 'Conditionals and Loops',
          link: '/examples/#conditionals-and-loops'
        },
        {
          text: 'Form Bindings',
          link: '/examples/#form-bindings'
        },
        {
          text: 'Simple Component',
          link: '/examples/#simple-component'
        }
      ]
    },
    {
      text: 'Practical',
      items: [
        {
          text: 'Markdown Editor',
          link: '/examples/#markdown'
        },
        {
          text: 'Fetching Data',
          link: '/examples/#fetching-data'
        },
        {
          text: 'Grid with Sort and Filter',
          link: '/examples/#grid'
        },
        {
          text: 'Tree View',
          link: '/examples/#tree'
        },
        {
          text: 'SVG Graph',
          link: '/examples/#svg'
        },
        {
          text: 'Modal with Transitions',
          link: '/examples/#modal'
        },
        {
          text: 'List with Transitions',
          link: '/examples/#list-transition'
        },
        {
          text: 'TodoMVC',
          link: '/examples/#todomvc'
        }
      ]
    },
    {
      // https://eugenkiss.github.io/7guis/
      text: '7 GUIs',
      items: [
        {
          text: 'Counter',
          link: '/examples/#counter'
        },
        {
          text: 'Temperature Converter',
          link: '/examples/#temperature-converter'
        },
        {
          text: 'Flight Booker',
          link: '/examples/#flight-booker'
        },
        {
          text: 'Timer',
          link: '/examples/#timer'
        },
        {
          text: 'CRUD',
          link: '/examples/#crud'
        },
        {
          text: 'Circle Drawer',
          link: '/examples/#circle-drawer'
        },
        {
          text: 'Cells',
          link: '/examples/#cells'
        }
      ]
    }
  ],
  '/style-guide/': [
    {
      text: 'Style Guide',
      items: [
        {
          text: 'Overview',
          link: '/style-guide/'
        },
        {
          text: 'A - Essential',
          link: '/style-guide/rules-essential'
        },
        {
          text: 'B - Strongly Recommended',
          link: '/style-guide/rules-strongly-recommended'
        },
        {
          text: 'C - Recommended',
          link: '/style-guide/rules-recommended'
        },
        {
          text: 'D - Use with Caution',
          link: '/style-guide/rules-use-with-caution'
        }
      ]
    }
  ]
}

export default defineConfigWithTheme<ThemeConfig>({
  logo: '/logo-circle.png',
  extends: baseConfig,
  lang: 'en-US',
  title: 'Leaf PHP',
  description: 'Leaf PHP - Simple and elegant PHP',
  srcDir: 'src',
  srcExclude: ['tutorial/**/description.md'],
  scrollOffset: 'header',

  head: [
    ['meta', { name: 'twitter:site', content: '@leafphp' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    [
      'meta',
      {
        name: 'twitter:image',
        content:
          'https://repository-images.githubusercontent.com/214705101/0ff19323-d2c5-46f5-a582-0b1f3a6eabcc'
      }
    ],
    [
      'link',
      {
        rel: 'preload',
        as: 'style',
        href: '/449.css'
      }
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: '/449.css'
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        href: '/logo-circle.png'
      }
    ],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0'
      }
    ],
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
      'link',
      {
        href: 'https://fonts.googleapis.com/css?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500|DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700|Inter:300,400,500,600|Open+Sans:400,600;display=swap',
        rel: 'stylesheet'
      }
    ],
    [
      'style',
      {},
      fs.readFileSync(
        path.resolve(__dirname, './inlined-scripts/global.css'),
        'utf-8'
      )
    ],
    [
      'script',
      {},
      fs.readFileSync(
        path.resolve(__dirname, './inlined-scripts/restorePreference.js'),
        'utf-8'
      )
    ],
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'XNOLWPLB',
        'data-spa': 'auto',
        defer: ''
      }
    ]
  ],

  themeConfig: {
    nav,
    sidebar,
    algolia: {
      indexName: 'leafphp',
      appId: 'Q38TT8XUN9',
      apiKey: '91fc50bf651a76ce68220f14e75e38f4'
      // searchParameters: {
      //   facetFilters: ['version:v3']
      // }
    },

    // carbonAds: {
    //   code: 'CEBDT27Y',
    //   placement: 'vuejsorg'
    // },

    socialLinks: [
      { icon: 'languages', link: '/translations/' },
      { icon: 'github', link: 'https://github.com/leafsphp/leaf' },
      { icon: 'twitter', link: 'https://twitter.com/leafphp' },
      { icon: 'discord', link: 'https://discord.gg/Pkrm9NJPE3' }
      // {
      //   icon: 'youtube',
      //   link: 'https://www.youtube.com/channel/UCllE-GsYy10RkxBUK0HIffw'
      // }
    ],

    editLink: {
      repo: 'leafsphp/docs',
      text: 'Edit this page on GitHub'
    },

    footer: {
      license: {
        text: 'MIT License',
        link: 'https://opensource.org/licenses/MIT'
      },
      copyright: `Copyright © 2019-${new Date().getFullYear()} Michael Darko-Duodu`
    }
  },

  markdown: {
    config(md) {
      md.use(headerPlugin)
    }
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    optimizeDeps: {
      include: ['gsap', 'dynamics.js'],
      exclude: ['@vue/repl', '@mychi/leaf-theme']
    },
    // @ts-ignore
    ssr: {
      external: ['@vue/repl']
    },
    server: {
      host: true,
      fs: {
        // for when developing with locally linked theme
        allow: ['../..']
      }
    },
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: Infinity
    },
    json: {
      stringify: true
    }
  },

  vue: {
    reactivityTransform: true
  }
})
