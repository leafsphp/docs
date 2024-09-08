# Hello there 👋

Leaf is a slim and lightweight PHP framework focused on developer experience, usability, and high-performance code. It is a modern PHP framework built to be simple and elegant, yet extremely powerful.

<!-- markdownlint-disable no-inline-html -->

<script setup>
import Card from '@theme/components/shared/Card.vue'
</script>

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  response()->json(['message' => 'Hello World!']);
});

app()->run();
```

Writing code should be simple and fun, and that's what Leaf is all about.

Leaf is built to be modular, so you can use only what you need. There's no need to learn a whole new framework to use Leaf, just familiarize yourself with the core concepts and you're good to go. This makes Leaf a great choice for both beginners and experienced developers.

Ready to get started? Check out the [installation guide](/docs/installation) to get Leaf up and running in no time. You can also check out the [interactive tutorial](/tutorial/) to learn more about Leaf's core concepts and features.

## Getting Started

<div class="grid grid-cols-3 gap-2">
  <Card class="p-6 docs-section-card">
  <h3 class="!text-lg">Hello Leaf 🍃</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Let's get you up and running</p>

  <ul>
    <li><a href="/docs/installation">Installation</a></li>
    <li><a href="/docs/docker">Using Docker</a></li>
    <li><a href="/docs/leaf-cli">Leaf CLI</a></li>
    <li><a href="/docs/migrating">Migrating from other frameworks</a></li>
  </ul>
  </Card>

  <Card class="p-6 docs-section-card">
  <h3 class="!text-lg">Learning to walk 🚶</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Learn the core concepts of Leaf</p>

  <ul>
    <li><a href="/docs/routing/">Routing</a></li>
    <li><a href="/docs/http/request">Request</a></li>
    <li><a href="/docs/http/response">Response</a></li>
  </ul>
  </Card>

  <Card class="p-6 docs-section-card">
  <h3 class="!text-lg">Pro walking now 🏃‍♂️</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Beginner concepts that make you feel like pro</p>

  <ul>
    <li><a href="/docs/http/cors">CORS</a></li>
    <li><a href="/docs/routing/middleware">Middleware</a></li>
    <li><a href="/docs/http/headers">Headers</a></li>
  </ul>
  </Card>
</div>

## Config & Deployment

<div class="grid grid-cols-3 gap-2">
  <Card class="p-6 docs-section-card">
  <h3 class="!text-lg">Configuring Leaf ⚙️</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Setting up Leaf</p>

  <ul>
    <li><a href="/docs/config/">Configuring Leaf</a></li>
    <li><a href="/docs/config/environment">Environment Variables</a></li>
    <li><a href="/docs/config/container">Dependency Injection</a></li>
    <li><a href="/docs/routing/error-handling">Error Handling</a></li>
    <li><a href="/docs/config/debugging">Debugging</a></li>
  </ul>
  </Card>

  <Card class="p-6 docs-section-card">
  <h3 class="!text-lg">Deployment 🚀</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Deploying your Leaf app</p>

  <ul>
    <li><a href="/docs/config/deployment">Deployment</a></li>
    <li><a href="/docs/utils/logging">Logging</a></li>
    <li><a href="/docs/routing/url-rewriting">Url rewriting</a></li>
  </ul>
  </Card>
</div>

## Data Handling

<div class="grid grid-cols-3 gap-2">
  <Card class="p-6 docs-section-card">
  <h3 class="!text-lg">Databases 🔐</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Store/Retrieve data on the fly</p>

  <ul>
    <li><a href="/docs/database/">Database</a></li>
    <li><a href="/docs/database/redis">Redis</a></li>
    <li><a href="/docs/database/others">Other DB Engines</a></li>
  </ul>
  </Card>

  <Card class="p-6 docs-section-card">
  <h3 class="!text-lg">Using Data 🗄️</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Play around with data</p>

  <ul>
    <li><a href="/docs/http/session">Sessions</a></li>
    <li><a href="/docs/http/cookies">Cookies</a></li>
    <li><a href="/docs/auth/">Authentication</a></li>
  </ul>
  </Card>

  <Card class="p-6 docs-section-card">
  <h3 class="!text-lg">Validation 🛡️</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Make sure data is what you expect</p>

  <ul>
    <li><a href="/docs/data/validation">Validation</a></li>
    <li><a href="/docs/data/encryption">Encryption</a></li>
  </ul>
  </Card>
</div>

## Digging Deeper

<div class="grid grid-cols-3 gap-2">
  <Card class="p-6 docs-section-card">
  <h3 class="!text-lg">Frontend 🎨</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Frontend development with Leaf</p>

  <ul>
    <li><a href="/docs/frontend/">Frontend</a></li>
    <li><a href="/docs/frontend/bareui">Bare UI</a></li>
    <li><a href="/docs/http/caching">Http Caching</a></li>
  </ul>
  </Card>

  <Card class="p-6 docs-section-card">
  <h3 class="!text-lg">Utilities 🧹</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Everyday necessities for your apps</p>

  <ul>
    <li><a href="/docs/utils/fs">File System Ops</a></li>
    <li><a href="/docs/utils/mail">Mailing</a></li>
    <li><a href="/docs/utils/fetch">Data Fetching</a></li>
    <li><a href="/docs/utils/date">Date & Time</a></li>
  </ul>
  </Card>

  <Card class="p-6 docs-section-card">
  <h3 class="!text-lg">Vulnerability Protection 🛡️</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Protect your app from vulnerabilities</p>

  <ul>
    <li><a href="/docs/security/anchor">Leaf Anchor</a></li>
  </ul>
  </Card>
</div>

## MVC

<div class="grid grid-cols-3 gap-2">
  <Card class="p-6 docs-section-card">
  <h3 class="!text-lg">Leaf MVC 🌿</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Building apps with Leaf MVC</p>

  <ul>
    <li><a href="/docs/mvc/">Leaf MVC</a></li>
    <li><a href="/docs/mvc/controllers">Controllers</a></li>
    <li><a href="/docs/mvc/models">Models</a></li>
    <li><a href="/docs/mvc/views">Views</a></li>
    <li><a href="/docs/mvc/config">Leaf MVC config</a></li>
  </ul>
  </Card>

  <Card class="p-6 docs-section-card">
  <h3 class="!text-lg">Database 🗄️</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Database operations in Leaf MVC</p>

  <ul>
    <li><a href="/docs/mvc/migrations">Migrations</a></li>
    <li><a href="/docs/mvc/schema">Schema</a></li>
    <li><a href="/docs/mvc/seeders">Seeders</a></li>
    <li><a href="/docs/mvc/factories">Factories</a></li>
  </ul>
  </Card>

  <Card class="p-6 docs-section-card">
  <h3 class="!text-lg">Console 🖥️</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Building apps with Leaf</p>

  <ul>
    <li><a href="/docs/mvc/mailing">Mailing</a></li>
    <li><a href="/docs/mvc/helpers">MVC Helpers</a></li>
    <li><a href="/docs/mvc/custom-libraries">Custom Libraries</a></li>
    <li><a href="/docs/mvc/console-tool">MVC Console Tool</a></li>
    <li><a href="/docs/mvc/commands">Writing Commands</a></li>
  </ul>
  </Card>
</div>
<!-- - Swoole
- Queues
- Testing -->
<!-- - Rate Limiting -->
<!-- - Websockets -->
<!-- - Events -->
<!-- - Caching -->
<!-- - Testing -->
<!-- - Localization -->
<!-- - File Storage -->
<!-- - Cron Jobs -->
<!-- - Webhooks -->
<!-- - API Versioning -->
<!-- - Pagination -->
<!-- - Search -->
