---
title: "Why Leaf V?"
---

# Building shouldn’t feel this hard

![Leaf V: The Fastest Path to Real Products](/leaf5-banner.png)

<!-- Most developers used to write most of their code by hand just 2 years ago, but that doesn't even make sense anymore today! We can generate large features with AI in seconds, but the frameworks we use to build products haven't caught up. We're still stuck in the era of "write all the boilerplate yourself" or "configure a dozen files before you can write a line of code." -->

Two years ago, this was normal:

- Writing every feature by hand.
- Setting up projects from scratch.
- Spending hours configuring before you could even start building.

Today?

We can generate entire features in seconds.

And yet… the frameworks we use haven’t caught up.

We’re still stuck in the era of
“write all the boilerplate yourself”
or
“configure a dozen files before you write a line of code.”

## The problem with most frameworks

Most PHP frameworks today fall into the same three traps:

- **Too heavy** — You spend more time configuring the framework than building your product. Dozens of config files, service providers, and boilerplate before you write a single line of business logic.
- **Too light** — Micro-frameworks give you routing and... that's it. You end up gluing together libraries and building your own auth, database layer, and everything else from scratch.
- **AI chaos** — You ask for something simple like “auth”… and you get 10 different answers from AI, each with its own quirks and bugs. You spend more time debugging generated code than writing your product.

Leaf V sits in a different lane entirely.

## What changed in Leaf V

We didn’t just add features. We rebuilt how Leaf works around one goal:

> **getting you from idea to a real product as fast as possible.**

That meant rethinking everything
from structure… to APIs… to how modern developers actually build today.

### AI-first design

The difference between code that works and code that wastes your time?

- Structure.
- Consistency.
- Predictability.

Leaf V is designed so everything follows the same logic whether you write it yourself or generate it with tools.

### From idea to running app

Not faster benchmarks, Faster building! (even though we've got those too)

```bash
$ leaf create my-saas
$ cd my-saas
$ leaf serve
```

That's it.

Auth. Database. Routing.
Already there. Already working.

No setup loops.
No config maze.
No copy-pasting boilerplate.

### Everything you need. Already in place

You don’t start from zero anymore:

- Authentication
- Database
- HTTP
- Security

No wiring things together.

```php
// Full auth in one line
auth()->login([
    'email' => 'user@example.com',
    'password' => 'secret'
]);

// Protected routes with zero config
app()->get('/dashboard', [
    'middleware' => 'auth.required',
    function () {
        return response()->json(auth()->user());
    }
]);
```

### Zero-config, not no-config

Everything works out of the box. And when you need to tweak something? It’s one call away.

```php
// Need to customize? It's always one call away
app()->cors([
    'origin' => 'https://myapp.com',
    'methods' => ['GET', 'POST'],
]);

db()->config([
    'driver' => 'mysql',
    'host' => _env('DB_HOST', 'localhost'),
]);
```

No digging through config files.
No hidden layers.

Just clear, predictable APIs.

### Your frontend, your rules

Most tools force you into a stack. Leaf doesn’t. Use what you already know:

- **React** — with Inertia.js or standalone with a Leaf API backend
- **Vue** — first-class support with Inertia
- **Svelte** — full Inertia-powered integration
- **Blade** — server-rendered templates when that's all you need
- **Anything else** — Leaf is frontend-agnostic. Use it with any tool you like.

```bash
$ leaf view:install --react
# Done. Vite configured, HMR ready, auto-detected on serve.
```

## Leaf V vs. the alternatives

Not every framework solves the same problem.
Some optimize for flexibility. Others for completeness.
Leaf V is built for one thing: getting real products out the door, fast.

### vs. Laravel

Laravel gets you running fast, Then you spend the next 30 minutes setting these up:

- Config files
- Packages
- Service providers
- Learning curve
- Migrations

Leaf V skips all of that. You start with a working system, not an empty setup.

| | Laravel | Leaf V |
|---|---------|--------|
| Setup time | 5-10 min | ~1-5 mins |
| Starting Config files | 10+ | 0 (on-demand) |
| Learning curve | Steep | Minimal |
| Auth setup | Multiple commands | Built-in, one line |
| Bundle size | Heavy | Lightweight |

**Laravel**: Full ecosystem, everything included.
**Leaf V**: Faster path to real products.

### vs. Slim / micro-frameworks

Slim gives you routing. Everything else… is on you.

Auth? You wire it up.
Database? You choose and configure it.
Validation, uploads, mail, caching, multi-language, sitemaps? Same story.

**With Leaf V, you’re not assembling your framework.
You’re building your product.**

| Feature        | Slim               | Leaf V                |
| -------------- | ------------------ | --------------------- |
| Routing        | ✓                  | ✓                     |
| Auth           | 30–60 mins         | 1 line login/register |
| Database       | Setup required     | Ready                 |
| Validation     | Custom logic       | Built-in              |
| File uploads   | Manual handling    | Built-in              |
| Mail           | External setup     | Leaf Mail             |
| Caching        | External setup     | 1 line                |
| Multi-language | Custom setup       | Router-integrated     |

## The philosophy

Leaf V is built on three simple rules:

1. **Speed over ceremony** — Every feature reduces the steps between idea and working product.
2. **Powerful, not bloated** — Include what developers actually use. Skip the rest.
3. **Consistent and predictable** — Whether you write it or generate it, it works the same way.

## What developers are saying

> "Building with Leaf has been the most simple and straightforward approach to getting an app production ready."
> — Desmond Sofua

> "I have been looking for an alternative to Silex for a few years now... other frameworks were always a pain to setup."
> — propeller-aaron

> "As a design/frontend-heavy agency, we needed a lightweight, but powerful framework that would just work on our servers without any hassle."
> — Rare Goods Only

## Ready to ship?

Stop configuring. Start building.

<div style="display: flex; gap: 12px; margin-top: 16px;">

[Get started](/docs/)

[See the docs](/docs/modules)

</div>
