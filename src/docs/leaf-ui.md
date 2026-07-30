---
title: "Sunsetting Leaf UI"
next: false
prev: false
---

# Sunsetting Leaf UI

Leaf UI was our take on building reactive interfaces in pure PHP: Livewire-style components where your markup, state and event handlers lived in PHP classes, with Leaf wiring up the browser updates for you. As of Leaf 5, Leaf UI is officially retired and no longer maintained.

This page explains why, and exactly what to use instead.

## Why we retired it

Two things changed since Leaf UI was born.

**The frontend ecosystems matured, and Leaf grew first-class bridges to them.** Blade gives you server-rendered views with almost no ceremony, and Inertia connects Leaf to React, Vue and Svelte without you writing an API layer. These stacks are better documented, better tooled and more battle-tested than a PHP-only reactive layer could realistically become, and `leaf view:install` sets any of them up in one command.

**AI-assisted development removed the problem Leaf UI solved.** The pitch was "build interfaces without leaving PHP", which mattered most when switching to JavaScript meant a real learning curve. Today your assistant writes idiomatic React, Vue, Svelte or Blade fluently, and Leaf 5's project context keeps it aligned with your app. Staying inside PHP is no longer the shortcut it used to be; using the tools the rest of the world tests and maintains is.

Maintaining a reactive component framework is an enormous job. We would rather pour that energy into the core, the modules and the tooling that make Leaf what it is.

## What to use instead

Depending on what you used Leaf UI for:

| If you were building | Reach for |
| -------------------- | --------- |
| Server-rendered pages and forms | [Blade](/docs/frontend/blade) (default in Leaf MVC), optionally with [Tailwind](/docs/frontend/tailwind) |
| Reactive, component-driven UIs | [Inertia](/docs/frontend/inertia) + React, Vue or Svelte via `leaf view:install --react` / `--vue` / `--svelte` |
| Complete features (auth pages, landing pages, waitlists) | [Scaffolds](/docs/mvc/scaffolds): `leaf scaffold:auth`, `leaf scaffold:landing-page`, `leaf scaffold:waitlist` |
| Small interactive islands on server-rendered pages | Blade + a sprinkle of vanilla JS or the lightweight library of your choice |

For a full walkthrough of the frontend options, start at [Frontend](/docs/frontend/).

## What happens to existing apps

- The repositories are archived on GitHub: no new features, fixes or security patches will land.
- Leaf UI was never part of Leaf MVC's default setup, so most Leaf 5 apps are unaffected.

If you have a production app built on Leaf UI, plan a migration to one of the stacks above. The scaffolds are the fastest path: they generate working Blade or Inertia pages you can reshape, instead of leaving you with a blank file.

If you get stuck migrating, come talk to us on [Discord](https://discord.gg/Pkrm9NJPE3) — we are happy to help you plan the move.

## A thank you

Leaf UI taught us a lot about what Leaf developers actually want, and pieces of its DNA live on in the scaffolds and the view system. Thank you to everyone who built with it, filed issues and contributed code. Retiring a project we loved is easier knowing the ideas survive in better homes.
