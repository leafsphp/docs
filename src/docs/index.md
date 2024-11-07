# Hello there 👋

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoModal from '@theme/components/shared/VideoModal.vue';
import Card from '@theme/components/shared/Card.vue';
</script>

Leaf is a slim and lightweight PHP framework focused on developer experience, usability, and high-performance code. It is a modern PHP framework built to be simple and elegant, yet extremely powerful.

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  response()->json(['message' => 'Hello World!']);
});

app()->run();
```

Writing code should be simple and fun, and that's what Leaf is all about.

## Why Leaf?

PHP frameworks often come with a steep learning curve, performance overhead, and strict conventions, which can complicate maintenance and limit flexibility amongst other issues like bloat. Leaf addresses these challenges by offering a range of features designed to make web development easier and more enjoyable:

- Leaf is beginner-friendly, enabling PHP newcomers to build powerful apps within minutes. All you need is basic PHP knowledge and, optionally, some backend web dev familiarity.

- Leaf is lightweight and blazing fast with a minimal core and a load of optional modules for building full apps and APIs efficiently, offering high performance and low memory usage.

- Leaf is built to enhance developer focus, offering features like class-free initializers and global functions for easy access to classes across your app, creating an optimized PHP developer experience.

- Leaf is designed for seamless integration with other libraries and frameworks, prioritizing simplicity over complex setups like providers needed by other frameworks.

- Leaf is highly scalable, and grows with your project. Its core and ecosystem of libraries make it ideal for projects of any size.

<!-- Leaf is built to be modular, so you can use only what you need. There's no need to learn a whole new framework to use Leaf, just familiarize yourself with the core concepts and you're good to go. This makes Leaf a great choice for both beginners and experienced developers. -->

## How to Use These Docs

On the left side of the screen, you'll find the docs navbar. The pages of the docs are organized sequentially, from basic to advanced, so you can follow them step-by-step when building your application. However, you can read them in any order or skip to the pages that apply to your use case.

On the right side of the screen, you'll see a table of contents that makes it easier to navigate between sections of a page. If you need to quickly find a page, you can use the search bar at the top, or the search shortcut (Ctrl+K or Cmd+K).

To get started, check out the [Installation guide](/docs/installation).

## Pre-Requisite Knowledge

Although our docs are designed to be beginner-friendly, we need to establish a baseline so that the docs can stay focused on Leaf's functionality. We assume you have a basic understanding of PHP and it's syntax, as well as a little familiarity with web development concepts like HTTP, routing, and middleware.

Don't worry if you're not familiar with these concepts, we'll provide videos and links to relevant documentation whenever we introduce a new concept like the one below:

<VideoModal
  buttonText="PHP Tutorial for Beginners"
  description="This video is a PHP tutorial for beginners. It covers the basics of PHP and is a great starting point for anyone new to the language."
  videoUrl="https://www.youtube.com/embed/OK_JCtrrv-c"
/>

## Functions vs Class Mode

Leaf is built with many classes and components, but for simpler apps or APIs, it also offers a functional mode. This lets you use Leaf and its modules without class imports, instantiation, or lengthy namespaces—keeping things simple and streamlined.

Of course, you can still use Leaf in class mode if you prefer that. Here's an example of a simple Leaf app in functional mode:

```php
<?php

use Leaf\App;

require __DIR__ . '/vendor/autoload.php';

$app = new App;

$app->get('/', function () use ($app) {
  $app->response()->json(['message' => 'Leaf is amazing!']);
});

$app->run();
```

The documentation will usually show you how to use modules in functional mode as this is the default mode for Leaf. However, if you are migrating from another framework or you prefer to use Leaf in class mode, you can always instantiate the classes and use them as you would in any other framework.

## Getting Started

Ready to get started? Check out the [installation guide](/docs/installation) to get Leaf up and running in no time. You can also check out the [interactive tutorial](/tutorial/) to learn more about Leaf's core concepts and features.

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
  <Card class="p-6 docs-section-card hover:!border-[var(--vp-c-border-alt)]">
  <h3 class="!text-lg">Hello Leaf 🍃</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Let's get you up and running</p>

  <ul>
    <li><a href="/docs/installation">Installation</a></li>
    <li><a href="/docs/cli">Leaf CLI</a></li>
    <li><a href="/docs/migrating">Migrating from other frameworks</a></li>
  </ul>
  </Card>

  <Card class="p-6 docs-section-card hover:!border-[var(--vp-c-border-alt)]">
  <h3 class="!text-lg">Learning to walk 🚶</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Learn the core concepts of Leaf</p>

  <ul>
    <li><a href="/docs/routing/">Routing</a></li>
    <li><a href="/docs/http/request">Request</a></li>
    <li><a href="/docs/http/response">Response</a></li>
  </ul>
  </Card>

  <Card class="p-6 docs-section-card hover:!border-[var(--vp-c-border-alt)]">
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

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
  <Card class="p-6 docs-section-card hover:!border-[var(--vp-c-border-alt)]">
  <h3 class="!text-lg">Configuring Leaf ⚙️</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Setting up Leaf</p>

  <ul>
    <li><a href="/docs/config/">Configuring Leaf</a></li>
    <li><a href="/docs/config/environment">Env Variables</a></li>
    <li><a href="/docs/routing/error-handling">Error Handling</a></li>
  </ul>
  </Card>

  <Card class="p-6 docs-section-card hover:!border-[var(--vp-c-border-alt)]">
  <h3 class="!text-lg">Deployment 🚀</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Deploying your Leaf app</p>

  <ul>
    <!-- <li><a href="/docs/config/deployment">Deployment</a></li>
    <li><a href="/docs/utils/logging">Logging</a></li> -->
    <li><a href="/docs/config/debugging">Debugging</a></li>
    <li><a href="/docs/routing/url-rewriting">Url rewriting</a></li>
  </ul>
  </Card>
</div>

## Data Handling

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
  <Card class="p-6 docs-section-card hover:!border-[var(--vp-c-border-alt)]">
  <h3 class="!text-lg">Databases 🔐</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Store and Retrieve data on the fly</p>

  <ul>
    <li><a href="/docs/database/">Database</a></li>
    <li><a href="/docs/database/redis">Redis</a></li>
    <!-- <li><a href="/docs/database/others">Other DB Engines</a></li> -->
  </ul>
  </Card>

  <Card class="p-6 docs-section-card hover:!border-[var(--vp-c-border-alt)]">
  <h3 class="!text-lg">Using Data 🗄️</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Play around with data in your app</p>

  <ul>
    <li><a href="/docs/http/session">Sessions</a></li>
    <li><a href="/docs/http/cookies">Cookies</a></li>
    <li><a href="/docs/auth/">Authentication</a></li>
  </ul>
  </Card>

  <Card class="p-6 docs-section-card hover:!border-[var(--vp-c-border-alt)]">
  <h3 class="!text-lg">Validation 🛡️</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Make sure your data isn't exploitable</p>

  <ul>
    <li><a href="/docs/data/validation">Validation</a></li>
    <li><a href="/docs/data/encryption">Encryption</a></li>
    <li><a href="/docs/security/anchor">Leaf Anchor</a></li>
  </ul>
  </Card>
</div>

## Digging Deeper

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
  <Card class="p-6 docs-section-card hover:!border-[var(--vp-c-border-alt)]">
  <h3 class="!text-lg">Frontend 🎨</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Frontend development with Leaf</p>

  <ul>
    <li><a href="/docs/frontend/">Frontend</a></li>
    <li><a href="/docs/frontend/bareui">Bare UI</a></li>
    <li><a href="/docs/frontend/vite">Vite</a></li>
    <li><a href="/docs/http/tailwind">Tailwind CSS</a></li>
  </ul>
  </Card>

  <Card class="p-6 docs-section-card hover:!border-[var(--vp-c-border-alt)]">
  <h3 class="!text-lg">Utilities 🧹</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Everyday necessities for your apps</p>

  <ul>
    <li><a href="/docs/utils/fs">File System Ops</a></li>
    <li><a href="/docs/utils/mail">Mailing</a></li>
    <li><a href="/docs/utils/fetch">Data Fetching</a></li>
    <li><a href="/docs/utils/date">Date & Time</a></li>
  </ul>
  </Card>
</div>

## MVC

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
  <Card class="p-6 docs-section-card hover:!border-[var(--vp-c-border-alt)]">
  <h3 class="!text-lg">Leaf MVC 🌿</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Building apps with Leaf MVC</p>

  <ul>
    <li><a href="/docs/mvc/">Leaf MVC</a></li>
    <li><a href="/docs/mvc/controllers">Controllers</a></li>
    <li><a href="/docs/database/models">Models</a></li>
    <li><a href="/docs/frontend/">Views</a></li>
  </ul>
  </Card>

  <Card class="p-6 docs-section-card hover:!border-[var(--vp-c-border-alt)]">
  <h3 class="!text-lg">Database 🗄️</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Database operations in Leaf MVC</p>

  <ul>
    <li><a href="/docs/database/migrations">Migrations</a></li>
    <li><a href="/docs/database/schema">Schema</a></li>
    <li><a href="/docs/database/seeders">Seeders</a></li>
    <li><a href="/docs/database/factories">Factories</a></li>
  </ul>
  </Card>

  <Card class="p-6 docs-section-card hover:!border-[var(--vp-c-border-alt)]">
  <h3 class="!text-lg">Other Helpers 🖥️</h3>
  <p class="text-sm text-[var(--vp-c-text-2)] !m-0">Make building MVC apps even easier</p>

  <ul>
    <li><a href="/docs/mvc/globals">MVC Helpers</a></li>
    <li><a href="/docs/mvc/libraries">Custom Libraries</a></li>
    <li><a href="/docs/mvc/console">MVC Console Tool</a></li>
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
