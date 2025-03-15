# Payments/Billing <Badge text="BETA - MVC Only" type="warning"/>

Leaf MVC’s billing system helps makers ship faster by handling payments and subscriptions seamlessly. With built-in Stripe and Paystack support, you can set up one-time payments and recurring subscriptions in minutes—so you can focus on building, not billing.

## Setting up

To get started with billing, you need to set up your account on either Stripe or PayStack. Once you've done that, you can set up your billing settings in your `.env` file.

::: code-group

```env:no-line-numbers [Stripe]
BILLING_PROVIDER=stripe
STRIPE_SECRET_KEY=sk_test_XXXX
STRIPE_PUBLIC_KEY=pk_test_XXXX
```

```env:no-line-numbers [PayStack]
BILLING_PROVIDER=paystack
STRIPE_SECRET_KEY=sk_test_XXXX
STRIPE_PUBLIC_KEY=pk_test_XXXX
```

:::

You then have to install the module for the billing provider you select:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install stripe # for Stripe
leaf install paystack # for PayStack
```

```bash:no-line-numbers [Composer]
composer require leafs/stripe # for Stripe
composer require leafs/paystack # for PayStack
```

:::

This is all you have to do if you're planning to bill on-the-fly. Let's take a look at how to bill a customer.

## Billing on-the-fly

Billing on-the-fly is the fastest way to charge customers—perfect for one-time payments, donations, or services. Just generate a payment link with Leaf Billing, and we handle the rest. Whether you're using Blade, React, Vue, or Svelte, the process stays the same since billing runs on the server. No extra setup, just fast and seamless payments.

```php:no-line-numbers [MyController.php]
...

public function handleCartPurchase($cartId) {
    $cart = Cart::find($cartId);

    $session = billing()->charge([
        'amount' => $cart->total(), // will auto convert to lowest currency unit
        'currency' => 'NGN',
        'description' => 'Purchase of items in cart',
        'metadata' => [
            'cart_id' => $cartId,
            'items' => $cart->items(),
        ]
    ]);

    $cart->payment_session = $session->id;
    $cart->save();

    response()->redirect($session->url);
}
```

Leaf takes care of the entire payment session for you—automatically tracking the user (if available), any metadata you provide, and the payment status, keeping your code clean and focused on your app.

## Billing Events/Webhooks

Once you've charged a customer—whether with a one-time payment or a subscription—you’ll want to track the payment status. Webhooks are the best way to do this, and Leaf Billing has built-in support.

```bash:no-line-numbers
php leaf scaffold:billing-webhooks
```

This will generate a `_billing_webhooks.php` file in your `routes` directory which calls the `handle()` method on the `BillingWebhooks` controller via `POST /billing/webhook`.

```php:no-line-numbers [BillingWebhooksController.php]
...

public function handle() {
    $event = billing()->webhook();

    if ($event->is('checkout.session.completed')) {
        // Payment was successful and the Checkout Session is complete
        // ✅ Give access to your service
        // $event->user() will give you the user who made the payment (if available)
        return;
    }

    if ($event->is('checkout.session.expired')) {
        // Payment was not successful and the Checkout Session has expired
        // 📧 Maybe send an abandoned checkout mail?
        return;
    }

    // ... handle all necessary events
}
```

Since webhooks are stateless, you can't use the `session()` helper to retrieve the user who made the payment. To solve this, Leaf Billing provides a `webhook()` method on the billing instance which automatically parses the webhook, validates its source and generates a `BillingEvent` instance, giving you access to the user who made the payment, the payment session, and all other relevant details—effortlessly keeping your billing logic clean and efficient.

The billing event instance has the following items:

- `type`: The type of the event
- `is()`: A method to check if the event is of a specific type
- `user()`: The user who made the payment
- `session()`: The payment session
- `metadata`: The raw metadata of the payment session

For our example above, we can handle the payment event like this:

```php:no-line-numbers [BillingWebhooksController.php]
...

public function handle() {
    $event = billing()->webhook();

    if ($event->is('checkout.session.completed')) {
        $cart = Cart::find($event->metadata['cart_id']);
        $cart->status = 'paid';
        $cart->save();

        return;
    }

    if ($event->is('checkout.session.expired')) {
        $cart = Cart::find($event->metadata['cart_id']);
        $cart->status = 'abandoned';
        $cart->save();

        return;
    }

    // ... handle all necessary events
}
```

For more information on billing events, you can check the [Stripe](https://stripe.com/docs/api/events/types) and [PayStack](https://paystack.com/docs/payments/webhooks/#types-of-events) documentation.

## Adding billing plans

While billing on-the-fly works for one-time payments, subscriptions need a structured setup. Leaf Billing makes this effortless—just run:

```bash:no-line-numbers
php leaf scaffold:billing-plans
```

This will generate a `config/billing.php` file with a `tiers` key where you can set up your billing plans, which should look like this:

```php:no-line-numbers [billing.php]
...
    'tiers' => [
        [
            'name' => 'Starter',
            'description' => 'For individuals and small teams',
            'trialDays' => 5,
            'price.monthly' => 100,
            'price.yearly' => 1000,
            'discount' => 25,
            'features' => [
                [
                    'title' => 'Something 1',
                    'description' =>
                        'Expertly crafted functionality including auth, mailing, billing, blogs, e-commerce, dashboards, and more.',
                ],
                [
                    'title' => 'Another thing 1',
                    'description' =>
                        'Beautiful templates and page sections built with Blade, Alpine.js, and Tailwind CSS to skip the boilerplate and build faster.',
                ],
                [
                    'title' => 'Something else 1',
                    'description' =>
                        'Get instant access to everything we have today, plus any new functionality and Leaf Zero templates we add in the future.',
                ],
            ],
        ],
        ...
    ]
];
```

You just need to add an array of tiers with the following keys:

| Key | Description | Optional |
| --- | --- | --- |
| `name` | The name of the tier | `false` |
| `description` | A short description of the tier | `false` |
| `trialDays` | The number of days for the trial period | `true` |
| `discount` | The discount percentage | `true` |
| `features` | An array of features for the tier | `true` |

You can set different prices for various durations—`monthly`, `yearly`, `quarterly`, `weekly`, or even `daily`. Just define the ones you need. For one-time payments, simply set `price` instead of `price.duration`.

Plus, Leaf provides a built-in pricing component for Blade, React, Vue, and Svelte, so you can display your plans effortlessly in your app.

::: code-group

```blade:no-line-numbers [Blade]
@component('components.pricing')
```

```jsx:no-line-numbers [React]
import Pricing from '@/components/pricing';

...

<Pricing />
```

```vue:no-line-numbers [Vue]
<script setup>
import Pricing from '@/components/pricing.vue';

...
</script>

<template>
  <Pricing />
</template>
```

```svelte:no-line-numbers [Svelte]
<script>
import Pricing from '@/components/pricing.svelte';
</script>

<Pricing />
```

:::

## Billing Subscriptions

After setting up your billing plans in the config, users can subscribe effortlessly. The `scaffold:billing-plans` command also generates a BillingPlans controller with a `subscribe()` method, making it easy to enroll users into a plan with minimal setup.

```php:no-line-numbers{4} [BillingPlansController.php]
...

public function subscribe($plan) {
    $session = billing()->subscribe($plan);

    // do whatever you need with $session

    response()->redirect($session->url);
}
```

This redirects users to the billing provider’s checkout page to subscribe. Once subscribed, you can track their status via webhook events. The `scaffold:billing-plans` command also updates the BillingWebhooks controller to handle subscription events seamlessly.

```php:no-line-numbers [BillingWebhooksController.php]
...

public function handle() {
    $event = billing()->webhook();

    if ($event->is('checkout.session.completed')) {
        $event->user()->newSubscription();
        return;
    }

    if ($event->is('customer.subscription.deleted')) {
        $event->user()->cancelSubscription();
        return;
    }

    if ($event->is('checkout.session.expired')) {
        UserMailer::sendAbandonedCheckoutMail($event->user());
        return;
    }

    // ... handle all necessary events
}
```

`$event->user()` returns an instance of Leaf's auth user, enhanced with the `HasBilling` trait when Leaf Billing is installed. This lets you effortlessly check a user's subscription status, plan, and billing details. Since the billing tier is automatically attached, methods like `newSubscription()` and `cancelSubscription()` work without extra arguments.

## Checking billing status

You can check the user's billing status directly from the user object, either from your controller or your view. The user object is automatically injected into your views, so you can easily check the user's billing status in your views as well. The most basic use-cases are to check if the user is subscribed to a plan or if the user is on a trial period.

::: code-group

```blade:no-line-numbers [Blade]
@if (auth()->user()->hasSubscription())
    <p>You are subscribed to a plan</p>
@endif

@if (auth()->user()->isSubscribedTo('Starter'))
    <p>You are subscribed to the Starter plan</p>
@endif
```

```jsx:no-line-numbers [React]
// user is automatically injected into your pages
export default function MyComponent({ user }) {
    if (user.hasSubscription) {
        return <p>You are subscribed to a plan</p>;
    }

    if (user.subscriptionPlan === 'Starter') {
        return <p>You are subscribed to the Starter plan</p>;
    }
}
```

```vue:no-line-numbers [Vue]
<script setup>
// user is automatically injected into your pages
const { user } = defineProps({
    user: Object,
});
</script>

<template>
    <p v-if="user.hasSubscription">You are subscribed to a plan</p>
    <p v-if="user.subscriptionPlan === 'Starter'">You are subscribed to the Starter plan</p>
</template>
```

```svelte:no-line-numbers [Svelte]
<script>
// user is automatically injected into your pages
const { user } = $props();
</script>

{#if $user.hasSubscription}
    <p>You are subscribed to a plan</p>
{/if}

{#if $user.subscriptionPlan === 'Starter'}
    <p>You are subscribed to the Starter plan</p>
{/if}
```

:::

The API is slightly different for inertia because functions from the user object are not available in the template, meaning you have to use properties instead of functions.

## Trial Periods

In the `config/billing.php` file, you can set a `trialDays` key for each tier. This will set the trial period for the tier in days, during which the user can try the tier for free. The user will not be billed until the trial period is over.

```php:no-line-numbers{6} [billing.php]
...
    'tiers' => [
        [
            'name' => 'Starter',
            'description' => 'For individuals and small teams',
            'trialDays' => 5,
            'price.monthly' => 100,
            'price.yearly' => 1000,
            'discount' => 25,
            'features' => [
                ...
            ],
        ],
        ...
    ]
];
```

You can set the trial period for each tier, and the user will be billed after the trial period is over. In your code, you can check if the user is in the trial period by checking the `isOnTrial()` method on the billing instance.

::: code-group

```blade:no-line-numbers [Blade]
@if (auth()->user()->isOnTrial())
    <p>You are on a trial period</p>
@endif
```

```jsx:no-line-numbers [React]
// user is automatically injected into your pages
export default function MyComponent({ user }) {
    if (user.isOnTrial) {
        return <p>You are on a trial period</p>;
    }
}
```

```vue:no-line-numbers [Vue]
<script setup>
// user is automatically injected into your pages
const { user } = defineProps({
    user: Object,
});
</script>

<template>
    <p v-if="user.isOnTrial">You are on a trial period</p>
</template>
```

```svelte:no-line-numbers [Svelte]
<script>
// user is automatically injected into your pages
const { user } = $props();
</script>

{#if $user.isOnTrial}
    <p>You are on a trial period</p>
{/if}
```

:::

## Model Add-ons

In your models, you can add billing add-ons to get extra functions directly from Leaf's billing instance. You can add the `HasBilling` trait to your models to get the following methods:

| Method | Description |
| --- | --- |
| `isSubscribed()` | Check if the user is subscribed to a plan |
| `isOnTrial()` | Check if the user is on a trial period |
| `subscription()` | Get the user's subscription |
| `subscriptionPlan()` | Get the user's subscription plan |
| `subscriptionStatus()` | Get the user's subscription status |
| `subscriptionPrice()` | Get the user's subscription price |
| `subscriptionDiscount()` | Get the user's subscription discount |
| `subscriptionFeatures()` | Get the user's subscription features |
| `subscriptionTrialDays()` | Get the user's subscription trial days |
| `subscriptionNextBillingDate()` | Get the user's subscription next billing date |
| `subscriptionEndDate()` | Get the user's subscription end date |
| `subscriptionPeriod()` | Get the user's subscription period |
| `subscriptionStatus()` | Get the user's subscription status |

You can add the `HasBilling` trait to your models like this:

```php:no-line-numbers [User.php]
use Leaf\Billing\HasBilling;

class User extends Model {
    use HasBilling;

    ...
}
```

This way, you can easily check the user's subscription status, plan, and other billing information directly from the user model or any other model you add the `HasBilling` trait to.

## Billing Middleware

Leaf billing comes with a middleware that you can use to protect your routes based on specific conditions. This is a list of the billing middleware available:

| Middleware | Description |
| --- | --- |
| `billing.subscribed` | Protect a route to only allow subscribed users |
| `billing.unsubscribed` | Protect a route to only allow unsubscribed users |
| `billing.subscribed:plan-name` | Protect a route to only allow users subscribed to a specific plan |
| `billing.unsubscribed:plan-name` | Protect a route to only allow users not subscribed to a specific plan |
| `billing.trial` | Protect a route to only allow users on a trial period |
| `billing.not-trial` | Protect a route to only allow users not on a trial period |

You can use these middlewares in your routes like this:

```php [_some-route.php]
app()->get('/protected', [
    'middleware' => 'billing.subscribed',
    function() {
        return 'You are subscribed';
    }
]);

app()->get('/protected', [
    'middleware' => 'billing.unsubscribed',
    'SubscriptionController@subscribe'
]);
```

## Billing Currency

PayStack is only available in Africa, and relies on local currency. Stripe is available globally and supports multiple currencies, so Leaf's billing allows you to set your currency in your `.env` file.

```env:no-line-numbers
BILLING_CURRENCY=GHS
```

For your applications, you may need to display a different currency from the actual purchase currency. While we advise against this, you may run into geolocation issues which may make this necessary. Leaf Billing allows you to set up a display currency with your own convertion.

```env:no-line-numbers
BILLING_CURRENCY_DISPLAY=USD
BILLING_CURRENCY_DISPLAY_SYMBOL=$
BILLING_CURRENCY_DISPLAY_CONVERSION=0.07
```

## Using raw provider instances

There may be use-cases where you need to use the raw provider instances. Leaf billing allows you to get the raw provider instance using the `provider()` method on the billing instance.

```php:no-line-numbers [MyController.php]
...

public function handleCartPurchase($cartId) {
    $cart = Cart::find($cartId);

    $session = billing()->provider()->checkout->sessions->create([
        'payment_method_types' => ['card'],
        'line_items' => [
            [
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => 'T-shirt',
                    ],
                    'unit_amount' => 2000,
                ],
                'quantity' => 1,
            ],
        ],
        'mode' => 'payment',
        'success_url' => 'https://example.com/success',
        'cancel_url' => 'https://example.com/cancel',
    ]);

    $cart->payment_session = $session->id;
    $cart->save();

    response()->redirect($session->url);
}
```

In this example, we are using the Stripe provider instance to create a checkout session. While this particular use-case is covered extensively in the Leaf billing API, you can use the raw provider instances for more advanced use-cases like creating payment intents, specific tax calculations, and more.

## Production Checklist

As with all payment systems, you need to ensure that your billing system is secure. Here are a few things to check before going live:

- Ensure that your billing provider is set up correctly
- Turn of test mode in your billing provider
- In your [Developers], copy your public & private keys and add them to `BILLING_SECRET_KEY` & `BILLING_PUBLISHABLE_KEY` in your production environment variables.
- In your [Developers], [Webhook], [Add Enpoint]. Set `<your-domain>/billing/webhook`. Select [checkout.session.completed] event (or more if needed). Copy the signing secret and add it to `BILLING_WEBHOOK_SECRET` in your production environment variables.

## Security

When using Leaf billing, you need to ensure that your billing system is secure. Here are a few things to check:

- Billing Webhooks

  Always make sure that your `BILLING_WEBHOOK_SECRET` is set in your `.env` file. This secret is used to verify that the webhook is coming from your billing provider. You can get this secret from your billing provider's dashboard. Once you set this secret, Leaf billing will automatically verify that the webhook is coming from your billing provider.

- CSRF Protection

  If you are using the default CSRF config, then your `/billing/webhook` route is already excluded from CSRF protection, however, if you maintain your own CSRF config in `config/csrf.php`, you should exclude the `/billing/webhook` route from CSRF protection.

  ```php:no-line-numbers [csrf.php]
  ...
      'except' => [
          '/billing/webhook',
      ],
  ...
  ```
