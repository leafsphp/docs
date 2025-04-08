import { HeadConfig } from 'vitepress';

const head: HeadConfig[] = [
  [
    'meta',
    {
      name: 'robots',
      content: 'index, follow',
    },
  ],
  [
    'meta',
    {
      name: 'description',
      content:
        'Leaf is a lightweight and elegant PHP framework built for makers. With zero-config setup and an ecosystem of powerful tools, Leaf helps you build and ship scalable apps—fast',
    },
  ],
  ['meta', { name: 'twitter:site', content: '@leafphp' }],
  ['meta', { name: 'twitter:url', content: 'https://leafphp.dev' }],
  ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  [
    'meta',
    {
      name: 'twitter:title',
      content: 'Leaf PHP - Elegant PHP, Built for Makers',
    },
  ],
  [
    'meta',
    {
      name: 'twitter:description',
      content:
        'Leaf is a lightweight and elegant PHP framework built for makers. With zero-config setup and an ecosystem of powerful tools, Leaf helps you build and ship scalable apps—fast',
    },
  ],
  [
    'meta',
    {
      name: 'twitter:image',
      content:
        'https://repository-images.githubusercontent.com/214705101/0ff19323-d2c5-46f5-a582-0b1f3a6eabcc',
    },
  ],
  [
    'meta',
    {
      name: 'og:title',
      content: 'Leaf PHP - Elegant PHP, Built for Makers',
    },
  ],
  [
    'meta',
    {
      name: 'og:type',
      content: 'website',
    },
  ],
  [
    'meta',
    {
      name: 'og:url',
      content: 'https://leafphp.dev',
    },
  ],
  [
    'meta',
    {
      name: 'og:image',
      content:
        'https://repository-images.githubusercontent.com/214705101/0ff19323-d2c5-46f5-a582-0b1f3a6eabcc',
    },
  ],
  [
    'meta',
    {
      name: 'og:description',
      content:
        'Leaf is a lightweight and elegant PHP framework built for makers. With zero-config setup and an ecosystem of powerful tools, Leaf helps you build and ship scalable apps—fast',
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
  [
    'meta',
    {
      name: 'background_color',
      content: '#001e26',
    },
  ],
  [
    'meta',
    {
      name: 'theme-color',
      content: '#001e26',
    },
  ],
  ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
  [
    'meta',
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    },
  ],
  ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
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
    'link',
    {
      href: 'https://fonts.googleapis.com',
      rel: 'preconnect',
    },
  ],
  [
    'link',
    {
      href: 'https://fonts.gstatic.com',
      rel: 'preconnect',
      crossorigin: '',
    },
  ],
  [
    'link',
    {
      href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap',
      rel: 'stylesheet',
    },
  ],
  [
    'script',
    {
      async: '',
      src: 'https://static.elfsight.com/platform/platform.js',
    },
  ],
  [
    'script',
    {},
    fs.readFileSync(
      path.resolve(__dirname, './inlined-scripts/restorePreference.js'),
      'utf-8'
    ),
  ],
  [
    'script',
    {
      async: '',
      src: 'https://www.googletagmanager.com/gtag/js?id=G-QGZVHHLK12',
    },
  ],
  [
    'script',
    {},
    `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-QGZVHHLK12');
      `,
  ],
];

export default head;
