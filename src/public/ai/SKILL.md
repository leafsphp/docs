---
name: leaf-v
description: Expert guidance for building apps with Leaf 5 — the next generation of the Leaf PHP framework. Use this skill whenever the user mentions Leaf 5, Leaf PHP v5, `leaf up`, `leaf context`, `leaf install`, Leaf 5 entry points (Basic App, Web App, API), or is asking Claude to help build, scaffold, debug, or extend a Leaf 5 project. Also trigger when the user pastes a `.leaf/CONTEXT.md` file or asks Claude to act as a Leaf 5 assistant. This skill makes Claude a first-class Leaf 5 developer — use it proactively anytime Leaf 5 is in scope.
---

# Leaf 5 Developer Skill

Leaf 5 is the next generation of Leaf PHP — not just a framework update, but a new way of building apps. The core idea: **you choose a starting point, not a framework tier.** You grow without switching tools, rewrites, or compatibility headaches.

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
    └── CONTEXT.md
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
    └── CONTEXT.md
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
    └── CONTEXT.md
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

How to run it safely (it is **beta**):
1. Make sure the working tree is committed before running.
2. The first run writes a `.leaf/migration.yml` plan — review and edit it with the user before applying.
3. The second run applies the plan. `--dry-run` previews without changing files.
4. If the migration gets the project wrong, report it: https://github.com/leafsphp/cli/issues/new

`leaf context` is also beta: if its output misses routes or misreads a project, report it at the same link rather than working around it silently.

---

## AI-Native shared context

Leaf projects use `.leaf/CONTEXT.md` as shared working memory. The file follows the **leaf.context v1** format (marker comment on line 1) so that Claude, Codex, Cursor and every other agent write edits that compose. When you are running inside the project:

1. Read `.leaf/CONTEXT.md` before making changes.
2. Verify it against the live filesystem.
3. Update useful project knowledge in `.leaf/CONTEXT.md` when the work is complete.

**Format contract (leaf.context v1):**

- Line 1 is the format marker (`<!-- leaf.context v1 -->`). Never remove or edit it.
- Sections are `##` headings in their existing order. Preserve sections you don't recognize — another agent may own them. Add project-specific sections at the end only.
- A line wrapped in underscores is a placeholder. If it contains `agent:`, it is an instruction to you: act on it, then replace the line with real content (or delete it).
- Keep entries one line each where possible so concurrent agents' edits merge cleanly.
- Never store secrets or tokens; refer to `.env` keys by name only.
- Never duplicate mechanical info (routes, models, modules, structure) — that lives in code and `leaf context`. The file holds what code cannot say: goals, decisions, reasoning.

**Write-back protocol (after completing work):**

- Recent Changes: add `* YYYY-MM-DD — what changed (key files)`, newest first, five entries max; fold older entries into Known Decisions or delete them.
- Current Goal: exactly one at a time. When it's done, note it in Recent Changes and replace it — ask the user if the next goal is unknown.
- Known Decisions: record lasting choices as `* Decision — reasoning.` Always include the why, or the next agent will relitigate it.
- Keep the file concise: summarize instead of appending, remove outdated lines, reference files instead of copying them.

**Canonical sections** (the shipped template, in order — create missing files with these):

```markdown
<!-- leaf.context v1 -->

## Working With This File   (the format contract, keep as shipped)
## Project Summary          (2-3 lines: what the app is, for whom)
## Current Goal             (exactly one)
## Architecture             (entry point, key folders, notable wiring)
## External Providers       (services + env key NAMES, never values)
## Coding Conventions       (project-specific style the code can't show)
## Recent Changes           (dated one-liners, five max)
## Known Decisions          (decision + reasoning)
## Future Ideas             (parked, not committed)
```

No setup command is required for Leaf MVC or projects created through Leaf CLI. If a project has no `.leaf/CONTEXT.md`, offer to create one with these sections.

For an external assistant without access to the project, use:

```bash
leaf context    # prints a compact context handoff
```

This produces a minified view of the shared project context: routes, modules, config, structure, and conventions.

**External workflow:**
1. Run `leaf context`
2. Paste the command output into your AI assistant
3. Say what you want: *"Add billing"*, *"Create a dashboard"*
4. AI has real context — stops guessing, builds correctly

**If you are the assistant receiving a pasted handoff** (it starts with `# Leaf Context Handoff`):

- The mechanical map (routes, modules, models, env key names) was scanned from the real code — trust it over your assumptions, and use the project's actual route and model names in everything you generate.
- The "Shared memory" section carries the project's goals and decisions. Respect recorded decisions instead of proposing alternatives the team already rejected.
- The handoff is read-only: you cannot write back to `.leaf/CONTEXT.md` from outside. When your work produces knowledge worth keeping (a new decision, a completed goal), end your reply with a short "for your `.leaf/CONTEXT.md`" note the user can paste in.
- Ask the user for any file your change depends on that the handoff doesn't show — never guess at code you cannot see.

The handoff is a portable snapshot. It is not the same as the two-way `.leaf/CONTEXT.md` used by agents inside the project.

---

## Installing Modules

```bash
leaf install auth      # Authentication
leaf install db        # Database
leaf install mail      # Mailing
leaf install cors      # CORS
leaf install fs        # Filesystem (needed for file uploads in Basic apps)
```

Everything wires up automatically. No glue code.

---

## Reference Files

Read the relevant file before generating code for that area:

| Topic | File |
|---|---|
| Routing (methods, groups, dynamic routes, constraints) | `references/routing.md` |
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

## Known Footguns

Read this before writing code — each entry is a mistake real agents have made:

- **Roles are additive.** `assign()` appends, it never replaces. To change a role: `$user->unassign($user->roles()); $user->assign($newRole);` (a one-shot `sync()` is planned). A "role change" via `assign()` alone silently keeps the old role.
- **`$user->get()` hides `id`, `password`, and roles.** Use `$user->id()` and `$user->roles()`. API response shape: `[...$user->get(), 'roles' => $user->roles()]`.
- **`text` validates letters and spaces ONLY.** For passwords and free-form input use `string`.
- **Auth middleware defaults render HTML** (redirects, error pages). APIs must override each to JSON: `auth()->middleware('auth.required', fn () => response()->exit(['error' => 'Unauthorized'], 401));`
- **`_env()` caches per process.** Runtime env changes need `_envUncached()`.
- **`unique` config skips fields missing from the data** — a table without `username` is safe on defaults, but set `['email']` explicitly.
- **`User` objects hydrate from a plain row array with no DB connection** — only mutating methods need `setDb()`. For bulk list endpoints, stay on raw rows to avoid N+1 hydration.
- **Never call `app()->run()` in an MVC app.** Only lite apps run themselves.

---

## When Helping a User Build with Leaf 5

1. **Read `.leaf/CONTEXT.md` first** if shared — reveals entry point, routes, installed modules
2. **Check the reference file** for the API area before writing code
3. **Prefer Leaf functions over hand-rolled code, always.** Before writing any helper or custom logic, check in this order: a module method (reference files first), then `leaf install <module>`, then a scaffold. Write custom code only when no Leaf API covers the need, and record why in `.leaf/CONTEXT.md` Known Decisions. Never reimplement hashing, validation, auth flows, or query building that Leaf modules provide
4. **Return responses, prefer arrow functions** — `app()->get('/', fn () => response()->json([...]));` for single-expression handlers; in multi-statement closures and controllers, `return response()->...` as the final statement. Never call `response()` without returning it
5. **Respect the entry point** — don't impose MVC structure on a Basic app unless asked
6. **Use their actual names** — route names, model names, controller names from their project
7. **Favor simplicity** — that's the Leaf way

---

## Notes for Claude

- Leaf 5 is the current major generation of Leaf PHP.
- Creator: **mychidarko** (Michael Darko), founder of Leaf PHP
- Backwards-compatible with Leaf 4 patterns where possible
- If asked about undocumented features, ask the user — especially if talking to the creator
