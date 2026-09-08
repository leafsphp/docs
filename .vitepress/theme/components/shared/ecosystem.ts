// Single source of truth for Leaf ecosystem products.
// Consumed by EcosystemCards (homepage/docs) and EcosystemMenu (top nav) so
// the two can never drift apart again.
export interface EcosystemProduct {
  name: string;
  url: string;
  tagline: string;
  description: string;
  /** Shorter copy for the compact nav dropdown; falls back to description. */
  menuDescription?: string;
  logo: string;
}

export const products: EcosystemProduct[] = [
  {
    name: 'Alchemy',
    url: 'https://alchemy.leafphp.dev',
    tagline: 'QA from one config',
    description: 'Tests, code style, refactors, static analysis + CI pipelines for any PHP app, described in one alchemy.yml.',
    menuDescription: 'Tests, code style, refactors and CI for any PHP app.',
    logo: 'https://alchemy.leafphp.dev/images/logo-yellow.png',
  },
  {
    name: 'Seedling',
    url: 'https://seedling.leafphp.dev',
    tagline: 'Console applications',
    description: 'A tiny framework for building CLI tools with the Leaf MVC experience: commands, prompts, and packaging.',
    menuDescription: 'Build CLI tools with the Leaf MVC experience.',
    logo: 'https://seedling.leafphp.dev/images/seedling.png',
  },
  {
    name: 'Fetch',
    url: 'https://fetch.leafphp.dev',
    tagline: 'HTTP client',
    description: 'fetch() for PHP. The request API you already know from JavaScript, in any PHP app, Leaf or not.',
    menuDescription: 'fetch() for PHP. Works in any PHP app, Leaf or not.',
    logo: 'https://fetch.leafphp.dev/images/fetch.png',
  },
  {
    name: 'Auth',
    url: 'https://auth.leafphp.dev',
    tagline: 'Authentication',
    description: 'Login, registration, roles, permissions and subscriptions for any PHP app. Sessions or JWT, one API.',
    menuDescription: 'Login, roles and permissions on your own database.',
    logo: 'https://leafphp.dev/logo-circle.png',
  },
  {
    name: 'Db',
    url: 'https://db.leafphp.dev',
    tagline: 'Database',
    description: 'Fluent queries and raw SQL without a heavy database layer. MariaDB, MySQL, Postgres, SQLite, SQL Server.',
    menuDescription: 'A query builder that reads like English.',
    logo: 'https://leafphp.dev/logo-circle.png',
  },
  {
    name: 'Kata',
    url: 'https://kata.leafphp.dev',
    tagline: 'Design systems for AI',
    description: 'Compile your design system into a language AI can build with, so generated UIs come out looking like yours.',
    menuDescription: 'Your design system, compiled for AI to build with.',
    logo: 'https://leafphp.dev/logo-circle.png',
  },
  {
    name: 'Hana JS',
    url: 'https://hanabira.dev',
    tagline: 'Frontend framework',
    description: 'Simple, lightweight React alternative for building user interfaces, from the same team.',
    menuDescription: 'Simple, lightweight React alternative.',
    logo: 'https://docs.hana.leafphp.dev/favicon.png',
  },
];
