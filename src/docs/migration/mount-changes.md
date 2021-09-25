---
title: 'Mount API changes'
badges:
  - breaking
---

# Mounted application does not replace the element <MigrationBadges :badges="$frontmatter.badges" />

## Overview

In Leaf 2.x, when mounting an application that has a `template`, the rendered content replaces the element we mount to. In Leaf 3.x, the rendered application is appended as a child of such an element, replacing element's `innerHTML`.

## 2.x Syntax

In Leaf 2.x, we pass an HTML element selector to `new Leaf()` or `$mount`:

```js
new Leaf({
  el: '#app',
  data() {
    return {
      message: 'Hello Leaf!'
    }
  },
  template: `
    <div id="rendered">{{ message }}</div>
  `
})

// or
const app = new Leaf({
  data() {
    return {
      message: 'Hello Leaf!'
    }
  },
  template: `
    <div id="rendered">{{ message }}</div>
  `
})

app.$mount('#app')
```

When we mount this application to the page that has a `div` with the passed selector (in our case, it's `id="app"`):

```html
<body>
  <div id="app">
    Some app content
  </div>
</body>
```

in the rendered result, the mentioned `div` will be replaced with the rendered application content:

```html
<body>
  <div id="rendered">Hello Leaf!</div>
</body>
```

## 3.x Syntax

In Leaf 3.x, when we mount an application, its rendered content will replace the `innerHTML` of the element we pass to `mount`:

```js
const app = Leaf.createApp({
  data() {
    return {
      message: 'Hello Leaf!'
    }
  },
  template: `
    <div id="rendered">{{ message }}</div>
  `
})

app.mount('#app')
```

When this app is mounted to the page that has a `div` with `id="app"`, this will result in:

```html
<body>
  <div id="app" data-v-app="">
    <div id="rendered">Hello Leaf!</div>
  </div>
</body>
```

## Migration Strategy

[Migration build flag: `GLOBAL_MOUNT_CONTAINER`](migration-build.html#compat-configuration)

## See Also

- [`mount` API](/api/application-api.html#mount)
