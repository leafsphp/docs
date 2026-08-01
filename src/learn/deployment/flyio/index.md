# Deploying to Fly.io

Fly.io runs your app in small VMs close to your users, and it is the fastest way to get a Leaf app live from your terminal. Leaf CLI handles the whole flow with one command.

## Prerequisites

- A [Fly.io account](https://fly.io/app/sign-up)
- The [fly CLI](https://fly.io/docs/flyctl/install/) installed and logged in (`fly auth login`)

That's it. You don't need Docker installed or any Docker knowledge; Fly builds the image remotely.

## Deploy

From your app's root directory:

```bash
php leaf deploy
```

On the first run, this:

1. Writes the deployment files into your project (a production `Dockerfile`, `fly.toml` and the server config they need)
2. Creates the app on Fly and deploys it

Your app name comes from `APP_NAME` in your `.env`, and the region from `APP_PROD_REGION` (defaulting to `iad`). You can override both:

```bash
php leaf deploy --name my-unique-app --region lhr
```

::: details App names are global
Fly app names are unique across all of Fly, not just your account. If your name is taken, the deploy fails with a message telling you to pick another with `--name`.
:::

Running `php leaf deploy` again after the first deploy ships your latest changes to the existing app. The generated Dockerfile also builds your JavaScript assets (Vite, Inertia and friends), so there is no separate build step.

::: details Single-file apps work too
If your app is a single `index.php` at the project root rather than an MVC app with a `public` directory, the generated config serves it from the right place automatically. Your `.env`, `vendor` directory and composer files stay unreachable from the browser either way.
:::

## Production secrets

Your `.env` file is never uploaded with your app. After deploying, the CLI lists the keys your app likely needs in production and prints the command to set them:

```bash
fly secrets set APP_KEY= DB_PASSWORD=
```

Fill in the values and your app restarts with them available as environment variables.

## Useful follow-ups

```bash
fly logs        # tail your app's logs
fly status      # see machine state
fly scale count 1 --yes   # keep one machine always running
```

By default, Fly stops machines when idle and starts them on the next request. Keeping one machine running avoids cold starts on low-traffic apps.
