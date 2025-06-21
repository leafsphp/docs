# Data Tracking

Data tracking is a crucial aspect of modern web applications, enabling you and marketing teams to monitor user interactions, events, and know how users engage with your application. There are many tools available for tracking data, but some of the most popular ones are Google Analytics, Mixpanel and Amplitude. These tools provide insights into user behavior, allowing you to make data-driven decisions to improve your application.

## What Are We Building

This experiment will guide you through setting up data tracking in your Leaf MVC application using Google Analytics and Mixpanel using different setups like Inertia and Blade. Luckily, all of these tools use similar concepts for frontend tracking which usually involves adding a script tag to your HTML and initializing the tracking library with your project ID or API key.

## HTML Head Setup

If you are using Leaf MVC with React, Vue, or Svelte via Inertia, you can easily integrate Google Analytics and Mixpanel by adding the respective scripts to the `_inertia.blade.php` file included in Leaf's Inertia setup. This file is located in the `app/views` directory of your Leaf MVC application.

```php:no-line-numbers [_inertia.blade.php]
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title inertia>My app Title</title>
    @viteReactRefresh
    @vite(['/js/app.jsx', "/js/pages/{$page['component']}.jsx"])
    @inertiaHead

    <!-- Google Analytics/MixPanel/... -->
    <script ... />
</head>
```

The same applies to the Blade setup, except that you would want the script on all pages, and for this, we recommend adding it to a layout file which you can include in your Blade views.

## Server side setup

To track data on the server side, you can use the respective SDKs for Google Analytics and Mixpanel. These SDKs allow you to send events and user data directly from your Leaf MVC application to the tracking service. For this experiment, we will use the Mixpanel SDK to track page views and events.

You can get started by installing the Mixpanel SDK via Composer:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install mixpanel/mixpanel-php
```

```bash:no-line-numbers [Composer]
composer require mixpanel/mixpanel-php
```

:::

Next, you can initialize the Mixpanel SDK in your Leaf MVC application. You can do this in the `app/routes/index.php` file, where you can set up the Mixpanel client with your project token. We're using this file because it's loaded before any routes are defined, ensuring that the Mixpanel client is available throughout your application. Think of it like a service provider in other frameworks.

```php:no-line-numbers [app/routes/index.php]
app()->register('mixpanel', function () {
    return Mixpanel::getInstance(
        _env('MIXPANEL_TOKEN'),
    );
});
```

This will register the Mixpanel client directly in the Leaf container, allowing you to access it anywhere in your application using `app()->mixpanel`. With this setup, you can now track events and user interactions in your Leaf MVC application.

## Tracking Events

To track events in your Leaf MVC application, you can use the Mixpanel client that you registered earlier. You can track events by calling the `track` method on the Mixpanel client. Here's an example of how to track a page view event:

```php
app()->mixpanel->track('Store Viewed', [
    'store_id' => $store->id,
    'store_name' => $store->name,
    'source' => request()->headers('Referer') ?? 'unknown',
]);
```

This code tracks a "Store Viewed" event with the store ID, store name, and the source of the request (the referring URL). You can use this same approach to track any events in your application, using any SDK that you prefer. Just remember to initialize the SDK before your routes are defined, and you can access it anywhere in your application once you register it in the Leaf container.
