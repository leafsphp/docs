<!-- markdownlint-disable no-inline-html -->

# Services <Badge>New</Badge>

Services let you encapsulate business logic and make it reusable across your application. For example, you might have functionality in `StatsController` that you want to use in `DashboardController` or expose via an API. Instead of duplicating code, you can create a service class and inject it where needed.

## Creating a Service

Services are just plain PHP classes — no base class or interface required. By convention, we keep them in `app/services`, but you can place them anywhere in your project. Let's create our `StatsService` from the earlier example:

```php
<?php

namespace App\Services;

class StatsService
{
    public function getDashboardData()
    {
        return [
            'users' => 1500,
            'sales' => 2300,
            'revenue' => 12000,
        ];
    }
}
```

That's it! A service doesn't have to extend any base class or implement any interface. It's simply a class that contains methods for your business logic.

## Using a Service

To use a service in a controller, you simply call `make()` to resolve it from anywhere in your application. Here's how you can use the `StatsService` in a `DashboardController`:

```php{11}
<?php

use App\Services\StatsService;

class DashboardController extends Controller
{
    public function index()
    {
        return response()->inertia(
            'dashboard',
            make(StatsService::class)->getDashboardData()
        );
    }
}
```

::: tip Why `make()`?

In this version of Leaf, `make()` simply initializes the service class just like calling `new`, but future versions of Leaf may expand its behavior, so we encourage always using `make()` instead of initializing classes directly.

:::

## Why no dependency Injection?

If you’re coming from frameworks like Laravel, you might expect to inject services through constructors or method injection. While this is powerful, it also adds extra complexity.

In Leaf, almost everything you need is already accessible through global functions, so there’s no need to inject dependencies just to use them. To keep things simple and consistent, Leaf uses make() to resolve services.

Instead of wiring dependencies into constructors, you can simply call a function (`make()`, `cache()`, `response()`, etc.) to get what you need — anywhere in your app.

## When to Use a Service

- When you have reusable business logic (e.g. stats, billing, reporting).

- When same logic would otherwise live in multiple controllers.

- When you want to keep controllers thin and focused on handling requests, not doing the heavy lifting.
