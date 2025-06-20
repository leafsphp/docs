# Monitoring with Sentry

::: warning Sentry
You will need a Sentry account to follow this guide.
If you do not have one, you can sign up for free at [Sentry.io](https://sentry.io/).
Sentry requires PHP 7.2 or higher, so ensure your Leaf MVC application is running on a compatible version.
:::

## What Are We Building

This experiment will guide you through setting up Sentry to monitor your Leaf MVC application. Sentry is a developer-first application monitoring platform that helps you identify and fix software problems before they impact your users.

::: details (New to Sentry?)
Sentry provides insights into application performance, user interactions, and error occurrences, allowing developers to quickly identify and resolve issues.
:::

## 1. Create a Sentry Project

You can create a new project in Sentry by following these steps:

1. Navigate to the insights section of your Sentry dashboard and click on "all projects".
2. Click on the "Create Project" button.
3. Select "PHP" as the platform.
4. Enter a name for your project and click "Create Project".
5. After creating the project, you will be provided with a DSN (Data Source Name). This DSN is essential for configuring your Leaf MVC application to send data to Sentry.

## 2. Install the Sentry SDK

Navigate to your application's root directory and run the following command:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install sentry/sentry
```

```bash:no-line-numbers [Composer]
composer require sentry/sentry
```

:::

## 3. Plug-in Sentry to Your Application

Open up `public/index.php` and add wrap the Leaf execution code with Sentry's initialization and error handling:

```php
/*
|-----------------------------------------------------------------------
| Load Sentry
|-----------------------------------------------------------------------
|
| Sentry is a powerful error tracking and performance monitoring tool.
| It helps you identify and fix issues in your application.
| This configuration initializes Sentry with your DSN.
|
*/
\Sentry\init([ // [!code ++]
    'dsn' => '...', // [!code ++]
]); // [!code ++]

/*
|-----------------------------------------------------------------------
| Run your Leaf MVC application
|-----------------------------------------------------------------------
|
| This line brings in all your routes and starts your application
|
*/
\Leaf\Core::runApplication();  // [!code --]
try {  // [!code ++]
    \Leaf\Core::runApplication();  // [!code ++]
} catch (\Throwable $exception) {  // [!code ++]
    \Sentry\captureException($exception);  // [!code ++]
}  // [!code ++]
```

## Conclusion

From there, any errors should be automatically captured and sent to your Sentry dashboard. You can test this by intentionally causing an error in your application, such as by throwing an exception or accessing an undefined variable.

There are other options you can try out to customize Sentry's behavior, such as setting up environment variables, configuring release tracking, and more. You can find more information in the [Sentry PHP SDK documentation](https://docs.sentry.io/platforms/php/).
