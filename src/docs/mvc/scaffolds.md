# Application Scaffolding <Badge>Leaf MVC Only</Badge>

<!-- markdownlint-disable no-inline-html -->

<div class="not-prose mt-6 overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.02]">
  <div class="grid 2xl:grid-cols-[1fr_320px]">
    <div class="border-b border-black/10 p-6 dark:border-white/10 md:p-8 2xl:border-b-0 2xl:border-r">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--vp-c-brand-1)]">Feature scaffolds</p>
      <div class="text-2xl font-semibold tracking-[-0.03em] text-neutral-950 dark:text-neutral-50 md:text-3xl">Generate the boring parts, then make the product yours.</div>
      <p class="!m-0 !mt-4 max-w-2xl text-base leading-7 text-neutral-600 dark:text-neutral-400">Leaf MVC scaffolding creates complete feature starting points: routes, controllers, models, schema files, views, middleware, and frontend pieces that match your app setup.</p>
      <div class="mt-6 overflow-hidden rounded-lg border border-black/10 bg-neutral-950 dark:border-white/10">
        <div class="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div class="flex items-center gap-2">
            <span class="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]"></span>
            <span class="h-2.5 w-2.5 rounded-full bg-[#ffd166]"></span>
            <span class="h-2.5 w-2.5 rounded-full bg-[#2dd4bf]"></span>
          </div>
          <span class="font-mono text-xs text-neutral-500">scaffold</span>
        </div>
        <div class="overflow-x-auto p-5 font-mono text-sm leading-7 text-neutral-100">
          <div><span class="text-neutral-500">$</span> leaf scaffold:auth</div>
          <div><span class="text-neutral-500">$</span> leaf scaffold:landing-page</div>
          <div><span class="text-neutral-500">$</span> leaf scaffold:subscriptions</div>
          <div><span class="text-neutral-500">$</span> leaf scaffold:waitlist</div>
        </div>
      </div>
    </div>
    <div class="bg-neutral-50 p-6 dark:bg-white/[0.03] md:p-8">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">What scaffolds give you</p>
      <div class="space-y-4 md:space-y-0 grid md:grid-cols-3 2xl:grid-cols-1 gap-3">
        <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">A real starting point</p>
          <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Not snippets. A working feature shape you can run, edit, and extend.</p>
        </div>
        <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">Your frontend setup</p>
          <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Views and components are generated around the frontend tooling your app uses.</p>
        </div>
        <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">AI-ready commands</p>
          <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Assistants can run the same commands and then tailor the result to your product.</p>
        </div>
      </div>
    </div>
  </div>
</div>

## How scaffolding works

Scaffolds are meant to remove repetitive setup, not hide your code. You run a command, Leaf creates the feature files, and you keep full ownership of what was generated.

<div class="not-prose my-6 grid gap-3 sm:grid-cols-2">
  <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
    <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">Backend files</p>
    <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Controllers, routes, models, middleware, schema files, callbacks, and service logic.</p>
  </div>
  <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
    <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">Frontend pieces</p>
    <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Views, pages, components, forms, dashboard screens, and layout starting points.</p>
  </div>
  <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
    <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">App conventions</p>
    <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Generated files land where Leaf MVC expects them, so the project stays predictable.</p>
  </div>
  <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
    <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">AI context</p>
    <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">After scaffolding, run <code>leaf context</code> so assistants understand the new feature map.</p>
  </div>
</div>

If you are using Claude, Codex, or another assistant, you can ask it to scaffold a feature and then customize the generated files around your product requirements.

## Authentication

Authentication with Leaf is powered by [Leaf Auth](/docs/auth/), which gives you login, registration, sessions, password hashing, user management, and route protection.

```bash:no-line-numbers
leaf scaffold:auth
```

<div class="not-prose my-6 overflow-hidden rounded-xl border border-black/10 bg-white dark:border-white/10 dark:bg-white/[0.02]">
  <div class="grid md:grid-cols-[220px_1fr]">
    <div class="border-b border-black/10 bg-neutral-50 p-5 dark:border-white/10 dark:bg-white/[0.03] md:border-b-0 md:border-r">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">Generated</p>
      <div class="font-mono text-sm leading-7 text-neutral-600 dark:text-neutral-400">models<br>controllers<br>routes<br>middleware<br>views</div>
    </div>
    <div class="p-5">
      <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">What you get</p>
      <ul class="m-0 mt-3 space-y-2 p-0 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
        <li class="list-none">User model with a database schema file</li>
        <li class="list-none">Login, register, dashboard, and account update controllers</li>
        <li class="list-none">Authentication routes and route protection middleware</li>
        <li class="list-none">Views and dashboard screens tailored to your frontend setup</li>
      </ul>
    </div>
  </div>
</div>

This is automatically done for you if you choose to install the application starter during installation.

## Landing Page

Use the landing page scaffold when you want a polished starting point for your product homepage.

```bash:no-line-numbers
leaf scaffold:landing-page
```

You get:

- A structured homepage layout
- Sections like hero, features, and footers
- Tailwind styling with your preferred frontend setup
- Easy customization with Leaf Zero components

## Billing Subscription

Subscriptions are common in modern products, but the setup usually involves pricing UI, callbacks, webhooks, database state, and provider configuration. Leaf MVC can scaffold the shape for you.

```bash:no-line-numbers
leaf scaffold:subscriptions
```

It requires [Leaf Billing](/docs/utils/billing) to be installed.

<div class="not-prose my-6 grid gap-3 sm:grid-cols-2">
  <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
    <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">Frontend</p>
    <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Pricing component and subscription UI in whatever frontend setup you are using.</p>
  </div>
  <div class="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
    <p class="!m-0 text-sm font-semibold text-neutral-950 dark:text-neutral-50">Backend</p>
    <p class="!m-0 !mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">Subscription controllers, cancellation flow, Stripe callbacks, routes, models, schema, and config.</p>
  </div>
</div>

## Waitlists

Waitlists help you validate demand and collect emails before a product is fully open.

```bash:no-line-numbers
leaf scaffold:waitlist
```

These will give you:

- Waitlist component for collecting emails in your frontend setup
- Middleware to restrict accidental access to your app
- Models and schema files for email collection
- Waitlist invites and related starting points

## AI-assisted scaffolding

Scaffolding pairs naturally with AI because the command gives your assistant a working feature shape to edit instead of asking it to invent every file from scratch.

```txt:no-line-numbers
Ask your assistant:
"Scaffold auth, then customize the dashboard for a SaaS admin."
```

Recommended workflow:

1. Run or ask your assistant to run the scaffold command.
2. Run `leaf context` after files are generated.
3. Ask for the product-specific changes.
4. Review the generated routes, controllers, models, and views.

## More coming soon

We are working on scaffolding for more features like:

- Blog
- Admin panel
- API dashboard
- More product starters
