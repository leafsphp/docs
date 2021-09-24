# Introduction

::: info
New to Leaf PHP? Check out our [Essentials Guide](/v3.x/docs/introduction.html) to get started.
:::

This guide is primarily for users with prior Leaf 2 experience who want to learn about the new features and changes in Leaf 3. **This is not something you have to read from top to bottom before trying out Leaf 3.** While it looks like a lot has changed, a lot of what you know and love about Leaf is still the same; but we wanted to be as thorough as possible and provide detailed explanations and examples for every documented change.

- [Quickstart](#quickstart)
- [Migration Build](#migration-build)
- [Notable New Features](#notable-new-features)
- [Breaking Changes](#breaking-changes)
- [Supporting Libraries](#supporting-libraries)

## Overview

<br>
<iframe src="https://player.vimeo.com/video/440868720" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>

Start learning Leaf 3 at [Leaf Mastery](https://www.Leafmastery.com/courses-path/Leaf3).

## Quickstart

If you want to quickly try out Leaf 3 in a new project:

- Via CDN: `<script src="https://unpkg.com/Leaf@next"></script>`
- In-browser playground on [Codepen](https://codepen.io/yyx990803/pen/OJNoaZL)
- In-browser Sandbox on [CodeSandbox](https://v3.Leaf.new)
- Scaffold via [Vite](https://github.com/vitejs/vite):

  ```bash
  npm init vite hello-Leaf3 -- --template Leaf # OR yarn create vite hello-Leaf3 --template Leaf
  ```

- Scaffold via [Leaf-cli](https://cli.leafphp.org/):

  ```bash
  npm install -g @Leaf/cli # OR yarn global add @Leaf/cli
  Leaf create hello-Leaf3
  # select Leaf 3 preset
  ```

## Migration Build

If you have an existing Leaf 2 project or library that you intend to upgrade to Leaf 3, we provide a build of Leaf 3 that offers Leaf 2 compatible APIs. Check out the [Migration Build](./migration-build.html) page for more details.

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

### IDE Support

It is recommended to use [VSCode](https://code.visualstudio.com/) with our official extension [Volar](https://github.com/johnsoncodehk/volar), which provides comprehensive IDE support for Leaf 3.

### Other Projects

| Project               | npm                           | Repo                 |
| --------------------- | ----------------------------- | -------------------- |
| @Leaf/babel-plugin-jsx | [![rc][jsx-badge]][jsx-npm]   | [[GitHub][jsx-code]] |
| eslint-plugin-Leaf     | [![ga][epv-badge]][epv-npm]   | [[GitHub][epv-code]] |
| @Leaf/test-utils       | [![beta][vtu-badge]][vtu-npm] | [[GitHub][vtu-code]] |
| Leaf-class-component   | [![beta][vcc-badge]][vcc-npm] | [[GitHub][vcc-code]] |
| Leaf-loader            | [![rc][vl-badge]][vl-npm]     | [[GitHub][vl-code]]  |
| rollup-plugin-Leaf     | [![beta][rpv-badge]][rpv-npm] | [[GitHub][rpv-code]] |

[jsx-badge]: https://img.shields.io/npm/v/@Leaf/babel-plugin-jsx.svg
[jsx-npm]: https://www.npmjs.com/package/@Leaf/babel-plugin-jsx
[jsx-code]: https://github.com/leafphp/jsx-next
[vd-badge]: https://img.shields.io/npm/v/@Leaf/devtools/beta.svg
[vd-npm]: https://www.npmjs.com/package/@Leaf/devtools/v/beta
[vd-code]: https://github.com/leafphp/Leaf-devtools/tree/next
[epv-badge]: https://img.shields.io/npm/v/eslint-plugin-Leaf.svg
[epv-npm]: https://www.npmjs.com/package/eslint-plugin-Leaf
[epv-code]: https://github.com/leafphp/eslint-plugin-Leaf
[vtu-badge]: https://img.shields.io/npm/v/@Leaf/test-utils/next.svg
[vtu-npm]: https://www.npmjs.com/package/@Leaf/test-utils/v/next
[vtu-code]: https://github.com/leafphp/Leaf-test-utils-next
[jsx-badge]: https://img.shields.io/npm/v/@ant-design-Leaf/babel-plugin-jsx.svg
[jsx-npm]: https://www.npmjs.com/package/@ant-design-Leaf/babel-plugin-jsx
[jsx-code]: https://github.com/LeafComponent/jsx
[vcc-badge]: https://img.shields.io/npm/v/Leaf-class-component/next.svg
[vcc-npm]: https://www.npmjs.com/package/Leaf-class-component/v/next
[vcc-code]: https://github.com/leafphp/Leaf-class-component/tree/next
[vl-badge]: https://img.shields.io/npm/v/Leaf-loader/next.svg
[vl-npm]: https://www.npmjs.com/package/Leaf-loader/v/next
[vl-code]: https://github.com/leafphp/Leaf-loader/tree/next
[rpv-badge]: https://img.shields.io/npm/v/rollup-plugin-Leaf/next.svg
[rpv-npm]: https://www.npmjs.com/package/rollup-plugin-Leaf/v/next
[rpv-code]: https://github.com/leafphp/rollup-plugin-Leaf/tree/next

::: info
For additional information on Leaf 3 compatibility with libraries and plugins, be sure to check out [this issue in awesome-Leaf](https://github.com/leafphp/awesome-Leaf/issues/3544).
:::
