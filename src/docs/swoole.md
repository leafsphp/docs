<!-- markdownlint-disable no-inline-html -->

# Leaf + Swoole <StatusBadge label="WIP" tone="wip" title="Swoole support is being rebuilt for Leaf 5" description="Leaf 5 removed the built-in Eien integration from the core. A standalone Swoole story is planned, but it has not shipped yet — this page documents what works today and what changed." meta="Docs target: Leaf 5" href="#what-changed-in-leaf-5" link-text="See what changed" />

Swoole is a high-performance network framework that supercharges PHP, allowing it to handle multiple tasks at the same time (asynchronous programming). Typically, PHP processes tasks one by one, but Swoole lets it manage thousands of tasks simultaneously, making your app faster and more efficient.

## What changed in Leaf 5

Earlier versions of Leaf shipped a built-in integration with [Eien](https://github.com/leafsphp/eien), a module that bridged Leaf and Swoole — the core auto-detected it and exposed WebSocket routes through `app()->ws()`.

Leaf 5 removes that coupling: `app()->ws()` and the automatic Eien detection are no longer part of the core. Long-running server setups are now handled outside the core, which keeps the framework lean for the 99% of apps that run behind PHP-FPM — and gives the Swoole integration room to be rebuilt properly instead of living half-inside the router.

If you're upgrading an app that used `app()->ws()`, see the [upgrade guide](/docs/upgrade-guide) — for now those routes need to move to a dedicated WebSocket setup.

## Running Leaf in a long-running process

You can still run Leaf inside Swoole (or any long-running worker) by booting the app yourself. Two things to keep in mind:

- **Reset router state between requests.** Leaf 5 adds `Leaf\Router::reset()`, which clears all registered routes, groups, and hooks. Call it between requests/iterations so state from one request never leaks into the next.
- **Use Leaf's request/response objects.** Raw `header()` calls and `echo` bypass the worker's response lifecycle — everything should flow through `request()` and `response()`.

## What's next

A standalone, Leaf 5-native Swoole integration is on the roadmap after the core release. Until it ships, treat Swoole setups as advanced/experimental territory — and if you're running one in production, we'd genuinely love to hear how on [GitHub](https://github.com/leafsphp/leaf/discussions) or [Discord](https://discord.gg/Pkrm9NJPE3).

*This page will be updated as the new integration lands.*
