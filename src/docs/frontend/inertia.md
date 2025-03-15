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

```php [app/controllers/MyController.php]
return response()->view('something'); // [!code --]
return response()->inertia('something'); // [!code ++]
```

If you need to return a view directly without the need for a controller, you can add an inertia route directly like this:

```php [app/routes/_route.php]
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

## Generating Inertia Views

Once you set up your preferred frontend framework using the `view:install` command, Leaf MVC automatically reconfigures the framework to work primarily with your tooling. So you can generate a new inertia view using the `g:template` command.

```bash:no-line-numbers
php leaf g:template home
```

This command will detect your frontend tooling and generate a file based on the engine you have configured. This will be in the `app/views/js/` directory and will be `home.jsx`, `home.vue` or `home.svelte`.

If you want to Leaf MVC to generate a different kind of view file, you can always pass a `--type` flag to the g:template command:

```bash:no-line-numbers
php leaf g:template home --type=jsx # React
php leaf g:template home --type=vue # Vue
php leaf g:template home --type=svelte # Svelte
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

        response()->inertia('profile/update', [
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

        response()->redirect('/dashboard', 303);
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

## Conclusion

Inertia is the perfect replacement for Blade views in Leaf MVC, and actually allows you build more powerful applications with the tons of available JavaScript libraries out there. It's a great way to build full-stack apps, supercharged by Leaf 💚
