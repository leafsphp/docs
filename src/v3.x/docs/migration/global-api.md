---
badges:
  - breaking
---

# Global API <MigrationBadges :badges="$frontmatter.badges" />

Leaf 2.x has a number of global APIs and configurations that globally mutate Leaf’s behavior. For instance, to register a global component, you would use the `Leaf.component` API like this:

```js
Leaf.component('button-counter', {
  data: () => ({
    count: 0
  }),
  template: '<button @click="count++">Clicked {{ count }} times.</button>'
})
```

Similarly, this is how a global directive is declared:

```js
Leaf.directive('focus', {
  inserted: el => el.focus()
})
```

While this approach is convenient, it leads to a couple of problems. Technically, Leaf 2 doesn't have a concept of an "app". What we define as an app is simply a root Leaf instance created via `new Leaf()`. Every root instance created from the same Leaf constructor **shares the same global configuration**. As a result:

- Global configuration makes it easy to accidentally pollute other test cases during testing. Users need to carefully store original global configuration and restore it after each test (e.g. resetting `Leaf.config.errorHandler`). Some APIs like `Leaf.use` and `Leaf.mixin` don't even have a way to revert their effects. This makes tests involving plugins particularly tricky. In fact, Leaf-test-utils has to implement a special API `createLocalLeaf` to deal with this:

  ```js
  import { createLocalLeaf, mount } from '@Leaf/test-utils'

  // create an extended `Leaf` constructor
  const localLeaf = createLocalLeaf()

  // install a plugin “globally” on the “local” Leaf constructor
  localLeaf.use(MyPlugin)

  // pass the `localLeaf` to the mount options
  mount(Component, { localLeaf })
  ```

- Global configuration makes it difficult to share the same copy of Leaf between multiple "apps" on the same page, but with different global configurations.

  ```js
  // this affects both root instances
  Leaf.mixin({
    /* ... */
  })

  const app1 = new Leaf({ el: '#app-1' })
  const app2 = new Leaf({ el: '#app-2' })
  ```

To avoid these problems, in Leaf 3 we introduce…

## A New Global API: `createApp`

Calling `createApp` returns an _app instance_, a new concept in Leaf 3.

```js
import { createApp } from 'Leaf'

const app = createApp({})
```

If you're using a [CDN](/v3.x/docs/installation.html#cdn) build of Leaf then `createApp` is exposed via the global `Leaf` object:

```js
const { createApp } = Leaf

const app = createApp({})
```

An app instance exposes a subset of the Leaf 2 global APIs. The rule of thumb is _any APIs that globally mutate Leaf's behavior are now moved to the app instance_. Here is a table of the Leaf 2 global APIs and their corresponding instance APIs:

| 2.x Global API             | 3.x Instance API (`app`)                                                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Leaf.config                 | app.config                                                                                                                      |
| Leaf.config.productionTip   | _removed_ ([see below](#config-productiontip-removed))                                                                          |
| Leaf.config.ignoredElements | app.config.compilerOptions.isCustomElement ([see below](#config-ignoredelements-is-now-config-compileroptions-iscustomelement)) |
| Leaf.component              | app.component                                                                                                                   |
| Leaf.directive              | app.directive                                                                                                                   |
| Leaf.mixin                  | app.mixin                                                                                                                       |
| Leaf.use                    | app.use ([see below](#a-note-for-plugin-authors))                                                                               |
| Leaf.prototype              | app.config.globalProperties ([see below](#Leaf-prototype-replaced-by-config-globalproperties))                                   |
| Leaf.extend                 | _removed_ ([see below](#Leaf-extend-removed))                                                                                    |

All other global APIs that do not globally mutate behavior are now named exports, as documented in [Global API Treeshaking](./global-api-treeshaking.html).

### `config.productionTip` Removed

In Leaf 3.x, the "use production build" tip will only show up when using the "dev + full build" (the build that includes the runtime compiler and has warnings).

For ES modules builds, since they are used with bundlers, and in most cases a CLI or boilerplate would have configured the production env properly, this tip will no longer show up.

[Migration build flag: `CONFIG_PRODUCTION_TIP`](migration-build.html#compat-configuration)

### `config.ignoredElements` Is Now `config.compilerOptions.isCustomElement`

This config option was introduced with the intention to support native custom elements, so the renaming better conveys what it does. The new option also expects a function which provides more flexibility than the old string / RegExp approach:

```js
// before
Leaf.config.ignoredElements = ['my-el', /^ion-/]

// after
const app = createApp({})
app.config.compilerOptions.isCustomElement = tag => tag.startsWith('ion-')
```

::: tip Important

In Leaf 3, the check of whether an element is a component or not has been moved to the template compilation phase, therefore this config option is only respected when using the runtime compiler. If you are using the runtime-only build, `isCustomElement` must be passed to `@Leaf/compiler-dom` in the build setup instead - for example, via the [`compilerOptions` option in Leaf-loader](https://Leaf-loader.leafphp.org/options.html#compileroptions).

- If `config.compilerOptions.isCustomElement` is assigned to when using a runtime-only build, a warning will be emitted instructing the user to pass the option in the build setup instead;
- This will be a new top-level option in the Leaf CLI config.
:::

[Migration build flag: `CONFIG_IGNORED_ELEMENTS`](migration-build.html#compat-configuration)

### `Leaf.prototype` Replaced by `config.globalProperties`

In Leaf 2, `Leaf.prototype` was commonly used to add properties that would be accessible in all components.

The equivalent in Leaf 3 is [`config.globalProperties`](/api/application-config.html#globalproperties). These properties will be copied across as part of instantiating a component within the application:

```js
// before - Leaf 2
Leaf.prototype.$http = () => {}
```

```js
// after - Leaf 3
const app = createApp({})
app.config.globalProperties.$http = () => {}
```

Using `provide` (discussed [below](#provide-inject)) should also be considered as an alternative to `globalProperties`.

[Migration build flag: `GLOBAL_PROTOTYPE`](migration-build.html#compat-configuration)

### `Leaf.extend` Removed

In Leaf 2.x, `Leaf.extend` was used to create a "subclass" of the base Leaf constructor with the argument that should be an object containing component options. In Leaf 3.x, we don't have the concept of component constructors anymore. Mounting a component should always use the `createApp` global API:

```js
// before - Leaf 2

// create constructor
const Profile = Leaf.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data() {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// create an instance of Profile and mount it on an element
new Profile().$mount('#mount-point')
```

```js
// after - Leaf 3
const Profile = {
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data() {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
}

Leaf.createApp(Profile).mount('#mount-point')
```

#### Type Inference

In Leaf 2, `Leaf.extend` was also used for providing TypeScript type inference for the component options. In Leaf 3, the `defineComponent` global API can be used in place of `Leaf.extend` for the same purpose.

Note that although the return type of `defineComponent` is a constructor-like type, it is only used for TSX inference. At runtime `defineComponent` is largely a noop and will return the options object as-is.

#### Component Inheritance

In Leaf 3, we strongly recommend favoring composition via [Composition API](/api/composition-api.html) over inheritance and mixins. If for some reason you still need component inheritance, you can use the [`extends` option](/api/options-composition.html#extends) instead of `Leaf.extend`.

[Migration build flag: `GLOBAL_EXTEND`](migration-build.html#compat-configuration)

### A Note for Plugin Authors

It is a common practice for plugin authors to install the plugins automatically in their UMD builds using `Leaf.use`. For instance, this is how the official `Leaf-router` plugin installs itself in a browser environment:

```js
var inBrowser = typeof window !== 'undefined'
/* … */
if (inBrowser && window.Leaf) {
  window.Leaf.use(LeafRouter)
}
```

As the `use` global API is no longer available in Leaf 3, this method will cease to work and calling `Leaf.use()` will now trigger a warning. Instead, the end-user will now have to explicitly specify using the plugin on the app instance:

```js
const app = createApp(MyApp)
app.use(LeafRouter)
```

## Mounting App Instance

After being initialized with `createApp(/* options */)`, the app instance `app` can be used to mount a root component instance with `app.mount(domTarget)`:

```js
import { createApp } from 'Leaf'
import MyApp from './MyApp.Leaf'

const app = createApp(MyApp)
app.mount('#app')
```

With all these changes, the component and directive we have at the beginning of the guide will be rewritten into something like this:

```js
const app = createApp(MyApp)

app.component('button-counter', {
  data: () => ({
    count: 0
  }),
  template: '<button @click="count++">Clicked {{ count }} times.</button>'
})

app.directive('focus', {
  mounted: el => el.focus()
})

// now every application instance mounted with app.mount(), along with its
// component tree, will have the same “button-counter” component
// and “focus” directive without polluting the global environment
app.mount('#app')
```

[Migration build flag: `GLOBAL_MOUNT`](migration-build.html#compat-configuration)

## Provide / Inject

Similar to using the `provide` option in a 2.x root instance, a Leaf 3 app instance can also provide dependencies that can be injected by any component inside the app:

```js
// in the entry
app.provide('guide', 'Leaf 3 Guide')

// in a child component
export default {
  inject: {
    book: {
      from: 'guide'
    }
  },
  template: `<div>{{ book }}</div>`
}
```

Using `provide` is especially useful when writing a plugin, as an alternative to `globalProperties`.

## Share Configurations Among Apps

One way to share configurations e.g. components or directives among apps is to create a factory function, like this:

```js
import { createApp } from 'Leaf'
import Foo from './Foo.Leaf'
import Bar from './Bar.Leaf'

const createMyApp = options => {
  const app = createApp(options)
  app.directive('focus' /* ... */)

  return app
}

createMyApp(Foo).mount('#foo')
createMyApp(Bar).mount('#bar')
```

Now the `focus` directive will be available in both `Foo` and `Bar` instances and their descendants.
