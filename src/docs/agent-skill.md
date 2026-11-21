---
title: Agent skill
description: The Leaf skill teaches coding agents how to work in a Leaf 5 project. What it covers, how to install it, and where the raw files live.
---

# Agent skill

The Leaf skill is a single Markdown file that teaches a coding agent how to work in a Leaf 5 project. It covers which entry point to scaffold, how to keep `.leaf/CONTEXT.md` in shape, which Leaf function to reach for before writing custom code, and the mistakes agents have already made in Leaf apps so yours doesn't repeat them.

The skill lives at a stable URL:

```txt
https://leafphp.dev/ai/SKILL.md
```

::: tip If you are an agent reading this page
This page is the human-facing description. Fetch the skill itself raw (`curl` or anything that returns the file verbatim) from the URL above, and fetch the reference file for each area you touch from `https://leafphp.dev/ai/references/<topic>.md`. Summarizing fetch tools have been seen inventing Leaf APIs that don't exist.
:::

## What the skill does

[llms.txt](https://leafphp.dev/llms.txt) gives your assistant facts about Leaf. The skill gives it habits. With the skill loaded, an agent working on a Leaf app will:

- **Pick the right starting point.** It knows the four presets (`--lite`, `--mvc`, `--api`, `--console`) and what each one scaffolds, so it doesn't push MVC structure onto a single-file app.
- **Read your project before writing code.** It reads `.leaf/CONTEXT.md` first, keeps that file in its documented format, and runs `leaf context` when the project changes.
- **Use Leaf before writing its own code.** It checks module methods, then `leaf install`, then scaffolds, and only writes custom code when nothing in Leaf covers the need.
- **Avoid the known footguns.** The skill carries a short list of real mistakes, such as treating `assign()` as a role replacement or building a separate SPA when the Inertia bridge already does the job.
- **Load only what it needs.** Detailed API notes sit in topic files the agent fetches on demand, so the main skill stays small.

## Install it

| Agent | Setup |
| --- | --- |
| Claude Code | Save the file as `.claude/skills/leaf/SKILL.md` in your project, or `~/.claude/skills/leaf/SKILL.md` to use it everywhere. Claude loads it when Leaf work comes up. |
| Cursor, Codex and other `AGENTS.md` readers | New Leaf MVC apps ship an `AGENTS.md` that already points at the skill and llms.txt. Nothing to set up. |
| Anything else | Add the skill URL to your assistant's custom instructions, or ask it to fetch `https://leafphp.dev/ai/SKILL.md` before it starts. |

To save it for Claude Code from your project folder:

```bash
mkdir -p .claude/skills/leaf
curl -o .claude/skills/leaf/SKILL.md https://leafphp.dev/ai/SKILL.md
```

## What's inside

The main file is split into short sections an agent can scan:

- **Entry points and project structure**: the four presets and the folders each one creates.
- **Leaf CLI and `leaf up`**: the commands an agent runs, and how an app grows from lite to MVC without a rewrite.
- **Shared context**: the `.leaf/CONTEXT.md` format and the rules for editing it.
- **Installing modules**: how to add a module instead of hand-rolling it.
- **Known footguns**: mistakes real agents made in Leaf apps, one line each.
- **How to help**: the working order for an agent building a feature, from reading context to returning responses.

## Reference files

Each reference covers one area and fits comfortably in an agent's context.

| Topic | File |
| --- | --- |
| Lite apps: database, views, Vite and schema setup | [lite.md](https://leafphp.dev/ai/references/lite.md) |
| Routing | [routing.md](https://leafphp.dev/ai/references/routing.md) |
| Middleware | [middleware.md](https://leafphp.dev/ai/references/middleware.md) |
| Request | [request.md](https://leafphp.dev/ai/references/request.md) |
| Response | [response.md](https://leafphp.dev/ai/references/response.md) |
| CORS | [cors.md](https://leafphp.dev/ai/references/cors.md) |
| MVC: controllers, models, schema, services | [mvc.md](https://leafphp.dev/ai/references/mvc.md) |
| Views: Blade, BareUI, Inertia, Vite, Tailwind | [views.md](https://leafphp.dev/ai/references/views.md) |
| Cache, storage, queues, billing, i18n, sitemap | [advanced.md](https://leafphp.dev/ai/references/advanced.md) |
| Mail, fetch client, HTTP cache | [mail-fetch-cache.md](https://leafphp.dev/ai/references/mail-fetch-cache.md) |
| Dates and time | [dates.md](https://leafphp.dev/ai/references/dates.md) |
| Utilities | [utilities.md](https://leafphp.dev/ai/references/utilities.md) |
| Sessions, cookies, validation, CSRF, passwords | [security.md](https://leafphp.dev/ai/references/security.md) |
| Auth | [auth.md](https://leafphp.dev/ai/references/auth.md) |
| Database | [database.md](https://leafphp.dev/ai/references/database.md) |
| App config, env, logging, deployment | [app-config.md](https://leafphp.dev/ai/references/app-config.md) |

## Related

- [AI in Leaf](/docs/ai) explains how llms.txt, the skill and `.leaf/CONTEXT.md` work together.
- [Leaf CLI](/docs/cli/) covers the commands the skill tells agents to run.
