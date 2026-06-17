# Application Environment

<!-- markdownlint-disable no-inline-html -->

<section class="not-prose my-10 overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
  <div class="grid gap-0 2xl:grid-cols-[1fr_0.9fr]">
    <div class="border-b border-neutral-200 p-6 sm:p-8 2xl:border-b-0 2xl:border-r dark:border-neutral-800">
      <p class="!m-0 !mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">Configuration</p>
      <h1 class="m-0 text-3xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-4xl">Keep secrets and environment choices out of your code.</h1>
      <p class="!m-0 !mt-4 text-base leading-7 text-neutral-600 dark:text-neutral-400">Leaf reads environment values so local, staging, and production apps can share the same code while using different credentials, modes, and service endpoints.</p>
    </div>
    <div class="bg-neutral-50 p-6 dark:bg-neutral-900/60 sm:p-8">
      <div class="rounded-lg border border-neutral-200 bg-white p-4 font-mono text-sm text-neutral-700 dark:border-neutral-800 dark:bg-black dark:text-neutral-300">
        <div>APP_ENV=production</div>
        <div class="text-[var(--vp-c-brand-1)]">DB_DATABASE=leaf</div>
        <div class="mt-4 text-sky-600 dark:text-sky-400">$database = _env('DB_DATABASE');</div>
      </div>
    </div>
  </div>
</section>

You can think of your application's environment as a set of configurations that define how your application behaves in different situations. For example, you may run a local database when developing your app, but will want your app to connect to a remote database when it's in production.

Common environments include `development`, `testing`, and `production`. Leaf already has some pre-programmed bahaviours for these environments, but you can also create your own custom environments. One way to do this is to use environment variables.

## Environment Variables

Environment variables are variables that are set in your application's current environment instead of being hardcoded in your code. This allows you to change your application's behaviour without changing your code which is pretty cool and useful for things like setting up different credentials for development and production.

## Loading Environment Variables

::: tip Leaf MVC

If you use Leaf MVC, this step is already done for you, so you can go ahead and use `_env()` to access any environment variable you need.

:::

To use environment variables in your Leaf application, you need to load them from your `.env` file into PHP's `$_ENV` and `$_SERVER` globals. You can then access these variables using the `_env()` helper function that Leaf provides. Here are some popular environment loaders:

- [vlucas/phpdotenv](https://github.com/vlucas/phpdotenv)
- [symfony/dotenv](https://github.com/symfony/dotenv)

## Using Environment Variables

Leaf comes with a pretty handy helper function `_env()` that you can use to access your environment variables. The `_env()` function takes in a key and a default value. If the key is found, the value is returned, otherwise the default value is returned.

```php:no-line-numbers
$secretKeyFromEnv = _env('SECRET_KEY', 'mySecretIfNotFound');
```

## Application Modes

As mentioned earlier, Leaf has some pre-programmed behaviours for common environments like `development`, `testing`, and `production`. Leaf uses the `development` environment by default if no environment is set, but you can also set the environment your app should run in manually using the `mode` setting in your application settings.

```php
app()->config([
  'mode' => 'production'
]);
```

You can also set the application mode using the `APP_ENV` environment variable. If Leaf detects that the `APP_ENV` environment variable is set, it will automatically set the application mode to the value of the `APP_ENV` variable.

## Using Application Modes

You can also tell Leaf to run a specific script when the application mode matches a given mode. This is done using the `script()` method. The `script()` method accepts two arguments: the mode and a callable.

```php
app()->script('production', function() {
  // Run this script when the application mode is production
});
```
