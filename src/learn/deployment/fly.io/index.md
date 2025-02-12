# Deploying a LeafMVC Application to Fly.io

::: warning Version support
Version support. This tutorial assumes use of LeafPHP >= 3.0 and PHP >=7.0.
:::

## What Are We Building

This experiment will guide you deploying your first LeafMVC / base Leaf application to Fly.io. A majority
of the same steps apply to Leaf v3 core as well. This guide uses docker to deploy your application.
You do not need to have docker installed on your local machine to follow this guide. Neither do you
need to have prior knowledge of docker.

::: details (New to Fly.io?)
Fly.io transforms containers into micro-VMs that run on their hardware.
:::

## Prerequisites

This tutorial assumes you have the following:

- A Leaf application
- A Fly.io account
- The [flyctl cli tool](https://fly.io/docs/hands-on/install-flyctl/) installed

## 1. Set up docker in your Leaf application

You can clone the [Fly.io starter template](https://github.com/cr34t1ve/leaf-fly-io-template) to get started.

```bash
git clone https://github.com/cr34t1ve/leaf-fly-io-template.git
```

This template has a `Dockerfile` and a `fly.toml` file already set up for you.

## 2. Deploy your application

Navigate to your application's root directory and run the following command:

```bash
fly deploy
```

This command will build your docker image and deploy it to Fly.io.

After setting up your application, you can then run the following to launch your application:

```bash
fly launch
```

You can then visit your application at the URL provided.

## Conclusion

You have successfully deployed your LeafMVC application to Fly.io. You can now scale your application

Experiment by **[Desmond Sofua](https://github.com/cr34t1ve)**
