# Application Scaffolding <Badge>Leaf MVC Only</Badge>

<!-- markdownlint-disable no-inline-html -->

Leaf MVC scaffolding creates complete feature starting points: routes, controllers, models, schema files, views, and middleware that match your app setup. You run a command, then edit real files you own.

<div class="not-prose my-6 overflow-hidden rounded-none border border-black/10 bg-white dark:border-white/10 dark:bg-white/[0.02]">
  <div class="grid md:grid-cols-2">
    <div class="border-b border-black/10 dark:border-white/10 md:border-b-0 md:border-r">
      <div class="border-b border-black/10 px-5 py-3 font-mono text-[0.7rem] font-medium uppercase tracking-[0.08em] text-neutral-500 dark:border-white/10 dark:text-neutral-400">Commands</div>
      <div class="grid gap-1.5 p-5 font-mono text-[0.85rem] leading-relaxed text-neutral-800 dark:text-neutral-200">
        <div><span class="select-none text-neutral-400 dark:text-neutral-500">$ </span>leaf scaffold:auth</div>
        <div><span class="select-none text-neutral-400 dark:text-neutral-500">$ </span>leaf scaffold:blog</div>
        <div><span class="select-none text-neutral-400 dark:text-neutral-500">$ </span>leaf scaffold:landing-page</div>
        <div><span class="select-none text-neutral-400 dark:text-neutral-500">$ </span>leaf scaffold:waitlist</div>
        <div><span class="select-none text-neutral-400 dark:text-neutral-500">$ </span>leaf scaffold:contact</div>
        <div><span class="select-none text-neutral-400 dark:text-neutral-500">$ </span>leaf scaffold:mail</div>
        <div><span class="select-none text-neutral-400 dark:text-neutral-500">$ </span>leaf scaffold:legal</div>
        <div><span class="select-none text-neutral-400 dark:text-neutral-500">$ </span>leaf scaffold:ai</div>
        <div><span class="select-none text-neutral-400 dark:text-neutral-500">$ </span>leaf scaffold:shadcn</div>
        <div><span class="select-none text-neutral-400 dark:text-neutral-500">$ </span>leaf scaffold:subscriptions <span class="text-[0.72rem] text-neutral-400 dark:text-neutral-500">with leafs/billing</span></div>
      </div>
    </div>
    <div>
      <div class="border-b border-black/10 px-5 py-3 font-mono text-[0.7rem] font-medium uppercase tracking-[0.08em] text-neutral-500 dark:border-white/10 dark:text-neutral-400">scaffold:auth generates</div>
      <div class="grid gap-1.5 p-5 font-mono text-[0.8rem] leading-relaxed text-neutral-600 dark:text-neutral-400">
        <div>app/routes/_auth.php</div>
        <div>app/controllers/Auth/ <span class="text-neutral-400 dark:text-neutral-500">login, register, dashboard</span></div>
        <div>app/controllers/Profile/ <span class="text-neutral-400 dark:text-neutral-500">account, updates</span></div>
        <div>app/views/pages/auth/ <span class="text-neutral-400 dark:text-neutral-500">login, register</span></div>
        <div>app/views/pages/dashboard</div>
        <div>app/views/layouts + components</div>
        <div class="mt-2 border-t border-black/10 pt-3 text-[0.75rem] text-neutral-500 dark:border-white/10 dark:text-neutral-400">views match your setup: blade, react, vue, svelte, or api-only</div>
      </div>
    </div>
  </div>
</div>

## How scaffolding works

Scaffolds are meant to remove repetitive setup, not hide your code. You run a command, Leaf creates the feature files, and you keep full ownership of what was generated.

<div class="docs-paths docs-paths--four not-prose my-6">
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">01 / Server</span>
    <strong class="docs-path-title">Backend files</strong>
    <span class="docs-path-description">Controllers, routes, models, middleware, schema files, callbacks, service logic.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">02 / Interface</span>
    <strong class="docs-path-title">Frontend pieces</strong>
    <span class="docs-path-description">Views, pages, components, forms, dashboard screens, and layout starting points.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">03 / Structure</span>
    <strong class="docs-path-title">App conventions</strong>
    <span class="docs-path-description">Generated files land where Leaf MVC expects them, so the project stays predictable.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">04 / Context</span>
    <strong class="docs-path-title">AI context</strong>
    <span class="docs-path-description">Agents inspect the generated feature and sync its new structure into Leaf's shared project context.</span>
  </div>
</div>

If you are using Claude, Codex, or another assistant, you can ask it to scaffold a feature and then customize the generated files around your product requirements.

Every feature scaffold ships in Blade, React, Vue, and Svelte variants. Leaf detects which one to use from your app's Inertia setup, so scaffolding in a React app generates React pages without any extra flags. To pick a variant yourself, pass `--scaffold react`, `--scaffold vue`, `--scaffold svelte`, or `--scaffold default` for Blade.

## Authentication

Authentication with Leaf is powered by [Leaf Auth](/docs/auth/), which gives you login, registration, sessions, password hashing, user management, and route protection.

```bash:no-line-numbers
leaf scaffold:auth
```

<div class="docs-paths docs-paths--two not-prose my-6">
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">01 / Accounts</span>
    <strong class="docs-path-title">Backend</strong>
    <span class="docs-path-description">User model with its schema file, controllers for login, register, dashboard and account updates, and auth routes with protection middleware applied.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">02 / Screens</span>
    <strong class="docs-path-title">Frontend</strong>
    <span class="docs-path-description">Login, register, dashboard and profile views in your frontend setup. The full file list is in the panel at the top of this page.</span>
  </div>
</div>

This is automatically done for you if you choose to install the application starter during installation.

## Landing Page

Use the landing page scaffold when you want a polished starting point for your product homepage.

```bash:no-line-numbers
leaf scaffold:landing-page
```

<div class="docs-paths docs-paths--two not-prose my-6">
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">01 / Page</span>
    <strong class="docs-path-title">Homepage</strong>
    <span class="docs-path-description">A structured homepage layout with hero, feature and footer sections, styled with Tailwind in your frontend setup.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">02 / Customize</span>
    <strong class="docs-path-title">Leaf Zero components</strong>
    <span class="docs-path-description">Sections are built from Leaf Zero components, so they are easy to restyle and rearrange.</span>
  </div>
</div>

## Billing Subscription

Subscriptions are common in modern products, but the setup usually involves pricing UI, callbacks, webhooks, database state, and provider configuration. Leaf MVC can scaffold the shape for you.

```bash:no-line-numbers
leaf scaffold:subscriptions
```

It requires [Leaf Billing](/docs/utils/billing) to be installed.

<div class="docs-paths docs-paths--two not-prose my-6">
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">01 / Customer UI</span>
    <strong class="docs-path-title">Frontend</strong>
    <span class="docs-path-description">Pricing component and subscription UI in whatever frontend setup you are using.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">02 / Billing logic</span>
    <strong class="docs-path-title">Backend</strong>
    <span class="docs-path-description">Subscription controllers, cancellation flow, Stripe callbacks, routes, models, schema, config.</span>
  </div>
</div>

## Waitlists

Waitlists help you validate demand and collect emails before a product is fully open.

```bash:no-line-numbers
leaf scaffold:waitlist
```

<div class="docs-paths docs-paths--two not-prose my-6">
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">01 / Collection</span>
    <strong class="docs-path-title">Frontend</strong>
    <span class="docs-path-description">A waitlist component for collecting emails in your frontend setup.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">02 / Control</span>
    <strong class="docs-path-title">Backend</strong>
    <span class="docs-path-description">Models and schema files for email collection, middleware that restricts accidental access to your app, and waitlist invites as starting points.</span>
  </div>
</div>

## Blog <Badge text="New" type="tip" />

The blog scaffold gives you a markdown-powered blog: write posts as markdown files and Leaf renders them with your frontend setup.

```bash:no-line-numbers
leaf scaffold:blog
```

<div class="docs-paths docs-paths--two not-prose my-6">
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">01 / Writing</span>
    <strong class="docs-path-title">Markdown posts</strong>
    <span class="docs-path-description">A posts folder (app/blog) you publish to by dropping in markdown files with title, date and description frontmatter. Parsedown is installed for you.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">02 / Reading</span>
    <strong class="docs-path-title">Frontend</strong>
    <span class="docs-path-description">Blog index and post pages in your frontend setup, with controllers and routes for listing and reading posts.</span>
  </div>
</div>

## Contact form <Badge text="New" type="tip" />

A contact form that actually sends mail, wired end to end.

```bash:no-line-numbers
leaf scaffold:contact
```

<div class="docs-paths docs-paths--two not-prose my-6">
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">01 / Form</span>
    <strong class="docs-path-title">Frontend</strong>
    <span class="docs-path-description">A contact page in your frontend setup, with routes wired up and ready to restyle.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">02 / Delivery</span>
    <strong class="docs-path-title">Leaf Mail</strong>
    <span class="docs-path-description">A controller that validates submissions and sends the message with Leaf Mail, installed and configured for you if missing. CONTACT_EMAIL lands in your .env, with MAIL_SENDER_EMAIL as the fallback.</span>
  </div>
</div>

## Legal pages <Badge text="New" type="tip" />

Every product eventually needs them, and nobody enjoys writing them from a blank file.

```bash:no-line-numbers
leaf scaffold:legal
```

<div class="docs-paths docs-paths--two not-prose my-6">
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">01 / Pages</span>
    <strong class="docs-path-title">Frontend</strong>
    <span class="docs-path-description">Privacy policy and terms of service pages in your frontend setup, wired to your APP_NAME and CONTACT_EMAIL env values.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">02 / Editing</span>
    <strong class="docs-path-title">Your part</strong>
    <span class="docs-path-description">The copy has clearly marked EDIT ME sections, so you (or your lawyer) only fill in the product-specific parts.</span>
  </div>
</div>

## AI chat <Badge text="New" type="tip" />

Scaffold a streaming AI chat powered by Claude: a full chat page with streamed responses, not just an API call.

```bash:no-line-numbers
leaf scaffold:ai
```

<div class="docs-paths docs-paths--two not-prose my-6">
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">01 / Chat UI</span>
    <strong class="docs-path-title">Frontend</strong>
    <span class="docs-path-description">A chat interface in your frontend setup with streaming responses.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">02 / Server</span>
    <strong class="docs-path-title">Anthropic proxy</strong>
    <span class="docs-path-description">Routes that proxy to the Anthropic API. ANTHROPIC_API_KEY is added to your .env; drop your key in and visit /ai.</span>
  </div>
</div>

## Mail setup

Not a feature scaffold, but a shortcut: installs [Leaf Mail](/docs/utils/mail/) and generates your mail config in one step.

```bash:no-line-numbers
leaf scaffold:mail
```

## shadcn/ui <Badge text="New" type="tip" />

If you're pairing React with your Leaf app, this sets up [shadcn/ui](https://ui.shadcn.com/) so you can install any of its components:

```bash:no-line-numbers
leaf scaffold:shadcn
```

```bash:no-line-numbers
pnpm dlx shadcn@latest add switch
```

## AI-assisted scaffolding

Scaffolding pairs naturally with AI because the command gives your assistant a working feature shape to edit instead of asking it to invent every file from scratch.

```txt:no-line-numbers
Ask your assistant:
"Scaffold auth, then customize the dashboard for a SaaS admin."
```

Recommended workflow:

1. Run or ask your assistant to run the scaffold command.
2. Ask for the product-specific changes.
3. Review the generated routes, controllers, models, and views.

If the assistant cannot access the project folder, run `leaf context` after scaffolding and paste the compact output into your conversation.

## More coming soon

We are working on scaffolding for more features like:

- Admin panel
- API dashboard
- More product starters
