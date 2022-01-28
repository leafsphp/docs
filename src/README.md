---
home: true
heroImage: /logo-circle.png
heroText: Leaf 3.0
tagline: Simple and elegant PHP
topBanner: true
actionButtons:
  - text: Get Started
    link: /docs/introduction/
  - text: GitHub
    link: https://github.com/leafsphp/leaf/tree/v3.x
    extraClass: github grey
    icon: fa fa-github
    target: _blank
features:
  - title: Approachable 👨🏾‍🏫
    details: Builds on top of standard PHP with a flexible learning curve + ZERO config.
  - title: Versatile ☃️
    details: A rich, incrementally adoptable ecosystem of modules to build powerful apps with.
  - title: Efficient ⏰
    details: |
      Blazing Fast<br>
      < 40KB Source<br>
      Crazy development time
footer: |
  Released under the <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener">MIT License</a><br>
  Copyright © 2019-2021 Michael Darko-Duodu
socialIcons:
  - type: GitHub
    link: https://github.com/leafsphp/leaf/tree/v3.x
  - type: Twitter
    link: https://twitter.com/leafphp
---

# New in v3

## Modules

Modules are pieces of leaf's functionality that can be separately installed, maintained, edited, ... If you've read this far, you've probably seen the benefits of modules, however, there's more.

- Modules are serve-yourself installable features, which means you can install only the features you need in your app which will help you minimize the unused, but loaded code in your app which generally leads to a performance boost.
- With modules, you can receive updates for only a particular feature in your app without having to update the whole framework. This means that you can easily receive security fixes, new features or even install a particular version of a module you are used to.
- Modules are framework/library agnostic, which means you can incrementally add leaf and its features to your application till you are ready to make a complete switch.

<br />
<br />
<br />

## Functional Mode

Functional mode is basically a bunch of global functions which
allows you to build cleanly and seamlessly without initializing
any package or without any namespaces.

Leaf 3 comes with a few functions, however, Leaf 3 modules can
extend Functional mode and add additional globals to your leaf
app.

A simple Functional mode app will look something like this:

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  response()->json(['name' => 'Leaf']);
});

app()->run();
```

## Env precedence

Unlike in earlier versions, Leaf 3 gives the environment variable topmost priority, even over config done by the user. This allows you to seamlessly configure your application in your `.env` file and not have to worry about conflicting config in your application.

## Env conditions

This new feature allows you to run code in a particular mode of your application like production or development. Application modes are usally production or development, but can be set to any value at all. Using the `script` method, you can set functions which will only run in a particular app mode.

```php
app()->config('mode', 'production');

app()->script('production', function () {
  // will only run in production
});
```

## Leaf Anchor

Leaf now comes with a security module which takes care of protecting your apps and users from common security vulnerabilities out of the box. Security is a big concern in Leaf 3, as it builds upon systems created in v2. Leaf Anchor takes care of things like XSS, CSRF and sanitizes data so you can comfortably use "unsafe" functions like `echo` and not have any problems.

## Nested + Grouped config

Leaf config has gone through some amazing changes under the hood. On the surface, nothing much has happened, and you can still continue to use Leaf Config just as you've always done. v3 of Leaf brings in nested config which is a simpler way of grouping related configurations under one key.

Nested config creates arrays under a key instead of keeping config in a flat array. This allows you to return a particular config group like this:

```php
<?php

$appConfig = app()->config('app');
// ['instance' => ..., 'container' => ..., 'down' => false]
```

To get an array item, you can use `.`. To get app instance, you'll need to use `app.instance`

```php
<?php

$appInstance = app()->config('app.instance');
```

## Leaf CLI 2

Along with Leaf 3, we shipped leaf CLI 2 which is a complete rewrite of the earlier v1. Leaf CLI is a simple, fast and very easy to use console tool for creating and managing your leaf apps. Leaf CLI 2 is completely powered by composer which makes it faster and more stable than the earlier v1.

![image](https://user-images.githubusercontent.com/26604242/151559420-3750c9cb-991a-4744-a9ff-de3afeac28fa.png)

You can find the complete guide on [cli.leafphp.dev](https://cli.leafphp.dev)

## Redesigned Pages

Leaf 3 comes in with a fresh theme, different logo and a new colour swatch. This is to show usability and change things up in v3. Following our rebrand, our docs and internal pages: welcome, error pages and down pages.

<div class="flex" style="flex-wrap: wrap;">
  <div class="w:50">
    <b>Welcome page</b>
    <img style="border: 1px solid grey;" src="https://user-images.githubusercontent.com/26604242/139909661-ef99b500-9953-4e7f-a5b1-107ab6d547f2.png" />
  </div>
  <div class="w:50">
    <b>App down</b>
    <img style="border: 1px solid grey;" src="https://user-images.githubusercontent.com/26604242/140499572-e2100b9d-b53e-4beb-92e9-c0dab2425678.png" />
  </div>
  <div class="w:50">
    <b>Error (debug)</b>
    <img style="border: 1px solid grey;" src="https://user-images.githubusercontent.com/26604242/151439033-ea78e690-5e7d-494c-b6d4-cc3289cf1c29.png" />
  </div>
  <div class="w:50">
    <b>Error (no debug)</b>
    <img style="border: 1px solid grey;" src="https://user-images.githubusercontent.com/26604242/140498948-887a408d-5d14-4f3e-b18f-d2f09a5977fe.png" />
  </div>
  <div class="w:50">
    <b>Error 404</b>
    <img style="border: 1px solid grey;" src="https://user-images.githubusercontent.com/26604242/140499171-e157e2c6-4dfb-424a-bb08-3e43a4b240f8.png" />
  </div>
</div>
