import fs from 'fs'
import path from 'path'
import { defineConfigWithTheme } from 'vitepress'
import type { Config as ThemeConfig } from '@leafphp/docs-theme'
import baseConfig from '@leafphp/docs-theme/config'
import { headerPlugin } from './headerMdPlugin'

const nav = [
  {
    text: 'Docs',
    activeMatch: `^/(docs|style-guide|examples|tutorial)/`,
    items: [
      { text: 'Guide', link: '/docs/introduction/' },
      { text: 'Tutorial', link: '/tutorial/' },
      { text: 'Online Playground', link: 'https://sandbox.leafphp.dev/' },
      {
        text: 'Leaf Modules',
        link: '/modules/'
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
        text: 'Leaf 2 Docs',
        link: 'https://archive.leafphp.dev'
      }
    ]
  },
  {
    text: 'Ecosystem',
    activeMatch: `^/ecosystem/`,
    items: [
      {
        text: 'Core Projects',
        items: [
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
            link: '/docs/cli/'
          },
          {
            text: 'Leaf UI',
            link: 'https://ui.leafphp.dev/'
          }
        ]
      },
      {
        text: 'Resources',
        ariaLabel: 'Resources Menu',
        items: [
          {
            text: 'Project Showcase',
            link: '/ecosystem/showcase'
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
            text: 'Contribute to Leaf',
            link: '/community/contributing/'
          },
          {
            text: 'Contribute to docs',
            link: '/community/contributing/writing-guide'
          },
          {
            text: 'Blog',
            link: 'https://blog.leafphp.dev'
          },
          {
            text: 'Events',
            link: '/events/'
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
            link: 'https://github.com/leafsphp/leaf/discussions/37'
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
    collapsible: true,
    collapsed: true,
    items: [
      { text: 'Introduction', link: '/docs/introduction/' },
      { text: 'Why Leaf?', link: '/docs/introduction/why' },
      { text: 'Leaf + MVC', link: '/docs/mvc/' }
    ]
  },
  {
    text: 'Quick Start',
    collapsible: true,
    collapsed: true,
    items: [
      { text: 'Installation', link: '/docs/introduction/installation' },
      { text: 'Using Docker', link: '/docs/introduction/docker' },
      { text: 'Migration Guide', link: '/docs/migration/introduction' },
      { text: 'Leaf Devtools', link: '/modules/devtools/' }
    ]
  },
  {
    text: 'Introduction',
    collapsible: true,
    collapsed: true,
    items: [
      { text: 'URL Rewriting', link: '/docs/introduction/url-rewriting' },
      { text: 'Leaf tutorial', link: '/tutorial/' },
      { text: 'Your first app', link: '/docs/introduction/first-app' },
      { text: 'Functional Mode', link: '/docs/tooling/functions' },
      { text: 'Modules', link: '/modules/' },
      { text: 'Leaf CLI', link: '/docs/cli/' },
      { text: 'Deployment', link: '/docs/tooling/deployment' },
      { text: 'Testing', link: '/docs/tooling/testing' }
    ]
  },
  {
    text: 'Config',
    collapsible: true,
    collapsed: true,
    items: [
      { text: 'Overview', link: '/docs/config/' },
      { text: 'Instance and Mode', link: '/docs/config/nsm' },
      { text: 'App settings', link: '/docs/config/settings' },
      { text: 'Dependency Injection', link: '/docs/tooling/container' }
    ]
  },
  {
    text: 'The basics',
    collapsible: true,
    collapsed: true,
    items: [
      { text: 'Request', link: '/modules/http/v/2/request' },
      { text: 'Response', link: '/modules/http/v/2/response' },
      { text: 'Headers', link: '/modules/http/v/2/headers' },
      { text: 'CORS', link: '/modules/cors/' },
      { text: 'Session', link: '/modules/session/' },
      { text: 'Session Flash', link: '/modules/session/flash' },
      { text: 'Cookies', link: '/modules/cookies/' },
      { text: 'Leaf View', link: '/docs/tooling/view' },
      { text: 'Middleware', link: '/docs/routing/middleware' },
      { text: 'Error Handling', link: '/docs/routing/errors' }
    ]
  },
  {
    text: 'Routing',
    collapsible: true,
    collapsed: true,
    items: [
      { text: 'Basic Routing', link: '/docs/routing/' },
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
    text: 'Database',
    collapsible: true,
    collapsed: true,
    items: [
      { text: 'Introduction', link: '/modules/db/' },
      { text: 'Query Builder', link: '/modules/db/v/2/builder' },
      { text: 'Leaf Redis', link: '/modules/redis/' }
    ]
  },
  {
    text: 'Authentication',
    collapsible: true,
    collapsed: true,
    items: [
      { text: 'Introduction', link: '/modules/auth/' },
      { text: 'Auth Config', link: '/modules/auth/config' },
      { text: 'User Login', link: '/modules/auth/login' },
      { text: 'User Sign Up', link: '/modules/auth/signup' },
      {
        text: 'Protecting your Routes',
        link: '/modules/auth/protecting-your-routes'
      },
      { text: 'Updating logged-in user', link: '/modules/auth/update' },
      { text: 'Session Support', link: '/modules/auth/session' },
      { text: 'Helper methods', link: '/modules/auth/helpers' }
    ]
  },
  {
    text: 'Utilities',
    collapsible: true,
    collapsed: true,
    items: [
      { text: 'Leaf Forms', link: '/modules/forms/v/1.2/' },
      { text: 'Leaf Password', link: '/modules/password/' },
      { text: 'Leaf Anchor', link: '/modules/anchor/' },
      { text: 'Leaf Date', link: '/modules/date/' },
      { text: 'Leaf Fetch', link: '/modules/fetch/' },
      { text: 'Logging', link: '/docs/tooling/logging' }
    ]
  },
  {
    text: 'Digging Deeper',
    collapsible: true,
    collapsed: true,
    items: [
      { text: 'CSRF', link: '/modules/anchor/csrf/' },
      { text: 'HTTP Cache', link: '/modules/http/v/2/cache' },
      { text: 'Eien Server', link: '/modules/eien/' },
      { text: 'Leaf Mail', link: '/modules/mail/' },
      { text: 'File System', link: '/modules/fs/' },
      // { text: 'Queues/Jobs', link: '/modules/queues/' },
    ]
  },
  {
    text: 'Frontend',
    collapsible: true,
    collapsed: true,
    items: [
      { text: 'Introduction', link: '/modules/views/' },
      { text: 'Bare UI', link: '/modules/views/bareui/' },
      { text: 'Leaf Blade', link: '/modules/views/blade/' },
      { text: 'Leaf Veins', link: '/modules/views/veins/' },
      { text: 'Viewi PHP', link: '/modules/views/viewi/' },
      { text: 'Leaf UI', link: '/modules/views/leaf-ui/' }
    ]
  },
  {
    text: 'MVC Integrations',
    collapsible: true,
    collapsed: true,
    items: [
      { text: 'Leaf MVC', link: '/docs/leafmvc/' },
      { text: 'Leaf API', link: '/docs/leafapi/' },
      { text: 'Skeleton', link: '/docs/skeleton/' },
      { text: 'MVC Config', link: '/docs/mvc/config' },
      { text: 'MVC Routing', link: '/docs/mvc/routing' },
      { text: 'Controllers', link: '/docs/mvc/controllers' },
      { text: 'Views', link: '/docs/mvc/views' },
      { text: 'Models', link: '/docs/mvc/models' },
      { text: 'Migrations', link: '/docs/mvc/migrations' },
      { text: 'Seeders', link: '/docs/mvc/seeds' },
      { text: 'Factories', link: '/modules/mvc-core/factories' },
      // { text: 'MVC Console Tool', link: '/docs/mvc/console' },
      { text: 'Aloe CLI', link: '/aloe-cli/' },
      { text: 'MVC Core', link: '/modules/mvc-core/' }
    ]
  }
  // {
  //   text: 'Archive',
  //   collapsible: true,
  //   collapsed: true,
  //   items: [
  //     { text: 'Leaf Http', link: '/modules/http/' },
  //     { text: 'Leaf Http v1', link: '/modules/http/v/1/' }
  //   ]
  // }
]

const communitySidebar = [
  {
    text: 'Community',
    collapsible: true,
    items: [
      { text: 'History', link: '/community/history' },
      { text: 'FAQ', link: '/community/faq' },
      { text: 'Blog', link: 'https://blog.leafphp.dev' },
      { text: 'Meet the Team', link: '/community/team' },
      { text: 'Our Community', link: '/community/join' },
      { text: 'Code of Conduct', link: '/coc/' },
      { text: 'Contribution Guide', link: '/community/contributing/' },
      {
        text: 'Writing Guide',
        link: '/community/contributing/writing-guide'
      },
      { text: 'Support Leaf', link: '/support/' },
      { text: 'Twitter', link: 'https://twitter.com/leafphp' },
      { text: 'Discord', link: 'https://discord.gg/Pkrm9NJPE3' },
      {
        text: 'YouTube',
        link: 'https://www.youtube.com/channel/UCllE-GsYy10RkxBUK0HIffw'
      }
    ]
  }
]

export const sidebar = {
  '/docs/': mainSidebar,
  '/modules/': mainSidebar,
  '/aloe-cli/': [
    {
      text: 'Aloe CLI',
      collapsible: true,
      items: [
        { text: 'Home', link: '/aloe-cli/' },
        {
          text: 'Getting Started',
          link: '/aloe-cli/v/1.2.3/getting-started/'
        }
      ]
    },
    {
      text: 'Default Commands',
      collapsible: true,
      items: [
        {
          text: 'Misc Commands',
          link: '/aloe-cli/v/1.2.3/commands/misc-commands'
        },
        {
          text: '"Generate" Commands',
          link: '/aloe-cli/v/1.2.3/commands/g-commands'
        },
        {
          text: '"Delete" Commands',
          link: '/aloe-cli/v/1.2.3/commands/d-commands'
        },
        {
          text: '"DB" Commands',
          link: '/aloe-cli/v/1.2.3/commands/db-commands'
        }
      ]
    },
    {
      text: 'Aloe CLI',
      collapsible: true,
      items: [
        {
          text: 'Custom Commands',
          link: '/aloe-cli/v/1.2.3/commands/custom'
        },
        {
          text: 'Command IO',
          link: '/aloe-cli/v/1.2.3/commands/io'
        }
      ]
    },
    {
      text: 'Aloe Misc',
      collapsible: true,
      items: [
        { text: 'Aloe Libraries', link: '/aloe-cli/v/1.2.3/libraries' },
        { text: 'Aloe Installer', link: '/aloe-cli/v/1.2.3/installer' }
      ]
    }
  ],
  '/community/': communitySidebar,
  '/coc/': communitySidebar,
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
      'meta',
      {
        name: 'og:image',
        content:
          'https://repository-images.githubusercontent.com/214705101/0ff19323-d2c5-46f5-a582-0b1f3a6eabcc'
      }
    ],
    [
      'link',
      {
        rel: 'preload',
        as: 'style',
        href: '/global.css'
      }
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: '/global.css'
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
    [
      'meta',
      {
        name: 'background_color',
        content: '#001e26'
      }
    ],
    [
      'meta',
      {
        name: 'theme-color',
        content: '#001e26'
      }
    ],
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
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
        rel: 'stylesheet'
      }
    ],
    [
      'link',
      {
        href: 'https://fonts.googleapis.com/css?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500|DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700|Inter:300,400,500,600|Open+Sans:400,600;display=swap',
        rel: 'stylesheet'
      }
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
        async: '',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-QGZVHHLK12'
      }
    ],
    [
      'script',
      {},
      `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-QGZVHHLK12');
      `
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
      appId: 'Q38TT8XUN9',
      indexName: 'leafphp',
      apiKey: '87b4b8d90960f7a326dfd4c8781a5a74',
    },

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
      repo: 'leafsphp/docs#master',
      text: 'Edit this page on GitHub'
    },

    footer: {
      license: {
        text: 'MIT License',
        link: 'https://github.com/leafsphp/leaf/blob/v3.x/LICENSE'
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
      exclude: ['@vue/repl', '@leafphp/docs-theme']
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
