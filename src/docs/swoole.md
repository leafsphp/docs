<!-- markdownlint-disable no-inline-html -->

# Async PHP with Leaf <StatusBadge label="Being rebuilt" tone="wip" title="Leaf's async story is being rewritten from the ground up" description="Eien is being rebuilt for Leaf 5 with first-class support for Swoole and other async PHP runtimes like ReactPHP. This page documents what works today and what's coming." meta="Docs target: Leaf 5" href="#eien-is-being-rebuilt" link-text="What's coming" />

PHP normally handles one request at a time and starts fresh on every one. Async runtimes like [Swoole](https://swoole.com), [ReactPHP](https://reactphp.org), and [OpenSwoole](https://openswoole.com) change that: your app boots once, stays in memory, and handles many requests concurrently. That means faster responses, WebSockets, timers, and background work inside your app process.

::: warning Eien is being rebuilt

[Eien](https://github.com/leafsphp/eien), the module that connected Leaf to Swoole, is being rewritten from the ground up for Leaf 5.

The rewrite makes Eien Leaf's async layer in general, with proper support for **Swoole** and other async PHP libraries like **ReactPHP**, behind one shared contract, so switching runtimes doesn't mean rewriting your app.

Until it ships, Leaf 5 has no built-in async integration. Everything below describes how to run Leaf in a long-running process today, by hand.

:::

## What changed in Leaf 5

Earlier versions of Leaf shipped a built-in integration with Eien: the core auto-detected it and exposed WebSocket routes through `app()->ws()`.

Leaf 5 removes that coupling. `app()->ws()` and the automatic Eien detection are no longer part of the core. Long-running server setups now live outside the core, which keeps the framework lean for the majority of apps that run behind PHP-FPM, and gives the async integration room to be rebuilt properly instead of living half-inside the router.

If you're upgrading an app that used `app()->ws()`, see the [upgrade guide](/docs/upgrade-guide). For now, those routes need to move to a dedicated WebSocket setup.

## Running Leaf in a long-running process

You can still run Leaf inside Swoole, ReactPHP, or any long-running worker by booting the app yourself. Two things matter:

- **Reset router state between requests.** Leaf 5 adds `Leaf\Router::reset()`, which clears all registered routes, groups, and hooks. Call it between requests so state from one request never leaks into the next.
- **Use Leaf's request/response objects.** Raw `header()` calls and `echo` bypass the worker's response lifecycle. Everything should flow through `request()` and `response()`.

Anything stored in a static property or a singleton also survives between requests, so be deliberate about what you cache and what you rebuild.

## What's coming

The new Eien aims to give every async runtime the same shape in Leaf: one way to boot your app, one lifecycle for requests, one place for WebSockets, timers, and background tasks, whether you run it on Swoole or ReactPHP.

If you're running Leaf on an async runtime today, or you want a specific library supported, we'd genuinely like to hear about it on [GitHub](https://github.com/leafsphp/leaf/discussions) or [Discord](https://discord.gg/Pkrm9NJPE3). Real setups shape what the rewrite prioritises.

*This page will be updated as the new integration lands.*
