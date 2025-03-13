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

## Coming Soon page/Waitlist page <Badge type="warning">Coming Soon</Badge>

A waitlist/coming page is the easiest way to put your product out there, generate engagement and get some leads all while your application is still in development. You will be able to scaffold these pages using:

```bash:no-line-numbers
php leaf scaffold:waitlist

# or for coming soon
php leaf scaffold:coming-soon
```

These will give you:

- Structured waitlist/coming soon pages
- Middleware and routes to redirect to waitlist/coming soon page
- Models and schema files for email collection
- Jobs to export waitlist
- Mailers to notify waitlist
