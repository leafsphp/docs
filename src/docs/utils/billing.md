# Payments/Billing <Badge text="BETA - MVC Only" type="warning"/>

Several projects require billing, be it for subscriptions, one-time payments, or donations. Leaf 4 now comes with billing support for Stripe and PayStack right out of the box. This makes integrating billing into your Leaf MVC project a breeze.

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

Billing on-the-fly is the simplest way to bill a customer. This is useful for one-time payments, donations, and charging customers for services or cart items. Leaf takes care of everything for you, all you need to do is use Leaf billing to generate a payment link. This is the same whether for Blade, React, Vue, or Svelte since billing is done on the server.

```php:no-line-numbers [MyController.php]
...

public function handleCartPurchase($cartId) {
    $cart = Cart::find($cartId);

    response()->redirect(
      billing()->instantLink([
          'amount' => $cart->total(),
          'currency' => 'USD',
          'description' => 'Purchase of items in cart',
          'metadata' => [
              'cart_id' => $cartId,
              'items' => $cart->items(),
          ]
      ])
    );
}
```

While this is incredibly simple, you would usually want to store other information about the payment session in your database. For those use-cases, you can use the `instantSession()` method.

```php:no-line-numbers [MyController.php]
...

public function handleCartPurchase($cartId) {
    $cart = Cart::find($cartId);

    $session = billing()->instantSession([
        'amount' => $cart->total(),
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

This way, you can store the payment session in your database and use it to track the payment session. Either way, Leaf will automatically handle the payment session and will add data like the user who made the payment (if available), any metadata you added, and the payment status.

## Billing Events/Webhooks

Once you have billed a customer, either on-the-fly or through a subscription, you would want to track the payment status, and webhook events are the best way to do this. Leaf billing comes with built-in support for webhooks. Leaf can automatically set up your webhooks for you using the `scaffold:billing-webhooks` command.

```bash:no-line-numbers
php leaf scaffold:billing-webhooks
```

This will generate a `_billing_webhooks.php` file in your `routes` directory which calls the `handle()` method on the `BillingWebhooks` controller via `POST /billing/webhook`.

```php:no-line-numbers [BillingWebhooksController.php]
...

public function handle() {
    $event = billing()->webhook();

    // Handle the event
    switch ($event->type) {
        case 'checkout.session.completed':
            // Payment was successful and the Checkout Session is complete
            // ✅ Give access to your service
            // $event->user() will give you the user who made the payment (if available)
            break;
        case 'checkout.session.expired':
            // Payment was not successful and the Checkout Session has expired
            // 📧 Maybe send an abandoned checkout mail?
            break;
        // ... handle all necessary events
}
```

<!-- TODO: change specific events to Leaf billing events like $event->type()->paymentSuccessful() -->

This way, you can handle all billing events in one place, and you can easily track the payment status of your customers.

Since webhooks are stateless, you can't use the `session()` helper to get the user who made the payment...so we added a `webhook()` method to the billing instance to parse all data from the webhook event and create a `BillingEvent` instance which you can use to get the user who made the payment, the payment session, and all other necessary information.

The billing event instance has the following items:

- `type`: The type of the event
- `user()`: The user who made the payment
- `session()`: The payment session
- `metadata`: The raw metadata of the payment session

For our example above, we can handle the payment event like this:

```php:no-line-numbers [BillingWebhooksController.php]
...

public function handle() {
    $event = billing()->webhook();

    // Handle the event
    switch ($event->type) {
        case 'checkout.session.completed':
            $cart = Cart::find($event->metadata['cart_id']);
            $cart->status = 'paid';
            $cart->save();
            break;
        case 'checkout.session.expired':
            $cart = Cart::find($event->metadata['cart_id']);
            $cart->status = 'abandoned';
            $cart->save();
            break;
        // ... handle all necessary events
}
```

For more information on billing events, you can check the [Stripe](https://stripe.com/docs/api/events/types) and [PayStack](https://paystack.com/docs/payments/webhooks/#types-of-events) documentation.

## Adding billing plans

While billing on-the-fly is great for one-time payments, you may want to set up subscriptions for your customers. Leaf billing allows you to set up billing plans for your customers. For this, you will have to set up your billing plans in your billing configuration file. Leaf scaffolding makes this easy with the `scaffold:billing-plans` command.

```bash:no-line-numbers
php leaf scaffold:billing-plans
```

This will generate a `config/billing.php` file with a `plans` key where you can set up your billing plans, which should look like this:

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

For the pricing, you can specify different prices for different durations. You can specify the price for `monthly`, `yearly`, `quarterly`, `weekly`, and `daily` durations. You only need to specify the price for the duration you want to use, if you want to create a one-time payment instead of a subscription, you can set the `price` instead of `price.duration`.

Besides this, you also get a pricing component based on your view engine. This component is available in Blade, React, Vue, and Svelte, and you can use it to display your billing plans.

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

Once you have set up your billing plans in the billing config, your users can subscribe to these plans. The `scaffold:billing-plans` command also generates a `BillingPlans` controller with a `subscribe()` method that you can use to subscribe your users to a plan.

```php:no-line-numbers{4} [BillingPlansController.php]
...

public function subscribe($plan) {
    $session = billing()->subscribe($plan);

    // do whatever you need with $session

    response()->redirect($session->url);
}
```

This will redirect your users to the billing provider's checkout page where they can subscribe to the plan. Once they have subscribed, you can track their subscription status using the webhook events. The `scaffold:billing-plans` command also updates the `BillingWebhooks` controller to handle subscription events.

```php:no-line-numbers [BillingWebhooksController.php]
...

public function handle() {
    $event = billing()->webhook();

    // Handle the event
    switch ($event->type) {
        case 'checkout.session.completed':
            $event->user()->newSubscription();
            // update other models if needed
            break;
        case 'checkout.session.expired':
            UserMailer::sendAbandonedCheckoutMail($event->user());
            break;
        case 'customer.subscription.deleted':
            // Subscription was deleted
            $event->user()->cancelSubscription();
            break;
}
```

`$event->user()` returns an instance of Leaf's auth user, which automatically gets the `HasBilling` trait once Leaf billing is installed. This trait allows you to easily check the user's subscription status, plan, and other billing information directly on the user. `$event->user()` automatically attaches the billing tier information to the user object, which is why we can call `newSubscription()` and `cancelSubscription()` without any arguments in the example above.

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

::: warning CSRF Protection
If you are using the default CSRF config, then your `/billing/webhook` route is already excluded from CSRF protection, however, if you maintain your own CSRF config in `config/csrf.php`, you should exclude the `/billing/webhook` route from CSRF protection.

```php:no-line-numbers [csrf.php]
...
    'except' => [
        '/billing/webhook',
    ],
...
```

:::
