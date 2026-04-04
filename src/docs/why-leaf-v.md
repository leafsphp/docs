---
title: Why Leaf V?
---

# Why Leaf V?

Leaf has always been about simplicity — but simplicity alone isn't enough. Developers need to **ship real products, fast**. Leaf V is a fundamental shift in how we think about PHP development.

## The problem with most frameworks

Most PHP frameworks fall into one of two traps:

- **Too heavy** — You spend more time configuring the framework than building your product. Dozens of config files, service providers, and boilerplate before you write a single line of business logic.
- **Too light** — Micro-frameworks give you routing and... that's it. You end up gluing together libraries and building your own auth, database layer, and everything else from scratch.

Leaf V sits in a different lane entirely.

## What changed in Leaf V

### Speed of execution, not just performance

Performance matters, but **developer speed** matters more. Leaf V is designed around one metric: how fast can you go from idea to production?

```bash
$ leaf create my-saas
$ cd my-saas
$ leaf serve
```

That's it. Auth, database, CORS, routing — all configured and ready. No 20-minute setup. No config files to write. No boilerplate to copy.

### Production-ready by default

Every Leaf V project ships with sensible defaults that work in production:

- **Authentication** — Login, signup, sessions, JWTs, roles and permissions. One line.
- **Database** — Simple query builder for basics, Eloquent ORM when you need power.
- **HTTP** — Requests, CORS, sessions, cookies, validation — clean APIs, no middleware soup.
- **Security** — CSRF protection, encryption, secure headers — enabled out of the box.

```php
// Full auth in one line
auth()->login([
    'email' => 'user@example.com',
    'password' => 'secret'
]);

// Protected routes with zero config
app()->get('/dashboard', ['middleware' => 'auth.required', function () {
    return response()->json(auth()->user());
}]);
```

### Zero-config, not no-config

Leaf V works with zero configuration out of the box. But when you need to customize, everything is accessible through clean, predictable APIs. No hunting through dozens of config files.

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

### Your frontend, your rules

Leaf V doesn't dictate your frontend choices. Use what you know:

- **React** — with Inertia.js or as an API backend
- **Vue** — first-class support with Inertia or standalone
- **Svelte** — full Vite-powered integration
- **Blade** — server-rendered templates when that's all you need

```bash
$ leaf view:install --react
# Done. Vite configured, HMR ready, auto-detected on serve.
```

## Leaf V vs. the alternatives

### vs. Laravel

Laravel gives you everything — and makes you pay for it in complexity. Leaf V gives you what you need for shipping products, without the overhead.

| | Laravel | Leaf V |
|---|---------|--------|
| Setup time | 5-15 min | ~30 seconds |
| Config files | 15+ | 0 (optional) |
| Learning curve | Steep | Minimal |
| Auth setup | Multiple commands | Built-in, one line |
| Bundle size | Heavy | Lightweight |

**Laravel**: Full ecosystem, everything included.
**Leaf V**: Faster path to real products.

### vs. Slim / micro-frameworks

Slim gives you routing. Everything else is DIY. Leaf V gives you a complete toolkit that stays lightweight.

| | Slim | Leaf V |
|---|------|--------|
| Routing | ✓ | ✓ |
| Auth | DIY | Built-in |
| Database | DIY | Built-in |
| Validation | DIY | Built-in |
| File uploads | DIY | Built-in |
| Mail | DIY | Built-in |

## The philosophy

Leaf V is built on three principles:

1. **Speed over ceremony** — Every feature should reduce the steps between idea and working product.
2. **Powerful, not bloated** — Include what developers actually use. Skip the rest.
3. **Real products, not toys** — Everything works in production from day one.

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
