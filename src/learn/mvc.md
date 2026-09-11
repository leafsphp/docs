---
next: false
prev: false
---

# Build with Leaf MVC

<!-- markdownlint-disable no-inline-html -->

When your app needs separate places for routes, request handling, data, and templates, start with Leaf MVC. It uses the same Leaf APIs as the basic setup, with a directory structure for organizing your code.

<script setup>
import Quickstart from '@theme/components/Docs/Quickstart.vue';
</script>

<Quickstart mvc />

Building a small API or a few pages? The [basic setup](/learn/basic) is a simpler starting point.

## Your first controller and route

Controllers group the methods that handle requests. Create one for users:

```bash:no-line-numbers
leaf g:controller users
```

This creates `app/controllers/UsersController.php`. Its `index()` method can return a JSON response:

```php
<?php

namespace App\Controllers;

class UsersController extends Controller
{
    public function index()
    {
        return response()->json([
            'message' => 'Hello from Leaf MVC'
        ]);
    }
}
```

Add a route in `app/routes/index.php` to call that method:

```php:no-line-numbers
app()->get('/users', 'UsersController@index');
```

Visit `http://localhost:5500/users` to see the response. Leaf matches the URL, calls `UsersController::index()`, and sends the JSON back to the browser.

## Where your code goes

The main application folders are:

```text
app/
├── controllers/
├── database/
├── models/
├── routes/
└── views/
public/
```

Routes map URLs to controller methods. Controllers handle the request, use models to work with data, and return a response. For HTML pages, templates live in `app/views/`.

<div class="docs-paths not-prose my-6">
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">01 / Model</span>
    <strong class="docs-path-title">Work with your data</strong>
    <span class="docs-path-description">Put model classes in app/models and database migrations in app/database.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">02 / View</span>
    <strong class="docs-path-title">Render a page</strong>
    <span class="docs-path-description">Keep page templates in app/views and serve assets from public.</span>
  </div>
  <div class="docs-path-card docs-path-card--static">
    <span class="docs-path-index">03 / Controller</span>
    <strong class="docs-path-title">Handle the request</strong>
    <span class="docs-path-description">Group related actions in app/controllers and connect them to routes.</span>
  </div>
</div>

As your route list grows, you can split it into files such as `_auth.php` or `_api.php` in `app/routes/`. See [MVC routing](/docs/routing/mvc) for route partials and middleware.

## Add the features you need

Use [models](/docs/database/models) for database records, [authentication](/docs/auth/) for user accounts, and [billing](/docs/utils/billing) for payments and subscriptions. Each guide covers the setup and configuration for that feature.

For the frontend, you can render templates on the server or use a JavaScript framework. The [frontend guide](/docs/frontend/) covers Blade, Inertia, and Vite integration.

## Working with an AI assistant

Leaf CLI creates `.leaf/CONTEXT.md` with context about your project. Ask your coding assistant to read it before making changes, and point it to the feature you want to work on.

For example:

> Read `.leaf/CONTEXT.md`, then add a users endpoint. Follow the existing route and controller conventions, and use the project's user model.

If your assistant cannot access the project folder, run:

```bash:no-line-numbers
leaf context
```

Paste the output along with your request. See [AI in Leaf](/docs/ai) for more on project context.

## Deploy your app

Configure your production environment and point your web server at the `public/` directory. The [deployment guide](/learn/deployment/) covers hosting options and server setup.

If you get stuck, ask in the [Leaf Discord server](https://discord.gg/Pkrm9NJPE3).

## What to read next

<div class="docs-paths docs-paths--four not-prose my-6">
  <a class="docs-path-card" href="/docs/routing/mvc">
    <span class="docs-path-index">01 / Routes</span>
    <strong class="docs-path-title">MVC routing</strong>
    <span class="docs-path-description">Connect URLs to controllers, split route files, and add middleware.</span>
    <span class="docs-path-action">Open routing <span aria-hidden="true">&rarr;</span></span>
  </a>
  <a class="docs-path-card" href="/docs/mvc/controllers">
    <span class="docs-path-index">02 / Requests</span>
    <strong class="docs-path-title">Controllers</strong>
    <span class="docs-path-description">Generate controllers and organize the actions that handle requests.</span>
    <span class="docs-path-action">Open controllers <span aria-hidden="true">&rarr;</span></span>
  </a>
  <a class="docs-path-card" href="/docs/database/models">
    <span class="docs-path-index">03 / Data</span>
    <strong class="docs-path-title">Models</strong>
    <span class="docs-path-description">Query records and define relationships between your data.</span>
    <span class="docs-path-action">Open models <span aria-hidden="true">&rarr;</span></span>
  </a>
  <a class="docs-path-card" href="/docs/frontend/">
    <span class="docs-path-index">04 / Pages</span>
    <strong class="docs-path-title">Frontend</strong>
    <span class="docs-path-description">Build pages with templates or connect a JavaScript frontend.</span>
    <span class="docs-path-action">Open frontend <span aria-hidden="true">&rarr;</span></span>
  </a>
</div>
