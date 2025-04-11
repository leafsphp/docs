# Application Scaffolding <Badge>Leaf MVC Only</Badge>

Leaf 4 is all about how quickly you can go from idea to a working application, and scaffolding is a big part of that. Leaf MVC comes with a powerful console tool that allows you to scaffold entire features in your application with a single command.

## Authentication

Authentication with Leaf is straightforward and is powered by [Leaf Auth](/docs/auth/) which provides a simple way to authenticate users in your application, plus other essentials like middleware, password hashing, and user management, all out of the box. Leaf MVC's scaffolding tool takes this a step further by allowing you to scaffold an entire authentication system with models, controllers, routes and even views that use your configured frontend tooling.

You can get started using the `scaffold:auth` command:

```bash:no-line-numbers
php leaf scaffold:auth
```

The scaffold:auth command sets up a fully functional authentication system, including:

- User model with a database schema file
- Authentication controllers (login, register, dashboard)
- Authentication routes
- Middleware for route protection
- Views tailored to your frontend setup
- Dashboard tailored to your frontend setup
- Account update example

This is automatically done for you if you choose to install the application starter during installation.

<img src="https://github.com/user-attachments/assets/19080187-e56d-4e4a-beac-cf71c1717647" alt="auth Page" width="100%" class="border border-gray-500 rounded-lg">

## Landing Page

Another annoying starting point for most developers is the landing page. Leaf MVC's scaffolding tool allows you to scaffold a landing page with a single command:

```bash:no-line-numbers
php leaf scaffold:landing-page
```

You get:

- A structured homepage layout
- Sections like hero, features, and footers
- Tailwind for styling + your preferred frontend setup
- Easy customization with Leaf Zero components

<img src="https://github.com/user-attachments/assets/3f078440-a7a1-4586-9239-a738398f9536" alt="lander" width="100%" class="border border-gray-500 rounded-lg">

## Billing Subscription

Subscriptions are pretty common in modern applications, but quite annoying to set up. Leaf MVC's scaffolding tool allows you to scaffold a billing subscription system with a single command:

```bash:no-line-numbers
php leaf scaffold:subscriptions
```

It requires [Leaf Billing](/docs/utils/billing) to be installed, and you get:

- A pricing component in whatever frontend setup you are using
- Subscription/cancellation controllers
- Webhooks/callbacks/routes for Stripe
- Database schema, models and config

<img src="https://github.com/user-attachments/assets/8e7f9be6-89f8-42de-a245-e46d73c9baf7" alt="billing" width="100%" class="border border-gray-500 rounded-lg">

## Waitlists

Creating a waitlist/coming soon page is a great way to build anticipation for your product before it launches. It allows you to collect email addresses from interested users, which can be invaluable for marketing and user engagement once your product is live. You can scaffold a waitlist using:

```bash:no-line-numbers
php leaf scaffold:waitlist
```

These will give you:

- Waitlist component for collecting emails in your frontend setup
- Middleware to restrict accidental access to your app
- Models and schema files for email collection
- Waitlist invites and more

<img src="https://github.com/user-attachments/assets/dac0822a-5cc8-4b9a-a818-bb66895c45bd" alt="billing" width="100%" class="border border-gray-500 rounded-lg">

## More coming soon

We are working on scaffolding for more features like:

- Blog
- Admin panel
- API Dashboard & more.

We'll be adding these in the future, so stay tuned!
