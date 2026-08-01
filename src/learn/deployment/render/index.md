# Deploying to Render

Render can host a Leaf app on its free plan, deploying automatically from your git repository. Leaf CLI prepares everything Render needs; you connect the repository once and every push deploys.

## Prerequisites

- A [Render account](https://dashboard.render.com/register)
- Your app in a git repository on GitHub or GitLab

## Prepare your app

From your app's root directory:

```bash
php leaf deploy --to render
```

This writes two things into your project:

- A production `Dockerfile` (shared with the Fly setup, it also builds your JavaScript assets)
- A `render.yaml` blueprint describing your service: docker runtime, free plan and a health check

Commit and push them:

```bash
git add . && git commit -m "add render deployment files" && git push
```

## Connect the repository

1. Open [dashboard.render.com](https://dashboard.render.com)
2. Click **New** → **Blueprint**
3. Connect your repository

Render reads `render.yaml` and creates the service. From here on, every push to your default branch deploys automatically.

## Production secrets

Your `.env` file is never uploaded. The CLI lists the keys your app needs in production; add them under your service's **Environment** tab in the Render dashboard. `APP_ENV` and `APP_DEBUG` are already set by the blueprint.

::: details About the free plan
Free Render services sleep after 15 minutes without traffic and wake on the next request, which takes a few seconds. That's fine for side projects and demos; upgrade the `plan` in `render.yaml` when you need an always-on app.
:::
