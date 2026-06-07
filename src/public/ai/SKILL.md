---
name: leaf-v
description: Expert guidance for building apps with Leaf V — the next generation of the Leaf PHP framework. Use this skill whenever the user mentions Leaf V, Leaf PHP v5, `leaf up`, `leaf context`, `leaf install`, Leaf V entry points (Basic App, Web App, API), or is asking Claude to help build, scaffold, debug, or extend a Leaf V project. Also trigger when the user pastes a `.leaf/context.md` file or asks Claude to act as a Leaf V assistant. This skill makes Claude a first-class Leaf V developer — use it proactively anytime Leaf V is in scope.
---

# Leaf V Developer Skill

Leaf V is the next generation of Leaf PHP — not just a framework update, but a new way of building apps. The core idea: **you choose a starting point, not a framework tier.** You grow without switching tools, rewrites, or compatibility headaches.

## Core Philosophy

1. **Start where you are** — pick the entry point that fits your goal
2. **Grow without friction** — no rewrites, no ecosystem changes
3. **Build with AI, not against it** — real context so AI can actually help

---

## Entry Points

Three entry points. Not different frameworks — different starting configurations of the same system.

| Entry Point | Flag | Best For |
|---|---|---|
| 🟣 **Basic Leaf app** | `--lite` | Prototypes, scripts, single-file apps |
| 🔴 **Full-stack MVC app** | `--mvc` | Real products, teams, views + structure |
| 🟠 **Leaf MVC API app** | `--api` | Backends, microservices, headless |
| ⬛ **Console app** | `--console` | CLI tools via Seedling |

```bash
leaf create my-app          # interactive prompt
leaf create my-app --lite   # skip prompt
leaf create my-app --mvc
leaf create my-app --api
leaf create my-app --console
```

Interactive prompt:
```
? Select a preset: › - Use arrow-keys. Return to submit.
❯  Basic Leaf app
   Full-stack MVC app
   Leaf MVC API app
   Console app via Seedling
```

---

## Project Structure

### Basic App (`--lite`)
```
my-app/
├── index.php
├── vendor/
└── .leaf/
    └── context.md
```

### Web App (`--mvc`)
```
my-app/
├── app/
│   ├── controllers/
│   ├── database/
│   ├── models/
│   ├── routes/
│   └── views/
├── public/
├── vendor/
└── .leaf/
    └── context.md
```

### API (`--api`)
```
my-app/
├── app/
│   ├── controllers/
│   ├── database/
│   ├── models/
│   └── routes/
├── public/
├── vendor/
└── .leaf/
    └── context.md
```

> No `leaf.config.php`, no bloat. Much lighter than Laravel by design.

---

## Leaf CLI

```bash
composer global require leafs/cli -W   # install
leaf                                    # verify
```

If `leaf: command not found` → add Composer's global bin to PATH:
```bash
composer global config bin-dir --absolute

echo 'export PATH="$PATH:$HOME/.composer/vendor/bin"' >> ~/.bashrc && source ~/.bashrc
# Zsh:
echo 'export PATH="$PATH:$HOME/.composer/vendor/bin"' >> ~/.zshrc && source ~/.zshrc
```

| Command | Description |
|---|---|
| `leaf create` | Create a new Leaf project |
| `leaf serve` | Dev server (default: localhost:5500) |
| `leaf up` | Migrate Basic app → full MVC |
| `leaf install` | Install a package |
| `leaf uninstall` | Uninstall a package |
| `leaf run` | Run a composer.json script |
| `leaf view:install` | Set up a view/frontend engine |
| `leaf view:build` | Build frontend assets |
| `leaf interact` | Interact with your app |
| `leaf update` | Update the CLI |

```bash
leaf serve                              # localhost:5500
leaf serve --port=8080
leaf serve --watch                      # auto-reload (requires Node.js)
leaf serve /path/to/app

leaf install auth                       # official packages: leafs/ prefix optional
leaf install auth db mail               # multiple at once
leaf install auth@4.0                   # versioned
leaf install illuminate/support@9.0.2  # any Composer package
leaf uninstall auth db
```

> Leaf auto-installs missing dependencies if no `vendor/` directory is found.

---

## `leaf up` — Scaling Your App

```bash
leaf up    # migrate Basic app → MVC without rewriting
```

What it does automatically:
- Uses `index.php` in root as the project entry point
- Moves root assets → `public/`
- Detects controller-like classes → `app/controllers/`
- Finds DB queries → creates models, switches to model-based queries
- Moves all config → `.env` (autoconfigured)

> WIP — more detail added before Alpha release.

---

## AI-Native: `leaf context`

```bash
leaf context    # generates .leaf/context.md
```

Produces a minified map of your project: routes, modules, config, structure.

**Workflow:**
1. Run `leaf context`
2. Paste `.leaf/context.md` into your AI assistant
3. Say what you want: *"Add billing"*, *"Create a dashboard"*
4. AI has real context — stops guessing, builds correctly

`.leaf/context.md` stays updated as your app evolves (re-run anytime).

> Confirmed for Leaf V, will be ready before Alpha.

---

## Installing Modules

```bash
leaf install auth      # Authentication
leaf install db        # Database
leaf install mail      # Mailing
leaf install cors      # CORS
leaf install fs@v4     # Filesystem (needed for file uploads in Basic apps)
```

Everything wires up automatically. No glue code.

---

## Reference Files

Read the relevant file before generating code for that area:

| Topic | File |
|---|---|
| Routing (methods, groups, dynamic routes, sub-patterns) | `references/routing.md` |
| Middleware (closures, classes, `$next`, data passing) | `references/middleware.md` |
| Request API (get, validate, upload, client info, metadata) | `references/request.md` |
| Response API (json, views, redirects, headers, cookies) | `references/response.md` |
| CORS (config, options, MVC vs Lite) | `references/cors.md` |
| MVC (controllers, models, schema files, services, libraries, globals) | `references/mvc.md` |
| Views (Blade, BareUI, Inertia, Vite, Tailwind) | `references/views.md` |
| Advanced (cache, storage, queues, billing, i18n, sitemap) | `references/advanced.md` |
| Mail, HTTP fetch client, HTTP cache | `references/mail-fetch-cache.md` |
| Utilities (Anchor/XSS/SQL protection, tick() dates) | `references/utilities.md` |
| Sessions, cookies, flash, validation, CSRF, passwords | `references/security.md` |
| Auth (login, register, sessions, JWT, OAuth, scaffold) | `references/auth.md` |
| Database (db(), query builder, transactions, Redis) | `references/database.md` |
| App config, env, logging, DI, maintenance, deployment | `references/app-config.md` |

---

## When Helping a User Build with Leaf V

1. **Read `.leaf/context.md` first** if shared — reveals entry point, routes, installed modules
2. **Check the reference file** for the API area before writing code
3. **Stay in the Leaf ecosystem** — prefer `leaf install` over third-party packages
4. **Respect the entry point** — don't impose MVC structure on a Basic app unless asked
5. **Use their actual names** — route names, model names, controller names from their project
6. **Favor simplicity** — that's the Leaf way

---

## Notes for Claude

- Leaf V is **pre-release** (not publicly available as of mid-2025)
- Creator: **mychidarko** (Michael Darko), founder of Leaf PHP
- Backwards-compatible with Leaf 4 patterns where possible
- If asked about undocumented features, ask the user — especially if talking to the creator
