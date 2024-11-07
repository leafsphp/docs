<!-- markdownlint-disable no-inline-html -->

# Leaf + Swoole <Badge type="danger" text="BETA" />

Swoole is a high-performance network framework that supercharges PHP, allowing it to handle multiple tasks at the same time (asynchronous programming). Typically, PHP processes tasks one by one, but Swoole lets it manage thousands of tasks simultaneously, making your app faster and more efficient.

While Swoole is great for building high-performance applications, it can be a bit complex to use. It has an unfamiliar API and requires a lot of boilerplate code to get started.

Leaf simplifies this by providing Eien Server: a module that directly integrates with Swoole and allows Leaf to speak Swoole's language. This means you can use Swoole's features directly in Leaf without having to change your codebase or learn a new API.

*Eien is still in active development, so it may have some bugs. Please report any issues you find on the [Eien GitHub repository](https://github.com/leafsphp/eien).*

## Getting Started

Eien runs on Swoole, so you need to have the swoole extension installed. Here are some resources to help you get started:

- [Swoole Installation docs](https://openswoole.com/docs/get-started/installation)
- [In case you have errors installing swoole on Mac](https://parsinta.com/articles/setup-php-swoole-in-your-mac-os)

Once you have Swoole installed, you can install Eien using the Leaf CLI:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install eien
```

```bash:no-line-numbers [Composer]
composer require leafs/eien
```

:::

<!-- ## Benchmarks

<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:10px;">
  <div>
    <b>Leaf WITHOUT Eien:</b>
    <img width="759" alt="IMG_0785" src="https://user-images.githubusercontent.com/26604242/194716365-40e6e77c-6cb3-403e-a890-62382d14976e.png">
  </div>
  <div>
    <b>Leaf WITH Eien:</b>
    <img width="746" alt="IMG_5389" src="https://user-images.githubusercontent.com/26604242/209473926-43485e5b-7ab2-4851-a5ee-fdb2b90973e7.png">
  </div>
</div>

***From the Benchmarks above, Leaf was 76x faster when used with Eien.*** -->

## Basic Usage

Eien is designed to make your life easier as a developer. For most cases, like speeding up your app or handling basic HTTP features, you won’t need to change anything after installing it. Once Leaf detects Eien, it automatically configures everything, and your app will run using Swoole without any extra setup needed. It’s a hassle-free way to boost performance!

Once again, Eien is still in development, so we need your help to test it in production and report any issues you find.

## Drawbacks

While Leaf on it's own has 100% compatibility with PHP and all it's language features, Eien is built on top of Swoole which has some limitations. Here are some things to keep in mind when using Eien:

- Things involving request and responses all MUST be done using Leaf's request and response objects. This is because Eien serves as a bridge between Leaf and Swoole and so it needs to know what's going on in your app. Directly using things like `header()` or `echo` will not work as expected.

- Websockets are not yet fully supported. We're working on this and it should be more stable in the next few releases.

- We can't guarantee that other libraries outside of Leaf will work as expected. Eien is built to work with Leaf and so we can't guarantee that it will work with other libraries.

## Serving Your Application

We promised that there would be no API changes, and this also applies to how you serve your application. You can start your application using the Leaf CLI just as you do with regular Leaf apps:

```bash:no-line-numbers
leaf serve
```

If you are using Leaf MVC, you can use the MVC Console the same way:

```bash:no-line-numbers
php leaf serve
```

## Websockets <Badge type="danger" text="EXPERIMENTAL" />

WebSockets are a communication protocol that allows real-time, two-way interaction between your application and your users. Unlike traditional HTTP requests, where the user has to keep making requests to your app for updates, WebSockets create a persistent connection. Once connected, both your application and users can send and receive messages instantly, without needing to refresh or request new data. This is super useful for real-time apps like chat apps, live updates, or multiplayer games!

Eien allows you to create WebSocket routes in your Leaf app using a familiar syntax. You can create a WebSocket route just like you would create a regular route, and Eien will handle the rest. Here's an example of a simple WebSocket route:

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->ws('/ws-route', function () {
  response()->json([
    'message' => 'Hello from websocket'
  ]);
});

app()->run();
```

In this example, we create a WebSocket route at `/ws-route` that returns a JSON response with a message. You can create as many WebSocket routes as you want, and Eien will handle them all automatically.

*This page will be updated as Eien is developed further.*
