# Application Environment

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoModal from '@theme/components/shared/VideoModal.vue';
import Button from '@theme/components/shared/Button.vue';
</script>

You can think of your application's environment as a set of configurations that define how your application behaves in different situations. For example, you may run a local database when developing your app, but will want your app to connect to a remote database when it's in production.

<div
    class="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg sm:max-w-[50%]"
>
    <div
        class="w-full flex md:flex-col bg-gradient-to-br from-pink-500 to-rose-500"
    >
        <div
            class="sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6"
        >
            <h3 class="text-xl font-semibold mb-2 text-shadow !mt-0">
                Using Leaf MVC?
            </h3>
            <p class="font-medium text-rose-100 text-shadow mb-4">
                We've crafted a specialized guide for config in Leaf MVC. While it's similar to the basic config in Leaf, it's more detailed and tailored for Leaf MVC.
            </p>
            <Button
                as="a"
                href="/docs/config/mvc"
                class="mt-auto bg-rose-900 hover:!bg-rose-900 !text-white bg-opacity-50 hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-bold py-2 px-4 inline-flex"
                >Sync your config</Button
            >
        </div>
        <!-- <div
            class="relative md:pl-6 xl:pl-8 hidden sm:block"
        >
            Hello
        </div> -->
    </div>
    <div
        class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-rose-500 hidden sm:block"
    ></div>
</div>

Common environments include `development`, `testing`, and `production`. Leaf already has some pre-programmed bahaviours for these environments, but you can also create your own custom environments. One way to do this is to use environment variables.

## Environment Variables

Environment variables are variables that are set in your application's current environment instead of being hardcoded in your code. This allows you to change your application's behaviour without changing your code which is pretty cool and useful for things like setting up different credentials for development and production.

::: details New to Environment Variables?

Adam Culp of Beachcasts php programming videos shares what environment variables are and how to use phpdotenv to retrieve them from $_ENV for usage in a PHP app.

<VideoDocs
  title="New to environment variables?"
  subject="Watch this video by Beachcasts"
  description=""
  link="https://www.youtube.com/embed/oTrJfgUF1SI"
/>

:::

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
