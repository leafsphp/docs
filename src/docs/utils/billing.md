# Payments/Billing <Badge text="BETA - MVC Only" type="warning"/>

Leaf MVC’s billing system handles payments and subscriptions out of the box. With built-in Stripe/PayStack support (and more providers like Lemonsqueezy coming soon), you can set up one-time payments or recurring subscriptions in a few minutes and get back to building your app.

## Setting up

You can set up billing with Stripe, PayStack or both depending on your use-case.

To get started, create an account on the payment provider you want to use, and grab your API keys. Then, drop them into your `.env` file:

::: code-group

```txt:no-line-numbers [Stripe]
BILLING_PROVIDER=stripe
STRIPE_API_KEY=sk_test_XXXX
STRIPE_PUBLISHABLE_KEY=pk_test_XXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXX # only if you are using webhooks
```

```txt:no-line-numbers [PayStack]
BILLING_PROVIDER=paystack
PAYSTACK_API_KEY=sk_test_XXXXX
PAYSTACK_PUBLISHABLE_KEY=pk_text_XXXX
PAYSTACK_WEBHOOK_SECRET= # paystack doesn't use WH secrets
```

:::

You then have to install the module for the provider you want to use:

::: code-group

```bash:no-line-numbers [Leaf CLI]
leaf install stripe # stripe
leaf install paystack # paystack
```

```bash:no-line-numbers [Composer]
composer require leafs/stripe # stripe
composer require leafs/paystack # paystack
```

:::

You only need to install the module for the billing provider you intend to use, or both if you plan to support payments via Stripe and Paystack. For one-time payments, this is all you have to do. Here's an example on billing a customer.

## Billing on-the-fly

Billing on-the-fly is the fastest way to charge customers, ideal for one-time payments and donations. Just generate a payment link with Leaf Billing, and we’ll handle the rest. You can do this using the `billing()` helper in your controller.

::: code-group

```php:no-line-numbers [Stripe - MyController.php]
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

    $cart->payment_session = $session->id();
    $cart->save();

    response()->redirect($session->url());
}
```

```php:no-line-numbers [PayStack - MyController.php]
...

public function handleCartPurchase($cartId) {
    $cart = Cart::find($cartId);

    $session = billing()->charge([
        'amount' => $cartTotal * 100,
        'currency' => 'NGN',
        'description' => 'Purchase of items in cart',
        'customer' => $customer->email,
        'url' => 'https://example.com/billing/callback', // only for paystack
        'metadata' => [
            'cart_id' => $cart->id,
            'customer_id' => $customer->id,
        ]
    ]);

    $cart->payment_session = $session->id();
    $cart->save();

    response()->redirect($session->url());
}
```

:::

Leaf takes care of the entire payment session for you: it automatically tracks the user (if available), any metadata you provide, and the payment status, so your code stays focused on your app.

This is a list of the parameters you can pass to the `charge()` method:

::: details Stripe Params

| Parameter        | Description                                                                                                                                                                                                                                                       |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currency`       | The currency to charge the customer (e.g. USD, EUR)                                                                                                                                                                                                               |
| `description`    | A description of the charge (optional)                                                                                                                                                                                                                            |
| `metadata`       | An array of metadata to attach to the charge. This is useful for tracking the user who made the payment, the items they purchased, and any other relevant information.                                                                                            |
| `metadata.items` | An array of items to charge the customer, every item should have a name and amount, and optional quantity: `['item' => 'XXX', 'amount' => xxx]`. Optional if you pass `items`                                                                                     |
| `items`          | Array of stripe formatted items to charge the customer, eg: `['price_data' => ['currency' => 'usd', 'product_data' => ['name' => 'T-shirt'], 'unit_amount' => 2000], 'quantity' => 1]`. You can use `metadata.items` if you want leaf to format your data for you |
| `customer`       | The customer email to charge (optional)                                                                                                                                                                                                                           |
| `urls`           | An array of URLs to redirect the customer to. Accepts `success` and `cancel` keys. If you don't pass this, Leaf will use the default URLs.                                                                                                                        |

:::

::: details Paystack Params

| Parameter     | Description                                                                                                                                                                                  |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currency`    | The currency to charge the customer (e.g. GHS, NGN)                                                                                                                                          |
| `amount`      | The total amount of the transaction in the lowest currency unit                                                                                                                              |
| `description` | A description of the charge (optional)                                                                                                                                                       |
| `metadata`    | An array of metadata to attach to the charge. This is useful for tracking the user who made the payment, the items they purchased, and any other relevant information.                       |
| `customer`    | The customer email to charge (optional)                                                                                                                                                      |
| `url`         | The URL to redirect the customer to on payment completion or cancellation. If you don't pass this, Leaf will use the default URL.                                                            |
| `_paystack`   | Any other PayStack specific parameters you want to pass to the PayStack API. Check the [PayStack documentation](https://paystack.com/docs/api/transaction/#initialize) for more information. |

:::

## Billing Callbacks

By default, Leaf Billing redirects users to `/billing/callback` after a payment is completed or cancelled. You can customize this behavior by setting `BILLING_SUCCESS_URL` and `BILLING_CANCEL_URL` in your `.env` file, or by passing custom URLs directly to the `charge()` method.

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
            $checkoutSession = $billingSession->session();
            $checkoutMetadata = $billingSession->metadata();

            // you can get data like this
            $checkoutSession->id();
            $checkoutSession->data;

            return response()->json(['message' => 'Payment failed']);
        }

        return response()->json(['message' => 'Payment successful']);
    }
}
```

`billing()->callback()` parses and validates the callback, returning a BillingSession with full payment details. Stripe and PayStack send back different data, but Leaf normalizes it for you, so you can handle the payment result in one place.

## Billing with subscriptions <Badge text="Stripe + Paystack" type="tip"/>

Unlike one-time payments, subscriptions need a more structured setup, but Leaf Billing does most of it for you. Run the `scaffold:subscriptions` command to generate everything you need: billing config, controllers, routes, and views.

```bash:no-line-numbers
leaf scaffold:subscriptions
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

| Key           | Description                             | Optional |
| ------------- | --------------------------------------- | -------- |
| `name`        | The name of the tier                    | `false`  |
| `description` | A short description of the tier         | `false`  |
| `trialDays`   | The number of days for the trial period | `true`   |
| `discount`    | The discount percentage                 | `true`   |
| `features`    | An array of features for the tier       | `true`   |

You can set different prices for various durations (`monthly`, `yearly`, `quarterly`, `weekly`, or even `daily`) in the format `price.monthly`, `price.yearly`, etc.

Once you've set up your billing tiers like the example above, you just need to publish them on Stripe. You can do that by running the following command:

```bash:no-line-numbers
leaf config:billing
```

That's it! We can now let users subscribe to our plans.

## Displaying your plans

The `scaffold:subscriptions` command also generates a pricing component tailored to your chosen view engine: Blade, React, Vue, or Svelte. You can display your plans with one line of code, and the component is fully customizable, so you can tweak the design to match your app’s look and feel.

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

Leaf handles most of the subscription logic out of the box, but since every app is different, you may need to tweak the generated files (especially the webhook handlers) to fit your specific use case.

## Billing Events/Webhooks

Once you’ve charged a customer, especially for a subscription, you’ll want to track their payment status. The best way to do this is through webhooks. When you run the `scaffold:subscriptions` command, Leaf Billing automatically generates a webhook controller that listens for events from your billing provider and handles them for you.

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
         * $event->id() - the provider's unique event id (store it to skip redelivered events)
         * $event->type() - to get the event type
         * $event->is() - to check if the event is a specific type
         * $event->tier() - to get the subscription tier (if available)
         * $event->subscription() - to get the current subscription (if available)
         * $event->user() - to get the current user (returns auth()->user() if available)
         * $event->previousSubscriptionTier() - to get the previous subscription tier (if available)
         * $event->activateSubscription() - to activate the new subscription in webhook (if available)
         * $event->renewSubscription() - to extend the subscription after a successful renewal payment
         * $event->markSubscriptionPastDue() - to flag the subscription when a renewal payment fails
         * $event->cancelSubscription() - to cancel the subscription in webhook request (if available)
         */

        if ($event->is('invoice.payment_succeeded')) {
            // Payment was successful

            if ($event->data()['object']['billing_reason'] === 'subscription_cycle') {
                // Subscription renewed: push end_date a period forward and
                // clear any past_due state from failed earlier attempts
                $event->renewSubscription();
            }

            // Other payment succeeded events
            // ✅ Give access to your service

            return;
        }

        if ($event->is('invoice.payment_failed')) {
            // Renewal payment failed: user enters dunning. Stripe retries the
            // charge; invoice.payment_succeeded will clear this when it recovers
            $event->markSubscriptionPastDue();

            // 📧 Maybe email the user to update their card?
            // billing()->portal() gives them a link to do exactly that

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

| Method                       | Description                                                                                              |
| ---------------------------- | -------------------------------------------------------------------------------------------------------- |
| `id()`                       | The provider's unique event id — store handled ids to make your webhook idempotent against redeliveries  |
| `type()`                     | Get the event type                                                                                       |
| `is()`                       | Check if the event is a specific type                                                                    |
| `tier()`                     | Get the subscription tier (if available)                                                                 |
| `subscription()`             | Get the current subscription (resolved straight from the database, no auth context needed)               |
| `user()`                     | Get the current user (returns auth()->user() if available)                                               |
| `previousSubscriptionTier()` | Get the previous subscription tier (if available)                                                        |
| `activateSubscription()`     | Activate the new subscription in webhook (if available)                                                  |
| `renewSubscription()`        | Extend the subscription one billing period after a successful renewal payment (also clears past_due)     |
| `markSubscriptionPastDue()`  | Flag the subscription as past due when a renewal payment fails (dunning)                                 |
| `cancelSubscription()`       | Cancel the subscription — keeps access until the paid-for period ends; pass `false` to revoke instantly  |
| `data()`                     | Get the raw event data                                                                                   |
| `metadata()`                 | Get the metadata from the event (if available)                                                           |

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

@if (auth()->user()->subscription()['name'] === 'Starter')
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

You can set the trial period for each tier, and the user will be billed after the trial period is over. In your code, you can check if the user is in the trial period by checking the `onTrial()` method on the user object.

::: code-group

```blade:no-line-numbers [Blade]
@if (auth()->user()->onTrial())
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

## Subscription status on the user object <Badge text="New" type="tip" />

Beyond the basic checks, the user object understands the full subscription lifecycle:

| Method                       | Description                                                                                     |
| ---------------------------- | ----------------------------------------------------------------------------------------------- |
| `subscription()`             | The user's latest subscription with its tier attached                                           |
| `hasActiveSubscription()`    | True for active and trialing users, and for cancelled users still inside their paid-for period  |
| `onTrial()`                  | True while the user's trial is running                                                          |
| `onGracePeriod()`            | True when the user cancelled but still has access until the period they paid for ends           |
| `hasPastDueSubscription()`   | True when a renewal payment failed and the subscription is in dunning                           |
| `cancelSubscription()`       | Cancel — at period end by default, pass `false` to cancel immediately                           |
| `resumeSubscription()`       | Undo a period-end cancellation while the grace period is still running                          |

## Cancelling and resuming subscriptions <Badge text="New" type="tip" />

When a user cancels, you almost never want to cut access on the spot — they paid for the current period. Leaf cancels at the end of the billing period by default:

```php
auth()->user()->cancelSubscription(); // keeps access until the period ends

auth()->user()->cancelSubscription(false); // cancels and revokes immediately
```

Between cancelling and the period actually ending, the user is on a *grace period*: `hasActiveSubscription()` stays true and `onGracePeriod()` tells you they're on the way out — a good moment for a "changed your mind?" banner:

```php
if (auth()->user()->onGracePeriod()) {
    // show a resume button instead of the subscribe button
}
```

If they do change their mind before the period runs out, resume picks the subscription right back up with no new checkout:

```php
auth()->user()->resumeSubscription();
```

::: info Paystack cancellations
Paystack always cancels at period end — disabling a subscription stops future renewals but access naturally runs to the end of the paid period. Passing `false` only affects your local records.
:::

## Switching plans <Badge text="New" type="tip" />

Upgrading or downgrading a subscribed user doesn't need a new checkout — `changeSubscription()` swaps the plan on the provider using the payment method already on file:

```php
billing()->changeSubscription([
    'id' => $tierId, // or 'name' => 'Pro'
]);
```

On Stripe the swap happens in place with proration, so the user is credited for unused time on the old plan. On Paystack (which has no in-place plan swaps) the old subscription is disabled and a new one is created on the new plan using the saved card authorization.

## The customer portal <Badge text="New" type="tip" />

Card expired? User wants their invoices? Instead of building billing management UI, you can send users to your provider's hosted portal:

```php
app()->get('/billing/portal', function () {
    response()->redirect(
        billing()->portal('/dashboard') // where to return the user afterwards
    );
});
```

On Stripe this opens the [Billing Portal](https://docs.stripe.com/customer-management) (update card, view invoices, cancel); on Paystack it opens the subscription management page (update card, cancel). `portal()` returns `null` when there's nothing to manage — e.g. the user has no billing history yet.

## Failed renewal payments <Badge text="New" type="tip" />

When a renewal charge fails, your webhook marks the subscription past due (`invoice.payment_failed` in the generated controller does this already). From there:

- `hasActiveSubscription()` returns false, so gated content locks automatically
- `hasPastDueSubscription()` lets you show a "payment failed, update your card" notice with a `billing()->portal()` link
- Your provider retries the charge on its own schedule; when it succeeds, `invoice.payment_succeeded` fires and `$event->renewSubscription()` restores access — nothing else to do

## Billing Middleware

Leaf billing comes with a middleware that you can use to protect your routes based on specific conditions. This is a list of the billing middleware available:

| Middleware                         | Description                                                           |
| ---------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------- |
| `billing.subscribed`               | Protect a route to only allow subscribed users                        |
| `billing.subscribed:plan-name`     | Protect a route to only allow users subscribed to a specific plan     |
| `billing.not-subscribed`           | Protect a route to only allow users who aren't subscribed             |
| `billing.not-subscribed:plan-name` | Protect a route to only allow users not subscribed to a specific plan |
| <!--                               | `billing.trial`                                                       | Protect a route to only allow users on a trial period |
| `billing.not-trial`                | Protect a route to only allow users not on a trial period             | -->                                                   |

You can use these middlewares in your routes like this:

```php [_some-route.php]
app()->get('/protected', [
    'middleware' => 'billing.subscribed',
    fn () => 'You are subscribed'
]);

app()->get('/protected', [
    'middleware' => 'billing.not-subscribed:Starter',
    'SubscriptionController@subscribe'
]);
```

If you want to customize what the middleware does if the user is not allowed to access the route, you can do that by calling the `billing()->middleware()` method in your `app/routes/index.php` file. This method accepts a callback that will be called if the user is not allowed to access the route.

```php:no-line-numbers [index.php]
billing()->middleware('billing.subscribed', function () {
    response()->redirect('/some-special-page');
});
```

And then you can use the middleware like this:

```php [_some-route.php]
app()->get('/protected', [
    'middleware' => 'billing.subscribed',
    fn () => 'You are subscribed'
]);
```

<!-- ## Billing Currency

PayStack is only available in Africa, and relies on local currency. Stripe is available globally and supports multiple currencies, so Leaf's billing allows you to set your currency in your `.env` file.

```txt:no-line-numbers
BILLING_CURRENCY=GHS
```

For your applications, you may need to display a different currency from the actual purchase currency. While we advise against this, you may run into geolocation issues which may make this necessary. Leaf Billing allows you to set up a display currency with your own convertion.

```txt:no-line-numbers
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

## Security

When using Leaf billing, you need to ensure that your billing system is secure. Here are a few things to check:

- Billing Webhooks

  Always make sure that your `STRIPE_WEBHOOK_SECRET` is set in your `.env` file. This secret is used to verify that the webhook is coming from your billing provider. You can get this secret from your billing provider's dashboard. Once you set this secret, Leaf billing will automatically verify that the webhook is coming from your billing provider.

  For PayStack, you don't need to set a webhook secret, as PayStack doesn't use webhook secrets, however, you should check out IP whitelisting in the [PayStack documentation](https://paystack.com/docs/payments/webhooks/#ip-whitelisting). Leaf billing automatically verifies the webhook payload for PayStack, so you don't need to worry about that.

- CSRF Protection

  If you are using the default CSRF config, then your `/billing/webhook` route is already excluded from CSRF protection, however, if you maintain your own CSRF config in `config/csrf.php`, you should exclude the `/billing/webhook` route from CSRF protection.

  ```php:no-line-numbers [csrf.php]
  ...
      'except' => [
          '/billing/webhook',
      ],
  ...
  ```

## Production Checklist <Badge text="Stripe Only" type="warning"/>

As with all payment systems, you need to ensure that your billing system is secure. Here are a few things to check before going live:

- Ensure that your billing provider is set up correctly
- Turn of test mode in your billing provider
- In your [Developers], copy your public & private keys and add them to the api key and publishable key in your production environment variables.
- In your [Developers], [Webhook], [Add Enpoint]. Set `<your-domain>/billing/webhook`. Copy the signing secret and add it to `STRIPE_WEBHOOK_SECRET` in your production environment variables.
