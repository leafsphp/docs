# Inertia + Leaf

<!-- markdownlint-disable no-inline-html -->

<script setup>
import TutorialNumber from '@theme/components/shared/TutorialNumber.vue';
</script>

[Inertia](https://inertiajs.com/) lets you quickly build modern single-page React, Vue and Svelte apps using Leaf as your backend. It's a great way to build full-stack apps, and still use your favorite frontend framework.

## Setting Up

Leaf MVC has got you completely covered when it comes to setting up Inertia. You have a `view:install` command that sets up the frontend framework of your choice, and automatically configures Leaf MVC's commands to use the frontend framework you chose.

To get started, you can run:

```bash:no-line-numbers [Leaf MVC Console]
php leaf view:install --vue
php leaf view:install --react
php leaf view:install --svelte
```

## Setting up your routes

Adding Inertia to your Leaf app doesn't change the way you handle routing, so you'll still be using your controllers, except that instead of a Blade view, you would return an inertia view:

```php:no-line-numbers [app/controllers/MyController.php]
return response()->view('something'); // [!code --]
return response()->inertia('something'); // [!code ++]
```

If you need to return a view directly without the need for a controller, you can add an inertia route directly like this:

```php:no-line-numbers [app/routes/_route.php]
app()->inertia('/some-route', 'something');
```

As you might have noticed, using inertia in your Leaf app is exactly the same as using Blade, except that all `view()` functions are replaced with `inertia()`.

## Passing data to your Views

You can pass data from your application directly into your inertia views by passing an array of items/props directly to the `inertia()` function:

::: code-group

```php [Response]
response()->inertia('view', [
  'prop1' => Model::all(),
  'prop2' => Helper::getSomeValue(),
  'prop3' => SOME_PHP_CONSTANT,
]);
```

```php [Route]
app()->inertia('/route', 'view', [
  'prop1' => Model::all(),
  'prop2' => Helper::getSomeValue(),
  'prop3' => SOME_PHP_CONSTANT,
]);
```

:::

::: details Automatic Props

By default, Leaf automatically shares some useful props with every inertia page. These include:

- `auth`: The current auth context, including:
  - `user`: The currently authenticated user, or `null` if not authenticated.
  - `id`: The ID of the currently authenticated user, or `null` if not authenticated.
  - `errors`: Any authentication errors that might have occurred during login or registration.
  - `permissions`: The permissions of the currently authenticated user if in use.
  - `roles`: The roles of the currently authenticated user if in use.
  - `hasSubscription`: Whether the currently authenticated user has an active subscription if using Leaf's billing features.
  - `subscription`: The current subscription of the authenticated user if using Leaf's billing features.
  - `isOnTrial`: Whether the currently authenticated user is on a trial if using Leaf's billing features.
- `flash`: The default flash message or `null` if none exists.
- `session`: The current session data, excluding flash messages and hidden data.
- `billing`: The billing context if using Leaf's billing features, including:
  - `tiers`: The available billing tiers.
  - `periods`: The available billing periods.
- `_token`: The current CSRF token if CSRF protection is enabled.

The `auth` prop is shared with every single Inertia page, and `auth.user` contains every column on your user that is not in your auth `hidden` config. Since this data ships to the browser, remember to add any custom sensitive columns to `hidden` in your auth config.

:::

## Accessing data passed into views

In the example above, we passed in some data from our application into our inertia view. Remember, Inertia views can be React, Vue or Svelte files, and any data we pass in from our app can be accessed as a prop like this:

::: code-group

```jsx [React]
import Layout from './Layout';
import { Head } from '@inertiajs/react';

export default function Home({ prop1, prop2, prop3 }) {
  return (
    <Layout>
      <Head title="Welcome" />
      <h1>Welcome</h1>
      {prop1.map(...)}
    </Layout>
  );
}
```

```vue [Vue]
<script setup>
import Layout from './Layout';
import { Head } from '@inertiajs/vue3';

defineProps({ prop1: Array, ... });
</script>

<template>
  <Layout>
    <Head title="Welcome" />
    <h1>Welcome</h1>
    <div v-for="item in prop1">...</div>
  </Layout>
</template>
```

```svelte [Svelte]
<script>
  import Layout from './Layout.svelte';

  const { prop1, ... } = $props();
</script>

<Layout>
  <svelte:head>
    <title>Welcome</title>
  </svelte:head>

  <H1>Welcome</H1>

  {#each prop1 as item}
    ...
  {/each}
</Layout>
```

:::

You can find more information on using Inertia with your frontend framework in the [Inertia documentation](https://inertiajs.com/).

## Shared Data <Badge text="New" type="tip" />

Sometimes, you might want to share data across all your inertia views. Leaf MVC makes this super easy by providing a simple way to do this. You can use the `Inertia::share()` method to share data across all your inertia views. You can do this in your `app/routes/index.php` file like this:

```php:no-line-numbers [app/routes/index.php]
use Leaf\Inertia;

Inertia::share('appName', 'Some constant value');
Inertia::share('someDeferredValue', fn() => asyncData()->get() ?? null);
Inertia::share('specialFlashMessage', fn () => flash()->display('specialFlashMessage') ?? null);
```

Using a function to share data is useful when you want to share dynamic data, because the function won't be executed until the data is actually needed, so if you share something like a flash message which can only be read once, it won't be lost.

One thing to note: Leaf reserves the `auth` prop for its automatic auth data (`id`, `user`, `roles`, `permissions`, `errors`). If you share your own `auth` value with `Inertia::share()`, the framework's value wins, so pick a different key for your own data.

## Optional Props <Badge text="New" type="tip" />

Some props are expensive to compute and not needed on every visit. You can wrap them in `Inertia::optional()` so they are skipped entirely on the first page load, and only evaluated when your frontend explicitly asks for them in a [partial reload](https://inertiajs.com/partial-reloads):

```php
use Leaf\Inertia;

response()->inertia('users/index', [
    'users' => User::all(),
    'stats' => Inertia::optional(fn () => Stats::expensiveCalculation()),
]);
```

On the client, you request an optional prop by name:

```js
router.reload({ only: ['stats'] });
```

Partial reloads also work the other way. Your frontend can pass `except` instead of `only` to refresh everything but a couple of props, and Leaf will handle both automatically.

::: details Migrating from Inertia::lazy()
`Inertia::lazy()` still works, but it's deprecated in favour of `Inertia::optional()`, which is the name the official Inertia adapters settled on.
:::

## Deferred Props <Badge text="New" type="tip" />

Deferred props take optional props one step further: instead of waiting for you to manually reload, Inertia fetches them automatically right after the page first renders. Your page shows up instantly, and the heavy data streams in behind it:

```php
use Leaf\Inertia;

response()->inertia('dashboard', [
    'user' => auth()->user(),
    'stats' => Inertia::defer(fn () => Stats::expensiveCalculation()),
]);
```

On the frontend, the `Deferred` component lets you show a placeholder while the data loads:

::: code-group

```jsx [React]
import { Deferred } from '@inertiajs/react';

<Deferred data="stats" fallback={<div>Loading...</div>}>
  <Stats />
</Deferred>
```

```vue [Vue]
<script setup>
import { Deferred } from '@inertiajs/vue3';
</script>

<template>
  <Deferred data="stats">
    <template #fallback>Loading...</template>
    <Stats />
  </Deferred>
</template>
```

```svelte [Svelte]
<script>
  import { Deferred } from '@inertiajs/svelte';
</script>

<Deferred data="stats">
  {#snippet fallback()}
    Loading...
  {/snippet}
  <Stats />
</Deferred>
```

:::

If you have multiple deferred props, they are all fetched together in one follow-up request. You can split them into separate parallel requests by giving them groups:

```php
response()->inertia('dashboard', [
    'stats' => Inertia::defer(fn () => Stats::expensiveCalculation()),
    'teams' => Inertia::defer(fn () => Team::all(), 'secondary'),
    'projects' => Inertia::defer(fn () => Project::all(), 'secondary'),
]);
```

Here `stats` loads in one request while `teams` and `projects` load together in another.

## Merging Props <Badge text="New" type="tip" />

By default, a new page visit overwrites props completely. For things like infinite scroll or "load more" buttons, you want new data appended to what's already on the client instead. Wrap the prop in `Inertia::merge()`:

```php
use Leaf\Inertia;

response()->inertia('posts/index', [
    'posts' => Inertia::merge(fn () => Post::paginate(request()->get('page'))),
]);
```

Now every reload appends the new posts to the existing list on the client. For nested structures you can use `Inertia::deepMerge()`, and if you're merging arrays of objects, `matchOn()` tells Inertia how to recognise existing items so they're updated in place instead of duplicated:

```php
response()->inertia('users/index', [
    'users' => Inertia::merge(fn () => User::paginate())->matchOn('id'),
]);
```

When you need to start over, for example after applying a new filter, reset the prop from the client and it will be replaced instead of merged:

```js
router.reload({ reset: ['users'] });
```

## Always Props <Badge text="New" type="tip" />

Partial reloads only send the props your frontend asks for, but some props should be in every response no matter what, like validation errors or a permission check. Wrap them in `Inertia::always()`:

```php
use Leaf\Inertia;

Inertia::share('errors', Inertia::always(fn () => flash()->display('errors') ?? []));
```

An always prop survives both `only` and `except` filters, so your frontend can rely on it being present in every response.

## History Encryption <Badge text="New" type="tip" />

Inertia stores page data in the browser's history state, which means sensitive data can be read back with the back button even after logging out. You can tell Inertia to encrypt the history entry for sensitive pages:

```php
use Leaf\Inertia;

Inertia::encryptHistory();

response()->inertia('billing/settings', [...]);
```

When a user logs out, clear the history so earlier pages can no longer be decrypted:

```php
Inertia::clearHistory();

response()->redirect('/login', 303);
```

## Asset Versioning <Badge text="New" type="tip" />

Inertia uses an asset version to know when your compiled assets have changed, so it can force a full page reload instead of serving a stale page. Leaf calculates one for you automatically from your root view, but you can set your own, for example from your Vite manifest:

```php
use Leaf\Inertia;

Inertia::version(fn () => \Leaf\Vite::manifestHash());
```

When the client's version no longer matches, Leaf responds with a `409 Conflict` that tells Inertia to do a fresh full-page visit.

## External Redirects <Badge text="New" type="tip" />

Redirecting an Inertia request to an external site (or any non-Inertia page) needs a special response, since Inertia normally expects JSON back. `Inertia::location()` handles both cases for you:

```php
use Leaf\Inertia;

Inertia::location('https://checkout.stripe.com/session/...');
```

Inertia requests get a `409` with an `X-Inertia-Location` header, which makes the client do a full browser visit; regular requests get a normal redirect.

## Generating Inertia Views

Once you set up your preferred frontend framework using the `view:install` command, Leaf MVC automatically reconfigures the framework to work primarily with your tooling. So you can generate a new inertia view using the `g:template` command.

```bash:no-line-numbers
leaf g:template home
```

This command will detect your frontend tooling and generate a file based on the engine you have configured. This will be in the `app/views/js/` directory and will be `home.jsx`, `home.vue` or `home.svelte`.

If you want to Leaf MVC to generate a different kind of view file, you can always pass a `--type` flag to the g:template command:

```bash:no-line-numbers
leaf g:template home --type=jsx # React
leaf g:template home --type=vue # Vue
leaf g:template home --type=svelte # Svelte
```

## Using Shadcn

If you are pairing React with your Leaf app, you can use [shadcn/ui](https://ui.shadcn.com/) to build your UI. We don't ship with the necessary files to use shadcn/ui, but you can easily set it up by running the following command:

```bash:no-line-numbers
leaf scaffold:shadcn
```

From there, you can install any shadcn/ui component you want, and it will automatically be configured to work with your Leaf app.

```bash:no-line-numbers
pnpm dlx shadcn@latest add switch
```

The final step is to use the component you just installed:

```jsx{6}
import { Switch } from "@/components/ui/switch"

const MyPage = () => {
  return (
    <div>
      <Switch />
    </div>
  )
}

export default MyPage
```

## Form validation with inertia

Leaf has already configured inertia for the vast majority of use-cases, which also includes form validation. This is an example form for updating a user's name. The first part is creating the form, which inertia has a beautiful helper for:

::: code-group

```jsx [React]
import { useForm } from '@inertiajs/react';
...

export default function UpdateName({ auth }) {
    const { data, setData, patch, errors, processing } = useForm({
        name: auth.user.name,
    });

    const submit = (e) => {
        e.preventDefault();

        patch('/route-handler');
    };

    return (
        <form onSubmit={submit} className="space-y-6 max-w-xl">
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>

                <Input
                    id="name"
                    className="mt-1 block w-full"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    required
                    autoComplete="name"
                    placeholder="Full name"
                />

                <InputError className="mt-2" message={errors.name} />
            </div>

            <Button disabled={processing}>Save</Button>
        </form>
    );
}
```

```vue [Vue]
<script setup>
import { useForm, usePage } from '@inertiajs/vue3';
...

const page = usePage();
const user = page.props.auth.user;

const form = useForm({
    name: user.name,
    email: user.email,
});

const submit = () => {
    form.patch('/route-handler', {
        preserveScroll: true,
    });
};
</script>

<template>
    <form @submit.prevent="submit" class="space-y-6 max-w-xl">
        <div class="grid gap-2">
            <Label for="name">Name</Label>
            <Input id="name" class="mt-1 block w-full" v-model="form.name" required autocomplete="name"
                placeholder="Full name" />
            <InputError class="mt-2" :message="form.errors.name" />
        </div>

        <Button :disabled="form.processing">Save</Button>
    </form>
</template>
```

```svelte [Svelte]
<script>
    import { page, useForm } from '@inertiajs/svelte';
    ...

    const user = $page.props.auth.user;

    const form = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();

        $form.patch('/route-handler', {
            preserveScroll: true,
        });
    };
</script>

<form onsubmit={submit} class="space-y-6 max-w-xl">
    <div class="grid gap-2">
        <Label for="name">Name</Label>

        <Input
            id="name"
            class="mt-1 block w-full"
            value={$form.name}
            onchange={(e) => $form.name = e.target.value}
            required
            autoComplete="name"
            placeholder="Full name"
        />

        <InputError class="mt-2" message={$form.errors.name} />
    </div>

    <Button disabled={$form.processing}>Save</Button>
</form>
```

:::

This form is submitted to a `/route-handler` route which calls an `UpdateNameController` which looks like this:

```php
<?php

namespace App\Controllers\Profile;

class AccountController extends Controller
{
    public function show_update()
    {
        $user = auth()->user();

        return response()->inertia('profile/update', [
            'errors' => flash()->display('errors') ?? [],
            'name' => $user->name ?? null,
            'email' => $user->email ?? null,
        ]);
    }

    public function update()
    {
        $data = request()->validate([
            'email' => 'email',
        ]);

        if (!$data) {
            return response()
                ->withFlash('errors', request()->errors())
                ->redirect('/show-name-change-form', 303);
        }

        $success = auth()->update($data);

        if (!$success) {
            return response()
                ->withFlash('errors', auth()->errors())
                ->redirect('/show-name-change-form', 303);
        }

        return response()->redirect('/dashboard', 303);
    }
}
```

The validation is handled in the `update()` function and is identical to how you would do it if you were using Blade, except that redirects are with `303` instead of `302`. This is to notify Inertia of a complete request in order to prevent redirecting with the same HTTP Method.

If validation fails, a redirect response is sent, and the `show_update()` method in the controller is triggered. All that's needed for inertia to catch our validation errors is to pass them in as an `errors` prop:

```php:no-line-numbers
response()->inertia('profile/update', [
    'errors' => flash()->display('errors') ?? [],
    ...
]);
```

That's all you have to do, inertia will automatically catch the errors in `useForm` and display them in the `InputError` component since we already set that up.

## Deploying Inertia Apps

While deployment is pretty much the same as deploying a regular Leaf app, you'll need to build your assets before deploying to production otherwise you'll have quite a broken app. Check out the [deployment guide](/learn/deployment/#deploying-vite-inertia-apps) for more information.

## Conclusion

Inertia is a great replacement for Blade views in Leaf MVC, and it opens up the whole JavaScript ecosystem to your app. It's a lovely way to build full-stack apps with Leaf 🧡
