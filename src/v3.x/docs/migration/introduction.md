# Introduction

::: info
New to Leaf PHP? Check out our [Essentials Guide](/v3.x/docs/introduction.html) to get started.
:::

This guide is primarily for users with prior Leaf 2 experience who want to learn about the new features and changes in Leaf 3. **This is not something you have to read from top to bottom before trying out Leaf 3.** While it looks like a lot has changed, a lot of what you know and love about Leaf is still the same; but we wanted to be as thorough as possible and provide detailed explanations and examples for every documented change.

- [Quickstart](#quickstart)
- [Breaking Changes](#breaking-changes)
- [Notable New Features](#notable-new-features)
- [Supporting Libraries](#supporting-libraries)

<!-- ## Overview

<br>
<iframe src="https://player.vimeo.com/video/440868720" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>

Start learning Leaf 3 at [Leaf Mastery](https://www.Leafmastery.com/courses-path/Leaf3). -->

## Quickstart

If you want to quickly try out Leaf 3 in a new project:

```sh
composer require leafs/leaf dev-v3.x-dev
```

This will quickly setup leaf 3 with the default modules. From there, create your `index.php` file and add this quickstart.

```php
<?php

require __DIR__ . "/vendor/autoload.php";

app()->get("/", function () {
  response(["name" => "Mychi"]);
});

app()->run();
```

You can run this with the built in php server

```sh
php -S localhost:5500
```

### Migrating from leaf 2

As mentioned before, we've made leaf 3 as backwards compatible with Leaf 2.5+ as possible. This means that moving from v2 to v3 will be a breeze or close.

::: warning
Note that leaf 3 is still under active development. We don't recommend switching to Leaf 3 yet for production ready apps. You can go ahead if it's a personal project or just want to try out leaf 3.
:::

- Install leaf 3

```sh
composer require leafs/leaf dev-v3.x-dev
```

> You can delete your vendor folder before running the command above to make sure that all the dependencies are accurately reinstalled.

- After this, it's just a matter of installing the modules required in your project.
For example, if you use `Leaf\Auth`, you will need to install the auth module. This can be done with:

```sh
composer require leafs/auth
```

Just do this for all other modules in your project. And your app should be back online, working even faster than before.

## Breaking Changes

The following consists a list of breaking changes from 2.x:

### Global API

- [Global Leaf API is changed to use an application instance](/v3.x/docs/migration/global-api.html)
- [Global and internal APIs have been restructured to be tree-shakable](/v3.x/docs/migration/global-api-treeshaking.html)

### Template Directives

- [`v-model` usage on components has been reworked, replacing `v-bind.sync`](/v3.x/docs/migration/v-model.html)
- [`key` usage on `<template v-for>` and non-`v-for` nodes has changed](/v3.x/docs/migration/key-attribute.html)
- [`v-if` and `v-for` precedence when used on the same element has changed](/v3.x/docs/migration/v-if-v-for.html)
- [`v-bind="object"` is now order-sensitive](/v3.x/docs/migration/v-bind.html)
- [`v-on:event.native` modifier has been removed](./v-on-native-modifier-removed.md)
- [`ref` inside `v-for` no longer register an array of refs](/v3.x/docs/migration/array-refs.html)

### Components

- [Functional components can only be created using a plain function](/v3.x/docs/migration/functional-components.html)
- [`functional` attribute on single-file component (SFC) `<template>` and `functional` component option are deprecated](/v3.x/docs/migration/functional-components.html)
- [Async components now require `defineAsyncComponent` method to be created](/v3.x/docs/migration/async-components.html)
- [Component events should now be declared with the `emits` option](./emits-option.md)

### Render Function

- [Render function API changed](/v3.x/docs/migration/render-function-api.html)
- [`$scopedSlots` property is removed and all slots are exposed via `$slots` as functions](/v3.x/docs/migration/slots-unification.html)
- [`$listeners` has been removed / merged into `$attrs`](./listeners-removed)
- [`$attrs` now includes `class` and `style` attributes](./attrs-includes-class-style.md)

### Custom Elements

- [Custom element checks are now performed during template compilation](/v3.x/docs/migration/custom-elements-interop.html)
- [Special `is` attribute usage is restricted to the reserved `<component>` tag only](/v3.x/docs/migration/custom-elements-interop.html#customized-built-in-elements)

### Other Minor Changes

- The `destroyed` lifecycle option has been renamed to `unmounted`
- The `beforeDestroy` lifecycle option has been renamed to `beforeUnmount`
- [Props `default` factory function no longer has access to `this` context](/v3.x/docs/migration/props-default-this.html)
- [Custom directive API changed to align with component lifecycle and `binding.expression` removed](/v3.x/docs/migration/custom-directives.html)
- [The `data` option should always be declared as a function](/v3.x/docs/migration/data-option.html)
- [The `data` option from mixins is now merged shallowly](/v3.x/docs/migration/data-option.html#mixin-merge-behavior-change)
- [Attributes coercion strategy changed](/v3.x/docs/migration/attribute-coercion.html)
- [Some transition classes got a rename](/v3.x/docs/migration/transition.html)
- [`<TransitionGroup>` now renders no wrapper element by default](/v3.x/docs/migration/transition-group.html)
- [When watching an array, the callback will only trigger when the array is replaced. If you need to trigger on mutation, the `deep` option must be specified.](/v3.x/docs/migration/watch.html)
- `<template>` tags with no special directives (`v-if/else-if/else`, `v-for`, or `v-slot`) are now treated as plain elements and will result in a native `<template>` element instead of rendering its inner content.
- [Mounted application does not replace the element it's mounted to](/v3.x/docs/migration/mount-changes.html)
- [Lifecycle `hook:` events prefix changed to `vnode-`](/v3.x/docs/migration/vnode-lifecycle-events.html)

### Removed APIs

- [`keyCode` support as `v-on` modifiers](/v3.x/docs/migration/keycode-modifiers.html)
- [$on, $off and \$once instance methods](/v3.x/docs/migration/events-api.html)
- [Filters](/v3.x/docs/migration/filters.html)
- [Inline templates attributes](/v3.x/docs/migration/inline-template-attribute.html)
- [`$children` instance property](/v3.x/docs/migration/children.html)
- [`propsData` option](/v3.x/docs/migration/props-data.html)
- `$destroy` instance method. Users should no longer manually manage the lifecycle of individual Leaf components.
- Global functions `set` and `delete`, and the instance methods `$set` and `$delete`. They are no longer required with proxy-based change detection.

## Supporting Libraries

All of our official libraries and tools now support Leaf 3, but some of them are still in beta or release candidate status. You'll find details for the individual libraries below. Most are currently distributed using the `next` dist tag on npm. We intend to switch to `latest` once all the official libraries have compatible, stable versions.

### Leaf CLI

<a href="https://www.npmjs.com/package/@Leaf/cli" target="_blank" noopener noreferrer><img src="https://img.shields.io/npm/v/@Leaf/cli"></a>

As of v4.5.0, `Leaf-cli` now provides the built-in option to choose Leaf 3 when creating a new project. You can upgrade `Leaf-cli` and run `Leaf create` to create a Leaf 3 project today.

- [Documentation](https://cli.leafphp.org/)
- [GitHub](https://github.com/leafphp/Leaf-cli)

### Leaf Router

<a href="https://www.npmjs.com/package/Leaf-router/v/next" target="_blank" noopener noreferrer><img src="https://img.shields.io/npm/v/Leaf-router/next.svg"></a>

Leaf Router 4.0 provides Leaf 3 support and has a number of breaking changes of its own. Check out its [migration guide](https://next.router.leafphp.org/v3.x/docs/migration/) for full details.

- [Documentation](https://next.router.leafphp.org/)
- [GitHub](https://github.com/leafphp/Leaf-router-next)
- [RFCs](https://github.com/leafphp/rfcs/pulls?q=is%3Apr+is%3Amerged+label%3Arouter)

### Leafx

<a href="https://www.npmjs.com/package/Leafx/v/next" target="_blank" noopener noreferrer><img src="https://img.shields.io/npm/v/Leafx/next.svg"></a>

Leafx 4.0 provides Leaf 3 support with largely the same API as 3.x. The only breaking change is [how the plugin is installed](https://next.Leafx.leafphp.org/v3.x/docs/migrating-to-4-0-from-3-x.html#breaking-changes).

- [Documentation](https://next.Leafx.leafphp.org/)
- [GitHub](https://github.com/leafphp/Leafx/tree/4.0)

### Devtools Extension

We are working on a new version of the Devtools with a new UI and refactored internals to support multiple Leaf versions. The new version is currently in beta and only supports Leaf 3 (for now). Leafx and Router integration is also work in progress.

- For Chrome: [Install from Chrome web store](https://chrome.google.com/webstore/detail/leafphp-devtools/ljjemllljcmogpfapbkkighbhhppjdbg?hl=en)

  - Note: the beta channel may conflict with the stable version of devtools so you may need to temporarily disable the stable version for the beta channel to work properly.

- For Firefox: [Download the signed extension](https://github.com/leafphp/Leaf-devtools/releases/tag/v6.0.0-beta.2) (`.xpi` file under Assets)


## Notable New Features

Some of the new features to keep an eye on in Leaf 3 include:

- [Composition API](/v3.x/docs/composition-api-introduction.html)
- [Teleport](/v3.x/docs/teleport.html)
- [Fragments](/v3.x/docs/migration/fragments.html)
- [Emits Component Option](/v3.x/docs/component-custom-events.html)
- [`createRenderer` API from `@Leaf/runtime-core`](https://github.com/leafphp/Leaf-next/tree/master/packages/runtime-core) to create custom renderers
- [SFC Composition API Syntax Sugar (`<script setup>`)](/api/sfc-script-setup.html)
- [SFC State-driven CSS Variables (`v-bind` in `<style>`)](/api/sfc-style.html#state-driven-dynamic-css)
- [SFC `<style scoped>` can now include global rules or rules that target only slotted content](https://github.com/leafphp/rfcs/blob/master/active-rfcs/0023-scoped-styles-changes.md)
- [Suspense](/v3.x/docs/migration/suspense.html) <Badge text="experimental" type="warning" />

::: info
For additional information on Leaf 3 compatibility with libraries and plugins, be sure to check out [this issue in awesome-Leaf](https://github.com/leafphp/awesome-Leaf/issues/3544).
:::
