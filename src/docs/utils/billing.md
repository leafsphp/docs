# Payments/Billing <Badge text="BETA - MVC Only" type="warning"/>

Leaf MVC’s billing system helps makers move faster by handling payments and subscriptions out of the box. With built-in Stripe support—and more providers like Paystack coming soon—you can set up one-time payments or recurring subscriptions in just a few minutes. That means less time worrying about billing and more time building.

## Setting up

<!-- You can set up billing with Stripe, PayStack or both depending on your use-case. --> Currently, Leaf Billing supports Stripe. Support for Paystack and other providers is on the way.

To get started, create a Stripe account and grab your API keys. Then, drop them into your `.env` file:

::: code-group

```env:no-line-numbers [Stripe]
BILLING_PROVIDER=stripe
STRIPE_API_KEY=sk_test_XXXX
STRIPE_PUBLISHABLE_KEY=pk_test_XXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXX # only if you are using webhooks
```

<!-- ```env:no-line-numbers [PayStack]
BILLING_PROVIDER=paystack
STRIPE_API_KEY=sk_test_XXXX
STRIPE_PUBLISHABLE_KEY=pk_test_XXXX
``` -->

:::

You then have to install the Stripe module for Leaf:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install stripe
```

```bash:no-line-numbers [Composer]
composer require leafs/stripe
```

:::

<!-- module for the billing provider you select (install both if you need to use both Stripe and PayStack): -->

<!-- ::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install stripe # for Stripe
leaf install paystack # for PayStack
```

```bash:no-line-numbers [Composer]
composer require leafs/stripe # for Stripe
composer require leafs/paystack # for PayStack
```

::: -->

This is all you have to do if you're planning to bill on-the-fly. Let's take a look at how to bill a customer.

## Billing on-the-fly

Billing on-the-fly is the fastest way to charge customers—ideal for one-time payments, donations, or services. Just generate a payment link with Leaf Billing, and we’ll handle the rest. You can do this using the `billing()` helper in your controller.

```php:no-line-numbers [MyController.php]
...

public function handleCartPurchase($cartId) {
    $cart = Cart::find($cartId);

    $session = billing()->charge([
        'currency' => 'USD',
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

This is a list of the parameters you can pass to the `charge()` method:

| Parameter | Description |
| --- | --- |
| `currency` | The currency to charge the customer (e.g. USD, EUR) |
| `description` | A description of the charge (optional) |
| `metadata` | An array of metadata to attach to the charge. This is useful for tracking the user who made the payment, the items they purchased, and any other relevant information. |
| `metadata.items` | An array of items to charge the customer, every item should have a name and amount, and optional quantity: `['item' => 'XXX', 'amount' => xxx]`. Optional if you pass `items` |
| `items` | Array of stripe formatted items to charge the customer, eg: `['price_data' => ['currency' => 'usd', 'product_data' => ['name' => 'T-shirt'], 'unit_amount' => 2000], 'quantity' => 1]`. You can use `metadata.items` if you want leaf to format your data for you |
| `customer` | The customer email to charge (optional) |
| `urls` | An array of URLs to redirect the customer to. Accepts `success` and `cancel` keys. If you don't pass this, Leaf will use the default URLs. |

## Billing Callbacks

By default, Leaf Billing redirects users to `/billing/callback` after a payment is completed or canceled. You can customize this behavior by setting `BILLING_SUCCESS_URL` and `BILLING_CANCEL_URL` in your `.env` file, or by passing custom URLs directly to the `charge()` method.

```php [CallbacksController.php]
<?php

namespace App\Controllers\Billing;

/**
 * Billing Callback
 * ---
 * Handles the redirect from the billing provider after payment.
 * This is a stateful controller, so sessions and auth are available.
 */
class CallbacksController extends Controller
{
    public function handle()
    {
        $billingSession = billing()->callback();

        if (!$billingSession->isSuccessful()) {
            return response()->json(['message' => 'Payment failed']);
        }

        return response()->json(['message' => 'Payment successful']);
    }
}
```

`billing()->callback()` parses and validates the callback, returning a BillingSession with full payment details. Use `isSuccessful()` to determine the outcome. This is ideal for one-time payments—no subscription logic needed.

## Billing with subscriptions

Unlike one-time payments, subscriptions require a more structured setup—but Leaf Billing makes it effortless. Just run the `scaffold:subscriptions` command to instantly generate everything you need: billing config, controllers, routes, and views. You'll be up and running with subscriptions in minutes.

```bash:no-line-numbers
php leaf scaffold:subscriptions
```

You then need to update the generated `config/billing.php` file with your subscription tiers under the `tiers` key:

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
        [
            'name' => 'Pro',
            'description' => 'For larger teams and companies',
            'trialDays' => 10,
            'price.monthly' => 200,
            'price.yearly' => 2000,
            'discount' => 50,
            'features' => [
                [
                    'title' => 'Something 2',
                    'description' =>
                        'Expertly crafted functionality including auth, mailing, billing, blogs, e-commerce, dashboards, and more.',
                ],
                [
                    'title' => 'Another thing 2',
                    'description' =>
                        'Beautiful templates and page sections built with Blade, Alpine.js, and Tailwind CSS to skip the boilerplate and build faster.',
                ],
                [
                    'title' => 'Something else 2',
                    'description' =>
                        'Get instant access to everything we have today, plus any new functionality and Leaf Zero templates we add in the future.',
                ],
            ],
        ],
    ]
];
```

You can use the following keys:

| Key | Description | Optional |
| --- | --- | --- |
| `name` | The name of the tier | `false` |
| `description` | A short description of the tier | `false` |
| `trialDays` | The number of days for the trial period | `true` |
| `discount` | The discount percentage | `true` |
| `features` | An array of features for the tier | `true` |

You can set different prices for various durations—`monthly`, `yearly`, `quarterly`, `weekly`, or even `daily` in the format `price.monthly`, `price.yearly`, etc.

Once you've set up your billing tiers like the example above, you just need to publish them on Stripe. You can do that by running the following command:

```bash:no-line-numbers
php leaf config:billing
```

That's it! We can now let users subscribe to our plans.

## Displaying your plans

The `scaffold:subscriptions` command also generates a pricing component tailored to your chosen view engine—Blade, React, Vue, or Svelte. You can display your plans with just one line of code. The component is fully customizable, so you can tweak the design to match your app’s look and feel seamlessly.

::: code-group

```blade:no-line-numbers [Blade]
@component('components.billing.pricing')
```

```jsx:no-line-numbers [React]
import Pricing from '@/components/billing/pricing';

...

<Pricing />
```

```vue:no-line-numbers [Vue]
<script setup>
import Pricing from '@/components/billing/pricing.vue';

...
</script>

<template>
  <Pricing />
</template>
```

```svelte:no-line-numbers [Svelte]
<script>
import Pricing from '@/components/billing/pricing.svelte';
</script>

<Pricing />
```

:::

Clicking the "Subscribe" button takes users to the billing provider’s checkout page, where they can enter their payment details. After completing the payment, they’ll be redirected back to your application's callback automatically.

Leaf handles most of the subscription logic out of the box, but since every app is different, you may need to tweak the generated files—especially the webhook handlers—to fit your specific use case.

## Billing Events/Webhooks

Once you’ve charged a customer—especially for a subscription—you’ll want to track their payment status. The best way to do this is through webhooks. When you run the `scaffold:subscriptions` command, Leaf Billing automatically generates a webhook controller that listens for events from your billing provider and handles them for you.

```php:no-line-numbers [WebhooksController.php]
<?php

namespace App\Controllers\Billing;

/**
 * Webhooks Controller
 * ----------
 * This controller processes all webhooks from the billing provider.
 * Since webhooks are stateless, sessions, authentication, and other
 * stateful data aren't available. However, Leaf automatically parses the webhook payload,
 * giving you direct access to the current user or subscription from the event data.
 */
class WebhooksController extends Controller
{
    public function handle()
    {
        $event = billing()->webhook();

        /**
         * $event->type() - to get the event type
         * $event->is() - to check if the event is a specific type
         * $event->tier() - to get the subscription tier (if available)
         * $event->subscription() - to get the current subscription (if available)
         * $event->user() - to get the current user (returns auth()->user() if available)
         * $event->previousSubscriptionTier() - to get the previous subscription tier (if available)
         * $event->cancelSubscription() - to cancel the subscription in webhook request (if available)
         * $event->activateSubscription() - to activate the new subscription in webhook (if available)
         */

        if ($event->is('invoice.payment_succeeded')) {
            // Payment was successful

            if ($event->data()['object']['billing_reason'] === 'subscription_cycle') {
                // Subscription renewed/charged after trial/cycle
                // ✅ Give access to your service
            }

            // Other payment succeeded events
            // ✅ Give access to your service

            return;
        }

        if ($event->is('customer.subscription.updated')) {
            if ($event->activateSubscription()) {
                response()->json([
                    'status' => 'success',
                ]);
            } else {
                // Subscription was not activated
                // ❌ Retry or handle manually
                response()->json([
                    'status' => 'failed',
                ], 500);
            }

            return;
        }

        if ($event->is('customer.subscription.deleted')) {
            if ($event->cancelSubscription()) {
                response()->json([
                    'status' => 'success',
                ]);
            } else {
                // Subscription was not cancelled
                // ❌ Retry or handle manually
                response()->json([
                    'status' => 'failed',
                ], 500);
            }

            return;
        }

        if ($event->is('customer.subscription.trial_will_end')) {
            // Trial will end soon
            // 📧 Maybe send a trial ending mail?
            return;
        }

        if ($event->is('customer.subscription.paused')) {
            // Subscription was paused
            // ❌ Remove access to your service
            return;
        }

        if ($event->is('customer.subscription.resumed')) {
            // Subscription was resumed
            // ✅ Give access to your service
            return;
        }

        // ... handle all other necessary events
    }
}
```

Since webhooks are stateless, you can't use the `session()` or `auth()` helpers to retrieve the user who made the payment. This is a common issue with webhooks, as they are designed to be stateless and don't have access to the session or authentication data. However, Leaf Billing automatically parses the webhook payload and provides you with a `BillingEvent` instance, which gives you access to the user who made the payment, the subscription, and all other relevant details.

| Method | Description |
| --- | --- |
| `type()` | Get the event type |
| `is()` | Check if the event is a specific type |
| `tier()` | Get the subscription tier (if available) |
| `subscription()` | Get the current subscription (if available) |
| `user()` | Get the current user (returns auth()->user() if available) |
| `previousSubscriptionTier()` | Get the previous subscription tier (if available) |
| `cancelSubscription()` | Cancel the subscription in webhook request (if available) |
| `activateSubscription()` | Activate the new subscription in webhook (if available) |
| `data()` | Get the raw event data |
| `metadata()` | Get the metadata from the event (if available) |

For more information on billing events, you can check the [Stripe](https://stripe.com/docs/api/events/types) and [PayStack](https://paystack.com/docs/payments/webhooks/#types-of-events) documentation.

::: info Testing Webhooks
You can test webhooks locally using the [Stripe CLI](https://docs.stripe.com/stripe-cli). Add a listener for your application like this:

```bash:no-line-numbers
stripe listen --forward-to localhost:5500/billing/webhook/
```

Keep the process open and then perform an action in your application that triggers a webhook. The Stripe CLI will forward the webhook to your local server, and you can see the request in your terminal.
:::

## Checking billing status

You can check the user's billing status directly from the user object, either from your controller or your view. The user object is automatically injected into your views, so you can easily check the user's billing status in your views as well. The most basic use-cases are to check if the user is subscribed to a plan or if the user is on a trial period.

<!-- @if (auth()->user()->isSubscribedTo('Starter'))
    <p>You are subscribed to the Starter plan</p>
@endif -->

::: code-group

```blade:no-line-numbers [Blade]
@if (auth()->user()->hasActiveSubscription())
    <p>You are subscribed to a plan</p>
@endif

@if (auth()->user()->subscription() === 'Starter')
    <p>You are subscribed to the Starter plan</p>
@endif
```

```jsx:no-line-numbers [React]
// user is automatically injected into your pages
export default function MyComponent({ user }) {
    if (user.hasSubscription) {
        return <p>You are subscribed to a plan</p>;
    }

    if (user.subscription === 'Starter') {
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
    <p v-if="user.subscription === 'Starter'">You are subscribed to the Starter plan</p>
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

{#if $user.subscription === 'Starter'}
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

Be sure to update your webhooks to handle the charging of the user after the trial period is over. We've left a comment in the generated webhooks controller to remind you to do this.

<!-- ## Model Add-ons

In your models, you can add billing add-ons to get extra functions directly from Leaf's billing instance. You can add the `HasBilling` trait to your models to get the following methods:

| Method | Description |
| --- | --- |
| `isSubscribed()` | Check if the user is subscribed to a plan |
| `isOnTrial()` | Check if the user is on a trial period |
| `subscription()` | Get the user's subscription |
| `subscriptionNextBillingDate()` | Get the user's subscription next billing date |
| `subscriptionEndDate()` | Get the user's subscription end date |
| `subscriptionPeriod()` | Get the user's subscription period |

You can add the `HasBilling` trait to your models like this:

```php:no-line-numbers [User.php]
use Leaf\Billing\HasBilling;

class User extends Model {
    use HasBilling;

    ...
}
```

This way, you can easily check the user's subscription status, plan, and other billing information directly from the user model or any other model you add the `HasBilling` trait to. -->

## Billing Middleware

Leaf billing comes with a middleware that you can use to protect your routes based on specific conditions. This is a list of the billing middleware available:

| Middleware | Description |
| --- | --- |
| `billing.subscribed` | Protect a route to only allow subscribed users |
| `billing.subscribed:plan-name` | Protect a route to only allow users subscribed to a specific plan |
| `billing.not-subscribed` | Protect a route to only allow users who aren't subscribed |
| `billing.not-subscribed:plan-name` | Protect a route to only allow users not subscribed to a specific plan |
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
    'middleware' => 'billing.not-subscribed',
    'SubscriptionController@subscribe'
]);
```

If you want to customize what the middleware does if the user is not allowed to access the route, you can do that by calling the `billing()->middleware()` method in your `app/routes/index.php` file. This method accepts a callback that will be called if the user is not allowed to access the route.

```php:no-line-numbers [index.php]
billing()->middleware('billing.subscribed', function () {
    response()->redirect('/billing/subscribe');
});
```

<!-- ## Billing Currency

PayStack is only available in Africa, and relies on local currency. Stripe is available globally and supports multiple currencies, so Leaf's billing allows you to set your currency in your `.env` file.

```env:no-line-numbers
BILLING_CURRENCY=GHS
```

For your applications, you may need to display a different currency from the actual purchase currency. While we advise against this, you may run into geolocation issues which may make this necessary. Leaf Billing allows you to set up a display currency with your own convertion.

```env:no-line-numbers
BILLING_CURRENCY_DISPLAY=USD
BILLING_CURRENCY_DISPLAY_SYMBOL=$
BILLING_CURRENCY_DISPLAY_CONVERSION=0.07
``` -->

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
- In your [Developers], copy your public & private keys and add them to the api key and publishable key in your production environment variables.
- In your [Developers], [Webhook], [Add Enpoint]. Set `<your-domain>/billing/webhook`. Copy the signing secret and add it to `STRIPE_WEBHOOK_SECRET` in your production environment variables.

## Security

When using Leaf billing, you need to ensure that your billing system is secure. Here are a few things to check:

- Billing Webhooks

  Always make sure that your `STRIPE_WEBHOOK_SECRET` is set in your `.env` file. This secret is used to verify that the webhook is coming from your billing provider. You can get this secret from your billing provider's dashboard. Once you set this secret, Leaf billing will automatically verify that the webhook is coming from your billing provider.

- CSRF Protection

  If you are using the default CSRF config, then your `/billing/webhook` route is already excluded from CSRF protection, however, if you maintain your own CSRF config in `config/csrf.php`, you should exclude the `/billing/webhook` route from CSRF protection.

  ```php:no-line-numbers [csrf.php]
  ...
      'except' => [
          '/billing/webhook',
      ],
  ...
  ```
